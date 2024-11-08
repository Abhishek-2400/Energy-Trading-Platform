import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({ message: "User Successfully logged out" })
        response.cookies.set("token", "", { httpOnly: true })
        return response;
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
