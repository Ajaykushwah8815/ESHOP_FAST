const mongoose = require("mongoose")
const { Schema, model } = mongoose



const OrderSchema = new Schema({

    UserId: String,
    OrderId: String,
    paymentId: String,
    signature: String,
    amount: Number,
    status: { type: String, default: "Pending" },
    createAt: { type: Date, default: Date.now() },
    cartItems: [],
    totalPrice: Number,
    totalQunatity: Number,


})
module.exports = model("order", OrderSchema)