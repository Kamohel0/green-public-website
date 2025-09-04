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
import { getProfile, updateProfile, changePassword } from "@/api/authApi";




const SidebarLink = ({ icon: Icon, label, value, active, onClick }) => (
  <div
    className={`flex items-center p-2 cursor-pointer ${
      active ? "bg-gray-100 font-semibold" : ""
    }`}
    onClick={() => onClick(value)}
  >
    <Icon className="w-5 h-5 mr-2" />
    {label}
  </div>
);

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    address: "",
    province: "",
    phone: "",
    zip: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("wishlist") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await getProfile();
        setProfile(data);
      } catch (err) {
        setMessage("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Save profile changes
  const handleProfileSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      await updateProfile(profile);
      setMessage(" Profile updated successfully!");
    } catch (err) {
      setMessage(" Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    try {
      await changePassword({ currentPassword, newPassword, confirmPassword });
      setMessage("Password updated!");
    } catch (err) {
      setMessage(" Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col lg:flex-row flex-grow bg-white p-4">
        {/* Sidebar */}
        <div
          className="w-full lg:w-1/4 border-r"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <h2 className="text-lg font-semibold mb-4">Hi, {profile.name}</h2>
          <h3 className="font-bold text-md mb-4">Profile</h3>

          <SidebarLink
            icon={User}
            label="Profile"
            value="profile"
            active={activeTab === "profile"}
            onClick={setActiveTab}
          />
          <SidebarLink
            icon={Heart}
            label="Wishlist"
            value="wishlist"
            active={activeTab === "wishlist"}
            onClick={setActiveTab}
          />
          <SidebarLink
            icon={ShoppingBag}
            label="Orders"
            value="orders"
            active={activeTab === "orders"}
            onClick={setActiveTab}
          />
          <SidebarLink
            icon={Bell}
            label="Preferences"
            value="preferences"
            active={activeTab === "preferences"}
            onClick={setActiveTab}
          />
          <SidebarLink
            icon={CreditCard}
            label="Money Account"
            value="account"
            active={activeTab === "account"}
            onClick={setActiveTab}
          />
          <SidebarLink
            icon={LogOut}
            label="Log Out"
            value="logout"
            active={false}
            onClick={() => {
              localStorage.removeItem("accessToken");
              window.location.href = "/login";
            }}
          />
        </div>

        {/* Main Content */}
        <div
          className="w-full lg:w-3/4 pl-4 mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {message && (
            <p className="mb-4 text-center text-sm text-red-500">{message}</p>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="password">Change Password</TabsTrigger>
            </TabsList>

            {/* Profile */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Update your profile information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-5">
                  <Input
                    placeholder="Name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Surname"
                    value={profile.surname}
                    onChange={(e) =>
                      setProfile({ ...profile, surname: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Address"
                    className="col-span-2"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Province"
                    value={profile.province}
                    onChange={(e) =>
                      setProfile({ ...profile, province: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Phone Number"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Zip Code"
                    value={profile.zip}
                    onChange={(e) =>
                      setProfile({ ...profile, zip: e.target.value })
                    }
                  />
                  <Input
                    placeholder="City"
                    value={profile.city}
                    onChange={(e) =>
                      setProfile({ ...profile, city: e.target.value })
                    }
                  />
                </CardContent>
                <CardFooter>
                  <Button onClick={handleProfileSave} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Address */}
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Address</CardTitle>
                  <CardDescription>{profile.address}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={() => setActiveTab("profile")}>
                    Edit Address
                  </Button>
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
                <form onSubmit={handlePasswordChange}>
                  <CardContent className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="current-password">
                        Current Password
                      </Label>
                      <Input id="current-password" type="password" required />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" required />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="confirm-password">
                        Confirm Password
                      </Label>
                      <Input id="confirm-password" type="password" required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Changing..." : "Change Password"}
                    </Button>
                  </CardFooter>
                </form>
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
