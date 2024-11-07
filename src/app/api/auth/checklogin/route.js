import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbconfig/dbConfig"
import { decodeToken } from "../../../../helpers/decodeToken";

connect();

export async function GET(request) {
    try {
        const userId = await decodeToken(request);
        if (userId === null) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }
        return NextResponse.json({ authenticated: true }, { status: 200 });
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ authenticated: false }, { status: 500 });
    }
}