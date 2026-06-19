import React from 'react';

// ============================================================
// components/NavBar.tsx — Barra de navegação inferior
// Componente reutilizável e controlado pelo pai (App)
// ============================================================

type Pagina = 'atividades' | 'cartoes' | 'transferencia';

interface NavBarProps {
  paginaAtual: string;
  onNavegar: (p: Pagina) => void;
}

// Definição dos itens de navegação como dados (evita repetição)
const ITENS_NAV: { id: Pagina; label: string; icone: string }[] = [
  { id: 'atividades', label: 'Início', icone: '🏠' },
  { id: 'transferencia', label: 'Transferir', icone: '↔️' },
  { id: 'cartoes', label: 'Cartões', icone: '💳' },
];

const NavBar: React.FC<NavBarProps> = ({ paginaAtual, onNavegar }) => {
  return (
    <nav className="navbar">
      {ITENS_NAV.map(item => (
        <button
          key={item.id}
          className={`nav-item ${paginaAtual === item.id ? 'ativo' : ''}`}
          onClick={() => onNavegar(item.id)}
          aria-label={item.label}
          aria-current={paginaAtual === item.id ? 'page' : undefined}
        >
          <span className="nav-icone">{item.icone}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default NavBar;
