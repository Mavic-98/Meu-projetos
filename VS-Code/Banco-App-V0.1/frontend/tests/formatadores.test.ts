// ============================================================
// tests/formatadores.test.ts — Testes unitários com Jest
// Testa as funções puras do arquivo utils/formatadores.ts
// ============================================================

import {
  formatarMoeda,
  formatarData,
  mascaraCartao,
  gerarId,
  calcularTotalDebitos,
  calcularTotalCreditos,
} from '../src/utils/formatadores';

// --- Agrupamento de testes por função ---

describe('formatarMoeda()', () => {
  it('formata valor positivo em BRL', () => {
    expect(formatarMoeda(1234.56)).toBe('R$\u00a01.234,56');
  });

  it('formata zero corretamente', () => {
    expect(formatarMoeda(0)).toBe('R$\u00a00,00');
  });

  it('formata valor negativo', () => {
    expect(formatarMoeda(-100)).toContain('100');
  });
});

describe('formatarData()', () => {
  it('converte ISO para dd/mm/aaaa', () => {
    expect(formatarData('2024-07-15')).toBe('15/07/2024');
  });

  it('converte datas de janeiro corretamente', () => {
    expect(formatarData('2024-01-01')).toBe('01/01/2024');
  });
});

describe('mascaraCartao()', () => {
  it('oculta os primeiros grupos do cartão', () => {
    const resultado = mascaraCartao('5213 6450 5408 7016');
    expect(resultado).toBe('**** **** **** 7016');
  });

  it('preserva os últimos 4 dígitos', () => {
    const resultado = mascaraCartao('1234 5678 9012 3456');
    expect(resultado.endsWith('3456')).toBe(true);
  });
});

describe('gerarId()', () => {
  it('retorna uma string não vazia', () => {
    expect(gerarId()).toBeTruthy();
  });

  it('gera IDs únicos em chamadas consecutivas', () => {
    const id1 = gerarId();
    const id2 = gerarId();
    expect(id1).not.toBe(id2);
  });
});

describe('calcularTotalDebitos()', () => {
  const transacoes = [
    { valor: -100 },
    { valor: -50 },
    { valor: 200 },   // crédito: deve ser ignorado
  ];

  it('soma apenas valores negativos (retorna positivo)', () => {
    expect(calcularTotalDebitos(transacoes)).toBe(150);
  });

  it('retorna 0 quando não há débitos', () => {
    expect(calcularTotalDebitos([{ valor: 500 }])).toBe(0);
  });
});

describe('calcularTotalCreditos()', () => {
  const transacoes = [
    { valor: 300 },
    { valor: 200 },
    { valor: -100 },  // débito: deve ser ignorado
  ];

  it('soma apenas valores positivos', () => {
    expect(calcularTotalCreditos(transacoes)).toBe(500);
  });

  it('retorna 0 quando não há créditos', () => {
    expect(calcularTotalCreditos([{ valor: -50 }])).toBe(0);
  });
});
