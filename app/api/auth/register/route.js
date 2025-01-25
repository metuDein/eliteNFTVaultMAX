import { dbConn } from "@/utils/database";
import User from "@/models/Users";
import { NextResponse } from "next/server";



export async function POST(request) {
    await dbConn()
    try {
        const { username, email, password } = await request.json()

        const foundUser = await User.findOne({ username }).exec()

        if (foundUser) return NextResponse.json({ error: 'duplicate username found.', }, { status: 409 })

        const user = await User.create({ username, email, password })
        return NextResponse.json({ success: 'account created', user }, { status: 200 })


    } catch (error) {
        console.log(error.name, ':', error.message);

        return NextResponse.json({ error: error.message, }, { status: 500 })
    }
}