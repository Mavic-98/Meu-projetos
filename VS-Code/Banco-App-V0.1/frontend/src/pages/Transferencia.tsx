import React, { useState, FormEvent } from 'react';
import { useConta } from '../context/ContaContext';
import { gerarId } from '../utils/formatadores';
import { Transacao } from '../types';

// ============================================================
// pages/Transferencia.tsx — Nova tela: formulário de transferência
// Demonstra: validação de formulário, useState, manipulação de eventos
// ============================================================

interface ErrosFormulario {
  destinatario?: string;
  valor?: string;
}

const Transferencia: React.FC = () => {
  const { estado, adicionarTransacao } = useConta();

  // Estado do formulário
  const [destinatario, setDestinatario] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erros, setErros] = useState<ErrosFormulario>({});
  const [sucesso, setSucesso] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // Validação dos campos
  const validar = (): boolean => {
    const novosErros: ErrosFormulario = {};

    if (!destinatario.trim()) {
      novosErros.destinatario = 'Informe o nome do destinatário.';
    }

    const valorNum = parseFloat(valor.replace(',', '.'));
    if (!valor || isNaN(valorNum) || valorNum <= 0) {
      novosErros.valor = 'Informe um valor válido maior que zero.';
    } else if (valorNum > estado.saldo) {
      novosErros.valor = 'Saldo insuficiente para esta transferência.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Submissão do formulário
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    setEnviando(true);

    // Simula latência de rede (200ms)
    setTimeout(() => {
      const novaTransacao: Transacao = {
        id: gerarId(),
        descricao: descricao || `Transferência para ${destinatario}`,
        valor: -parseFloat(valor.replace(',', '.')),
        categoria: 'outros',
        data: new Date().toISOString().split('T')[0],
        icone: '↗️',
      };

      adicionarTransacao(novaTransacao);
      setSucesso(true);
      setEnviando(false);

      // Resetar formulário após 2 segundos
      setTimeout(() => {
        setSucesso(false);
        setDestinatario('');
        setValor('');
        setDescricao('');
      }, 2500);
    }, 200);
  };

  return (
    <div className="pagina pagina-transferencia">
      <div className="cabecalho-pagina">
        <h2 className="titulo-pagina">TRANSFERÊNCIA</h2>
      </div>

      {/* Saldo disponível */}
      <div className="saldo-disponivel">
        <span className="saldo-label">Saldo disponível</span>
        <span className="saldo-valor">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(estado.saldo)}
        </span>
      </div>

      {/* Feedback de sucesso */}
      {sucesso && (
        <div className="alerta-sucesso" role="alert">
          ✅ Transferência realizada com sucesso!
        </div>
      )}

      {/* Formulário */}
      <form className="formulario-transferencia" onSubmit={handleSubmit} noValidate>
        <div className="campo-form">
          <label htmlFor="destinatario">Destinatário *</label>
          <input
            id="destinatario"
            type="text"
            placeholder="Nome do destinatário"
            value={destinatario}
            onChange={e => setDestinatario(e.target.value)}
            aria-describedby={erros.destinatario ? 'erro-dest' : undefined}
            className={erros.destinatario ? 'input-erro' : ''}
          />
          {erros.destinatario && (
            <span id="erro-dest" className="mensagem-erro" role="alert">
              {erros.destinatario}
            </span>
          )}
        </div>

        <div className="campo-form">
          <label htmlFor="valor">Valor (R$) *</label>
          <input
            id="valor"
            type="number"
            placeholder="0,00"
            min="0.01"
            step="0.01"
            value={valor}
            onChange={e => setValor(e.target.value)}
            aria-describedby={erros.valor ? 'erro-valor' : undefined}
            className={erros.valor ? 'input-erro' : ''}
          />
          {erros.valor && (
            <span id="erro-valor" className="mensagem-erro" role="alert">
              {erros.valor}
            </span>
          )}
        </div>

        <div className="campo-form">
          <label htmlFor="descricao">Descrição (opcional)</label>
          <input
            id="descricao"
            type="text"
            placeholder="Ex: aluguel de agosto"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            maxLength={60}
          />
        </div>

        <button
          type="submit"
          className="btn-principal"
          disabled={enviando || sucesso}
        >
          {enviando ? 'Processando...' : 'TRANSFERIR'}
        </button>
      </form>
    </div>
  );
};

export default Transferencia;
