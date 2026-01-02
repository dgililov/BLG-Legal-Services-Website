# BLG Legal Services - Multilingual Website Structure

## 🌍 Supported Languages

The website currently supports **8 languages**:

1. 🇺🇸 **English** (en) - **COMPLETE** - Main language at `/index.html`
2. 🇪🇸 **Spanish** (es) - **COMPLETE** - Full homepage at `/es/index.html`
3. 🇫🇷 **French** (fr) - **COMING SOON** - Framework ready at `/fr/`
4. 🇷🇺 **Russian** (ru) - **COMING SOON** - Framework ready at `/ru/`
5. 🇮🇱 **Hebrew** (he) - **COMING SOON** - RTL support ready at `/he/`
6. 🇬🇪 **Georgian** (ka) - **COMING SOON** - Framework ready at `/ka/`
7. 🇮🇷 **Farsi** (fa) - **COMING SOON** - RTL support ready at `/fa/`
8. 🇺🇿 **Uzbek** (uz) - **COMING SOON** - Framework ready at `/uz/`

---

## 📁 Directory Structure

```
BLG-Legal-Services-Website/
├── index.html (English - Main)
├── es/
│   └── index.html (Spanish - Complete)
├── fr/
│   └── index.html (French - Placeholder)
├── ru/
│   └── index.html (Russian - Placeholder)
├── he/
│   └── index.html (Hebrew - Placeholder with RTL)
├── ka/
│   └── index.html (Georgian - Placeholder)
├── fa/
│   └── index.html (Farsi - Placeholder with RTL)
├── uz/
│   └── index.html (Uzbek - Placeholder)
└── assets/
    └── js/
        └── translations.js (Complete translations for all 8 languages)
```

---

## 🎯 Implementation Status

### Phase 1: Complete ✅
- [x] English homepage (full content)
- [x] Spanish homepage (full translation)
- [x] Translation system (all 8 languages)
- [x] Language switcher functionality
- [x] SEO hreflang tags
- [x] RTL support for Hebrew & Farsi

### Phase 2: In Progress 🚧
- [ ] French homepage
- [ ] Russian homepage
- [ ] Hebrew homepage (RTL)
- [ ] Georgian homepage
- [ ] Farsi homepage (RTL)
- [ ] Uzbek homepage

### Phase 3: Future 📋
- [ ] All internal pages for each language
- [ ] Practice area pages (multilingual)
- [ ] Blog posts (multilingual)
- [ ] Q&A section (multilingual)
- [ ] Contact form (multilingual)

---

## 🔧 How to Add New Language Content

### Step 1: Use the Translation File

All translations are ready in `/assets/js/translations.js`:

```javascript
const TRANSLATIONS = {
  en: { 'hero.title': 'Expert Immigration Law Services', ... },
  es: { 'hero.title': 'Servicios Expertos en Derecho de Inmigración', ... },
  fr: { 'hero.title': 'Services Experts en Droit de l\'Immigration', ... },
  // ... all 8 languages
};
```

### Step 2: Copy Template

Use `/es/index.html` as a template:

1. Copy `/es/index.html` to target language directory (e.g., `/fr/index.html`)
2. Update `<html lang="es">` to target language (e.g., `<html lang="fr">`)
3. Replace Spanish content with translations from `translations.js`
4. Update hreflang links
5. For RTL languages (Hebrew, Farsi): Add `dir="rtl"` to `<html>` tag

### Step 3: Update Navigation

Ensure language selector includes all languages:

```html
<select id="lang-selector" onchange="window.location.href=this.value">
  <option value="../index.html">🇺🇸 English</option>
  <option value="../es/index.html">🇪🇸 Español</option>
  <option value="../fr/index.html">🇫🇷 Français</option>
  <!-- etc -->
</select>
```

---

## 🌐 SEO Configuration

### Hreflang Tags

Each language page includes proper hreflang tags:

```html
<link rel="alternate" hreflang="en" href="../index.html" />
<link rel="alternate" hreflang="es" href="../es/index.html" />
<link rel="alternate" hreflang="fr" href="../fr/index.html" />
<!-- etc for all 8 languages -->
```

### Language-Specific Meta Tags

```html
<html lang="es">
  <head>
    <meta name="description" content="[Translated description]">
    <title>[Translated title]</title>
  </head>
</html>
```

---

## 🎨 RTL (Right-to-Left) Support

### Hebrew and Farsi

For RTL languages, add `dir="rtl"` to the HTML tag:

```html
<html lang="he" dir="rtl">
```

The CSS already includes RTL support in `/assets/css/responsive.css`:

```css
[dir="rtl"] {
  direction: rtl;
}

[dir="rtl"] .nav-menu {
  left: -100%;
  right: auto;
}
/* ... more RTL styles */
```

---

## 📝 Translation Guidelines

### Maintaining Consistency

1. **Legal Terms**: Keep legal terms consistent across all content
2. **Brand Name**: "BLG Legal Services" stays in English
3. **Contact Info**: Phone, email, address stay in English/numbers
4. **Currency**: Always use "$" (U.S. dollars)
5. **Tone**: Professional, compassionate, trustworthy

### Professional Translation

For best results:
- Use professional translators (not machine translation)
- Have native speakers review content
- Ensure legal terminology is accurate
- Test with native speakers from target demographic

---

## 🔗 Internal Links

### Language-Specific Pages

When linking within a language version:
- **Same language**: Use relative paths (`index.html`, `about.html`)
- **Shared resources**: Link to English version (`../pages/fees.html`)
- **Language switch**: Update full path (`../es/index.html`)

### Example Navigation (Spanish page):

```html
<a href="index.html">Inicio</a> <!-- Spanish homepage -->
<a href="../pages/fees.html">Tarifas</a> <!-- English fees page -->
<a href="../pages/contact.html">Contacto</a> <!-- English contact -->
```

---

## 📊 Current Translation Coverage

| Language | Homepage | Fees | Practice Areas | Contact | Blog/Q&A |
|----------|----------|------|----------------|---------|----------|
| English  | ✅ 100%  | ✅ 100% | ✅ 100% | ✅ 100% | ✅ 100% |
| Spanish  | ✅ 100%  | 🔗 Link | 🔗 Link | 🔗 Link | 🔗 Link |
| French   | 🚧 25%   | 🔗 Link | 🔗 Link | 🔗 Link | 🔗 Link |
| Russian  | 🚧 25%   | 🔗 Link | 🔗 Link | 🔗 Link | 🔗 Link |
| Hebrew   | 🚧 25%   | 🔗 Link | 🔗 Link | 🔗 Link | 🔗 Link |
| Georgian | 🚧 25%   | 🔗 Link | 🔗 Link | 🔗 Link | 🔗 Link |
| Farsi    | 🚧 25%   | 🔗 Link | 🔗 Link | 🔗 Link | 🔗 Link |
| Uzbek    | 🚧 25%   | 🔗 Link | 🔗 Link | 🔗 Link | 🔗 Link |

**Legend:**
- ✅ = Fully translated
- 🔗 = Links to English version
- 🚧 = Placeholder/Under construction

---

## 🎯 Next Steps

### Immediate (High Priority)
1. Complete French homepage
2. Complete Russian homepage
3. Test language switcher across all pages

### Short Term (Medium Priority)
1. Translate all internal pages to Spanish
2. Complete Hebrew homepage (with RTL testing)
3. Complete Farsi homepage (with RTL testing)

### Long Term (Low Priority)
1. Georgian and Uzbek homepages
2. Blog articles in multiple languages
3. Q&A in multiple languages
4. Multilingual SEO optimization

---

## 🧪 Testing

### Browser Testing
- Test language switcher on all pages
- Verify RTL display for Hebrew & Farsi
- Check character encoding for Cyrillic, Georgian, Arabic

### Mobile Testing
- Language switcher dropdown works
- RTL navigation works correctly
- Font sizes appropriate for all scripts

### SEO Testing
- Hreflang tags validated
- Google Search Console configured
- Language-specific sitemaps

---

## 📞 Contact for Translation Services

Need professional translation?
- **Project Manager**: law@blglegalservices.com
- **Phone**: 646-948-9555

---

## 🏆 Best Practices

1. **Always use UTF-8 encoding**
2. **Include lang attribute** on `<html>` tag
3. **Add dir="rtl"** for Hebrew and Farsi
4. **Use professional translators** for legal content
5. **Test with native speakers** before publishing
6. **Keep brand consistency** across all languages
7. **Update all languages** when making major changes

---

**Last Updated**: January 2, 2026  
**Status**: Spanish complete, other languages in progress  
**Maintainer**: BLG Legal Services Development Team

