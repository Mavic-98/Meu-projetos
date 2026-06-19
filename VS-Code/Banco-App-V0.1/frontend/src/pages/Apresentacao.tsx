import React from 'react';

// ============================================================
// pages/Apresentacao.tsx — Tela de boas-vindas
// Recebe callback via props para navegar (inversão de controle)
// ============================================================

interface ApresentacaoProps {
  onComecaar: () => void;
}

const Apresentacao: React.FC<ApresentacaoProps> = ({ onComecaar }) => {
  return (
    <div className="pagina pagina-apresentacao">
      {/* Área superior com ilustração */}
      <div className="apresentacao-hero">
        <div className="logo-banco">
          <span className="logo-icone">🏦</span>
          <span className="logo-texto">BancoApp</span>
        </div>
        <div className="ilustracao-wrapper">
          <div className="ilustracao-circulo">
            <span style={{ fontSize: 80 }}>💳</span>
          </div>
        </div>
      </div>

      {/* Conteúdo textual */}
      <div className="apresentacao-conteudo">
        <h1 className="apresentacao-titulo">
          O Futuro do<br />
          <span className="destaque">Banco Digital</span>
        </h1>
        <p className="apresentacao-descricao">
          Gerencie seu dinheiro de forma simples, segura e rápida.
          Tudo o que você precisa na palma da sua mão.
        </p>

        {/* Lista de benefícios */}
        <ul className="beneficios">
          <li>✅ Transferências instantâneas</li>
          <li>✅ Sem tarifas ocultas</li>
          <li>✅ Segurança de ponta a ponta</li>
        </ul>

        <button
          className="btn-principal"
          onClick={onComecaar}
          aria-label="Começar a usar o BancoApp"
        >
          COMEÇAR AGORA
        </button>
      </div>
    </div>
  );
};

export default Apresentacao;
