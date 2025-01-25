import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { dbConn } from "@/utils/database";
import User from "@/models/Users"
import { NextResponse } from "next/server";

const handler = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
    },
    pages: {
        signIn: '/login',
        // signOut: '/login'
    },
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {}
            },
            async authorize(credentials, req) {
                await dbConn()

                const user = await User.findOne({ username: credentials.username }).exec()
                if (!user) {
                    throw new Error(JSON.stringify({ code: 404, message: "user doesn't exist" }));
                }

                const pwdMatch = user.password === credentials.password

                if (pwdMatch) {
                    return {
                        name: user._id,
                        email: user.email
                    }
                } else {
                    throw new Error(JSON.stringify({ code: 401, message: "Incorrect password" }));
                }
            }
        })
    ]
})

export { handler as GET, handler as POST }