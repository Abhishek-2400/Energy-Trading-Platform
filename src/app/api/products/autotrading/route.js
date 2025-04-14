// import { NextResponse } from "next/server";
// import { connect } from "../../../../dbconfig/dbConfig";
// import User from "../../../../model/users";

// export default async function handler(req, res) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Method not allowed' });
//     }

//     const { buyerEmail, sellerEmail, units } = req.body;

//     try {
//         await connect();

//         const buyer = await User.findOne({ email: buyerEmail });
//         const seller = await User.findOne({ email: sellerEmail });

//         if (!buyer || !seller) {
//             return res.status(404).json({ message: 'Buyer or Seller not found' });
//         }

//         if (buyer.tokens < units) {
//             return res.status(400).json({ message: 'Buyer has insufficient tokens' });
//         }

//         buyer.tokens -= units;
//         seller.tokens += units;

//         await buyer.save();
//         await seller.save();

//         return res.status(200).json({ message: 'Trade executed successfully' });
//     } catch (err) {
//         console.error('Trade execution failed:', err);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }

import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connect();
        const body = await req.json();
        const { matches } = body;

        if (!Array.isArray(matches)) {
            return NextResponse.json({ message: "Invalid matches data" }, { status: 400 });
        }

        for (const match of matches) {
            const { buyer, seller, units } = match;

            const buyerUser = await User.findOne({ email: buyer });
            const sellerUser = await User.findOne({ email: seller });

            console.log(buyerUser.token, 899, sellerUser)



            if (!buyerUser || !sellerUser) {
                console.log(`User not found. Buyer: ${buyer}, Seller: ${seller}`);
                continue;
            }

            if (buyerUser.tokens < units) {
                console.log(`Insufficient tokens for Buyer: ${buyer}`);
                continue;
            }

            buyerUser.token += units;
            buyerUser.buyerPreference.demand -= units;
            sellerUser.token -= units;

            await buyerUser.save();
            await sellerUser.save();
            console.log(buyerUser, sellerUser);

        }

        return NextResponse.json({ message: "All trades processed" }, { status: 200 });
    } catch (err) {
        console.error("Trade execution failed:", err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
