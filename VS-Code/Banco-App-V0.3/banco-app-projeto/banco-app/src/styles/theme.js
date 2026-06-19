// ============================================================
//  src/styles/theme.js
//  Tokens de design centralizados — cores, bordas, tipografia
// ============================================================

export const colors = {
  bg:       "#0E1219",
  surface:  "#181E2B",
  surface2: "#1E2637",
  border:   "#2A3448",
  gold:     "#E8C87A",
  goldDark: "#C8A96E",
  text:     "#F0EDE6",
  muted:    "#8A96AA",
  subtle:   "#5A6478",
  green:    "#7AE8A0",
  red:      "#E87A7A",
};

/** Estilos reutilizáveis como objetos inline do React */
export const s = {
  app: {
    background: colors.bg,
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
    color: colors.text,
    maxWidth: 420,
    margin: "0 auto",
  },

  card: {
    background: colors.surface,
    borderRadius: 18,
    padding: "16px 20px",
    marginBottom: 14,
  },

  cardFlat: {
    background: colors.surface2,
    borderRadius: 14,
    padding: "14px 16px",
    marginBottom: 10,
    border: `1px solid ${colors.border}`,
  },

  input: {
    width: "100%",
    background: colors.surface2,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    padding: "12px 14px",
    color: colors.text,
    fontSize: 15,
    boxSizing: "border-box",
    outline: "none",
  },

  label: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 6,
    display: "block",
  },

  btnPrimary: {
    background: `linear-gradient(135deg, ${colors.goldDark}, ${colors.gold})`,
    color: "#1A1F2E",
    border: "none",
    borderRadius: 12,
    padding: "14px 0",
    width: "100%",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
  },

  btnGhost: {
    background: "transparent",
    color: colors.goldDark,
    border: `1.5px solid ${colors.goldDark}44`,
    borderRadius: 12,
    padding: "12px 0",
    width: "100%",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
  },

  muted: {
    color: colors.muted,
    fontSize: 13,
  },

  /** Função — retorna o estilo do botão de nav conforme estado ativo */
  navItem: (active) => ({
    flex: 1,
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    color: active ? colors.gold : colors.subtle,
    fontSize: 10,
    padding: "10px 0",
    borderTop: active
      ? `2px solid ${colors.gold}`
      : "2px solid transparent",
    transition: "all 0.2s",
  }),
};
