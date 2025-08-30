import { Link, Route, Routes } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/updateProduct";
import OrdersPageAdmin from "./admin/ordersPageAdmin";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-[300px] h-full bg-white shadow-lg flex flex-col items-center transition-all duration-300">
        <span className="text-3xl font-bold my-8 text-gray-800">Admin Panel</span>
        <div className="w-full flex flex-col">
          <Link
            className="flex flex-row items-center h-[60px] w-full border-b border-gray-200 p-5 text-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 gap-4"
            to="/admin/products"
          >
            <FaBoxArchive className="text-xl" /> Products
          </Link>
          <Link
            className="flex flex-row items-center h-[60px] w-full border-b border-gray-200 p-5 text-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 gap-4"
            to="/admin/orders"
          >
            <GiShoppingBag className="text-xl" /> Orders
          </Link>
          <Link
            className="flex flex-row items-center h-[60px] w-full border-b border-gray-200 p-5 text-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 gap-4"
            to="/admin/users"
          >
            <IoPeople className="text-xl" /> Users
          </Link>
          <Link
            className="flex flex-row items-center h-[60px] w-full border-b border-gray-200 p-5 text-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 gap-4"
            to="/admin/settings"
          >
            <IoSettings className="text-xl" /> Settings
          </Link>
        </div>
      </div>
      {/* Main Content */}
      <div className="w-[calc(100%-300px)] h-full bg-gray-50 p-8 overflow-auto">
        <Routes path="/*">
          <Route path="/" element={<h1 className="text-4xl font-semibold text-gray-800">Dashboard</h1>} />
          <Route path="/products" element={<ProductsAdminPage />} />
          <Route path="/newProduct" element={<AddProductPage />} />
          <Route path="/orders" element={<OrdersPageAdmin />} />
          <Route path="/updateProduct" element={<UpdateProductPage />} />
        </Routes>
      </div>
    </div>
  );
}