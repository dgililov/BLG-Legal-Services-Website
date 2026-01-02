# Dynamic Reviews Setup Guide

## 🎯 What Was Implemented

Your website now has **dynamic review integration** that fetches and displays reviews from:
- ✅ **Google Places API** - Shows Google Business reviews with ratings
- ✅ **Facebook Graph API** - Shows Facebook page ratings and stats

## 📋 Quick Setup (5 Steps)

### Step 1: Install Node.js

Download and install from: https://nodejs.org/
- Choose the LTS (Long Term Support) version
- Follow the installer instructions

### Step 2: Install Backend Dependencies

```bash
# Navigate to backend directory
cd "/Users/user01/BLG-Legal-Services-Website/backend"

# Install required packages
npm install
```

### Step 3: Get API Keys

#### Google Places API Key:
1. Go to: https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable **Google Places API**
4. Go to **Credentials** → Create **API Key**
5. Copy your API key

#### Google Place ID:
1. Go to: https://developers.google.com/maps/documentation/places/web-service/place-id
2. Search for: "BLG Legal Services Brooklyn"
3. Copy the Place ID (starts with `ChIJ...`)

#### Facebook Access Token:
1. Go to: https://developers.facebook.com/apps/
2. Create an app (Business type)
3. Go to: https://developers.facebook.com/tools/explorer/
4. Select your app
5. Click **Get Token** → **Get Page Access Token**
6. Select "blglegalservices" page
7. Grant permissions: `pages_read_engagement`
8. Copy the token

### Step 4: Configure Environment Variables

```bash
# Copy the example file
cp env.example .env

# Edit the .env file
nano .env  # or use any text editor
```

Add your API keys:
```env
GOOGLE_PLACES_API_KEY=YOUR_GOOGLE_API_KEY_HERE
GOOGLE_PLACE_ID=YOUR_PLACE_ID_HERE
FACEBOOK_PAGE_ID=blglegalservices
FACEBOOK_ACCESS_TOKEN=YOUR_FACEBOOK_TOKEN_HERE
PORT=3001
```

### Step 5: Start the Servers

#### Terminal 1 - Backend API Server:
```bash
cd "/Users/user01/BLG-Legal-Services-Website/backend"
npm start
```

#### Terminal 2 - Frontend Web Server:
```bash
cd "/Users/user01/BLG-Legal-Services-Website"
python3 -m http.server 8000
```

## ✅ Testing

1. **Check Backend Health**:
   - Open: http://localhost:3001/health
   - Should show: `"status": "OK"` with configuration status

2. **Test Google Reviews**:
   - Open: http://localhost:3001/api/reviews
   - Should return JSON with reviews

3. **Test Facebook Data**:
   - Open: http://localhost:3001/api/facebook-reviews
   - Should return JSON with Facebook data

4. **View Reviews Page**:
   - Open: http://localhost:8000/pages/reviews.html
   - Should see dynamic reviews loading

## 🎨 What You'll See

### Google Reviews Section:
- ⭐⭐⭐⭐⭐ Overall rating badge
- Total review count
- Individual review cards with:
  - Reviewer name and photo
  - Star rating
  - Review text
  - Time posted

### Facebook Section:
- Overall star rating
- Fan/follower count
- Page statistics
- Live Facebook Page Plugin (timeline)

## 🐛 Troubleshooting

### "Loading reviews..." doesn't finish
✅ **Solution**: Make sure backend server is running on port 3001
```bash
curl http://localhost:3001/health
```

### "API key not configured" error
✅ **Solution**: Check your .env file has the correct API keys

### CORS errors in browser console
✅ **Solution**: Make sure frontend is on http://localhost:8000

### Reviews not showing
✅ **Solution**: 
1. Check backend server logs for errors
2. Verify API keys are active
3. Check browser console for error messages

## 💰 Costs

- **Google Places API**: Free for first 28,500 requests/month
- **Facebook Graph API**: Free
- **Total**: Free for typical small business usage

## 📚 Documentation

Full documentation available in:
- `backend/README.md` - Complete backend setup guide
- `docs/GOOGLE_REVIEWS_INTEGRATION.md` - Integration options

## 🚀 Optional: Production Deployment

For production (live website):

1. **Deploy Backend**:
   - Heroku (free tier): https://heroku.com
   - DigitalOcean ($5/month): https://digitalocean.com
   - Or any Node.js hosting

2. **Update Frontend**:
   - Edit `assets/js/reviews.js`
   - Change `REVIEWS_API_URL` to your production API URL

3. **Security**:
   - Restrict Google API key to your domain
   - Use long-lived Facebook access token
   - Update CORS settings

## 📞 Support

If you need help:
- Check `backend/README.md` for detailed instructions
- Review error messages in server console
- Test API endpoints individually

## ✨ Features

✅ Real-time review fetching
✅ Automatic rating calculations
✅ Beautiful review cards
✅ Reviewer photos
✅ Timestamp formatting ("2 days ago")
✅ Error handling with fallback links
✅ Loading states
✅ Mobile responsive
✅ Secure (API keys hidden from frontend)

---

**Ready to go!** Just follow the 5 steps above and your reviews will load dynamically! 🎉

