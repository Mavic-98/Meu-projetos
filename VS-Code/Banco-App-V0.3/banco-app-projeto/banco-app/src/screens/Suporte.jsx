// ============================================================
//  src/screens/Suporte.jsx
//  Tela de Suporte — chatbot com React ChatBotify
//  Docs: https://react-chatbotify.com
// ============================================================

import { useState } from "react";
import ChatBot from "react-chatbotify";
import { colors, s } from "../styles/theme";

// ── Perguntas frequentes (accordion) ───────────────────────
const FAQS = [
  {
    pergunta: "Como faço um Pix?",
    resposta:
      "Acesse a aba 'Transferir', escolha um contato ou insira a chave Pix, informe o valor e confirme.",
  },
  {
    pergunta: "Meu cartão foi bloqueado. O que fazer?",
    resposta:
      "Acesse 'Ajustes › Cartões', selecione o cartão e toque em 'Desbloquear cartão'. Se o problema persistir, entre em contato pelo chat.",
  },
  {
    pergunta: "Como altero minha senha?",
    resposta:
      "Vá em 'Ajustes › Segurança e Privacidade › Alterar senha'. Um link será enviado para o seu e-mail cadastrado.",
  },
  {
    pergunta: "O app está com erro. Como reportar?",
    resposta:
      "Use o chat abaixo para falar com o assistente ou descreva o erro no formulário de contato. Nossa equipe responde em até 24h.",
  },
];

// ── Fluxo de conversa do ChatBotify ────────────────────────
//  Cada chave é um "estado" da conversa.
//  message  → o que o bot fala
//  options  → botões de resposta rápida
//  path     → próximo estado (string ou função)
//  component → JSX customizado no balão
// ──────────────────────────────────────────────────────────
const flow = {
  // ── Início ──────────────────────────────────────────────
  start: {
    message: "Olá! 👋 Sou o assistente virtual do NovoBanco.\nComo posso te ajudar hoje?",
    options: ["💰 Pix / Transferências", "💳 Cartões", "🔒 Segurança", "📊 Extrato", "❓ Outro assunto"],
    path: (params) => {
      const opt = params.userInput;
      if (opt.includes("Pix"))       return "pix_menu";
      if (opt.includes("Cartões"))   return "cartoes_menu";
      if (opt.includes("Segurança")) return "seguranca_menu";
      if (opt.includes("Extrato"))   return "extrato_menu";
      return "outro";
    },
  },

  // ── Pix / Transferências ────────────────────────────────
  pix_menu: {
    message: "Sobre Pix e transferências, o que você precisa?",
    options: ["Como fazer um Pix?", "Pix não está sendo enviado", "Limite do Pix", "⬅ Voltar ao início"],
    path: (params) => {
      const opt = params.userInput;
      if (opt.includes("Como fazer"))   return "pix_como";
      if (opt.includes("não está"))     return "pix_erro";
      if (opt.includes("Limite"))       return "pix_limite";
      return "start";
    },
  },
  pix_como: {
    message:
      "Para fazer um Pix:\n\n1️⃣ Toque em 'Transferir' no menu inferior\n2️⃣ Escolha um contato ou insira a chave Pix\n3️⃣ Digite o valor e confirme com sua senha\n\nO Pix é processado em poucos segundos! ⚡",
    options: ["Preciso de mais ajuda", "✅ Entendi, obrigado!"],
    path: (params) =>
      params.userInput.includes("mais ajuda") ? "contato_humano" : "encerrar",
  },
  pix_erro: {
    message:
      "Pix com problema? Vamos resolver! Verifique:\n\n• A chave Pix digitada está correta?\n• Você tem saldo suficiente?\n• Seu app está atualizado?\n\nSe o erro persistir, posso abrir um chamado para você.",
    options: ["Abrir chamado", "✅ Problema resolvido"],
    path: (params) =>
      params.userInput.includes("chamado") ? "abrir_chamado" : "encerrar",
  },
  pix_limite: {
    message:
      "Os limites padrão do Pix são:\n\n🌞 Diurno (6h–20h): R$ 5.000,00\n🌙 Noturno (20h–6h): R$ 1.000,00\n\nVocê pode alterar seus limites em:\nAjustes › Segurança e Privacidade › Limites Pix.",
    options: ["Como alterar o limite?", "⬅ Voltar ao início"],
    path: (params) =>
      params.userInput.includes("alterar") ? "limite_alterar" : "start",
  },
  limite_alterar: {
    message:
      "Para alterar seu limite Pix:\n\n1️⃣ Acesse Ajustes (ícone 👤)\n2️⃣ Toque em 'Segurança e Privacidade'\n3️⃣ Selecione 'Limites Pix'\n4️⃣ Ajuste os valores e confirme com a senha\n\n⚠️ Aumentos de limite podem levar até 24h para ativar.",
    options: ["✅ Entendi!", "Preciso de mais ajuda"],
    path: (params) =>
      params.userInput.includes("mais ajuda") ? "contato_humano" : "encerrar",
  },

  // ── Cartões ─────────────────────────────────────────────
  cartoes_menu: {
    message: "O que você precisa sobre seu cartão?",
    options: ["Desbloquear cartão", "Bloquear cartão", "Segunda via", "⬅ Voltar ao início"],
    path: (params) => {
      const opt = params.userInput;
      if (opt.includes("Desbloquear")) return "cartao_desbloquear";
      if (opt.includes("Bloquear"))    return "cartao_bloquear";
      if (opt.includes("Segunda"))     return "cartao_segunda_via";
      return "start";
    },
  },
  cartao_desbloquear: {
    message:
      "Para desbloquear seu cartão:\n\n1️⃣ Acesse Ajustes › Cartões\n2️⃣ Selecione o cartão bloqueado\n3️⃣ Toque em 'Desbloquear cartão'\n4️⃣ Confirme com sua senha\n\nSeu cartão estará ativo em instantes! 💳",
    options: ["✅ Consegui!", "Não consigo desbloquear"],
    path: (params) =>
      params.userInput.includes("Não") ? "contato_humano" : "encerrar",
  },
  cartao_bloquear: {
    message:
      "Para bloquear seu cartão imediatamente:\n\n1️⃣ Acesse Ajustes › Cartões\n2️⃣ Selecione o cartão\n3️⃣ Toque em 'Bloquear cartão'\n\n⚠️ Em caso de roubo ou perda, ligue agora para:\n📞 0800 740 4848 (24h)",
    options: ["✅ Cartão bloqueado", "Falar com atendente agora"],
    path: (params) =>
      params.userInput.includes("atendente") ? "contato_humano" : "encerrar",
  },
  cartao_segunda_via: {
    message:
      "Para solicitar a 2ª via do cartão:\n\n1️⃣ Acesse Ajustes › Cartões\n2️⃣ Toque em 'Solicitar 2ª via'\n3️⃣ Confirme seu endereço de entrega\n\nPrazo de entrega: 7 a 10 dias úteis.\nTaxa: isenta para clientes Gold e Premium.",
    options: ["✅ Entendi!", "⬅ Voltar ao início"],
    path: (params) =>
      params.userInput.includes("Voltar") ? "start" : "encerrar",
  },

  // ── Segurança ───────────────────────────────────────────
  seguranca_menu: {
    message: "Sobre segurança, o que você precisa?",
    options: ["Alterar senha", "Ativar autenticação em 2 etapas", "Suspeita de fraude", "⬅ Voltar"],
    path: (params) => {
      const opt = params.userInput;
      if (opt.includes("senha"))           return "seguranca_senha";
      if (opt.includes("2 etapas"))        return "seguranca_2fa";
      if (opt.includes("fraude"))          return "seguranca_fraude";
      return "start";
    },
  },
  seguranca_senha: {
    message:
      "Para alterar sua senha:\n\n1️⃣ Ajustes › Segurança e Privacidade\n2️⃣ Toque em 'Alterar senha'\n3️⃣ Um link será enviado para seu e-mail cadastrado\n4️⃣ Siga as instruções no e-mail\n\n🔒 Nunca compartilhe sua senha com ninguém!",
    options: ["✅ Entendi!", "Não recebi o e-mail"],
    path: (params) =>
      params.userInput.includes("recebi") ? "contato_humano" : "encerrar",
  },
  seguranca_2fa: {
    message:
      "A autenticação em 2 etapas adiciona uma camada extra de segurança:\n\n1️⃣ Ajustes › Segurança e Privacidade\n2️⃣ Ative 'Verificação em 2 etapas'\n3️⃣ Escolha: SMS ou aplicativo autenticador\n\n✅ Recomendamos ativar para proteger sua conta!",
    options: ["✅ Vou ativar!", "⬅ Voltar"],
    path: (params) =>
      params.userInput.includes("Voltar") ? "start" : "encerrar",
  },
  seguranca_fraude: {
    message:
      "⚠️ Suspeita de fraude? Aja imediatamente:\n\n1. Bloqueie seu cartão em Ajustes › Cartões\n2. Altere sua senha agora\n3. Ligue para nossa central:\n📞 0800 740 4848 (24h, gratuito)\n\nNossa equipe irá investigar e estornar transações não reconhecidas.",
    options: ["Ligar agora (0800 740 4848)", "✅ Já fiz os passos"],
    path: () => "encerrar",
  },

  // ── Extrato ─────────────────────────────────────────────
  extrato_menu: {
    message: "Sobre seu extrato, o que precisa?",
    options: ["Ver extrato completo", "Transação não reconhecida", "Comprovante de transferência", "⬅ Voltar"],
    path: (params) => {
      const opt = params.userInput;
      if (opt.includes("completo"))        return "extrato_ver";
      if (opt.includes("reconhecida"))     return "extrato_fraude";
      if (opt.includes("Comprovante"))     return "extrato_comprovante";
      return "start";
    },
  },
  extrato_ver: {
    message:
      "Para ver seu extrato completo:\n\n1️⃣ Toque em 'Extrato' no menu inferior (ícone 📋)\n2️⃣ Use os filtros por categoria para organizar\n3️⃣ Toque em qualquer transação para ver os detalhes\n\nVocê pode filtrar por: Pix, Compras, Saúde, Assinaturas e mais!",
    options: ["✅ Entendi!", "⬅ Voltar ao início"],
    path: (params) =>
      params.userInput.includes("Voltar") ? "start" : "encerrar",
  },
  extrato_fraude: {
    message:
      "Transação não reconhecida? Vamos verificar!\n\nAntes de tudo:\n• Verifique se um familiar pode ter feito a compra\n• Confira o nome da loja (às vezes aparece diferente)\n\nSe confirmar que é fraude, abrimos uma contestação agora.",
    options: ["Confirmar contestação", "Era uma compra minha"],
    path: (params) =>
      params.userInput.includes("contestação") ? "abrir_chamado" : "encerrar",
  },
  extrato_comprovante: {
    message:
      "Para obter o comprovante de uma transferência:\n\n1️⃣ Acesse 'Extrato' no menu inferior\n2️⃣ Toque na transação desejada\n3️⃣ Toque em 'Compartilhar comprovante'\n\nO comprovante pode ser enviado por WhatsApp, e-mail ou salvo como PDF.",
    options: ["✅ Entendi!", "⬅ Voltar"],
    path: (params) =>
      params.userInput.includes("Voltar") ? "start" : "encerrar",
  },

  // ── Outro assunto ────────────────────────────────────────
  outro: {
    message:
      "Pode descrever sua dúvida que tentarei te ajudar! 😊\nOu se preferir, posso conectar você com um atendente humano.",
    options: ["Falar com atendente", "Digitar minha dúvida"],
    path: (params) =>
      params.userInput.includes("atendente") ? "contato_humano" : "digitar_duvida",
  },
  digitar_duvida: {
    message: "Pode digitar sua dúvida:",
    path: () => "resposta_generica",
  },
  resposta_generica: {
    message:
      "Obrigado pela sua mensagem! 📝\nVou registrar sua dúvida e nossa equipe retornará em até 24h pelo e-mail cadastrado.\n\nPosso ajudar com mais alguma coisa?",
    options: ["Sim, tenho outra dúvida", "Não, obrigado!"],
    path: (params) =>
      params.userInput.includes("Sim") ? "start" : "encerrar",
  },

  // ── Abrir chamado ────────────────────────────────────────
  abrir_chamado: {
    message:
      "Chamado registrado com sucesso! ✅\n\n📋 Protocolo: #NB-2025-0042\n⏱ Prazo: até 2 dias úteis\n📧 Acompanhe pelo e-mail cadastrado\n\nPosso ajudar com mais alguma coisa?",
    options: ["Sim, tenho outra dúvida", "Não, obrigado!"],
    path: (params) =>
      params.userInput.includes("Sim") ? "start" : "encerrar",
  },

  // ── Contato humano ───────────────────────────────────────
  contato_humano: {
    message:
      "Vou te conectar com um atendente! 👨‍💼\n\nCanais disponíveis agora:\n📞 0800 740 4848 (24h, gratuito)\n📧 suporte@novobanco.com.br\n📱 WhatsApp: (11) 94848-4848\n\nTempo médio de espera: 3 minutos",
    options: ["✅ Vou ligar agora", "Prefiro resolver pelo app"],
    path: (params) =>
      params.userInput.includes("app") ? "start" : "encerrar",
  },

  // ── Encerramento ─────────────────────────────────────────
  encerrar: {
    message:
      "Fico feliz em ter ajudado! 😊\nSe precisar de mais alguma coisa, é só chamar.\n\nBom dia e boa sorte! 🏦✨",
    options: ["Voltar ao início"],
    path: () => "start",
  },
};

// ── Tema visual combinando com o NovoBanco ──────────────────
const chatbotStyles = {
  // Janela principal
  chatWindowStyle: {
    backgroundColor: colors.bg,
    borderRadius: 16,
    border: `1px solid ${colors.border}`,
    height: "100%",
    width: "100%",
    fontFamily: "'Segoe UI', sans-serif",
  },
  // Cabeçalho
  headerStyle: {
    background: `linear-gradient(135deg, #1A2540, #24344F)`,
    borderBottom: `1px solid ${colors.border}`,
    padding: "14px 18px",
    borderRadius: "16px 16px 0 0",
    color: colors.gold,
    fontWeight: 700,
    fontSize: 15,
  },
  // Avatar do bot no header
  botBubbleStyle: {
    background: `linear-gradient(135deg, ${colors.goldDark}, ${colors.gold})`,
    color: "#1A1F2E",
    fontWeight: 700,
    borderRadius: "18px 18px 18px 4px",
    padding: "10px 14px",
    fontSize: 14,
    maxWidth: "78%",
  },
  // Balão do usuário
  userBubbleStyle: {
    background: `linear-gradient(135deg, ${colors.goldDark}, ${colors.gold})`,
    color: "#1A1F2E",
    fontWeight: 600,
    borderRadius: "18px 18px 4px 18px",
    padding: "10px 14px",
    fontSize: 14,
  },
  // Área de mensagens
  chatHistoryLineBreakStyle: {
    backgroundColor: colors.surface,
  },
  // Container do input (fundo do rodapé do chat)
  chatInputContainerStyle: {
    background: colors.surface2,
    borderTop: `1px solid ${colors.border}`,
    padding: "10px 14px",
    borderRadius: "0 0 16px 16px",
  },
  // Textarea interno (cor do texto)
  chatInputAreaStyle: {
    background: "transparent",
    color: colors.text,
    fontSize: 14,
  },
  // Botão de enviar
  sendButtonStyle: {
    background: `linear-gradient(135deg, ${colors.goldDark}, ${colors.gold})`,
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    color: "#1A1F2E",
  },
  // Opções rápidas (botões de escolha) — nomes corretos no v2
  botOptionStyle: {
    background: colors.surface,
    border: `1px solid ${colors.gold}55`,
    color: colors.gold,
    borderRadius: 20,
    padding: "8px 14px",
    fontSize: 13,
    cursor: "pointer",
    fontWeight: 500,
  },
  botOptionHoveredStyle: {
    background: colors.gold,
    color: "#1A1F2E",
  },
};

// ── Configurações do ChatBot ────────────────────────────────
const chatbotSettings = {
  general: {
    primaryColor:   colors.gold,
    secondaryColor: colors.surface,
    fontFamily:     "'Segoe UI', sans-serif",
    showFooter:     false,
    embedded:       true,        // embutido na tela (sem popup flutuante)
  },
  chatHistory: {
    disabled: true,              // não persiste histórico entre sessões
  },
  header: {
    title: "🤖 Assistente NovoBanco",
    showAvatar: false,
  },
  audio: {
    disabled: true,
  },
  notification: {
    disabled: true,
  },
};

// ── Componente Suporte ──────────────────────────────────────
/**
 * @param {{ onBack: () => void }} props
 */
export function Suporte({ onBack }) {
  const [faqAberta, setFaqAberta] = useState(null);
  const [mensagem, setMensagem]   = useState("");
  const [enviado, setEnviado]     = useState(false);
  const [chatAberto, setChatAberto] = useState(false);

  function handleEnviar() {
    if (!mensagem.trim()) return;
    setEnviado(true);
    setMensagem("");
    setTimeout(() => setEnviado(false), 4000);
  }

  // ── Tela de Chat com React ChatBotify ─────────────────────
  if (chatAberto) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 62px)", background: colors.bg }}>

        {/* Botão de voltar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px 10px", borderBottom: `1px solid ${colors.border}`, flexShrink: 0 }}>
          <button
            onClick={() => setChatAberto(false)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: colors.gold, padding: 0 }}
          >‹</button>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Chat de Suporte</div>
        </div>

        {/* ChatBotify embutido */}
        <div style={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
          <ChatBot
            flow={flow}
            settings={chatbotSettings}
            styles={{
              ...chatbotStyles,
              chatWindowStyle: {
                ...chatbotStyles.chatWindowStyle,
                height: "100%",
                borderRadius: 0,
                border: "none",
              },
            }}
          />
        </div>
      </div>
    );
  }

  // ── Tela principal de Suporte ────────────────────────────
  return (
    <div style={{ padding: "20px 18px 80px" }}>

      {/* Cabeçalho */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: colors.gold, padding: 0 }}
        >‹</button>
        <div style={{ fontWeight: 800, fontSize: 20 }}>Suporte</div>
      </div>

      {/* Banner de chat */}
      <div
        onClick={() => setChatAberto(true)}
        style={{
          ...s.card,
          background: "linear-gradient(135deg, #1A2540, #24344F)",
          display: "flex", alignItems: "center", gap: 14,
          cursor: "pointer", marginBottom: 20,
          border: `1px solid ${colors.gold}33`,
        }}
      >
        <div style={{ fontSize: 36 }}>💬</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Assistente Virtual</div>
          <div style={{ fontSize: 12, color: colors.green }}>● Disponível agora · Resposta imediata</div>
        </div>
        <span style={{ color: colors.gold, fontSize: 22 }}>›</span>
      </div>

      {/* Canais alternativos */}
      <div style={{ fontSize: 12, color: colors.muted, marginBottom: 8, paddingLeft: 4, letterSpacing: 1, textTransform: "uppercase" }}>
        Outros canais
      </div>
      {[
        { icon: "📞", label: "Telefone", desc: "0800 740 4848 • 24h por dia" },
        { icon: "📧", label: "E-mail",   desc: "suporte@novobanco.com.br"   },
        { icon: "📱", label: "WhatsApp", desc: "(11) 94848-4848"            },
      ].map((canal) => (
        <div key={canal.label} style={{ ...s.cardFlat, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>{canal.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15 }}>{canal.label}</div>
            <div style={{ fontSize: 12, color: colors.subtle }}>{canal.desc}</div>
          </div>
        </div>
      ))}

      {/* FAQ */}
      <div style={{ fontSize: 12, color: colors.muted, marginBottom: 8, paddingLeft: 4, letterSpacing: 1, textTransform: "uppercase", marginTop: 8 }}>
        Perguntas frequentes
      </div>
      {FAQS.map((faq, i) => (
        <div
          key={i}
          style={{ ...s.cardFlat, cursor: "pointer", marginBottom: 8 }}
          onClick={() => setFaqAberta(faqAberta === i ? null : i)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{faq.pergunta}</span>
            <span style={{ color: colors.gold, fontSize: 18, display: "inline-block", transform: faqAberta === i ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>›</span>
          </div>
          {faqAberta === i && (
            <div style={{ marginTop: 10, fontSize: 13, color: colors.muted, lineHeight: 1.6, borderTop: `1px solid ${colors.border}`, paddingTop: 10 }}>
              {faq.resposta}
            </div>
          )}
        </div>
      ))}

      {/* Formulário de contato */}
      <div style={{ fontSize: 12, color: colors.muted, marginBottom: 8, paddingLeft: 4, letterSpacing: 1, textTransform: "uppercase", marginTop: 8 }}>
        Enviar mensagem
      </div>
      <div style={s.card}>
        <label style={s.label}>Descreva seu problema</label>
        <textarea
          style={{ ...s.input, minHeight: 100, resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }}
          placeholder="Ex: Não consigo acessar minha conta desde ontem..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />
        {enviado && (
          <div style={{ background: "#7AE8A022", border: "1px solid #7AE8A044", borderRadius: 10, padding: "10px 14px", margin: "12px 0", fontSize: 13, color: colors.green }}>
            ✓ Mensagem enviada! Responderemos em até 24 horas.
          </div>
        )}
        <button style={{ ...s.btnPrimary, marginTop: 14 }} onClick={handleEnviar}>
          Enviar
        </button>
      </div>
    </div>
  );
}