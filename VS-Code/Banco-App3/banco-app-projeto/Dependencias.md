# 📦 Dependências e Instalação — NovoBanco

> Guia completo de tudo que precisa ser instalado para **desenvolver**, **depurar** e **gerar o APK Android**.

---

## 🖥️ Pré-requisitos do sistema

| Ferramenta | Versão mínima | Para que serve | Download |
|---|---|---|---|
| **Node.js** | 18+ | Rodar React + Vite + Capacitor CLI | [nodejs.org](https://nodejs.org) |
| **Android Studio** | Hedgehog+ | Compilar e gerar o APK Android | [developer.android.com/studio](https://developer.android.com/studio) |
| **JDK (Java)** | 17+ | Compilar o projeto Android | Incluso no Android Studio |
| **Git** | qualquer | Controle de versão | [git-scm.com](https://git-scm.com) |

---

## 📦 Dependências do projeto (`package.json`)

### Produção — rodam dentro do app

| Pacote | Versão | Finalidade |
|---|---|---|
| `react` | 18.x | Biblioteca principal de interface |
| `react-dom` | 18.x | Renderização no navegador / WebView |
| `react-chatbotify` | 2.x | Chatbot interativo na tela de Suporte |
| `prop-types` | 15.x | Validação de props em desenvolvimento |
| `@capacitor/core` | 6.x | Núcleo do Capacitor (bridge web ↔ nativo) |
| `@capacitor/android` | 6.x | Plataforma Android nativa |
| `@capacitor/app` | 6.x | Ciclo de vida do app (pause, resume, back) |
| `@capacitor/status-bar` | 6.x | Cor e estilo da barra de status do celular |
| `@capacitor/keyboard` | 6.x | Comportamento do teclado nativo |
| `@capacitor/haptics` | 6.x | Vibração e feedback tátil |

### Desenvolvimento — só no computador

| Pacote | Versão | Finalidade |
|---|---|---|
| `vite` | 5.x | Servidor de desenvolvimento e bundler |
| `@vitejs/plugin-react` | 4.x | Suporte ao JSX no Vite |
| `@capacitor/cli` | 6.x | Comandos `npx cap` no terminal |
| `typescript` | 6.x | Tipagem do `capacitor.config.ts` |

---

## 🚀 Instalação completa (do zero)

### 1. Dependências do projeto

```bash
cd banco-app
npm install
```

Instala tudo de uma vez: React, Vite, ChatBotify, Capacitor e seus plugins.

---

### 2. Instalar pacotes individualmente (referência)

```bash
# React e Vite (núcleo)
npm install react react-dom
npm install -D vite @vitejs/plugin-react

# Chatbot
npm install react-chatbotify

# Validação de props
npm install prop-types

# Capacitor — núcleo e CLI
npm install @capacitor/core @capacitor/android
npm install -D @capacitor/cli

# Plugins nativos do Capacitor
npm install @capacitor/app @capacitor/status-bar @capacitor/keyboard @capacitor/haptics

# TypeScript (para o capacitor.config.ts)
npm install -D typescript
```

---

## 📱 Configuração do ambiente Android

### Passo 1 — Instalar o Android Studio

Baixar em: https://developer.android.com/studio

> **Linux com Flatpak:**
> ```bash
> flatpak install flathub com.google.AndroidStudio
> ```

### Passo 2 — Instalar o Android SDK

Dentro do Android Studio:
```
Settings → SDK Manager → Android SDK
```
Instalar: **Android 14 (API 34)** ou superior.

### Passo 3 — Configurar variáveis de ambiente

**Linux / macOS** — adicionar ao `~/.bashrc` ou `~/.zshrc`:
```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export PATH="$PATH:$ANDROID_HOME/emulator"
export PATH="$PATH:$ANDROID_HOME/platform-tools"
```

**Linux com Flatpak** — adicionar também:
```bash
export CAPACITOR_ANDROID_STUDIO_PATH="/var/lib/flatpak/app/com.google.AndroidStudio/current/active/files/extra/android-studio/bin/studio.sh"
```

Depois:
```bash
source ~/.bashrc
```

**Windows** — Variáveis de Ambiente do Sistema:
```
ANDROID_HOME = C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk
```

---

## 🔄 Fluxo de build: React → Android

```
npm run build          → gera dist/ (HTML + JS + CSS)
npx cap sync android   → copia dist/ para android/app/src/main/assets/
npx cap open android   → abre Android Studio
                          → Build → Build APK(s)
                          → android/app/build/outputs/apk/debug/app-debug.apk
```

Ou use o script de atalho:
```bash
npm run build:android   # faz build + sync em um comando
```

---

## ✅ Checklist antes da apresentação

- [ ] `npm install` rodado com sucesso
- [ ] `npm run dev` abre o app no navegador
- [ ] `npm run build` gera a pasta `dist/` sem erros
- [ ] Android Studio instalado e SDK configurado
- [ ] `npx cap sync android` finaliza sem erros
- [ ] APK instalado e testado no celular
- [ ] Credenciais de demo anotadas: `ana` / `1234`

---

*NovoBanco · Técnico em Informática · React 18 + Vite 5 + Capacitor 6*
