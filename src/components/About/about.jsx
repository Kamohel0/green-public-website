"use client";

import { motion } from "framer-motion";
import React from "react";
import Footer from "../footer/Footer";
import Logo from "../../assets/logo.png";

// shadcn/ui carousel
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Import your videos
import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";
import video3 from "../../assets/video3.mp4";

const About = () => {
  const videos = [video1, video2, video3];

  return (
    <div
      className="min-h-screen flex flex-col bg-white text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* Hero Section - Moved to top for better flow */}
      <section className="relative bg-gradient-to-br from-[#DAB6A2] to-[#e9d6c5] text-gray-800 py-16 md:py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            About Glow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Glow isn't just skincare — it's a lifestyle. We believe in the power
            of natural ingredients like Sea Moss to nourish your skin, mind, and
            body.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 bg-white">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 w-full max-w-md lg:max-w-lg"
        >
          <img
            src={Logo}
            alt="Sea Moss Products"
            className="rounded-2xl shadow-xl object-cover w-full h-auto hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 p-6 md:p-8 rounded-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Story</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-lg">
              What started as a small passion for holistic wellness has grown into
              a movement. At Glow, we set out to create products that not only
              care for your skin but also uplift your spirit.
            </p>
            <p className="text-lg">
              Every jar, bottle, and balm is made with love, using ethically
              sourced ingredients from nature. Our goal is to help you glow —
              inside and out.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-20 bg-gradient-to-br from-[#f8f5f2] to-[#e9d6c5]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Guided by nature, driven by purpose — these principles shape everything we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "🌿 100% Natural",
                text: "We use only natural, ethically sourced ingredients in our products.",
                icon: "🌿"
              },
              {
                title: "💚 Wellness First",
                text: "Your well-being is at the heart of everything we create.",
                icon: "💚"
              },
              {
                title: "🌍 Sustainability",
                text: "We are committed to eco-friendly practices that protect our planet.",
                icon: "🌍"
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Review Carousel */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#f8f5f2] to-[#e9d6c5] text-center">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Join Our Glow Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Hear from our community — real people sharing their Glow experience.  
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[
                Autoplay({ 
                  delay: 5000,
                  stopOnInteraction: false,
                  stopOnMouseEnter: true 
                })
              ]}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent className="h-auto">
                {videos.map((video, index) => (
                  <CarouselItem key={index} className="basis-full md:basis-2/3 lg:basis-1/2">
                    <div className="p-2 md:p-4">
                      <Card className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-0">
                        <CardContent className="p-0">
                          <video
                            className="w-full aspect-video rounded-2xl object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls={false}
                          >
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Navigation Arrows - Hidden on mobile */}
              <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12" />
              <CarouselNext className="hidden md:flex -right-4 lg:-right-12" />
            </Carousel>
          </motion.div>

          {/* Carousel Dots Indicator */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {videos.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#DAB6A2] to-[#e9d6c5] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Ready to Start Your Glow Journey?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover the power of natural skincare and join thousands of customers who have transformed their routine.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#15803d] hover:bg-[#166534] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Shop Our Products
          </motion.button>
        </motion.div>
      </section> */}

      {/* <Footer /> */}
    </div>
  );
};

export default About;