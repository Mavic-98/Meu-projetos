# 🏦 NovoBanco — Aplicativo Bancário de Demonstração

> Projeto desenvolvido para a apresentação do curso de **Técnico em Informática**.
> Demonstra os principais conceitos de desenvolvimento de software moderno com
> **React 18**, organização por responsabilidade de função, integração de biblioteca
> externa e empacotamento nativo Android via **Capacitor**.

---

## 📁 Estrutura de Pastas

```
banco-app/
├── index.html                  ← Ponto de entrada HTML
├── vite.config.js              ← Bundler Vite (base: "./" obrigatório para Capacitor)
├── package.json                ← Dependências e scripts do projeto
├── capacitor.config.ts         ← Configuração do app Android (ID, nome, plugins)
├── .gitignore                  ← Arquivos ignorados pelo Git
│
├── android-resources/
│   └── strings.xml             ← Strings nativas do Android (nome do app)
│
├── android/                    ← Projeto Android Studio (gerado pelo Capacitor)
│   └── app/build/outputs/apk/
│       └── app-debug.apk       ← APK instalável gerado pelo Android Studio
│
└── src/
    ├── main.jsx                ← Inicializa o React na página
    ├── App.jsx                 ← Componente raiz: estado global + roteamento
    │
    ├── data/
    │   └── mockData.js         ← Dados fictícios que simulam uma API bancária
    │
    ├── utils/
    │   └── formatters.js       ← Funções puras: formatação de moeda, validação, datas
    │
    ├── styles/
    │   └── theme.js            ← Tokens de design centralizados (cores, botões, inputs)
    │
    ├── hooks/
    │   └── useToast.js         ← Hook personalizado de notificações temporárias
    │
    ├── components/             ← Blocos de UI reutilizáveis em múltiplas telas
    │   ├── Avatar.jsx          ← Ícone circular com iniciais do usuário
    │   ├── Toast.jsx           ← Notificação flutuante de feedback
    │   └── Navbar.jsx          ← Barra de navegação inferior (bottom navigation)
    │
    └── screens/                ← 9 telas completas da aplicação
        ├── Login.jsx           ← Autenticação com validação de credenciais
        ├── Inicio.jsx          ← Dashboard: saldo, atalhos e últimas transações
        ├── Extrato.jsx         ← Histórico completo com filtros por categoria
        ├── Transferir.jsx      ← Fluxo de transferência Pix em múltiplos passos
        ├── Receber.jsx         ← Chave Pix e QR Code para receber pagamentos
        ├── Cartoes.jsx         ← Gerenciamento de cartões (bloquear/desbloquear)
        ├── Seguranca.jsx       ← Configurações de senha e autenticação em 2 etapas
        ├── Suporte.jsx         ← Chatbot (React ChatBotify) + FAQ + formulário
        └── Ajustes.jsx         ← Perfil do usuário e menu de configurações
```

---

## 🚀 Como executar — Navegador (desenvolvimento)

**Pré-requisito:** [Node.js 18+](https://nodejs.org)

```bash
npm install
npm run dev
# Abrir: http://localhost:5173
```

**Credenciais de demonstração:**

| Campo   | Valor  |
|---------|--------|
| Usuário | `ana`  |
| Senha   | `1234` |

---

## 📱 Como gerar o APK Android (Capacitor)

**Pré-requisitos adicionais:**
- [Android Studio](https://developer.android.com/studio) instalado
- JDK 17+ (incluso no Android Studio)

```bash
# 1. Instalar dependências
npm install

# 2. Gerar o build de produção
npm run build

# 3. Inicializar o Capacitor (só na primeira vez)
npx cap init
#    App name:   NovoBanco
#    Package ID: br.edu.novobanco.app
#    Web dir:    dist

# 4. Adicionar plataforma Android (só na primeira vez)
npx cap add android

# 5. Sincronizar o build com o Android
npx cap sync android

# 6. Abrir no Android Studio
npx cap open android
```

> **Linux com Android Studio via Flatpak?** Abra o Android Studio manualmente
> e use `File → Open` apontando para a pasta `android/` do projeto.

No Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**

O `.apk` é gerado em:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Scripts disponíveis

| Script | O que faz |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção na pasta `dist/` |
| `npm run build:android` | Build + sync com Android em um comando |
| `npm run cap:sync` | Sincroniza `dist/` com o projeto Android |
| `npm run cap:android` | Abre o projeto no Android Studio |

---

## 🧩 Conceitos de programação abordados

| Conceito | Onde aparece no projeto |
|---|---|
| Componentes React | Toda a pasta `components/` |
| Props e composição | `App.jsx` passa dados para cada `screen/` |
| Estado (`useState`) | `App.jsx`, `Transferir.jsx`, `Extrato.jsx` |
| Efeitos (`useEffect`) | `hooks/useToast.js` — timer de limpeza |
| Hooks personalizados | `hooks/useToast.js` |
| Separação de responsabilidades | Pastas `data/`, `utils/`, `styles/`, `hooks/` |
| Validação de dados | `utils/formatters.js` → `validateTransfer()` |
| Biblioteca externa (chatbot) | `react-chatbotify` no `Suporte.jsx` |
| Fluxo de dados unidirecional | `App.jsx` → handlers → telas → callbacks |
| Formatação de moeda (pt-BR) | `utils/formatters.js` → `formatBRL()` |
| Estilização por objeto JS | `styles/theme.js` — tokens de design |
| Empacotamento nativo Android | Capacitor v6 + Android Studio |

---

## 📦 Dependências

| Pacote | Versão | Finalidade |
|---|---|---|
| `react` | 18.x | Biblioteca principal de interface |
| `react-dom` | 18.x | Renderização no navegador |
| `react-chatbotify` | 2.x | Chatbot interativo na tela de Suporte |
| `prop-types` | 15.x | Validação de props em desenvolvimento |
| `@capacitor/core` | 6.x | Núcleo do Capacitor (bridge web ↔ nativo) |
| `@capacitor/android` | 6.x | Plataforma Android |
| `@capacitor/app` | 6.x | Eventos do ciclo de vida do app |
| `@capacitor/status-bar` | 6.x | Controle da barra de status |
| `@capacitor/keyboard` | 6.x | Comportamento do teclado nativo |
| `@capacitor/haptics` | 6.x | Vibração e feedback tátil |
| `vite` *(dev)* | 5.x | Bundler e servidor de desenvolvimento |
| `@vitejs/plugin-react` *(dev)* | 4.x | Suporte ao JSX no Vite |
| `@capacitor/cli` *(dev)* | 6.x | Comandos `npx cap` no terminal |
| `typescript` *(dev)* | 6.x | Tipagem para o `capacitor.config.ts` |

---

## 🗺️ Fluxo de navegação

```
Login
  └── App (autenticado)
        ├── Início        → atalhos para todas as outras telas
        ├── Extrato       → lista de transações com filtros
        ├── Transferir    → fluxo Pix: contato → valor → confirmação
        ├── Receber       → QR Code e chave Pix
        └── Ajustes
              ├── Cartões
              ├── Segurança
              └── Suporte   → Chatbot / FAQ / Formulário
```

---

## 🤖 Chatbot de Suporte

Usa a biblioteca **React ChatBotify** com fluxo de atendimento completo, sem API externa.

| Área | Tópicos cobertos |
|---|---|
| Pix e Transferências | Como fazer, erros de envio, limites diurno/noturno |
| Cartões | Desbloquear, bloquear, solicitar 2ª via |
| Segurança | Alterar senha, autenticação em 2 etapas, fraude |
| Extrato | Visualizar, transação não reconhecida, comprovante |
| Outros | Campo livre + abertura de chamado com protocolo |

---

## 📚 Tecnologias utilizadas

- **React 18** — biblioteca de interface baseada em componentes
- **Vite 5** — ferramenta de build ultrarrápida
- **JavaScript ES6+ / TypeScript** — linguagens base
- **React ChatBotify 2** — chatbot declarativo por fluxo de estados
- **Capacitor 6** — empacotamento nativo Android/iOS a partir de React

---

*Projeto de demonstração acadêmica — não utilizar em ambiente de produção.*
