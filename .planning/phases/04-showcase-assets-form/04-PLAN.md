# 📋 PLAN: Fase 4 - Showcase de Projetos, Assets Visuais & Formulário

**Fase:** 04-showcase-assets-form  
**Status:** Pronto para Execução  
**Metodologia:** TDD-First (Akita Way)  
**Autor:** Mailson Maia Alves <59203034+mailsonm@users.noreply.github.com>  

---

## 🎯 Objetivo
Produzir e vincular todos os assets visuais essenciais (`favicon.svg`, `profile.svg`), integrar o avatar profissional na seção Hero, refinar os dados e badges dos projetos e validar a integridade dos assets através de testes automatizados.

---

## 🧪 Declaração Nyquist & Matriz de Tarefas

### Tarefa 1: Criação de Assets Visuais (`favicon.svg`, `profile.svg`)
- **Descrição:** Criar favicon SVG moderno e avatar vetorizado profissional (`assets/img/profile.svg`), inserindo `<link rel="icon">` e imagem acessível de perfil no `index.html`.
- **Arquivo de Teste:** `tests/unit/assets-integrity.test.js`
- **Comando de Validação:** `npx vitest run tests/unit/assets-integrity.test.js`

### Tarefa 2: Refinamento de Estilização do Hero Avatar & Cards de Projeto
- **Descrição:** Ajustar estilos em `assets/css/style.css` para renderizar o avatar na Hero Section com efeito visual moderno (borda com brilho sutil e responsividade), e garantir que os cards de projetos exibam badges de status e documentação.
- **Arquivo de Teste:** `tests/unit/dom-structure.test.js`
- **Comando de Validação:** `npx vitest run tests/unit/dom-structure.test.js`

### Tarefa 3: Testes de Integridade de Assets no Disco (`assets-integrity.test.js`)
- **Descrição:** Escrever suíte de testes unitários que valida a existência física dos arquivos de imagem, integridade das tags `<link rel="icon">` e tags `<img>` com atributos `alt` e `width`/`height` explícitos (evitando CLS no Lighthouse).
- **Arquivo de Teste:** `tests/unit/assets-integrity.test.js`
- **Comando de Validação:** `npm run test`

---

## 🔍 Critérios de Aceite (UAT)
1. `favicon.svg` e `profile.svg` criados na pasta `assets/img/`.
2. `index.html` possui `<link rel="icon">` e exibe o avatar na seção Hero.
3. Teste de integridade de assets (`assets-integrity.test.js`) e todos os demais testes unitários passam com 100% de sucesso.
