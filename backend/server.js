/**
 * BLG Legal Services - API Server
 * 
 * Full-featured backend server for:
 * - Google Places API (reviews)
 * - Facebook Graph API (page data & reviews)
 * - Contact form submissions with email notifications
 * - Rate limiting and security features
 * 
 * Setup Instructions:
 * 1. Copy env.example to .env
 * 2. Configure all required API keys
 * 3. Run: npm install
 * 4. Run: npm start (production) or npm run dev (development)
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// =============================================================================
// MIDDLEWARE CONFIGURATION
// =============================================================================

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Compression
app.use(compression());

// Request logging
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:8000', 'http://localhost:3000', 'http://127.0.0.1:8000'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Parse JSON bodies
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

const contactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact form submissions per hour
  message: { error: 'Too many contact form submissions, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(generalLimiter);

// =============================================================================
// CONFIGURATION
// =============================================================================

// Google Places API
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID || 'YOUR_PLACE_ID_HERE';

// Facebook Graph API
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID || 'blglegalservices';
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

// Email Configuration
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
// Multiple recipients supported (comma-separated)
const EMAIL_TO = process.env.EMAIL_TO || 'law@blglegalservices.com,dgililov@gmail.com';

// Create email transporter
let emailTransporter = null;
if (EMAIL_USER && EMAIL_PASS) {
  emailTransporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize input string
 */
function sanitize(str) {
  if (!str) return '';
  return str
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 5000);
}

/**
 * Check if Google API is configured
 */
function isGoogleConfigured() {
  return GOOGLE_API_KEY && 
         GOOGLE_API_KEY !== 'YOUR_API_KEY_HERE' &&
         GOOGLE_API_KEY !== 'your_google_api_key_here' &&
         GOOGLE_PLACE_ID && 
         GOOGLE_PLACE_ID !== 'YOUR_PLACE_ID_HERE' &&
         GOOGLE_PLACE_ID !== 'your_google_place_id_here';
}

/**
 * Check if Facebook API is configured
 */
function isFacebookConfigured() {
  return FACEBOOK_ACCESS_TOKEN && 
         FACEBOOK_ACCESS_TOKEN !== 'YOUR_FACEBOOK_ACCESS_TOKEN_HERE' &&
         FACEBOOK_ACCESS_TOKEN !== 'your_facebook_page_access_token_here';
}

// =============================================================================
// API ENDPOINTS - GOOGLE REVIEWS
// =============================================================================

/**
 * GET /api/reviews
 * Fetch Google Places reviews
 */
app.get('/api/reviews', async (req, res) => {
  try {
    if (!isGoogleConfigured()) {
      return res.status(503).json({ 
        success: false,
        error: 'Google API not configured',
        message: 'Please configure GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in .env file'
      });
    }

    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: GOOGLE_PLACE_ID,
          fields: 'name,rating,user_ratings_total,reviews,formatted_address,url,formatted_phone_number,website',
          key: GOOGLE_API_KEY
        },
        timeout: 10000
      }
    );

    if (response.data.status === 'OK') {
      res.json({
        success: true,
        source: 'google',
        data: response.data.result,
        cached: false,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(400).json({
        success: false,
        error: response.data.status,
        message: response.data.error_message || 'Failed to fetch Google reviews'
      });
    }
  } catch (error) {
    console.error('Error fetching Google reviews:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: NODE_ENV === 'development' ? error.message : 'Failed to fetch reviews'
    });
  }
});

// =============================================================================
// API ENDPOINTS - FACEBOOK REVIEWS
// =============================================================================

/**
 * GET /api/facebook-reviews
 * Fetch Facebook page data and ratings
 */
app.get('/api/facebook-reviews', async (req, res) => {
  try {
    if (!isFacebookConfigured()) {
      return res.status(503).json({ 
        success: false,
        error: 'Facebook API not configured',
        message: 'Please configure FACEBOOK_ACCESS_TOKEN in .env file'
      });
    }

    // Fetch page data including ratings
    const pageResponse = await axios.get(
      `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}`,
      {
        params: {
          fields: 'name,overall_star_rating,rating_count,link,about,fan_count,category,description,hours,location,phone,website',
          access_token: FACEBOOK_ACCESS_TOKEN
        },
        timeout: 10000
      }
    );

    // Attempt to fetch ratings/reviews
    let ratingsData = [];
    try {
      const ratingsResponse = await axios.get(
        `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/ratings`,
        {
          params: {
            fields: 'review_text,reviewer{name,picture},created_time,rating,recommendation_type,has_review',
            limit: 25,
            access_token: FACEBOOK_ACCESS_TOKEN
          },
          timeout: 10000
        }
      );
      ratingsData = ratingsResponse.data.data || [];
    } catch (ratingError) {
      // Ratings might not be available for all pages
      console.log('Note: Facebook ratings not available for this page');
    }

    res.json({
      success: true,
      source: 'facebook',
      data: {
        page: pageResponse.data,
        ratings: ratingsData,
        hasRatings: ratingsData.length > 0
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching Facebook data:', error.message);
    
    if (error.response) {
      res.status(error.response.status).json({
        success: false,
        error: error.response.data.error?.type || 'Facebook API Error',
        message: error.response.data.error?.message || 'Failed to fetch Facebook data'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server error',
        message: NODE_ENV === 'development' ? error.message : 'Failed to fetch Facebook data'
      });
    }
  }
});

// =============================================================================
// API ENDPOINTS - COMBINED REVIEWS
// =============================================================================

/**
 * GET /api/all-reviews
 * Fetch reviews from both Google and Facebook
 */
app.get('/api/all-reviews', async (req, res) => {
  const results = {
    google: { success: false, data: null, error: null },
    facebook: { success: false, data: null, error: null }
  };

  // Fetch Google reviews
  if (isGoogleConfigured()) {
    try {
      const googleResponse = await axios.get(
        'https://maps.googleapis.com/maps/api/place/details/json',
        {
          params: {
            place_id: GOOGLE_PLACE_ID,
            fields: 'name,rating,user_ratings_total,reviews,formatted_address,url',
            key: GOOGLE_API_KEY
          },
          timeout: 10000
        }
      );
      
      if (googleResponse.data.status === 'OK') {
        results.google = {
          success: true,
          data: googleResponse.data.result
        };
      } else {
        results.google.error = googleResponse.data.status;
      }
    } catch (error) {
      console.error('Google API error:', error.message);
      results.google.error = error.message;
    }
  } else {
    results.google.error = 'Not configured';
  }

  // Fetch Facebook data
  if (isFacebookConfigured()) {
    try {
      const fbPageResponse = await axios.get(
        `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}`,
        {
          params: {
            fields: 'name,overall_star_rating,rating_count,link,fan_count,about',
            access_token: FACEBOOK_ACCESS_TOKEN
          },
          timeout: 10000
        }
      );
      
      // Try to get ratings
      let ratings = [];
      try {
        const ratingsRes = await axios.get(
          `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/ratings`,
          {
            params: {
              fields: 'review_text,reviewer{name},created_time,rating,recommendation_type',
              limit: 10,
              access_token: FACEBOOK_ACCESS_TOKEN
            },
            timeout: 10000
          }
        );
        ratings = ratingsRes.data.data || [];
      } catch (e) {
        // Ratings endpoint may not be available
      }

      results.facebook = {
        success: true,
        data: {
          page: fbPageResponse.data,
          ratings: ratings
        }
      };
    } catch (error) {
      console.error('Facebook API error:', error.message);
      results.facebook.error = error.message;
    }
  } else {
    results.facebook.error = 'Not configured';
  }

  res.json({
    success: true,
    data: results,
    timestamp: new Date().toISOString()
  });
});

// =============================================================================
// API ENDPOINTS - CONTACT FORM
// =============================================================================

/**
 * POST /api/contact
 * Handle contact form submissions
 */
app.post('/api/contact', contactFormLimiter, async (req, res) => {
  try {
    const { name, email, phone, service, message, language } = req.body;

    // Validation
    const errors = [];
    
    if (!name || name.trim().length < 2) {
      errors.push('Name is required (minimum 2 characters)');
    }
    
    if (!email || !isValidEmail(email)) {
      errors.push('Valid email is required');
    }
    
    if (!message || message.trim().length < 10) {
      errors.push('Message is required (minimum 10 characters)');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: errors
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone || 'Not provided'),
      service: sanitize(service || 'General Inquiry'),
      message: sanitize(message),
      language: sanitize(language || 'en'),
      submittedAt: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress
    };

    // Log the submission
    console.log('📧 New contact form submission:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      service: sanitizedData.service,
      timestamp: sanitizedData.submittedAt
    });

    // Send email notification if configured
    if (emailTransporter) {
      try {
        const serviceLabels = {
          'immigration': 'Immigration Services',
          'trademark': 'Trademark Registration',
          'business': 'Business Formation',
          'consultation': 'Consultation Request',
          'general': 'General Inquiry'
        };

        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1a365d; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #1a365d; }
              .value { margin-top: 5px; }
              .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
              .highlight { background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; margin: 15px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="highlight">
                  <strong>Service Type:</strong> ${serviceLabels[sanitizedData.service] || sanitizedData.service}
                </div>
                
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${sanitizedData.name}</div>
                </div>
                
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></div>
                </div>
                
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${sanitizedData.phone}</div>
                </div>
                
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value" style="white-space: pre-wrap;">${sanitizedData.message}</div>
                </div>
                
                <div class="field">
                  <div class="label">Language Preference:</div>
                  <div class="value">${sanitizedData.language.toUpperCase()}</div>
                </div>
              </div>
              <div class="footer">
                <p>Submitted at: ${new Date(sanitizedData.submittedAt).toLocaleString()}</p>
                <p>BLG Legal Services - Website Contact Form</p>
              </div>
            </div>
          </body>
          </html>
        `;

        await emailTransporter.sendMail({
          from: `"BLG Website" <${EMAIL_USER}>`,
          to: EMAIL_TO,
          replyTo: sanitizedData.email,
          subject: `[Website] New ${sanitizedData.service} inquiry from ${sanitizedData.name}`,
          html: emailHtml,
          text: `
New Contact Form Submission
============================

Service: ${sanitizedData.service}
Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone}
Language: ${sanitizedData.language}

Message:
${sanitizedData.message}

Submitted at: ${sanitizedData.submittedAt}
          `.trim()
        });

        console.log('✅ Email notification sent successfully');
      } catch (emailError) {
        console.error('❌ Failed to send email notification:', emailError.message);
        // Don't fail the request if email fails
      }
    } else {
      console.log('⚠️ Email not configured - submission logged but not emailed');
    }

    // Success response
    res.json({
      success: true,
      message: 'Thank you for contacting us. We will get back to you within 24-48 hours.',
      reference: `BLG-${Date.now().toString(36).toUpperCase()}`
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'Failed to process your request. Please try again or contact us directly.'
    });
  }
});

// =============================================================================
// UTILITY ENDPOINTS
// =============================================================================

/**
 * GET /health
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    service: 'BLG Legal Services API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    configuration: {
      googlePlaces: isGoogleConfigured() ? 'configured' : 'not configured',
      facebook: isFacebookConfigured() ? 'configured' : 'not configured',
      email: emailTransporter ? 'configured' : 'not configured',
      placeId: GOOGLE_PLACE_ID !== 'YOUR_PLACE_ID_HERE' ? GOOGLE_PLACE_ID : null,
      facebookPageId: FACEBOOK_PAGE_ID
    }
  });
});

/**
 * GET /api/status
 * Detailed API status
 */
app.get('/api/status', (req, res) => {
  res.json({
    status: 'operational',
    endpoints: {
      '/health': { method: 'GET', description: 'Health check' },
      '/api/reviews': { method: 'GET', description: 'Google Places reviews', configured: isGoogleConfigured() },
      '/api/facebook-reviews': { method: 'GET', description: 'Facebook page data', configured: isFacebookConfigured() },
      '/api/all-reviews': { method: 'GET', description: 'Combined reviews', configured: isGoogleConfigured() || isFacebookConfigured() },
      '/api/contact': { method: 'POST', description: 'Contact form submission', configured: true }
    },
    rateLimit: {
      general: '100 requests per 15 minutes',
      contactForm: '5 submissions per hour'
    }
  });
});

// =============================================================================
// ERROR HANDLING
// =============================================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Endpoint ${req.method} ${req.path} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// =============================================================================
// SERVER STARTUP
// =============================================================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   ██████╗ ██╗      ██████╗     ██╗     ███████╗ ██████╗  █████╗ ║
║   ██╔══██╗██║     ██╔════╝     ██║     ██╔════╝██╔════╝ ██╔══██╗║
║   ██████╔╝██║     ██║  ███╗    ██║     █████╗  ██║  ███╗███████║║
║   ██╔══██╗██║     ██║   ██║    ██║     ██╔══╝  ██║   ██║██╔══██║║
║   ██████╔╝███████╗╚██████╔╝    ███████╗███████╗╚██████╔╝██║  ██║║
║   ╚═════╝ ╚══════╝ ╚═════╝     ╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝║
║                                                                ║
║   API Server v2.0.0                                            ║
╚════════════════════════════════════════════════════════════════╝

🚀 Server running on http://localhost:${PORT}
📅 Started at: ${new Date().toLocaleString()}
🌍 Environment: ${NODE_ENV}

📍 API Endpoints:
   ├── GET  /health              Health check
   ├── GET  /api/status          API status
   ├── GET  /api/reviews         Google Places reviews
   ├── GET  /api/facebook-reviews Facebook page data
   ├── GET  /api/all-reviews     Combined reviews
   └── POST /api/contact         Contact form submission

⚙️  Configuration Status:
   ├── Google Places API: ${isGoogleConfigured() ? '✅ Configured' : '❌ Not configured'}
   ├── Facebook Graph API: ${isFacebookConfigured() ? '✅ Configured' : '❌ Not configured'}
   ├── Email Notifications: ${emailTransporter ? '✅ Configured' : '❌ Not configured'}
   ├── Place ID: ${GOOGLE_PLACE_ID !== 'YOUR_PLACE_ID_HERE' ? GOOGLE_PLACE_ID : '❌ Not set'}
   └── Facebook Page: ${FACEBOOK_PAGE_ID}

📝 To configure APIs:
   1. Copy backend/env.example to backend/.env
   2. Add your API keys
   3. Restart the server

🔗 Documentation: https://github.com/dgililov/BLG-Legal-Services-Website
`);
});

module.exports = app;
