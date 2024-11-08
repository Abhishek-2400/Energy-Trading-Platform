import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbconfig/dbConfig"
import User from "../../../../model/users"
import { decodeToken } from "../../../../helpers/decodeToken";

connect();

export async function GET(request) {
    try {
        const userId = await decodeToken(request);
        const user = await User.findOne({ _id: userId }).select("-password")  //do not want password
        console.log("User found:", user);
        const products = user.products
        return NextResponse.json({ data: products }, { status: 200 })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}