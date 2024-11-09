import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";
import { NextResponse } from "next/server";
import { decodeToken } from '../../../../helpers/decodeToken'

connect();

export async function POST(request) {
    try {
        // Parse the request body to get id, units, and selleremail
        const reqBody = await request.json();
        const { id, units, selleremail } = reqBody;

        // Decode the user token to get the current logged-in user's ID
        const userId = await decodeToken(request);

        // Find the user and seller in the database (excluding the password field)
        const user = await User.find({ _id: userId }).select("-password");
        const seller = await User.find({ email: selleremail }).select("-password");

        // Check if user and seller exist
        if (!user || !seller || seller.length === 0) {
            return NextResponse.json({ error: "User or Seller not found" }, { status: 404 });
        }

        // Get the product that the seller is selling and deduct tokens from the seller's product
        const sellerProducts = seller[0].products;
        for (let i = 0; i < sellerProducts.length; i++) {
            if (sellerProducts[i].id == id) {
                sellerProducts[i].tokens = sellerProducts[i].tokens - units;
                break;
            }
        }

        seller[0].token = seller[0].token - units; // Deduct units from seller's total tokens

        // Add the units to the user's tokens
        user[0].token = user[0].token + units;

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { token: user[0].token },
            { new: true }
        );
        const updatedseller = await User.findOneAndUpdate(
            { email: selleremail },
            { token: seller[0].token, products: sellerProducts },
            { new: true }
        );
        
        return NextResponse.json({ message: "Tokens updated successfully", data1: updatedUser, data2: updatedseller }, { status: 200 });
    } catch (error) {
        console.error("Error during product update:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
