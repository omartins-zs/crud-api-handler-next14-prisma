import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export const dynamic = "force-dynamic";

const DEMO_USERS = [
    {
        email: "admin@sistema.com",
        password: "password123",
        role: "Administrador",
        defaultName: "Gabriel Martins"
    },
    {
        email: "usuario@sistema.com",
        password: "password123",
        role: "Operador",
        defaultName: "Operador de Teste"
    }
];

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
        const password = typeof body?.password === "string" ? body.password.trim() : "";
        const name = typeof body?.name === "string" ? body.name.trim() : "";

        // Modo 1: Login por credenciais de teste (E-mail e Senha)
        if (email && password) {
            const matchedDemo = DEMO_USERS.find(
                (u) => u.email.toLowerCase() === email && u.password === password
            );

            if (!matchedDemo) {
                return NextResponse.json(
                    { message: "Error", error: "Credenciais inválidas. Verifique o e-mail e a senha." },
                    { status: 401 }
                );
            }

            let dbUser = await prisma.user.findFirst({
                where: { name: matchedDemo.defaultName }
            });

            if (!dbUser) {
                dbUser = await prisma.user.create({
                    data: { name: matchedDemo.defaultName }
                });
            }

            const sessionPayload = {
                id: dbUser.id,
                name: dbUser.name,
                email: matchedDemo.email,
                role: matchedDemo.role,
                authenticatedAt: new Date().toISOString()
            };

            const response = NextResponse.json({
                message: "OK",
                session: sessionPayload
            });

            response.cookies.set("crud_session", JSON.stringify(sessionPayload), {
                httpOnly: false,
                path: "/",
                maxAge: 60 * 60 * 24
            });

            return response;
        }

        // Modo 2: Login direto pelo nome de um usuário cadastrado no banco
        if (name) {
            const dbUser = await prisma.user.findFirst({
                where: { name }
            });

            if (!dbUser) {
                return NextResponse.json(
                    { message: "Error", error: "Usuário não encontrado no banco de dados." },
                    { status: 401 }
                );
            }

            const sessionPayload = {
                id: dbUser.id,
                name: dbUser.name,
                email: `${dbUser.name.toLowerCase().replace(/\s+/g, ".")}@sistema.com`,
                role: "Usuário Cadastrado",
                authenticatedAt: new Date().toISOString()
            };

            const response = NextResponse.json({
                message: "OK",
                session: sessionPayload
            });

            response.cookies.set("crud_session", JSON.stringify(sessionPayload), {
                httpOnly: false,
                path: "/",
                maxAge: 60 * 60 * 24
            });

            return response;
        }

        return NextResponse.json(
            { message: "Error", error: "Informe e-mail e senha (ou nome de usuário) para autenticar." },
            { status: 400 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error",
                error: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    const response = NextResponse.json({ message: "OK", loggedOut: true });
    response.cookies.delete("crud_session");
    return response;
}
