import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function GET(req: NextRequest) {


    console.log(req.nextUrl.searchParams)

    // console.log("Executado", req)
    return Response.json({ message: "OK" })
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