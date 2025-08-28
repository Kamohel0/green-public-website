"use client";

import { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
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

  // Close search on scroll
  useEffect(() => {
    if (showSearch) {
      const handleScroll = () => setShowSearch(false);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [showSearch]);

  return (
    <div className="sticky top-0 z-50 bg-primary/40 backdrop-blur-sm shadow-md">
      <div className="py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          {/* <div className="flex items-center gap-2">
            <a href="#" className="flex items-center text-xl font-bold">
              <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
              <span className="ml-2">GreenPublic</span>
            </a>
          </div> */}

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex gap-6 items-center">
            <a href="/" className="hover:text-green-600 transition">Home</a>
            <a href="#about" className="hover:text-green-600 transition">About</a>
            <a href="#services" className="hover:text-green-600 transition">Services</a>
            <a href="#contact" className="hover:text-green-600 transition">Contact</a>
          </nav>

          {/* Desktop Search & Icons */}
          <div className="hidden md:flex items-center gap-4 ml-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-[200px] hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-green-500"
            />
            <Link to="/payment" className="relative group">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1">2</span>
            </Link>
            <Link to="/profile">
              <User className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
            </Link>
          </div>

{/* Mobile Section */}
<div className="md:hidden flex flex-1 items-center justify-start gap-x-2 relative left-12">
  {/* Mobile Search Toggle */}
  <button
    className="p-2 rounded hover:bg-green-100 focus:outline-none"
    onClick={() => setShowSearch(prev => !prev)}
    aria-label="Toggle search"
  >
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </button>

  {/* Mobile Cart & Profile */}
  <div className=" flex flex-1 gap-x-2 justify-end">
  <Link to="/payment">
    <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600 transition " />
  </Link>
  <Link to="/profile">
    <User className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
  </Link>
  </div>

{/* Mobile Search Input */}
<div
  className={`absolute top-14 left-13 min-w-72 px-4 z-40 transition-all duration-300 ${
    showSearch ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
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

  {/* Sheet Menu with Icon Trigger */}
  <Sheet>
    <SheetTrigger asChild>
      <button
        className="p-2 rounded bg-beige text-gray-700 hover:bg-yellow-100 focus:outline-none absolute left-8"
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
        <SheetTitle>Navigation</SheetTitle>
        <SheetDescription>Click on a link to navigate.</SheetDescription>
      </SheetHeader>
      <nav className="flex flex-col gap-2 px-4 py-2">
        <Link to="/" className="px-4 py-2 hover:bg-green-50 rounded">Home</Link>
        <Link to="/products" className="px-4 py-2 hover:bg-green-50 rounded">Products</Link>
        <Link to="/reviews" className="px-4 py-2 hover:bg-green-50 rounded">Reviews</Link>
        <Link to="/contact" className="px-4 py-2 hover:bg-green-50 rounded">Contact</Link>
      </nav>
      <SheetFooter>
        <SheetClose asChild>
          <Button variant="outline" className="w-full colour:white">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
