import { NextResponse } from "next/server";
import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";
import { preloadFont } from "next/dist/server/app-render/entry-base";

export async function GET(req) {
    await connect();
    const buyers = await User.find({}, { profile: 1, email: 1, _id: 0 });
    const sellers = await User.find({}, { email: 1, _id: 0, products: 1 });
    //console.log(users, 1000);
    if (!buyers || !sellers) {
        return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
    return NextResponse.json({ message: "buyers and sellers fetched", sellers, buyers }, { status: 200 });
}


