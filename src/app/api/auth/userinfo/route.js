import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbconfig/dbConfig"
import User from "../../../../model/users"
import { decodeToken } from "../../../../helpers/decodeToken";

connect();

export async function GET(request) {
    try {
        const userId = await decodeToken(request);
        const user = await User.findOne({ _id: userId }).select("-password")  //do not want password
        return NextResponse.json({ message: "user found", data: user })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}