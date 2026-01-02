/**
 * BLG Legal Services - Form Handling
 * Author: BLG Legal Services
 * Version: 1.0
 */

// ============================================
// Form Configuration
// ============================================
const FORM_CONFIG = {
  contactEmail: 'law@blglegalservices.com',
  // For production, replace with your actual form handler URL
  formHandlerURL: '/api/contact',
  // Set to true to use FormSpree or similar service
  useThirdPartyService: false,
  formSpreeURL: 'https://formspree.io/f/YOUR_FORM_ID'
};

// ============================================
// Form Validation
// ============================================
class FormValidator {
  constructor(form) {
    this.form = form;
    this.errors = {};
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }

  validateRequired(value) {
    return value.trim() !== '';
  }

  validateField(field) {
    const value = field.value;
    const name = field.name;
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // Clear previous error
    delete this.errors[name];
    this.clearFieldError(field);
    
    // Check required
    if (required && !this.validateRequired(value)) {
      this.errors[name] = 'This field is required';
      this.showFieldError(field, this.errors[name]);
      return false;
    }
    
    // Email validation
    if (type === 'email' && value && !this.validateEmail(value)) {
      this.errors[name] = 'Please enter a valid email address';
      this.showFieldError(field, this.errors[name]);
      return false;
    }
    
    // Phone validation
    if (type === 'tel' && value && !this.validatePhone(value)) {
      this.errors[name] = 'Please enter a valid phone number';
      this.showFieldError(field, this.errors[name]);
      return false;
    }
    
    return true;
  }

  validateForm() {
    this.errors = {};
    const fields = this.form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    
    // Create or update error message
    let errorElement = field.parentElement.querySelector('.form-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'form-error';
      errorElement.setAttribute('role', 'alert');
      field.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  clearFieldError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  clearAllErrors() {
    this.errors = {};
    const fields = this.form.querySelectorAll('input, textarea, select');
    fields.forEach(field => this.clearFieldError(field));
  }
}

// ============================================
// Form Submission Handler
// ============================================
class FormHandler {
  constructor(form) {
    this.form = form;
    this.validator = new FormValidator(form);
    this.submitButton = form.querySelector('button[type="submit"]');
    this.init();
  }

  init() {
    // Real-time validation
    const fields = this.form.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
      field.addEventListener('blur', () => {
        this.validator.validateField(field);
      });
      
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          this.validator.validateField(field);
        }
      });
    });

    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  async handleSubmit() {
    // Validate form
    if (!this.validator.validateForm()) {
      this.showMessage('Please correct the errors above.', 'error');
      return;
    }

    // Check reCAPTCHA (if implemented)
    const recaptchaResponse = this.form.querySelector('.g-recaptcha-response');
    if (recaptchaResponse && !recaptchaResponse.value) {
      this.showMessage('Please complete the reCAPTCHA verification.', 'error');
      return;
    }

    // Disable submit button
    this.setSubmitting(true);

    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Send form data
      const response = await this.submitForm(data);
      
      if (response.success) {
        this.showMessage('Thank you for your message! We will contact you within 24 hours.', 'success');
        this.form.reset();
        this.validator.clearAllErrors();
        
        // Track conversion
        this.trackConversion();
      } else {
        this.showMessage('Sorry, there was an error sending your message. Please try again or call us directly.', 'error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showMessage('Sorry, there was an error sending your message. Please try again or email us at law@blglegalservices.com', 'error');
    } finally {
      this.setSubmitting(false);
    }
  }

  async submitForm(data) {
    // For demo purposes, simulate form submission
    // In production, replace with actual API call
    
    if (FORM_CONFIG.useThirdPartyService) {
      // Use FormSpree or similar
      const response = await fetch(FORM_CONFIG.formSpreeURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      return { success: response.ok };
    } else {
      // Use your own backend
      const response = await fetch(FORM_CONFIG.formHandlerURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Form submission failed');
      }
      
      return await response.json();
    }
    
    // Demo: Simulate successful submission
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve({ success: true }), 1000);
    // });
  }

  setSubmitting(isSubmitting) {
    if (isSubmitting) {
      this.submitButton.disabled = true;
      this.submitButton.textContent = 'Sending...';
      this.submitButton.classList.add('submitting');
    } else {
      this.submitButton.disabled = false;
      this.submitButton.textContent = 'Send Message';
      this.submitButton.classList.remove('submitting');
    }
  }

  showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = this.form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.setAttribute('role', type === 'error' ? 'alert' : 'status');
    messageElement.textContent = message;

    // Insert at top of form
    this.form.insertBefore(messageElement, this.form.firstChild);

    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        messageElement.remove();
      }, 5000);
    }
  }

  trackConversion() {
    // Google Analytics conversion tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION-ID/CONVERSION-LABEL',
        'event_category': 'form',
        'event_label': 'contact_form_submission'
      });
    }

    // Facebook Pixel conversion tracking
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Contact');
    }
  }
}

// ============================================
// Initialize Forms
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all contact forms
  const forms = document.querySelectorAll('.contact-form');
  forms.forEach(form => {
    new FormHandler(form);
  });

  // File upload handling
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach(input => {
    input.addEventListener('change', function() {
      const fileCount = this.files.length;
      const label = this.parentElement.querySelector('.file-label');
      if (label) {
        if (fileCount === 0) {
          label.textContent = 'Choose files';
        } else if (fileCount === 1) {
          label.textContent = this.files[0].name;
        } else {
          label.textContent = `${fileCount} files selected`;
        }
      }
    });
  });
});

// ============================================
// reCAPTCHA Callback (if using reCAPTCHA v2)
// ============================================
function onRecaptchaSuccess() {
  console.log('reCAPTCHA verified');
}

function onRecaptchaExpired() {
  console.log('reCAPTCHA expired');
  alert('reCAPTCHA verification expired. Please verify again.');
}

function onRecaptchaError() {
  console.error('reCAPTCHA error');
  alert('There was an error with reCAPTCHA. Please try again.');
}

// ============================================
// Consultation Booking (if implementing)
// ============================================
class ConsultationBooking {
  constructor() {
    this.consultationFee = 250;
    this.init();
  }

  init() {
    const bookingButton = document.getElementById('book-consultation');
    if (bookingButton) {
      bookingButton.addEventListener('click', () => this.openBookingModal());
    }
  }

  openBookingModal() {
    // Implementation for booking modal
    console.log('Opening consultation booking modal');
    // This would integrate with Calendly, Acuity, or custom booking system
  }

  calculateFee(duration = 1) {
    return this.consultationFee * duration;
  }
}

// Initialize consultation booking
const consultationBooking = new ConsultationBooking();

