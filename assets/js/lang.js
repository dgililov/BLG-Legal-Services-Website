/**
 * BLG Legal Services - Language Switcher
 * Author: BLG Legal Services
 * Version: 2.0 - Fixed for GitHub Pages
 */

// ============================================
// Base Path Configuration (for GitHub Pages)
// ============================================
const getBasePath = () => {
  const path = window.location.pathname;
  // Check if we're on GitHub Pages (contains repository name)
  if (path.includes('/BLG-Legal-Services-Website')) {
    return '/BLG-Legal-Services-Website';
  }
  // Local development or custom domain
  return '';
};

const BASE_PATH = getBasePath();

// ============================================
// Language Configuration
// ============================================
const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    dir: 'ltr'
  },
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    dir: 'ltr'
  },
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    dir: 'ltr'
  },
  ru: {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺',
    dir: 'ltr'
  },
  he: {
    code: 'he',
    name: 'עברית',
    flag: '🇮🇱',
    dir: 'rtl'
  },
  ka: {
    code: 'ka',
    name: 'ქართული',
    flag: '🇬🇪',
    dir: 'ltr'
  },
  fa: {
    code: 'fa',
    name: 'فارسی',
    flag: '🇮🇷',
    dir: 'rtl'
  },
  uz: {
    code: 'uz',
    name: 'O\'zbekcha',
    flag: '🇺🇿',
    dir: 'ltr'
  }
};

// ============================================
// Translation Strings
// ============================================
// Translations are loaded from translations.js
// This file must be included BEFORE lang.js in your HTML
// <script src="assets/js/translations.js"></script>
// <script src="assets/js/lang.js"></script>

// Note: TRANSLATIONS object is defined in translations.js

// ============================================
// Language Manager Class
// ============================================
class LanguageManager {
  constructor() {
    // Always default to English unless we're on a language-specific page
    this.currentLang = this.detectPageLanguage();
    this.basePath = BASE_PATH;
    this.init();
  }

  detectPageLanguage() {
    // Detect language from URL path
    const path = window.location.pathname;
    if (path.includes('/es/')) return 'es';
    if (path.includes('/fr/')) return 'fr';
    if (path.includes('/ru/')) return 'ru';
    if (path.includes('/he/')) return 'he';
    if (path.includes('/ka/')) return 'ka';
    if (path.includes('/fa/')) return 'fa';
    if (path.includes('/uz/')) return 'uz';
    // Default to English
    return 'en';
  }

  init() {
    // Set initial language
    this.setLanguage(this.currentLang, false);
    
    // Setup language selector
    this.setupLanguageSelector();
    
    // Setup manual language switcher if exists
    this.setupManualSwitcher();
  }

  setupLanguageSelector() {
    const langSelector = document.getElementById('lang-selector');
    if (!langSelector) return;

    // Populate options
    Object.values(LANGUAGES).forEach(lang => {
      const option = document.createElement('option');
      option.value = lang.code;
      option.textContent = `${lang.flag} ${lang.name}`;
      if (lang.code === this.currentLang) {
        option.selected = true;
      }
      langSelector.appendChild(option);
    });

    // Handle selection
    langSelector.addEventListener('change', (e) => {
      this.setLanguage(e.target.value);
    });
  }

  setupManualSwitcher() {
    const switchers = document.querySelectorAll('[data-lang]');
    switchers.forEach(switcher => {
      switcher.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = switcher.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });
  }

  setLanguage(langCode, reload = true) {
    if (!LANGUAGES[langCode]) {
      console.error(`Language ${langCode} not supported`);
      return;
    }

    const language = LANGUAGES[langCode];
    
    // Store preference
    this.storeLanguage(langCode);
    
    // If language change and reload is true, redirect to language-specific page
    if (reload && langCode !== this.currentLang) {
      this.redirectToLanguagePage(langCode);
      return;
    }
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', langCode);
    
    // Update text direction for RTL languages
    document.documentElement.setAttribute('dir', language.dir);
    
    // Update current language
    this.currentLang = langCode;
    
    // Trigger custom event
    document.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: langCode }
    }));
    
    console.log(`Language set to: ${language.name}`);
  }

  redirectToLanguagePage(langCode) {
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Remove base path if present to get relative path
    let relativePath = currentPath;
    if (this.basePath && currentPath.startsWith(this.basePath)) {
      relativePath = currentPath.substring(this.basePath.length);
    }
    
    // Extract the page structure (handling subdirectories)
    let pagePath = '';
    
    // Check if we're on a homepage
    if (relativePath === '/' || relativePath === '' || relativePath.endsWith('/index.html') || relativePath === '/index.html') {
      pagePath = 'index.html';
    }
    // Handle language-specific paths (already in a language directory)
    else if (relativePath.match(/^\/(es|fr|ru|he|ka|fa|uz)\//)) {
      // Extract path after language code
      const match = relativePath.match(/^\/(es|fr|ru|he|ka|fa|uz)\/(.*)/);
      if (match && match[2]) {
        pagePath = match[2];
      } else {
        pagePath = 'index.html';
      }
    }
    // Check if we're in pages directory (English version)
    else if (relativePath.includes('/pages/')) {
      // Extract everything from /pages/ onwards
      const pagesIndex = relativePath.indexOf('/pages/');
      pagePath = 'pages' + relativePath.substring(pagesIndex + 6);
    }
    else {
      // Fallback: use the path as-is (without leading slash)
      pagePath = relativePath.replace(/^\//, '') || 'index.html';
    }
    
    // Build target URL based on language
    let targetUrl;
    if (langCode === 'en') {
      // Redirect to English (root)
      if (pagePath === 'index.html') {
        targetUrl = this.basePath + '/index.html';
      } else {
        targetUrl = this.basePath + '/' + pagePath;
      }
    } else {
      // Redirect to language-specific directory
      targetUrl = `${this.basePath}/${langCode}/${pagePath}`;
    }
    
    console.log(`Redirecting to: ${targetUrl}`);
    window.location.href = targetUrl;
  }

  translatePage() {
    // For full implementation, you would:
    // 1. Load translation JSON for the selected language
    // 2. Replace all [data-i18n] elements with translated text
    // 3. Or redirect to language-specific URL (e.g., /es/index.html)
    
    const elements = document.querySelectorAll('[data-i18n]');
    const translations = typeof TRANSLATIONS !== 'undefined' ? (TRANSLATIONS[this.currentLang] || TRANSLATIONS['en']) : {};
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });
    
    // Update placeholders
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (translations[key]) {
        element.setAttribute('placeholder', translations[key]);
      }
    });
  }

  getStoredLanguage() {
    return localStorage.getItem('preferred_language') || 
           this.detectBrowserLanguage();
  }

  storeLanguage(langCode) {
    localStorage.setItem('preferred_language', langCode);
  }

  detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0];
    
    // Check if we support this language
    return LANGUAGES[langCode] ? langCode : 'en';
  }

  getCurrentLanguage() {
    return LANGUAGES[this.currentLang];
  }

  getSupportedLanguages() {
    return Object.values(LANGUAGES);
  }
  
  getBasePath() {
    return this.basePath;
  }
}

// ============================================
// Initialize Language Manager
// ============================================
let languageManager;

document.addEventListener('DOMContentLoaded', function() {
  languageManager = new LanguageManager();
  
  // Make globally accessible
  window.LanguageManager = languageManager;
  
  console.log(`Language Manager initialized. Base path: "${BASE_PATH}"`);
});

// ============================================
// Listen for language changes
// ============================================
document.addEventListener('languageChanged', function(e) {
  console.log('Language changed event:', e.detail);
  
  // Update Google Analytics with language preference
  if (typeof gtag !== 'undefined') {
    gtag('event', 'language_change', {
      'event_category': 'engagement',
      'event_label': e.detail.language
    });
  }
});

// ============================================
// Translation Helper Function
// ============================================
function t(key, langCode = null) {
  const lang = langCode || (languageManager ? languageManager.currentLang : 'en');
  const translations = typeof TRANSLATIONS !== 'undefined' ? (TRANSLATIONS[lang] || TRANSLATIONS['en']) : {};
  return translations[key] || key;
}

// Make translation function globally accessible
window.t = t;

// ============================================
// Export for module systems (if needed)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LanguageManager,
    LANGUAGES,
    t,
    BASE_PATH
  };
}
