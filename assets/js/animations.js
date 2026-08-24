/**
 * Animations & Micro-Interactions Module
 * Native Interactive Canvas Particles (with Mouse Repulsion), Staggered Scroll Reveal, and Dynamic Glow
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
 * Interactive Particle Constellation with Physics Repulsion on Mouse Hover
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

  // Particle count based on canvas area (denser on desktop)
  const particleCount = Math.min(Math.floor((width * height) / 11000), 85);
  const particles = [];

  // Mouse interaction state
  const mouse = {
    x: null,
    y: null,
    radius: 140, // Repulsion radius
  };

  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function onMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('mouseleave', onMouseLeave, { passive: true });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.radius = Math.random() * 2.0 + 0.8;
      this.baseAlpha = Math.random() * 0.45 + 0.25;
      this.density = Math.random() * 20 + 5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce on boundaries
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Physics Repulsion from Mouse Cursor
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius && dist > 0) {
          const forceDirectionX = dx / dist;
          const forceDirectionY = dy / dist;
          const maxDistance = mouse.radius;
          const force = (maxDistance - dist) / maxDistance;
          const directionX = forceDirectionX * force * this.density * 0.6;
          const directionY = forceDirectionY * force * this.density * 0.6;

          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${this.baseAlpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.4)';
      ctx.fill();
      ctx.shadowBlur = 0; // Reset
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let animationFrameId = null;
  let isRunning = false;

  function animate() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect particles to each other
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - dist / 120) * 0.22;
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // Connect particles to mouse cursor when close
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          const alpha = (1 - dist / mouse.radius) * 0.35;
          ctx.strokeStyle = `rgba(0, 230, 118, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (!isRunning) {
      isRunning = true;
      if (typeof requestAnimationFrame === 'function') {
        animationFrameId = requestAnimationFrame(animate);
      }
    }
  }

  function stopAnimation() {
    isRunning = false;
    if (animationFrameId && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  // 1. Pause Canvas loop with IntersectionObserver when Hero is out of viewport
  const heroSection = document.getElementById('hero');
  if (heroSection && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !document.hidden) {
          startAnimation();
        } else {
          stopAnimation();
        }
      });
    }, { threshold: 0.05 });
    heroObserver.observe(heroSection);
  } else {
    startAnimation();
  }

  // 2. Pause Canvas loop when browser tab is inactive/hidden
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAnimation();
      } else if (heroSection && heroSection.getBoundingClientRect().bottom > 0) {
        startAnimation();
      }
    });
  }

  // 3. Debounced Resize Handler
  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }, 150);
  }

  window.addEventListener('resize', handleResize, { passive: true });
}

/**
 * Scroll Reveal using native IntersectionObserver with Staggered Cascade
 */
export function initScrollReveal() {
  const revealContainers = document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-stagger');
  if (!revealContainers.length) return;

  if (!('IntersectionObserver' in window)) {
    revealContainers.forEach(el => el.classList.add('revealed'));
    return;
  }

  // Assign stagger indexes to grid children
  document.querySelectorAll('.reveal-stagger').forEach(container => {
    Array.from(container.children).forEach((child, idx) => {
      child.style.setProperty('--stagger-index', (idx + 1).toString());
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          entry.target.classList.remove('revealed');
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealContainers.forEach((el) => observer.observe(el));
}

/**
 * Subtle interactive spotlight on project and methodology cards
 */
export function initCardSpotlight() {
  const cards = document.querySelectorAll('.project-card, .methodology-card, .skill-card, .service-card');
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
