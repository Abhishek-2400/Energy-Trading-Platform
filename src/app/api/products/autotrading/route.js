
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
            const { buyer, seller, units, price, productUsed } = match;
             
            let buyerUser = await User.findOne({ email: buyer });
            let sellerUser = await User.findOne({ email: seller });
            let sellerProducts = sellerUser.products;
            let productIndex = sellerProducts.findIndex(product => product.id == productUsed);


            if (productIndex === -1) {
                console.log(sellerProducts);
                console.log(`Product not found for seller: ${seller} ${typeof (productUsed)}`);
                continue;
            }


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
            sellerProducts[productIndex].tokens -= units;

            sellerUser.products = sellerProducts;


            sellerUser.markModified("products");

            console.log(sellerUser.products);

            await buyerUser.save();
            await sellerUser.save();
        }

        return NextResponse.json({ message: "All trades processed", buyer: buyerUser, seller: sellerUser }, { status: 200 });
    } catch (err) {
        console.error("Trade execution failed:", err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
