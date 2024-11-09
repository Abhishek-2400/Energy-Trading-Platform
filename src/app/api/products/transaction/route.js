import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";
import { NextResponse } from "next/server";
import { decodeToken } from '../../../../helpers/decodeToken';

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { id, sellername, selleremail, unitCost, locations, units, totalCost } = reqBody;

        // Await the decodeToken function to get the actual userId
        const userId = await decodeToken(request);

        const user = await User.findOne({ _id: userId }).select("-password");  // exclude password
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const transactData = {
            id: id,
            sellername: sellername,
            selleremail: selleremail,
            unitCost: unitCost,
            locations: locations,
            units: units,
            totalCost: totalCost
        };

        // Attempt to push to the transactions array
        const updatedUser = await User.findOneAndUpdate(
            { email: user.email },
            { $push: { transactions: transactData } },
            { new: true, upsert: true }
        );

        if (!updatedUser) {
            console.error("User not found or update failed");
            return NextResponse.json({ error: "Failed to add Transaction. Try again." }, { status: 500 });
        }

        console.log("Updated User Document:", updatedUser);

        // Return success response with updated user data
        return NextResponse.json({ message: "Transaction added successfully", data: updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Error during Transaction update:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
