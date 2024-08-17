import mongoose from "mongoose";
const booksSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
const Books = mongoose.model("Books", booksSchema)
export default Books