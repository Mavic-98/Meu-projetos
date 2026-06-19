// ============================================================
//  src/utils/formatters.js
//  Funções utilitárias de formatação reutilizáveis
// ============================================================

/**
 * Formata um número como moeda brasileira (BRL).
 * @param {number} value - Valor numérico a formatar.
 * @returns {string} Ex: "R$ 1.234,56"
 */
export function formatBRL(value) {
  return Math.abs(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Retorna as iniciais de um nome completo (máx. 2 letras).
 * @param {string} name - Nome completo.
 * @returns {string} Ex: "AS" para "Ana Souza"
 */
export function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

/**
 * Retorna a data atual formatada em pt-BR.
 * @returns {string} Ex: "22/05/2025"
 */
export function todayFormatted() {
  return new Date().toLocaleDateString("pt-BR");
}

/**
 * Calcula o percentual de um valor em relação a uma meta.
 * @param {number} current
 * @param {number} goal
 * @returns {number} 0-100
 */
export function progressPercent(current, goal) {
  return Math.min(Math.round((current / goal) * 100), 100);
}

/**
 * Verifica se um valor de transferência é válido.
 * @param {string} raw - Valor digitado pelo usuário.
 * @param {number} balance - Saldo disponível.
 * @returns {{ ok: boolean, amount: number, error: string|null }}
 */
export function validateTransfer(raw, balance) {
  const amount = parseFloat(raw.replace(",", "."));
  if (!amount || amount <= 0) return { ok: false, amount: 0, error: "Valor inválido" };
  if (amount > balance)       return { ok: false, amount, error: "Saldo insuficiente" };
  return { ok: true, amount, error: null };
}
