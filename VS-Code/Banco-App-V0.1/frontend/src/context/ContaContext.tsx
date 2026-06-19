import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ContaState, Transacao } from '../types';

// ============================================================
// context/ContaContext.tsx — Gerenciamento de estado global
// Usa o padrão Context API + useReducer (sem biblioteca externa)
// ============================================================

// --- Estado inicial com dados mockados ---
const estadoInicial: ContaState = {
  nome: 'Ana Lima',
  saldo: 3540.25,
  cartoes: [
    {
      id: '1',
      numero: '5213 6450 5408 7016',
      validade: '07/26',
      cvv: '725',
      bandeira: 'VISA',
      saldo: 3540.25,
      limite: 5000,
    },
  ],
  transacoes: [
    { id: '1', descricao: 'McDonalds', valor: -32.77, categoria: 'restaurante', data: '2024-07-15', icone: '🍔' },
    { id: '2', descricao: 'Hospital Familiar', valor: 124.68, categoria: 'saude', data: '2024-07-14', icone: '🏥' },
    { id: '3', descricao: 'Supermercado Extra', valor: -542.36, categoria: 'supermercado', data: '2024-07-12', icone: '🛒' },
    { id: '4', descricao: 'Loja de Roupas', valor: -175.20, categoria: 'compras', data: '2024-07-10', icone: '👕' },
    { id: '5', descricao: 'Uber', valor: -18.50, categoria: 'transporte', data: '2024-07-09', icone: '🚗' },
    { id: '6', descricao: 'Salário', valor: 4500.00, categoria: 'outros', data: '2024-07-05', icone: '💰' },
  ],
};

// --- Tipos das ações do reducer ---
type Acao =
  | { type: 'ADICIONAR_TRANSACAO'; payload: Transacao }
  | { type: 'ATUALIZAR_SALDO'; payload: number };

// --- Reducer puro: recebe estado + ação, retorna novo estado ---
function contaReducer(estado: ContaState, acao: Acao): ContaState {
  switch (acao.type) {
    case 'ADICIONAR_TRANSACAO':
      return {
        ...estado,
        transacoes: [acao.payload, ...estado.transacoes],
        saldo: estado.saldo + acao.payload.valor,
      };
    case 'ATUALIZAR_SALDO':
      return { ...estado, saldo: acao.payload };
    default:
      return estado;
  }
}

// --- Criação do contexto ---
interface ContaContextType {
  estado: ContaState;
  adicionarTransacao: (t: Transacao) => void;
}

const ContaContext = createContext<ContaContextType | undefined>(undefined);

// --- Provider que envolve o app ---
export const ContaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [estado, dispatch] = useReducer(contaReducer, estadoInicial);

  const adicionarTransacao = (t: Transacao) => {
    dispatch({ type: 'ADICIONAR_TRANSACAO', payload: t });
  };

  return (
    <ContaContext.Provider value={{ estado, adicionarTransacao }}>
      {children}
    </ContaContext.Provider>
  );
};

// --- Hook personalizado para consumir o contexto ---
export const useConta = (): ContaContextType => {
  const ctx = useContext(ContaContext);
  if (!ctx) throw new Error('useConta deve ser usado dentro de ContaProvider');
  return ctx;
};
