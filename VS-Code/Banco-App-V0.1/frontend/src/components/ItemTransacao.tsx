import React from 'react';
import { Transacao } from '../types';
import { formatarMoeda, formatarData } from '../utils/formatadores';

// ============================================================
// components/ItemTransacao.tsx — Card de transação individual
// Componente de apresentação (sem estado próprio)
// ============================================================

interface ItemTransacaoProps {
  transacao: Transacao;
}

const ItemTransacao: React.FC<ItemTransacaoProps> = ({ transacao }) => {
  const isDebito = transacao.valor < 0;

  return (
    <div className="item-transacao">
      <div className="transacao-icone">{transacao.icone}</div>
      <div className="transacao-info">
        <span className="transacao-descricao">{transacao.descricao}</span>
        <span className="transacao-data">{formatarData(transacao.data)}</span>
      </div>
      <span className={`transacao-valor ${isDebito ? 'negativo' : 'positivo'}`}>
        {isDebito ? '' : '+'}
        {formatarMoeda(transacao.valor)}
      </span>
    </div>
  );
};

export default ItemTransacao;
