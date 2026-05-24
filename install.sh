#!/bin/bash

echo "🔧 Limpando cache do npm..."
npm cache clean --force

echo "📦 Instalando dependências..."
npm install

echo "✅ Instalação concluída!"
