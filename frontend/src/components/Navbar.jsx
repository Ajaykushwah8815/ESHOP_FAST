import { Link } from "react-router-dom";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdContactSupport } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

import {
    FaShoppingCart,
    FaBars,
    FaTimes,
    FaRegUserCircle,
    FaHome,
    FaSearch,
} from "react-icons/fa";
import { useState } from "react";
import Logo from "../assets/img.png";
import SearchData from "./SearchData";
import Products from "./Products";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const [ShowSearch, setShowSearch] = useState(false)
    // console.log(ShowSearch)


    const token = localStorage.getItem("token")
    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("LogOut Successfully");


        setTimeout(() => {
            navigate("/");
        }, 100); // delay so toast shows
    }

    return (
        <nav className="bg-gradient-to-r from-green-100 via-white to-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img src={Logo} alt="Logo" className="h-14 w-auto" />
                    </div>

                    {/* Search */}

                    <div className="flex-1 mx-4">
                        <div className="relative">
                            <input
                                onFocus={() => {
                                    setShowSearch(true)
                                }}
                                type="search"
                                name=""
                                id=""
                                className="w-full bg-gray-200 rounded-full ps-4 pe-10 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <FaSearch className="absolute right-3 top-3 text-sm text-gray-500 " />
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to={"/"} className="text-gray-700 hover:text-green-600 ">
                            <FaHome className="text-2xl " />
                        </Link>
                        <Link to={"/cart"} className="text-gray-700 hover:text-green-600 ">
                            <FaShoppingCart className="text-xl" />
                        </Link>


                        <Link to={"/Admin/dashboard"} className="text-gray-700 hover:text-green-600 ">

                            <MdOutlineAdminPanelSettings className="text-2xl " />
                        </Link>
                        <Link to={"/contact"} className="text-gray-700 hover:text-green-600 ">

                            <MdContactSupport className="text-2xl "></MdContactSupport>
                        </Link>

                        {token ? <Link onClick={handleLogout} >

                            <IoMdLogOut className="text-gray-700 hover:text-green-600 text-2xl "></IoMdLogOut>
                        </Link> :
                            <Link
                                to={"/login"}
                                className="flex items-center gap-1 text-gray-700 hover:text-green-600"
                            >
                                <FaRegUserCircle className="text-xl" />
                            </Link>


                        }

                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-2xl text-green-600">
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow-md">
                    <Link to={"/"} className="block text-gray-700 hover:text-green-600">
                        Home
                    </Link>
                    <Link
                        to={"/cart"}
                        className="block text-gray-700 hover:text-green-600"
                    >
                        Cart
                    </Link>
                    {token ? <Link onClick={handleLogout} className="text-gray-700 hover:text-green-600 ">

                        LogOut
                    </Link> :
                        <Link
                            to={"/login"}
                            className="block text-gray-700 hover:text-green-600"
                        >
                            User
                        </Link>}
                </div>
            )}

            {
                ShowSearch && <SearchData close={setShowSearch}></SearchData>

            }
        </nav>



    );
}