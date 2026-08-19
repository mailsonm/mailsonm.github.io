import { describe, it, expect } from 'vitest';

describe('Sanity & Testing Environment Suite', () => {
  it('should pass basic math assertion', () => {
    expect(1 + 1).toBe(2);
  });

  it('should have JSDOM environment initialized properly', () => {
    expect(typeof window).toBe('object');
    expect(typeof document).toBe('object');
    
    const div = document.createElement('div');
    div.id = 'test-node';
    div.textContent = 'Hello TDD';
    document.body.appendChild(div);

    const found = document.getElementById('test-node');
    expect(found).not.toBeNull();
    expect(found?.textContent).toBe('Hello TDD');
  });

  it('should support localStorage mock in JSDOM', () => {
    localStorage.setItem('theme', 'dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    localStorage.removeItem('theme');
    expect(localStorage.getItem('theme')).toBeNull();
  });
});
