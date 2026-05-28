console.log('[Syntra Success Modal] Loading...');

window.showThankYouModal = function(referenceId) {
  console.log('[Syntra Success Modal] ========================================');
  console.log('[Syntra Success Modal] 🎯 showThankYouModal CALLED');
  console.log('[Syntra Success Modal] Reference ID:', referenceId);
  console.log('[Syntra Success Modal] ========================================');

  const existingModal = document.getElementById('successModal');
  if (existingModal) {
    existingModal.remove();
  }

  const modalHTML = `
    <div id="successModal" style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(11, 17, 32, 0.85);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      padding: 20px;
      animation: fadeIn 0.3s ease-out;
    ">
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes checkmark {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        .syntra-modal-card {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .syntra-close-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .syntra-close-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(255, 215, 0, 0.4);
        }
        .syntra-close-btn:active {
          transform: translateY(0);
        }
        .syntra-close-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }
        .syntra-close-btn:hover::before {
          left: 100%;
        }
      </style>
      <div class="syntra-modal-card" style="
        background: white;
        padding: 48px;
        border-radius: 16px;
        max-width: 540px;
        width: 100%;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        border: 2px solid #E2E8F0;
        position: relative;
      ">
        <button onclick="closeSuccessModal()" style="
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border: none;
          background: #FFD700;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          padding: 0;
          box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
        " onmouseover="this.style.background='#FACC15'; this.style.transform='rotate(90deg)'" onmouseout="this.style.background='#FFD700'; this.style.transform='rotate(0deg)'">
          <svg style="width: 20px; height: 20px; color: #0B1120;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div style="text-align: center;">
          <div style="
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
          ">
            <svg style="width: 44px; height: 44px; color: white; stroke-dasharray: 100; stroke-dashoffset: 100; animation: checkmark 0.6s ease-out 0.3s forwards;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <h2 style="
            font-family: 'Oswald', sans-serif;
            font-size: 32px;
            font-weight: 700;
            color: #0F172A;
            margin: 0 0 12px 0;
            text-transform: uppercase;
            letter-spacing: 0.02em;
          ">Thank You!</h2>

          <p style="
            font-family: 'Inter', sans-serif;
            font-size: 17px;
            color: #64748B;
            margin: 0 0 32px 0;
            line-height: 1.6;
            font-weight: 400;
          ">Your submission has been received successfully.</p>

          <div style="
            background: linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 100%);
            border: 2px solid #FFD700;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.1);
          ">
            <p style="
              font-family: 'JetBrains Mono', monospace;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.18em;
              text-transform: uppercase;
              color: #FFD700;
              margin: 0 0 10px 0;
            ">Reference ID</p>
            <p style="
              font-family: 'JetBrains Mono', monospace;
              font-size: 22px;
              font-weight: 700;
              color: #0F172A;
              margin: 0;
              letter-spacing: 0.08em;
            ">${referenceId}</p>
          </div>

          <p style="
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            color: #64748B;
            margin: 0 0 32px 0;
            line-height: 1.6;
          ">Please save this reference number. Our team will review your submission within 24-48 business hours.</p>

          <button onclick="closeSuccessModal()" class="syntra-close-btn" style="
            width: 100%;
            padding: 16px 32px;
            background: linear-gradient(135deg, #FFD700 0%, #FFD700 100%);
            color: #0F172A;
            border: none;
            border-radius: 10px;
            font-family: 'Oswald', sans-serif;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(255, 215, 0, 0.3);
          ">
            Got It
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.body.style.overflow = 'hidden';

  console.log('[Syntra Success Modal] ✅ Modal HTML inserted into DOM');
};

window.closeSuccessModal = function() {
  console.log('[Syntra Success Modal] Closing modal...');
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
    console.log('[Syntra Success Modal] Modal closed');
  }
};

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    window.closeSuccessModal();
  }
});

console.log('[Syntra Success Modal] ✅ Script loaded successfully');
