// ============================================================
//  src/components/Toast.jsx
//  Notificação flutuante temporária (feedback ao usuário)
// ============================================================

import { colors } from "../styles/theme";

/**
 * @param {{ toast: { msg: string, type: "success"|"error" } | null }} props
 */
export function Toast({ toast }) {
  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        background: isError ? "#3A1E1E" : "#1E3A2A",
        color: isError ? colors.red : colors.green,
        border: `1px solid ${isError ? colors.red + "44" : colors.green + "44"}`,
        padding: "10px 22px",
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 600,
        zIndex: 999,
        whiteSpace: "nowrap",
        boxShadow: "0 4px 24px #00000066",
      }}
    >
      {toast.msg}
    </div>
  );
}
