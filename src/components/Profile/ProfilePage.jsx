import React, { useState, useEffect } from "react";
import {
  User,
  Heart,
  ShoppingBag,
  Bell,
  CreditCard,
  LogOut,
} from "lucide-react";
import Footer from "../footer/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Sidebar Link Component
const SidebarLink = ({ icon: Icon, label, value, active, onClick }) => (
  <button
    onClick={() => onClick(value)}
    className={`flex items-center w-full px-3 py-2 mb-2 text-sm rounded-md transition ${
      active ? "bg-gray-200 font-bold" : "hover:bg-gray-100 text-gray-700"
    }`}
  >
    <Icon className="mr-2 h-4 w-4" />
    {label}
  </button>
);

export const ProfilePage = () => {
  // Tabs state
  const [activeTab, setActiveTab] = useState("profile");

  // Wishlist state
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("wishlist") || "[]")
  );

  // Sync wishlist with localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

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
          <SidebarLink icon={User} label="Profile" value="profile" active={activeTab === "profile"} onClick={setActiveTab} />
          <SidebarLink icon={Heart} label="Wishlist" value="wishlist" active={activeTab === "wishlist"} onClick={setActiveTab} />
          <SidebarLink icon={ShoppingBag} label="Orders" value="orders" active={activeTab === "orders"} onClick={setActiveTab} />
          <SidebarLink icon={Bell} label="Preferences" value="preferences" active={activeTab === "preferences"} onClick={setActiveTab} />
          <SidebarLink icon={CreditCard} label="Money Account" value="account" active={activeTab === "account"} onClick={setActiveTab} />
          <SidebarLink icon={LogOut} label="Log Out" value="logout" active={false} onClick={() => alert("Logging out...")} />
        </div>

        {/* Main Content */}
        <div
          className="w-full lg:w-3/4 pl-4 mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="password">Change Password</TabsTrigger>
              {/*<TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="account">Money Account</TabsTrigger> */}
            </TabsList>

            {/* Profile */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Update your profile information.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-5">
                  <Input placeholder="Name" className="bg-gray-100 p-4" />
                  <Input placeholder="Surname" className="bg-gray-100 p-4" />
                  <Input placeholder="Address" className="bg-gray-100 p-4 col-span-2" />
                  <Input placeholder="Province" className="bg-gray-100 p-4" />
                  <Input placeholder="Phone Number" className="bg-gray-100 p-4" />
                  <Input placeholder="Zip Code" className="bg-gray-100 p-4" />
                  <Input placeholder="City" className="bg-gray-100 p-4" />
                </CardContent>
                <CardFooter>
                  <Button>Save</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Address */}
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Address</CardTitle>
                  <CardDescription>123 Example Street, Johannesburg</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Edit Address</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Change Password */}
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password here.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Change Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Wishlist */}
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>Your Wishlist</CardTitle>
                  <CardDescription>
                    {wishlist.length === 0 ? "No items yet." : "Your saved items."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {wishlist.length > 0 && (
                    <ul className="space-y-4">
                      {wishlist.map((item, i) => (
                        <li
                          key={i}
                          className="border p-4 rounded shadow-sm flex justify-between items-center"
                        >
                          <span>{item.name}</span>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              setWishlist((prev) => prev.filter((_, index) => index !== i))
                            }
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription>No recent orders.</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>

            {/* Preferences */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications & Preferences</CardTitle>
                  <CardDescription>
                    You are subscribed to email notifications.
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>

            {/* Account */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Your Balance</CardTitle>
                  <CardDescription>R550.00 available</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
