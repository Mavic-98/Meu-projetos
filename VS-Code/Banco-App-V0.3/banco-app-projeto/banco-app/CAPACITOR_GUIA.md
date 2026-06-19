# 📱 Guia Completo — NovoBanco no Android via Capacitor

> Siga este guia do zero para gerar o `.apk` instalável no celular.

---

## ✅ Pré-requisitos (instalar antes de começar)

| Ferramenta | Versão mínima | Download |
|---|---|---|
| Node.js | 18+ | https://nodejs.org |
| Android Studio | Hedgehog+ | https://developer.android.com/studio |
| JDK (Java) | 17+ | incluso no Android Studio |

> **Importante:** após instalar o Android Studio, abra-o uma vez e deixe ele baixar o SDK do Android automaticamente.

---

## 🚀 Passo a passo completo

### Passo 1 — Instalar dependências do projeto

```bash
cd banco-app
npm install
```

---

### Passo 2 — Gerar o build de produção

```bash
npm run build
```

Isso cria a pasta `dist/` com todos os arquivos do app compilados.

> ✅ Se aparecer a mensagem `dist/index.html` no terminal, deu certo.

---

### Passo 3 — Inicializar o Capacitor (só na primeira vez)

```bash
npx cap init
```

Quando perguntar:
- **App name:** `NovoBanco`
- **App Package ID:** `br.edu.novobanco.app`
- **Web dir:** `dist`

---

### Passo 4 — Adicionar a plataforma Android

```bash
npx cap add android
```

Isso cria a pasta `android/` com o projeto Android Studio completo.

---

### Passo 5 — Sincronizar o build com o Android

```bash
npx cap sync android
```

Sempre rode este comando depois de qualquer alteração no código React.

---

### Passo 6 — Abrir no Android Studio

```bash
npx cap open android
```

O Android Studio vai abrir automaticamente com o projeto.

---

### Passo 7 — Testar no celular via USB

1. **No celular:** ativar as **Opções do Desenvolvedor**
   - Configurações → Sobre o telefone → Toque 7x em "Número da versão"
   
2. **No celular:** ativar **Depuração USB**
   - Configurações → Opções do desenvolvedor → Depuração USB: ✅

3. **Conectar o celular ao PC via cabo USB**

4. **No Android Studio:** selecionar o celular no menu suspenso e clicar em ▶ (Run)

---

### Passo 8 — Gerar o APK para distribuição

No Android Studio:

```
Build → Build Bundle(s) / APK(s) → Build APK(s)
```

O arquivo `.apk` será gerado em:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

Compartilhe esse arquivo para instalar em qualquer celular Android!

---

## ♻️ Fluxo de desenvolvimento (depois de configurar)

Sempre que alterar o código React:

```bash
npm run build:android   # build + sync em um só comando
npx cap open android    # abre o Android Studio
```

Ou use o atalho criado no package.json:
```bash
npm run build:android
```

---

## 🛠️ Problemas comuns

### "SDK not found" no Android Studio
- Abra: Android Studio → Settings → SDK Manager
- Instale: Android SDK 14 (API 34) ou superior

### "JAVA_HOME not set"
```bash
# Windows (PowerShell como admin)
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Android\Android Studio\jbr", "Machine")
```

### App abre mas fica tela branca
- Certifique-se que `vite.config.js` tem `base: "./"` (já configurado)
- Rode `npm run build` novamente antes de `npx cap sync`

### Botão voltar do Android fecha o app
Adicione em `android/app/src/main/java/.../MainActivity.java`:
```java
@Override
public void onBackPressed() {
    // Deixa o app gerenciar a navegação
}
```

---

## 📂 Estrutura após configurar o Capacitor

```
banco-app/
├── src/                    ← código React (não muda)
├── dist/                   ← build gerado pelo Vite
├── android/                ← projeto Android Studio (gerado pelo Capacitor)
│   └── app/
│       └── build/outputs/apk/debug/
│           └── app-debug.apk  ← APK instalável 🎉
├── capacitor.config.ts     ← configuração do Capacitor
├── vite.config.js          ← base: "./" (obrigatório)
└── package.json            ← scripts: build:android, cap:sync
```

---

## 📋 Requisitos do trabalho atendidos

- ✅ App React compilado para Android nativo
- ✅ Arquivo `.apk` instalável sem loja
- ✅ Ícone e nome personalizados (NovoBanco)
- ✅ Barra de status com cor do tema do app
- ✅ Suporte a teclado e haptics nativos
- ✅ Roda offline após instalado

---

*Capacitor v6 · Android API 34 · React 18 · Vite 5*
