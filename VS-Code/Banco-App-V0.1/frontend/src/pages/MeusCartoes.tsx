import React, { useState } from 'react';
import { useConta } from '../context/ContaContext';
import ItemTransacao from '../components/ItemTransacao';
import { formatarMoeda, mascaraCartao } from '../utils/formatadores';

// ============================================================
// pages/MeusCartoes.tsx — Tela de cartões e transações
// ============================================================

const MeusCartoes: React.FC = () => {
  const { estado } = useConta();
  const [cvvVisivel, setCvvVisivel] = useState(false);
  const [cartaoSelecionado, setCartaoSelecionado] = useState(0);

  const cartao = estado.cartoes[cartaoSelecionado];
  if (!cartao) return null;

  // Percentual do limite utilizado
  const percentualLimite = ((cartao.limite - cartao.saldo) / cartao.limite) * 100;

  // Últimas transações do cartão (todas para simplificar)
  const ultimasTransacoes = estado.transacoes.slice(0, 4);

  return (
    <div className="pagina pagina-cartoes">
      <div className="cabecalho-pagina">
        <h2 className="titulo-pagina">MEUS CARTÕES</h2>
      </div>

      {/* Seletor de cartões (dots) */}
      <div className="seletor-cartoes">
        {estado.cartoes.map((_, i) => (
          <button
            key={i}
            className={`dot-cartao ${i === cartaoSelecionado ? 'ativo' : ''}`}
            onClick={() => setCartaoSelecionado(i)}
            aria-label={`Cartão ${i + 1}`}
          />
        ))}
      </div>

      {/* Cartão visual */}
      <div className={`cartao-visual bandeira-${cartao.bandeira.toLowerCase()}`}>
        <div className="cartao-topo">
          <span className="cartao-bandeira">{cartao.bandeira}</span>
          <span className="cartao-chip">▓▓</span>
        </div>
        <div className="cartao-numero">{mascaraCartao(cartao.numero)}</div>
        <div className="cartao-rodape">
          <div>
            <div className="cartao-label">TITULAR</div>
            <div className="cartao-dado">{estado.nome.toUpperCase()}</div>
          </div>
          <div>
            <div className="cartao-label">VALIDADE</div>
            <div className="cartao-dado">{cartao.validade}</div>
          </div>
        </div>
      </div>

      {/* Campos de detalhes */}
      <div className="detalhes-cartao">
        <div className="campo-detalhe">
          <label>Número Completo</label>
          <input type="text" value={cartao.numero} readOnly />
        </div>
        <div className="campos-linha">
          <div className="campo-detalhe">
            <label>Validade</label>
            <input type="text" value={cartao.validade} readOnly />
          </div>
          <div className="campo-detalhe">
            <label>CVV</label>
            <div className="input-com-botao">
              <input
                type={cvvVisivel ? 'text' : 'password'}
                value={cartao.cvv}
                readOnly
              />
              <button
                className="btn-visibilidade"
                onClick={() => setCvvVisivel(v => !v)}
                aria-label={cvvVisivel ? 'Ocultar CVV' : 'Mostrar CVV'}
              >
                {cvvVisivel ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
        </div>

        {/* Barra de limite */}
        <div className="limite-info">
          <div className="limite-topo">
            <span>Limite utilizado</span>
            <span>{formatarMoeda(cartao.limite - cartao.saldo)} de {formatarMoeda(cartao.limite)}</span>
          </div>
          <div className="barra-limite">
            <div
              className="barra-preenchida"
              style={{ width: `${percentualLimite}%` }}
            />
          </div>
        </div>
      </div>

      {/* Últimas transações */}
      <div className="lista-transacoes">
        <h3 className="subtitulo-secao">Últimas transações</h3>
        {ultimasTransacoes.map(t => (
          <ItemTransacao key={t.id} transacao={t} />
        ))}
      </div>
    </div>
  );
};

export default MeusCartoes;
