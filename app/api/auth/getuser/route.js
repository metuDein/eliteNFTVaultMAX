import { getServerSession } from "next-auth";
import { dbConn } from "@/utils/database";
import { NextResponse } from 'next/server'
import User from "@/models/Users";

export async function GET() {
    const session = await getServerSession()

    await dbConn()
    try {
        const user = await User.findOne({ _id: session.user.name }).exec()
        if (!user) return NextResponse.json({ message: 'user not found.' }, { status: 404 })

        return NextResponse.json({ user }, { status: 200 })

    } catch (error) {
        console.log(`${error.name} : ${error.message}`)
        return NextResponse.json({ message: 'could not get user data.' }, { status: 500 })
    }

}