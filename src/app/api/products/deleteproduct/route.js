import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";
import { NextResponse } from "next/server";
import { decodeToken } from "../../../../helpers/decodeToken";
connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { prodid } = reqBody;
        const userId = await decodeToken(request);
        const user = await User.findOne({ _id: userId }).select("-password")

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const products = user.products
        const updatedproducts = products.filter((product) => product.id !== prodid)
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { products: updatedproducts },
            { new: true }
        );
        // Return success response with updated user data
        return NextResponse.json({ message: "Product deleted successfully", data: updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Error during product update:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
