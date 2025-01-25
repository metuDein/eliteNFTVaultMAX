import { dbConn } from "@/utils/database";
import User from "@/models/Users";
import Collection from "@/models/Collections";
import Asset from "@/models/Assets";
import Notification from "@/models/Notifications";
import { NextResponse } from "next/server";

export async function GET(req) {
    await dbConn()
    try {
        const users = await User.find({})
        if (!users) return NextResponse.json({ message: 'no users yet' }, { status: 204 })
        const assets = await Asset.find({}).populate(['owner', 'collectionName'])
        if (!assets) return NextResponse.json({ message: 'no assets yet' }, { status: 204 })
        const collections = await Collection.find({}).populate('owner')
        if (!collections) return NextResponse.json({ message: 'no collections yet' }, { status: 204 })
        const notifications = await Notification.find({}).populate(['receiver', 'sender'])
        if (!notifications) return NextResponse.json({ message: 'no notifications yet' }, { status: 204 })

        return NextResponse.json({ users, assets, collections, notifications }, { status: 200 })
    } catch (error) {
        console.log(`${error.name} : ${error.message}`)
        return NextResponse.json({ message: 'error fetching app data' }, { status: 500 })
    }
}