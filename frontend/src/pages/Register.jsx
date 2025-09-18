import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";


const Register = () => {
    const navigate = useNavigate();
    const [isshow, setisshow] = useState(false)


    const [form, setform] = useState({ fname: "", email: "", pass: "" });

    async function handleForm(e) {
        e.preventDefault();
        console.log(form);


        try {
            const response = await fetch("/App/regdata", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
                navigate("/login")

            } else {
                toast.error(result.message);
            }

            console.log(result);
        } catch (error) {
            console.log(error);
        }






    }

    function handleChange(e) {
        setform({ ...form, [e.target.name]: e.target.value });
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative mx-4">
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                >
                    <FaTimes />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-green-600 text-center">
                    Create Your Account..🚀
                </h2>
                <form action="" onSubmit={handleForm}>
                    <label htmlFor="" className="block text-sm text-gray-700 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="fname"
                        onChange={handleChange}
                        placeholder="Mr. Ajay Kushwah"
                        id=""
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <label htmlFor="" className="block text-sm text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="you@example.com"
                        id=""
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <label htmlFor="" className="block text-sm text-gray-700 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={isshow ? "password" : "text"}
                            name="pass"
                            onChange={handleChange}
                            placeholder="*******"
                            id=""
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setisshow(!isshow);
                            }}
                            className="absolute top-4 right-3 text-gray-500 hover:text-green-600"
                        >
                            {isshow ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-800 text-white rounded font-semibold py-2 mt-6"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-center  text-gray-600 mt-5">
                    Already have an account
                    <Link to={"/login"} className="text-green-600 hover:underline ml-3">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

