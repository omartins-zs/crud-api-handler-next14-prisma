import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const idParam = req.nextUrl.searchParams.get("id");

        if (idParam !== null) {
            const id = Number(idParam);
            if (!Number.isInteger(id) || id <= 0) {
                return NextResponse.json(
                    { message: "Error", error: "O parâmetro 'id' deve ser um número inteiro positivo válido." },
                    { status: 400 }
                );
            }

            const user = await prisma.user.findUnique({
                where: { id }
            });

            if (!user) {
                return NextResponse.json(
                    { message: "Error", error: "Usuário não encontrado." },
                    { status: 404 }
                );
            }

            return NextResponse.json({ message: "OK", user });
        }

        const users = await prisma.user.findMany({
            orderBy: { id: "asc" }
        });
        return NextResponse.json({ message: "OK", users });
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

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const name = typeof body?.name === "string" ? body.name.trim() : "";

        if (!name) {
            return NextResponse.json(
                { message: "Error", error: "O campo 'name' é obrigatório." },
                { status: 400 }
            );
        }

        const user = await prisma.user.create({
            data: { name }
        });
        return NextResponse.json({ message: "OK", user }, { status: 201 });
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

export async function DELETE(req: NextRequest) {
    try {
        const idParam = req.nextUrl.searchParams.get("id");
        let rawId: unknown = idParam;

        if (rawId === null) {
            const body = await req.json().catch(() => ({}));
            rawId = body?.id;
        }

        const id = Number(rawId);
        if (!Number.isInteger(id) || id <= 0) {
            return NextResponse.json(
                { message: "Error", error: "Um 'id' válido é obrigatório para exclusão." },
                { status: 400 }
            );
        }

        const existing = await prisma.user.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { message: "Error", error: "Usuário não encontrado para exclusão." },
                { status: 404 }
            );
        }

        const user = await prisma.user.delete({
            where: { id }
        });
        return NextResponse.json({ message: "OK", user });
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

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const id = Number(body?.id);
        const name = typeof body?.name === "string" ? body.name.trim() : "";

        if (!Number.isInteger(id) || id <= 0 || !name) {
            return NextResponse.json(
                { message: "Error", error: "Os campos 'id' (inteiro positivo) e 'name' são obrigatórios." },
                { status: 400 }
            );
        }

        const existing = await prisma.user.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { message: "Error", error: "Usuário não encontrado para atualização." },
                { status: 404 }
            );
        }

        const user = await prisma.user.update({
            where: { id },
            data: { name }
        });
        return NextResponse.json({ message: "OK", user });
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
