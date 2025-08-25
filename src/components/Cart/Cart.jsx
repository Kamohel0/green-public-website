import React from "react";
import {
  User,
  Heart,
  ShoppingBag,
  Bell,
  CreditCard,
  LogOut,
  ArrowRight,
} from "lucide-react";
import Footer from "../footer/Footer";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Cart = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="p-4 flex flex-col lg:flex-row gap-4">
        {/* Cart Items */}
        <div className="flex-1 border p-4">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>

          {["Sea moss body butter", "Sea moss gel", "Sea moss lip balm"].map(
            (item, idx) => (
              <div
                key={idx}
                className="border p-2 flex justify-between items-center mb-2"
              >
                <div>
                  <div className="font-medium">{item}</div>
                  <div className="text-sm text-gray-600">R1{idx + 9}0</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="border px-2">-</button>
                  <span>1</span>
                  <button className="border px-2">+</button>
                  <button className="text-red-500">🗑️</button>
                </div>
              </div>
            )
          )}
        </div>
         

        {/* Delivery Form */}
        <div className="flex-1 border p-4 mb-4">
          <h2 className="text-xl font-semibold mb-4">Delivery</h2>
          <div className="grid grid-cols-2 gap-4">
            <select className="col-span-2 p-2 bg-gray-100">
              <option>South Africa</option>
            </select>
            <input
              type="text"
              placeholder="First name"
              className="p-2 bg-gray-100"
            />
            <input
              type="text"
              placeholder="Last name"
              className="p-2 bg-gray-100"
            />
            <input
              type="text"
              placeholder="Company (optional)"
              className="col-span-2 p-2 bg-gray-100"
            />
            <input
              type="text"
              placeholder="Address"
              className="col-span-2 p-2 bg-gray-100"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc."
              className="col-span-2 p-2 bg-gray-100"
            />
            <input type="text" placeholder="City" className="p-2 bg-gray-100" />
            <input
              type="text"
              placeholder="Province"
              className="p-2 bg-gray-100"
            />
            <input
              type="text"
              placeholder="Postal code"
              className="p-2 bg-gray-100"
            />
            <input
              type="text"
              placeholder="Phone"
              className="p-2 bg-gray-100"
            />
          </div>
          {/* Terms and Conditions Checkbox */}
          <button className="bg-green-900 text-white px-6 py-2 mt-4 rounded">
            Pay Now
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
