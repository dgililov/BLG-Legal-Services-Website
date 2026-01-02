# BLG Legal Services Website

![BLG Legal Services](assets/images/logo.png)

A professional, multilingual website for BLG Legal Services - specializing in U.S. Immigration Law, Trademark Registration, and Business Formation.

## 🌟 Features

- **Three Service Lines**: Immigration, Trademark Registration, and Business Formation
- **Transparent Pricing**: Complete fee schedules for all services
- **Multilingual Support**: 8 languages (English, French, Spanish, Russian, Hebrew, Georgian, Farsi, Uzbek)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: WCAG 2.1 Level AA compliant
- **Blog & Q&A**: Educational content for clients
- **Client Reviews**: Google Reviews integration
- **Contact Forms**: Secure consultation requests with reCAPTCHA

## 📋 Service Areas

### Immigration Practice
- Family-Based Immigration
- Asylum & Humanitarian Protection
- Employment & Business Immigration
- Green Card & Adjustment of Status
- Citizenship & Naturalization
- Removal Defense & Motions

### Trademark Registration
- USPTO Applications
- Trademark Searches
- Office Action Responses
- Brand Protection & Enforcement

### Business Formation
- LLC Formation
- Corporation Formation
- State-specific registrations

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **Bootstrap 5**: Responsive framework
- **JavaScript (ES6+)**: Interactive features
- **Font Awesome**: Icons

### Features Implemented
- Responsive navigation with mobile hamburger menu
- Multilingual language switcher (foundation)
- Interactive pricing tables
- Contact form with validation
- Google Reviews integration
- SEO optimization
- Accessibility features

## 📁 Project Structure

```
BLG-Legal-Services-Website/
├── assets/
│   ├── css/
│   │   ├── style.css          # Main stylesheet
│   │   └── responsive.css     # Responsive styles
│   ├── js/
│   │   ├── main.js            # Core JavaScript
│   │   ├── form.js            # Form handling
│   │   └── lang.js            # Language switcher
│   ├── images/
│   │   └── logo.png           # BLG Logo
│   └── fonts/                 # Custom fonts (if needed)
├── docs/
│   └── SRS_BLG_Legal_Services.md  # Requirements document
├── pages/
│   ├── fees.html              # Attorney fees
│   ├── practice-areas/
│   │   ├── family-immigration.html
│   │   ├── asylum.html
│   │   ├── employment-immigration.html
│   │   ├── green-card.html
│   │   ├── citizenship.html
│   │   ├── removal-defense.html
│   │   └── trademark.html
│   ├── reviews.html           # Client testimonials
│   ├── blog.html              # Blog section
│   ├── qna.html               # Q&A section
│   └── contact.html           # Contact page
├── index.html                 # Homepage
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (Apache, Nginx) or local development server
- SSL certificate for production deployment

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/BLG-Legal-Services-Website.git
   cd BLG-Legal-Services-Website
   ```

2. **Start a local server**
   
   Using Python:
   ```bash
   python3 -m http.server 8000
   ```
   
   Using PHP:
   ```bash
   php -S localhost:8000
   ```
   
   Using Node.js (http-server):
   ```bash
   npx http-server -p 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Deployment

#### Option 1: Static Hosting (Netlify, Vercel)
```bash
# Connect your Git repository to Netlify or Vercel
# They will automatically deploy on push
```

#### Option 2: Traditional Hosting (cPanel, VPS)
```bash
# Upload files via FTP or rsync
rsync -avz --exclude '.git' ./ user@server:/var/www/blglegalservices.com/
```

#### Option 3: AWS S3 + CloudFront
```bash
# Sync to S3 bucket
aws s3 sync . s3://your-bucket-name/ --exclude ".git/*"
```

## 🔧 Configuration

### Email Configuration
Update the form handler in `assets/js/form.js`:
```javascript
const CONTACT_EMAIL = 'law@blglegalservices.com';
```

### Google Analytics
Add your GA4 tracking ID in the `<head>` of all HTML files:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

### reCAPTCHA
Add your site key in the contact form:
```html
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
```

## 🌍 Multilingual Setup

The website includes a foundation for 8 languages. To add translations:

1. Create language JSON files in `assets/js/lang/`:
   - `en.json` (English)
   - `es.json` (Spanish)
   - `fr.json` (French)
   - `ru.json` (Russian)
   - `he.json` (Hebrew)
   - `ka.json` (Georgian)
   - `fa.json` (Farsi)
   - `uz.json` (Uzbek)

2. Update `assets/js/lang.js` to load translations

3. For full multilingual support, consider implementing a CMS with i18n support

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (iOS 13+)
- Chrome Mobile (last 2 versions)

## ♿ Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- Screen reader compatible
- Proper ARIA labels
- Color contrast compliant
- Focus indicators

## 🔒 Security Features

- HTTPS/SSL required
- Form input validation and sanitization
- reCAPTCHA spam protection
- CSRF protection (implement server-side)
- No sensitive data in client-side code

## 📈 Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90 (desktop), > 85 (mobile)
- Page Size: < 2MB

## 📝 Contact Information

**BLG Legal Services**
- **Address**: 315 Madison Avenue, 3rd Floor, New York, NY 10017
- **Phone**: [646-948-9555](tel:646-948-9555)
- **Email**: [law@blglegalservices.com](mailto:law@blglegalservices.com)
- **Hours**: Monday - Saturday, 9:00 AM - 5:00 PM

**Service Areas**: New York Metro Area (primary), All 50 U.S. States, International

## 🤝 Contributing

This is a private project for BLG Legal Services. For any questions or updates, please contact the development team.

## 📄 License

© 2025 BLG Legal Services. All rights reserved.

## 🗺️ Roadmap

### Phase 1 (Current - v1.0)
- [x] Website structure and design
- [x] Homepage with service overview
- [x] Attorney fees page with pricing
- [x] Practice areas pages
- [x] Contact form
- [x] Blog and Q&A sections (empty state)
- [x] Responsive design
- [x] SEO optimization

### Phase 2 (Future)
- [ ] Online consultation booking with payment
- [ ] Client portal for case status
- [ ] Document upload portal
- [ ] Live chat support
- [ ] Full multilingual content
- [ ] CMS integration (WordPress/custom)

### Phase 3 (Future)
- [ ] Video consultation integration
- [ ] AI chatbot for FAQs
- [ ] Fee calculator tool
- [ ] Resource library with downloadable guides
- [ ] Newsletter system

## 📞 Support

For website-related questions:
- Technical issues: Create an issue in the repository
- Content updates: Contact law@blglegalservices.com
- Emergency: Call 646-948-9555

---

**Built with ❤️ for BLG Legal Services**

*Opening doors and protecting dreams since 2025*

