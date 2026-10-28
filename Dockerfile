FROM node:20-alpine

# Instala dependências de sistema necessárias para o Prisma Engine e netcat para healthcheck do banco
RUN apk add --no-cache libc6-compat openssl netcat-openbsd

WORKDIR /app

# Desativa telemetria do Next.js para acelerar build e runtime
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Copia arquivos de manifesto primeiro para aproveitar cache de camadas do Docker
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Instala todas as dependências e gera o Prisma Client
RUN npm ci && npx prisma generate && npm cache clean --force

# Copia o restante do código-fonte
COPY . .

# Normaliza permissões e quebras de linha (CRLF -> LF para compatibilidade com Docker Desktop no Windows)
RUN sed -i 's/\r$//' /app/docker/scripts/start-app.sh && \
    chmod +x /app/docker/scripts/start-app.sh

# Pré-compila o projeto na imagem para evitar cold start lento no primeiro boot
RUN npm run build

EXPOSE 3000

CMD ["/app/docker/scripts/start-app.sh"]
