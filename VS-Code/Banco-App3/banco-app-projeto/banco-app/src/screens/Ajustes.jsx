// ============================================================
//  src/screens/Ajustes.jsx
//  Tela de configurações e perfil do usuário
// ============================================================

import { useState }   from "react";
import { Avatar }     from "../components/Avatar";
import { Seguranca }  from "./Seguranca";
import { Cartoes }    from "./Cartoes";
import { Suporte }    from "./Suporte";
import { colors, s } from "../styles/theme";

const MENU_ITEMS = [
  { icon: "🔔", label: "Notificações",           tela: null         },
  { icon: "🔒", label: "Segurança e Privacidade", tela: "seguranca"  },
  { icon: "💳", label: "Cartões",                 tela: "cartoes"    },
  { icon: "📞", label: "Suporte",                 tela: "suporte"    },
  { icon: "📝", label: "Termos e Condições",      tela: null         },
];

/**
 * @param {{ user: object, onLogout: () => void, subTelaInicial?: string }} props
 */
export function Ajustes({ user, onLogout, subTelaInicial = null }) {
  const [telaAtiva, setTelaAtiva] = useState(subTelaInicial);

  // ── Sub-telas ──────────────────────────────────────────────
  if (telaAtiva === "seguranca") {
    return <Seguranca onBack={() => setTelaAtiva(null)} />;
  }
  if (telaAtiva === "cartoes") {
    return <Cartoes onBack={() => setTelaAtiva(null)} />;
  }
  if (telaAtiva === "suporte") {
    return <Suporte onBack={() => setTelaAtiva(null)} />;
  }

  // ── Menu principal ─────────────────────────────────────────
  return (
    <div style={{ padding: "20px 18px 80px" }}>
      <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 20 }}>Minha conta</div>

      {/* Card do perfil */}
      <div style={{ ...s.card, display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <Avatar name={user.name} size={56} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{user.name}</div>
          <div style={s.muted}>CPF: {user.cpf}</div>
          <div style={s.muted}>Ag. {user.agency} • Cc. {user.account}</div>
        </div>
      </div>

      {/* Menu de opções */}
      {MENU_ITEMS.map((item) => (
        <div
          key={item.label}
          onClick={() => item.tela && setTelaAtiva(item.tela)}
          style={{
            ...s.cardFlat,
            display: "flex", alignItems: "center", gap: 12,
            cursor: item.tela ? "pointer" : "default",
            opacity: item.tela ? 1 : 0.5,
          }}
        >
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          <span style={{ flex: 1, fontSize: 15 }}>{item.label}</span>
          <span style={{ color: colors.subtle, fontSize: 18 }}>›</span>
        </div>
      ))}

      {/* Botão de logout */}
      <button
        style={{ ...s.btnGhost, marginTop: 20, color: colors.red, borderColor: colors.red + "44" }}
        onClick={onLogout}
      >
        Sair da conta
      </button>
    </div>
  );
}
