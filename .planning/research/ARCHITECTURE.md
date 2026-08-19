# 🔬 Pesquisa Arquitetural & Melhores Práticas: Portfólio GitHub Pages

## 1. Otimização para Lighthouse 100/100
- **Zero Render-Blocking Resources:** CSS enxuto e estruturado sem bibliotecas externas pesadas (como Bootstrap ou Tailwind compilados gigantes).
- **Formatos de Imagem Modernos:** Utilizar WebP e SVGs otimizados com tags `width` e `height` explícitas para evitar Cumulative Layout Shift (CLS).
- **Semântica & ARIA:** Todos os botões interativos, seletores de tema e links de navegação com `aria-label`, contrastes de cor com ratio superior a 4.5:1 (WCAG AA/AAA).

## 2. Arquitetura do Sistema de Internacionalização (i18n)
- **Estrutura de Dicionário:**
  ```javascript
  export const translations = {
    'pt-BR': {
      nav: { about: 'Sobre', projects: 'Projetos', services: 'Serviços', contact: 'Contato' },
      hero: { title: 'Consultor de TI & Desenvolvedor Full Stack', ... }
    },
    'en-US': { ... },
    'es-ES': { ... }
  };
  ```
- **Mecanismo de Troca no DOM:**
  Uso de atributos `data-i18n="hero.title"` ou `data-i18n-placeholder="contact.placeholder_name"` que são substituídos reativamente sem alterar o fluxo ou fazer requisições de rede lentas.

## 3. Gestão de Tema Dark / Light
- **CSS Custom Properties (Variables):**
  Definição de `--bg-primary`, `--text-primary`, `--accent-color`, `--card-bg`, etc., mapeadas no `:root` e sobrescritas sob o seletor `[data-theme="light"]` / `[data-theme="dark"]`.
- **Precedência:** `localStorage` > `prefers-color-scheme` > padrão (`dark`).

## 4. Integração do Formulário de Contato Web3Forms
- Endpoint assíncrono: `https://api.web3forms.com/submit` via `fetch()` em JSON ou `FormData`.
- Atributo honeypot oculto (`botcheck`) para proteção anti-spam sem CAPTCHAs intrusivos.
- Fallback gracioso: Se a requisição falhar ou não houver chave de API configurada, abrir cliente de e-mail (`mailto:`) com o corpo preenchido.
