import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, sellername, priceperunit, tokens, locations } = reqBody;  // Ensure the frontend sends 'email'

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const productData = {
            id: new mongoose.Types.ObjectId(),
            sellername,
            priceperunit,
            tokens,
        };

       


        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $push: { products: productData }, $inc: { token: tokens } },

            { new: true }
        );

        if (!updatedUser) {
            console.error("User not found or update failed");
            return NextResponse.json({ error: "User not found. Cannot add product." }, { status: 404 });
        }

        console.log("Updated User Document:", updatedUser);


        return NextResponse.json({ message: "Product added successfully", data: updatedUser.products }, { status: 200 });

    } catch (error) {
        console.error("Error during product update:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
