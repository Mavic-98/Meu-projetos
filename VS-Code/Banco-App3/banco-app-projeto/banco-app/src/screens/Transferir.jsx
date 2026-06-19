// ============================================================
//  src/screens/Transferir.jsx
//  Fluxo de transferência Pix em múltiplos passos (steps)
// ============================================================

import { useState }        from "react";
import { Avatar }          from "../components/Avatar";
import { contacts }        from "../data/mockData";
import { formatBRL, validateTransfer } from "../utils/formatters";
import { s, colors }       from "../styles/theme";

/**
 * @param {{
 *   balance:   number,
 *   onSuccess: (amount: number, recipient: object) => void,
 *   onError:   (msg: string) => void,
 * }} props
 */
export function Transferir({ balance, onSuccess, onError }) {
  const [step, setStep]               = useState(1);   // 1 = escolher contato, 2 = confirmar
  const [contact, setContact]         = useState(null);
  const [pixKey, setPixKey]           = useState("");
  const [amount, setAmount]           = useState("");
  const [description, setDescription] = useState("");
  const [done, setDone]               = useState(false);

  function handleConfirm() {
    const { ok, amount: parsed, error } = validateTransfer(amount, balance);
    if (!ok) return onError(error);

    onSuccess(parsed, contact);
    setDone(true);

    // Reset após animação de sucesso
    setTimeout(() => {
      setDone(false); setStep(1); setContact(null);
      setPixKey(""); setAmount(""); setDescription("");
    }, 2200);
  }

  /* ── Tela de sucesso ── */
  if (done) return (
    <div style={{ padding: "80px 28px", textAlign: "center" }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: colors.green, marginBottom: 8 }}>Pix enviado!</div>
      <div style={{ color: colors.muted }}>Redirecionando...</div>
    </div>
  );

  /* ── Passo 1: selecionar destinatário ── */
  if (step === 1) return (
    <div style={{ padding: "20px 18px 80px" }}>
      <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>Transferir via Pix</div>
      <div style={{ ...s.muted, marginBottom: 20 }}>Escolha um contato ou insira a chave Pix</div>

      {/* Campo de chave Pix avulsa */}
      <div style={s.card}>
        <label style={s.label}>Chave Pix (CPF, e-mail, telefone)</label>
        <input
          style={{ ...s.input, marginBottom: 14 }}
          placeholder="Ex: joao@email.com"
          value={pixKey}
          onChange={(e) => setPixKey(e.target.value)}
        />
        {pixKey.length > 3 && (
          <button
            style={s.btnPrimary}
            onClick={() => { setContact({ name: pixKey, bank: "Chave informada" }); setStep(2); }}
          >
            Continuar
          </button>
        )}
      </div>

      {/* Contatos frequentes */}
      <div style={{ fontWeight: 700, marginBottom: 12 }}>Contatos frequentes</div>
      {contacts.map((c) => (
        <div
          key={c.id}
          onClick={() => { setContact(c); setStep(2); }}
          style={{ ...s.cardFlat, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
        >
          <Avatar name={c.name} size={40} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
            <div style={s.muted}>{c.bank} • {c.key}</div>
          </div>
          <span style={{ color: colors.subtle, fontSize: 20 }}>›</span>
        </div>
      ))}
    </div>
  );

  /* ── Passo 2: confirmar e enviar ── */
  return (
    <div style={{ padding: "20px 18px 80px" }}>
      <button onClick={() => setStep(1)} style={{ background: "none", border: "none", cursor: "pointer", color: colors.goldDark, fontSize: 14, marginBottom: 16, padding: 0 }}>
        ← Voltar
      </button>
      <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 16 }}>Confirmar transferência</div>

      {/* Destinatário */}
      <div style={{ ...s.card, display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <Avatar name={contact.name} size={44} />
        <div>
          <div style={{ fontWeight: 700 }}>{contact.name}</div>
          <div style={s.muted}>{contact.bank}</div>
        </div>
      </div>

      {/* Formulário de valor */}
      <div style={s.card}>
        <label style={s.label}>Valor</label>
        <input style={{ ...s.input, marginBottom: 14, fontSize: 20, fontWeight: 700 }} placeholder="R$ 0,00" value={amount} onChange={(e) => setAmount(e.target.value)} />

        <label style={s.label}>Descrição (opcional)</label>
        <input style={{ ...s.input, marginBottom: 18 }} placeholder="Ex: Almoço" value={description} onChange={(e) => setDescription(e.target.value)} />

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
          <span style={s.muted}>Saldo disponível</span>
          <span style={{ fontWeight: 700, color: colors.gold }}>{formatBRL(balance)}</span>
        </div>

        <button style={s.btnPrimary} onClick={handleConfirm}>Confirmar Pix ⚡</button>
        <button style={{ ...s.btnGhost, marginTop: 10 }} onClick={() => setStep(1)}>Cancelar</button>
      </div>
    </div>
  );
}
