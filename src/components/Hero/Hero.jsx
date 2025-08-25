import { motion } from "framer-motion";
import Logo from "../../assets/logo.png";
import video from "../../assets/hero-bg.mp4";

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden text-center">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay blur and tint */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"></div>

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
        <motion.img
          src={Logo}
          alt="Glow Logo"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6 mt-2 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
          style={{ width: "320px", height: "auto", objectFit: "contain" }}
        />

        <motion.h1
          className="text-5xl font-bold mb-4 text-white drop-shadow-lg"
          style={{
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "2px",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Glow from within
        </motion.h1>

        <motion.p
          className="text-lg text-white/90 mb-8 max-w-xl mx-auto"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Discover natural beauty products that nourish your skin and elevate
          your glow.
        </motion.p>

        <motion.button
          className="bg-[#3c6e33] hover:bg-[#295024] transition-colors duration-300 text-white px-10 py-3 rounded-full shadow-lg text-lg font-semibold hover:scale-105 active:scale-95"
          style={{
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "1px",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          Shop Now
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;
