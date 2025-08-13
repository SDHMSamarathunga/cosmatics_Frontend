import { Link, Route, Routes, useLocation } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoPeople, IoSettings } from "react-icons/io5";
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/updateProduct";
import OrdersPageAdmin from "./admin/ordersPageAdmin";

export default function AdminPage() {
    const location = useLocation();
    const menuItems = [
        { path: "/admin/products", icon: <FaBoxArchive />, label: "Products" },
        { path: "/admin/orders", icon: <GiShoppingBag />, label: "Orders" },
        { path: "/admin/users", icon: <IoPeople />, label: "Users" },
        { path: "/admin/settings", icon: <IoSettings />, label: "Settings" },
    ];

    return (
        <div className="w-full h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div className="w-[300px] h-full bg-gradient-to-b from-indigo-600 to-purple-700 text-white shadow-lg flex flex-col">
                <span className="text-3xl font-extrabold my-6 text-center tracking-wide">
                    Admin Panel
                </span>

                <div className="flex flex-col gap-2 px-2">
                    {menuItems.map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            className={`flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-medium transition-all duration-200 
                            ${location.pathname === item.path
                                    ? "bg-white text-indigo-600 shadow-md"
                                    : "hover:bg-indigo-500 hover:shadow-md"
                                }`}
                        >
                            {item.icon} {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                <Routes path="/*">
                    <Route path="/" element={<h1 className="text-2xl font-bold">Dashboard</h1>} />
                    <Route path="/products" element={<ProductsAdminPage />} />
                    <Route path="/newProduct" element={<AddProductPage />} />
                    <Route path="/orders" element={<OrdersPageAdmin />} />
                    <Route path="/updateProduct" element={<UpdateProductPage />} />
                </Routes>
            </div>
        </div>
    );
}
