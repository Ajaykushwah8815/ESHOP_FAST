const user = require("../models/user");
const UserCollection = require("../models/user")
const bcrypt = require("bcrypt");
const cartCollection = require("../models/cart")
const jwt = require("jsonwebtoken")
const RazorPay = require("razorpay")
const crypto = require("crypto")
const OrderCollectiom = require("../models/order")

const regDataController = async (req, res) => {


    try {
        // console.log(req.body);
        const { fname, email, pass } = req.body;

        if (!fname || !email || !pass) {
            res.status(400).json({ message: "All fields are required" })


        }

        const Exist = await UserCollection.findOne({ userEmail: email })
        if (Exist) {
            return res.status(500).json({ message: "Email Already Exist" })

        }


        const hashpass = await bcrypt.hash(pass, 10);
        const record = new UserCollection({

            userName: fname,
            userEmail: email,
            userPassword: hashpass,
        });


        await record.save();
        res.status(200).json({ message: "Successfully Register" })

    } catch (error) {
        res.status(500).json({ message: "Internal error" })
    }

}

const LoginController = async (req, res) => {
    // console.log(req.body);

    try {
        const { email, pass } = req.body;

        const JWT_SECRET = "Ajay";


        const UserCheck = await UserCollection.findOne({ userEmail: email })

        if (!UserCheck) {
            return res.status(400).json({ message: "Email not exist" })
        }
        const matchpassword = await bcrypt.compare(pass, UserCheck.userPassword)


        if (!matchpassword) {
            return res.status(400).json({ message: "password not exist" })
        }

        const Token = jwt.sign({
            id: UserCheck._id,

        }, JWT_SECRET, { expiresIn: "1h" })
        // console.log(Token)

        res.status(200).json({ message: "Successfully Login", data: UserCheck, token: Token })

    } catch (error) {
        res.status(500).json({ message: "Internal error" })

    }

}

const cartSaveController = async (req, res) => {
    try {
        const { userId, cartItems, totalPrice, totalQuantity } = req.body;
        // console.log(userId)
        let cart = await cartCollection.findOne({ userId });
        // console.log(cart)

        if (cart) {
            cart.cartItems = cartItems;
            cart.totalPrice = totalPrice;
            cart.totalQuantity = totalQuantity;
            await cart.save();
        } else {

            cart = new cartCollection({
                userId,
                cartItems,
                totalPrice,
                totalQuantity,
            });


            await cart.save();
        }

        res.status(200).json({ message: "Cart Save Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error..😓" });
    }
}

const fetchCartController = async (req, res) => {
    try {
        const userId = (req.params.abc);
        3
        let cart = await cartCollection.findOne({ userId });
        // console.log(cart);
        res.status(200).json({ data: cart })
    } catch (error) {
        console.log("error to fetch data")
    }

}


const razorpay = new RazorPay({
    // key_id: process.env.RAZORPAY_KEY_ID,
    // key_secret: process.env.RAZORPAY_KEY_SECRET,
    key_id: "rzp_test_S5mGZOrU8ML5jz",
    key_secret: "4GEahEaA7GKa4CFMnBusuBiG"
    // RAZORPAY_KEY_ID=rzp_test_S5mGZOrU8ML5jz,
    // RAZORPAY_KEY_SECRET=4GEahEaA7GKa4CFMnBusuBiG,
});
const orderController = async (req, res) => {
    const { amount, currency, receipt } = req.body;
    const options = {
        amount: amount * 100,
        currency,
        receipt,
    }

    try {
        // console.log(razorpay.orders.create(options))


        const Order = await razorpay.orders.create(options);

        // console.log(Order)
        res.json(Order);
    } catch (error) {
        res.json(`${error}internal order server error`)
        // console.log(error)
    }
}

const verifyController = async (req, res) => {
    const key_secret = "4GEahEaA7GKa4CFMnBusuBiG";


    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, userId, CartItems, TotalPrice, TotalQuantity } = req.body;
    const hmac = crypto.createHmac("sha256", key_secret)
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generate_Signature = hmac.digest("hex");
    if (generate_Signature === razorpay_signature) {

        const record = new OrderCollectiom({
            UserId: userId,
            OrderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            amount: amount,
            status: "paid",
            cartItems: CartItems,
            totalPrice: TotalPrice,
            totalQunatity: TotalQuantity,
        });
        await record.save()

        await res.json({ success: true, message: "payment verify successfully" })
    } else {
        res.json({ success: false, message: "payment verify failed" })

    }
}



module.exports = {
    regDataController,
    LoginController,
    cartSaveController,
    fetchCartController,
    orderController,
    verifyController,
}