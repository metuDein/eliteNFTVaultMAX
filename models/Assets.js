import { Schema, model, models } from "mongoose";

const assetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    collectionName: {
        type: Schema.Types.ObjectId,
        ref: 'NftColletion'
    },
    image: String,
    public_id: String,
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    supply: {
        type: Number,
        default: 1
    },
    category: {
        type: String,
        default: 'arts'
    },
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    blockChain: String
}, {
    timestamps: true
})

const Asset = models.NftAsset || model('NftAsset', assetSchema)
export default Asset