import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbconfig/dbConfig"
import { decodeToken } from "../../../../helpers/decodeToken";
import User from "../../../../model/users";
connect();

export async function GET(request) {
    try {
        const userId = await decodeToken(request);
        if (userId === null) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }
        const user = await User.find({ _id: userId }).select("-password");
        return NextResponse.json({ authenticated: true, data: user }, { status: 200 });
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ authenticated: false }, { status: 500 });
    }
}