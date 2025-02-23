// import { connect } from "../../../../dbconfig/dbConfig";
// import User from "../../../../model/users";
// import { NextResponse } from "next/server";
// import { decodeToken } from "../../../../helpers/decodeToken";
// connect();

// export async function POST(request) {
//     try {
//         const reqBody = await request.json();
//         const { prodid } = reqBody;
//         const userId = await decodeToken(request);
//         const user = await User.findOne({ _id: userId }).select("-password")

//         if (!user) {
//             return NextResponse.json({ error: "User not found" }, { status: 404 });
//         }

//         const products = user.products
//         const updatedproducts = products.filter((product) => product.id !== prodid)
//         const updatedUser = await User.findOneAndUpdate(
//             { _id: userId },
//             { products: updatedproducts },
//             { new: true }
//         );
//         // Return success response with updated user data
//         return NextResponse.json({ message: "Product deleted successfully", data: updatedUser }, { status: 200 });

//     } catch (error) {
//         console.error("Error during product update:", error.message);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }


import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";
import { NextResponse } from "next/server";
import { decodeToken } from "../../../../helpers/decodeToken";
import mongoose from "mongoose";
connect();
import { useDispatch } from 'react-redux';
export async function POST(request) {
    try {
        // Parse request body
        const reqBody = await request.json();
        const { prodid } = reqBody; // Product ID to delete

        // Decode user token to get userId
        const userId = await decodeToken(request);

        // Fetch user from the database
        const user = await User.findOne({ _id: userId }).select("-password");


        // If user is not found, return an error response
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }



        // Use MongoDB `$pull` operator to remove product directly

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { products: { id: prodid } } }, // Convert prodid to ObjectId
            { new: true, runValidators: true }
        );


        // If update fails, return an error response
        if (!updatedUser) {
            return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
        }
        


        // Debugging: Log updated products
        console.log("After deletion:", JSON.stringify(updatedUser.products, null, 2));

        // Return success response
        return NextResponse.json({ message: "Product deleted successfully", data: updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Error during product deletion:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
