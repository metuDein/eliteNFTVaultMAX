import { Schema, models, model } from "mongoose"


const NotificationSchema = new Schema({
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        default: ""
    },
    body: {
        type: String,
        default: ''
    },
},
    {
        timestamps: true
    })

const Notification = models.Notification || model('Notification', NotificationSchema)
export default Notification