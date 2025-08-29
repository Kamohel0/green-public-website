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
            What started as a small passion for holistic wellness has grown into
            a movement. At Glow, we set out to create products that not only
            care for your skin but also uplift your spirit.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Every jar, bottle, and balm is made with love, using ethically
            sourced ingredients from nature. Our goal is to help you glow —
            inside and out.
          </p>
        </motion.div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-6 lg:px-20 grid gap-10 lg:grid-cols-3 text-center bg-[#DAB6A2] ">
        {[
          {
            title: "🌿 100% Natural",
            text: "We use only natural, ethically sourced ingredients in our products.",
          },
          {
            title: "💚 Wellness First",
            text: "Your well-being is at the heart of everything we create.",
          },
          {
            title: "🌍 Sustainability",
            text: "We are committed to eco-friendly practices that protect our planet.",
          },
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

{/* Video Review Carousel */}
<section className="py-20 bg-gradient-to-b from-[#f8f5f2] bg-[#e9d6c5] text-center">
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-4xl font-bold mb-4"
    style={{ fontFamily: "'Playfair Display', serif" }}
  >
    Join Our Glow Journey
  </motion.h2>
  <p className="text-gray-600 max-w-2xl mx-auto mb-10">
    Hear from our community — real people sharing their Glow experience.  
  </p>

  <Carousel
    opts={{
      align: "center",
      loop: true,
    }}
    plugins={[
      Autoplay({ delay: 5000 }) // auto-slide every 5s
    ]}
    orientation="horizontal"
    className="w-full max-w-5xl mx-auto"
  >
    <CarouselContent className="h-auto">
      {videos.map((video, index) => (
        <CarouselItem key={index} className="basis-full md:basis-2/3 lg:basis-1/2">
          <div className="p-4">
            <Card className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition">
              <CardContent className="p-0">
                <video
                  className="w-full aspect-video rounded-2xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                >
                  <source src={video} type="video/mp4" />
                </video>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>

    <CarouselPrevious className="hidden md:flex" />
    <CarouselNext className="hidden md:flex" />
  </Carousel>
</section>

      {/* Hero Section */}
      <section className="relative bg-[#DAB6A2] text-black py-20 px-6 text-center">
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
          className="max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Glow isn’t just skincare — it’s a lifestyle. We believe in the power
          of natural ingredients like Sea Moss to nourish your skin, mind, and
          body.
        </motion.p>
      </section>
    </div>
  );
};

export default About;
