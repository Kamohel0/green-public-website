"use client";

import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useCartStore from "../store/useCartStore"; // ✅ import Zustand cart
import { useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // ✅ Get cart items from Zustand store
  const cartItems = useCartStore((state) => state.cart);
  const updateCartItem = useCartStore((state) => state.updateCartItem);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  // Load Yoco SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.yoco.com/sdk/v1/yoco-sdk-web.js";
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = () => console.error("Yoco SDK failed to load.");
    document.body.appendChild(script);
  }, []);

  // Custom styling for popup
  useEffect(() => {
    if (!document.getElementById("yoco-popup-style")) {
      const style = document.createElement("style");
      style.id = "yoco-popup-style";
      style.innerHTML = `.yoco-popup { margin-top: 50px; }`;
      document.head.appendChild(style);
    }
  }, []);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.priceValue * item.quantity, 0);

  const handlePayNow = () => {
    if (!acceptedTerms) {
      alert("You must accept the terms and conditions before paying.");
      return;
    }

    // ✅ Check login
    const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!window.YocoSDK) {
      alert("Payment system is still loading. Please try again shortly.");
      return;
    }

    const yoco = new window.YocoSDK({
      publicKey: "pk_test_ed3c54a6gOol69qa7f45",
    });

    yoco.showPopup({
      amountInCents: totalAmount * 100,
      currency: "ZAR",
      name: "Sea Moss Products",
      description: "Order Payment",
      callback: function (result) {
        if (result.error) {
          alert("Payment Failed: " + result.error.message);
        } else {
          alert("Payment Successful! Token: " + result.id);
        }
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Playfair Display', serif" }}>
      <main className="p-4 flex flex-col lg:flex-row gap-5">
        {/* Cart Items */}
<div className="flex-1 border rounded-xl shadow-md p-6 bg-white">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">🛒 Shopping Cart</h2>

  {cartItems.length === 0 ? (
    <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
  ) : (
    <div className="space-y-4">
      {cartItems.map((item, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition"
        >
          {/* Product Info */}
          <div>
            <div className="font-semibold text-gray-800">{item.name}</div>
            <div className="text-sm text-gray-500">R {item.priceValue}</div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">

<button
  className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
  onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))}
>
  <Minus size={16} />
</button>

<span className="px-2 text-gray-700">{item.quantity}</span>

<button
  className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
  onClick={() => updateCartItem(item.id, item.quantity + 1)}
>
  <Plus size={16} />
</button>

<button
  className="text-red-500 hover:text-red-600 ml-2"
  onClick={() => removeFromCart(item.id)}
>
  <Trash2 size={18} />
</button>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* Cart Total */}
  <div className="border-t mt-6 pt-4 text-right">
    <div className="text-lg font-bold text-gray-800">
      Total: R {totalAmount.toFixed(2)}
    </div>
    {/* <button className="mt-4 w-full bg-[#15803d] text-white font-semibold py-3 rounded-lg hover:bg-[#116a2f] transition">
      enter 
    </button> */}
  </div>
</div>


        {/* Delivery Form */}
        <div className="lex-1 border rounded-xl shadow-md p-4 bg-white">
          <h2 className="text-xl font-semibold mb-4">Delivery</h2>
          <div className="grid grid-cols-2 gap-8">
            <select className="col-span-2 p-4 bg-gray-100 rounded">
              <option>South Africa</option>
            </select>
            <input type="text" placeholder="First name" className="p-4 bg-gray-100 rounded col-span-1" />
            <input type="text" placeholder="Last name" className="p-4 bg-gray-100 rounded col-span-1" />
            <input type="text" placeholder="Company (optional)" className="col-span-2 p-4 bg-gray-100 rounded" />
            <input type="text" placeholder="Address" className="col-span-2 p-2 bg-gray-100 rounded" />
            <input type="text" placeholder="Apartment, suite, etc." className="col-span-2 p-2 bg-gray-100 rounded" />
            <input type="text" placeholder="City" className="p-2 bg-gray-100 rounded" />
            <input type="text" placeholder="Province" className="p-2 bg-gray-100 rounded" />
            <input type="text" placeholder="Postal code" className="p-2 bg-gray-100 rounded" />
            <input type="text" placeholder="Phone" className="p-2 bg-gray-100 rounded" />
          </div>

{/* Terms & Conditions */}
<div className="mt-6 flex flex-col gap-4">
  <div className="flex items-start gap-3">
    <Checkbox
      id="terms"
      checked={acceptedTerms}
      onChange={(e) => setAcceptedTerms(e.target.checked)}
    />
    <Label htmlFor="terms" className="text-sm text-gray-700">
      I have read and agree to the{" "}
      <a
        href="/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#15803d] hover:underline"
      >
        Terms & Conditions
      </a>{" "}
      of GreenPublic Store, including:
      <ul className="list-disc ml-6 mt-1 text-gray-600 text-xs">
        <li>All sales are subject to product availability.</li>
        <li>Delivery times may vary depending on location.</li>
        <li>Refunds and returns are processed within 7 business days.</li>
        <li>Your personal data is kept secure and not shared with third parties.</li>
        <li>By placing an order, you agree to pay all applicable charges.</li>
      </ul>
    </Label>
  </div>
</div>



          <button
            onClick={handlePayNow}
            disabled={!sdkReady}
            className={`mt-4 px-6 py-2 rounded text-white w-full ${
              sdkReady ? "bg-green-900 hover:bg-green-800" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {sdkReady ? "Pay Now" : "Loading..."}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
