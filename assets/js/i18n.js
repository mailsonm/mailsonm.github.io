/**
 * i18n Translation Manager Module
 * Handles multilingual support (pt-BR, en-US, es-ES), dictionary lookups, DOM interpolation, and persistence.
 */

export const I18N_STORAGE_KEY = 'portfolio_language';
export const DEFAULT_LANGUAGE = 'pt-BR';
export const SUPPORTED_LANGUAGES = ['pt-BR', 'en-US', 'es-ES'];

export const translations = {
  'pt-BR': {
    brand: {
      name: 'Mailson Maia'
    },
    nav: {
      about: 'Sobre',
      skills: 'Especialidades',
      projects: 'Projetos',
      services: 'Serviços',
      contact: 'Contato',
      theme_aria: 'Alternar tema claro/escuro',
      lang_aria: 'Selecionar idioma'
    },
    hero: {
      greeting: 'Olá, me chamo',
      title: 'Mailson Maia Alves',
      subtitle: 'Consultor de TI & Desenvolvedor Full Stack',
      description: 'Especialista em arquiteturas escaláveis, ERP Odoo 19 / Python, ecossistema PHP/WordPress, automações com n8n e desenvolvimento orientado a testes (TDD-First).',
      btn_projects: 'Ver Projetos',
      btn_contact: 'Entrar em Contato',
      btn_resume: 'Baixar CV'
    },
    about: {
      title: 'Sobre Mim & Metodologia',
      subtitle: 'Engenharia de Software com Disciplina e Resultados',
      p1: 'Com sólida experiência em Consultoria de TI e Desenvolvimento Full Stack, atuo na construção de soluções empresariais robustas, integrações de sistemas complexos e desenvolvimento de plugins e automações de alta produtividade.',
      p2: 'Comprometido com a excelência técnica através de desenvolvimento orientado a testes (TDD-First): se uma regra de negócio não é coberta por testes automatizados, ela não está pronta para produção. Aplico Clean Code e SOLID para garantir estabilidade, segurança e alta performance em escala.',
      metric_exp: 'Anos de Experiência em TI',
      metric_projects: 'Módulos, Plugins & Automações',
      metric_tdd: 'Cobertura com TDD Automatizado'
    },
    skills: {
      title: 'Matriz de Especialidades',
      subtitle: 'Tecnologias e Ferramentas Dominadas',
      backend_title: 'Backend & ERP',
      backend_desc: 'PHP 8.3+ (PSR-12, Pest), Python 3.12, Odoo 19 (Módulos & Testes), WordPress Plugin Dev, REST APIs.',
      frontend_title: 'Frontend & UI',
      frontend_desc: 'JavaScript Moderno (ES6+), TypeScript, Vue.js / OWL Framework, HTML5 Semântico, CSS3 Moderno.',
      devops_title: 'DevOps & Automações',
      devops_desc: 'Docker & Docker Compose, n8n.io, PowerShell, Linux CLI, Git & GitHub Actions CI/CD.',
      gamedev_title: 'Game Development',
      gamedev_desc: 'Godot Engine (GDScript / C#), Arquitetura por Sinais e Composição, Testes com GUT.'
    },
    projects: {
      title: 'Projetos em Destaque',
      subtitle: 'Soluções Reais, Código Aberto e Alta Performance',
      filter_all: 'Todos',
      filter_wordpress: 'WordPress',
      filter_odoo: 'Odoo & Python',
      filter_automation: 'Automação & n8n',
      filter_php: 'PHP & APIs',
      filter_games: 'Game Dev',
      btn_code: 'Ver Código',
      btn_live: 'Live Demo',
      btn_docs: 'Documentação'
    },
    services: {
      title: 'Serviços & Consultoria',
      subtitle: 'Como posso agregar valor ao seu projeto ou empresa',
      s1_title: 'Consultoria de TI & Arquitetura',
      s1_desc: 'Diagnóstico técnico, planejamento arquitetural, estruturação de microsserviços e definição de padrões de engenharia.',
      s2_title: 'Desenvolvimento Odoo 19 & Python',
      s2_desc: 'Criação de módulos sob medida, customizações avançadas de regras de negócio, integrações via API e testes automatizados.',
      s3_title: 'Plugins WordPress & Backend PHP',
      s3_desc: 'Desenvolvimento de plugins profissionais de alta performance, compatíveis com WordPress VIP e padrões PSR-12.',
      s4_title: 'Automações n8n & Pipelines CI/CD',
      s4_desc: 'Criação de fluxos inteligentes de dados no n8n.io, scripts de automação CLI/PowerShell e pipelines no GitHub Actions.'
    },
    contact: {
      title: 'Vamos Conversar?',
      subtitle: 'Disponível para consultorias, novos projetos e oportunidades',
      direct_title: 'Canais Rápidos de Contato',
      form_title: 'Envie uma Mensagem',
      name_label: 'Seu Nome',
      email_label: 'Seu E-mail',
      message_label: 'Sua Mensagem',
      placeholder_name: 'Ex: João Silva',
      placeholder_email: 'Ex: joao@empresa.com',
      placeholder_message: 'Descreva brevemente sua necessidade ou projeto...',
      btn_send: 'Enviar Mensagem',
      btn_sending: 'Enviando...',
      success_msg: 'Mensagem enviada com sucesso! Retornarei o mais breve possível.',
      error_msg: 'Não foi possível enviar a mensagem no momento. Por favor, utilize o WhatsApp ou e-mail direto.',
      rate_limit_msg: 'Por favor, aguarde 60 segundos antes de enviar outra mensagem.',
      privacy_note: '🔒 Seus dados serão utilizados unicamente para retorno do seu contato profissional.',
      whatsapp_btn: 'Falar no WhatsApp',
      linkedin_btn: 'Conectar no LinkedIn',
      email_btn: 'Enviar E-mail Direto'
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      tech_note: 'Hospedado no GitHub Pages com Vanilla JS, CSS3 e HTML5 Semântico.'
    }
  },
  'en-US': {
    brand: {
      name: 'Mailson Maia'
    },
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      services: 'Services',
      contact: 'Contact',
      theme_aria: 'Toggle light/dark theme',
      lang_aria: 'Select language'
    },
    hero: {
      greeting: 'Hello, my name is',
      title: 'Mailson Maia Alves',
      subtitle: 'IT Consultant & Full Stack Developer',
      description: 'Specialist in scalable architectures, Odoo 19 ERP / Python, PHP/WordPress ecosystem, n8n automations, and Test-Driven Development (TDD-First).',
      btn_projects: 'View Projects',
      btn_contact: 'Get in Touch',
      btn_resume: 'Download CV'
    },
    about: {
      title: 'About Me & Methodology',
      subtitle: 'Software Engineering with Discipline and Impact',
      p1: 'With solid experience in IT Consulting and Full Stack Development, I build robust enterprise solutions, complex system integrations, high-productivity plugins and automated workflows.',
      p2: 'Committed to technical excellence through Test-Driven Development (TDD-First): if a business rule is not backed by automated tests, it is not production-ready. I apply Clean Code and SOLID to ensure stability, security, and scalability.',
      metric_exp: 'Years of IT Experience',
      metric_projects: 'Modules, Plugins & Automations',
      metric_tdd: 'Automated TDD Coverage'
    },
    skills: {
      title: 'Skills & Stack Matrix',
      subtitle: 'Core Technologies and Tooling',
      backend_title: 'Backend & ERP',
      backend_desc: 'PHP 8.3+ (PSR-12, Pest), Python 3.12, Odoo 19 (Modules & Testing), WordPress Plugin Dev, REST APIs.',
      frontend_title: 'Frontend & UI',
      frontend_desc: 'Modern JavaScript (ES6+), TypeScript, Vue.js / OWL Framework, Semantic HTML5, Modern CSS3.',
      devops_title: 'DevOps & Automations',
      devops_desc: 'Docker & Docker Compose, n8n.io, PowerShell, Linux CLI, Git & GitHub Actions CI/CD.',
      gamedev_title: 'Game Development',
      gamedev_desc: 'Godot Engine (GDScript / C#), Signal-based architecture and Composition, GUT testing.'
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Real-World Solutions, Open Source & High Performance',
      filter_all: 'All',
      filter_wordpress: 'WordPress',
      filter_odoo: 'Odoo & Python',
      filter_automation: 'Automation & n8n',
      filter_php: 'PHP & APIs',
      filter_games: 'Game Dev',
      btn_code: 'Source Code',
      btn_live: 'Live Demo',
      btn_docs: 'Documentation'
    },
    services: {
      title: 'Services & Consulting',
      subtitle: 'How I can bring high value to your team or business',
      s1_title: 'IT Consulting & Architecture',
      s1_desc: 'Technical diagnostics, architectural planning, microservices design, and engineering standard definitions.',
      s2_title: 'Odoo 19 & Python Development',
      s2_desc: 'Tailor-made modules, advanced business logic customization, API integrations, and automated testing.',
      s3_title: 'WordPress Plugins & PHP Backend',
      s3_desc: 'High-performance professional plugin development following WordPress VIP and PSR-12 standards.',
      s4_title: 'n8n Automations & CI/CD Pipelines',
      s4_desc: 'Intelligent data workflows in n8n.io, CLI/PowerShell automation scripts, and GitHub Actions pipelines.'
    },
    contact: {
      title: 'Let\'s Connect',
      subtitle: 'Available for consulting, new projects, and opportunities',
      direct_title: 'Direct Channels',
      form_title: 'Send a Message',
      name_label: 'Your Name',
      email_label: 'Your Email',
      message_label: 'Your Message',
      placeholder_name: 'E.g., John Doe',
      placeholder_email: 'E.g., john@company.com',
      placeholder_message: 'Briefly describe your project or inquiry...',
      btn_send: 'Send Message',
      btn_sending: 'Sending...',
      success_msg: 'Message sent successfully! I will reply as soon as possible.',
      error_msg: 'Unable to send message right now. Please reach out directly via WhatsApp or Email.',
      rate_limit_msg: 'Please wait 60 seconds before sending another message.',
      privacy_note: '🔒 Your information will be used solely to reply to your inquiry.',
      whatsapp_btn: 'Message on WhatsApp',
      linkedin_btn: 'Connect on LinkedIn',
      email_btn: 'Send Direct Email'
    },
    footer: {
      rights: 'All rights reserved.',
      tech_note: 'Hosted on GitHub Pages with Vanilla JS, Modern CSS3 and Semantic HTML5.'
    }
  },
  'es-ES': {
    brand: {
      name: 'Mailson Maia'
    },
    nav: {
      about: 'Sobre mí',
      skills: 'Especialidades',
      projects: 'Proyectos',
      services: 'Servicios',
      contact: 'Contacto',
      theme_aria: 'Alternar tema claro/escuro',
      lang_aria: 'Seleccionar idioma'
    },
    hero: {
      greeting: 'Hola, mi nombre es',
      title: 'Mailson Maia Alves',
      subtitle: 'Consultor de TI & Desarrollador Full Stack',
      description: 'Especialista en arquitecturas escalables, ERP Odoo 19 / Python, ecosistema PHP/WordPress, automatizaciones con n8n y desarrollo guiado por pruebas (TDD-First).',
      btn_projects: 'Ver Proyectos',
      btn_contact: 'Contactar',
      btn_resume: 'Descargar CV'
    },
    about: {
      title: 'Sobre Mí & Metodología',
      subtitle: 'Ingeniería de Software con Disciplina y Resultados',
      p1: 'Con sólida experiencia en Consultoría de TI y Desarrollo Full Stack, desarrollo soluciones empresariales robustas, integraciones de sistemas complejos, plugins y automatizaciones de alta productividad.',
      p2: 'Comprometido con la excelencia técnica mediante el desarrollo guiado por pruebas (TDD-First): si una regla de negocio no está cubierta por pruebas automatizadas, no está lista para producción. Aplico Clean Code y SOLID para garantizar estabilidad, seguridad y escalabilidad.',
      metric_exp: 'Años de Experiencia en TI',
      metric_projects: 'Módulos, Plugins y Automatizaciones',
      metric_tdd: 'Cobertura con TDD Automatizado'
    },
    skills: {
      title: 'Matriz de Especialidades',
      subtitle: 'Tecnologías y Herramientas Dominadas',
      backend_title: 'Backend & ERP',
      backend_desc: 'PHP 8.3+ (PSR-12, Pest), Python 3.12, Odoo 19 (Módulos & Pruebas), WordPress Plugin Dev, REST APIs.',
      frontend_title: 'Frontend & UI',
      frontend_desc: 'JavaScript Moderno (ES6+), TypeScript, Vue.js / OWL Framework, HTML5 Semántico, CSS3 Moderno.',
      devops_title: 'DevOps & Automatizaciones',
      devops_desc: 'Docker & Docker Compose, n8n.io, PowerShell, Linux CLI, Git & GitHub Actions CI/CD.',
      gamedev_title: 'Desarrollo de Videojuegos',
      gamedev_desc: 'Godot Engine (GDScript / C#), Arquitectura orientada a señales y composición, pruebas GUT.'
    },
    projects: {
      title: 'Proyectos Destacados',
      subtitle: 'Soluciones Reales, Código Abierto y Alto Rendimiento',
      filter_all: 'Todos',
      filter_wordpress: 'WordPress',
      filter_odoo: 'Odoo & Python',
      filter_automation: 'Automatización & n8n',
      filter_php: 'PHP & APIs',
      filter_games: 'Videojuegos',
      btn_code: 'Ver Código',
      btn_live: 'Demo en Vivo',
      btn_docs: 'Documentación'
    },
    services: {
      title: 'Servicios & Consultoría',
      subtitle: 'Cómo puedo aportar valor a su empresa o proyecto',
      s1_title: 'Consultoría de TI & Arquitectura',
      s1_desc: 'Diagnóstico técnico, planificación arquitectónica, diseño de microservicios y definición de estándares de ingeniería.',
      s2_title: 'Desarrollo Odoo 19 & Python',
      s2_desc: 'Módulos a medida, personalización avanzada de reglas de negocio, integraciones API y pruebas automatizadas.',
      s3_title: 'Plugins WordPress & Backend PHP',
      s3_desc: 'Desarrollo de plugins profesionales de alto rendimiento conformes a estándares WordPress VIP y PSR-12.',
      s4_title: 'Automatizaciones n8n & Pipelines CI/CD',
      s4_desc: 'Flujos de datos inteligentes en n8n.io, scripts de automatización CLI/PowerShell y pipelines en GitHub Actions.'
    },
    contact: {
      title: '¿Hablamos?',
      subtitle: 'Disponible para consultoría, nuevos proyectos y oportunidades',
      direct_title: 'Canales Directos',
      form_title: 'Envíe un Mensaje',
      name_label: 'Su Nombre',
      email_label: 'Su Correo',
      message_label: 'Su Mensaje',
      placeholder_name: 'Ej: Juan Pérez',
      placeholder_email: 'Ej: juan@empresa.com',
      placeholder_message: 'Describa brevemente su consulta o proyecto...',
      btn_send: 'Enviar Mensaje',
      btn_sending: 'Enviando...',
      success_msg: '¡Mensaje enviado con éxito! Responderé a la brevedad posible.',
      error_msg: 'No fue posible enviar el mensaje en este momento. Por favor, comuníquese por WhatsApp o correo directo.',
      rate_limit_msg: 'Por favor, espere 60 segundos antes de enviar otro mensaje.',
      privacy_note: '🔒 Sus datos se utilizarán únicamente para responder a su consulta profesional.',
      whatsapp_btn: 'Hablar por WhatsApp',
      linkedin_btn: 'Conectar en LinkedIn',
      email_btn: 'Enviar Correo Directo'
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      tech_note: 'Alojado en GitHub Pages con Vanilla JS, CSS3 Moderno y HTML5 Semántico.'
    }
  }
};

/**
 * Gets saved language from localStorage if valid.
 * @returns {'pt-BR' | 'en-US' | 'es-ES' | null}
 */
export function getSavedLanguage() {
  const saved = localStorage.getItem(I18N_STORAGE_KEY);
  if (SUPPORTED_LANGUAGES.includes(saved)) {
    return saved;
  }
  return null;
}

/**
 * Detects language from browser navigator.
 * @returns {'pt-BR' | 'en-US' | 'es-ES'}
 */
export function getBrowserLanguage() {
  if (typeof navigator !== 'undefined' && navigator.language) {
    const code = navigator.language.toLowerCase();
    if (code.startsWith('pt')) return 'pt-BR';
    if (code.startsWith('en')) return 'en-US';
    if (code.startsWith('es')) return 'es-ES';
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Gets the effective active language.
 * @returns {'pt-BR' | 'en-US' | 'es-ES'}
 */
export function getEffectiveLanguage() {
  return getSavedLanguage() || getBrowserLanguage();
}

/**
 * Resolves a nested key string (e.g. 'hero.title') from a language dictionary.
 * @param {string} key
 * @param {string} lang
 * @returns {string}
 */
export function translate(key, lang = getEffectiveLanguage()) {
  const targetDict = translations[lang] || translations[DEFAULT_LANGUAGE];
  const keys = key.split('.');
  
  let result = targetDict;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      result = null;
      break;
    }
  }

  if (typeof result === 'string') {
    return result;
  }

  // Fallback to default dictionary if missing in target
  if (lang !== DEFAULT_LANGUAGE) {
    return translate(key, DEFAULT_LANGUAGE);
  }

  return key;
}

/**
 * Applies translations to all matching elements in the DOM container.
 * @param {string} lang
 * @param {HTMLElement|Document} container
 */
export function applyTranslations(lang = getEffectiveLanguage(), container = document) {
  if (typeof document === 'undefined') return;

  // 1. Text content
  const textElements = container.querySelectorAll('[data-i18n]');
  textElements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translate(key, lang);
  });

  // 2. Placeholders
  const placeholderElements = container.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', translate(key, lang));
  });

  // 3. Aria-labels
  const ariaElements = container.querySelectorAll('[data-i18n-aria]');
  ariaElements.forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    el.setAttribute('aria-label', translate(key, lang));
  });

  // 4. Title attributes
  const titleElements = container.querySelectorAll('[data-i18n-title]');
  titleElements.forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.setAttribute('title', translate(key, lang));
  });
}

/**
 * Sets current language, persists to storage, updates document lang and DOM.
 * @param {string} lang
 */
export function setLanguage(lang) {
  const targetLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
  
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(I18N_STORAGE_KEY, targetLang);
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = targetLang;
    applyTranslations(targetLang);

    const langSelect = document.getElementById('lang-select');
    if (langSelect && langSelect.value !== targetLang) {
      langSelect.value = targetLang;
    }

    // Dispatch a custom event so other modules (e.g. projects) can re-render on language change
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: targetLang } }));
  }
}

/**
 * Initializes i18n on page load and binds listener to language select dropdown.
 */
export function initI18n() {
  const initialLang = getEffectiveLanguage();
  setLanguage(initialLang);

  if (typeof document !== 'undefined') {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
      langSelect.value = initialLang;
      langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
      });
    }
  }
}
