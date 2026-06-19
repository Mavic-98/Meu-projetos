// ============================================================
// tests/api.test.ts — Testes de integração da API REST
// Usa supertest para simular requisições HTTP reais
// ============================================================

import request from 'supertest';
import app from '../backend/src/main';

describe('GET /health', () => {
  it('retorna status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /conta', () => {
  it('retorna os dados da conta', async () => {
    const res = await request(app).get('/conta');
    expect(res.status).toBe(200);
    expect(res.body.sucesso).toBe(true);
    expect(res.body.dados).toHaveProperty('nome');
    expect(res.body.dados).toHaveProperty('saldo');
  });
});

describe('GET /cartoes', () => {
  it('retorna a lista de cartões sem CVV', async () => {
    const res = await request(app).get('/cartoes');
    expect(res.status).toBe(200);
    expect(res.body.sucesso).toBe(true);
    expect(Array.isArray(res.body.dados)).toBe(true);
    // CVV não deve ser exposto
    expect(res.body.dados[0]).not.toHaveProperty('cvv');
  });
});

describe('GET /transacoes', () => {
  it('retorna todas as transações sem filtro', async () => {
    const res = await request(app).get('/transacoes');
    expect(res.status).toBe(200);
    expect(res.body.sucesso).toBe(true);
    expect(typeof res.body.total).toBe('number');
  });

  it('filtra transações pelo mês', async () => {
    const res = await request(app).get('/transacoes?mes=07');
    expect(res.status).toBe(200);
    res.body.dados.forEach((t: { data: string }) => {
      expect(t.data.split('-')[1]).toBe('07');
    });
  });
});

describe('POST /transacoes', () => {
  it('cria uma nova transação com dados válidos', async () => {
    const res = await request(app)
      .post('/transacoes')
      .send({ descricao: 'Farmácia', valor: -45.00, categoria: 'saude', icone: '💊' });

    expect(res.status).toBe(201);
    expect(res.body.sucesso).toBe(true);
    expect(res.body.dados.descricao).toBe('Farmácia');
  });

  it('retorna 400 quando faltam campos obrigatórios', async () => {
    const res = await request(app)
      .post('/transacoes')
      .send({ descricao: 'Sem valor' }); // falta valor e categoria

    expect(res.status).toBe(400);
    expect(res.body.sucesso).toBe(false);
    expect(res.body.erro).toBeTruthy();
  });

  it('retorna 400 quando valor não é número', async () => {
    const res = await request(app)
      .post('/transacoes')
      .send({ descricao: 'Teste', valor: 'abc', categoria: 'outros' });

    expect(res.status).toBe(400);
  });
});
