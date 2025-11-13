import React, { useState, useEffect } from "react";
import {
  User,
  Heart,
  ShoppingBag,
  Bell,
  CreditCard,
  LogOut,
  MapPin,
  Shield,
  Edit3,
  Check,
  X,
  Eye,
  EyeOff,
  LogIn,
  UserPlus
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
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Import your existing components
import Signup from "./SignUp";
import Login from "./Login";

const SidebarLink = ({ icon: Icon, label, value, active, onClick, badge }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`flex items-center justify-between p-3 cursor-pointer rounded-lg transition-all duration-200 ${
      active 
        ? "bg-green-50 border border-green-200 text-green-700 font-semibold" 
        : "hover:bg-gray-50 text-gray-700"
    }`}
    onClick={() => onClick(value)}
  >
    <div className="flex items-center">
      <Icon className="w-5 h-5 mr-3" />
      <span className="text-sm">{label}</span>
    </div>
    {badge && (
      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full min-w-6 text-center">
        {badge}
      </span>
    )}
  </motion.div>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [activeAuthTab, setActiveAuthTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    province: "",
    phone: "",
    zip: "",
    city: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!token && !!user);
    
    if (token && user) {
      setActiveAuthTab("profile");
    }
  }, []);

  // Load wishlist and orders from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setWishlist(savedWishlist);
    setOrders(savedOrders);
  }, []);

  // Fetch profile from backend if logged in
  useEffect(() => {
    const fetchProfile = async () => {
      if (!isLoggedIn) return;
      
      try {
        setLoading(true);
        const { data } = await getProfile();
        setProfile(data);
      } catch (err) {
        setMessage({ 
          text: "Failed to load profile. Please try again.", 
          type: "error" 
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [isLoggedIn]);

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Save profile changes
  const handleProfileSave = async () => {
    setLoading(true);
    setMessage({ text: "", type: "" });

    // Basic validation
    if (!profile.name.trim() || !profile.email.trim()) {
      setMessage({ 
        text: "Name and email are required fields.", 
        type: "error" 
      });
      setLoading(false);
      return;
    }

    try {
      await updateProfile(profile);
      setMessage({ 
        text: "Profile updated successfully!", 
        type: "success" 
      });
      setIsEditing(false);
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || "Failed to update profile.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ 
        text: "New passwords do not match.", 
        type: "error" 
      });
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ 
        text: "New password must be at least 6 characters long.", 
        type: "error" 
      });
      setLoading(false);
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword
      });
      
      setMessage({ 
        text: "Password updated successfully!", 
        type: "success" 
      });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || "Failed to change password.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveAuthTab("profile");
    setActiveTab("profile");
  };

  const handleSignupSuccess = () => {
    setActiveAuthTab("login");
    setMessage({
      text: "Account created successfully! Please log in.",
      type: "success"
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setActiveAuthTab("login");
    setActiveTab("profile");
    navigate("/");
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const getOrderStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex flex-col lg:flex-row flex-grow p-4 lg:p-6 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <div className="w-full lg:w-80 mb-6 lg:mb-0 lg:mr-6">
          <Card className="sticky top-6">
            <CardHeader className="pb-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {isLoggedIn ? (
                  <>
                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                      Hello, {profile.name || 'User'}! 👋
                    </h2>
                    <p className="text-sm text-gray-600">
                      Manage your account and preferences
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                      Welcome! 
                    </h2>
                    <p className="text-sm text-gray-600">
                      Sign in to access your account
                    </p>
                  </>
                )}
              </motion.div>
            </CardHeader>
            
            <CardContent className="space-y-2">
              {isLoggedIn ? (
                <>
                  <SidebarLink
                    icon={User}
                    label="Profile Information"
                    value="profile"
                    active={activeTab === "profile"}
                    onClick={setActiveTab}
                  />
                  <SidebarLink
                    icon={MapPin}
                    label="Address"
                    value="address"
                    active={activeTab === "address"}
                    onClick={setActiveTab}
                  />
                  <SidebarLink
                    icon={Heart}
                    label="Wishlist"
                    value="wishlist"
                    active={activeTab === "wishlist"}
                    onClick={setActiveTab}
                    badge={wishlist.length}
                  />
                  <SidebarLink
                    icon={ShoppingBag}
                    label="Order History"
                    value="orders"
                    active={activeTab === "orders"}
                    onClick={setActiveTab}
                    badge={orders.length}
                  />
                  <SidebarLink
                    icon={Shield}
                    label="Change Password"
                    value="password"
                    active={activeTab === "password"}
                    onClick={setActiveTab}
                  />
                  <SidebarLink
                    icon={Bell}
                    label="Notifications"
                    value="preferences"
                    active={activeTab === "preferences"}
                    onClick={setActiveTab}
                  />
                  
                  <div className="pt-4 border-t">
                    <SidebarLink
                      icon={LogOut}
                      label="Log Out"
                      value="logout"
                      active={false}
                      onClick={handleLogout}
                    />
                  </div>
                </>
              ) : (
                <>
                  <SidebarLink
                    icon={LogIn}
                    label="Sign In"
                    value="auth"
                    active={activeTab === "auth"}
                    onClick={() => setActiveTab("auth")}
                  />
                  <SidebarLink
                    icon={UserPlus}
                    label="Create Account"
                    value="auth"
                    active={activeTab === "auth"}
                    onClick={() => {
                      setActiveTab("auth");
                      setActiveAuthTab("signup");
                    }}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-lg mb-6 ${
                  message.type === "success" 
                    ? "bg-green-50 border border-green-200 text-green-700" 
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{message.text}</span>
                  <button onClick={() => setMessage({ text: "", type: "" })}>
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Authentication Tabs (Show when not logged in) */}
          {!isLoggedIn && activeTab === "auth" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Account Access</CardTitle>
                  <CardDescription>
                    Sign in to your account or create a new one
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeAuthTab} onValueChange={setActiveAuthTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login" className="flex items-center gap-2">
                        <LogIn size={16} />
                        Sign In
                      </TabsTrigger>
                      <TabsTrigger value="signup" className="flex items-center gap-2">
                        <UserPlus size={16} />
                        Create Account
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login" className="mt-6">
                      <Login 
                        onSuccess={handleLoginSuccess}
                        showHeader={false}
                      />
                    </TabsContent>
                    
                    <TabsContent value="signup" className="mt-6">
                      <Signup 
                        onSuccess={handleSignupSuccess}
                        showHeader={false}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Profile Information (Show when logged in) */}
          {isLoggedIn && activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2"
                  >
                    <Edit3 size={16} />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">First Name *</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surname">Last Name *</Label>
                      <Input
                        id="surname"
                        value={profile.surname}
                        onChange={(e) => handleProfileChange('surname', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        disabled={!isEditing}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        disabled={!isEditing}
                        placeholder="+27 XXX XXX XXXX"
                      />
                    </div>
                  </div>
                </CardContent>
                {isEditing && (
                  <CardFooter>
                    <Button 
                      onClick={handleProfileSave} 
                      disabled={loading}
                      className="flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check size={16} />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          )}

          {/* Address */}
          {isLoggedIn && activeTab === "address" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Saved Address</CardTitle>
                  <CardDescription>
                    Your primary delivery address
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {profile.address ? (
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-gray-50">
                        <p className="font-medium">{profile.address}</p>
                        <p className="text-sm text-gray-600">
                          {profile.city}, {profile.province} {profile.zip}
                        </p>
                      </div>
                      <Button onClick={() => setActiveTab("profile")}>
                        Edit Address
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="mx-auto text-gray-400 mb-3" size={48} />
                      <p className="text-gray-500 mb-4">No address saved yet</p>
                      <Button onClick={() => setActiveTab("profile")}>
                        Add Address
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Wishlist */}
          {isLoggedIn && activeTab === "wishlist" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                  <CardDescription>
                    Products you've saved for later
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {wishlist.length > 0 ? (
                    <div className="space-y-4">
                      {wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-green-600 font-semibold">
                                {item.price}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => navigate(`/product/${item.id}`)}
                              variant="outline"
                              size="sm"
                            >
                              View Product
                            </Button>
                            <Button
                              onClick={() => removeFromWishlist(item.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="mx-auto text-gray-400 mb-4" size={64} />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        Your wishlist is empty
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Start adding products you love to your wishlist
                      </p>
                      <Button onClick={() => navigate("/#products")}>
                        Browse Products
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Order History */}
          {isLoggedIn && activeTab === "orders" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    Track your recent purchases and orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="p-4 border rounded-lg space-y-3"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">Order #{order.id}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-lg font-bold text-green-600">
                              {order.total}
                            </p>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        No orders yet
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Your order history will appear here
                      </p>
                      <Button onClick={() => navigate("/#products")}>
                        Start Shopping
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Change Password */}
          {isLoggedIn && activeTab === "password" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handlePasswordSubmit}>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPasswords.current ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                          required
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('current')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showPasswords.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                          required
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('new')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Password must be at least 6 characters long
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                          required
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('confirm')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          )}

          {/* Notifications/Preferences */}
          {isLoggedIn && activeTab === "preferences" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how you receive updates and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">Order updates and promotions</p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-600">Order status updates</p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;