"use client";

import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useCartStore from "../store/useCartStore"; // ✅ import Zustand cart

const Payment = () => {
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

    if (!window.YocoSDK) {
      alert("Payment system is still loading. Please try again shortly.");
      return;
    }

    const yoco = new window.YocoSDK({
      publicKey: "pk_test_ed3c54a6gOol69qa7f45", // replace with live key
    });

    yoco.showPopup({
      amountInCents: totalAmount * 100, // ✅ convert to cents
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
        <div className="flex-1 border p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, idx) => (
              <div key={idx} className="border p-2 flex justify-between items-center mb-4 rounded">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">R {item.priceValue}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="border px-2 rounded"
                    onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="border px-2 rounded"
                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button className="text-red-500" onClick={() => removeFromCart(item.id)}>🗑️</button>
                </div>
              </div>
            ))
          )}
          <div className="font-bold text-right text-lg">
            Total: R {totalAmount.toFixed(2)}
          </div>
        </div>

        {/* Delivery Form */}
        <div className="flex-1 border p-4 mb-14 rounded-lg shadow-sm">
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

          {/* Terms & Conditions Checkboxes */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <Label htmlFor="terms">I accept the terms and conditions</Label>
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
