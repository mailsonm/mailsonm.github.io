import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  validateName,
  validateEmail,
  validateMessage,
  validateContactForm,
  submitContactForm,
  createMailtoFallback,
  initContactForm,
  DEFAULT_RECEIVER_EMAIL
} from '../../assets/js/contact.js';

describe('Contact Form Manager Module', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  describe('Validation Functions', () => {
    it('validateName should require at least 2 non-whitespace characters', () => {
      expect(validateName('')).toBe(false);
      expect(validateName('   ')).toBe(false);
      expect(validateName('A')).toBe(false);
      expect(validateName('Ma')).toBe(true);
      expect(validateName('Mailson Maia')).toBe(true);
    });

    it('validateEmail should validate standard email addresses', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('mailson@empresa.com.br')).toBe(true);
      expect(validateEmail('dev.test+1@gmail.com')).toBe(true);
    });

    it('validateMessage should require at least 5 non-whitespace characters', () => {
      expect(validateMessage('')).toBe(false);
      expect(validateMessage('1234')).toBe(false);
      expect(validateMessage('Olá, tenho interesse no projeto')).toBe(true);
    });

    it('validateContactForm should return valid when all fields pass', () => {
      const result = validateContactForm({
        name: 'Mailson',
        email: 'mailson@example.com',
        message: 'Gostaria de solicitar uma consultoria de TI.'
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('validateContactForm should return specific field errors when invalid', () => {
      const result = validateContactForm({
        name: '',
        email: 'bad-email',
        message: 'hi'
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.message).toBeDefined();
    });
  });

  describe('createMailtoFallback', () => {
    it('should generate properly encoded mailto URL', () => {
      const data = {
        name: 'Carlos Silva',
        email: 'carlos@empresa.com',
        message: 'Preciso de um módulo Odoo 19.'
      };

      const mailto = createMailtoFallback(data);
      expect(mailto).toContain(`mailto:${DEFAULT_RECEIVER_EMAIL}`);
      expect(mailto).toContain(encodeURIComponent('Carlos Silva'));
      expect(mailto).toContain(encodeURIComponent(data.message));
    });
  });

  describe('submitContactForm (with Mocked fetch)', () => {
    it('should post data to Web3Forms API and return success', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, message: 'Message sent successfully' })
      });

      const data = {
        name: 'Maria Santos',
        email: 'maria@empresa.com',
        message: 'Olá, preciso de um orçamento para integração de sistemas.'
      };

      const response = await submitContactForm(data, 'mock-access-key');

      expect(global.fetch).toHaveBeenCalledWith('https://api.web3forms.com/submit', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      }));
      expect(response.success).toBe(true);
    });

    it('should handle API failure gracefully', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ success: false, message: 'Invalid API key' })
      });

      const response = await submitContactForm({
        name: 'Maria',
        email: 'maria@test.com',
        message: 'Teste de falha'
      }, 'invalid-key');

      expect(response.success).toBe(false);
      expect(response.error).toBeDefined();
    });

    it('should handle network crash gracefully', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const response = await submitContactForm({
        name: 'Maria',
        email: 'maria@test.com',
        message: 'Teste de rede'
      }, 'key');

      expect(response.success).toBe(false);
      expect(response.error).toContain('Network error');
    });
  });

  describe('initContactForm DOM Integration & Security', () => {
    it('should handle legitimate form submit and show success', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true })
      });

      document.body.innerHTML = `
        <form id="contact-form">
          <input type="checkbox" name="botcheck" />
          <input id="contact-name" name="name" value="Mailson Dev" />
          <input id="contact-email" name="email" value="dev@mailson.com" />
          <textarea id="contact-message" name="message">Mensagem válida para contato.</textarea>
          <button type="submit" id="btn-submit-contact">Enviar</button>
          <div id="contact-status" class="hidden"></div>
        </form>
      `;

      initContactForm();

      const form = document.getElementById('contact-form');
      const statusDiv = document.getElementById('contact-status');

      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

      await new Promise(process.nextTick);

      expect(global.fetch).toHaveBeenCalled();
      expect(statusDiv.classList.contains('success')).toBe(true);
    });

    it('should reject inputs exceeding max length thresholds', () => {
      const longName = 'A'.repeat(101);
      const longEmail = 'a'.repeat(121) + '@example.com';
      const longMessage = 'M'.repeat(3001);

      expect(validateName(longName)).toBe(false);
      expect(validateEmail(longEmail)).toBe(false);
      expect(validateMessage(longMessage)).toBe(false);
    });

    it('should silently intercept honeypot bot submissions without calling API', async () => {
      const fetchSpy = vi.fn();
      global.fetch = fetchSpy;

      document.body.innerHTML = `
        <form id="contact-form">
          <input type="checkbox" name="botcheck" checked />
          <input id="contact-name" name="name" value="Bot Name" />
          <input id="contact-email" name="email" value="bot@spam.com" />
          <textarea id="contact-message" name="message">Spam automated message content</textarea>
          <button type="submit" id="btn-submit-contact">Enviar</button>
          <div id="contact-status" class="hidden"></div>
        </form>
      `;

      initContactForm();

      const form = document.getElementById('contact-form');
      const statusDiv = document.getElementById('contact-status');

      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

      await new Promise(process.nextTick);

      expect(fetchSpy).not.toHaveBeenCalled();
      expect(statusDiv.classList.contains('success')).toBe(true);
    });
  });
});
