# 🚀 Setup do Eco Lodge CRM

## Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta Supabase (já configurada)

## 1️⃣ Instalar Dependências

```bash
npm cache clean --force
npm install
```

## 2️⃣ Variáveis de Ambiente

As chaves do Supabase já estão em `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xyufapuftaucdkescfig.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

## 3️⃣ Rodar Localmente

```bash
npm run dev
```

Abra: http://localhost:3001

## 4️⃣ Testar Fluxo Completo

### A. Presell (Captura de Lead do Google)
1. Vá para: http://localhost:3001/presell?gclid=teste123
2. Preencha Nome e Telefone
3. Clique em "Conversar no WhatsApp"
4. Lead deve aparecer no Kanban (coluna "Novo Lead")

### B. Kanban
1. Vá para: http://localhost:3001/crm
2. Veja os leads chegando do presell
3. Clique no ícone de lápis para editar um lead
4. Clique em "Meta de Reservas" para editar

## 5️⃣ Tabelas Supabase

As tabelas já foram criadas:
- `reservations` - Leads/Reservas do Kanban
- `meta_reservas` - Meta de reservas mensal

## 🔗 Fluxo do Google Ads

**Link para colocar no Google Ads:**
```
https://seu-dominio.com/presell?gclid={gclid}
```

**Fluxo:**
1. Google Ads → https://ecolodgepraiadegravata.com.br?gclid={gclid}
2. Usuário clica em "Reserve Já" → /presell?gclid={gclid}
3. Presell → Salva no Supabase + Redireciona WhatsApp
4. Lead aparece no Kanban automaticamente

## 📦 Deploy Vercel

Quando pronto para deploy:

```bash
# 1. Crie repositório GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# 2. No Vercel
# - Conecte seu repositório GitHub
# - Adicione as mesmas variáveis de ambiente
# - Deploy automático
```

## 🆘 Troubleshooting

### npm install falha com EACCES
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

### Supabase não conecta
- Verifique `.env.local`
- Confirme que as tabelas foram criadas no Supabase
- Cheque o console do navegador por erros

### Lead não aparece no Kanban
- Verifique Supabase Dashboard se o registro foi criado
- Cheque o console por erros de API

---

**Pronto! Seu CRM está operacional com Supabase! 🎉**
