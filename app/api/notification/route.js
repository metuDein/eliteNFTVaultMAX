import Notification from "@/models/Notifications";
import { dbConn } from "@/utils/database";
import { NextResponse } from "next/server";


export async function POST(req) {
    await dbConn()
    try {
        const { receiver, sender, email, subject, body } = await req.json()

        if (!receiver || !sender || !email) {
            return NextResponse.json({ message: 'all fields required' }, { status: 400 })
        }

        await Notification.create({
            receiver,
            sender,
            email,
            subject,
            body
        })


        return NextResponse.json({ message: 'Mesage sent' }, { status: 200 })

    } catch (error) {
        console.log(error.name, ": ", error.message);

        return NextResponse.json({ message: 'failed to send message' }, { status: 500 })
    }
}