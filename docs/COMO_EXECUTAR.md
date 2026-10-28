# Como Executar — CRUD API Handler (Next.js 14 & Prisma)

Escolha **um** guia conforme seu ambiente:

| Guia | Quando usar | Requisitos no PC |
| --- | --- | --- |
| **[COMO_EXECUTAR_DOCKER.md](COMO_EXECUTAR_DOCKER.md)** | Executar em qualquer máquina com containers | Docker Desktop |
| **[COMO_EXECUTAR_LOCAL.md](COMO_EXECUTAR_LOCAL.md)** | Desenvolver localmente com Node.js | Node.js 18+, NPM e PostgreSQL (Local ou Neon) |
| **[ACESSOS_TESTES.md](ACESSOS_TESTES.md)** | Logins, URLs e fluxos de teste | Credenciais de teste e endpoints |

---

## Início rápido

### Local — Node.js / Laragon

Ative o bloco `LOCAL` no `.env` e execute:

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Aplicação:

http://127.0.0.1:3000

### Docker

Ative o bloco `DOCKER` no `.env` e execute:

```bash
cp .env.example .env
docker compose up -d --build
```

Aplicação:

http://localhost:8080

---

## Logins demo

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Administrador | `admin@sistema.com` | `password123` |
| Operador | `usuario@sistema.com` | `password123` |

---

## URLs principais

| Área | Local | Docker |
| --- | --- | --- |
| Página inicial (Dashboard CRUD) | http://127.0.0.1:3000 | http://localhost:8080 |
| Login | http://127.0.0.1:3000/login | http://localhost:8080/login |
| Endpoint de Usuários (`GET`/`POST`/`PUT`/`DELETE`) | http://127.0.0.1:3000/api/user | http://localhost:8080/api/user |
| Busca por ID (`GET ?id=1`) | http://127.0.0.1:3000/api/user?id=1 | http://localhost:8080/api/user?id=1 |
| Gerenciador de Banco (Adminer) | — | http://localhost:8085 |

---

## Outros documentos

- [COMO_EXECUTAR_LOCAL.md](COMO_EXECUTAR_LOCAL.md) — Guia detalhado para execução local
- [COMO_EXECUTAR_DOCKER.md](COMO_EXECUTAR_DOCKER.md) — Guia detalhado para execução em containers Docker
- [ACESSOS_TESTES.md](ACESSOS_TESTES.md) — Credenciais e fluxos de teste
