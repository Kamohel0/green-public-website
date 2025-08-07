import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";

const Payment = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const [cartItems, setCartItems] = useState([
    { name: "Sea moss body butter", price: 1900, quantity: 1 },
    { name: "Sea moss gel", price: 2000, quantity: 1 },
    { name: "Sea moss lip balm", price: 1500, quantity: 1 },
  ]);

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

  // Increase or Decrease Quantity
  const updateQuantity = (index, change) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
            }
          : item
      )
    );
  };

  const removeItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Calculate Total in cents
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayNow = () => {
    if (!window.YocoSDK) {
      alert("Payment system is still loading. Please try again shortly.");
      return;
    }

    const yoco = new window.YocoSDK({
      publicKey: "pk_test_ed3c54a6gOol69qa7f45", // replace with live key in production
    });

    yoco.showPopup({
      amountInCents: totalAmount,
      currency: "ZAR",
      name: "Sea Moss Products",
      description: "Order Payment",
      callback: function (result) {
        if (result.error) {
          alert("Payment Failed: " + result.error.message);
        } else {
          alert("Payment Successful! Token: " + result.id);
          // TODO: Send result.id to backend to confirm and fulfill order
        }
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Playfair Display', serif" }}>
      <main className="p-4 flex flex-col lg:flex-row gap-5">
        {/* Cart Items */}
        <div className="flex-1 border p-4">
          <h2 className="text-xl font-semibold mb-4">Shopping Bag</h2>
          {cartItems.map((item, idx) => (
            <div key={idx} className="border p-2 flex justify-between items-center mb-4">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-600">R{(item.price / 100).toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="border px-2" onClick={() => updateQuantity(idx, -1)}>-</button>
                <span>{item.quantity}</span>
                <button className="border px-2" onClick={() => updateQuantity(idx, 1)}>+</button>
                <button className="text-red-500" onClick={() => removeItem(idx)}>🗑️</button>
              </div>
            </div>
          ))}
          <div className="font-bold text-right text-lg">
            Total: R{(totalAmount / 100).toFixed(2)}
          </div>
        </div>

        {/* Delivery Form */}
        <div className="flex-1 border p-4 mb-14">
          <h2 className="text-xl font-semibold mb-4">Delivery</h2>
          <div className="grid grid-cols-2 gap-8">
            <select className="col-span-2 p-4 bg-gray-100">
              <option>South Africa</option>
            </select>
            <input type="text" placeholder="First name" className="p-4 bg-gray-100" />
            <input type="text" placeholder="Last name" className="p-4 bg-gray-100" />
            <input type="text" placeholder="Company (optional)" className="col-span-2 p-4 bg-gray-100" />
            <input type="text" placeholder="Address" className="col-span-2 p-2 bg-gray-100" />
            <input type="text" placeholder="Apartment, suite, etc." className="col-span-2 p-2 bg-gray-100" />
            <input type="text" placeholder="City" className="p-2 bg-gray-100" />
            <input type="text" placeholder="Province" className="p-2 bg-gray-100" />
            <input type="text" placeholder="Postal code" className="p-2 bg-gray-100" />
            <input type="text" placeholder="Phone" className="p-2 bg-gray-100" />
          </div>
          <button
            onClick={handlePayNow}
            disabled={!sdkReady}
            className={`mt-4 px-6 py-2 rounded text-white ${
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
