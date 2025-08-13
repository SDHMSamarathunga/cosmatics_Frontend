import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="h-[80px] bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center px-6 shadow-lg sticky top-0 z-10">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center">
                    <img src="/loginbg.jpg" alt="Logo" className="h-10 w-10 rounded-full object-cover" />
                </Link>
                <nav className="flex items-center space-x-8">
                    <Link to="/" className="text-white text-lg font-medium hover:text-blue-200 transition-colors duration-200">
                        Home
                    </Link>
                    <Link to="/products" className="text-white text-lg font-medium hover:text-blue-200 transition-colors duration-200">
                        Products
                    </Link>
                    <Link to="/reviews" className="text-white text-lg font-medium hover:text-blue-200 transition-colors duration-200">
                        Reviews
                    </Link>
                    <Link to="/about-us" className="text-white text-lg font-medium hover:text-blue-200 transition-colors duration-200">
                        About Us
                    </Link>
                    <Link to="/contact-us" className="text-white text-lg font-medium hover:text-blue-200 transition-colors duration-200">
                        Contact Us
                    </Link>
                    <Link to="/cart" className="relative">
                        <BiCart className="text-white text-2xl hover:text-blue-200 transition-colors duration-200" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            0
                        </span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}