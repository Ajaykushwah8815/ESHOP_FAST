import React, { useState } from "react";
import Slidebar from "./Slidebar";
import { useEffect } from "react";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [Count, setCount] = useState(0)
    const navigate = useNavigate()
    let token = localStorage.getItem("token");


    const fetchData = async () => {

        try {
            const response = await fetch("/App/ManageProduct", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            const result = await response.json();
            setCount(result.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(Count)


    useEffect(() => {
        let token = localStorage.getItem("token");


        if (!token) {
            toast.error("Please Login to access Admin Pannel");
            navigate("/Login");
            return;
        }
        else {
            fetchData();
        }

    }, [Count]

    )
    return (
        <>
            {token ? <div className="flex mt-16">

                <Slidebar />
                <div className="flex-1 p-10 bg-gray-50 min-h-screen">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">
                        Admin Dashboard 📊
                    </h1>
                    <div className="grid grid-cols-1">
                        <div className="bg-white p-6 rounded shadow">
                            <h2 className="text-xl font-semibold  text-gray-700">
                                Total Products
                            </h2>
                            <p className="text-3xl mt-3 font-bold text-green-700">{Count}</p>
                        </div>
                    </div>
                </div>
            </div> : <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
                < div className="text-6xl text-white">loading...</div></div>
            }
        </>
    );
};

export default AdminDashboard;