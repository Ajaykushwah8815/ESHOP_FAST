import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";




import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AddProducts from "./admin/AddProducts";
import EditProducts from "./admin/EditProducts";
import Contact from "./pages/Contact";
import AdminQuery from "./admin/AdminQuery";
import Slidebar from "./admin/Slidebar";
import Reply from "../src/admin/Reply";
import AdminOrder from "./admin/AdminOrder";
function App() {


  return (

    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Homepage></Homepage>}></Route>
          <Route path="/Login" element={<Login></Login>}></Route>
          <Route path="/reg" element={<Register></Register>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>


          {/* Admin Routes */}

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/add-product" element={<AddProducts />} />
          <Route path="/admin/edit-product/:abc" element={<EditProducts />} />
          <Route path="/admin/admin-query" element={<AdminQuery />} />
          <Route path="/admin/admin-query-reply/:abc" element={<Reply />} />
          <Route path="/admin/admin-order" element={<AdminOrder />} />
        </Routes>

        <Footer></Footer>
      </BrowserRouter>
    </div>

  )
}

export default App
