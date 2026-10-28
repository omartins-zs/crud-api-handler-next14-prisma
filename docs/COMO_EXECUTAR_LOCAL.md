# Como Executar Localmente — CRUD API Handler (Next.js 14 & Prisma)

Guia para rodar **sem Docker**, utilizando **Node.js**, **NPM** e **PostgreSQL** (local ou Neon Serverless).

> **Não quer instalar Node.js ou PostgreSQL localmente?** Use [COMO_EXECUTAR_DOCKER.md](COMO_EXECUTAR_DOCKER.md) — basta Docker Desktop, em qualquer Windows, Mac ou Linux.

---

## Requisitos

Para rodar localmente, o essencial é **Node.js** + **NPM** compatível e acesso a um banco **PostgreSQL** (local ou em nuvem via Neon).

| Ferramenta | Obrigatório? | Versão mínima |
| --- | --- | --- |
| **Node.js** | Sim | 18+ |
| **NPM** | Sim | 9+ |
| **PostgreSQL** | Sim | 14+ (ou conta Neon) |

### Ambiente de referência (máquina de desenvolvimento)

Stack usada na elaboração deste projeto — **não é requisito fixo**, só referência do que já foi testado:

| Ferramenta | Versão |
| --- | --- |
| **Laragon** | **6.0.0** |
| PHP (via Laragon) | 8.4.6 |
| Composer | 2.8.12 |
| Laravel (no projeto) | 13.15.0 |
| **Node.js** | **22.14.0+** |
| **NPM** | **11.4.2+** |

Para conferir no seu computador:

```bash
node -v
npm -v
npx prisma -v
```

---

## 1) Preparar ambiente

### 1.1 Clonar ou acessar o projeto

```bash
cd c:/Projetos/crud-api-handler-next14-prisma
```

### 1.2 Copiar variáveis de ambiente

```bash
cp .env.example .env
```

No PowerShell:

```powershell
Copy-Item .env.example .env
```

### 1.3 Ativar o ambiente local

Deixe o bloco `LOCAL` ativo e o bloco `DOCKER` comentado no `.env`:

```env
# LOCAL
APP_URL=http://127.0.0.1:3000

DB_CONNECTION=postgresql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=crud_api_handler_next14_prisma
DB_USERNAME=postgres
DB_PASSWORD=postgres

DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/crud_api_handler_next14_prisma?schema=public"

# DOCKER
# APP_URL=http://localhost:8080
#
# DB_CONNECTION=postgresql
# DB_HOST=postgres
# DB_PORT=5432
# DB_DATABASE=crud_api_handler_next14_prisma
# DB_USERNAME=postgres
# DB_PASSWORD=postgres
#
# DATABASE_URL="postgresql://postgres:postgres@postgres:5432/crud_api_handler_next14_prisma?schema=public"
```

### 1.4 Criar o banco de dados

Caso utilize PostgreSQL local na porta `5432`, crie o banco:

```sql
CREATE DATABASE crud_api_handler_next14_prisma;
```

> Também é possível manter a URL do **Neon Database** no campo `DATABASE_URL` do bloco `LOCAL`.

---

## 2) Instalar dependências

```bash
npm install
```

---

## 3) Inicialização, migrations e seed

```bash
npx prisma generate
npx prisma migrate deploy
npm run db:seed
```

Para recriar todo o banco do zero:

```bash
npx prisma migrate reset --force
```

> `migrate reset` apaga os dados existentes e reaplica o seeder automaticamente.

---

## 4) Rodar aplicação

Para desenvolvimento:

```bash
npm run dev
```

Aplicação:

http://127.0.0.1:3000

Para build de produção local:

```bash
npm run build
npm run start
```

---

## 5) Filas e workers

O projeto não utiliza workers ou filas em background. Todas as operações CRUD são processadas diretamente pelos Route Handlers do Next.js.

---

## 6) Acessos

| Recurso | URL |
| --- | --- |
| Página inicial (Dashboard CRUD) | http://127.0.0.1:3000 |
| Login | http://127.0.0.1:3000/login |
| API Route Handler (Usuários) | http://127.0.0.1:3000/api/user |
| Busca por ID | http://127.0.0.1:3000/api/user?id=1 |

### Credenciais de teste

```txt
Perfil Administrador
URL de login: http://127.0.0.1:3000/login
E-mail: admin@sistema.com
Senha: password123
```

```txt
Perfil Operador
URL de login: http://127.0.0.1:3000/login
E-mail: usuario@sistema.com
Senha: password123
```

---

## 7) Comandos úteis

```bash
npx prisma studio
npx prisma migrate status
npx prisma generate
npm run lint
npm run build
```

---

## 8) Problemas comuns

### Banco não conecta

Verifique se o `DATABASE_URL` no `.env` aponta para `127.0.0.1:5432` (PostgreSQL local) ou para sua instância ativa do Neon Database.

### Prisma Client desatualizado

```bash
npx prisma generate
```

### Tabelas não encontradas

```bash
npx prisma migrate deploy
npm run db:seed
```

---

## Próximo passo

Para ambiente containerizado, consulte [COMO_EXECUTAR_DOCKER.md](COMO_EXECUTAR_DOCKER.md).
