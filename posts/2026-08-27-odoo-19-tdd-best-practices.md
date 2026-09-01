---
title: Desenvolvimento Orientado a Testes no Odoo 19 com TransactionCase
slug: odoo-19-tdd-best-practices
date: '2026-08-27'
author: Mailson Maia Alves
tags:
  - Odoo
  - Python
  - TDD
  - ERP
lang: pt-BR
image: /assets/img/posts/thumb-odoo-19-tdd.webp
description: Guia avançado de como estruturar testes automatizados de integração no Odoo 19 utilizando TransactionCase, pytest e isolamento de banco no Windows e Docker.
published: true
---

# Desenvolvimento Orientado a Testes no Odoo 19 com TransactionCase

A metodologia **TDD-First (Test-Driven Development)** é indispensável para construir soluções corporativas confiáveis no ecossistema do **Odoo 19**. Regras fiscais, cálculos de impostos, fluxo de pedidos e permissões de acesso exigem validação contínua e sem margem para intuição.

Neste artigo, exploramos a anatomia completa de um caso de teste no Odoo 19, como isolar o ambiente com `TransactionCase` e como rodar suítes automatizadas via CLI no Windows com Docker Desktop.

---

## 🏛️ 1. A Estrutura de Testes no Módulo Odoo

No Odoo 19, todos os testes automatizados devem residir no diretório `tests/` dentro do módulo. Cada arquivo deve iniciar pelo prefixo `test_` para ser descoberto pelo test runner:

```text
meu_modulo/
├── models/
│   └── partner_custom.py
├── tests/
│   ├── __init__.py
│   └── test_partner_custom.py
├── __init__.py
└── __manifest__.py
```

No arquivo `tests/__init__.py`, importe seus módulos de teste:

```python
from . import test_partner_custom
```

---

## 🧪 2. Criando o Teste com `TransactionCase`

O `TransactionCase` cria uma transação de banco de dados isolada no `setUpClass` ou `setUp` e faz rollback automático ao final de cada teste, garantindo que nenhum dado de teste polua o ambiente:

```python
from odoo.tests.common import TransactionCase
from odoo.tests import tagged
from odoo.exceptions import ValidationError

@tagged('post_install', '-at_install', 'meu_modulo')
class TestPartnerCustom(TransactionCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        # Criação de dados de suporte compartilhados
        cls.company = cls.env.ref('base.main_company')
        cls.partner = cls.env['res.partner'].create({
            'name': 'Empresa Cliente Teste LTDA',
            'is_company': True,
            'email': 'cliente@teste.com.br',
        })

    def test_cnpj_validation_success(self):
        """ Valida se a formatação e validação de documento ocorrem com sucesso """
        self.partner.write({'vat': '12.345.678/0001-90'})
        self.assertEqual(self.partner.sanitized_vat, '12345678000190')

    def test_invalid_document_raises_validation_error(self):
        """ Garante que documentos inválidos disparem ValidationError """
        with self.assertRaises(ValidationError):
            self.partner.write({'vat': '000.000.000-00-INVALID'})
```

---

## 🚀 3. Executando os Testes via Linha de Comando

A execução pode ser disparada diretamente pelo terminal PowerShell no Windows:

```powershell
# Em ambiente containerizado (Docker Compose no Windows):
docker compose exec odoo odoo -c /etc/odoo/odoo.conf -d db_test --test-enable --stop-after-init -i meu_modulo

# Em ambiente Python nativo:
python odoo-bin -c odoo.conf -d db_test --test-enable --stop-after-init -i meu_modulo
```

### Principais Flags do CLI do Odoo:
- `--test-enable`: Ativa a execução da suíte de testes.
- `--stop-after-init`: Encerra o processo do servidor logo após a finalização dos testes (essencial para CI/CD).
- `-i <modulo>`: Garante que o módulo e suas dependências sejam carregados.
- `--test-tags`: Permite filtrar apenas testes com tags específicas (ex: `--test-tags=meu_modulo`).

---

## 💡 Conclusão

Aplicar testes automatizados no Odoo 19 economiza centenas de horas de suporte e homologação manual. Adotar o ciclo **Red-Green-Refactor** garante que cada funcionalidade entregue possua comprovação empírica de funcionamento antes de ir para produção.
