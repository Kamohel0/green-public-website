import { motion } from "framer-motion"
import { useNavigate, useLocation } from "react-router-dom"
import Logo from "../../assets/logo.png"
import video from "../../assets/hero-bg.mp4"

const Hero = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleScroll = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      navigate(`/#${id}`)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video with enhanced overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105" // Slight zoom for better effect
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 backdrop-blur-[1px] z-10"></div>
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div
          variants={logoVariants}
          className="mb-8"
        >
          <img
            src={Logo}
            alt="Glow Logo"
            className="rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500 hover:shadow-3xl hover:rotate-1"
            style={{ 
              width: "min(380px, 70vw)", 
              height: "auto", 
              objectFit: "contain" 
            }}
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
          style={{
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "1.5px",
            textShadow: "0 4px 12px rgba(0,0,0,0.3)",
            lineHeight: "1.1"
          }}
        >
          Glow from within
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            textShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}
        >
          Discover natural beauty products that nourish your skin and elevate your radiance.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={() => handleScroll("products")}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "#166534",
            boxShadow: "0 10px 25px rgba(21, 128, 61, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#15803d] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.5px"
          }}
        >
          Shop Now
          <motion.span
            className="ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
          
          </motion.span>
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero