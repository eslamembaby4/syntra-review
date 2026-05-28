/* ============================
   SHARED BACKGROUND ANIMATION
   ============================ */

function initSyntraBackground(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const LOGICAL_WIDTH = 1440;
  const LOGICAL_HEIGHT = 80;

  function resize() {
    canvas.width = LOGICAL_WIDTH;
    canvas.height = LOGICAL_HEIGHT;
  }

  resize();

  const particles = [];
  const PARTICLE_COUNT = 9;

  class Particle {
    constructor() {
      this.x = Math.random() * LOGICAL_WIDTH;
      this.y = Math.random() * LOGICAL_HEIGHT;
      this.r = Math.random() * 2 + 1;
      this.vy = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.5 ? '#FFD700' : '#0891B2';
    }

    update() {
      this.y -= this.vy;
      if (this.y < 0) this.y = LOGICAL_HEIGHT;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.globalAlpha = 0.6;
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}
