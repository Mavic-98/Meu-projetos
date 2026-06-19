// ============================================================
//  src/components/Navbar.jsx
//  Barra de navegação inferior (bottom navigation)
// ============================================================

import { s } from "../styles/theme";

const TABS = [
  { id: "inicio",     icon: "🏠", label: "Início"  },
  { id: "extrato",    icon: "📋", label: "Extrato"  },
  { id: "transferir", icon: "⚡", label: "Pix"      },
  { id: "ajustes",    icon: "👤", label: "Perfil"   },
];

/**
 * @param {{ activeTab: string, onTabChange: (id: string) => void }} props
 */
export function Navbar({ activeTab, onTabChange }) {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 420,
        background: "#181E2B",
        borderTop: "1px solid #2A3448",
        display: "flex",
      }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          style={s.navItem(activeTab === tab.id)}
          onClick={() => onTabChange(tab.id)}
        >
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
