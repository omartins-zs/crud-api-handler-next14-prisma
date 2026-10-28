#!/bin/sh
set -e

echo "===================================================="
echo " Iniciando Bootstrap Otimizado — Next.js 14 + Prisma"
echo "===================================================="

# Aguarda o banco PostgreSQL aceitar conexões caso DB_HOST seja o container 'postgres'
if [ "$DB_HOST" = "postgres" ] || echo "$DATABASE_URL" | grep -q "@postgres:"; then
    echo "-> Aguardando banco de dados PostgreSQL em postgres:5432..."
    MAX_RETRIES=30
    COUNT=0
    until nc -z postgres 5432 >/dev/null 2>&1; do
        COUNT=$((COUNT + 1))
        if [ "$COUNT" -ge "$MAX_RETRIES" ]; then
            echo "ERRO: Tempo limite aguardando PostgreSQL."
            exit 1
        fi
        sleep 1
    done
    echo "-> PostgreSQL está online!"
fi

# Gera Prisma Client apenas se ainda não estiver gerado
if [ ! -d "node_modules/.prisma/client" ]; then
    echo "-> Gerando Prisma Client..."
    npx prisma generate
fi

# Aplica migrations de produção/desenvolvimento sem bloquear desnecessariamente
echo "-> Sincronizando migrations com o banco de dados (prisma migrate deploy)..."
npx prisma migrate deploy || echo "Aviso: Não foi possível aplicar migrate deploy automaticamente."

# Executa seed inicial de forma idempotente
if [ -f "prisma/seed.mjs" ]; then
    echo "-> Verificando e populando dados iniciais (seed)..."
    node prisma/seed.mjs || echo "Aviso: Seed ignorado."
fi

# Aquecimento inteligente: constrói o build de produção apenas se .next/BUILD_ID não existir
if [ ! -f ".next/BUILD_ID" ]; then
    echo "-> Build de produção ausente. Compilando aplicação Next.js..."
    npm run build
else
    echo "-> Build .next encontrado em cache! Pulando rebuild desnecessário."
fi

echo "-> Iniciando servidor Next.js na porta 3000..."
exec npm run start
