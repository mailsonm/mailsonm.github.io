# 🚀 Plano Estratégico: Portfólio Profissional Gratuito no GitHub Pages

**Desenvolvedor:** Mailson Maia Alves  
**Repositório Alvo:** `https://github.com/mailsonm/mailsonm.github.io`  
**URL Final Gratuita:** `https://mailsonm.github.io/` (com SSL/HTTPS vitalício gratuito)  
**Custo Total:** R$ 0,00 (Zero custo de hospedagem ou manutenção)  

---

## 🎯 1. Objetivo do Projeto

Construir um portfólio web de altíssimo nível, ultrarrápido, moderno e responsivo para consolidar a presença digital de **Mailson Maia Alves (Consultor de TI & Desenvolvedor Full Stack)**. 

O site funcionará como o hub central do seu perfil profissional, destacando seus projetos de código aberto (como o plugin *Aviso de Cópia*, módulos Odoo, automações n8n e aplicações PHP/Python), suas competências técnicas e facilitando o contato direto com clientes e recrutadores.

---

## 🛠️ 2. Arquitetura Técnica & Escolha de Tecnologias

Para garantir performance máxima (nota 100 no Google PageSpeed/Lighthouse), zero dependências quebráveis e custo zero perpétuo:

| Camada | Tecnologia Escolhida | Justificativa |
| :--- | :--- | :--- |
| **Hospedagem & CDN** | **GitHub Pages** | Gratuito, alta disponibilidade da Microsoft, CDN global rápida, SSL automático. |
| **Estrutura** | **HTML5 Semântico** | Otimização total para SEO, acessibilidade (A11y) e facilidade de leitura. |
| **Estilização** | **Vanilla CSS Moderno** | Design System limpo com CSS Variables, Grid/Flexbox, suporte nativo a Dark/Light Mode. |
| **Interatividade** | **Vanilla JS (ES6+)** | Micro-animações suaves, filtros de projetos dinâmicos e formulário assíncrono. |
| **Formulário de Contato** | **Formspree / Web3Forms** | Envio de mensagens diretamente para seu e-mail sem precisar de backend PHP pago. |

---

## 📐 3. Estrutura e Seções do Portfólio

```
mailsonm.github.io/
├── index.html              # Estrutura principal semântica (SEO completo)
├── assets/
│   ├── css/
│   │   └── style.css       # Design System, variáveis de tema, responsividade
│   ├── js/
│   │   └── main.js         # Menu mobile, animações, filtro de projetos, dark mode
│   └── img/
│       ├── profile.webp    # Sua foto de perfil profissional otimizada
│       ├── favicon.svg     # Ícone do site
│       └── projects/       # Screenshots e capas dos projetos
├── .github/
│   └── workflows/ci.yml   # Validação de código e deploy automático
└── README.md               # Documentação do portfólio
```

### Seções Planejadas na Página:

1. **Hero / Apresentação de Impacto:**
   * Título: *Mailson Maia Alves* — Consultor de TI & Desenvolvedor Full Stack.
   * Proposta de valor: Especialista em soluções robustas, ERP (Odoo 19/Python), Backend PHP/WordPress, Frontend moderno e automações eficientes (n8n/CLI).
   * Botões de Ação rápida: *Ver Projetos*, *Baixar Currículo*, *Entrar em Contato*.

2. **Sobre & Metodologia de Trabalho:**
   * Resumo profissional focado em entregas reais, boas práticas de engenharia de software (TDD-First, Clean Code, SOLID) e segurança.

3. **Matriz de Especialidades (Tech Stack):**
   * **Backend & ERP:** PHP 8.3+, WordPress Plugin Dev, Python 3.12, Odoo 19.
   * **Frontend:** JavaScript Moderno, TypeScript, Vue.js, CSS responsivo.
   * **DevOps & Automação:** Docker, PowerShell / Bash, n8n.io, Git/GitHub CI.
   * **Game Dev:** Godot Engine (GDScript / C#).

4. **Projetos em Destaque (Showcase Dinâmico):**
   * **Aviso de Cópia:** Plugin WordPress com link direto para o repositório, badges de versão, estatísticas e documentação trilíngue.
   * **Módulos Odoo & Python:** Exemplos de regras de negócio e integrações ERP.
   * **Automações & APIs:** Fluxos n8n e scripts de alta produtividade.
   * *(Cada card terá: Descrição, Tags de Tecnologia, Botão GitHub e Live Demo se aplicável)*.

5. **Experiências & Serviços Oferecidos:**
   * Consultoria de TI, Desenvolvimento Sob Medida, Manutenção de Sistemas, Otimização de Performance e Integrações de APIs.

6. **Contato & Redes Sociais:**
   * Formulário de contato funcional (nome, e-mail, mensagem) com envio direto para o seu e-mail.
   * Links diretos para seu **GitHub** (`github.com/mailsonm`), **LinkedIn** e **WhatsApp**.

---

## 🚀 4. Passo a Passo de Implementação (Quando Formos Iniciar)

### Etapa 1: Criação do Repositório Especial no GitHub
* Criar o repositório público com o nome exato: `mailsonm.github.io`.
* Quando o repositório tem esse nome, o GitHub ativa automaticamente o site na raiz do seu usuário (`https://mailsonm.github.io`).

### Etapa 2: Desenvolvimento do Código Local
* Criar a estrutura em um workspace limpo com `index.html`, `style.css` e `main.js`.
* Implementar tema escuro/claro (*Dark/Light Mode*) respeitando a preferência do sistema do usuário com toggle manual.
* Configurar metatags OpenGraph para que o link fique com visual profissional ao ser compartilhado no WhatsApp, LinkedIn e Twitter.

### Etapa 3: Integração do Formulário de Contato Gratuito
* Integrar com o endpoint do **Formspree** ou **Web3Forms** (plano gratuito que envia até 50/250 mensagens por mês diretamente para o seu e-mail sem precisar de servidor backend).

### Etapa 4: Publicação e Ativação do GitHub Pages
* Fazer commit e push na branch `main`.
* Ativar a opção **Enforce HTTPS** nas configurações do repositório no GitHub para garantir cadeado de segurança verde.

### Etapa 5 (Opcional para o Futuro): Vincular Domínio Próprio
* Se no futuro você reativar o domínio `mailsondev.com.br`, bastará apontar os registros DNS (CNAME) para o GitHub Pages sem precisar pagar nenhuma hospedagem mensal!

---

## 📌 Checklist de Prontidão

- [x] Repositório `aviso-de-copia` atualizado com link do perfil do GitHub.
- [x] Plano do Portfólio estruturado e salvo na pasta Documentos.
- [ ] Criar repositório `mailsonm.github.io` no GitHub.
- [ ] Implementar design responsivo e seções de projetos.
- [ ] Ativar deploy contínuo no GitHub Pages.

---
*Documento gerado e salvo em Documentos para consulta e execução futura.*
