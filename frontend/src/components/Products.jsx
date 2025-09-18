import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/CartSlice";
import Catagory from "./Catagory"

const Products = () => {


    const [Product, setProduct] = useState([])
    const [SeleCatagory, setSeleCotagory] = useState("All")

    const dispatch = useDispatch();
    console.log(SeleCatagory)

    const fetchData = async () => {
        try {
            const response = await fetch(`/App/HomeShowProduct?catagory=${SeleCatagory}`, {
                method: "GET",
            })

            const result = await response.json();

            // console.log(result.data)
            setProduct(result.data);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        // console.log("pro useeffect")
        fetchData();
    }, [SeleCatagory]

    )

    // console.log(Product)
    return (
        <section className="py-10 px-6 max-w-7xl mx-auto">
            <Catagory OnselectCatagory={setSeleCotagory}></Catagory>
            <h2 className="text-2xl font-semibold text-gray-600 mb-6">
                Treading Products 🔥
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7">
                {Product.map((item) => (
                    <div class="max-w-sm bg-slate-100 p-6 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-lg transition duration-300">
                        <img
                            src={`/uploads/${item.ProductImage}`}
                            alt="ProductImage"
                            className="w-full h-32 object-cover rounded"
                        />
                        <h1 className="mt-2 font-semibold text-black-700">
                            {item.ProductName}
                        </h1>
                        <h3 className="mt-2 font-medium text-gray-700">
                            {item.Catagory}
                        </h3>
                        <p className="text-green-600 font-bold">₹ {item.ProductPrice}</p>
                        <button className="mt-2 w-full bg-green-500 text-white py-1 rounded hover:bg-green-900"
                            onClick={() => {
                                dispatch(addToCart(item));
                            }}
                        >
                            Add To Cart
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Products;