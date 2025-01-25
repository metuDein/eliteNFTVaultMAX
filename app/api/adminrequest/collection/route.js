import Collection from "@/models/Collections";
import { dbConn } from "@/utils/database";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    await dbConn()
    try {
        const { id, gasfeeamount, withdrawalFee, gasState } = await req.json()

        if (!id) {
            return NextResponse.json({ message: 'update failed:id required' }, { status: 400 })
        }

        const collection = await Collection.findOne({ _id: id }).exec()
        if (!collection) {
            return NextResponse.json({ message: 'update failed:collection not found' }, { status: 404 })
        }

        if (gasfeeamount) collection.gasfeeamount = gasfeeamount
        if (withdrawalFee) collection.withdrawalFee = withdrawalFee
        if (gasState) collection.gasFee = gasState

        await collection.save()

        return NextResponse.json({ message: 'update successful' }, { status: 200 })

    } catch (error) {
        console.log(error.name, ": ", error.message)
        return NextResponse.json({ message: 'update failed' }, { status: 500 })
    }

}
export async function DELETE(req) {
    await dbConn()

    try {
        const { id } = await req.json()

        if (!id) {
            return NextResponse.json({ message: 'delete failed:id required' }, { status: 400 })
        }

        const collection = await Collection.findOneAndDelete({ _id: id })
        if (!collection) {
            return NextResponse.json({ message: 'delete failed:collection not found' }, { status: 204 })
        }
        return NextResponse.json({ message: 'delete successful' }, { status: 200 })

    } catch (error) {
        console.log(error.name, ": ", error.message)
        return NextResponse.json({ message: 'update failed' }, { status: 500 })
    }

}