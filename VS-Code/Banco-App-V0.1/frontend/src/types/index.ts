// ============================================================
// types/index.ts — Definição de tipos TypeScript do projeto
// ============================================================

/** Representa uma transação financeira */
export interface Transacao {
  id: string;
  descricao: string;
  valor: number;       // negativo = débito, positivo = crédito
  categoria: Categoria;
  data: string;        // formato ISO 8601
  icone: string;
}

/** Categorias possíveis de transação */
export type Categoria =
  | 'supermercado'
  | 'compras'
  | 'saude'
  | 'lazer'
  | 'restaurante'
  | 'transporte'
  | 'outros';

/** Representa um cartão de crédito/débito */
export interface Cartao {
  id: string;
  numero: string;       // ex: "5213 6450 5408 7016"
  validade: string;     // ex: "07/26"
  cvv: string;
  bandeira: 'VISA' | 'MASTERCARD' | 'ELO';
  saldo: number;
  limite: number;
}

/** Estado global da conta do usuário */
export interface ContaState {
  nome: string;
  saldo: number;
  cartoes: Cartao[];
  transacoes: Transacao[];
}

/** Props para componentes que recebem valor monetário */
export interface ValorProps {
  valor: number;
  prefixo?: string;
}

/** Meses disponíveis para filtro */
export type Mes = 'Jan' | 'Fev' | 'Mar' | 'Abr' | 'Mai' | 'Jun' |
                  'Jul' | 'Ago' | 'Set' | 'Out' | 'Nov' | 'Dez';
