// ============================================================
//  src/hooks/useToast.js
//  Hook personalizado para notificações temporárias (toasts)
// ============================================================

import { useState, useCallback } from "react";

/**
 * Gerencia um sistema simples de notificações toast.
 *
 * @returns {{ toast, showToast }}
 *   toast      → { msg: string, type: "success"|"error" } | null
 *   showToast  → (msg, type?, duration?) => void
 */
export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type = "success", duration = 2800) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), duration);
  }, []);

  return { toast, showToast };
}
