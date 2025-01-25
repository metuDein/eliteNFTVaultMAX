import { dbConn } from "@/utils/database";
import Asset from "@/models/Assets";
import { NextResponse } from "next/server";


export async function POST(req) {
    await dbConn()

    try {
        const { name, owner, collection, image_url, image_public_id, price, category, description, supply, blockChain } = await req.json()

        if (!name || !owner || !collection || !image_url || !image_public_id || !price || !category || !description || !supply) {
            return NextResponse.json({ message: 'all fields required.' }, { status: 400 })
        }

        const duplicate = await Asset.findOne({ name }).exec()

        if (duplicate) return NextResponse.json({ message: "this asset already exists" }, { status: 409 })

        const newAsset = await Asset.create({
            name,
            owner,
            collectionName: collection,
            image: image_url,
            public_id: image_public_id,
            price,
            category,
            description,
            supply,
            blockChain
        })

        return NextResponse.json({ newAsset }, { status: 201 })
    } catch (error) {
        console.log(`${error.name} : ${error.message}`)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export async function PATCH(req) {
    await dbConn()
    try {
        const { id, name, price, category, supply, description } = await req.json()
        if (!id) return NextResponse.json({ message: 'id required' }, { status: 400 })

        const asset = await Asset.findOne({ _id: id }).exec()
        if (!id) return NextResponse.json({ message: 'this asset does not exist' }, { status: 404 })

        if (name) asset.name = name
        if (price) asset.price = price
        if (supply) asset.supply = supply
        if (category) asset.category = category
        if (description) asset.price = price

        await asset.save()
        return NextResponse.json({ message: 'Asset updated' }, { status: 200 })

    } catch (error) {
        console.log(`${error.name} : ${error.message}`)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}