// SYNTRA FORM LOGO ANIMATION
(function() {
  'use strict';

  function initFormLogos() {
    const formContainers = document.querySelectorAll('[data-syntra-form-container]');

    formContainers.forEach(container => {
      const logoMark = container.querySelector('.syntra-form-logo-mark');
      if (!logoMark) return;

      const diamond = logoMark.querySelector('.syntra-form-diamond');
      if (!diamond) return;

      logoMark.addEventListener('mouseenter', function() {
        diamond.style.transform = 'rotate(405deg)';
      });

      logoMark.addEventListener('mouseleave', function() {
        diamond.style.transform = 'rotate(45deg)';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormLogos);
  } else {
    initFormLogos();
  }
})();
