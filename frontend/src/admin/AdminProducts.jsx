import React, { useState } from "react";
import Slidebar from "./Slidebar";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AdminProducts = () => {

    const [Product, setProduct] = useState([])



    const fetchData = async () => {
        try {
            const response = await fetch("/App/ManageProduct", {
                method: "GET",
            })

            const result = await response.json();
            console.log(result.data)
            setProduct(result.data);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {

        fetchData();
    }, []

    )

    // console.log(Product[0].ProductImage);


    async function handleDelete(id) {
        // console.log(id)

        try {
            const response = await fetch(`/App/DeleteProduct/${id}`, {
                method: "DELETE",
            })

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message)
                fetchData();

            }
            // console.log(result);
        } catch (error) {
            toast.error(result.message)

        }

    }

    console.log(Product)

    return (
        <div className="flex mt-16">
            <Slidebar />
            <div className="flex-1 p-10 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Manage Products 📊
                </h1>


                {
                    Product.length == 0 ?


                        <div className="bg-slate-400 w-full   min-h-96 p-6 items-center flex justify-center rounded-md flex-col gap-3">
                            <h1 className="font-bold ">No Product Availabe Here</h1>
                            <Link to={"/admin/add-product"}>
                                <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-5 rounded-md">Add product</button></Link>
                        </div>
                        : Product.length != 0 ?
                            <div>
                                <Link to={"/admin/add-product"}>
                                    <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-5 rounded-md">Add product</button>
                                </Link>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">


                                    {Product.map((items) => (
                                        <div key={items._id} className="bg-white rounded-xl shadow p-4 hover:shadow-xl transition">
                                            <img
                                                src={`/uploads/${items.ProductImage}`}
                                                alt="Product Image"
                                                className="w-full h-40 object-cover rounded-md mb-4 border"
                                            />
                                            <h3 className="text-xl font-semibold text-gray-700">
                                                {items.ProductName}
                                            </h3>
                                            <p className="text-sm text-gray-600">Category:- {items.Catagory}</p>
                                            <p className="text-green-500 font-bold mt-1">₹{items.ProductPrice}</p>

                                            {(items.ProductStatus === "Out-Of-Stock") ? <p className="text-red-500 font-bold mt-1">{items.ProductStatus}</p> :
                                                <p className="text-green-500 font-bold mt-1">{items.ProductStatus}</p>
                                            }

                                            <div className="flex flex-col sm:flex-row justify-between mt-4">
                                                <Link
                                                    to={`/admin/edit-product/${items._id}`}
                                                    className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                                                >
                                                    <FaEdit /> Edit
                                                </Link>
                                                <Link className="flex items-center gap-2 text-red-500 hover:text-red-700"
                                                    onClick={() => {
                                                        handleDelete(items._id);
                                                    }}
                                                >

                                                    <FaTrash /> Delete
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div> :

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">


                                {Product.map((items, index) => (
                                    <div key={items._id} className="bg-white rounded-xl shadow p-4 hover:shadow-xl transition">
                                        <img
                                            src={`/uploads/${items.ProductImage}`}
                                            alt="Product Image"
                                            className="w-full h-40 object-cover rounded-md mb-4 border"
                                        />
                                        <h3 className="text-xl font-semibold text-gray-700">
                                            {items.ProductName}
                                        </h3>
                                        <p className="text-sm text-gray-600">Category:- {items.Catagory}</p>
                                        <p className="text-green-500 font-bold mt-1">₹{items.ProductPrice}</p>

                                        {(items.ProductStatus === "Out-Of-Stock") ? <p className="text-red-500 font-bold mt-1">{items.ProductStatus}</p> :
                                            <p className="text-green-500 font-bold mt-1">{items.ProductStatus}</p>
                                        }

                                        <div className="flex flex-col sm:flex-row justify-between mt-4">
                                            <Link
                                                to={`/admin/edit-product/${items._id}`}
                                                className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                                            >
                                                <FaEdit /> Edit
                                            </Link>
                                            <Link className="flex items-center gap-2 text-red-500 hover:text-red-700"
                                                onClick={() => {
                                                    handleDelete(items._id);
                                                }}
                                            >

                                                <FaTrash /> Delete
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                }
            </div>

        </div >
    );
};

export default AdminProducts;

