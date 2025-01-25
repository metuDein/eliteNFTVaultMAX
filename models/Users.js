import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        defualt: ''
    },
    image: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Admin: Number
    },
    walletAddress: {
        type: String,
        default: ''
    },
    privateKey: {
        type: String,
        default: ''
    },
    apiKey: {
        type: String,
        default: ''
    },
    apiSecret: {
        type: String,
        default: ''
    },
    balance: {
        type: Number,
        default: 0
    },
    public_id: String,
    resetPasswordToken: {
        type: String,
        default: ''
    },
    resetPasswordTokenExpiration: {
        type: String,
        default: ''
    },
    bio: String,
    walletProvider: String
}, {
    timestamps: true
})

const User = models.User || model('User', userSchema)
export default User