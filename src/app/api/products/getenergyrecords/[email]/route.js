import { connect } from "../../../../../dbconfig/dbConfig";
import User from "../../../../../model/users";
import { NextResponse } from "next/server";

connect();

export async function GET(request, { params }) {
    try {
        const email = params.email; // Extracting email from URL params

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email }).select("energyrecords");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user.energyrecords, { status: 200 });

    } catch (error) {
        console.error("Error fetching energy records:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
