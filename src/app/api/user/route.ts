import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {


    console.log(req.nextUrl.searchParams)

    // console.log("Executado", req)
    return Response.json({ message: "OK" })
}