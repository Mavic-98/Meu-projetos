import React, { useState } from 'react';
import './styles/global.css';
import { ContaProvider } from './context/ContaContext';
import Apresentacao from './pages/Apresentacao';
import Atividades from './pages/Atividades';
import MeusCartoes from './pages/MeusCartoes';
import Transferencia from './pages/Transferencia';
import NavBar from './components/NavBar';

// Tipo das páginas disponíveis
type Pagina = 'apresentacao' | 'atividades' | 'cartoes' | 'transferencia';

const App: React.FC = () => {
  const [paginaAtual, setPaginaAtual] = useState<Pagina>('apresentacao');

  // Renderiza a página de acordo com o estado atual
  const renderizarPagina = () => {
    switch (paginaAtual) {
      case 'apresentacao':
        return <Apresentacao onComecaar={() => setPaginaAtual('atividades')} />;
      case 'atividades':
        return <Atividades />;
      case 'cartoes':
        return <MeusCartoes />;
      case 'transferencia':
        return <Transferencia />;
      default:
        return <Apresentacao onComecaar={() => setPaginaAtual('atividades')} />;
    }
  };

  return (
    <ContaProvider>
      <div className="app-wrapper">
        <div className="tela">
          {renderizarPagina()}
          {paginaAtual !== 'apresentacao' && (
            <NavBar paginaAtual={paginaAtual} onNavegar={setPaginaAtual} />
          )}
        </div>
      </div>
    </ContaProvider>
  );
};

export default App;
