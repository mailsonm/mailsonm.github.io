/**
 * Contact Form Manager Module
 * Handles field validations, async submissions to Web3Forms API, status messages, and mailto fallback.
 */

import { getEffectiveLanguage, translate } from './i18n.js';

export const DEFAULT_RECEIVER_EMAIL = 'mairuson@gmail.com';
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
export const COOLDOWN_KEY = 'contact_last_submission';
export const COOLDOWN_SECONDS = 60;

/**
 * Checks if a submission cooldown is active.
 * @returns {boolean}
 */
export function isRateLimited() {
  try {
    const lastTime = sessionStorage.getItem(COOLDOWN_KEY);
    if (!lastTime) return false;
    const elapsed = (Date.now() - parseInt(lastTime, 10)) / 1000;
    return elapsed < COOLDOWN_SECONDS;
  } catch {
    return false;
  }
}

/**
 * Records the timestamp of a successful submission.
 */
export function recordSubmissionTime() {
  try {
    sessionStorage.setItem(COOLDOWN_KEY, Date.now().toString());
  } catch {
    // Ignore storage restrictions
  }
}

/**
 * Validates a person's name (min 2, max 100 characters, non-whitespace).
 * @param {string} name
 * @returns {boolean}
 */
export function validateName(name) {
  if (typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
}

/**
 * Validates an email address format (max 120 chars).
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 120) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(trimmed);
}

/**
 * Validates a message body (min 5, max 3000 characters, non-whitespace).
 * @param {string} message
 * @returns {boolean}
 */
export function validateMessage(message) {
  if (typeof message !== 'string') return false;
  const trimmed = message.trim();
  return trimmed.length >= 5 && trimmed.length <= 3000;
}

/**
 * Validates all fields of the contact form.
 * @param {object} formData
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateContactForm(formData) {
  const errors = {};

  if (!validateName(formData.name)) {
    errors.name = 'Nome deve conter entre 2 e 100 caracteres.';
  }
  if (!validateEmail(formData.email)) {
    errors.email = 'Informe um endereço de e-mail válido (máx. 120 caracteres).';
  }
  if (!validateMessage(formData.message)) {
    errors.message = 'A mensagem deve conter entre 5 e 3000 caracteres.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Generates a mailto: URL fallback for direct email client opening.
 * @param {object} formData
 * @returns {string}
 */
export function createMailtoFallback(formData) {
  const subject = encodeURIComponent(`Contato pelo Portfólio - ${formData.name || 'Novo Contato'}`);
  const body = encodeURIComponent(
    `Nome: ${formData.name || ''}\nE-mail: ${formData.email || ''}\n\nMensagem:\n${formData.message || ''}`
  );
  return `mailto:${DEFAULT_RECEIVER_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Submits form data asynchronously to Web3Forms API.
 * @param {object} data
 * @param {string} accessKey
 * @returns {Promise<{ success: boolean, message?: string, error?: string }>}
 */
export async function submitContactForm(data, accessKey = 'YOUR_WEB3FORMS_ACCESS_KEY') {
  const payload = {
    access_key: accessKey,
    name: data.name,
    email: data.email,
    message: data.message,
    subject: `Novo contato no portfólio de: ${data.name}`,
    from_name: 'Portfólio Web - Mailson Maia'
  };

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (response.ok && result.success) {
      return { success: true, message: result.message || 'Mensagem enviada!' };
    }
    return { success: false, error: result.message || 'Erro no envio da mensagem.' };
  } catch (err) {
    return { success: false, error: err.message || 'Erro de conexão.' };
  }
}

/**
 * Initializes the contact form DOM event listeners and submit handler.
 */
export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const statusDiv = document.getElementById('contact-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const lang = getEffectiveLanguage();

    // 1. Anti-Bot Honeypot Defense (Check if invisible botcheck field is checked or populated)
    const botCheck = form.querySelector('[name="botcheck"]');
    const isBot = botCheck && (
      (botCheck.type === 'checkbox' && botCheck.checked) ||
      (botCheck.type !== 'checkbox' && Boolean(botCheck.value && botCheck.value.trim() !== ''))
    );

    if (isBot) {
      if (statusDiv) {
        statusDiv.className = 'status-msg success';
        statusDiv.textContent = translate('contact.success_msg', lang);
        statusDiv.classList.remove('hidden');
      }
      form.reset();
      return;
    }

    // 2. Client-side Rate Limiting (Prevent API abuse / spamming)
    if (isRateLimited()) {
      if (statusDiv) {
        statusDiv.className = 'status-msg error';
        statusDiv.textContent = translate('contact.rate_limit_msg', lang) || 'Por favor, aguarde 60 segundos antes de enviar outra mensagem.';
        statusDiv.classList.remove('hidden');
      }
      return;
    }

    const nameInput = form.querySelector('[name="name"]') || document.getElementById('contact-name');
    const emailInput = form.querySelector('[name="email"]') || document.getElementById('contact-email');
    const messageInput = form.querySelector('[name="message"]') || document.getElementById('contact-message');
    const keyInput = form.querySelector('[name="access_key"]');

    const formData = {
      name: nameInput ? nameInput.value : '',
      email: emailInput ? emailInput.value : '',
      message: messageInput ? messageInput.value : ''
    };

    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      if (statusDiv) {
        statusDiv.className = 'status-msg error';
        statusDiv.textContent = Object.values(validation.errors)[0];
        statusDiv.classList.remove('hidden');
      }
      return;
    }

    // Set loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = translate('contact.btn_sending', lang) || 'Enviando...';
    }

    const accessKey = (keyInput && keyInput.value) ? keyInput.value : 'YOUR_WEB3FORMS_ACCESS_KEY';
    const result = await submitContactForm(formData, accessKey);

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = translate('contact.btn_send', lang) || 'Enviar Mensagem';
    }

    if (statusDiv) {
      statusDiv.classList.remove('hidden');
      if (result.success) {
        recordSubmissionTime();
        statusDiv.className = 'status-msg success';
        statusDiv.textContent = translate('contact.success_msg', lang);
        form.reset();
      } else {
        statusDiv.className = 'status-msg error';
        statusDiv.textContent = translate('contact.error_msg', lang);
      }
    }
  });
}
