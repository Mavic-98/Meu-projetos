// ============================================================
//  src/screens/Login.jsx
//  Tela de autenticação do usuário
// ============================================================

import { useState } from "react";
import { demoCredentials } from "../data/mockData";
import { s } from "../styles/theme";

/**
 * @param {{ onSuccess: () => void }} props
 */
export function Login({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  function handleLogin() {
    if (
      username === demoCredentials.username &&
      password === demoCredentials.password
    ) {
      setError("");
      onSuccess();
    } else {
      setError(`Usuário ou senha incorretos. (${demoCredentials.username} / ${demoCredentials.password})`);
    }
  }

  return (
    <div
      style={{
        ...s.app,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "40px 28px",
      }}
    >
      {/* Cabeçalho / logo */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏦</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#E8C87A", letterSpacing: -1 }}>
          NovoBanco
        </div>
        <div style={{ fontSize: 13, color: "#5A6478", marginTop: 4 }}>
          Bem-vindo(a) de volta
        </div>
      </div>

      {/* Formulário */}
      <div style={s.card}>
        <label style={s.label}>Usuário</label>
        <input
          style={{ ...s.input, marginBottom: 16 }}
          placeholder="Usário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label style={s.label}>Senha</label>
        <input
          style={{ ...s.input, marginBottom: 20 }}
          placeholder="••••"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        {error && (
          <div style={{ color: "#E87A7A", fontSize: 13, marginBottom: 14, textAlign: "center" }}>
            {error}
          </div>
        )}

        <button style={s.btnPrimary} onClick={handleLogin}>
          Entrar
        </button>

        <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "#5A6478" }}>
          Acesso de demonstração:{" "}
          <b style={{ color: "#C8A96E" }}>{demoCredentials.username}</b> /{" "}
          <b style={{ color: "#C8A96E" }}>{demoCredentials.password}</b>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <span style={{ fontSize: 13, color: "#E8C87A", cursor: "pointer" }}>
          Esqueci minha senha
        </span>
      </div>
    </div>
  );
}
