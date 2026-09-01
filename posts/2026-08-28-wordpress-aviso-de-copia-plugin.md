---
title: Arquitetura e Segurança no Desenvolvimento de Plugins WordPress
slug: wordpress-aviso-de-copia-plugin
date: '2026-08-28'
author: Mailson Maia Alves
tags:
  - WordPress
  - PHP
  - Segurança
  - Open Source
lang: pt-BR
image: /assets/img/posts/thumb-wordpress-seguranca-plugins.webp
description: Como desenvolvemos o plugin Aviso de Cópia seguindo os padrões WordPress VIP, PSR-12, sanitização estrita e proteção de conteúdo.
published: true
---

# Arquitetura e Segurança no Desenvolvimento de Plugins WordPress

O ecossistema **WordPress** move mais de 40% da web global. No entanto, a grande maioria dos incidentes de segurança decorre de plugins mal arquitetados, ausência de sanitização ou injeção insegura de scripts no DOM.

Ao projetar o plugin **Aviso de Cópia (Copy Notice)**, o foco foi atingir conformidade estrita com os padrões do **WordPress VIP**, **PSR-12** e testes automatizados com **Pest PHP**.

---

## 🛡️ 1. Princípios de Segurança e Sanitização

Nenhum dado vindo de formulários de administração ou requisições AJAX pode ser persistido sem validação e sanitização estrita:

```php
<?php
declare(strict_types=1);

namespace MailsonM\CopyNotice\Admin;

final class SettingsController
{
    public function sanitizeSettings(array $input): array
    {
        $sanitized = [];

        if (isset($input['notice_text'])) {
            $sanitized['notice_text'] = sanitize_text_field((string) $input['notice_text']);
        }

        if (isset($input['enable_attribution'])) {
            $sanitized['enable_attribution'] = (bool) $input['enable_attribution'];
        }

        if (isset($input['background_color'])) {
            $sanitized['background_color'] = sanitize_hex_color((string) $input['background_color']) ?: '#172445';
        }

        return $sanitized;
    }
}
```

---

## ⚡ 2. Frontend Leve e Desacoplado (Zero jQuery)

Em vez de sobrecarregar a página com dependências pesadas de bibliotecas antigas como jQuery, o listener de eventos no navegador utiliza **Vanilla JS moderno** com captura segura de evento de clipboard:

```javascript
document.addEventListener('copy', (event) => {
  const selection = window.getSelection()?.toString();
  if (!selection || selection.trim().length === 0) return;

  const attribution = `\n\nFonte: ${window.location.href} (Conteúdo protegido)`;
  const modifiedText = selection + attribution;

  if (event.clipboardData) {
    event.clipboardData.setData('text/plain', modifiedText);
    event.preventDefault();
  }
});
```

---

## 🧪 3. Testes Automatizados com Pest PHP

Para certificar que o ciclo de vida e os hooks do WordPress executem corretamente:

```php
<?php

use MailsonM\CopyNotice\Admin\SettingsController;

it('sanitizes malicious script tags from notice text', function () {
    $controller = new SettingsController();
    $input = [
        'notice_text' => '<script>alert("XSS")</script>Texto Protegido',
        'background_color' => '#38bdf8'
    ];

    $result = $controller->sanitizeSettings($input);

    expect($result['notice_text'])->toBe('Texto Protegido');
    expect($result['background_color'])->toBe('#38bdf8');
});
```

---

## 🚀 Conclusão

Criar plugins profissionais para WordPress exige a mesma disciplina de engenharia de software aplicada a microsserviços modernos: padrões PSR, tipagem estrita no PHP 8.3+, sanitização em camadas e cobertura com testes automatizados.
