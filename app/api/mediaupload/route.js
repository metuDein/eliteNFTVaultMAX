import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req) {
    const { image } = await req.json()

    if (!image) {
        return NextResponse.json({ message: 'image file is required.' }, { status: 400 })
    }

    let imageURL;
    const uid = Date.now()
    try {
        await cloudinary.uploader.upload(
            image,
            { public_id: uid },
        ).then((result) => {
            console.log(result.secure_url)
            imageURL = result.secure_url
        })
        return NextResponse.json({ imageURL, uid }, { status: 201 })
    } catch (error) {
        console.log(`${error.name} : ${error.message}`)
        return NextResponse.json({ message: 'image upload failed.' }, { status: 500 })
    }
}