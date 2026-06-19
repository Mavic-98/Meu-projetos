import { useState, useMemo } from 'react';
import { Transacao, Mes } from '../types';
import { useConta } from '../context/ContaContext';

// ============================================================
// hooks/useTransacoes.ts — Hook personalizado
// Encapsula lógica de filtragem e agregação de transações
// ============================================================

const MESES_PT: Record<string, Mes> = {
  '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr',
  '05': 'Mai', '06': 'Jun', '07': 'Jul', '08': 'Ago',
  '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez',
};

export function useTransacoes() {
  const { estado } = useConta();
  const [mesSelecionado, setMesSelecionado] = useState<string>('07');

  // useMemo evita recalcular quando não há mudanças relevantes
  const transacoesFiltradas = useMemo((): Transacao[] => {
    return estado.transacoes.filter(t => {
      const mes = t.data.split('-')[1];
      return mes === mesSelecionado;
    });
  }, [estado.transacoes, mesSelecionado]);

  const totalDebitos = useMemo((): number => {
    return transacoesFiltradas
      .filter(t => t.valor < 0)
      .reduce((acc, t) => acc + Math.abs(t.valor), 0);
  }, [transacoesFiltradas]);

  const totalCreditos = useMemo((): number => {
    return transacoesFiltradas
      .filter(t => t.valor > 0)
      .reduce((acc, t) => acc + t.valor, 0);
  }, [transacoesFiltradas]);

  // Agrupa transações por categoria
  const porCategoria = useMemo(() => {
    const mapa: Record<string, { total: number; icone: string }> = {};
    transacoesFiltradas.forEach(t => {
      if (!mapa[t.categoria]) {
        mapa[t.categoria] = { total: 0, icone: t.icone };
      }
      mapa[t.categoria].total += t.valor;
    });
    return mapa;
  }, [transacoesFiltradas]);

  const mesesDisponiveis = ['01', '02', '03', '04', '05', '06',
                            '07', '08', '09', '10', '11', '12'];

  return {
    transacoesFiltradas,
    totalDebitos,
    totalCreditos,
    porCategoria,
    mesSelecionado,
    setMesSelecionado,
    nomeMes: (m: string) => MESES_PT[m] ?? m,
    mesesDisponiveis,
  };
}
