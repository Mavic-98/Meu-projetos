# ProjetoNoite_Marcelo

> Estrutura de diretórios do projeto.

---

## Estrutura

```
├── docs
│   ├── DER.txt
│   └── README.md
├── python
│   ├── main.py
│   ├── modelos
│   │   ├── emprestimo.py
│   │   ├── equipamento.py
│   │   ├── __init__.py
│   │   └── usuario.py
│   ├── persistencia
│   │   ├── emprestimo_repo.py
│   │   ├── equipamento_repo.py
│   │   ├── __init__.py
│   │   ├── usuario_repo.py
│   │   └── usuario_repo.py.bkp
│   ├── servicos
│   │   ├── emprestimo_service.py
│   │   ├── equipamento_servide.py
│   │   ├── __init__.py
│   │   └── usuario_service.py
│   └── utils
│       ├── helpers.py
│       ├── __init__.py
│       └── validador.py
└── web
    ├── config
    │   └── conexao.php
    ├── controllers
    │   ├── EmprestimoController.php
    │   ├── EquipamentoController.php
    │   └── UsuarioController.php
    ├── index.php
    ├── models
    │   ├── Emprestimo.php
    │   ├── Equipamento.php
    │   └── Usuario.php
    └── views
        └── index.php
```

---

## Descrição dos diretórios

- docs: documentação e diagramas.
- python: aplicação backend em Python.
  - modelos: definições de entidades.
  - persistencia: repositórios e acesso a dados.
  - servicos: lógica de negócios.
  - utils: utilitários e validadores.
- web: aplicação frontend em PHP.
  - config: configuração de conexão.
  - controllers: controladores MVC.
  - models: classes de modelo.
  - views: interface de usuário.
