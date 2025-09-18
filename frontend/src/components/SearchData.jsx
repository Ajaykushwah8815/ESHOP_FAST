import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const SearchData = ({ close }) => {

    const [Query, setQuery] = useState("");
    const [result, setResult] = useState([])
    const [Loading, setLoading] = useState(false)



    // debouse is used to hold search text
    useEffect(() => {
        const delaydebounce = setTimeout(() => {

            fetch(`/App/Search?q=${Query}`).then((res) => { return res.json() }).then((result) => {
                setTimeout(() => {
                    setResult(result.data)
                    setLoading(false)

                }, 2000); setLoading(true)

            }).catch((err) => {
                console.log(err);
            });
            // console.log(Query)
        }, 1000);


        return () => clearTimeout(delaydebounce);

    }, [Query])


    // console.log(result)


    return <>
        <div className="fixed inset-0 bg-white  z-[999] p-4 overscroll-y-auto">
            ;<div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    autoFocus
                    placeholder="Search Here..."
                    name=""
                    id=""
                    onChange={(e) => {
                        setQuery(e.target.value)
                    }}


                    className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button

                    onClick={() => {
                        close(false)
                    }}
                    className="ml-3 text-gray-600 hover:text-red-600 text-xl"
                >
                    <FaTimes />
                </button>


            </div>
            {

                (Query == "") ?

                    <div className="grid grid-cols-2  overscroll-x-auto  sm:grid-cols-3 md:grid-cols-4 gap-7">
                        {result.map((item) => (
                            <div class="max-w-sm bg-slate-100 z-{-1} p-6 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-lg transition duration-300">
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

                            </div>

                        ))}
                    </div> : (Loading == true) ?
                        <div className=" w-full h-screen flex  text-center mt-36 justify-center text-stone-950 font-extrabold">

                            <h1>Loading . . . </h1>
                        </div> : (result.length == 0) ?
                            <div className=" w-full h-screen flex  text-center mt-36 justify-center text-red-500 font-extrabold">

                                <h1>Sorry Not Found</h1>
                            </div>

                            :
                            <div className="grid grid-cols-2  overscroll-x-auto  sm:grid-cols-3 md:grid-cols-4 gap-7">
                                {result.map((item) => (
                                    <div class="max-w-sm bg-slate-100 z-{-1} p-6 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-lg transition duration-300">
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

                                    </div>

                                ))}
                            </div>


            }







        </div>


    </>

}


export default SearchData;