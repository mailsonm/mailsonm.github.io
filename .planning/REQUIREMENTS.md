# 📋 REQUIREMENTS.md: Portfólio Profissional no GitHub Pages

## 🏷️ Matriz de Requisitos

### 1. Estrutura & Apresentação (CORE)
- **[REQ-CORE-01]** O portfólio deve possuir cabeçalho responsivo com logotipo/nome, links de navegação suave e controles de utilidades (Tema e Idioma).
- **[REQ-CORE-02]** Seção Hero com título profissional, proposta de valor, botões de ação rápida (*Ver Projetos*, *Baixar Currículo*, *Falar Comigo*) e avatar profissional com carregamento otimizado (WebP).
- **[REQ-CORE-03]** Seção "Sobre Mim & Metodologia" destacando experiência em TI, arquitetura de software, TDD e boas práticas.
- **[REQ-CORE-04]** Seção "Matriz de Tecnologias / Skills" organizada por categorias (Backend/ERP, Frontend, DevOps/Automação, Game Dev).
- **[REQ-CORE-05]** Seção "Projetos em Destaque" com cards interativos contendo título, descrição, tags de tecnologia, links do GitHub e demo ao vivo quando disponível.
- **[REQ-CORE-06]** Seção "Serviços Oferecidos" detalhando consultoria de TI, desenvolvimento de módulos Odoo, automações com n8n e desenvolvimento web/plugins.
- **[REQ-CORE-07]** Rodapé semântico com copyright, links sociais e indicação de tecnologia (GitHub Pages + Vanilla JS).

### 2. Design System & Acessibilidade (UI)
- **[REQ-UI-01]** Suporte a Modo Escuro (Dark Mode) e Modo Claro (Light Mode) com detecção automática da preferência do sistema (`prefers-color-scheme`) e toggle manual do usuário.
- **[REQ-UI-02]** Persistência da preferência de tema no `localStorage`.
- **[REQ-UI-03]** Design 100% responsivo (Mobile First: smartphones, tablets, desktops e ultrawide).
- **[REQ-UI-04]** Acessibilidade total (A11y): navegação por teclado, contrastes WCAG AA/AAA, tags ARIA apropriadas e atributos `alt` em todas as imagens.
- **[REQ-UI-05]** Otimização de SEO com Open Graph e Twitter Cards completos para compartilhamento rico em redes sociais.

### 3. Internacionalização (I18N)
- **[REQ-I18N-01]** Suporte nativo a 3 idiomas: Português (`pt-BR`), Inglês (`en-US`) e Espanhol (`es-ES`).
- **[REQ-I18N-02]** Módulo de tradução reativo sem recarregamento de página, substituindo chaves `data-i18n`.
- **[REQ-I18N-03]** Detecção automática do idioma do navegador (`navigator.language`) com fallback para `pt-BR`.
- **[REQ-I18N-04]** Persistência do idioma selecionado no `localStorage`.

### 4. Showcase & Filtro de Projetos (SHOWCASE)
- **[REQ-SHOWCASE-01]** Destaque para o plugin *Aviso de Cópia* com estatísticas, badges e links oficiais.
- **[REQ-SHOWCASE-02]** Destaque para projetos Odoo 19 / Python (ERP, regras de negócio e testes automatizados).
- **[REQ-SHOWCASE-03]** Destaque para projetos n8n e automações backend.
- **[REQ-SHOWCASE-04]** Filtro dinâmico por categoria/tag (Todos, Backend, Frontend, ERP/Odoo, Automação, Game Dev) sem recarregar a página.

### 5. Contato & Conversão (CONTACT)
- **[REQ-CONTACT-01]** Formulário de contato funcional integrado à API do Web3Forms com validação de campos (nome, e-mail, mensagem).
- **[REQ-CONTACT-02]** Feedback visual no envio (estado de carregamento, mensagem de sucesso e mensagem de erro).
- **[REQ-CONTACT-03]** Fallback gracioso para link `mailto:` direto e botões de contato rápido (WhatsApp e LinkedIn).

### 6. Testes & Qualidade (QA & TDD)
- **[REQ-QA-01]** Suíte de testes unitários com Vitest + JSDOM cobrindo o módulo de tema, módulo i18n, filtro de projetos e validação do formulário.
- **[REQ-QA-02]** Suíte de testes E2E com Playwright validando fluxo de troca de idioma, alternância de tema e renderização responsiva.
- **[REQ-QA-03]** Garantia de performance com pontuação próxima a 100 no Lighthouse (Performance, Acessibilidade, Melhores Práticas, SEO).

### 7. DevOps & CI/CD (DEPLOY)
- **[REQ-DEPLOY-01]** Workflow do GitHub Actions para rodar linter e testes automatizados a cada push/PR na branch `main`.
- **[REQ-DEPLOY-02]** Deploy automatizado para GitHub Pages na branch `main` após aprovação na suíte de testes.
