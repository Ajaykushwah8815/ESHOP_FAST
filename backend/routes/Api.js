const express = require("express");
const Api = express().router;
const UserController = require("../controller/user")
const AdminController = require("../controller/admin");
const multer = require("../multer/multer");
const auth = require("../multer/auth");

Api.get("/", (req, res) => {
    res.send("Hello i am Api")
});

let data = {
    name: "Ajay",
    Age: 50,
    class: "B-tech",
    course: "Computer"
}


Api.get("/data", (req, res) => {
    res.send(data);
})
Api.post("/regdata", UserController.regDataController);

Api.post("/LoginUser", UserController.LoginController)

Api.post("/AddProduct", multer.single("Pimage"), AdminController.AddProductController)

Api.get("/ManageProduct", AdminController.AdminAllProductData)

Api.delete("/DeleteProduct/:abc", AdminController.DeleteProductController)

Api.get("/getEditValue/:abc", AdminController.EditProductController)

Api.put("/UpdateData/:abc", AdminController.UpdateDataController)

Api.post("/UserAllQuery", AdminController.AddQueryController)
Api.get("/getAllquery", AdminController.getQueryController)

Api.delete("/deleteQuery/:abc", AdminController.DeletQueryController)
Api.get("/getQuerytoReply/:abc", AdminController.findQueryController)

Api.post("/mailReplyQuery/:abc", AdminController.ReplyQueryController)

Api.get("/HomeShowProduct", AdminController.HomeShowProductController)
Api.post("/cart/save", auth, UserController.cartSaveController)
Api.get("/cart/data/:abc", auth, UserController.fetchCartController)
Api.get("/Search", AdminController.SearchDataController)
Api.post("/create-order", UserController.orderController)
Api.post("/verify", auth, UserController.verifyController)
Api.get("/admin-order/:abc", AdminController.UserOrderController)
Api.delete("/cencel-order/:abc", AdminController.CencelOrderController)
Api.delete("/cencel-one-order/:id/:user", AdminController.CencelOrderOneController)
module.exports = Api;

