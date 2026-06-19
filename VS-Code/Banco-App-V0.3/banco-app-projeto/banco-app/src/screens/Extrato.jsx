// ============================================================
//  src/screens/Extrato.jsx
//  Tela de extrato bancário completo com filtros de categoria
// ============================================================

import { useState }    from "react";
import { formatBRL }   from "../utils/formatters";
import { categoryIcons } from "../data/mockData";
import { s, colors }   from "../styles/theme";

const FILTERS = ["Todos", "Pix", "Compras", "Saúde", "Assinaturas"];

/**
 * @param {{ transactions: Array }} props
 */
export function Extrato({ transactions }) {
  const [activeFilter, setActiveFilter] = useState("Todos");

  return (
    <div style={{ padding: "20px 18px 80px" }}>
      <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>Extrato</div>
      <div style={{ ...s.muted, marginBottom: 18 }}>Maio de 2025</div>

      {/* Filtros por categoria */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, overflowX: "auto" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              background: activeFilter === f ? "#2A3448" : "#1E2637",
              border: `1px solid ${activeFilter === f ? colors.gold : colors.border}`,
              color: activeFilter === f ? colors.gold : colors.muted,
              borderRadius: 20,
              padding: "6px 14px",
              fontSize: 12,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Lista de transações */}
      <div style={s.card}>
        {transactions
        .filter(tx => activeFilter === "Todos" || tx.category === activeFilter.toLowerCase())
        .map((tx, i) => (
          <div
            key={tx.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 0",
              borderTop: i > 0 ? `1px solid ${colors.border}` : "none",
            }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "#242D40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
              {categoryIcons[tx.category] || "📌"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{tx.desc}</div>
              <div style={{ fontSize: 11, color: colors.subtle }}>{tx.date}</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: tx.amount > 0 ? colors.green : colors.red }}>
              {tx.amount > 0 ? "+" : ""}{formatBRL(tx.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
