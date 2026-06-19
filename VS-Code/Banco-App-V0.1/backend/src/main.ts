import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

// ============================================================
// backend/src/main.ts — API REST com Express + TypeScript
// Rotas: GET /conta, GET /transacoes, POST /transacoes, GET /cartoes
// ============================================================

const app = express();
const PORT = process.env.PORT ?? 3001;

// --- Middlewares globais ---
app.use(cors());
app.use(express.json());

// Middleware de log de requisições
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// --- Dados mockados (simula banco de dados) ---
const conta = {
  id: '1',
  nome: 'Ana Lima',
  saldo: 3540.25,
};

const cartoes = [
  {
    id: '1',
    numero: '5213 6450 5408 7016',
    validade: '07/26',
    cvv: '725',
    bandeira: 'VISA',
    saldo: 3540.25,
    limite: 5000,
  },
];

const transacoes = [
  { id: '1', descricao: 'McDonalds', valor: -32.77, categoria: 'restaurante', data: '2024-07-15', icone: '🍔' },
  { id: '2', descricao: 'Hospital Familiar', valor: 124.68, categoria: 'saude', data: '2024-07-14', icone: '🏥' },
  { id: '3', descricao: 'Supermercado Extra', valor: -542.36, categoria: 'supermercado', data: '2024-07-12', icone: '🛒' },
  { id: '4', descricao: 'Loja de Roupas', valor: -175.20, categoria: 'compras', data: '2024-07-10', icone: '👕' },
];

// ============================================================
// ROTAS
// ============================================================

/** GET /conta — Retorna dados da conta */
app.get('/conta', (_req: Request, res: Response) => {
  res.json({ sucesso: true, dados: conta });
});

/** GET /cartoes — Retorna lista de cartões */
app.get('/cartoes', (_req: Request, res: Response) => {
  // Oculta CVV na resposta (segurança)
  const cartoesSeguro = cartoes.map(({ cvv: _, ...c }) => c);
  res.json({ sucesso: true, dados: cartoesSeguro });
});

/** GET /transacoes — Retorna transações, com filtro opcional por mês */
app.get('/transacoes', (req: Request, res: Response) => {
  const { mes } = req.query;

  let resultado = transacoes;

  if (mes && typeof mes === 'string') {
    resultado = transacoes.filter(t => t.data.split('-')[1] === mes);
  }

  res.json({ sucesso: true, total: resultado.length, dados: resultado });
});

/** POST /transacoes — Cria nova transação */
app.post('/transacoes', (req: Request, res: Response) => {
  const { descricao, valor, categoria, icone } = req.body;

  // Validação básica
  if (!descricao || valor === undefined || !categoria) {
    return res.status(400).json({
      sucesso: false,
      erro: 'Campos obrigatórios: descricao, valor, categoria',
    });
  }

  if (typeof valor !== 'number') {
    return res.status(400).json({
      sucesso: false,
      erro: 'O campo "valor" deve ser um número',
    });
  }

  const nova = {
    id: String(Date.now()),
    descricao,
    valor,
    categoria,
    icone: icone ?? '💸',
    data: new Date().toISOString().split('T')[0],
  };

  transacoes.unshift(nova);
  conta.saldo += valor;

  return res.status(201).json({ sucesso: true, dados: nova });
});

// Rota de health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Middleware de erros genérico
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ sucesso: false, erro: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
  console.log(`🏦 BancoApp API rodando em http://localhost:${PORT}`);
});

export default app;
