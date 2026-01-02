/**
 * BLG Legal Services - Google Reviews Backend Proxy
 * 
 * This Node.js server fetches Google reviews securely using Places API
 * and serves them to the frontend without exposing the API key.
 * 
 * Setup Instructions:
 * 1. Install Node.js from https://nodejs.org/
 * 2. Run: npm init -y
 * 3. Run: npm install express cors dotenv axios
 * 4. Create .env file with: GOOGLE_PLACES_API_KEY=your_api_key_here
 * 5. Get your Place ID from: https://developers.google.com/maps/documentation/places/web-service/place-id
 * 6. Run: node server.js
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for local development
app.use(cors());
app.use(express.json());

// Your Google Business Place ID
// Find it here: https://developers.google.com/maps/documentation/places/web-service/place-id
const PLACE_ID = process.env.GOOGLE_PLACE_ID || 'YOUR_PLACE_ID_HERE';
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Facebook API Configuration
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID || 'blglegalservices';
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

/**
 * Endpoint to fetch Google reviews
 * GET /api/reviews
 */
app.get('/api/reviews', async (req, res) => {
  try {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      return res.status(500).json({ 
        error: 'API key not configured',
        message: 'Please set GOOGLE_PLACES_API_KEY in .env file'
      });
    }

    if (!PLACE_ID || PLACE_ID === 'YOUR_PLACE_ID_HERE') {
      return res.status(500).json({ 
        error: 'Place ID not configured',
        message: 'Please set GOOGLE_PLACE_ID in .env file'
      });
    }

    // Fetch place details including reviews
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: PLACE_ID,
          fields: 'name,rating,user_ratings_total,reviews,formatted_address,url',
          key: API_KEY
        }
      }
    );

    if (response.data.status === 'OK') {
      res.json({
        success: true,
        data: response.data.result
      });
    } else {
      res.status(400).json({
        success: false,
        error: response.data.status,
        message: response.data.error_message || 'Failed to fetch reviews'
      });
    }
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

/**
 * Endpoint to fetch Facebook page ratings and reviews
 * GET /api/facebook-reviews
 */
app.get('/api/facebook-reviews', async (req, res) => {
  try {
    if (!FACEBOOK_ACCESS_TOKEN || FACEBOOK_ACCESS_TOKEN === 'YOUR_FACEBOOK_ACCESS_TOKEN_HERE') {
      return res.status(500).json({ 
        error: 'Facebook access token not configured',
        message: 'Please set FACEBOOK_ACCESS_TOKEN in .env file'
      });
    }

    // Fetch page data including ratings
    const pageResponse = await axios.get(
      `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}`,
      {
        params: {
          fields: 'name,overall_star_rating,rating_count,link,about,fan_count',
          access_token: FACEBOOK_ACCESS_TOKEN
        }
      }
    );

    // Fetch ratings (reviews/recommendations)
    let ratingsData = [];
    try {
      const ratingsResponse = await axios.get(
        `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/ratings`,
        {
          params: {
            fields: 'review_text,reviewer,created_time,rating,recommendation_type',
            limit: 10,
            access_token: FACEBOOK_ACCESS_TOKEN
          }
        }
      );
      ratingsData = ratingsResponse.data.data || [];
    } catch (ratingError) {
      // Ratings might not be available if page doesn't have reviews enabled
      console.log('Note: Ratings not available for this page');
    }

    res.json({
      success: true,
      data: {
        page: pageResponse.data,
        ratings: ratingsData,
        hasRatings: ratingsData.length > 0
      }
    });
  } catch (error) {
    console.error('Error fetching Facebook data:', error.message);
    
    if (error.response) {
      res.status(error.response.status).json({
        success: false,
        error: error.response.data.error?.type || 'API Error',
        message: error.response.data.error?.message || 'Failed to fetch Facebook data'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server error',
        message: error.message
      });
    }
  }
});

/**
 * Endpoint to fetch combined reviews from both Google and Facebook
 * GET /api/all-reviews
 */
app.get('/api/all-reviews', async (req, res) => {
  try {
    const results = {
      google: { success: false, data: null },
      facebook: { success: false, data: null }
    };

    // Fetch Google reviews
    if (API_KEY && PLACE_ID && PLACE_ID !== 'YOUR_PLACE_ID_HERE') {
      try {
        const googleResponse = await axios.get(
          'https://maps.googleapis.com/maps/api/place/details/json',
          {
            params: {
              place_id: PLACE_ID,
              fields: 'name,rating,user_ratings_total,reviews',
              key: API_KEY
            }
          }
        );
        if (googleResponse.data.status === 'OK') {
          results.google = {
            success: true,
            data: googleResponse.data.result
          };
        }
      } catch (error) {
        console.error('Google API error:', error.message);
      }
    }

    // Fetch Facebook data
    if (FACEBOOK_ACCESS_TOKEN && FACEBOOK_ACCESS_TOKEN !== 'YOUR_FACEBOOK_ACCESS_TOKEN_HERE') {
      try {
        const fbPageResponse = await axios.get(
          `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}`,
          {
            params: {
              fields: 'name,overall_star_rating,rating_count,link,fan_count',
              access_token: FACEBOOK_ACCESS_TOKEN
            }
          }
        );
        results.facebook = {
          success: true,
          data: fbPageResponse.data
        };
      } catch (error) {
        console.error('Facebook API error:', error.message);
      }
    }

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error fetching combined reviews:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!API_KEY && API_KEY !== 'YOUR_API_KEY_HERE',
    placeIdConfigured: !!PLACE_ID && PLACE_ID !== 'YOUR_PLACE_ID_HERE',
    facebookTokenConfigured: !!FACEBOOK_ACCESS_TOKEN && FACEBOOK_ACCESS_TOKEN !== 'YOUR_FACEBOOK_ACCESS_TOKEN_HERE',
    facebookPageId: FACEBOOK_PAGE_ID
  });
});

app.listen(PORT, () => {
  console.log(`\n✅ BLG Legal Services - Reviews API Server`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`\n📍 API Endpoints:`);
  console.log(`   🔍 Health check: http://localhost:${PORT}/health`);
  console.log(`   📊 Google Reviews: http://localhost:${PORT}/api/reviews`);
  console.log(`   📘 Facebook Reviews: http://localhost:${PORT}/api/facebook-reviews`);
  console.log(`   🌐 All Reviews: http://localhost:${PORT}/api/all-reviews`);
  console.log(`\n⚙️  Configuration Status:`);
  console.log(`   Google API Key: ${API_KEY && API_KEY !== 'YOUR_API_KEY_HERE' ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   Google Place ID: ${PLACE_ID && PLACE_ID !== 'YOUR_PLACE_ID_HERE' ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   Facebook Token: ${FACEBOOK_ACCESS_TOKEN && FACEBOOK_ACCESS_TOKEN !== 'YOUR_FACEBOOK_ACCESS_TOKEN_HERE' ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   Facebook Page ID: ${FACEBOOK_PAGE_ID}`);
  console.log(`\n📝 Setup Instructions:`);
  console.log(`   1. Copy backend/env.example to backend/.env`);
  console.log(`   2. Add your API keys to .env:`);
  console.log(`      - GOOGLE_PLACES_API_KEY=your_key`);
  console.log(`      - GOOGLE_PLACE_ID=your_place_id`);
  console.log(`      - FACEBOOK_ACCESS_TOKEN=your_token`);
  console.log(`   3. Restart server: npm start`);
  console.log(`\n`);
});

