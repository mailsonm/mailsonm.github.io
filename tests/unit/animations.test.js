import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { initAnimations, initParticles, initScrollReveal } from '../../assets/js/animations.js';

describe('Animations Module (Canvas Particles & Scroll Reveal)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section id="hero">
        <canvas id="hero-particles"></canvas>
      </section>
      <div class="reveal-fade-up">Item 1</div>
      <div class="reveal-fade-up">Item 2</div>
    `;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should export required animation functions', () => {
    expect(typeof initAnimations).toBe('function');
    expect(typeof initParticles).toBe('function');
    expect(typeof initScrollReveal).toBe('function');
  });

  it('should initialize scroll reveal with IntersectionObserver when supported', () => {
    const observeMock = vi.fn();
    const unobserveMock = vi.fn();
    const disconnectMock = vi.fn();

    window.IntersectionObserver = vi.fn(function(callback) {
      this.observe = observeMock;
      this.unobserve = unobserveMock;
      this.disconnect = disconnectMock;
    });

    initScrollReveal();

    expect(window.IntersectionObserver).toHaveBeenCalled();
    expect(observeMock).toHaveBeenCalledTimes(2);
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

  it('should safely initialize canvas particles without errors', () => {
    const canvas = document.getElementById('hero-particles');
    // Mock getContext
    canvas.getContext = vi.fn(() => ({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
    }));

    expect(() => initParticles()).not.toThrow();
  });
});
