const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    ProductName: { type: String, require: true },
    ProductPrice: { type: String, require: true },
    Catagory: { type: String, require: true },
    ProductStatus: { type: String, default: "In-Stock" },
    ProductImage: { type: String, require: true },
}, { timestamps: true })


module.exports = model("Product", UserSchema);