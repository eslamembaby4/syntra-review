// Syntra Contact Page - Dynamic Functionality
// Handles form interactions, real-time validation, and dynamic content loading

class SyntraContactPage {
  constructor() {
    this.form = document.querySelector('[data-syntra-form="partner_inquiry"]');
    this.contactInfo = null;
    this.init();
  }

  async init() {
    await this.loadContactInfo();
    this.setupFormValidation();
    this.setupInterestTypeUpdates();
    this.addFormAnimations();
    this.renderContactInfo();
  }

  async loadContactInfo() {
    // Dynamic contact information that can be updated from database
    this.contactInfo = {
      email: {
        primary: 'info@syntrarefining.com',
        support: 'support@syntrarefining.com'
      },
      location: {
        city: 'Halifax',
        region: 'Nova Scotia',
        country: 'Canada',
        coordinates: { lat: 44.6488, lng: -63.5752 }
      },
      network: {
        regions: ['North America', 'Europe'],
        expansion: ['Asia-Pacific']
      },
      responseTime: '2 business days',
      officeHours: 'Monday - Friday, 9AM - 5PM AST'
    };
  }

  renderContactInfo() {
    // Update response time dynamically
    const responseText = document.querySelector('[data-response-time]');
    if (responseText && this.contactInfo) {
      responseText.textContent = `We'll respond within ${this.contactInfo.responseTime}`;
    }

    // Update email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
      if (this.contactInfo && this.contactInfo.email.primary) {
        link.href = `mailto:${this.contactInfo.email.primary}`;
        if (link.textContent.includes('@')) {
          link.textContent = this.contactInfo.email.primary;
        }
      }
    });
  }

  setupFormValidation() {
    if (!this.form) return;

    const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');

    inputs.forEach(input => {
      // Real-time validation
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });

    // Email specific validation
    const emailInput = this.form.querySelector('#email');
    if (emailInput) {
      emailInput.addEventListener('input', (e) => {
        this.validateEmail(e.target);
      });
    }
  }

  validateField(field) {
    const errorElement = field.parentElement.querySelector('.field-error');

    if (field.validity.valid) {
      field.classList.remove('error', 'border-red-500');
      field.classList.add('border-cyan-500');
      if (errorElement) errorElement.remove();
      return true;
    } else {
      field.classList.add('error', 'border-red-500');
      field.classList.remove('border-cyan-500');

      if (!errorElement) {
        const error = document.createElement('p');
        error.className = 'field-error text-red-500 text-xs mt-2 font-mono';
        error.textContent = this.getErrorMessage(field);
        field.parentElement.appendChild(error);
      }
      return false;
    }
  }

  validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value);

    if (input.value && !isValid) {
      input.setCustomValidity('Please enter a valid email address');
    } else {
      input.setCustomValidity('');
    }

    if (input.classList.contains('error') || input.value) {
      this.validateField(input);
    }
  }

  getErrorMessage(field) {
    if (field.validity.valueMissing) {
      return `${field.labels[0]?.textContent.replace('*', '').trim()} is required`;
    }
    if (field.validity.typeMismatch) {
      return 'Please enter a valid format';
    }
    if (field.validity.patternMismatch) {
      return 'Please match the requested format';
    }
    return 'This field is invalid';
  }

  setupInterestTypeUpdates() {
    const interestSelect = this.form?.querySelector('#interest_type');
    if (!interestSelect) return;

    interestSelect.addEventListener('change', (e) => {
      const value = e.target.value;

      // Update form data attribute for tracking
      if (this.form) {
        this.form.setAttribute('data-interest', value);
      }

      // Update message placeholder based on selection
      const messageField = this.form?.querySelector('#message');
      if (messageField) {
        const placeholders = {
          offtake_agreement: 'Tell us about your offtake requirements, timeline, and volume needs...',
          strategic_partnership: 'Describe the partnership opportunity and potential synergies...',
          technology_licensing: 'Describe your interest in our technology and planned application...',
          investment_opportunity: 'Tell us about your investment focus and interest in Syntra...',
          media_inquiry: 'Please provide details about your media outlet and inquiry...',
          general_inquiry: 'Tell us more about your inquiry...'
        };
        messageField.placeholder = placeholders[value] || placeholders.general_inquiry;
      }
    });
  }

  addFormAnimations() {
    if (!this.form) return;

    // Add focus animations to form groups
    const formGroups = this.form.querySelectorAll('.group');
    formGroups.forEach(group => {
      const input = group.querySelector('input, select, textarea');
      if (!input) return;

      input.addEventListener('focus', () => {
        group.style.transform = 'translateX(4px)';
        group.style.transition = 'transform 0.2s ease';
      });

      input.addEventListener('blur', () => {
        group.style.transform = 'translateX(0)';
      });
    });

    // Character counter for message field
    const messageField = this.form.querySelector('#message');
    if (messageField) {
      this.addCharacterCounter(messageField);
    }
  }

  addCharacterCounter(textarea) {
    const maxLength = 1000;
    const counter = document.createElement('div');
    counter.className = 'text-xs text-slate-500 font-mono mt-2 text-right';
    counter.innerHTML = `<span class="char-count">0</span> / ${maxLength} characters`;

    textarea.setAttribute('maxlength', maxLength);
    textarea.parentElement.appendChild(counter);

    textarea.addEventListener('input', () => {
      const count = textarea.value.length;
      const countSpan = counter.querySelector('.char-count');
      countSpan.textContent = count;

      if (count > maxLength * 0.9) {
        countSpan.classList.add('text-syntra-amber');
      } else {
        countSpan.classList.remove('text-syntra-amber');
      }
    });
  }
}

// Animated Logo Component
class AnimatedLogoManager {
  constructor() {
    this.logos = document.querySelectorAll('.syntra-logo-mark');
    this.init();
  }

  init() {
    this.logos.forEach(logo => {
      this.addLogoAnimation(logo);
    });
  }

  addLogoAnimation(logo) {
    const diamond = logo.querySelector('.syntra-logo-diamond');
    if (!diamond) return;

    // Add subtle pulse animation on page load
    setTimeout(() => {
      logo.style.animation = 'fadeIn 0.6s ease-out';
    }, 100);

    // Add hover interaction for standalone logos
    if (!logo.closest('.syntra-logo-hover-wrapper')) {
      logo.addEventListener('mouseenter', () => {
        diamond.style.transform = 'rotate(45deg) scale(1.1)';
        diamond.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });

      logo.addEventListener('mouseleave', () => {
        diamond.style.transform = 'rotate(45deg) scale(1)';
      });
    }
  }
}

// Contact Info Cards Animation
class ContactCardsManager {
  constructor() {
    this.cards = document.querySelectorAll('[data-contact-card]');
    this.init();
  }

  init() {
    this.observeCards();
  }

  observeCards() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    this.cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.5s ease-out';
      observer.observe(card);
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactPage);
} else {
  initContactPage();
}

function initContactPage() {
  new SyntraContactPage();
  new AnimatedLogoManager();
  new ContactCardsManager();
}

// Add global styles for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .field-error {
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  input.border-cyan-500,
  select.border-cyan-500,
  textarea.border-cyan-500 {
    border-color: #0891B2 !important;
  }

  input.error,
  select.error,
  textarea.error {
    animation: shake 0.3s ease-in-out;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

export { SyntraContactPage, AnimatedLogoManager, ContactCardsManager };
