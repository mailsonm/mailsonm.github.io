import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { initAnimations, initParticles, initScrollReveal, initCardSpotlight } from '../../assets/js/animations.js';

describe('Animations Module (Canvas Particles, Physics & Staggered Reveal)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section id="hero">
        <canvas id="hero-particles"></canvas>
      </section>
      <div class="reveal-stagger">
        <div class="reveal-fade-up">Item 1</div>
        <div class="reveal-fade-up">Item 2</div>
      </div>
      <div class="service-card">Service Card</div>
    `;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should export required animation functions', () => {
    expect(typeof initAnimations).toBe('function');
    expect(typeof initParticles).toBe('function');
    expect(typeof initScrollReveal).toBe('function');
    expect(typeof initCardSpotlight).toBe('function');
  });

  it('should assign stagger index variables to stagger children', () => {
    window.IntersectionObserver = vi.fn(function() {
      this.observe = vi.fn();
      this.unobserve = vi.fn();
      this.disconnect = vi.fn();
    });

    initScrollReveal();

    const items = document.querySelectorAll('.reveal-stagger > *');
    expect(items[0].style.getPropertyValue('--stagger-index')).toBe('1');
    expect(items[1].style.getPropertyValue('--stagger-index')).toBe('2');
  });

  it('should initialize scroll reveal with IntersectionObserver and toggle .revealed bi-directionally', () => {
    let observerCallback;
    const observeMock = vi.fn();
    const unobserveMock = vi.fn();
    const disconnectMock = vi.fn();

    window.IntersectionObserver = vi.fn(function(callback) {
      observerCallback = callback;
      this.observe = observeMock;
      this.unobserve = unobserveMock;
      this.disconnect = disconnectMock;
    });

    initScrollReveal();

    expect(window.IntersectionObserver).toHaveBeenCalled();
    expect(observeMock).toHaveBeenCalled();

    const targetEl = document.querySelector('.reveal-fade-up');
    
    // Simulate element entering viewport
    observerCallback([{ target: targetEl, isIntersecting: true }]);
    expect(targetEl.classList.contains('revealed')).toBe(true);

    // Simulate element leaving viewport (scroll out)
    observerCallback([{ target: targetEl, isIntersecting: false }]);
    expect(targetEl.classList.contains('revealed')).toBe(false);

    // Simulate element entering viewport again (scroll back)
    observerCallback([{ target: targetEl, isIntersecting: true }]);
    expect(targetEl.classList.contains('revealed')).toBe(true);
  });

  it('should safely fallback if IntersectionObserver is not available', () => {
    delete window.IntersectionObserver;
    expect(() => initScrollReveal()).not.toThrow();

    // Fallback should immediately add .revealed to all items
    const elements = document.querySelectorAll('.reveal-fade-up');
    elements.forEach(el => {
      expect(el.classList.contains('revealed')).toBe(true);
    });
  });

  it('should safely initialize canvas particles and attach mouse event listeners', () => {
    const canvas = document.getElementById('hero-particles');
    canvas.getContext = vi.fn(() => ({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
    }));

    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    expect(() => initParticles()).not.toThrow();
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function), expect.any(Object));
  });

  it('should update card mouse coordinates on card spotlight hover', () => {
    initCardSpotlight();
    const card = document.querySelector('.service-card');
    card.getBoundingClientRect = () => ({ left: 10, top: 20, width: 200, height: 100 });

    const mouseEvent = new MouseEvent('mousemove', { clientX: 50, clientY: 70 });
    card.dispatchEvent(mouseEvent);

    expect(card.style.getPropertyValue('--mouse-x')).toBe('40px');
    expect(card.style.getPropertyValue('--mouse-y')).toBe('50px');
  });
});
