// ============================================================
//  src/screens/Inicio.jsx
//  Tela principal — saldo, atalhos e últimas transações
// ============================================================

import { Avatar }  from "../components/Avatar";
import { formatBRL, progressPercent } from "../utils/formatters";
import { categoryIcons } from "../data/mockData";
import { s, colors } from "../styles/theme";

const SHORTCUTS = [
  { icon: "⬆",  label: "Transferir", tab: "transferir" },
  { icon: "⬇",  label: "Receber",    tab: "receber"    },
  { icon: "📄", label: "Extrato",    tab: "extrato"    },
  { icon: "💳", label: "Cartões",    tab: "cartoes"    },
];

/**
 * @param {{
 *   user:         object,
 *   balance:      number,
 *   savings:      number,
 *   savingsGoal:  number,
 *   transactions: Array,
 *   showBalance:  boolean,
 *   onToggleBalance: () => void,
 *   onTabChange:  (tab: string) => void,
 * }} props
 */
export function Inicio({
  user, balance, savings, savingsGoal,
  showBalance, onToggleBalance, transactions, onTabChange,
}) {
  const pct = progressPercent(savings, savingsGoal);

  return (
    <div style={{ padding: "20px 18px 80px" }}>

      {/* Saudação */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 13, color: colors.muted }}>Olá, 👋</div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{user.name.split(" ")[0]}</div>
        </div>
        <Avatar name={user.name} size={44} />
      </div>

      {/* Card de saldo */}
      <div style={{ ...s.card, background: "linear-gradient(135deg, #1A2540, #24344F)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "#E8C87A11" }} />
        <div style={{ fontSize: 12, color: colors.muted, marginBottom: 4 }}>Saldo disponível</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: colors.gold }}>
            {showBalance ? formatBRL(balance) : "R$ ••••••"}
          </div>
          <button onClick={onToggleBalance} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: colors.muted }}>
            {showBalance ? "🙈" : "👁"}
          </button>
        </div>
        <div style={{ fontSize: 12, color: colors.subtle }}>
          Ag. {user.agency} • Cc. {user.account}
        </div>
      </div>

      {/* Atalhos rápidos */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {SHORTCUTS.map((item) => (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            style={{ ...s.cardFlat, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "18px 0" }}
          >
            <span style={{ fontSize: 24, color: colors.gold }}>{item.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Últimas movimentações */}
      <div style={s.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontWeight: 700 }}>Últimas movimentações</span>
          <span style={{ color: colors.gold, fontSize: 12, cursor: "pointer" }} onClick={() => onTabChange("extrato")}>
            Ver todas
          </span>
        </div>

        {transactions.slice(0, 4).map((tx) => (
          <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: `1px solid ${colors.border}` }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "#242D40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              {categoryIcons[tx.category] || "📌"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{tx.desc}</div>
              <div style={{ fontSize: 11, color: colors.subtle }}>{tx.date}</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: tx.amount > 0 ? colors.green : colors.red }}>
              {tx.amount > 0 ? "+" : ""}{formatBRL(tx.amount)}
            </div>
          </div>
        ))}
      </div>

      {/* Poupança */}
      <div style={s.card}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>💰 Poupança</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: colors.green, marginBottom: 4 }}>
          {showBalance ? formatBRL(savings) : "R$ ••••••"}
        </div>
        <div style={{ height: 6, background: "#242D40", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #7AE8A0, #4AC878)", borderRadius: 99 }} />
        </div>
        <div style={{ ...s.muted, marginTop: 6 }}>{pct}% da meta anual atingida</div>
      </div>
    </div>
  );
}