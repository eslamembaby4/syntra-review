// SYNTRA CONTACT MODAL SYSTEM - SIMPLIFIED AND BULLETPROOF
(function() {
  'use strict';

  console.log('[Syntra Modal] Script loaded and executing...');

  let modalCreated = false;

  // Create modal immediately
  function createModal() {
    if (modalCreated) {
      console.log('[Syntra Modal] Modal already created');
      return;
    }

    console.log('[Syntra Modal] Creating modal...');

    const modalHTML = `
      <div id="contactModal" style="display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; padding: 1rem;">
        <div class="modal-backdrop" style="position: absolute; inset: 0; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(8px);"></div>
        <div style="position: relative; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; background: white; border-radius: 4px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">

          <!-- Close Button -->
          <button class="modal-close-btn" type="button" style="position: absolute; top: 1rem; right: 1rem; min-width: 90px; height: 36px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #FFD700; border: none; color: #0B1120; cursor: pointer; z-index: 10; border-radius: 6px; font-family: 'Oswald', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; padding: 0 14px; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
            <span style="text-transform: uppercase;">ESC</span>
          </button>

          <!-- Header -->
          <div style="padding: 2rem 1.5rem 1.5rem;">
            <div style="display: flex; align-items: center; margin-bottom: 1.5rem; gap: 1rem;">
              <div class="syntra-logo-hover-wrapper modal-diamond-wrapper" style="position: relative; width: 44px; height: 44px; min-width: 44px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                <div class="syntra-logo-diamond" style="position: absolute; width: 44px; height: 44px; border: 3px solid #FFD700; transform: rotate(45deg); transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); box-sizing: border-box;"></div>
                <div class="syntra-logo-square" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 18px; height: 18px; background: #FFD700; box-sizing: border-box;"></div>
              </div>
              <div style="flex: 1; min-width: 0;">
                <h2 style="font-family: 'Oswald', sans-serif; font-size: clamp(1.25rem, 4vw, 1.875rem); font-weight: 700; text-transform: uppercase; color: #0F172A; margin-bottom: 0.25rem; line-height: 1.2;">Get in Touch</h2>
                <p style="color: #64748B; font-size: clamp(0.75rem, 2.5vw, 0.875rem); line-height: 1.4;">Strategic partners for the 2027 production cycle</p>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form id="modalPartnerForm" data-syntra-form="partner_inquiry" style="padding: 0 1.5rem 2rem;">
            <div data-form-msg></div>

            <div class="modal-form-grid" style="display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 1.25rem;">
              <div>
                <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #0F172A; margin-bottom: 0.5rem;">First Name</label>
                <input type="text" name="first_name" required style="width: 100%; padding: 0.875rem 1rem; background: #F8FAFC; border: 2px solid #E2E8F0; border-radius: 2px; font-size: 14px; font-family: 'Inter', sans-serif; font-weight: 300;" placeholder="Jane">
              </div>
              <div>
                <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #0F172A; margin-bottom: 0.5rem;">Last Name</label>
                <input type="text" name="last_name" required style="width: 100%; padding: 0.875rem 1rem; background: #F8FAFC; border: 2px solid #E2E8F0; border-radius: 2px; font-size: 14px; font-family: 'Inter', sans-serif; font-weight: 300;" placeholder="Doe">
              </div>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #0F172A; margin-bottom: 0.5rem;">Organization</label>
              <input type="text" name="organization" required style="width: 100%; padding: 0.875rem 1rem; background: #F8FAFC; border: 2px solid #E2E8F0; border-radius: 2px; font-size: 14px; font-family: 'Inter', sans-serif; font-weight: 300;" placeholder="Company Name">
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #0F172A; margin-bottom: 0.5rem;">Email</label>
              <input type="email" name="email" required style="width: 100%; padding: 0.875rem 1rem; background: #F8FAFC; border: 2px solid #E2E8F0; border-radius: 2px; font-size: 14px; font-family: 'Inter', sans-serif; font-weight: 300;" placeholder="you@company.com">
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #0F172A; margin-bottom: 0.5rem;">Interest Type</label>
              <select name="interest_type" required style="width: 100%; padding: 0.875rem 1rem; background: #F8FAFC; border: 2px solid #E2E8F0; border-radius: 2px; font-size: 14px; font-family: 'Inter', sans-serif; font-weight: 300;">
                <option value="">Select Interest...</option>
                <option value="Observer Status">Observer Status</option>
                <option value="Investor Relations">Investor Relations</option>
                <option value="Supplier / Vendor">Supplier / Vendor</option>
                <option value="Feedstock Supply">Feedstock Supply</option>
                <option value="Product Offtake">Product Offtake</option>
                <option value="Strategic Partnership">Strategic Partnership</option>
                <option value="Technical Data Request">Technical Data Request</option>
                <option value="Spec Sheet Submission">Spec Sheet Submission</option>
                <option value="Tolling Services">Tolling Services</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label style="display: block; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #0F172A; margin-bottom: 0.5rem;">Message</label>
              <textarea rows="3" name="message" required style="width: 100%; padding: 0.875rem 1rem; background: #F8FAFC; border: 2px solid #E2E8F0; border-radius: 2px; font-size: 14px; font-family: 'Inter', sans-serif; font-weight: 300; resize: vertical;" placeholder="Brief details about your inquiry..."></textarea>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
              <button type="submit" style="flex: 1; padding: 1rem 1.5rem; background: #FFD700; color: #0B1120; border: none; border-radius: 2px; font-family: 'Oswald', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; box-shadow: 0 4px 14px rgba(255, 215, 0, 0.3); transition: background 0.2s;" onmouseover="this.style.background='#FACC15'" onmouseout="this.style.background='#FFD700'">
                Submit Inquiry
              </button>
              <button type="button" class="modal-cancel-btn" style="padding: 1rem 1.5rem; background: transparent; color: #64748B; border: 2px solid #E2E8F0; border-radius: 2px; font-family: 'Oswald', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; transition: all 0.2s;">
                Cancel
              </button>
            </div>
          </form>


        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modalCreated = true;
    console.log('[Syntra Modal] Modal created and added to DOM');

    // Add hover animation to diamond wrapper
    let modal = document.getElementById('contactModal');
    if (modal) {
      const wrapper = modal.querySelector('.modal-diamond-wrapper');
      const diamond = modal.querySelector('.modal-diamond-wrapper .syntra-logo-diamond');
      if (wrapper && diamond) {
        wrapper.addEventListener('mouseenter', function() {
          diamond.style.transform = 'rotate(405deg)';
        });
        wrapper.addEventListener('mouseleave', function() {
          diamond.style.transform = 'rotate(45deg)';
        });
      }
    }

    // Use event delegation on the modal element
    modal = document.getElementById('contactModal');
    if (modal) {
      modal.addEventListener('click', function(e) {
        // Check if close button was clicked
        if (e.target.closest('.modal-close-btn')) {
          e.preventDefault();
          e.stopPropagation();
          console.log('[Syntra Modal] Close button clicked');
          window.closeContactModal();
          return;
        }

        // Check if cancel button was clicked
        if (e.target.closest('.modal-cancel-btn')) {
          e.preventDefault();
          e.stopPropagation();
          console.log('[Syntra Modal] Cancel button clicked');
          window.closeContactModal();
          return;
        }

        // Check if backdrop was clicked
        if (e.target.classList.contains('modal-backdrop')) {
          e.preventDefault();
          e.stopPropagation();
          console.log('[Syntra Modal] Backdrop clicked');
          window.closeContactModal();
          return;
        }
      }, true);

      // Add proper hover effects to buttons with smooth transitions
      const closeBtn = modal.querySelector('.modal-close-btn');
      const cancelBtn = modal.querySelector('.modal-cancel-btn');

      if (closeBtn) {
        closeBtn.addEventListener('mouseenter', function() {
          this.style.setProperty('background', '#FACC15');
          this.style.setProperty('transform', 'translateY(-2px) scale(1.02)');
          this.style.setProperty('box-shadow', '0 4px 16px rgba(255, 215, 0, 0.5)');
        });
        closeBtn.addEventListener('mouseleave', function() {
          this.style.setProperty('background', '#FFD700');
          this.style.setProperty('transform', 'translateY(0) scale(1)');
          this.style.setProperty('box-shadow', '0 2px 8px rgba(255, 215, 0, 0.3)');
        });
      }

      if (cancelBtn) {
        cancelBtn.addEventListener('mouseenter', function() {
          this.style.setProperty('background', '#F1F5F9');
          this.style.setProperty('border-color', '#CBD5E1');
        });
        cancelBtn.addEventListener('mouseleave', function() {
          this.style.setProperty('background', 'transparent');
          this.style.setProperty('border-color', '#E2E8F0');
        });
      }

      console.log('[Syntra Modal] Event delegation handlers attached');
    }
  }

  // Open modal
  window.openContactModal = function(interestType) {
    console.log('[Syntra Modal] Opening modal with interest:', interestType);

    if (!modalCreated) {
      createModal();
    }

    const modal = document.getElementById('contactModal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      // Pre-fill interest type if provided
      if (interestType) {
        const select = modal.querySelector('select[name="interest_type"]');
        if (select) {
          select.value = interestType;
        }
      }

      console.log('[Syntra Modal] Modal opened');
    } else {
      console.error('[Syntra Modal] Modal element not found!');
    }
  };

  // Close modal
  window.closeContactModal = function() {
    console.log('[Syntra Modal] Closing modal');
    const modal = document.getElementById('contactModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  // Initialize - attach click handlers to all contact links
  function init() {
    console.log('[Syntra Modal] Initializing...');

    // Create modal immediately
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createModal);
    } else {
      createModal();
    }

    // Attach handlers using event delegation
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href*="#partner-ecosystem-access"], a[href*="contact-modal"]');
      if (link) {
        e.preventDefault();
        e.stopPropagation();
        console.log('[Syntra Modal] Link clicked:', link.href);

        // Determine interest type from context
        const text = link.textContent.trim().toUpperCase();
        let interestType = 'Strategic Partnership';

        if (text.includes('TECHNICAL DATA')) interestType = 'Technical Data Request';
        else if (text.includes('SPEC SHEET')) interestType = 'Spec Sheet Submission';
        else if (text.includes('TOLLING')) interestType = 'Tolling Services';
        else if (text.includes('OFFER')) interestType = 'Product Offtake';
        else if (text.includes('OBSERVER') || text.includes('ACCESS')) interestType = 'Observer Status';

        window.openContactModal(interestType);
      }
    }, true);

    // ESC key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        window.closeContactModal();
      }
    });

    console.log('[Syntra Modal] Initialization complete');
  }

  // Auto-initialize
  init();

  // Add responsive CSS for modal
  const style = document.createElement('style');
  style.textContent = `
    @media (min-width: 640px) {
      .modal-form-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }

    @media (max-width: 639px) {
      #contactModal > div:nth-child(2) {
        margin: 0 !important;
      }
    }
  `;
  document.head.appendChild(style);

  console.log('[Syntra Modal] Script execution complete');
})();
