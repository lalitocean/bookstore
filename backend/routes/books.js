import express from "express";
import authntication2 from "./userAuth2.js";
import Books from "../models/books.js";
const bookrouter = express.Router()

// ^ *******   api endpoints
//! adding book post api  
bookrouter.post("/add-book", authntication2, async (req, res) => {
    try {
        const userrole = req.user.role
        console.log(userrole)
        if (userrole !== "admin") {
            return res.status(400).json({
                message: "you don't have to access this role "
            })
        }
        const { url, title, author, price, desc, language } = req.body
        if (!url && title && author && price && desc && language) {
            return res.status(401).json({
                message: "add all details "
            })
        }
        const bookdata = new Books({ url, title, author, price, desc, language })
        await bookdata.save()
        return res.status(200).json({
            data: bookdata,
            message: "book added"
        })
    } catch (error) {
        return res.status(500).json({
            message: "book added error",
            error: error.message
        })
    }
})
//! updating book put api 
bookrouter.post("/update-book", authntication2, async (req, res) => {
    try {
        const userrole = req.user.role
        const bookid = req.headers
        console.log(userrole)
        if (userrole !== "admin") {
            return res.status(400).json({
                message: "you don't have to access to update the items "
            })
        }
        const { url, title, author, price, desc, language } = req.body
        if (!url && title && author && price && desc && language) {
            return res.status(401).json({
                message: "add all details "
            })
        }
        await Books.findByIdAndUpdate(bookid, { url, title, author, price, desc, language })

        return res.status(200).json({
            data: bookdata,
            message: "book updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "book update error",
            error: error.message
        })
    }
})
//! deleting book delete api
bookrouter.post("/delete-book", authntication2, async (req, res) => {
    try {
        const userrole = req.user.role
        const bookid = req.headers
        console.log(userrole)
        if (userrole !== "admin") {
            return res.status(400).json({
                message: "you don't have to access to update the items "
            })
        }
        await Books.findByIdAndDelete(bookid)
        return res.status(200).json({
            message: "book deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "book update error",
            error: error.message
        })
    }
})

// ! get all books api 
bookrouter.get("/get-all-books", async (req, res) => {
    try {
        const books = await Books.find().sort({ createdAt: -1 })
        return res.status(200).json({
            data: books,
            status: "success"
        })
    } catch (error) {
        return res.status(500).json({
            message: "not avialable to fetch books data",
            error: error.message
        })
    }
})
// ! get recent books api 
bookrouter.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Books.find().sort({ createdAt: -1 }).limit(6)
        return res.status(200).json({
            data: books,
            status: "success"
        })
    } catch (error) {
        return res.status(500).json({
            message: "not avialable to fetch books data",
            error: error.message
        })
    }
})

// ! get book by id api
bookrouter.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params
        const book = await Books.findById(id)
        return res.status(200).json({
            data: book,
            status: "success"
        })
    } catch (error) {
        return res.status(500).json({
            message: "not avialable to fetch books data",
            error: error.message
        })
    }
})

export default bookrouter