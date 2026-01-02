/**
 * BLG Legal Services - Main JavaScript
 * Author: BLG Legal Services
 * Version: 1.0
 */

// ============================================
// Mobile Menu Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const body = document.body;

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
      
      // Update ARIA attributes
      const isExpanded = navMenu.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
      mobileMenuToggle.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', function() {
      navMenu.classList.remove('active');
      mobileOverlay.classList.remove('active');
      body.style.overflow = '';
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.style.overflow = '';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
});

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// Sticky Header on Scroll
// ============================================
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop;
});

// ============================================
// Accordion Functionality (for Q&A)
// ============================================
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', function() {
    const accordionItem = this.parentElement;
    const accordionContent = this.nextElementSibling;
    const isActive = accordionContent.classList.contains('active');
    
    // Close all other accordion items
    document.querySelectorAll('.accordion-content').forEach(content => {
      content.classList.remove('active');
    });
    
    document.querySelectorAll('.accordion-header').forEach(h => {
      h.setAttribute('aria-expanded', 'false');
      const icon = h.querySelector('.accordion-icon');
      if (icon) icon.textContent = '+';
    });
    
    // Toggle current item
    if (!isActive) {
      accordionContent.classList.add('active');
      this.setAttribute('aria-expanded', 'true');
      const icon = this.querySelector('.accordion-icon');
      if (icon) icon.textContent = '-';
    }
  });
});

// ============================================
// Fade In Animation on Scroll
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .why-item, .blog-card').forEach(el => {
  observer.observe(el);
});

// ============================================
// Mobile Dropdown Menu Toggle
// ============================================
document.querySelectorAll('.nav-menu .dropdown > a').forEach(dropdownToggle => {
  dropdownToggle.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdown = this.parentElement;
      dropdown.classList.toggle('active');
    }
  });
});

// ============================================
// Back to Top Button
// ============================================
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// Click-to-Call Analytics (Optional)
// ============================================
document.querySelectorAll('a[href^="tel:"]').forEach(telLink => {
  telLink.addEventListener('click', function() {
    // Track phone click
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        'event_category': 'contact',
        'event_label': 'phone_click',
        'value': this.getAttribute('href')
      });
    }
  });
});

document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
  emailLink.addEventListener('click', function() {
    // Track email click
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        'event_category': 'contact',
        'event_label': 'email_click',
        'value': this.getAttribute('href')
      });
    }
  });
});

// ============================================
// Pricing Table Search/Filter (Optional Enhancement)
// ============================================
function filterPricingTable(searchTerm) {
  const tables = document.querySelectorAll('.pricing-table tbody tr');
  const term = searchTerm.toLowerCase();
  
  tables.forEach(row => {
    const text = row.textContent.toLowerCase();
    if (text.includes(term)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

const pricingSearch = document.getElementById('pricing-search');
if (pricingSearch) {
  pricingSearch.addEventListener('input', function() {
    filterPricingTable(this.value);
  });
}

// ============================================
// Print Functionality
// ============================================
const printButtons = document.querySelectorAll('.print-button');
printButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    window.print();
  });
});

// ============================================
// Cookie Consent (Simple Implementation)
// ============================================
function checkCookieConsent() {
  const consent = localStorage.getItem('cookie_consent');
  const banner = document.getElementById('cookie-banner');
  
  if (!consent && banner) {
    banner.style.display = 'block';
  }
}

function acceptCookies() {
  localStorage.setItem('cookie_consent', 'accepted');
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.display = 'none';
  }
}

// Initialize cookie consent check
checkCookieConsent();

// ============================================
// External Links - Open in New Tab
// ============================================
document.querySelectorAll('a[href^="http"]').forEach(link => {
  if (!link.href.includes(window.location.hostname)) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  }
});

// ============================================
// Accessibility: Skip to Main Content
// ============================================
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
  skipLink.addEventListener('click', function(e) {
    e.preventDefault();
    const main = document.querySelector('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus();
    }
  });
}

// ============================================
// Console Welcome Message
// ============================================
console.log('%cBLG Legal Services', 'font-size: 20px; font-weight: bold; color: #1e3a8a;');
console.log('%cOpening doors and protecting dreams.', 'font-size: 14px; color: #6b7280;');
console.log('%cFor technical support: law@blglegalservices.com', 'font-size: 12px; color: #9ca3af;');

// ============================================
// Page Load Performance Logging (Development Only)
// ============================================
window.addEventListener('load', function() {
  if (window.performance && console) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
  }
});

