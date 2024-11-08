import { connect } from "../../../../dbconfig/dbConfig"
import User from "../../../../model/users"
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";

connect();
console.group(1)

export async function POST(request) {


    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        const Userdata = await User.findOne({ email });

        if (Userdata) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(password, salt);

        const newUser = {
            username: username,
            email: email,
            password: hashpassword,
            products: [],
            transactions: []
        }

        const registerUser = await User.create(newUser)
        console.log(registerUser)
        return NextResponse.json({ message: "UserSuccessfully Registered", registerUser })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }


}