import { dbConn } from "@/utils/database";
import User from "@/models/Users";
import { NextResponse } from "next/server";


export async function PATCH(request) {
    try {
        await dbConn()

        const { password, token } = await request.json()
        if (!password || !token) {
            return NextResponse.json({ message: "Reset link expired request a new one" }, { status: 401 })
        }

        const user = await User.findOne({ resetPasswordToken: token }).exec()

        if (!user) {
            return NextResponse.json({ message: "Reset link expired request a new one" }, { status: 500 })
        }

        // const date = new Date(user.resetPasswordTokenExpiration);
        // // const unixTimestamp = Math.floor(date.getTime() / 1000); // 
        // // console.log("Unix Timestamp:", unixTimestamp);

        // console.log(Date.now());

        // console.log(Date.now() - date);


        // if (Date.now() - date >= 3600000) {
        //     // throw new Error(JSON.stringify({ code: 401, message: "Reset link expired request a new one" }));
        //     return NextResponse.json({ message: "Reset link expired request a new one" }, { status: 500 })


        // }

        user.password = password
        user.resetPasswordToken = ''
        user.resetPasswordTokenExpiration = ''
        await user.save()

        return NextResponse.json({ success: 'password changed' }, { status: 200 })

    } catch (error) {
        console.log(error.name, ":", error.message)
        return NextResponse.json({ error }, { status: 500 })
    }
}