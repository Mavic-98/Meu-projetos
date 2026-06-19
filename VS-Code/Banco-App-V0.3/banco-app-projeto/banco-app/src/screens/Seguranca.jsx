// ============================================================
//  src/screens/Seguranca.jsx
//  Tela de Segurança e Privacidade
// ============================================================

import { useState } from "react";
import { colors, s } from "../styles/theme";

/**
 * @param {{ onBack: () => void }} props
 */
export function Seguranca({ onBack }) {
  const [biometria, setBiometria]       = useState(true);
  const [notifLogin, setNotifLogin]     = useState(true);
  const [autenticacao, setAutenticacao] = useState(false);
  const [senhaAlterada, setSenhaAlterada] = useState(false);

  function handleAlterarSenha() {
    setSenhaAlterada(true);
    setTimeout(() => setSenhaAlterada(false), 3000);
  }

  return (
    <div style={{ padding: "20px 18px 80px" }}>

      {/* Cabeçalho */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: colors.gold, padding: 0 }}
        >
          ‹
        </button>
        <div style={{ fontWeight: 800, fontSize: 20 }}>Segurança e Privacidade</div>
      </div>

      {/* Seção: Acesso */}
      <div style={{ fontSize: 12, color: colors.muted, marginBottom: 8, paddingLeft: 4, letterSpacing: 1, textTransform: "uppercase" }}>
        Acesso
      </div>

      <div style={{ ...s.card, padding: "0 20px" }}>
        <Toggle
          icon="👆"
          label="Biometria / Face ID"
          desc="Use sua digital ou rosto para entrar"
          value={biometria}
          onChange={setBiometria}
        />
        <Toggle
          icon="🔐"
          label="Autenticação em dois fatores"
          desc="Confirme logins com código no celular"
          value={autenticacao}
          onChange={setAutenticacao}
          border
        />
      </div>

      {/* Seção: Senha */}
      <div style={{ fontSize: 12, color: colors.muted, marginBottom: 8, paddingLeft: 4, letterSpacing: 1, textTransform: "uppercase" }}>
        Senha
      </div>

      <div style={{ ...s.cardFlat, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={handleAlterarSenha}>
        <span style={{ fontSize: 20 }}>🔑</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15 }}>Alterar senha</div>
          <div style={{ fontSize: 12, color: colors.subtle }}>Última alteração: há 3 meses</div>
        </div>
        <span style={{ color: colors.subtle, fontSize: 18 }}>›</span>
      </div>

      {senhaAlterada && (
        <div style={{ background: "#7AE8A022", border: "1px solid #7AE8A044", borderRadius: 10, padding: "10px 14px", marginBottom: 10, fontSize: 13, color: colors.green }}>
          ✓ Link de alteração de senha enviado para o seu e-mail.
        </div>
      )}

      {/* Seção: Privacidade */}
      <div style={{ fontSize: 12, color: colors.muted, marginBottom: 8, marginTop: 6, paddingLeft: 4, letterSpacing: 1, textTransform: "uppercase" }}>
        Privacidade
      </div>

      <div style={{ ...s.card, padding: "0 20px" }}>
        <Toggle
          icon="🔔"
          label="Alertas de login"
          desc="Notificar quando sua conta for acessada"
          value={notifLogin}
          onChange={setNotifLogin}
        />
      </div>

      <div style={{ ...s.cardFlat, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
        <span style={{ fontSize: 20 }}>📋</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15 }}>Dispositivos conectados</div>
          <div style={{ fontSize: 12, color: colors.subtle }}>2 dispositivos ativos</div>
        </div>
        <span style={{ color: colors.subtle, fontSize: 18 }}>›</span>
      </div>

      <div style={{ ...s.cardFlat, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
        <span style={{ fontSize: 20 }}>🗑️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, color: colors.red }}>Excluir minha conta</div>
          <div style={{ fontSize: 12, color: colors.subtle }}>Esta ação é permanente</div>
        </div>
        <span style={{ color: colors.subtle, fontSize: 18 }}>›</span>
      </div>

    </div>
  );
}

// ── Componente interno: Toggle ────────────────────────────────
function Toggle({ icon, label, desc, value, onChange, border }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "16px 0",
      borderTop: border ? `1px solid ${colors.border}` : "none",
    }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15 }}>{label}</div>
        <div style={{ fontSize: 12, color: colors.subtle }}>{desc}</div>
      </div>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: 46, height: 26, borderRadius: 99, cursor: "pointer",
          background: value ? colors.gold : colors.border,
          position: "relative", transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        <div style={{
          position: "absolute", top: 3,
          left: value ? 23 : 3,
          width: 20, height: 20, borderRadius: "50%",
          background: value ? "#1A1F2E" : colors.muted,
          transition: "left 0.2s",
        }} />
      </div>
    </div>
  );
}
