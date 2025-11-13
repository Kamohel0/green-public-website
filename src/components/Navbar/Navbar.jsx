"use client";

import { useState, useEffect, useCallback } from "react";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items data
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "reviews", label: "Reviews" },
    { id: "contact", label: "Contact" },
  ];

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      if (showSearch) {
        setShowSearch(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSearch]);

  // Enhanced scroll/navigation helper
  const handleNavigation = useCallback((id) => {
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        });
      }
    } else {
      navigate(`/#${id}`);
    }
  }, [location.pathname, navigate]);

  // Search handler
  const handleSearch = useCallback((e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearch(false);
      setSearchTerm("");
    }
  }, [searchTerm, navigate]);

  // Close search when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearch && !event.target.closest('.search-container')) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearch]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg" 
          : "bg-primary/40 backdrop-blur-sm shadow-md"
      }`}
    >
      <div className="py-3">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium py-2 px-1 relative group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Desktop Search & Actions */}
          <div className="hidden md:flex items-center gap-6">
            {/* Search Input */}
            <div className="relative search-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:w-72 focus:w-72 bg-white/80 backdrop-blur-sm"
                aria-label="Search products"
              />
            </div>

            {/* Cart with Badge */}
            <Link 
              to="/payment" 
              className="relative p-2 rounded-full hover:bg-green-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Shopping cart (2 items)"
            >
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                2
              </span>
            </Link>

            {/* Profile */}
            <Link 
              to="/profile"
              className="p-2 rounded-full hover:bg-green-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="User profile"
            >
              <User className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex flex-1 items-center justify-between relative search-container">
            
            {/* Left: Menu & Search */}
            <div className="flex items-center gap-3">
              
              {/* Mobile Menu Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-green-50 focus:ring-2 focus:ring-green-500"
                    aria-label="Open main menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader className="text-left">
                    <SheetTitle className="text-2xl">Menu</SheetTitle>
                    <SheetDescription>
                      Navigate to different sections of our website
                    </SheetDescription>
                  </SheetHeader>

                  <nav className="flex flex-col gap-1 mt-8" aria-label="Mobile navigation">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.id}>
                        <Button
                          variant="ghost"
                          onClick={() => handleNavigation(item.id)}
                          className="justify-start h-12 text-lg hover:bg-green-50 hover:text-green-600 transition-colors"
                        >
                          {item.label}
                        </Button>
                      </SheetClose>
                    ))}
                  </nav>

                  <SheetFooter className="mt-8">
                    <SheetClose asChild>
                      <Button variant="outline" className="w-full">
                        Close Menu
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(prev => !prev)}
                className="h-10 w-10 hover:bg-green-50 focus:ring-2 focus:ring-green-500"
                aria-label={showSearch ? "Close search" : "Open search"}
              >
                {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>
            </div>

            {/* Right: Cart & Profile */}
            <div className="flex items-center gap-3">
              <Link 
                to="/cart"
                className="relative p-2 rounded-full hover:bg-green-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Shopping cart (2 items)"
              >
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  2
                </span>
              </Link>
              
              <Link 
                to="/profile"
                className="p-2 rounded-full hover:bg-green-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="User profile"
              >
                <User className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
              </Link>
            </div>

            {/* Mobile Search Dropdown */}
            <div
              className={`absolute left-0 top-14 w-full px-4 z-50 transition-all duration-300 ${
                showSearch
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-2">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  autoFocus={showSearch}
                  aria-label="Search products"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;