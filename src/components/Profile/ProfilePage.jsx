import React, { useState } from "react";
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

const SidebarLink = ({ icon: Icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-100 ${
      active ? "border-r-4 border-black bg-gray-100" : ""
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="flex-grow">{label}</span>
    {active && <ArrowRight className="w-4 h-4" />}
  </div>
);

const ProfileTab = () => (
  <div className="grid grid-cols-2 gap-5">
    <input type="text" placeholder="Name" className="bg-gray-100 p-4" />
    <input type="text" placeholder="Surname" className="bg-gray-100 p-4" />
    <input
      type="text"
      placeholder="Address"
      className="bg-gray-100 p-4 col-span-2"
    />
    <input type="text" placeholder="Province" className="bg-gray-100 p-4" />
    <input
      type="text"
      placeholder="Phone Number"
      className="bg-gray-100 p-4"
    />
    <input type="text" placeholder="Zip Code" className="bg-gray-100 p-4" />
    <input type="text" placeholder="City" className="bg-gray-100 p-4" />
    <button className="bg-green-900 text-white px-6 py-2 mt-4 rounded col-span-2">
      Save
    </button>
  </div>
);

const AddressTab = () => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Saved Address</h3>
    <p>123 Example Street, Johannesburg</p>
    <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded">
      Edit Address
    </button>
  </div>
);

const PasswordTab = () => (
  <div className="grid grid-cols-1 gap-5">
    <input
      type="password"
      placeholder="Current Password"
      className="bg-gray-100 p-4"
    />
    <input
      type="password"
      placeholder="New Password"
      className="bg-gray-100 p-4"
    />
    <input
      type="password"
      placeholder="Confirm Password"
      className="bg-gray-100 p-4"
    />
    <button className="bg-green-900 text-white px-6 py-2 mt-4 rounded">
      Change Password
    </button>
  </div>
);

const WishlistTab = ({ wishlist }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Your Wishlist</h3>
    {wishlist.length === 0 ? (
      <p>No items yet.</p>
    ) : (
      <ul className="space-y-4">
        {wishlist.map((item, i) => (
          <li
            key={i}
            className="border p-4 rounded shadow-sm flex justify-between items-center"
          >
            <span>{item.name}</span>
            <button className="text-red-600">Remove</button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const OrdersTab = () => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Your Orders</h3>
    <p>No recent orders.</p>
  </div>
);

const PreferencesTab = () => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Notifications & Preferences</h3>
    <p>You are subscribed to email notifications.</p>
  </div>
);

const AccountTab = () => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Your Balance</h3>
    <p>R550.00 available</p>
  </div>
);

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Profile");
const [wishlist, setWishlist] = useState(() =>
  JSON.parse(localStorage.getItem("wishlist") || "[]")
);


  const tabContent = {
    Profile: <ProfileTab />,
    Address: <AddressTab />,
    "Change Password": <PasswordTab />,
    Wishlist: <WishlistTab wishlist={wishlist} />,
    Orders: <OrdersTab />,
    Preferences: <PreferencesTab />,
    "Money Account": <AccountTab />,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col lg:flex-row flex-grow bg-white p-4">
        {/* Sidebar */}
        <div
          className="w-full lg:w-1/4 border-r"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <h2 className="text-lg font-semibold mb-4">Hi, Kamo</h2>
          <h3 className="font-bold text-md mb-4">Profile</h3>
          <SidebarLink
            icon={User}
            label="Profile"
            active={activeTab === "Profile"}
            onClick={() => setActiveTab("Profile")}
          />
          <SidebarLink
            icon={Heart}
            label="Wishlist"
            active={activeTab === "Wishlist"}
            onClick={() => setActiveTab("Wishlist")}
          />
          <SidebarLink
            icon={ShoppingBag}
            label="Orders"
            active={activeTab === "Orders"}
            onClick={() => setActiveTab("Orders")}
          />
          <SidebarLink
            icon={Bell}
            label="Preferences"
            active={activeTab === "Preferences"}
            onClick={() => setActiveTab("Preferences")}
          />
          <SidebarLink
            icon={CreditCard}
            label="Money Account"
            active={activeTab === "Money Account"}
            onClick={() => setActiveTab("Money Account")}
          />
          <SidebarLink
            icon={LogOut}
            label="Log Out"
            active={false}
            onClick={() => alert("Logging out...")}
          />
        </div>

        {/* Main Content */}
        <div
          className="w-full lg:w-3/4 pl-4 mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {/* Top Tabs for Profile/Address/Password */}
          {activeTab === "Profile" ||
          activeTab === "Address" ||
          activeTab === "Change Password" ? (
            <div className="border-b mb-4">
              <ul className="flex space-x-4 text-sm">
                <li
                  className={`cursor-pointer ${
                    activeTab === "Profile"
                      ? "border-b-2 border-black pb-1"
                      : ""
                  }`}
                  onClick={() => setActiveTab("Profile")}
                >
                  Profile
                </li>
                <li
                  className={`cursor-pointer ${
                    activeTab === "Address"
                      ? "border-b-2 border-black pb-1"
                      : ""
                  }`}
                  onClick={() => setActiveTab("Address")}
                >
                  Address
                </li>
                <li
                  className={`cursor-pointer ${
                    activeTab === "Change Password"
                      ? "border-b-2 border-black pb-1"
                      : ""
                  }`}
                  onClick={() => setActiveTab("Change Password")}
                >
                  Change Password
                </li>
              </ul>
            </div>
          ) : null}

          {/* Dynamic Tab Content */}
          {tabContent[activeTab]}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
