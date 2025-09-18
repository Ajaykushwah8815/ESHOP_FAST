import React, { useEffect, useState } from "react";
import Slidebar from "./Slidebar";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";


const Reply = () => {
    const [replyQuery, setreplyQuery] = useState({ to: "", sub: "", body: "" })
    const navigate = useNavigate();


    const { abc } = useParams()
    // console.log(abc)
    async function GetQuery() {
        const response = await fetch(`/App/getQuerytoReply/${abc}`)
        const result = await response.json();
        // console.log(result)
        setreplyQuery({ to: result.Data.UEmail });
    }
    useEffect(() => {
        GetQuery()
    }, [])


    async function handleform(e) {

        try {
            e.preventDefault();

            const response = await fetch(`/App/mailReplyQuery/${abc}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(replyQuery),
            })


            const result = await response.json()
            console.log(result)

            if (response.ok) {

                toast.success(result.message);
                navigate("/admin/admin-query")



            }
            else {
                toast.error(result.message);

            }
            // console.log(replyQuery);
        } catch (error) {
            toast.error(error)
        }
        // e.preventDefault()


    }


    function handlechange(e) {
        setreplyQuery({ ...replyQuery, [e.target.name]: e.target.value });
    }




    return (
        <div className="flex mt-16 ">
            <Slidebar />
            <div className="flex-1 p-10 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Reply Query📧</h1>
                <form
                    onSubmit={handleform}

                    action=""
                    className="bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto space-y-6"
                >
                    <label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        To
                    </label>
                    <input
                        type="text"
                        name="to"
                        id=""
                        value={replyQuery.to}
                        onChange={handlechange}

                        placeholder="Mail-to"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        From
                    </label>
                    <div
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    > eshoptechnology@gmail.com</div>
                    <label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        Sub
                    </label>
                    <input
                        type="text"
                        name="sub"
                        onChange={handlechange}
                        id=""
                        placeholder="Sub.."
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        Body
                    </label>
                    <textarea
                        name="body"
                        id=""
                        onChange={handlechange}

                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    ></textarea>

                    <div className="text-right">
                        <button
                            className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-700 transition">
                            Reply
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Reply;