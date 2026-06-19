// ============================================================
// utils/formatadores.ts — Funções utilitárias puras
// Funções puras são fáceis de testar e reutilizar
// ============================================================

/**
 * Formata um número como moeda brasileira (BRL)
 * @param valor - Número a formatar
 * @returns String formatada, ex: "R$ 1.234,56"
 */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

/**
 * Formata uma data ISO para exibição
 * @param dataISO - String no formato "2024-07-15"
 * @returns String formatada, ex: "15/07/2024"
 */
export function formatarData(dataISO: string): string {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

/**
 * Mascara o número do cartão mostrando apenas os últimos 4 dígitos
 * @param numero - Número completo do cartão
 * @returns Ex: "**** **** **** 7016"
 */
export function mascaraCartao(numero: string): string {
  const grupos = numero.split(' ');
  return grupos
    .map((g, i) => (i < grupos.length - 1 ? '****' : g))
    .join(' ');
}

/**
 * Gera um ID único simples baseado em timestamp
 * @returns String ID
 */
export function gerarId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Calcula o total de débitos de uma lista de transações
 * @param transacoes - Lista de transações
 * @returns Total de saídas (valor positivo)
 */
export function calcularTotalDebitos(transacoes: { valor: number }[]): number {
  return transacoes
    .filter(t => t.valor < 0)
    .reduce((acc, t) => acc + Math.abs(t.valor), 0);
}

/**
 * Calcula o total de créditos de uma lista de transações
 * @param transacoes - Lista de transações
 * @returns Total de entradas
 */
export function calcularTotalCreditos(transacoes: { valor: number }[]): number {
  return transacoes
    .filter(t => t.valor > 0)
    .reduce((acc, t) => acc + t.valor, 0);
}
