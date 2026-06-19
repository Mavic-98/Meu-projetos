// ============================================================
//  src/screens/Receber.jsx
//  Tela para exibir chave Pix e QR Code do usuário
// ============================================================

import { userData } from "../data/mockData";
import { s, colors } from "../styles/theme";

/**
 * @param {{ onCopy: () => void }} props
 */
export function Receber({ onCopy }) {
  return (
    <div style={{ padding: "20px 18px 80px" }}>
      <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 16 }}>Receber via Pix</div>

      <div style={{ ...s.card, textAlign: "center" }}>
        {/* QR Code simulado com caracteres */}
        <div style={{ fontSize: 70, letterSpacing: 6, padding: "30px 0", background: "#0E1219", borderRadius: 12, marginBottom: 16, fontFamily: "monospace" }}>
          {["▓▓░▓▓░░▓", "░▓░░░▓░░", "▓▓▓░▓▓░▓", "░░▓▓░░▓▓", "▓░░▓▓░▓░"].map((row, i) => (
            <div key={i} style={{ letterSpacing: 4, fontSize: 16 }}>{row}</div>
          ))}
        </div>

        <div style={{ fontWeight: 700, marginBottom: 4 }}>Chave Pix (e-mail)</div>
        <div style={{ ...s.muted, marginBottom: 16 }}>{userData.email}</div>

        <button style={s.btnPrimary} onClick={onCopy}>
          📋 Copiar chave Pix
        </button>
      </div>

      <div style={{ ...s.card, marginTop: 8 }}>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>Dados bancários</div>
        {[
          ["Banco",    "NovoBanco (999)"],
          ["Agência",  userData.agency],
          ["Conta",    userData.account],
          ["Tipo",     "Conta Corrente"],
        ].map(([label, value]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: `1px solid ${colors.border}` }}>
            <span style={s.muted}>{label}</span>
            <span style={{ fontSize: 14, fontWeight: 500 }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
