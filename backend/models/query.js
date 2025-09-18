const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    UName: { type: String, require: true },
    UEmail: { type: String, require: true },
    UQuery: { type: String, require: true },
    QueryStatus: { type: String, default: "Unread" },

}, { timestamps: true })


module.exports = model("AllQuery", UserSchema);