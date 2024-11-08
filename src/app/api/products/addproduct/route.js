import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { usermail, sellername, priceperunit, tokens, locations } = reqBody;

        const productData = {
            id: Math.floor(Math.random() * 100),
            sellername,
            priceperunit,
            tokens,
            locations,
        };

        console.log("Product Data to Add:", productData);

        // Attempt to push to the products array
        const updatedUser = await User.findOneAndUpdate(
            { email: usermail },
            { $push: { products: productData } },
            { new: true, upsert: true }
        );

        if (!updatedUser) {
            console.error("User not found or update failed");
            return NextResponse.json({ error: "Failed to add product. Try again." }, { status: 500 });
        }

        console.log("Updated User Document:", updatedUser);

        // Return success response with updated user data
        return NextResponse.json({ message: "Product added successfully", data: updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Error during product update:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
