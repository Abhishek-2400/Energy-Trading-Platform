// import { NextResponse } from "next/server";
// import { connect } from "../../../../dbconfig/dbConfig";
// import User from "../../../../model/users";
// import { preloadFont } from "next/dist/server/app-render/entry-base";

// export async function GET(req) {
//     await connect();
//     const buyers = await User.find({}, { buyerPreference: 1, email: 1, _id: 0 });
//     const sellers = await User.find({}, { email: 1, _id: 0, products: 1 });
//     //console.log(users, 1000);
//     if (!buyers || !sellers) {
//         return NextResponse.json({ message: "No users found" }, { status: 404 });
//     }
//     return NextResponse.json({ message: "buyers and sellers fetched", sellers, buyers }, { status: 200 });
// }


import { NextResponse } from "next/server";
import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connect();

        const buyers = await User.find({}, { buyerPreference: 1, email: 1, _id: 0 });
        const sellers = await User.find({}, { email: 1, _id: 0, products: 1 });

        if (!buyers || !sellers) {
            return new NextResponse(
                JSON.stringify({ message: "No users found" }),
                {
                    status: 404,
                    headers: {
                        "Cache-Control": "no-store",
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: "buyers and sellers fetched", sellers, buyers }),
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store",
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (error) {
        console.error("GET /api/users/buyersellers error:", error.message);
        return new NextResponse(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: {
                    "Cache-Control": "no-store",
                    "Content-Type": "application/json"
                }
            }
        );
    }
}
