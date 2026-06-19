// ============================================================
//  src/data/mockData.js
//  Dados fictícios que simulam uma resposta de API bancária
// ============================================================

export const userData = {
  name: "Ana Souza",
  cpf: "***.***.***-42",
  agency: "0042",
  account: "12345-6",
  email: "ana.souza@novobanco.com.br",
};

export const initialBalance = {
  checking: 8450.75,
  savings: 3200.0,
  savingsGoal: 5000.0,
};

export const initialTransactions = [
  { id: 1, type: "credit", desc: "Salário",                    date: "20/05/2025", amount:  4500.00, category: "salario"    },
  { id: 2, type: "debit",  desc: "Supermercado Pão de Açúcar", date: "19/05/2025", amount:  -320.50, category: "compras"    },
  { id: 3, type: "credit", desc: "Pix recebido — Carlos M.",   date: "18/05/2025", amount:   150.00, category: "pix"        },
  { id: 4, type: "debit",  desc: "Netflix",                    date: "17/05/2025", amount:   -39.90, category: "assinatura" },
  { id: 5, type: "debit",  desc: "Farmácia São João",          date: "16/05/2025", amount:   -87.30, category: "saude"      },
  { id: 6, type: "credit", desc: "Cashback iFood",             date: "15/05/2025", amount:    12.80, category: "cashback"   },
  { id: 7, type: "debit",  desc: "Posto Shell — Combustível",  date: "14/05/2025", amount:  -210.00, category: "transporte" },
  { id: 8, type: "debit",  desc: "Academia SmartFit",          date: "13/05/2025", amount:   -99.90, category: "saude"      },
];

export const contacts = [
  { id: 1, name: "Carlos Mendes",  bank: "Itaú",     key: "carlos@email.com"       },
  { id: 2, name: "Fernanda Lima",  bank: "Nubank",   key: "fernanda.lima@cpf"      },
  { id: 3, name: "Roberto Silva",  bank: "Bradesco", key: "(11) 98765-4321"         },
  { id: 4, name: "Juliana Costa",  bank: "BTG",      key: "juliana@email.com"       },
];

export const categoryIcons = {
  salario:    "💼",
  compras:    "🛒",
  pix:        "⚡",
  assinatura: "📺",
  saude:      "❤️",
  cashback:   "🎁",
  transporte: "⛽",
  outros:     "📌",
};

// Credenciais de demonstração (nunca use em produção!)
export const demoCredentials = {
  username: "ana",
  password: "1234",
};
