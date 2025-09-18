const express = require("express");
const App = express();
const Api = require("./routes/Api")
App.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/eshop").then(() => {
    console.log("Successfully connect to DB ")
}).catch((error) => {
    console.log(error)
})

App.use(express.static("public"));
App.use("/App", Api)

let port = process.env.port || 5000;
App.listen(port, () => {
    console.log(`server is running on port no ${port}`)
})




