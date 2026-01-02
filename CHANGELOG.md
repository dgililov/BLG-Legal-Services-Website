# BLG Legal Services - Changelog

## [Version 2.0.0] - January 2, 2026

### 🚀 API Server & Social Integrations

**Major Features:**
- Full-featured Node.js/Express API server
- Google Places API integration for dynamic reviews
- Facebook Graph API integration for page data and recommendations
- Contact form with email notifications
- Enhanced security with rate limiting and input sanitization
- New comprehensive SRS v3.0 documentation

#### Backend Server Features:

**API Endpoints:**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check and configuration status |
| `/api/status` | GET | Detailed API status |
| `/api/reviews` | GET | Google Places reviews |
| `/api/facebook-reviews` | GET | Facebook page data |
| `/api/all-reviews` | GET | Combined reviews from both platforms |
| `/api/contact` | POST | Contact form submission with email |

**Security Features:**
- Helmet.js security headers
- Rate limiting (100/15min general, 5/hour contact form)
- CORS configuration
- Input sanitization
- Compression

**Dependencies Added:**
- `express` - Web framework
- `axios` - HTTP client for API calls
- `cors` - CORS middleware
- `dotenv` - Environment configuration
- `helmet` - Security headers
- `compression` - Response compression
- `morgan` - Request logging
- `express-rate-limit` - Rate limiting
- `nodemailer` - Email notifications

#### Files Modified/Added:

**Backend:**
- ✅ `backend/server.js` - Enhanced API server (v2.0)
- ✅ `backend/package.json` - Updated dependencies
- ✅ `backend/env.example` - Complete configuration template
- ✅ `backend/README.md` - Comprehensive setup guide

**Frontend:**
- ✅ `assets/js/reviews.js` - Enhanced reviews loader with fallbacks
- ✅ `pages/reviews.html` - Updated navigation (Q&A → F.A.Q)

**Documentation:**
- ✅ `docs/SRS_BLG_Legal_Services.md` - Complete rewrite (v3.0)
- ✅ `CHANGELOG.md` - This update

#### Setup Instructions:

```bash
# Install backend dependencies
cd backend
npm install

# Configure API keys
cp env.example .env
# Edit .env with your API keys

# Start the server
npm start        # Production
npm run dev      # Development with auto-reload
```

---

## [Version 1.2.0] - January 2, 2026

### 📝 Changed Q&A to F.A.Q (Commit: 0c9bae8)

**Reason:** F.A.Q (Frequently Asked Questions) is the more universally recognized standard abbreviation.

#### Updates in All 8 Languages:

| Language | Before | After |
|----------|--------|-------|
| 🇺🇸 English | Q&A | **F.A.Q** |
| 🇪🇸 Spanish | P&R | **P.M.F** (Preguntas Más Frecuentes) |
| 🇫🇷 French | Questions-Réponses | **F.A.Q** |
| 🇷🇺 Russian | Вопросы и Ответы | **Ч.З.В** (Часто Задаваемые Вопросы) |
| 🇮🇱 Hebrew | שאלות ותשובות | **שאלות נפוצות** (F.A.Q) |
| 🇬🇪 Georgian | კითხვა-პასუხი | **ხშირად დასმული კითხვები** (F.A.Q) |
| 🇮🇷 Farsi | پرسش و پاسخ | **سوالات متداول** (F.A.Q) |
| 🇺🇿 Uzbek | Savol-Javob | **Ko'p So'raladigan Savollar** (F.A.Q) |

#### Files Modified (10 files):

**Translations:**
- ✅ `assets/js/translations.js` - All 8 language translations updated

**HTML Pages:**
- ✅ `index.html` - English homepage navigation
- ✅ `es/index.html` - Spanish homepage navigation
- ✅ `pages/blog.html` - Navigation menu
- ✅ `pages/contact.html` - Navigation menu
- ✅ `pages/fees.html` - Navigation menu
- ✅ `pages/practice-areas/family-immigration.html` - Navigation menu
- ✅ `pages/qna.html` - Page title, header, and content
- ✅ `pages/reviews.html` - Navigation menu

**Documentation:**
- ✅ `docs/SRS_BLG_Legal_Services.md` - Updated requirements document

#### User-Facing Changes:

1. **Navigation Menu**: All navigation menus now show "F.A.Q" instead of "Q&A"
2. **Page Title**: QNA page now titled "F.A.Q - BLG Legal Services"
3. **Page Header**: Main heading updated to "Frequently Asked Questions (F.A.Q)"
4. **Language Switcher**: Each language shows appropriate FAQ abbreviation

---

## [Version 1.1.0] - January 2, 2026

### 🌍 Add Multilingual Support (Commit: cd080eb)

**Major Features:**
- Complete translation system for 8 languages
- Full Spanish homepage
- Language switcher with flag icons
- SEO hreflang tags
- RTL support for Hebrew & Farsi

**Files Added:**
- `assets/js/translations.js` (2000+ lines)
- `es/index.html` (Complete Spanish homepage)
- `MULTILINGUAL_README.md`
- Language placeholder pages (fr, ru, he, ka, fa, uz)

---

## [Version 1.0.0] - January 2, 2026

### 🎉 Initial Release

**Features:**
- Complete English website (8 pages)
- BLG logo and favicon
- Attorney fees page with pricing
- Practice areas pages
- Contact form
- Blog and Q&A structure
- Responsive design
- Accessibility features

**Files Created:**
- 19 total files
- 8 HTML pages
- 2 CSS files
- 3 JavaScript files
- 5 documentation files

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 2.0.0 | Jan 2, 2026 | API server with Google/Facebook integrations |
| 1.2.0 | Jan 2, 2026 | Q&A → F.A.Q change |
| 1.1.0 | Jan 2, 2026 | Multilingual support |
| 1.0.0 | Jan 2, 2026 | Initial release |

---

## API Configuration Checklist

After v2.0.0 installation:
- [ ] Run `npm install` in backend directory
- [ ] Copy `env.example` to `.env`
- [ ] Configure Google Places API key
- [ ] Get Google Place ID for the business
- [ ] Create Facebook App and get Page Access Token
- [ ] Configure email settings (optional)
- [ ] Start server with `npm start`
- [ ] Test endpoints at `http://localhost:3001/health`

---

## Next Updates Planned

### Phase 2 (Future):
- Online consultation booking with payment
- Client portal for case status
- Document upload portal
- Live chat support

### Phase 3 (Future):
- Video consultation integration
- AI chatbot for FAQs
- Fee calculator tool
- Newsletter system

---

**Maintained by:** BLG Legal Services Development Team  
**Repository:** https://github.com/dgililov/BLG-Legal-Services-Website  
**Contact:** law@blglegalservices.com  
**Last Updated:** January 2, 2026
