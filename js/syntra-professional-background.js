/**
 * Syntra Professional Dynamic Background System
 * Enterprise-grade particle animation with depth, glow, and sophisticated motion
 */

(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  class SyntraProfessionalBackground {
    constructor(canvasId, options = {}) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.animationFrame = null;
      this.time = 0;

      this.options = {
        particleCount: options.particleCount || 80,
        primaryColor: options.primaryColor || '#FFD700',
        secondaryColor: options.secondaryColor || '#0891B2',
        tertiaryColor: options.tertiaryColor || '#FFD700',
        showConnections: options.showConnections !== false,
        connectionDistance: options.connectionDistance || 150,
        mouseInteraction: options.mouseInteraction !== false,
        depthLayers: options.depthLayers || 3,
        ...options
      };

      this.mouse = {
        x: null,
        y: null,
        radius: 120
      };

      this.setupCanvas();
      this.createParticles();
      this.setupEvents();

      if (!prefersReducedMotion) {
        this.animate();
      } else {
        this.renderStatic();
      }
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
      const colors = [
        this.options.primaryColor,
        this.options.secondaryColor,
        this.options.tertiaryColor
      ];

      for (let i = 0; i < this.options.particleCount; i++) {
        const depth = Math.random();
        const depthFactor = 0.3 + depth * 0.7;

        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          baseX: 0,
          baseY: 0,
          vx: (Math.random() - 0.5) * 0.4 * depthFactor,
          vy: (Math.random() - 0.5) * 0.4 * depthFactor,
          size: (1.5 + Math.random() * 2.5) * depthFactor,
          color: colors[Math.floor(Math.random() * colors.length)],
          depth: depth,
          opacity: 0.4 + depth * 0.5,
          glowPhase: Math.random() * Math.PI * 2,
          glowSpeed: 0.02 + Math.random() * 0.03,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          orbitRadius: 20 + Math.random() * 40,
          orbitSpeed: (Math.random() - 0.5) * 0.003,
          connections: []
        });
      }

      this.particles.forEach(particle => {
        particle.baseX = particle.x;
        particle.baseY = particle.y;
      });
    }

    updateParticles() {
      this.time += 0.005;

      this.particles.forEach((particle, index) => {
        particle.baseX += particle.vx;
        particle.baseY += particle.vy;

        if (particle.baseX < -50) particle.baseX = this.width + 50;
        if (particle.baseX > this.width + 50) particle.baseX = -50;
        if (particle.baseY < -50) particle.baseY = this.height + 50;
        if (particle.baseY > this.height + 50) particle.baseY = -50;

        const orbitX = Math.cos(this.time * particle.orbitSpeed + particle.pulsePhase) * particle.orbitRadius;
        const orbitY = Math.sin(this.time * particle.orbitSpeed + particle.pulsePhase) * particle.orbitRadius;

        particle.x = particle.baseX + orbitX;
        particle.y = particle.baseY + orbitY;

        if (this.options.mouseInteraction && this.mouse.x !== null) {
          const dx = this.mouse.x - particle.x;
          const dy = this.mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.mouse.radius) {
            const force = (this.mouse.radius - distance) / this.mouse.radius;
            const angle = Math.atan2(dy, dx);
            const push = force * 3;

            particle.x -= Math.cos(angle) * push * particle.depth;
            particle.y -= Math.sin(angle) * push * particle.depth;
          }
        }

        particle.glowPhase += particle.glowSpeed;
        particle.pulsePhase += particle.pulseSpeed;
      });
    }

    calculateConnections() {
      this.particles.forEach(particle => {
        particle.connections = [];
      });

      if (!this.options.showConnections) return;

      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const p1 = this.particles[i];
          const p2 = this.particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.options.connectionDistance) {
            const depthDiff = Math.abs(p1.depth - p2.depth);
            if (depthDiff < 0.3) {
              p1.connections.push({ particle: p2, distance });
            }
          }
        }
      }
    }

    drawConnections() {
      if (!this.options.showConnections) return;

      this.particles.forEach(p1 => {
        p1.connections.forEach(({ particle: p2, distance }) => {
          const alpha = (1 - distance / this.options.connectionDistance) * 0.15;
          const avgDepth = (p1.depth + p2.depth) / 2;

          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(100, 116, 139, ${alpha * avgDepth})`;
          this.ctx.lineWidth = 0.5 + avgDepth * 0.5;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        });
      });
    }

    drawParticles() {
      const sortedParticles = [...this.particles].sort((a, b) => a.depth - b.depth);

      sortedParticles.forEach(particle => {
        const glowIntensity = (Math.sin(particle.glowPhase) + 1) / 2;
        const pulseSize = (Math.sin(particle.pulsePhase) + 1) / 2 * 0.3 + 0.85;
        const currentSize = particle.size * pulseSize;

        const baseOpacity = particle.opacity;
        const dynamicOpacity = baseOpacity * (0.7 + glowIntensity * 0.3);

        const colorWithAlpha = this.hexToRgba(particle.color, dynamicOpacity);

        this.ctx.shadowBlur = 15 * particle.depth * glowIntensity;
        this.ctx.shadowColor = particle.color;

        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        this.ctx.fillStyle = colorWithAlpha;
        this.ctx.fill();

        if (glowIntensity > 0.6) {
          const glowRadius = currentSize * (2 + glowIntensity * 2);
          const gradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, glowRadius
          );

          gradient.addColorStop(0, this.hexToRgba(particle.color, dynamicOpacity * 0.6));
          gradient.addColorStop(0.4, this.hexToRgba(particle.color, dynamicOpacity * 0.3));
          gradient.addColorStop(1, this.hexToRgba(particle.color, 0));

          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
          this.ctx.fillStyle = gradient;
          this.ctx.fill();
        }

        this.ctx.shadowBlur = 0;
      });
    }

    hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.updateParticles();
      this.calculateConnections();
      this.drawConnections();
      this.drawParticles();

      this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    renderStatic() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.calculateConnections();
      this.drawConnections();
      this.drawParticles();
    }

    setupEvents() {
      if (this.options.mouseInteraction) {
        const canvasRect = this.canvas.getBoundingClientRect();

        const updateMouse = (e) => {
          this.mouse.x = e.clientX - canvasRect.left;
          this.mouse.y = e.clientY - canvasRect.top;
        };

        this.canvas.addEventListener('mousemove', updateMouse);
        this.canvas.addEventListener('mouseleave', () => {
          this.mouse.x = null;
          this.mouse.y = null;
        });
      }

      window.addEventListener('resize', () => this.handleResize());
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
    }
  }

  window.initSyntraProfessionalBg = function(canvasId, options) {
    return new SyntraProfessionalBackground(canvasId, options);
  };

  window.SyntraProfessionalBackground = SyntraProfessionalBackground;

})();
