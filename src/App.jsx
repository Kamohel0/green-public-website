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
import About from "./components/About/about";
import Signup from "./components/Profile/SignUp";
import ForgotPassword from "./components/Profile/forgotpassword";

const App = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Home Section */}
              <section id="home">
                <Hero />
              </section>

              {/* About Section */}
              {/* Uncomment when About component exists */}
              {/* <section id="about">
                <About />
              </section> */}

              {/* Services Section */}
              {/* Uncomment when Services component exists */}
              {/* <section id="services">
                <Services />
              </section> */}

              {/* Products Section */}
              <section id="products">
                <Products />
              </section>

              {/* Reviews Section */}
              <section id="reviews">
                <Reviews />
              </section>

              {/* Deals Section */}
              <section id="deals">
                <Deals />
              </section>
              {/* About us section */}
              <section id="about">
                <About />
              </section>
              {/* Contact Section */}
              <section id="contact">
                <Footer />
              </section>
            </>
          }
        />

        {/* Product detail page */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Cart page */}
        <Route path="/cart" element={<Cart />} />

        {/* Profile page */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Payment page */}
        <Route path="/payment" element={<Payment />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Sign Up page */}
        <Route path="/signup" element={<Signup />} />

        {/* forgot password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
      </Routes>
    </div>
  );
};

export default App;
