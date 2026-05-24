# 📦 Instalação do Eco Lodge CRM

## ⚠️ Pré-requisitos

Antes de começar, certifique-se de ter:
- **Node.js 18 ou superior** → https://nodejs.org
- **npm** (vem com Node.js)

Para verificar se estão instalados, abra o Terminal/PowerShell e execute:

```bash
node -v
npm -v
```

---

## 🚀 Passos de Instalação

### 1️⃣ Abrir Terminal/PowerShell

**Windows:**
- Pressione `Win + R`
- Digite `powershell`
- Pressione Enter

**Mac:**
- Procure por "Terminal" em Applications
- Ou use `Cmd + Space` e digite "Terminal"

**Linux:**
- Abra seu terminal favorito

---

### 2️⃣ Navegar até a Pasta do Projeto

```bash
cd /Users/lucianoferreira/ecolodge-crm
```

(Substituir `/Users/lucianoferreira/` pela sua pasta do projeto)

---

### 3️⃣ Executar a Instalação

**Opção A (Mais Fácil) - Use o Script:**

```bash
chmod +x setup.sh
./setup.sh
```

**Opção B (Manual):**

```bash
npm cache clean --force
npm install
```

---

### 4️⃣ Aguardar

⏳ Isso pode levar **5-10 minutos** dependendo da sua conexão.

Você verá mensagens como:
```
npm warn ...
added X packages
```

---

### 5️⃣ Verificar Sucesso

Se tudo funcionou, você verá:
```
✅ Setup Concluído com Sucesso!
```

Se houver erro, tente:

```bash
npm install --legacy-peer-deps
```

---

## 🎯 Próximo Passo

Após instalar, rode o servidor local:

```bash
npm run dev
```

Depois abra no navegador:
```
http://localhost:3001
```

---

## 🆘 Problemas Comuns

### "npm: command not found"
- Node.js não está instalado
- Solução: Baixe em https://nodejs.org

### "EACCES: permission denied"
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

### "Module not found: @supabase/supabase-js"
- Espere a instalação terminar completamente
- Tente deletar `node_modules` e rodar novamente:
```bash
rm -rf node_modules
npm install
```

---

## ✅ Quando Terminar

Me avise com um ✅ e o link que aparecer no terminal (tipo `http://localhost:3001`)

Daí vou:
1. Criar GitHub
2. Fazer deploy na Vercel
3. Configurar domínio
4. Testar tudo!

---

**Consegue seguir esses passos? 👍**
