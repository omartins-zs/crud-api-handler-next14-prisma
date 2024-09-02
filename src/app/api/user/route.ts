import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function GET(req: NextRequest) {

    console.log(req.nextUrl.searchParams)
    // console.log("Executado", req)
    try {
        const users = await prisma.user.findMany()
        return Response.json({ message: "OK", users })
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error", error
            },
            {
                status: 500
            }
        )
    }
}

export async function POST(req: NextRequest) {

    const { name } = await req.json();
    // console.log(name)
    try {
        const user = await prisma.user.create({
            data: {
                name
            }
        })
        return Response.json({ message: "OK", user })
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error", error
            },
            {
                status: 500
            }
        )
    }
}

export async function DELETE(req: NextRequest) {

    const { id } = await req.json();
    // console.log(name)
    try {
        const user = await prisma.user.delete({
            where: {
                id
            }
        })
        return Response.json({ message: "OK", user })
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error", error
            },
            {
                status: 500
            }
        )
    }
}

export async function PUT(req: NextRequest) {

    const { id, name } = await req.json();
    try {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                name,
            }
        })
        return Response.json({ message: "OK", user })
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error", error
            },
            {
                status: 500
            }
        )
    }
}