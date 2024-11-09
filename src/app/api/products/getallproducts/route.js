import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";

connect();

export async function GET(request) {
    try {
        const allproducts = await User.findOne({}, { products: 1, email: 1, _id: 0 });

        // If no products found, handle this case
        if (!allproducts || !allproducts.products) {
            return NextResponse.json({ error: "No products found" }, { status: 404 });
        }

        // Add email to each product object
        const productsWithEmail = allproducts.products.map(product => ({
            ...product,
            selleremail: allproducts.email // Add the email from the user document
        }));

        console.log(productsWithEmail);
        return NextResponse.json({ data: productsWithEmail }, { status: 200 });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
