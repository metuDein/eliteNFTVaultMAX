import User from "@/models/Users";
import { dbConn } from "@/utils/database";
import { NextResponse } from "next/server";



export async function PATCH(req) {
    const { id, balance } = await req.json()

    if (!id) return NextResponse.json({ message: 'no user id' }, { status: 400 })

    try {
        await dbConn()

        const user = await User.findOne({ _id: id }).exec()

        if (!user) return NextResponse.json({ message: 'user not found' }, { status: 400 })


        if (balance) user.balance = balance


        await user.save()

        return NextResponse.json({ message: 'user updated' }, { status: 200 })

    } catch (error) {
        console.log(error.name, ": ", error.message)
        return NextResponse.json({ message: 'failed to connect' }, { status: 500 })
    }
}