/**
 * BLG Legal Services - Language Switcher
 * Author: BLG Legal Services
 * Version: 1.0
 */

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
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Determine target URL based on language
    if (langCode === 'en') {
      // Redirect to English (root)
      if (currentPath.includes('/es/') || currentPath.includes('/fr/') || 
          currentPath.includes('/ru/') || currentPath.includes('/he/') || 
          currentPath.includes('/ka/') || currentPath.includes('/fa/') || 
          currentPath.includes('/uz/')) {
        // From language subdir to root
        window.location.href = '/' + currentPage;
      }
      // Already on English page, just translate in place
      else {
        this.currentLang = langCode;
        this.translatePage();
      }
    } else {
      // Redirect to language-specific directory
      window.location.href = `/${langCode}/${currentPage}`;
    }
  }

  translatePage() {
    // For full implementation, you would:
    // 1. Load translation JSON for the selected language
    // 2. Replace all [data-i18n] elements with translated text
    // 3. Or redirect to language-specific URL (e.g., /es/index.html)
    
    const elements = document.querySelectorAll('[data-i18n]');
    const translations = TRANSLATIONS[this.currentLang] || TRANSLATIONS['en'];
    
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
    
    // For a complete multilingual site, you might redirect:
    // window.location.href = `/${this.currentLang}/index.html`;
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
}

// ============================================
// Initialize Language Manager
// ============================================
let languageManager;

document.addEventListener('DOMContentLoaded', function() {
  languageManager = new LanguageManager();
  
  // Make globally accessible
  window.LanguageManager = languageManager;
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
  
  // You can add other actions here, like:
  // - Reloading dynamic content
  // - Updating form labels
  // - Changing date/number formats
});

// ============================================
// Translation Helper Function
// ============================================
function t(key, langCode = null) {
  const lang = langCode || (languageManager ? languageManager.currentLang : 'en');
  const translations = TRANSLATIONS[lang] || TRANSLATIONS['en'];
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
    TRANSLATIONS,
    t
  };
}

