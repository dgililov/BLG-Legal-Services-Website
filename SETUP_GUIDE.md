# BLG Legal Services Website - Setup Guide

## 🚀 Quick Start

### 1. Add Your Logo
Replace the placeholder with your actual logo:
- Save your logo as `assets/images/logo.png` (recommended size: 400x100px)
- Alternatively, update the logo path in all HTML files

### 2. Configure Contact Form
Update `assets/js/form.js`:
```javascript
const FORM_CONFIG = {
  contactEmail: 'law@blglegalservices.com',
  formHandlerURL: '/api/contact',  // Your backend endpoint
  useThirdPartyService: false,     // Set to true if using FormSpree
  formSpreeURL: 'YOUR_FORMSPREE_URL'
};
```

### 3. Add reCAPTCHA
1. Get a site key from [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Update in `pages/contact.html`:
```html
<div class="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>
```

### 4. Setup Google Analytics
Replace `G-XXXXXXXXXX` with your GA4 tracking ID in:
- `index.html`
- All page HTML files

### 5. Test Locally
```bash
cd BLG-Legal-Services-Website
python3 -m http.server 8000
# Open http://localhost:8000
```

## 📋 TODO After Setup

### Immediate Tasks
- [ ] Add your actual logo image
- [ ] Configure contact form backend
- [ ] Add reCAPTCHA keys
- [ ] Update Google Analytics ID
- [ ] Test all forms and navigation
- [ ] Verify mobile responsiveness
- [ ] Check all links

### Content Population
- [ ] Populate blog with 5-10 initial articles
- [ ] Add 10-15 Q&A entries
- [ ] Create remaining practice area pages:
  - asylum.html
  - employment-immigration.html
  - green-card.html
  - citizenship.html
  - removal-defense.html
  - trademark.html
- [ ] Add more client testimonials (with permission)

### Advanced Configuration
- [ ] Set up SSL certificate (Let's Encrypt recommended)
- [ ] Configure email service (SendGrid, Mailgun, or SMTP)
- [ ] Set up automated backups
- [ ] Configure CDN (Cloudflare recommended)
- [ ] Implement full multilingual content
- [ ] Add Google Maps API key for embedded map
- [ ] Set up consultation booking system (optional)

## 🌐 Deployment Options

### Option 1: Static Hosting (Easiest)

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 2: Traditional Hosting (cPanel/VPS)

**Via FTP:**
1. Connect to your hosting via FTP
2. Upload all files to `public_html` or `www` directory
3. Ensure `.htaccess` is configured for clean URLs

**Via SSH:**
```bash
rsync -avz --exclude '.git' ./ user@server:/var/www/blglegalservices.com/
```

### Option 3: AWS S3 + CloudFront

```bash
# Sync to S3
aws s3 sync . s3://your-bucket-name/ --exclude ".git/*"

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## 🔧 Configuration Files to Update

### 1. Contact Email
- `assets/js/form.js` - FORM_CONFIG.contactEmail
- All footer sections in HTML files

### 2. Phone Number
- All header sections: `tel:+16469489555`
- Update with actual phone number

### 3. Office Address
- All footer sections and contact page
- Update Google Maps embed iframe src if address changes

### 4. Social Media (Future)
- Add social media links in footer if applicable
- Update Open Graph image in `<head>` sections

## 📱 Mobile Testing

Test on these devices/sizes:
- iPhone 12/13/14 (390px)
- iPhone SE (375px)
- iPad (768px)
- iPad Pro (1024px)
- Desktop (1920px+)

## ♿ Accessibility Checklist

- [ ] All images have alt text
- [ ] Forms have proper labels
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Keyboard navigation works
- [ ] Screen reader tested (NVDA or JAWS)
- [ ] Focus indicators visible

## 🔒 Security Checklist

- [ ] SSL certificate installed and working
- [ ] HTTPS redirect configured
- [ ] reCAPTCHA protecting forms
- [ ] Input validation on forms
- [ ] Security headers configured (.htaccess)
- [ ] Regular backups scheduled

## 📊 Performance Optimization

- [ ] Images optimized (use WebP with fallbacks)
- [ ] Minify CSS and JavaScript for production
- [ ] Enable GZIP/Brotli compression
- [ ] Implement browser caching
- [ ] Use CDN for static assets
- [ ] Test with Google PageSpeed Insights

## 🎨 Branding Customization

### Colors
Update in `assets/css/style.css`:
```css
:root {
  --primary-color: #1e3a8a;     /* Deep Blue */
  --secondary-color: #3b82f6;   /* Bright Blue */
  --accent-color: #10b981;      /* Green */
}
```

### Fonts
Update Google Fonts link in all HTML files if you want different fonts.

## 📝 Content Guidelines

### Blog Posts
- Focus on immigration law updates
- USCIS policy changes
- Step-by-step guides
- Success stories (with client permission)
- FAQ answers

### Q&A Entries
- Common visa questions
- Process timelines
- Document requirements
- Fee explanations

## 🌍 Multilingual Implementation

### Phase 1 (Current)
- Language switcher foundation
- 8 language support structure

### Phase 2 (To Implement)
1. Create translation JSON files in `assets/js/lang/`
2. Translate all content
3. Create language-specific URLs (e.g., `/es/index.html`)
4. Add hreflang tags for SEO
5. Test RTL languages (Hebrew, Farsi)

## 📧 Email Configuration

### Option 1: FormSpree
```javascript
useThirdPartyService: true,
formSpreeURL: 'https://formspree.io/f/YOUR_FORM_ID'
```

### Option 2: SendGrid API
```javascript
// In your backend
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

### Option 3: Custom PHP Handler
Create `api/contact.php`:
```php
<?php
// Form handling code
mail($to, $subject, $message, $headers);
?>
```

## 🎯 SEO Optimization

- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Claim and optimize Google Business Profile
- [ ] Get listed in legal directories
- [ ] Build quality backlinks
- [ ] Regular content updates (blog)

## 📞 Support

For technical questions:
- Email: law@blglegalservices.com
- Phone: 646-948-9555

For website development support:
- Refer to README.md
- Check SRS documentation

## 🎉 Launch Checklist

Before going live:
- [ ] All content reviewed and approved
- [ ] All links tested
- [ ] Forms tested and working
- [ ] Mobile responsive on all devices
- [ ] Accessibility audit passed
- [ ] Performance score >90 on Lighthouse
- [ ] SSL certificate active
- [ ] Google Analytics tracking
- [ ] Contact information correct
- [ ] Pricing tables accurate
- [ ] Legal disclaimers in place
- [ ] Privacy policy and terms of service added

---

**Congratulations on launching your website! 🚀**

For ongoing maintenance and updates, refer to the README.md file.

