# Como Executar com Docker — CRUD API Handler (Next.js 14 & Prisma)

Guia para executar o sistema utilizando Docker Desktop.

---

## Stack e containers

| Container | Serviço no Compose | Função | Porta no Host |
| --- | --- | --- | --- |
| `crud_next14_nginx` | `nginx` | Proxy reverso web (Nginx Alpine) | `8080` |
| `crud_next14_app` | `app` | Aplicação Next.js 14 + Prisma | Interna (`3000`) |
| `crud_next14_postgres` | `postgres` | Banco de dados PostgreSQL 16 | `5433` |
| `crud_next14_adminer` | `adminer` | Administração visual do banco | `8085` |

---

## 1) Preparar ambiente

```bash
cp .env.example .env
```

Deixe o bloco `DOCKER` ativo e o bloco `LOCAL` comentado no arquivo `.env`:

```env
# LOCAL
# APP_URL=http://127.0.0.1:3000
#
# DB_CONNECTION=postgresql
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_DATABASE=crud_api_handler_next14_prisma
# DB_USERNAME=postgres
# DB_PASSWORD=postgres
#
# DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/crud_api_handler_next14_prisma?schema=public"

# DOCKER
APP_URL=http://localhost:8080

DB_CONNECTION=postgresql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=crud_api_handler_next14_prisma
DB_USERNAME=postgres
DB_PASSWORD=postgres

DATABASE_URL="postgresql://postgres:postgres@postgres:5432/crud_api_handler_next14_prisma?schema=public"
```

> Dentro do Docker, a aplicação utiliza `DB_HOST=postgres` e `DB_PORT=5432`. A porta `5433` é mapeada para acesso externo pelo computador host.

---

## 2) Subir containers

```bash
docker compose up -d --build
docker compose ps
```

---

## 3) Inicialização e migrations

O script de bootstrap (`docker/scripts/start-app.sh`) aguarda o PostgreSQL ficar saudável, executa `npx prisma migrate deploy`, roda o seeder (`prisma/seed.mjs`) e inicia o servidor automaticamente.

Caso deseje executar comandos manualmente:

```bash
docker compose exec app npx prisma migrate deploy
docker compose exec app npm run db:seed
```

---

## 4) Desenvolvimento e cache

Para recriar o banco de dados e popular novamente os dados de teste dentro do container:

```bash
docker compose exec app npx prisma migrate reset --force
```

---

## 5) Acessos

| Recurso | URL |
| --- | --- |
| Aplicação (Dashboard CRUD) | http://localhost:8080 |
| Tela de Login | http://localhost:8080/login |
| API Route Handler (`/api/user`) | http://localhost:8080/api/user |
| Adminer (Gerenciador do Banco) | http://localhost:8085 |

### Credenciais de teste

```txt
Perfil Administrador
URL de login: http://localhost:8080/login
E-mail: admin@sistema.com
Senha: password123
```

```txt
Perfil Operador
URL de login: http://localhost:8080/login
E-mail: usuario@sistema.com
Senha: password123
```

### Adminer (Banco de Dados)

```txt
URL: http://localhost:8085
Sistema: PostgreSQL
Servidor: postgres
Usuário: postgres
Senha: postgres
Base de dados: crud_api_handler_next14_prisma
```

---

## 6) Logs e diagnóstico

```bash
docker compose logs -f
docker compose logs -f app
docker compose logs -f nginx
docker compose logs -f postgres
```

---

## 7) Parar ou reconstruir

```bash
docker compose down
docker compose up -d --build
```

Para apagar também os volumes persistentes (banco e cache de build):

```bash
docker compose down -v
```

> O comando `docker compose down -v` apaga os dados do banco PostgreSQL containerizado.
