"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close search on scroll
  useEffect(() => {
    if (showSearch) {
      const handleScroll = () => setShowSearch(false);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [showSearch]);

  // Helper to scroll to section
  const handleScroll = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  // mobile search
  const [searchTerm, setSearchTerm] = useState("");

const handleSearch = (e) => {
  if (e.key === "Enter" && searchTerm.trim()) {
    navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    setShowSearch(false); // close mobile dropdown
  }
};


  return (
    <div className="sticky top-0 z-50 bg-primary/40 backdrop-blur-sm shadow-md">
      <div className="py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex gap-6 items-center">
            <button
              onClick={() => handleScroll("home")}
              className="hover:text-green-600 transition"
            >
              Home
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="hover:text-green-600 transition"
            >
              About
            </button>
            <button
              onClick={() => handleScroll("products")}
              className="hover:text-green-600 transition"
            >
              Products
            </button>
            <button
              onClick={() => handleScroll("reviews")}
              className="hover:text-green-600 transition"
            >
              Reviews
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="hover:text-green-600 transition"
            >
              Contact
            </button>
          </nav>

          {/* Desktop Search & Icons */}
          <div className="hidden md:flex items-center gap-4 ml-4">
<input
  type="text"
  placeholder="Search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onKeyDown={handleSearch}
  className="w-[200px] hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-green-500"
/>
            <Link to="/payment" className="relative group">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1">
                2
              </span>
            </Link>
            <Link to="/profile">
              <User className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
            </Link>
          </div>

          {/* Mobile Section */}
          <div className="md:hidden flex flex-1 items-center justify-between relative">
            {/* LEFT SIDE (Menu + Search) */}
            <div className="flex items-center gap-x-2">
              {/* Sheet Menu with Icon Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="p-2 rounded bg-beige black hover:bg-yellow-100 focus:outline-none"
                    aria-label="Open menu"
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </SheetTrigger>

                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>MENU</SheetTitle>
                    <SheetDescription>
                      Click on a link to page.
                    </SheetDescription>
                  </SheetHeader>

                  <nav className="flex flex-col gap-2 px-4 py-2">
                    <SheetClose asChild>
                      <button
                        onClick={() => handleScroll("home")}
                        className="text-left px-4 py-2 hover:bg-green-50 rounded"
                      >
                        Home
                      </button>
                    </SheetClose>

                    <SheetClose asChild>
                      <button
                        onClick={() => handleScroll("about")}
                        className="text-left px-4 py-2 hover:bg-green-50 rounded"
                      >
                        About
                      </button>
                    </SheetClose>

                    <SheetClose asChild>
                      <button
                        onClick={() => handleScroll("products")}
                        className="text-left px-4 py-2 hover:bg-green-50 rounded"
                      >
                        Products
                      </button>
                    </SheetClose>

                    <SheetClose asChild>
                      <button
                        onClick={() => handleScroll("reviews")}
                        className="text-left px-4 py-2 hover:bg-green-50 rounded"
                      >
                        Reviews
                      </button>
                    </SheetClose>

                    <SheetClose asChild>
                      <button
                        onClick={() => handleScroll("contact")}
                        className="text-left px-4 py-2 hover:bg-green-50 rounded"
                      >
                        Contact
                      </button>
                    </SheetClose>
                  </nav>

                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline" className="w-full">
                        Close
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              {/* Mobile Search Toggle */}
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

            {/* RIGHT SIDE (Cart + Profile) */}
            <div className="flex items-center justify-end gap-x-2">
              <Link to="/payment">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
              </Link>
              <Link to="/profile">
                <User className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
              </Link>
            </div>

            {/* Mobile Search Input (dropdown) */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
