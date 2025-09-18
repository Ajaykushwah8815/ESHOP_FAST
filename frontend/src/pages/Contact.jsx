import React from "react";
import { useState } from "react";
import toaster, { toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

const Contact = () => {

    const navigate = useNavigate();
    const [query, setquery] = useState({ UserName: "", UserEmail: "", UserQuery: "" });

    async function handleform(e) {
        try {
            e.preventDefault();
            // console.log(query);


            const response = await fetch("/App/UserAllQuery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(query)
            })

            const result = await response.json()
            if (response.ok) {
                toast.success(result.message);
                navigate("/admin/admin-query")
                // console.log(response)    

            } else {
                toast.error(result.message);

            }
        } catch (error) {
            console.log(error)
        }

    }




    function handlechange(e) {
        setquery({ ...query, [e.target.name]: e.target.value });
    }




    return (
        <div className="max-w-3xl mx-auto mt-24 p-6 bg-white rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-green-500 mb-4 text-center">
                Query Form
            </h2>
            <form action="" onSubmit={handleform}>
                <label htmlFor="" className="block text-gray-700 font-medium mb-1">
                    Your Name
                </label>
                <input
                    required
                    type="text"
                    name="UserName"
                    onChange={handlechange}
                    id=""
                    placeholder="Your Name..."
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <label htmlFor="" className="block text-gray-700 font-medium mb-1">
                    Your Email
                </label>
                <input
                    required
                    type="Your Email..."
                    name="UserEmail"
                    onChange={handlechange}
                    id=""
                    placeholder="e.g Freash Fruits"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <label htmlFor="" className="block text-gray-700 font-medium mb-1">
                    Your Query...
                </label>
                <textarea
                    required
                    name="UserQuery"
                    onChange={handlechange}
                    id=""
                    placeholder=" Your Query..."
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                ></textarea>

                <button className="w-full bg-green-500 py-2 text-white rounded mt-3 hover:bg-green-700 transition">
                    Submit Query 📧
                </button>

            </form>
        </div>
    );
};

export default Contact;