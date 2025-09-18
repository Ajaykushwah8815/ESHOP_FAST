import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { deleteCart, carttotalPrice, increament, decreament, cartsave, fetchCartData } from "../features/CartSlice";


const Cart = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selector = useSelector((state) => { return state.Cart })

    const { CartItems, TotalPrice, TotalQuantity } = selector;
    // useEffect(() => {

    // }, [selector, dispatch])


    const token = localStorage.getItem("token")


    useEffect(() => {
        dispatch(carttotalPrice());
    }, [CartItems, dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if (CartItems.length > 0 && userId && token) {
            // console.log(CartItems.length)
            dispatch(cartsave({


                userId: userId,
                cartItems: CartItems,
                totalPrice: TotalPrice,

                totalQuantity: TotalQuantity,
            }));
        }
    }, [CartItems, TotalPrice, TotalQuantity, dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem("user")
        let token = localStorage.getItem("token");


        if (!token) {
            toast.error("Please Login to access your cart");
            navigate("/Login");
            return;
        }

        else if (userId) {
            const result = dispatch(fetchCartData(userId))
            console.log(userId)
            console.log("run")
        }


    }, [dispatch, navigate])

    // xmklnjzx

    // useEffect(() => {
    //     let userId = localStorage.getItem("user");
    //     let token = localStorage.getItem("token");

    //     if (token && userId && cartData.length > 0) {
    //         dispatch(
    //             saveCart({
    //                 userId: userId,
    //                 cartItems: cartData,
    //                 totalPrice: cartAllValue.TotalPrice,
    //                 totalQuantity: cartAllValue.TotalQuantity,
    //             })
    //         );
    //     }
    // }, [cartData, cartAllValue, dispatch]);

    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    //     let userId = localStorage.getItem("user");

    //     if (!token) {
    //         toast.error("Please Login to access your cart");
    //         navigate("/login");
    //         return;
    //     }

    //     if (userId) {
    //         dispatch(fetchCart(userId));
    //         setCheckingAuth(false);
    //     } else {
    //         setCheckingAuth(false);
    //     }
    // }, [dispatch, navigate]);


    async function handlePayment() {
        const amount = TotalPrice;
        const currency = 'INR';
        const receipt = "receipt#1"


        const response = await fetch("/App/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({
                amount: amount,
                currency: currency,
                receipt: receipt
            })
        })
        const result = await response.json();
        console.log(result);
        const options = {
            key: "rzp_test_S5mGZOrU8ML5jz", // Replace with your RazorPay Key ID
            amount: result.amount,
            currency: result.currency,
            name: "Eshop",
            description: "Test Transaction",
            order_id: result.id,
            handler: (response) => {
                const token = localStorage.getItem("token")
                const userId = localStorage.getItem("user")
                fetch("/App/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,

                    },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        amount,
                        userId,
                        CartItems,
                        TotalPrice,
                        TotalQuantity,
                    }),
                }).then((res) => {
                    return res.json();
                }).then((result) => {
                    if (result.success == true) {
                        toast.success("payment Successfully")
                        navigate("/admin/admin-order")
                    } else {
                        toast.error("payment failed or expire Please login again")
                        navigate("/Login")


                    }
                })
            },
            prefill: {
                name: "Ajay Kushwah",
                email: "john.doe@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },

        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();


    }




    return (

        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            {token ? <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg relative overflow-y-auto max-h-[90vh] mx-4">
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                >
                    <FaTimes />
                </button>
                <h2 className="text-2xl font-bold text-green-500 text-center mb-4 underline">
                    Your Cart 🛒
                </h2>
                <ul className="divide-y divide-gray-300">
                    {CartItems.map((items) => {

                        return <li className="flex items-center gap-5 py-4">
                            <img
                                src={`/uploads/${items.ProductImage}`}
                                alt="ProductImage"
                                className="w-16 h-16 object-cover rounded border"
                            />
                            <div className="flex-1 ">
                                <h3 className="font-semibold text-gray-700">{items.Catagory}</h3>
                                <h3 className="font-semibold text-blue-700">{items.ProductName}</h3>

                                <p className="text-sm text-green-500">₹ {items.ProductPrice}</p>
                                <div className="flex items-center mt-2 gap-2">
                                    <button className="px-2 py-1 bg-green-200 rounded hover:bg-green-400"
                                        onClick={() => {

                                            dispatch(decreament(items._id))
                                        }}
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className="px-2">{items.quantity}</span>
                                    <button className="px-2 py-1 bg-green-200 rounded hover:bg-green-400"
                                        onClick={() => {
                                            dispatch(increament(items._id))
                                        }}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                            {/* <div className="flex items-center justify-between flex-row  "> */}
                            <button className=" bg-green-400  hover:bg-red-400 font-semibold  rounded-lg shadow-2xl hover:cursor-pointer  px-1 py-1"

                                onClick={() => {
                                    dispatch(deleteCart(items._id));
                                }}
                            >
                                Delete
                            </button>
                            <p className="font-bold text-green-500">₹{items.ProductPrice * items.quantity}</p>
                            {/* </div> */}
                        </li>

                    })}
                </ul>
                {/* Total */}
                <div className="mt-6 text-right">
                    <p className="text-lg font-semibold text-gray-800">
                        Total:- <span className="text-green-500">₹{TotalPrice}</span>
                    </p>
                    <button onClick={() => {
                        if (TotalPrice > 0) {
                            handlePayment()
                        } else {
                            toast.error("Low balance")
                        }
                    }}
                        className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                        Go-To-Payment
                    </button>
                </div>
            </div> : < div className="text-6xl text-white">loading...</div>}

        </div>
    );
};

export default Cart;