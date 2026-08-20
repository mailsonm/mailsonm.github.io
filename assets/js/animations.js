/**
 * Animations & Micro-Interactions Module
 * Native Canvas Particles, Scroll Reveal (IntersectionObserver), and Interactive Glow
 */

/**
 * Initializes all animations
 */
export function initAnimations() {
  initParticles();
  initScrollReveal();
  initCardSpotlight();
}

/**
 * Native lightweight particle constellation for the Hero section
 */
export function initParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
  let height = (canvas.height = canvas.parentElement?.offsetHeight || 600);

  const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  const particleCount = Math.min(Math.floor((width * height) / 18000), 45);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.8 + 0.8;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let animationFrameId;

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - dist / 110) * 0.18;
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  if (typeof requestAnimationFrame === 'function') {
    animate();
  }

  function handleResize() {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', handleResize, { passive: true });
}

/**
 * Scroll Reveal using native IntersectionObserver
 */
export function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-in');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * Subtle interactive spotlight on project cards
 */
export function initCardSpotlight() {
  const cards = document.querySelectorAll('.project-card, .methodology-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true });
  });
}
