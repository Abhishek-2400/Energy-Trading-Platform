import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { userId,
            totalProduction,
            totalConsumption,
            avgProduction,
            avgConsumption,
            peakProduction,
            peakConsumption,
            efficiencyRatio,
            surplusEnergy,
            energyDeficit,
            time } = reqBody;

        const energyData = {
            totalProduction,
            totalConsumption,
            avgProduction,
            avgConsumption,
            peakProduction,
            peakConsumption,
            efficiencyRatio,
            surplusEnergy,
            energyDeficit,
            time,
        };
        console.log(energyData);
        // Attempt to push to the products array
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { energyrecords: energyData } },
            { new: true, upsert: false }
        );

        if (!updatedUser) {
            console.error("User not found or update failed");
            return NextResponse.json({ error: "Failed to update user energy data . Try again." }, { status: 500 });
        }

        console.log("Updated User energy data:", updatedUser);

        // Return success response with updated user data
        return NextResponse.json({ message: "energy datat added successfully", data: updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Error during us update:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
