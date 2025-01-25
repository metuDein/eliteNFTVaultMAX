import { dbConn } from "@/utils/database";
import Collection from "@/models/Collections";
import { NextResponse } from "next/server";


export async function POST(req) {
    await dbConn()

    try {
        const { name, blockChain, image_url, image_public_id, uId } = await req.json()

        if (!name || !blockChain || !image_url || !uId || !image_public_id) {
            return NextResponse.json({ message: 'all fields required' }, { status: '400' })
        }

        const duplicate = await Collection.findOne({ name: name }).exec()

        if (duplicate) return NextResponse.json({ message: 'This collection name already exists' }, { status: '409' })

        const newCollection = await Collection.create({
            name: name,
            blockChain: blockChain,
            banner: image_url,
            public_id: image_public_id,
            owner: uId
        })

        return NextResponse.json({ newCollection }, { status: 201 })
    } catch (error) {
        console.log(`${error.name} : ${error.message}`);
        return NextResponse.json({ message: `${error.name} - ${error.message}` }, { status: 500 })
    }
}