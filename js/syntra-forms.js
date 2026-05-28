/**
 * Syntra Refining - Universal Form Handler
 * Auto-binds to all forms with [data-syntra-form] attribute
 *
 * STRICT VALIDATION - Required fields matching database NOT NULL constraints:
 * - form_type (from data-syntra-form attribute)
 * - first_name (required)
 * - email (required)
 * - organization (required)
 * - interest_type (required - from input OR data-interest attribute)
 *
 * Standardized form_type values:
 * - partner_inquiry
 * - investor_inquiry
 * - career_application
 * - supplier_inquiry
 * - supplier_document
 * - tds_request
 * - sds_inquiry
 * - newsletter
 * - ceo_meeting
 */

(function() {
  'use strict';

  const VALID_FORM_TYPES = [
    'partner_inquiry',
    'investor_inquiry',
    'career_application',
    'supplier_inquiry',
    'supplier_document',
    'tds_request',
    'sds_inquiry',
    'newsletter',
    'ceo_meeting'
  ];

  // Track which forms have already been bound to prevent duplicate listeners
  const BOUND_FORMS = new WeakSet();

  function bindForms(root = document) {
    const forms = root.querySelectorAll('form[data-syntra-form]');

    if (forms.length === 0) {
      console.log('[Syntra Forms] No forms found with [data-syntra-form] attribute');
      return 0;
    }

    let boundCount = 0;
    console.log(`[Syntra Forms] Scanning ${forms.length} form(s)...`);

    forms.forEach(form => {
      if (BOUND_FORMS.has(form)) return;

      const formType = form.getAttribute('data-syntra-form');
      const defaultInterest = form.getAttribute('data-interest');

      if (!formType) {
        console.warn('[Syntra Forms] Form missing data-syntra-form value:', form);
        return;
      }

      if (!VALID_FORM_TYPES.includes(formType)) {
        console.warn(`[Syntra Forms] Invalid form_type "${formType}". Must be one of:`, VALID_FORM_TYPES);
      }

      form.addEventListener('submit', (e) => handleFormSubmit(e, form, formType, defaultInterest));
      BOUND_FORMS.add(form);
      boundCount += 1;
      console.log(`[Syntra Forms] ✓ Bound: ${formType}`, form);
    });

    if (boundCount > 0) {
      console.log(`[Syntra Forms] ✅ Bound ${boundCount} new form(s).`);
    }

    return boundCount;
  }

  function initForms() {
    // Always try binding once on init
    bindForms(document);

    // Watch for dynamically injected forms (e.g., modal forms)
    if (document.body) {
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const node of m.addedNodes) {
            if (!(node instanceof HTMLElement)) continue;
            // If a form was added directly, bind it; otherwise bind any nested forms
            if (node.matches && node.matches('form[data-syntra-form]')) {
              bindForms(node.parentElement || document);
            } else if (node.querySelector) {
              const hasForms = node.querySelector('form[data-syntra-form]');
              if (hasForms) bindForms(node);
            }
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
      console.log('[Syntra Forms] MutationObserver active (dynamic forms supported)');
    } else {
      console.warn('[Syntra Forms] document.body not ready; dynamic form binding disabled');
    }
  }

  async function handleFormSubmit(event, form, formType, defaultInterest) {
    event.preventDefault();

    console.log('[Syntra Forms] ========================================');
    console.log('[Syntra Forms] 📝 FORM SUBMIT EVENT TRIGGERED');
    console.log('[Syntra Forms] Form type:', formType);
    console.log('[Syntra Forms] ========================================');

    if (form.dataset.submitting === 'true') {
      console.log('[Syntra Forms] ⏸️ Duplicate submission prevented');
      return;
    }

    console.log('[Syntra Forms] 📝 Form submission started for:', formType);

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : 'SUBMIT';
    const messageContainer = getOrCreateMessageContainer(form);

    try {
      clearMessages(messageContainer);

      if (!form.checkValidity()) {
        console.warn('[Syntra Forms] ⚠️ Form validation failed');
        form.reportValidity();
        return;
      }

      console.log('[Syntra Forms] ✓ Form validation passed');
      form.dataset.submitting = 'true';
      setLoadingState(submitButton, true);

      const formData = extractFormData(form, formType, defaultInterest);

      console.log('[Syntra Forms] 📋 Extracted form data:', formData);

      validateRequiredFields(formData);

      console.log('[Syntra Forms] ✓ Required fields validation passed');

      if (typeof window.submitFormToDatabase !== 'function') {
        throw new Error('Form submission function not available. Ensure supabase-client.js is loaded.');
      }

      console.log('[Syntra Forms] 🚀 Calling submitFormToDatabase...');
      console.log('[Syntra Forms] submitFormToDatabase function exists:', typeof window.submitFormToDatabase);

      const result = await window.submitFormToDatabase(formData, form);

      console.log('[Syntra Forms] ========================================');
      console.log('[Syntra Forms] ✅ DATABASE SUBMISSION SUCCESSFUL');
      console.log('[Syntra Forms] Result object:', result);
      console.log('[Syntra Forms] Reference ID:', result.referenceId);
      console.log('[Syntra Forms] ========================================');

      console.log('[Syntra Forms] 🎯 NOW CALLING showSuccess...');
      showSuccess(form, messageContainer, result.referenceId, formType);
      console.log('[Syntra Forms] ✅ showSuccess COMPLETED');

    } catch (error) {
      console.error('[Syntra Forms] ❌ Submission error:', error);
      console.error('[Syntra Forms] Error stack:', error.stack);
      form.dataset.submitting = 'false';
      setLoadingState(submitButton, false, originalButtonText);
      showError(messageContainer, error.message);
    }
  }

  function extractFormData(form, formType, defaultInterest) {
    const formDataObj = new FormData(form);

    const data = {
      form_type: formType || form.dataset.syntraForm || form.id || 'unknown',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      organization: '',
      interest_type: '',
      message: '',
      additional_data: {}
    };

    const getFieldValue = (names) => {
      for (const name of names) {
        const input = form.querySelector(`[name="${name}"]`);
        if (input && input.value && input.value.trim()) {
          return input.value.trim();
        }
      }
      return '';
    };

    data.first_name = getFieldValue(['firstName', 'first_name', 'name']);
    data.last_name = getFieldValue(['lastName', 'last_name']);
    data.email = getFieldValue(['email']);
    data.phone = getFieldValue(['phone']);
    data.organization = getFieldValue(['organization', 'company', 'companyName', 'firm']);
    data.interest_type = getFieldValue(['interestType', 'interest_type', 'role', 'topic', 'primaryInterest']);
    data.message = getFieldValue(['message', 'notes', 'coverLetter', 'comments']);

    if (data.first_name && data.first_name.includes(' ') && !data.last_name) {
      const nameParts = data.first_name.split(' ');
      data.first_name = nameParts[0];
      data.last_name = nameParts.slice(1).join(' ');
    }

    if (!data.interest_type && defaultInterest) {
      data.interest_type = defaultInterest;
    }

    for (const [key, value] of formDataObj.entries()) {
      if (key === 'consent') {
        data.additional_data[key] = value === 'on' || value === 'true';
      } else if (key !== 'resume' && key !== 'firstName' && key !== 'first_name' &&
                 key !== 'lastName' && key !== 'last_name' && key !== 'email' &&
                 key !== 'phone' && key !== 'organization' && key !== 'company' &&
                 key !== 'message' && key !== 'interestType' && key !== 'interest_type') {
        if (value && value.trim()) {
          data.additional_data[key] = value.trim();
        }
      }
    }

    console.log('[Syntra Forms] formData', data);

    return data;
  }

  function validateRequiredFields(formData) {
    const errors = [];

    if (!formData.form_type) {
      errors.push('form_type is required');
    }

    if (!formData.first_name || formData.first_name.trim() === '') {
      errors.push('First name is required');
    }

    if (!formData.email || formData.email.trim() === '') {
      errors.push('Email is required');
    }

    if (!formData.organization || formData.organization.trim() === '') {
      errors.push('Organization is required');
    }

    if (!formData.interest_type || formData.interest_type.trim() === '') {
      errors.push('Interest type is required');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }

  function getOrCreateMessageContainer(form) {
    let container = form.querySelector('[data-form-msg]');

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('data-form-msg', '');
      form.insertBefore(container, form.firstChild);
    }

    return container;
  }

  function clearMessages(container) {
    if (container) {
      container.innerHTML = '';
      container.className = '';
      container.style.display = 'none';
    }
  }

  function setLoadingState(button, isLoading, originalText = '') {
    if (!button) return;

    if (isLoading) {
      button.disabled = true;
      button.dataset.originalText = button.textContent;
      button.textContent = 'SUBMITTING...';
      button.style.opacity = '0.6';
      button.style.cursor = 'not-allowed';
    } else {
      button.disabled = false;
      button.textContent = originalText || button.dataset.originalText || 'SUBMIT';
      button.style.opacity = '1';
      button.style.cursor = 'pointer';
    }
  }

  function showSuccess(form, container, referenceId, formType) {
    console.log('[Syntra Forms] ========================================');
    console.log('[Syntra Forms] 🎉 showSuccess FUNCTION ENTERED');
    console.log('[Syntra Forms] referenceId:', referenceId);
    console.log('[Syntra Forms] Form type:', formType);
    console.log('[Syntra Forms] ========================================');

    console.log('[Syntra Forms] About to call showThankYouModal...');
    console.log('[Syntra Forms] showThankYouModal exists:', typeof showThankYouModal);

    try {
      showThankYouModal(referenceId);
      console.log('[Syntra Forms] ✅ showThankYouModal call completed');
    } catch (modalError) {
      console.error('[Syntra Forms] ❌ Error showing modal:', modalError);
      console.error('[Syntra Forms] Modal error stack:', modalError.stack);
      alert(`✅ Thank You!\n\nYour submission has been received.\n\nReference ID: ${referenceId}\n\nPlease save this reference number for your records.\n\nOur team will review your submission within 24-48 business hours.`);
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'SUBMITTED';
      submitButton.style.opacity = '0.5';
      console.log('[Syntra Forms] Submit button updated to SUBMITTED state');
    }

    console.log('[Syntra Forms] ✅ Success modal displayed with Reference ID:', referenceId);
  }

  function showThankYouModal(referenceId) {
    console.log('[Syntra Forms] 🎨 ===== MODAL FUNCTION CALLED =====');
    console.log('[Syntra Forms] Reference ID:', referenceId);

    if (!referenceId) {
      console.error('[Syntra Forms] ❌ No reference ID provided!');
      alert('Form submitted successfully! However, no reference ID was generated.');
      return;
    }

    // Remove any existing modals
    const existingModals = document.querySelectorAll('.syntra-success-modal-overlay');
    existingModals.forEach(m => m.remove());

    // Create overlay using createElement (more reliable than innerHTML)
    const overlay = document.createElement('div');
    overlay.className = 'syntra-success-modal-overlay';
    overlay.id = 'syntra-modal-overlay';
    overlay.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      background-color: rgba(11, 17, 32, 0.9) !important;
      z-index: 2147483646 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 20px !important;
      box-sizing: border-box !important;
    `;
    console.log('[Syntra Forms] Overlay created');

    // Create modal container
    const modalBox = document.createElement('div');
    modalBox.id = 'syntra-modal-box';
    modalBox.style.cssText = `
      background: #FFFFFF !important;
      border-radius: 16px !important;
      max-width: 600px !important;
      width: 100% !important;
      max-height: 90vh !important;
      overflow-y: auto !important;
      box-shadow: 0 20px 60px rgba(11,17,32,0.5) !important;
      position: relative !important;
      padding: 40px 30px !important;
      text-align: center !important;
    `;
    console.log('[Syntra Forms] Modal box created');

    // Build content using DOM elements
    modalBox.innerHTML = `
      <button class="close-x" type="button" style="position: absolute; top: 15px; right: 15px; min-width: 90px; height: 36px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #FFD700; border: none; color: #0B1120; cursor: pointer; z-index: 10; border-radius: 6px; font-family: 'Oswald', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; padding: 0 14px; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
        <span style="text-transform: uppercase;">ESC</span>
      </button>

      <div style="margin: 0 auto 25px; width: 80px; height: 80px; background: linear-gradient(135deg, #0891B2, #0e7490); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
        <svg style="width: 45px; height: 45px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      <h2 style="font-size: 32px; font-weight: bold; color: #0F172A; margin: 0 0 15px; text-transform: uppercase; letter-spacing: 1px;">THANK YOU</h2>

      <p style="font-size: 16px; color: #64748B; margin: 0 0 30px; line-height: 1.6;">Your submission has been received successfully.</p>

      <div style="background: linear-gradient(135deg, #F9FAFC, #CBD5E1); border: 2px solid #0891B2; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
        <div style="background: #0891B2; color: #FFFFFF; padding: 5px 15px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase; display: inline-block; margin-bottom: 15px;">REFERENCE NUMBER</div>

        <div style="background: #FFFFFF; padding: 20px; border-radius: 8px; border: 2px solid #0891B2; margin-bottom: 15px;">
          <p style="font-size: 28px; font-weight: bold; color: #0F172A; font-family: monospace; margin: 0; word-break: break-all;" class="ref-id-text">${referenceId}</p>
        </div>

        <button class="copy-btn" style="width: 100%; background: #FFD700; color: #0B1120; border: none; padding: 15px; border-radius: 8px; font-family: 'Oswald', sans-serif; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; box-shadow: 0 4px 14px rgba(255, 215, 0, 0.3); transition: background 0.2s;">
          COPY REFERENCE ID
        </button>

        <p style="font-size: 12px; color: #0F172A; margin: 15px 0 0; font-weight: 500;">Please keep this reference for your records.</p>
      </div>

      <div style="background: #0b1120; border-radius: 12px; padding: 20px; text-align: left; margin-bottom: 20px;">
        <div style="display: flex; gap: 15px; align-items: start;">
          <div style="flex-shrink: 0; width: 40px; height: 40px; background: #0891B2; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <svg style="width: 20px; height: 20px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div style="flex: 1;">
            <h4 style="font-size: 16px; font-weight: bold; color: #64748B; margin: 0 0 10px;">What Happens Next?</h4>
            <ul style="margin: 0; padding: 0; list-style: none; font-size: 14px; color: #64748B; line-height: 1.8;">
              <li style="margin-bottom: 8px;">• Our team will review your submission within 24-48 business hours</li>
              <li style="margin-bottom: 8px;">• You'll receive a response via email with next steps</li>
              <li>• Use your reference ID for any follow-up communications</li>
            </ul>
          </div>
        </div>
      </div>

      <button class="close-btn" style="width: 100%; background: #FFD700; color: #0B1120; border: none; padding: 15px; border-radius: 8px; font-family: 'Oswald', sans-serif; font-size: 16px; font-weight: 700; cursor: pointer; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 4px 14px rgba(255, 215, 0, 0.3); transition: background 0.2s;">CLOSE</button>
    `;

    overlay.appendChild(modalBox);
    console.log('[Syntra Forms] Modal box appended to overlay');

    document.body.appendChild(overlay);
    console.log('[Syntra Forms] Overlay appended to body');

    // Verify it was added
    const checkOverlay = document.getElementById('syntra-modal-overlay');
    const checkBox = document.getElementById('syntra-modal-box');
    console.log('[Syntra Forms] Overlay in DOM:', !!checkOverlay);
    console.log('[Syntra Forms] Modal box in DOM:', !!checkBox);

    if (checkOverlay) {
      const computedStyle = window.getComputedStyle(checkOverlay);
      console.log('[Syntra Forms] Overlay computed display:', computedStyle.display);
      console.log('[Syntra Forms] Overlay computed z-index:', computedStyle.zIndex);
      console.log('[Syntra Forms] Overlay computed position:', computedStyle.position);
    }

    console.log('[Syntra Forms] ✅ Modal added to DOM');

    // Set up close handlers
    const closeX = modalBox.querySelector('.close-x');
    const closeBtn = modalBox.querySelector('.close-btn');
    const copyBtn = modalBox.querySelector('.copy-btn');

    const closeModal = () => {
      console.log('[Syntra Forms] Closing modal');
      overlay.remove();
    };

    // Add hover effects to close button
    if (closeX) {
      closeX.addEventListener('mouseenter', function() {
        this.style.background = '#FFD700';
        this.style.transform = 'translateY(-2px) scale(1.02)';
        this.style.boxShadow = '0 4px 16px rgba(255, 215, 0, 0.5)';
      });
      closeX.addEventListener('mouseleave', function() {
        this.style.background = '#FFD700';
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 2px 8px rgba(255, 215, 0, 0.3)';
      });
    }

    closeX.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // ESC key handler
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);

    // Copy button handler
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(referenceId);
        copyBtn.textContent = '✓ COPIED!';
        copyBtn.style.background = '#0891B2';
        setTimeout(() => {
          copyBtn.textContent = '📋 COPY REFERENCE ID';
          copyBtn.style.background = '#FFD700';
        }, 2000);
        console.log('[Syntra Forms] ✅ Copied:', referenceId);
      } catch (err) {
        console.error('[Syntra Forms] Copy failed:', err);
        alert(`Your Reference ID:\n\n${referenceId}\n\nPlease copy this manually.`);
      }
    });

    console.log('[Syntra Forms] ✅ Modal fully initialized');
  }

  window.showThankYouModal = showThankYouModal;

  function showError(container, errorMessage) {
    if (!container) return;

    const isValidationError = errorMessage.includes('required') ||
                              errorMessage.includes('validation') ||
                              errorMessage.includes('invalid');

    const userFriendlyMessage = isValidationError
      ? errorMessage
      : 'Something went wrong while submitting the form.';

    container.className = '';
    container.style.cssText = 'display:block; background:#0b1120; border:2px solid #ffd700; padding:1.5rem; margin-bottom:1.5rem;';
    container.innerHTML = `
      <div style="display:flex; align-items:flex-start; gap:1rem;">
        <div style="flex-shrink:0; width:48px; height:48px; background:#ffd700; display:flex; align-items:center; justify-content:center;">
          <svg style="width:24px; height:24px; color:#0b1120;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div style="flex:1;">
          <p style="color:#ffd700; font-weight:bold; font-size:1.125rem; margin:0 0 0.5rem; text-transform:uppercase; letter-spacing:0.05em;">Submission Failed</p>
          <p style="color:#64748B; font-size:1rem; margin:0 0 0.75rem; line-height:1.6;">${userFriendlyMessage}</p>
          <p style="color:#64748B; font-size:0.875rem;">
            ${isValidationError
              ? 'Please check all required fields and try again.'
              : 'Please try again or contact us at <a href="mailto:info@syntrarefining.com" style="color:#ffd700; text-decoration:underline;">info@syntrarefining.com</a> if the issue persists.'}
          </p>
        </div>
      </div>
    `;

    container.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      clearMessages(container);
    }, 15000);
  }

  // IMPORTANT:
  // Prefer DOMContentLoaded so page forms exist, but also handle cases where this script
  // is loaded after DOMContentLoaded (e.g., injected bundles).
  document.addEventListener('DOMContentLoaded', initForms);
  if (document.readyState !== 'loading') {
    // Queue to avoid running twice within the same tick.
    setTimeout(() => initForms(), 0);
  }

  console.log('[Syntra Forms] syntra-forms.js loaded');

})();
