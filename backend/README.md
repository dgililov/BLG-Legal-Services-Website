# BLG Legal Services - API Server

A Node.js/Express backend server that provides API endpoints for:
- **Google Places API** - Fetching business reviews and ratings
- **Facebook Graph API** - Page data, followers, and recommendations  
- **Contact Form** - Email notifications for form submissions

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
cp env.example .env
```

Edit `.env` with your API keys (see [API Setup Guide](#-api-setup-guide) below).

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3001`

## 📍 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check and configuration status |
| `/api/status` | GET | Detailed API status and available endpoints |
| `/api/reviews` | GET | Google Places reviews |
| `/api/facebook-reviews` | GET | Facebook page data and ratings |
| `/api/all-reviews` | GET | Combined data from both platforms |
| `/api/contact` | POST | Contact form submission |

### Example Requests

**Health Check:**
```bash
curl http://localhost:3001/health
```

**Get Google Reviews:**
```bash
curl http://localhost:3001/api/reviews
```

**Get All Reviews:**
```bash
curl http://localhost:3001/api/all-reviews
```

**Submit Contact Form:**
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "service": "immigration",
    "message": "I need help with my visa application."
  }'
```

## 🔑 API Setup Guide

### Google Places API

1. **Create a Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Required APIs:**
   - Navigate to "APIs & Services" → "Library"
   - Enable "Places API" and "Places API (New)"

3. **Create API Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key to your `.env` file as `GOOGLE_PLACES_API_KEY`

4. **Find Your Place ID:**
   - Go to [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
   - Search for "BLG Legal Services"
   - Copy the Place ID to your `.env` file as `GOOGLE_PLACE_ID`

5. **Secure Your API Key (Recommended):**
   - In the Credentials page, click on your API key
   - Add restrictions:
     - Application restrictions: IP addresses (your server IP)
     - API restrictions: Places API only

### Facebook Graph API

1. **Create a Facebook App:**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Click "My Apps" → "Create App"
   - Choose "Business" type
   - Complete the app setup

2. **Add Facebook Login Product:**
   - In your app dashboard, click "Add Product"
   - Add "Facebook Login"

3. **Connect Your Facebook Page:**
   - Go to "Settings" → "Advanced"
   - Add your Facebook Page to the app

4. **Generate Page Access Token:**
   - Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
   - Select your app
   - Click "Get User Access Token"
   - Select permissions:
     - `pages_read_engagement`
     - `pages_read_user_content`
   - Click "Generate Access Token"
   - Copy the token to your `.env` file as `FACEBOOK_ACCESS_TOKEN`

5. **Convert to Long-Lived Token (Recommended):**
   ```bash
   curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_LIVED_TOKEN"
   ```

### Email Configuration (Gmail)

1. **Enable 2-Factor Authentication:**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password:**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Enter "BLG Website"
   - Copy the 16-character password

3. **Configure `.env`:**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx  # App password (no spaces)
   EMAIL_TO=law@blglegalservices.com
   ```

## ⚙️ Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 3001) |
| `NODE_ENV` | No | Environment: development/production |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins |
| `GOOGLE_PLACES_API_KEY` | Yes* | Google Places API key |
| `GOOGLE_PLACE_ID` | Yes* | Google Business Place ID |
| `FACEBOOK_PAGE_ID` | Yes* | Facebook Page ID or username |
| `FACEBOOK_ACCESS_TOKEN` | Yes* | Facebook Page Access Token |
| `EMAIL_HOST` | No | SMTP server hostname |
| `EMAIL_PORT` | No | SMTP server port |
| `EMAIL_USER` | No | SMTP username/email |
| `EMAIL_PASS` | No | SMTP password/app password |
| `EMAIL_TO` | No | Recipient email for contact forms |

*Required for the respective feature to work

## 🔒 Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - 100 requests/15min (general), 5/hour (contact form)
- **CORS** - Configurable origin whitelist
- **Input Sanitization** - XSS prevention
- **Compression** - Response compression

## 📊 Rate Limits

| Endpoint | Limit |
|----------|-------|
| General | 100 requests per 15 minutes |
| Contact Form | 5 submissions per hour |

## 🐛 Troubleshooting

### "API key not configured"
- Ensure `.env` file exists in the `backend/` directory
- Check that API keys are not placeholder values

### "Place ID not found"
- Verify the Place ID at [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
- Ensure the business is listed on Google Maps

### "Facebook API Error"
- Check that the access token is valid and not expired
- Ensure the token has required permissions
- Verify the Page ID is correct

### "CORS Error"
- Add your frontend URL to `ALLOWED_ORIGINS` in `.env`
- Restart the server after changing `.env`

### "Email not sending"
- Verify Gmail App Password is correct (no spaces)
- Ensure 2FA is enabled on your Google account
- Check spam folder for test emails

## 📝 Logging

The server logs:
- All incoming requests (development mode: detailed, production: combined format)
- API errors with stack traces
- Contact form submissions
- Email send status

## 🔄 Response Format

All API responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2026-01-02T12:00:00.000Z"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human-readable error message"
}
```

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web framework |
| axios | ^1.6.2 | HTTP client |
| cors | ^2.8.5 | CORS middleware |
| dotenv | ^16.3.1 | Environment variables |
| helmet | ^7.1.0 | Security headers |
| compression | ^1.7.4 | Response compression |
| morgan | ^1.10.0 | Request logging |
| express-rate-limit | ^7.1.5 | Rate limiting |
| nodemailer | ^6.9.7 | Email sending |

## 🚀 Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### PM2 (Production)

```bash
npm install -g pm2
pm2 start server.js --name "blg-api"
pm2 save
pm2 startup
```

### Environment Variables in Production

Never commit your `.env` file. Use environment variables from your hosting platform:
- Heroku: Config Vars
- AWS: Parameter Store / Secrets Manager
- Vercel: Environment Variables
- DigitalOcean: App Platform Environment

## 📞 Support

- **Technical Issues:** [GitHub Issues](https://github.com/dgililov/BLG-Legal-Services-Website/issues)
- **Email:** law@blglegalservices.com

---

**Version:** 2.0.0  
**Last Updated:** January 2, 2026
