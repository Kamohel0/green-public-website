"use client";

import { motion } from "framer-motion";
import Footer from "../footer/Footer";
import Logo from "../../assets/logo.png"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import your videos
import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";
import video3 from "../../assets/video3.mp4";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>


      {/* Our Story */}
      <section className="py-1 px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-10 bg-[#e9d6c5] ">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <img
            src={Logo}
            alt="Sea Moss Products"
            className="rounded-2xl shadow-lg object-cover w-full h-auto"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            What started as a small passion for holistic wellness has grown into a movement. At Glow, we set out to create products that not only care for your skin but also uplift your spirit.  
          </p>
          <p className="text-gray-700 leading-relaxed">
            Every jar, bottle, and balm is made with love, using ethically sourced ingredients from nature. Our goal is to help you glow — inside and out.  
          </p>
        </motion.div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-6 lg:px-20 grid gap-10 lg:grid-cols-3 text-center bg-[#DAB6A2] ">
        {[
          { title: "🌿 100% Natural", text: "We use only natural, ethically sourced ingredients in our products." },
          { title: "💚 Wellness First", text: "Your well-being is at the heart of everything we create." },
          { title: "🌍 Sustainability", text: "We are committed to eco-friendly practices that protect our planet." },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            className="p-6 bg-[#e9d6c5] rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-700">{item.text}</p>
          </motion.div>
        ))}
      </section>

  
  {/* video review */}
    <section className="py-20 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold mb-4"
      >
        Join Our Glow Journey
      </motion.h2>

      <p className="max-w-xl mx-auto mb-10 text-gray-700">
        Be part of a community that celebrates natural beauty, wellness, and self-love.
      </p>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        className="max-w-3xl mx-auto"
      >
        <SwiperSlide>
  <div className="w-full max-w-3xl mx-auto aspect-video">
    <video
      className="w-full h-full object-cover rounded-xl shadow-lg"
      controls
    >
      <source src={video1} type="video/mp4" />
    </video>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="w-full max-w-3xl mx-auto aspect-video">
    <video
      className="w-full h-full object-cover rounded-xl shadow-lg"
      controls
    >
      <source src={video2} type="video/mp4" />
    </video>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="w-full max-w-3xl mx-auto aspect-video">
    <video
      className="w-full h-full object-cover rounded-xl shadow-lg"
      controls
    >
      <source src={video3} type="video/mp4" />
    </video>
  </div>
</SwiperSlide>

      </Swiper>

      {/* CTA Button */}
      <a
        href="#products"
        className="mt-10 inline-block bg-[#15803d] hover:bg-green-800 text-white px-6 py-2 rounded"
      >
        Shop Now
      </a>
    </section>




      {/* Hero Section */}
      <section className="relative bg-green-800 text-white py-24 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl mx-auto text-lg text-white/90"
        >
          Glow isn’t just skincare — it’s a lifestyle. We believe in the power of natural ingredients like Sea Moss to nourish your skin, mind, and body.  
        </motion.p>
      </section>
    </div>
  );
};

export default About;
