import { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Close dropdowns on scroll
  useEffect(() => {
    if (showMenu || showSearch) {
      const handleScroll = () => {
        setShowMenu(false);
        setShowSearch(false);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [showMenu, showSearch]);

  return (
    <div className="sticky top-0 z-50 bg-primary/40 backdrop-blur-sm shadow-md">
      <div className="py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          {/* Uncomment this if needed */}
          {/* 
          <div className="flex items-center gap-2">
            <a href="#" className="flex items-center text-xl font-bold">
              <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
              <span className="ml-2">GreenPublic</span>
            </a>
          </div>
          */}

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex gap-6 items-center">
            <a href="/" className="hover:text-green-600 transition">
              Home
            </a>
            <a href="#about" className="hover:text-green-600 transition">
              About
            </a>
            <a href="#services" className="hover:text-green-600 transition">
              Services
            </a>
            <a href="#contact" className="hover:text-green-600 transition">
              Contact
            </a>
          </nav>

          {/* Desktop Search & Icons */}
          <div className="hidden md:flex items-center gap-4 ml-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-[200px] hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-green-500"
            />
            <a href="/payment" className="relative group">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1">
                2
              </span>
            </a>
            <Link to="/profile">
              <User className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
            </Link>
          </div>

          {/* Mobile Section */}
          <div className="md:hidden flex flex-1 items-center justify-between relative">
            {/* Left: Menu & Search */}
            <div className="flex items-center gap-x-2">
              {/* Toggle menu */}
              <button
                className="p-2 rounded hover:bg-green-100 focus:outline-none"
                onClick={() => setShowMenu((prev) => !prev)}
                aria-label="Toggle menu"
                aria-expanded={showMenu}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Toggle search */}
              <button
                className="p-2 rounded hover:bg-green-100 focus:outline-none"
                onClick={() => setShowSearch((prev) => !prev)}
                aria-label="Toggle search"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>

            {/* Right: Cart & Profile */}
            <div className="flex items-center gap-x-2 ml-auto space-x-3">
              <Link to="/payment" className="relative group">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
              </Link>
              <Link to="/profile">
                <User className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
              </Link>
            </div>

            {/* Unified Backdrop */}
            {(showSearch || showMenu) && (
              <div
                className="fixed inset-0 bg-black opacity-20 z-40"
                onClick={() => {
                  setShowSearch(false);
                  setShowMenu(false);
                }}
              />
            )}

            {/* Mobile Search Input */}
            <div
              className={`absolute left-0 top-12 min-w-72 px-4 z-50 transition-all duration-300 ${
                showSearch
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
              style={{ transformOrigin: "top" }}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-green-500 bg-white shadow"
                autoFocus={showSearch}
              />
            </div>

            {/* Mobile Navigation Menu */}
            <nav
              className={`absolute left-0 top-12 w-40 bg-white shadow-lg rounded z-50 flex flex-col transform origin-top transition-transform duration-300 ${
                showMenu ? "scale-y-100" : "scale-y-0 pointer-events-none"
              }`}
              style={{ transformOrigin: "top" }}
            >
              <Link
                to="/"
                onClick={() => setShowMenu(false)}
                className="px-4 py-2 hover:bg-green-50"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setShowMenu(false)}
                className="px-4 py-2 hover:bg-green-50"
              >
                Products
              </Link>
              <Link
                to="/reviews"
                onClick={() => setShowMenu(false)}
                className="px-4 py-2 hover:bg-green-50"
              >
                Reviews
              </Link>
              <Link
                to="/contact"
                onClick={() => setShowMenu(false)}
                className="px-4 py-2 hover:bg-green-50"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
