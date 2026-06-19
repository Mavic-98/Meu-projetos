// ============================================================
//  capacitor.config.ts
//  Configuração principal do Capacitor
//  Docs: https://capacitorjs.com/docs/config
// ============================================================

import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  // ID único do app — padrão: domínio invertido (sem acentos, sem espaços)
  appId: "br.edu.novobanco.app",

  // Nome exibido na tela inicial do celular
  appName: "NovoBanco",

  // Pasta onde o Vite gera os arquivos de build
  webDir: "dist",

  // Configurações específicas para Android
  android: {
    // Permite navegação normal dentro do app
    allowMixedContent: true,
    // Cor da barra de status (topo do celular) — mesma do tema escuro do app
    backgroundColor: "#0E1219",
  },

  // Configurações do servidor (apenas para desenvolvimento com live reload)
  server: {
    // Descomente a linha abaixo para usar live reload via Wi-Fi durante o dev:
    // url: "http://SEU_IP:5173",
    // cleartext: true,
  },

  // Plugins nativos
  plugins: {
    // Barra de status (topo do celular)
    StatusBar: {
      style: "DARK",           // ícones claros sobre fundo escuro
      backgroundColor: "#0E1219",
    },
    // Teclado
    Keyboard: {
      resize: "body",          // reposiciona o layout quando o teclado abre
      style: "DARK",
      resizeOnFullScreen: true,
    },
    // Splash Screen
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0E1219",
      showSpinner: false,
    },
  },
};

export default config;
