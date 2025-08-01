import React from "react";
import { User, Heart, ShoppingBag, Bell, CreditCard, LogOut, ArrowRight } from "lucide-react";
import Footer from "../footer/Footer";

const SidebarLink = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-100 ${active ? 'border-r-4 border-black' : ''}`}>
    <Icon className="w-5 h-5" />
    <span className="flex-grow">{label}</span>
    {active && <ArrowRight className="w-4 h-4" />}
  </div>
);

export const ProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex flex-col lg:flex-row flex-grow bg-white p-4"
      >
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 border-r"
        style={{ fontFamily: "'Playfair Display', serif" }}>
          <h2 className="text-lg font-semibold mb-4">Hi, Kamo</h2>
          <h3 className="font-bold text-md mb-4">Profile</h3>
          <SidebarLink icon={User} label="Profile" active />
          <SidebarLink icon={Heart} label="Wishlist" />
          <SidebarLink icon={ShoppingBag} label="Orders" />
          <SidebarLink icon={Bell} label="Preferences" />
          <SidebarLink icon={CreditCard} label="Money Account" />
          <SidebarLink icon={LogOut} label="Log Out" />
        </div>

        {/* Profile Form */}
        <div className="w-full lg:w-3/4 pl-4 mb-6"
        style={{ fontFamily: "'Playfair Display', serif" }}>
          <div className="border-b mb-4">
            <ul className="flex space-x-4 text-sm">
              <li className="border-b-2 border-black pb-1">Profile</li>
              <li className="cursor-pointer">Address</li>
              <li className="cursor-pointer">Change Password</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Name" className="bg-gray-100 p-2" />
            <input type="text" placeholder="Surname" className="bg-gray-100 p-2" />
            <input type="text" placeholder="Address" className="bg-gray-100 p-2 col-span-2" />
            <input type="text" placeholder="Province" className="bg-gray-100 p-2" />
            <input type="text" placeholder="Phone Number" className="bg-gray-100 p-2" />
            <input type="text" placeholder="Zip Code" className="bg-gray-100 p-2" />
            <input type="text" placeholder="City" className="bg-gray-100 p-2" />
          </div>
          <button className="bg-green-900 text-white px-6 py-2 mt-4 rounded">Save</button>
        </div>
        <Footer />
      </main>
    </div>
  );
};


export default ProfilePage;