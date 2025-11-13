"use client";

import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import useCartStore from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingCart, Truck, CreditCard, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Payment = () => {
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    province: "",
    postalCode: "",
    phone: ""
  });
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Cart state from Zustand
  const { cart: cartItems, updateCartItem, removeFromCart, getTotalPrice, clearCart } = useCartStore();
  const totalAmount = getTotalPrice ? getTotalPrice() : cartItems.reduce((acc, item) => acc + (item.priceValue || 0) * item.quantity, 0);

  // Load Yoco SDK with better error handling
  useEffect(() => {
    // Check if SDK is already loaded
    if (window.YocoSDK) {
      setSdkReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.yoco.com/sdk/v1/yoco-sdk-web.js";
    script.async = true;
    script.onload = () => {
      console.log("Yoco SDK loaded successfully");
      setSdkReady(true);
    };
    script.onerror = (error) => {
      console.error("Yoco SDK failed to load:", error);
      alert("Payment system failed to load. Please refresh the page and try again.");
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleInputChange = (field, value) => {
    setDeliveryInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (event) => {
    setAcceptedTerms(event.target.checked);
  };

  const handlePayNow = async () => {
    if (!acceptedTerms) {
      alert("You must accept the terms and conditions before paying.");
      return;
    }

    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'province', 'postalCode', 'phone'];
    const missingFields = requiredFields.filter(field => !deliveryInfo[field].trim());
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before proceeding to payment.");
      return;
    }

    setPaymentLoading(true);

    try {
      // Wait a bit to ensure SDK is fully loaded
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!window.YocoSDK) {
        throw new Error("Yoco SDK not available");
      }

      console.log("Initializing Yoco SDK with public key");
      
      const yoco = new window.YocoSDK({
        publicKey: "pk_test_ed3c54a6gOol69qa7f45",
      });

      console.log("Yoco SDK initialized, showing popup...");

      // Show Yoco popup
      yoco.showPopup({
        amountInCents: Math.round(totalAmount * 100),
        currency: "ZAR",
        name: "Sea Moss Products",
        description: `Order for ${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
        callback: function (result) {
          console.log("Yoco callback received:", result);
          
          if (result.error) {
            console.error("Payment failed:", result.error);
            alert(`Payment Failed: ${result.error.message}`);
          } else {
            console.log("Payment successful, token:", result.id);
            alert("Payment Successful! Your order has been confirmed.");
            clearCart();
            navigate("/order-success");
          }
          setPaymentLoading(false);
        },
      });

    } catch (error) {
      console.error("Payment initialization error:", error);
      alert("Payment system error. Please try again or contact support.");
      setPaymentLoading(false);
    }
  };

  const isFormValid = () => {
    return acceptedTerms && cartItems.length > 0 && sdkReady && !paymentLoading;
  };

  // Test function to check if Yoco is working
  const testYoco = () => {
    if (!window.YocoSDK) {
      alert("Yoco SDK not loaded");
      return;
    }
    
    try {
      const yoco = new window.YocoSDK({
        publicKey: "pk_test_ed3c54a6gOol69qa7f45",
      });
      
      yoco.showPopup({
        amountInCents: 1000, // R10.00
        currency: "ZAR",
        name: "Test Product",
        description: "Test payment",
        callback: function (result) {
          console.log("Test payment result:", result);
          if (result.error) {
            alert(`Test failed: ${result.error.message}`);
          } else {
            alert("Test successful! Payment popup is working.");
          }
        },
      });
    } catch (error) {
      console.error("Test failed:", error);
      alert("Test failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Checkout</h1>
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-green-600">
                <ShoppingCart size={18} />
                <span>Cart</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <Truck size={18} />
                <span>Delivery</span>
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-400">
                <CreditCard size={18} />
                <span>Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6">
        {/* Debug section - remove in production */}
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-yellow-800">
                SDK Status: <span className={sdkReady ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {sdkReady ? "Ready" : "Loading..."}
                </span>
              </p>
              <p className="text-xs text-yellow-600">Total: R {totalAmount.toFixed(2)} | Items: {cartItems.length}</p>
            </div>
            <button
              onClick={testYoco}
              className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              Test Payment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Delivery Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm border p-6 lg:p-8 order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <Truck className="text-green-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Delivery Information</h2>
            </div>

            {/* ... (delivery form fields remain the same) ... */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={deliveryInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={deliveryInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* ... other form fields ... */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={deliveryInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Street address"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={deliveryInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province *
                  </label>
                  <input
                    type="text"
                    value={deliveryInfo.province}
                    onChange={(e) => handleInputChange('province', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Province"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={deliveryInfo.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Postal code"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={deliveryInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Phone number"
                />
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                  I have read and agree to the{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline font-medium"
                  >
                    Terms & Conditions
                  </a>{" "}
                  of GreenPublic Store.
                </label>
              </div>
            </div>
          </motion.div>

          {/* Cart Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm border p-6 lg:p-8 order-1 lg:order-2 h-fit sticky top-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <ShoppingCart className="text-green-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
            </div>

            <AnimatePresence>
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <ShoppingCart className="mx-auto text-gray-400 mb-3" size={48} />
                  <p className="text-gray-500">Your cart is empty</p>
                  <button
                    onClick={() => navigate("/#products")}
                    className="mt-4 text-green-600 hover:text-green-700 font-medium"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-800 truncate">{item.name}</h3>
                          <p className="text-green-600 font-semibold">
                            R {item.priceValue?.toFixed(2) || item.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-white border rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Order Total */}
            {cartItems.length > 0 && (
              <div className="border-t pt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">R {totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <span className="text-green-600">R {totalAmount.toFixed(2)}</span>
                </div>

                {/* Pay Now Button */}
                <motion.button
                  onClick={handlePayNow}
                  disabled={!isFormValid()}
                  whileHover={isFormValid() ? { scale: 1.02 } : {}}
                  whileTap={isFormValid() ? { scale: 0.98 } : {}}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 mt-6 flex items-center justify-center gap-2 ${
                    isFormValid()
                      ? "bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Shield size={20} />
                  {paymentLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : sdkReady ? (
                    `Pay R ${totalAmount.toFixed(2)}`
                  ) : (
                    "Loading Payment..."
                  )}
                </motion.button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-3">
                  <Shield size={12} />
                  <span>Secure payment powered by Yoco</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;