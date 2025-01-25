import mongoose from "mongoose";


let isConnected = false
export const dbConn = async () => {

    mongoose.set('strictQuery', true)
    if (!isConnected) {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName: 'ethers_masterpieceDB',
            })

            isConnected = true
            console.log('Connected to database');


        } catch (error) {
            console.error("Couldn't connect to the database", error)
            process.exit()
        }
    } else {
        console.log("Already connected to database")
    }


}