import { NextResponse } from "next/server";
import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";

export async function POST(req) {
    await connect();

    const body = await req.json();
    const { email, approxTokens, maxPrice } = body;

    if (!email || approxTokens === undefined || maxPrice === undefined) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }


        const buyerPreferences = {
            demand: approxTokens,
            price: maxPrice
        };



        user.buyerPreference = buyerPreferences;
        console.log(user.profile, 90000);
        console.log(user, 10000);


        await user.save();

        return NextResponse.json({ message: "Profile updated successfully", user });
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
