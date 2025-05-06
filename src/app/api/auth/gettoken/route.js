import { connect } from "../../../../dbconfig/dbConfig"
import User from "../../../../model/users";
import { NextResponse } from "next/server";

// This ensures the route is not cached
export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connect();
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ tokens: user.token }, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store',
            }
        });

    } catch (error) {
        console.error("Error fetching tokens:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
