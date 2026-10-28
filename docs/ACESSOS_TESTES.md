# 🔐 Acessos e Dados de Teste

Utilize as credenciais abaixo para testar as diferentes visões e permissões do sistema. Todos os usuários e registros foram gerados automaticamente via *Seeders* (`prisma/seed.mjs`).

## 1. Acesso ao Sistema (Usuários de Teste)

| Perfil | E-mail / Usuário | Senha | Permissão / Detalhes |
| --- | --- | --- | --- |
| Administrador | `admin@sistema.com` | `password123` | Acesso completo ao painel CRUD (`Gabriel Martins`), criação, edição, busca por ID e exclusão de registros. |
| Operador | `usuario@sistema.com` | `password123` | Acesso operacional ao painel CRUD (`Operador de Teste`) para validação dos fluxos de API e listagem. |

## 2. URLs Principais

| Ambiente | Aplicação (Home) | Login / Painel |
| --- | --- | --- |
| **Docker** | `http://localhost:8080` | `http://localhost:8080/login` |
| **Local** (`npm run dev`) | `http://127.0.0.1:3000` | `http://127.0.0.1:3000/login` |

## 3. Vitrine Pública / Endpoints da API

| Item | Link (Exemplo Docker) |
| --- | --- |
| Dashboard Principal (CRUD Interativo) | `http://localhost:8080/` |
| Tela de Autenticação | `http://localhost:8080/login` |
| API Route Handler — Listar / Criar / Atualizar / Excluir | `http://localhost:8080/api/user` |
| API Route Handler — Buscar Usuário por ID | `http://localhost:8080/api/user?id=1` |
| API Route Handler — Sessão / Login | `http://localhost:8080/api/auth` |

## 4. Validação do Acesso

Validação da saúde da aplicação no ambiente de desenvolvimento:

| Verificação | Resultado Esperado |
| --- | --- |
| Containers (`postgres`, `app`, `nginx`, `adminer`) | Saudáveis / Rodando |
| Tela de login principal (`/login`) | HTTP `200` |
| Login com usuário de teste gerado pelo seeder | Redirecionamento para Dashboard CRUD (`/`) |

## 5. Carregar Dados de Teste

Caso o banco de dados seja apagado ou precise ser resetado, basta rodar os comandos abaixo para recriar todas essas credenciais e os registros iniciais da plataforma.

**Com Docker:**
```bash
docker compose exec app npx prisma migrate reset --force
```

**Rodando Localmente (Sem Docker):**
```bash
npx prisma migrate reset --force
```

---

### 📝 Observações:
- O banco de dados é alimentado automaticamente pelo script `prisma/seed.mjs` com os registros iniciais (`Gabriel Martins`, `Operador de Teste` e `Maria Oliveira`) para facilitar a validação imediata das rotas `GET`, `POST`, `PUT` e `DELETE`.
- Use estas credenciais **apenas** em ambiente local ou Docker de desenvolvimento.
