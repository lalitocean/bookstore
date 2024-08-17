import Books from "../models/books.js";
import Order from "../models/order.js";
import User from "../models/user.js";
import authntication2 from "./userAuth2.js";
import express from "express"
const orderrouter = express.Router()

orderrouter.post("/do-order", authntication2, async (req, res) => {
    try {
        const { _id } = req?.user
        const { order } = req.body;
        for (const orderdata of order) {
            // & save order in order model
            const newOrder = new Order({ user: _id, book: orderdata._id })
            const orderdatafromdb = await newOrder.save();
            // & save order in user model 
            await User.findByIdAndUpdate(_id, { $push: { orders: orderdatafromdb._id } })
            // & clearing cart 
            await User.findByIdAndUpdate(_id, { $pull: { cart: orderdata._id } })
        }
        return res.json({
            message: "order placed successfully",
            status: "success"
        })
    } catch (error) {
        console.log(error)
    }
})

// ! get order history for a person/user
orderrouter.get("/get-order-history", authntication2, async (req, res) => {
    try {
        const { _id } = req?.user
        const userdata = await User.findById(_id).populate({
            path: "orders",
            populate: { path: "book" }
        })
        const ordersdata = userdata.orders.reverse()
        return res.json({
            status: "success",
            data: ordersdata
        })
    } catch (error) {
        console.log("error", error)
    }
})

// ! get all orders 
orderrouter.get("/get-all-order", authntication2, async (req, res) => {
    try {
        const userdata = await Order.find()
            .populate({
                path: "user"
            })
            .populate({
                path: "book"
            }).sort({ createdAt: -1 })

        return res.json({
            status: "success",
            data: userdata
        })
    } catch (error) {
        console.log("error in ordergetting", error)
        return res.status(500).json({
            message: "an error occured"
        })
    }
})

// ! update order status ---> admin
orderrouter.put("/update-status/:id", authntication2, async (req, res) => {
    try {
        const { role } = req?.user
        const { id } = req.params;
        if (role === "admin") {
            await Order.findByIdAndUpdate(id, { status: req.body.status })
            return res.json({
                status: "success",
                message: "status updated succesfully "
            })
        }
        return res.status(200).json({
            message: "you don't have permission to change status of the order "
        })

    } catch (error) {
        console.log("error in updating order status", error)
        return res.status(500).json({
            message: "an error occured"
        })
    }
})
export default orderrouter