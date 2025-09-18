const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    userName: { type: String, require: true },
    userEmail: { type: String, require: true },
    userPassword: { type: String, require: true },
}, { timestamps: true })

module.exports = model("User", UserSchema);