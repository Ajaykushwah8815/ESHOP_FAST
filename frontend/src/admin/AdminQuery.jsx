import React from "react";
import Slidebar from "./Slidebar";
import { useState } from "react";
import { useEffect } from "react";
import toaster, { toast } from "react-hot-toast"
import { Link } from "react-router-dom"

const AdminQuery = () => {

    const [Query, setQuery] = useState([])
    async function fetchQuery() {

        try {
            const response = await fetch("/App/getAllquery", {
                method: "GET",
            })

            const result = await response.json();
            setQuery(result.Data);
        } catch (error) {
            console.log("fetching error", error)
        }

    }

    useEffect(() => {
        fetchQuery();
    }, [])


    async function handleDelete(id) {
        try {
            // console.log(id);
            const response = await fetch(`/App/deleteQuery/${id}`, {
                method: "DELETE"
            })
            const result = await response.json();
            // console.log(result)
            if (response.ok) {
                toast.success(result.message);
                fetchQuery();
            }
            else {
                toast.error(result.message);

            }
        } catch (error) {
            console.log("fetching error")
        }

    }

    console.log(Query);



    return (
        <div className="flex mt-16">
            <Slidebar />
            <div className="flex-1 p-10 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Query Management 📧
                </h1>
                {Query.length != 0 ?
                    <div class="relative overflow-x-auto">

                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        S.No
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        User Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Query
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Email-ID
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action-1
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action-2
                                    </th>
                                </tr>
                            </thead>

                            <tbody >
                                {Query.map((items, index) => {
                                    return (<tr key={index} class="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <td class="px-6 py-4">{index + 1}</td>
                                        <td class="px-6 py-4">{items.UName}</td>
                                        <td class="px-6 py-4">{items.UQuery}</td>
                                        <td class="px-6 py-4">{items.UEmail}</td>
                                        <td class="px-6 py-4">
                                            {items.QueryStatus === "Read" ? <button className="text-xs bg-red-100 text-white-700 px-2 py-1 rounded">
                                                {items.QueryStatus}
                                            </button> : <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                                {items.QueryStatus}
                                            </button>}

                                        </td>
                                        <td class="px-6 py-4"

                                        >
                                            <Link to={`/admin/admin-query-reply/${items._id}`}>
                                                <button className="-xs bg-green-600 text-white px-3 py-1 rounded">
                                                    Reply
                                                </button></Link>
                                        </td>
                                        <td class="px-6 py-4">
                                            <button className="text-xs bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={() => { handleDelete(items._id) }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>)
                                })


                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className="bg-slate-400 w-full   min-h-96 p-6 items-center flex justify-center rounded-md flex-col gap-3">
                        <h1 className="font-bold ">No Query Availabe Here</h1>
                        <Link to={"/contact"}><button className="bg-green-500 hover:bg-green-700 text-white py-2 px-5 rounded-md">Add Query</button></Link> :
                    </div>
                }
            </div>
        </div>
    );
};

export default AdminQuery;