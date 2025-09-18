import { useEffect } from "react";
import Slidebar from "./Slidebar";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";



const AdminOrder = () => {
    const [Order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const user = localStorage.getItem("user");
    const [loading, setLoading] = useState(true)
    const OrderData = async () => {
        fetch(`/App/admin-order/${user}`, {
            method: "GET",
        })
            .then(async (res) => await res.json())
            .then(result => {
                const allItems = result.Data.flatMap(items => items.cartItems);

                const total = result.Data.reduce((sum, items) => sum + items.totalPrice, 0);
                setTimeout(() => {
                    setTotalPrice(total);
                    setOrder(allItems);
                    setLoading(false)
                }, 2000);




            })
            .catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        OrderData()
    }, [Order])
    console.log(Order, totalPrice)

    async function handleOrderCencel() {
        const response = await fetch(`/App/cencel-order/${user}`, {
            method: "DELETE",
        })
        const result = await response.json()
        if (response.ok) {
            toast.success(result.message)

        }
        else {
            toast.error(result.message)
        }

    }


    return (
        <>
            <div className="flex mt-16 ">

                <Slidebar />
                <div className="flex-1 p-10 bg-gray-50 min-h-screen">


                    <h1 className="text-3xl font-bold mb-6 text-gray-800">
                        Admin Order's📊
                    </h1>
                    <div className="grid grid-cols-1">
                        <div className="bg-white p-6 rounded shadow">
                            <h2 className="text-xl font-semibold  text-gray-700">
                                Total Order's
                            </h2>
                            <p className="text-3xl mt-3 font-bold text-green-700">{Order.length}</p>
                            <div className=" flex text-right justify-end">
                                <button onClick={handleOrderCencel} className="bg-lime-300 py-4 px-3 border-2 border-solid border-black   text-xl font-bold hover:bg-lime-400 rounded-xl hover:shadow-lg hover:shadow-indigo-500/50  focus:ring-2 focus:ring-gray-950"> Cencel Order</button>
                            </div>

                        </div>

                    </div>

                    <div className="h-2/3 overflow-y-scroll">

                        <table class=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className=" ">
                                    <th scope="col" class="px-6 py-3  text-lg font-extrabold ">
                                        S.No
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-lg font-extrabold ">
                                        Product Image
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-lg font-extrabold ">
                                        Product Name
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-lg font-extrabold ">
                                        Catagory
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-lg font-extrabold ">
                                        Order Date
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-lg font-extrabold ">
                                        Amount
                                    </th>

                                </tr>
                            </thead>

                            <tbody >

                                {Order.map((items, index) => {
                                    return (
                                        <tr key={index} class="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <td class="px-6 py-4 font-black">{index + 1}</td>
                                            <td class="px-6 py-4 font-black"><img src={`/uploads/${items.ProductImage}`}
                                                alt="Product Image" srcset="" className="w-12 h-12 border-4 border-black-600 " /></td>
                                            <td class="px-6 py-4 font-black">{items.ProductName}</td>
                                            <td class="px-6 py-4 font-black">{items.Catagory}</td>
                                            <td class="px-6 py-4 font-black">20/5/25</td>
                                            <td class="px-6 py-4 font-black">{items.ProductPrice}</td>


                                        </tr>)
                                })}


                                <tr class="bg-green-300  border-b text-black border-gray-200">

                                    <td class="px-6 py-4 font-black"></td>
                                    <td class="px-6 py-4 font-black"></td>
                                    <td class="px-6 py-4 font-black"></td>
                                    <td class="px-6 py-4 text-xl font-black">Total</td>
                                    <td class="px-6 py-4 font-black"></td>
                                    <td class="px-6 py-4 text-xl font-black">{totalPrice}</td>


                                </tr>



                            </tbody>
                        </table>
                        {
                            loading == true ? <div className="h-32 w-full flex justify-center items-center text-center m-auto font-bold text-red-500 ">Loading...</div> : Order.length == 0 ? <div className="bg-slate-400 w-full   min-h-96 p-6 items-center flex justify-center rounded-md flex-col gap-3">
                                <h1 className="font-bold ">No Order Availabe Here</h1>
                                <Link to={"/cart"}>  <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-5 rounded-md">Go-For-Order</button>
                                </Link>  </div> : <div></div>
                        }
                    </div>


                </div>
            </div>
        </>
    );
};

export default AdminOrder;