const AdminController = require("../models/product") // product here
const UserQueryController = require("../models/query")
const nodemailer = require("nodemailer");
const UserOrder = require("../models/order")
const cartCollection = require("../models/cart")

const AddProductController = async (req, res) => {
    // console.log(req.body);


    try {
        const Pimage = req.file.filename;
        // console.log(Pimage)
        const { Pname, Price, Cat } = req.body;


        const record = new AdminController({
            ProductName: Pname,
            ProductPrice: Price,
            Catagory: Cat.toLowerCase(),
            ProductImage: Pimage,

        })
        // console.log(record)
        await record.save()

        res.status(200).json({ message: "Successfully Insert" })


    } catch (error) {
        res.status(200).json({ message: "Internal error" })
    }






}

const AdminAllProductData = async (req, res) => {
    try {
        const record = await AdminController.find();
        // console.log(record)
        res.status(200).json({ data: record });

    } catch (error) {
        res.status(200).json({ message: "Internal error" })

    }



}


const DeleteProductController = async (req, res) => {

    try {
        const id = req.params.abc;
        await AdminController.findByIdAndDelete(id);

        res.status(200).json({ message: "Successfully Deleted" })
    } catch (error) {

        res.status(400).json({ message: "Server Error" });
    }

}


const EditProductController = async (req, res) => {
    try {
        const id = req.params.abc
        // console.log(id)
        const record = await AdminController.findById(id);
        // console.log(record)
        res.status(200).json({ Data: record });
    } catch (error) {
        console.log("Internal Server");
    }



}


const UpdateDataController = async (req, res) => {
    try {
        const { Pname, Price, Cat, Status } = req.body;
        const id = req.params.abc;
        const UpdateData = await AdminController.findByIdAndUpdate(id, {
            ProductName: Pname,
            ProductPrice: Price,
            Catagory: Cat.toLowerCase(),
            ProductStatus: Status,

        });

        // console.log(UpdateData)

        res.status(200).json({ message: "Successfully Updated" })
    } catch (error) {

        res.status(400).json({ message: "Server Error" });
    }
}


const AddQueryController = async (req, res) => {
    try {
        const { UserName, UserEmail, UserQuery } = req.body;
        const record = new UserQueryController({
            UName: UserName,
            UEmail: UserEmail,
            UQuery: UserQuery,

        })

        await record.save();
        res.status(200).json({ message: "Successfuly Added" })


    } catch (error) {
        res.status(400).json({ message: "Internal Server error" })

    }

}

const getQueryController = async (req, res) => {
    try {
        const data = await UserQueryController.find();
        res.status(200).json({ Data: data });
    } catch (error) {
        console.log("Internal error");
    }


}



const DeletQueryController = async (req, res) => {
    try {
        const id = req.params.abc;
        // console.log(id);
        await UserQueryController.findByIdAndDelete(id)
        res.status(200).json({ message: "Successfuly Deleted" })
    } catch (error) {
        res.status(200).json({ message: "Internal server error" })

    }


}

const findQueryController = async (req, res) => {

    try {
        const id = req.params.abc;
        const data = await UserQueryController.findById(id);
        res.status(200).json({ Data: data })


    } catch (error) {
        console.log("Error backend")

    }

}


const ReplyQueryController = async (req, res) => {

    // console.log(req.body);

    try {

        const id = req.params.abc;
        // console.log(id)
        const { to, sub, body } = req.body;
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "ajaykushwah3835@gmail.com",
                pass: "aurl zdru abcy rhba",
            },
        });

        const info = transporter.sendMail({
            from: '"eShop" <eshoptechnology@gmail.com>',
            to: to,
            subject: sub,
            text: body, // plain‑text body
            html: body, // HTML body
        });

        await UserQueryController.findByIdAndUpdate(id, {

            QueryStatus: "Read",
        });

        res.status(200).json({ message: "Successfuly Sent" })
    } catch (error) {

        res.status(200).json({ message: "Internal server error" })
        console.log(error)

    }
}
const HomeShowProductController = async (req, res) => {
    const catagory = (req.query.catagory)
    // console.log(catagory)
    try {
        let filter = { ProductStatus: "In-Stock" };


        if (catagory && catagory !== "All") {
            filter.Catagory = catagory.toLowerCase();
        }


        const record = await AdminController.find(filter);

        // console.log(record)
        res.status(200).json({ data: record });

    } catch (error) {
        res.status(200).json({ message: "Internal error" })

    };






}


const SearchDataController = async (req, res) => {
    // console.log(req.query.q)
    try {
        const QuerySearch = req.query.q;

        const result = await AdminController.find({
            ProductName: { $regex: QuerySearch, $options: "i" },
            ProductStatus: "In-Stock",
        });
        // console.log(result)
        // console.log(result.length)
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(200).json({ message: "Internal error" })


    }


}


const UserOrderController = async (req, res) => {

    const userId = req.params.abc;
    // console.log(userId)

    try {


        const orders = await UserOrder.find({ UserId: userId })
        // console.log(orders)
        res.status(200).json({ Data: orders })



    } catch (error) {
        res.status(200).json({ message: "Internal error" })
    }


}



const CencelOrderController = async (req, res) => {
    const id = (req.params.abc);
    try {
        const deletedOrders = await UserOrder.deleteMany({ UserId: id });
        // console.log(deletedOrders)

        if (deletedOrders.deletedCount === 0) {
            return res.status(404).json({ message: "No orders found " });
        }

        res.status(200).json({ message: "Order(s) cancelled successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

const CencelOrderOneController = async (req, res) => {
    const { id, user } = req.params;
    console.log(id, user)
    try {
        const result = await UserOrder.updateOne(
            { UserId: user },
            { $pull: { cartItems: { _id: id } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Item not found or already deleted" });
        }

        res.status(200).json({ message: "Order item cancelled successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};





module.exports = {
    AddProductController,
    AdminAllProductData,
    DeleteProductController,
    EditProductController,
    UpdateDataController,
    AddQueryController,
    getQueryController,
    DeletQueryController,
    findQueryController,
    ReplyQueryController,
    HomeShowProductController,
    SearchDataController,
    UserOrderController,
    CencelOrderController,
    CencelOrderOneController,
}