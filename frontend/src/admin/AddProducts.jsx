import React, { useState } from "react";
import Slidebar from "./Slidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
    const navigate = useNavigate();
    const [form, setform] = useState({ Pname: "", Price: "", Cat: "" });
    const [image, setimage] = useState("");

    async function handleForm(e) {
        e.preventDefault();


        const formdata = new FormData();
        formdata.append("Pname", form.Pname)
        formdata.append("Price", form.Price)
        formdata.append("Cat", form.Cat)
        formdata.append("Pimage", image)
        // console.log(image)
        console.log(formdata);
        const response = await fetch("/App/AddProduct", {
            method: "POST",

            body: formdata,
        })

        const result = await response.json();


        if (response.ok) {
            toast.success(result.message);
            navigate("/admin/products")

        } else {
            toast.error(result.message);
        }



    }

    function handleChange(e) {
        setform({ ...form, [e.target.name]: e.target.value });

    }

    return (
        <div className="flex mt-16">
            <Slidebar />
            <div className="flex-1 p-10 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Add Products 💹
                </h1>
                <button
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                    onClick={() => {
                        navigate("/admin/products");
                    }}
                >
                    Back
                </button>
                <form
                    encType="multipart/form-data"
                    onSubmit={handleForm}
                    action=""
                    className="bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto space-y-6"
                >
                    <label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="Pname"
                        onChange={handleChange}
                        required
                        id=""

                        placeholder="e.g Freash Fruits"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        Price ₹
                    </label>
                    <input
                        type="number"
                        name="Price"
                        onChange={handleChange}
                        id=""
                        required

                        placeholder="e.g 999"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        Categorys
                    </label>
                    <select
                        name="Cat"
                        required
                        onChange={handleChange}


                        id=""
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">---Select---</option>
                        <option value="cafe">Cafe</option>
                        <option value="home">Home</option>
                        <option value="toys">Toys</option>
                        <option value="freash">Freash</option>
                        <option value="electronics">Electronics</option>
                        <option value="mobile">Mobile</option>
                        <option value="beauty">Beauty</option>
                    </select>
                    <label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        Product Image
                    </label>
                    <input
                        type="file"
                        name=""
                        onChange={(e) => {
                            setimage(e.target.files[0]);
                        }}
                        id=""
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none "
                    />
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProducts;