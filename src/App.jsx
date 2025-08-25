import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import Reviews from "./components/Reviews/Reviews";
import Deals from "./components/Reviews/Deals";
import Footer from "./components/footer/Footer";
import ProductDetail from "./components/Products/ProductDetail";
import Cart from "./components/Cart/Cart";
import ProfilePage from "./components/Profile/ProfilePage";
import Payment from "./components/Payment/payment";
import Login from "./components/Profile/Login";

const App = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Products />
              <Reviews />
              <Deals />
              <Footer />
          

            </>
          }
        />
        {/* Product detail page */}
        <Route path="/product/:id" element={<ProductDetail />} />
          {/* Cart page */}
        <Route path="/cart" element={<Cart />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/payment" element={<Payment />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
