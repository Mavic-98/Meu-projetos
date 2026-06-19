// ============================================================
//  src/App.jsx
//  Componente raiz — gerencia estado global e roteamento
// ============================================================

import { useState }      from "react";
import { Toast }         from "./components/Toast";
import { Navbar }        from "./components/Navbar";
import { Login }         from "./screens/Login";
import { Inicio }        from "./screens/Inicio";
import { Extrato }       from "./screens/Extrato";
import { Transferir }    from "./screens/Transferir";
import { Receber }       from "./screens/Receber";
import { Ajustes }       from "./screens/Ajustes";
import { useToast }      from "./hooks/useToast";
import { userData, initialBalance, initialTransactions } from "./data/mockData";
import { todayFormatted } from "./utils/formatters";
import { s }             from "./styles/theme";

export default function App() {
  // ── Estado de autenticação ────────────────────────────────
  const [screen, setScreen] = useState("login"); // "login" | "app"

  // ── Estado da conta ───────────────────────────────────────
  const [balance, setBalance]           = useState(initialBalance.checking);
  const [savings]                       = useState(initialBalance.savings);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showBalance, setShowBalance]   = useState(true);

  // ── Navegação entre abas ──────────────────────────────────
  const [activeTab, setActiveTab] = useState("inicio");
  const [subTelaAjustes, setSubTelaAjustes] = useState(null);

  // ── Sistema de notificações ───────────────────────────────
  const { toast, showToast } = useToast();

  // ── Handlers ──────────────────────────────────────────────
  function handleLogin() {
    setScreen("app");
    setActiveTab("inicio");
  }

  function handleLogout() {
    setScreen("login");
  }

  /**
   * Registra uma transferência: desconta o saldo e cria nova transação.
   * @param {number} amount
   * @param {{ name: string, bank: string }} recipient
   */
  function handleTransferSuccess(amount, recipient) {
    const newTx = {
      id:       Date.now(),
      type:     "debit",
      desc:     `Pix para ${recipient.name}`,
      date:     todayFormatted(),
      amount:   -amount,
      category: "pix",
    };
    setBalance((prev) => prev - amount);
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Pix de R$ ${amount.toFixed(2).replace(".", ",")} enviado!`);
  }

  function handleTransferError(msg) {
    showToast(msg, "error");
  }

  function handleCopyPixKey() {
    showToast("Chave Pix copiada!");
  }

  function handleTabChange(tab) {
    // "cartoes" abre Ajustes já na sub-tela de Cartões
    if (tab === "cartoes") {
      setActiveTab("ajustes");
      setSubTelaAjustes("cartoes");
    } else {
      setActiveTab(tab);
      setSubTelaAjustes(null);
    }
  }

  // ── Tela de login ─────────────────────────────────────────
  if (screen === "login") {
    return <Login onSuccess={handleLogin} />;
  }

  // ── Aplicativo ────────────────────────────────────────────
  return (
    <div style={s.app}>
      {/* Notificação global */}
      <Toast toast={toast} />

      {/* Conteúdo da aba ativa */}
      {activeTab === "inicio" && (
        <Inicio
          user={userData}
          balance={balance}
          savings={savings}
          savingsGoal={initialBalance.savingsGoal}
          transactions={transactions}
          showBalance={showBalance}
          onToggleBalance={() => setShowBalance((v) => !v)}
          onTabChange={handleTabChange}
        />
      )}

      {activeTab === "extrato" && (
        <Extrato transactions={transactions} />
      )}

      {activeTab === "transferir" && (
        <Transferir
          balance={balance}
          onSuccess={handleTransferSuccess}
          onError={handleTransferError}
        />
      )}

      {activeTab === "receber" && (
        <Receber onCopy={handleCopyPixKey} />
      )}

      {activeTab === "ajustes" && (
        <Ajustes user={userData} onLogout={handleLogout} subTelaInicial={subTelaAjustes} />
      )}

      {/* Barra de navegação fixa */}
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
