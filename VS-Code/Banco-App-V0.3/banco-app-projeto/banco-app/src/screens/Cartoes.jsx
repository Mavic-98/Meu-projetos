// ============================================================
//  src/screens/Cartoes.jsx
//  Tela de gerenciamento de cartões
// ============================================================

import { useState } from "react";
import { formatBRL } from "../utils/formatters";
import { colors, s } from "../styles/theme";

const cartoesIniciais = [
  {
    id: 1,
    tipo: "Crédito",
    bandeira: "Visa",
    final: "4821",
    validade: "08/27",
    limite: 5000,
    usado: 1340.90,
    ativo: true,
    cor: ["#1A2540", "#24344F"],
  },
  {
    id: 2,
    tipo: "Débito",
    bandeira: "Mastercard",
    final: "7733",
    validade: "03/26",
    limite: null,
    usado: null,
    ativo: true,
    cor: ["#1E2430", "#2A1A35"],
  },
];

/**
 * @param {{ onBack: () => void }} props
 */
export function Cartoes({ onBack }) {
  const [cartoes, setCartoes] = useState(cartoesIniciais);
  const [selecionado, setSelecionado] = useState(null);

  function toggleAtivo(id) {
    setCartoes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ativo: !c.ativo } : c))
    );
  }

  // Se um cartão estiver selecionado, mostra o detalhe
  if (selecionado !== null) {
    const cartao = cartoes.find((c) => c.id === selecionado);
    return (
      <DetalheCartao
        cartao={cartao}
        onBack={() => setSelecionado(null)}
        onToggle={() => toggleAtivo(cartao.id)}
      />
    );
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
        <div style={{ fontWeight: 800, fontSize: 20 }}>Meus Cartões</div>
      </div>

      {/* Lista de cartões */}
      {cartoes.map((cartao) => (
        <div key={cartao.id}>
          {/* Cartão visual */}
          <div
            onClick={() => setSelecionado(cartao.id)}
            style={{
              borderRadius: 20,
              padding: "22px 24px",
              marginBottom: 14,
              cursor: "pointer",
              background: `linear-gradient(135deg, ${cartao.cor[0]}, ${cartao.cor[1]})`,
              border: `1px solid ${colors.border}`,
              opacity: cartao.ativo ? 1 : 0.5,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Círculos decorativos */}
            <div style={{ position: "absolute", right: -20, top: -20, width: 100, height: 100, borderRadius: "50%", background: "#ffffff08" }} />
            <div style={{ position: "absolute", right: 20, bottom: -30, width: 140, height: 140, borderRadius: "50%", background: "#ffffff05" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 12, color: colors.muted }}>NovoBanco {cartao.tipo}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: colors.gold }}>{cartao.bandeira}</div>
              </div>
              <div style={{ fontSize: 28 }}>💳</div>
            </div>

            <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: 3, marginBottom: 14, color: colors.text }}>
              •••• •••• •••• {cartao.final}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ fontSize: 10, color: colors.muted }}>VALIDADE</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{cartao.validade}</div>
              </div>
              {!cartao.ativo && (
                <div style={{ background: colors.red + "33", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: colors.red, fontWeight: 600 }}>
                  BLOQUEADO
                </div>
              )}
            </div>
          </div>

          {/* Barra de limite (só para crédito) */}
          {cartao.tipo === "Crédito" && cartao.ativo && (
            <div style={{ ...s.card, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: colors.muted }}>Limite utilizado</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: colors.gold }}>
                  {formatBRL(cartao.usado)} / {formatBRL(cartao.limite)}
                </span>
              </div>
              <div style={{ height: 6, background: "#242D40", borderRadius: 99, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${Math.round((cartao.usado / cartao.limite) * 100)}%`,
                  background: `linear-gradient(90deg, ${colors.gold}, ${colors.goldDark})`,
                  borderRadius: 99,
                }} />
              </div>
              <div style={{ fontSize: 11, color: colors.subtle, marginTop: 6 }}>
                {formatBRL(cartao.limite - cartao.usado)} disponível
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Botão adicionar cartão */}
      <button
        style={{ ...s.btnGhost, marginTop: 4 }}
        onClick={() => {}}
      >
        + Adicionar cartão
      </button>
    </div>
  );
}

// ── Tela de detalhe do cartão ─────────────────────────────────
function DetalheCartao({ cartao, onBack, onToggle }) {
  const opcoes = [
    { icon: "🔒", label: cartao.ativo ? "Bloquear cartão" : "Desbloquear cartão", action: onToggle, danger: cartao.ativo },
    { icon: "💸", label: "Limite e faturas",   action: () => {} },
    { icon: "🌍", label: "Usar no exterior",   action: () => {} },
    { icon: "📳", label: "Compras por aproximação", action: () => {} },
    { icon: "❌", label: "Cancelar cartão",    action: () => {}, danger: true },
  ];

  return (
    <div style={{ padding: "20px 18px 80px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: colors.gold, padding: 0 }}
        >
          ‹
        </button>
        <div style={{ fontWeight: 800, fontSize: 20 }}>Detalhes do Cartão</div>
      </div>

      {/* Mini card */}
      <div style={{
        borderRadius: 20, padding: "22px 24px", marginBottom: 24,
        background: `linear-gradient(135deg, ${cartao.cor[0]}, ${cartao.cor[1]})`,
        border: `1px solid ${colors.border}`,
        opacity: cartao.ativo ? 1 : 0.5,
      }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: colors.gold, marginBottom: 16 }}>
          {cartao.bandeira} {cartao.tipo}
        </div>
        <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: 3, marginBottom: 12 }}>
          •••• •••• •••• {cartao.final}
        </div>
        <div style={{ fontSize: 13, color: colors.muted }}>Validade: {cartao.validade}</div>
      </div>

      {/* Opções */}
      {opcoes.map((op, i) => (
        <div
          key={i}
          onClick={op.action}
          style={{ ...s.cardFlat, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
        >
          <span style={{ fontSize: 20 }}>{op.icon}</span>
          <span style={{ flex: 1, fontSize: 15, color: op.danger ? colors.red : colors.text }}>{op.label}</span>
          <span style={{ color: colors.subtle, fontSize: 18 }}>›</span>
        </div>
      ))}
    </div>
  );
}
