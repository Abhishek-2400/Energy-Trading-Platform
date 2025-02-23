import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";

connect();

export async function GET(request) {
    try {
        const allusers = await User.find({}, { products: 1, email: 1, _id: 0 });

        // Add email to each product object
        const productsWithSellerMail = allusers.flatMap(({ email, products }) =>
            products.map(product => ({ ...product, selleremail: email }))
        );

        // If no products found 
        if (!productsWithSellerMail) {
            return NextResponse.json({ error: "No products found" }, { status: 404 });
        }

        return NextResponse.json({ data: productsWithSellerMail }, { status: 200 });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}