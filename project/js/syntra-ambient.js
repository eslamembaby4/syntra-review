/**
 * Syntra Ambient Visual System
 * Dynamic grid + particles for enterprise-grade visual appeal
 */

(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  class SyntraAmbient {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.animationFrame = null;

      this.variant = canvas.dataset.variant || 'default';
      this.density = canvas.dataset.density || 'med';
      this.speed = canvas.dataset.speed || 'med';
      this.accent = canvas.dataset.accent || 'mixed';

      this.config = this.getConfig();
      this.setupCanvas();
      this.createParticles();

      if (!prefersReducedMotion) {
        this.animate();
      } else {
        this.renderStatic();
      }

      window.addEventListener('resize', () => this.handleResize());
    }

    getConfig() {
      const densityMap = {
        'low': 20,
        'med': 35,
        'high': 50
      };

      const speedMap = {
        'slow': 0.15,
        'med': 0.25,
        'fast': 0.4
      };

      const variantColors = {
        'company': { primary: '#FFD700', secondary: '#0891B2', bg: '#020617' },
        'technology': { primary: '#0891B2', secondary: '#FFD700', bg: '#020617' },
        'network': { primary: '#FFD700', secondary: '#0891B2', bg: '#0B1120' },
        'investor': { primary: '#FFD700', secondary: '#0891B2', bg: '#020617' },
        'supplier': { primary: '#FFD700', secondary: '#0891B2', bg: '#020617' },
        'commercial': { primary: '#FFD700', secondary: '#0891B2', bg: '#020617' },
        'default': { primary: '#FFD700', secondary: '#0891B2', bg: '#020617' }
      };

      return {
        particleCount: densityMap[this.density] || 35,
        baseSpeed: speedMap[this.speed] || 0.25,
        colors: variantColors[this.variant] || variantColors.default,
        connectionDistance: 120,
        glowPulseSpeed: 0.02,
        particleSize: { min: 2.2, max: 4.0 }
      };
    }

    setupCanvas() {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;

      this.ctx.scale(dpr, dpr);

      this.canvas.style.width = rect.width + 'px';
      this.canvas.style.height = rect.height + 'px';

      this.width = rect.width;
      this.height = rect.height;
    }

    createParticles() {
      this.particles = [];

      for (let i = 0; i < this.config.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * this.config.baseSpeed,
          vy: (Math.random() - 0.5) * this.config.baseSpeed,
          size: Math.random() * (this.config.particleSize.max - this.config.particleSize.min) + this.config.particleSize.min,
          color: Math.random() > 0.5 ? this.config.colors.primary : this.config.colors.secondary,
          glowPhase: Math.random() * Math.PI * 2,
          glowSpeed: this.config.glowPulseSpeed * (0.8 + Math.random() * 0.4)
        });
      }
    }

    updateParticles() {
      this.particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > this.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > this.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(this.width, particle.x));
        particle.y = Math.max(0, Math.min(this.height, particle.y));

        particle.glowPhase += particle.glowSpeed;
      });
    }

    drawParticles() {
      this.particles.forEach(particle => {
        const glowIntensity = (Math.sin(particle.glowPhase) + 1) / 2;
        const alpha = 0.65 + glowIntensity * 0.6;

        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        this.ctx.fill();

        if (glowIntensity > 0.7) {
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          const gradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          gradient.addColorStop(0, particle.color + '40');
          gradient.addColorStop(1, particle.color + '00');
          this.ctx.fillStyle = gradient;
          this.ctx.fill();
        }
      });
    }

    drawConnections() {
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.config.connectionDistance) {
            const alpha = (1 - distance / this.config.connectionDistance) * 0.15;
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#64748B' + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            this.ctx.lineWidth = 0.5;
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.stroke();
          }
        }
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.updateParticles();
      this.drawConnections();
      this.drawParticles();

      this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    renderStatic() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawParticles();
    }

    handleResize() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }

      this.setupCanvas();
      this.createParticles();

      if (!prefersReducedMotion) {
        this.animate();
      } else {
        this.renderStatic();
      }
    }

    destroy() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      window.removeEventListener('resize', this.handleResize);
    }
  }

  function initAmbientVisuals() {
    const canvases = document.querySelectorAll('.syntra-ambient-canvas');

    canvases.forEach(canvas => {
      new SyntraAmbient(canvas);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAmbientVisuals);
  } else {
    initAmbientVisuals();
  }

  window.SyntraAmbient = SyntraAmbient;

})();
