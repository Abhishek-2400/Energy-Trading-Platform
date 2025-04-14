import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbconfig/dbConfig";
import User from "../../../../model/users";

export const dynamic = "force-dynamic"; //  disable caching on Vercel

connect();

export async function GET(request) {
    try {
        const allusers = await User.find({}, { products: 1, email: 1, _id: 0 });

        let productsWithSellerMail = allusers.flatMap(({ email, products }) =>
            products.map(product => ({ ...product, selleremail: email }))
        );

        productsWithSellerMail = productsWithSellerMail.filter(
            product => product.tokens > 0
        );

        if (!productsWithSellerMail || productsWithSellerMail.length === 0) {
            return new NextResponse(
                JSON.stringify({ error: "No products found" }),
                {
                    status: 404,
                    headers: {
                        "Cache-Control": "no-store",
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        return new NextResponse(
            JSON.stringify({ data: productsWithSellerMail }),
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store",
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (error) {
        console.error("GET /api/products/getallproducts error:", error.message);
        return new NextResponse(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: {
                    "Cache-Control": "no-store",
                    "Content-Type": "application/json"
                }
            }
        );
    }
}
