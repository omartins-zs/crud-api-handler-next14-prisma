<div align="center">

<h1 align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" width="38" height="38" alt="Next.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="38" height="38" alt="TypeScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" width="38" height="38" alt="Prisma" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" width="38" height="38" alt="PostgreSQL" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="38" height="38" alt="Tailwind CSS" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" width="38" height="38" alt="Docker" />
  <br />
  CRUD API Handler — Next.js 14 & Prisma ORM
</h1>

![Next.js](https://img.shields.io/badge/Next.js-14.2.7-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.19.1-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

---

## 📝 Descrição

Aplicação Fullstack e API REST desenvolvida com **Next.js 14 (App Router & Route Handlers)**, **TypeScript**, **Prisma ORM** e **PostgreSQL** (compatível tanto com banco containerizado quanto com **Neon Serverless Postgres**). O sistema entrega operações completas de CRUD de usuários com interface interativa, autenticação de sessão demonstrativa e infraestrutura Docker otimizada com Nginx.

<cite>Gerenciamento completo de usuários via Route Handlers (GET, GET by ID, POST, PUT e DELETE) com persistência relacional no PostgreSQL e interface web integrada.</cite>

---

## 🚦 Status do Projeto

<h4 align="center"> ✅ CRUD API Handler Next.js 14 & Prisma 🚀 Concluído ⚙️ </h4>

---

## 🏗️ Arquitetura do Projeto

- **Tipo:** 🧱 **Monólito Fullstack & 🔌 API REST (Next.js App Router)**
- **Explicação:** O projeto unifica os endpoints de backend utilizando **Next.js Route Handlers** (`src/app/api/user/route.ts` e `src/app/api/auth/route.ts`) com a camada de visualização em **React 18** (`src/app/page.tsx` e `src/app/login/page.tsx`), comunicando-se com o banco de dados **PostgreSQL** através do singleton do **Prisma Client** (`lib/db.ts`).

---

## 🔥 Pré-requisitos

- **Node.js 20+** (ou 18.17+)
- **NPM 9+**
- **TypeScript 5+**
- **PostgreSQL 14+** (Local, Docker ou Neon Database)
- **Docker Desktop** (Opcional, para execução em containers)

---

## 🚀 Tecnologias Utilizadas

- **Linguagem:** TypeScript 5 / JavaScript (Node.js 20+)
- **Framework Fullstack:** Next.js 14.2.7 (App Router & Route Handlers)
- **Biblioteca UI:** React 18 + Tailwind CSS 3.4.1
- **ORM & Database:** Prisma ORM 5.19.1 + PostgreSQL 16 (Neon / Docker)
- **Infraestrutura & Proxy:** Docker, Docker Compose, Nginx 1.27 Alpine e Adminer
- **Padrões Aplicados:** Singleton Pattern para conexão Prisma (`lib/db.ts`), RESTful Route Handlers, validação de payloads e variáveis de ambiente híbridas (`LOCAL` / `DOCKER`).

---

## 🔨 Funcionalidades

- ✅ **Listagem Geral de Usuários (`GET /api/user`):** Retorna todos os registros do banco ordenados por ID.
- ✅ **Busca Individual por ID (`GET /api/user?id=1`):** Consulta um usuário específico pela chave primária com validação de parâmetro e retorno `404` quando inexistente.
- ✅ **Cadastro de Usuário (`POST /api/user`):** Criação de novos usuários com validação de campo obrigatório e retorno HTTP `201`.
- ✅ **Atualização de Usuário (`PUT /api/user`):** Edição do nome de usuários existentes validando ID e existência prévia.
- ✅ **Exclusão de Usuário (`DELETE /api/user`):** Remoção de registros via JSON body (`{ "id": 1 }`) ou query string (`?id=1`).
- ✅ **Autenticação e Sessão (`POST / DELETE /api/auth`):** Fluxo completo de login (`/login`) com preenchimento rápido de credenciais geradas via Seeder.
- ✅ **Dashboard CRUD Interativo (`/`):** Interface moderna em Tailwind CSS para criar, buscar por ID, editar e remover usuários em tempo real.

---

## 🎯 Sobre o Projeto

Sistema desenvolvido demonstrando boas práticas de desenvolvimento, arquitetura limpa e organização de código, com foco em escalabilidade e manutenção.

---

## 📸 Preview do Projeto

🚧 Preview não disponível no projeto.

---

## 📊 Documentação da API

### 📁 Documentação do Projeto

A pasta [`docs/`](./docs) contém os guias completos de configuração, execução e credenciais de teste:

- [`docs/COMO_EXECUTAR.md`](./docs/COMO_EXECUTAR.md) — Guia rápido e visão geral de execução.
- [`docs/COMO_EXECUTAR_LOCAL.md`](./docs/COMO_EXECUTAR_LOCAL.md) — Passo a passo para rodar localmente com Node.js e PostgreSQL/Neon.
- [`docs/COMO_EXECUTAR_DOCKER.md`](./docs/COMO_EXECUTAR_DOCKER.md) — Passo a passo para subir a stack containerizada (`app`, `nginx`, `postgres`, `adminer`).
- [`docs/ACESSOS_TESTES.md`](./docs/ACESSOS_TESTES.md) — Credenciais de teste, seeders e rotas disponíveis.

### 📬 Endpoints / Exemplos de Requisição (Postman / Insomnia)

Conforme documentado também em [`Auxiliares.txt`](./Auxiliares.txt):

| Método | Endpoint | Payload (JSON) / Query | Descrição |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/user` | — | Lista todos os usuários |
| `GET` | `/api/user?id=1` | `?id=1` | Busca um usuário pelo ID |
| `POST` | `/api/user` | `{ "name": "Gabriel Martins" }` | Cria um novo usuário |
| `PUT` | `/api/user` | `{ "id": 1, "name": "Gabriel Martins" }` | Atualiza o nome de um usuário |
| `DELETE` | `/api/user` | `{ "id": 1 }` | Remove um usuário pelo ID |
| `POST` | `/api/auth` | `{ "email": "admin@sistema.com", "password": "password123" }` | Autentica sessão no painel |

---

## 💻 Comandos

### Execução Local (Node.js):

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run dev
```

### Execução com Docker:

```bash
cp .env.example .env
docker compose up -d --build
```

> ⚠️ Estes são comandos básicos. Verifique no projeto arquivos como:
> `README.md`, `docs/COMO_EXECUTAR.md` ou `docs/` para instruções completas.

---

## 🧱 Estrutura do Projeto

```text
crud-api-handler-next14-prisma/
├── docker/
│   ├── nginx/
│   │   └── default.conf          # Proxy reverso Nginx com DNS dinâmico
│   └── scripts/
│       └── start-app.sh          # Script de bootstrap, migrate, seed e cache
├── docs/
│   ├── ACESSOS_TESTES.md         # Credenciais e rotas de validação
│   ├── COMO_EXECUTAR.md          # Índice de execução rápida
│   ├── COMO_EXECUTAR_DOCKER.md   # Guia de execução Docker
│   └── COMO_EXECUTAR_LOCAL.md    # Guia de execução Local
├── lib/
│   └── db.ts                     # Singleton do PrismaClient
├── prisma/
│   ├── migrations/               # Histórico de migrações SQL (PostgreSQL)
│   ├── schema.prisma             # Modelagem de dados (Model User)
│   └── seed.mjs                  # Seeder idempotente de usuários iniciais
├── src/
│   └── app/
│       ├── api/
│       │   ├── auth/route.ts     # Endpoint de login e logout
│       │   └── user/route.ts     # Route Handler CRUD (GET, POST, PUT, DELETE)
│       ├── login/page.tsx        # Tela de autenticação
│       ├── globals.css           # Estilos globais Tailwind CSS
│       ├── layout.tsx            # Layout raiz da aplicação
│       └── page.tsx              # Dashboard CRUD interativo
├── .dockerignore
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── package.json
```

---

## 📝 Melhorias Futuras

- [x] Implementar busca individual por ID (`GET /api/user?id=`)
- [x] Criar interface web interativa para o CRUD e tela de login
- [x] Dockerizar a aplicação com PostgreSQL, Nginx e Adminer
- [ ] Adicionar paginação e filtro por nome no endpoint `GET /api/user`
- [ ] Adicionar testes automatizados de integração para os Route Handlers

---

<div align="center">

Feito com ❤️ por Gabriel Martins 🚀

</div>
