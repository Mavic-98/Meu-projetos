import React from 'react';
import { useTransacoes } from '../hooks/useTransacoes';
import { useConta } from '../context/ContaContext';
import ItemTransacao from '../components/ItemTransacao';
import { formatarMoeda } from '../utils/formatadores';

// ============================================================
// pages/Atividades.tsx — Tela de extrato e resumo financeiro
// Usa hook personalizado useTransacoes para lógica de negócio
// ============================================================

const MESES_VISIVEIS = ['05', '06', '07', '08', '09', '10'];

const Atividades: React.FC = () => {
  const { estado } = useConta();
  const {
    transacoesFiltradas,
    totalDebitos,
    totalCreditos,
    mesSelecionado,
    setMesSelecionado,
    nomeMes,
  } = useTransacoes();

  // Percentual do gráfico: débitos em relação ao saldo total
  const percentualDebito = estado.saldo > 0
    ? Math.min((totalDebitos / (totalDebitos + totalCreditos)) * 100, 100)
    : 50;

  return (
    <div className="pagina pagina-atividades">
      {/* Cabeçalho */}
      <div className="cabecalho-pagina">
        <h2 className="titulo-pagina">ATIVIDADES</h2>
        <span className="saudacao">Olá, {estado.nome.split(' ')[0]} 👋</span>
      </div>

      {/* Gráfico de saldo */}
      <div className="grafico-saldo">
        <div
          className="circulo-externo"
          style={{
            background: `conic-gradient(
              #ef4444 0% ${percentualDebito}%,
              #22c55e ${percentualDebito}% 100%
            )`,
          }}
        >
          <div className="circulo-interno">
            <span className="label-saldo">Saldo</span>
            <span className="valor-saldo">{formatarMoeda(estado.saldo)}</span>
          </div>
        </div>

        {/* Legenda */}
        <div className="legenda-grafico">
          <div className="legenda-item">
            <span className="dot vermelho" />
            <span>Saídas: {formatarMoeda(totalDebitos)}</span>
          </div>
          <div className="legenda-item">
            <span className="dot verde" />
            <span>Entradas: {formatarMoeda(totalCreditos)}</span>
          </div>
        </div>
      </div>

      {/* Filtro de meses */}
      <div className="filtro-meses">
        {MESES_VISIVEIS.map(m => (
          <button
            key={m}
            className={`mes-btn ${mesSelecionado === m ? 'ativo' : ''}`}
            onClick={() => setMesSelecionado(m)}
            aria-pressed={mesSelecionado === m}
          >
            {nomeMes(m)}
          </button>
        ))}
      </div>

      {/* Lista de transações */}
      <div className="lista-transacoes">
        <h3 className="subtitulo-secao">
          Transações — {nomeMes(mesSelecionado)}
        </h3>
        {transacoesFiltradas.length === 0 ? (
          <p className="sem-transacoes">
            Nenhuma transação neste mês.
          </p>
        ) : (
          transacoesFiltradas.map(t => (
            <ItemTransacao key={t.id} transacao={t} />
          ))
        )}
      </div>
    </div>
  );
};

export default Atividades;
