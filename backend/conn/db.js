import mongoose from "mongoose";

const connection = async () => {
    try {
        await mongoose.connect(`${process.env.DB_STRING}`)
        console.log("CONNECTED")
    } catch (error) {
        console.log("error in the database connection")
    }
}
export default connection