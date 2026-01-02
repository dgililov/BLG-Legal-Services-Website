# BLG Legal Services - Reviews API Backend

This backend server fetches reviews from Google Places API and Facebook Graph API and serves them to the frontend securely.

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v14 or higher) - Download from https://nodejs.org/
2. **Google Places API Key** - Get from Google Cloud Console
3. **Facebook Access Token** - Get from Facebook Developers
4. **Place IDs** - Your Google Business and Facebook Page IDs

### Installation Steps

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp env.example .env

# 4. Edit .env and add your API keys (see below)
nano .env  # or use any text editor

# 5. Start the server
npm start
```

## 🔑 API Keys Setup

### Google Places API

#### Step 1: Create Google Cloud Project
1. Go to: https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable **Google Places API**

#### Step 2: Create API Key
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click **Create Credentials** → **API Key**
3. Copy your API key

#### Step 3: Get Place ID
1. Go to: https://developers.google.com/maps/documentation/places/web-service/place-id
2. Search for: "BLG Legal Services Brooklyn NY"
3. Copy the Place ID (starts with something like: `ChIJ...`)

### Facebook Graph API

#### Step 1: Create Facebook App
1. Go to: https://developers.facebook.com/apps/
2. Click **Create App**
3. Select **Business** type
4. Fill in app details

#### Step 2: Get Page Access Token
1. Go to: https://developers.facebook.com/tools/explorer/
2. Select your app
3. Click **Get Token** → **Get Page Access Token**
4. Select your Facebook page
5. Grant permissions: `pages_read_engagement`, `pages_show_list`
6. Copy the generated token

**Important:** For production, you should get a long-lived token:
```bash
curl -G \
  -d "grant_type=fb_exchange_token" \
  -d "client_id={app-id}" \
  -d "client_secret={app-secret}" \
  -d "fb_exchange_token={short-lived-token}" \
  https://graph.facebook.com/v18.0/oauth/access_token
```

## ⚙️ Configuration

Edit your `.env` file:

```env
# Google Places API
GOOGLE_PLACES_API_KEY=AIzaSy...your_key_here
GOOGLE_PLACE_ID=ChIJ...your_place_id_here

# Facebook Graph API
FACEBOOK_PAGE_ID=blglegalservices
FACEBOOK_ACCESS_TOKEN=EAABs...your_token_here

# Server Settings
PORT=3001
NODE_ENV=development
```

## 📡 API Endpoints

Once the server is running on `http://localhost:3001`:

### Health Check
```bash
GET http://localhost:3001/health
```
Returns server status and configuration state.

### Google Reviews
```bash
GET http://localhost:3001/api/reviews
```
Returns Google Business reviews and ratings.

Response:
```json
{
  "success": true,
  "data": {
    "name": "BLG Legal Services",
    "rating": 4.9,
    "user_ratings_total": 45,
    "reviews": [...]
  }
}
```

### Facebook Reviews
```bash
GET http://localhost:3001/api/facebook-reviews
```
Returns Facebook page ratings and data.

Response:
```json
{
  "success": true,
  "data": {
    "page": {
      "name": "BLG Legal Services",
      "overall_star_rating": 4.8,
      "rating_count": 32,
      "fan_count": 1250
    },
    "ratings": [...]
  }
}
```

### All Reviews (Combined)
```bash
GET http://localhost:3001/api/all-reviews
```
Returns reviews from both Google and Facebook.

## 🧪 Testing

### Test Health Check
```bash
curl http://localhost:3001/health
```

### Test Google Reviews
```bash
curl http://localhost:3001/api/reviews
```

### Test Facebook Reviews
```bash
curl http://localhost:3001/api/facebook-reviews
```

### Test Combined Reviews
```bash
curl http://localhost:3001/api/all-reviews
```

## 🔒 Security Notes

1. **Never commit `.env` file** - It contains sensitive API keys
2. **API Key Restrictions** - Restrict your Google API key to your domain in production
3. **CORS** - Update `ALLOWED_ORIGINS` for production deployment
4. **Access Tokens** - Use long-lived tokens for production
5. **Rate Limiting** - Consider adding rate limiting for production

## 📝 Costs

### Google Places API
- **Free Tier**: 28,500 requests per month
- **After Free Tier**: $17 per 1,000 requests
- **Estimated Cost**: Free for most small websites

### Facebook Graph API
- **Free**: No costs for Graph API calls

## 🐛 Troubleshooting

### "API key not configured"
- Check that `.env` file exists in `backend/` directory
- Verify `GOOGLE_PLACES_API_KEY` is set correctly
- Restart the server after editing `.env`

### "Place ID not configured"
- Make sure you've set `GOOGLE_PLACE_ID` in `.env`
- Verify the Place ID is correct (starts with `ChIJ`)

### "Facebook access token not configured"
- Check that `FACEBOOK_ACCESS_TOKEN` is set in `.env`
- Verify the token has the required permissions
- Regenerate token if expired

### CORS Errors
- Make sure the frontend is running on `http://localhost:8000`
- Check `ALLOWED_ORIGINS` in `.env`
- Restart server after changes

### Reviews Not Loading
1. Check that backend server is running: `http://localhost:3001/health`
2. Verify API keys are configured correctly
3. Check browser console for error messages
4. Try testing endpoints directly with curl

## 🚢 Deployment

### For Production Deployment:

1. **Environment Variables**
   - Set all `.env` variables on your hosting platform
   - Use long-lived Facebook access token

2. **CORS**
   - Update `ALLOWED_ORIGINS` to your production domain

3. **API Key Security**
   - Restrict Google API key to your domain
   - Enable HTTP referrer restrictions

4. **Hosting Options**
   - **Heroku**: Easy deployment, free tier available
   - **DigitalOcean**: More control, starting at $5/month
   - **AWS/Google Cloud**: Scalable, pay-per-use
   - **Vercel/Netlify**: Serverless functions

5. **Update Frontend**
   - Change `REVIEWS_API_URL` in `assets/js/reviews.js`
   - Update to your production API URL

## 📚 Dependencies

- **express**: Web server framework
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **axios**: HTTP client for API requests

## 💡 Tips

1. **Cache Reviews**: Consider caching API responses to reduce API calls
2. **Error Handling**: The server provides detailed error messages
3. **Monitoring**: Monitor API usage in Google Cloud Console
4. **Refresh Token**: Facebook tokens expire; set up auto-refresh
5. **Backup Plan**: Keep the direct links as fallback

## 🆘 Support

If you need help:
1. Check the error messages in server console
2. Review the troubleshooting section
3. Test endpoints individually
4. Verify API keys are active and have correct permissions

## 📄 License

MIT License - See LICENSE file for details

## 👥 Author

BLG Legal Services
- Website: https://blglegalservices.com
- Email: law@blglegalservices.com
- Phone: 646-948-9555

