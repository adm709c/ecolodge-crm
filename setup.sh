#!/bin/bash

echo "================================"
echo "🚀 Eco Lodge CRM - Setup Automático"
echo "================================"
echo ""

# Verificar se Node está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo "Baixe em: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js: $(node -v)"
echo "✅ npm: $(npm -v)"
echo ""

# Limpar cache do npm
echo "🧹 Limpando cache do npm..."
npm cache clean --force

echo ""
echo "📦 Instalando dependências (isso pode levar alguns minutos)..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "================================"
    echo "✅ Setup Concluído com Sucesso!"
    echo "================================"
    echo ""
    echo "🚀 Para rodar localmente, execute:"
    echo "   npm run dev"
    echo ""
    echo "📖 Documentação: SETUP.md"
    echo ""
else
    echo ""
    echo "❌ Erro na instalação"
    echo "Tente novamente com:"
    echo "   npm cache clean --force"
    echo "   npm install --legacy-peer-deps"
    exit 1
fi
