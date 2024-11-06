import { connect } from "../../../../dbconfig/dbConfig"
import User from "../../../../model/users"
import { NextResponse, NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"


connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email: email });
        console.log(user)
        if (!user) {
            return NextResponse.json({ error: "Email does not exist enter cprrect email" }, { status: 500 })
        }

        const validpassword = await bcryptjs.compare(password, user.password)
        if (!validpassword) {
            return NextResponse.json({ error: "Incorrect Password" }, { status: 500 })
        }

        // tokendata
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //token generation
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })


        //send this token secret to user cookies 
        const response = NextResponse.json({ message: "Successful login", data: user }, { status: 200 })
        response.cookies.set("token", token, { httpOnly: true })
        return response;

        //http true means :httpOnly: true means the cookie cannot be accessed or modified by JavaScript on the client side, 
        //enhancing security against certain attacks.

    }
    catch (error) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

