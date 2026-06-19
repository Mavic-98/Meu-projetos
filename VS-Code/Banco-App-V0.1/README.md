# 🏦 BancoApp — Projeto de Avaliação

Aplicação de banco digital desenvolvida como avaliação prática do curso de TI.  
Demonstra conceitos fundamentais de desenvolvimento web full-stack moderno.

---

## 📋 Objetivos de Aprendizagem

| Conceito | Onde aparece no código |
|---|---|
| **Componentes React** | `NavBar`, `ItemTransacao` |
| **Props e callbacks** | `Apresentacao` recebe `onComecaar` |
| **Estado (`useState`)** | `MeusCartoes` — CVV visível/oculto |
| **Contexto + `useReducer`** | `ContaContext` — estado global da conta |
| **Hooks personalizados** | `useTransacoes` — filtragem e agregação |
| **TypeScript** | Todos os arquivos `.ts` / `.tsx` |
| **Funções puras** | `utils/formatadores.ts` |
| **API REST com Express** | `backend/src/main.ts` |
| **Testes unitários** | `tests/formatadores.test.ts` |
| **Testes de integração** | `backend/tests/api.test.ts` |
| **Acessibilidade (a11y)** | `aria-label`, `aria-current`, `role="alert"` |

---

## 🗂️ Estrutura do Projeto

```
BancoApp-Avaliacao/
├── frontend/
│   ├── src/
│   │   ├── App.tsx               ← Raiz: roteamento por estado
│   │   ├── types/index.ts        ← Interfaces TypeScript
│   │   ├── context/
│   │   │   └── ContaContext.tsx  ← Estado global (Context + useReducer)
│   │   ├── hooks/
│   │   │   └── useTransacoes.ts  ← Hook personalizado
│   │   ├── utils/
│   │   │   └── formatadores.ts  ← Funções puras testáveis
│   │   ├── components/
│   │   │   ├── NavBar.tsx        ← Navegação inferior
│   │   │   └── ItemTransacao.tsx ← Card de transação
│   │   ├── pages/
│   │   │   ├── Apresentacao.tsx  ← Tela de boas-vindas
│   │   │   ├── Atividades.tsx    ← Extrato e gráfico
│   │   │   ├── MeusCartoes.tsx   ← Cartões e detalhes
│   │   │   └── Transferencia.tsx ← Formulário validado ✨ NOVO
│   │   └── styles/global.css    ← CSS com variáveis e BEM-like
│   ├── tests/
│   │   └── formatadores.test.ts ← Testes unitários
│   └── package.json
│
├── backend/
│   ├── src/
│   │   └── main.ts              ← API Express: 5 rotas REST
│   ├── tests/
│   │   └── api.test.ts          ← Testes de integração
│   └── package.json
│
└── README.md
```

---

## 🚀 Como executar

### Frontend
```bash
cd frontend
npm install
npm start          # http://localhost:3000
npm test           # executa testes com cobertura
```

### Backend
```bash
cd backend
npm install
npm run dev        # http://localhost:3001 (hot-reload)
npm test           # testes da API
```

---

## 🔌 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Health check da API |
| `GET` | `/conta` | Dados da conta |
| `GET` | `/cartoes` | Lista de cartões (sem CVV) |
| `GET` | `/transacoes` | Todas as transações |
| `GET` | `/transacoes?mes=07` | Transações filtradas por mês |
| `POST` | `/transacoes` | Cria nova transação |

### Exemplo — POST /transacoes
```json
// Requisição
{
  "descricao": "Farmácia",
  "valor": -45.00,
  "categoria": "saude",
  "icone": "💊"
}

// Resposta 201
{
  "sucesso": true,
  "dados": {
    "id": "1720000000000-abc123",
    "descricao": "Farmácia",
    "valor": -45.00,
    "categoria": "saude",
    "icone": "💊",
    "data": "2024-07-15"
  }
}
```

---

## 🧪 Testes implementados

### Unitários (`formatadores.test.ts`)
- `formatarMoeda()` — formatação BRL
- `formatarData()` — conversão ISO → dd/mm/aaaa
- `mascaraCartao()` — ocultação dos dígitos
- `gerarId()` — unicidade dos IDs
- `calcularTotalDebitos()` e `calcularTotalCreditos()`

### Integração (`api.test.ts`)
- Todos os endpoints: status code, estrutura da resposta
- Validação de erros 400
- Ocultação de dados sensíveis (CVV)

---

## 💡 Melhorias implementadas em relação ao original

1. **Arquitetura em camadas** — separação clara de responsabilidades
2. **TypeScript** — tipagem estática em todo o projeto  
3. **Context API + useReducer** — estado global sem biblioteca externa
4. **Hook personalizado** `useTransacoes` — lógica reutilizável
5. **Nova tela** `Transferencia` — formulário com validação em tempo real
6. **NavBar** com navegação funcional entre 3 telas
7. **Barra de limite** no cartão com preenchimento dinâmico
8. **CVV** com toggle de visibilidade
9. **Acessibilidade** — atributos ARIA, labels semânticos
10. **Testes unitários e de integração** — cobertura das funções críticas
11. **CSS organizado** com variáveis, sem repetição
12. **Backend documentado** — logs, middleware de erros, segurança (CVV oculto)

---

*Projeto desenvolvido para avaliação — Curso de TI*