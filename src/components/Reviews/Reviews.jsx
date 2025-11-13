import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaQuoteLeft, FaPaperPlane } from "react-icons/fa";
import swirl from "../../assets/swirl.svg";
import avater from "../../assets/avatar.jpeg";

const reviews = [
  {
    text: "The sea moss body butter has done wonders for my skin, love it!",
    avatar: avater,
    name: "Sarah M.",
    rating: 5,
    date: "2 weeks ago"
  },
  {
    text: "Amazing products and fast delivery! My skin has never felt better.",
    avatar: avater,
    name: "Jessica T.",
    rating: 5,
    date: "1 month ago"
  },
  {
    text: "My favorite shop for natural skincare. The sea moss gel is incredible!",
    avatar: avater,
    name: "David K.",
    rating: 4,
    date: "3 weeks ago"
  },
  {
    text: "Customer service was super helpful and friendly. Highly recommended!",
    avatar: avater,
    name: "Emily R.",
    rating: 5,
    date: "2 days ago"
  },
];

const Reviews = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false, // Better for mobile
    arrows: false, // Hide arrows on mobile
    fade: true,
    adaptiveHeight: true, // Better mobile height handling
    appendDots: (dots) => (
      <div className="mt-6 md:mt-8">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-[#2e3c22] opacity-30 transition-all duration-300" />
    ),
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating === 0) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setReviewText("");
    setRating(0);
    setIsSubmitting(false);
    
    alert("Thank you for your review!");
  };

  return (
    <section 
      className="bg-gradient-to-br from-[#f8f4f0] to-[#e9d6c5] py-12 md:py-20 relative overflow-hidden"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* Background Pattern - Simplified for mobile */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-[#2e3c22] md:top-10 md:left-10 md:w-20 md:h-20"></div>
        <div className="absolute bottom-8 right-4 w-10 h-10 rounded-full bg-[#15803d] md:bottom-20 md:right-16 md:w-16 md:h-16"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 md:mb-4 px-2">
            Customer Reviews
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
            Discover what our customers are saying about their experience
          </p>
        </motion.div>

        {/* Reviews Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-lg border border-white/20 mx-2"
        >
          <Slider {...settings}>
            {reviews.map((review, idx) => (
              <div key={idx} className="outline-none focus:outline-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center px-2 md:px-4"
                >
                  {/* Decorative Swirl */}
                  <motion.img 
                    src={swirl} 
                    alt="" 
                    className="w-16 md:w-20 mb-4 md:mb-6 opacity-80"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Quote Icon */}
                  <div className="text-2xl md:text-3xl lg:text-4xl text-[#15803d] mb-4 md:mb-6 opacity-60">
                    <FaQuoteLeft />
                  </div>

                  {/* Review Text */}
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 mb-6 md:mb-8 leading-relaxed italic px-2 sm:px-0 max-w-2xl">
                    "{review.text}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-3 md:mb-4">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <FaStar
                        key={starIdx}
                        className={`text-sm md:text-base lg:text-lg ${
                          starIdx < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center justify-center gap-3 md:gap-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white shadow-lg"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-gray-800 text-sm md:text-base">{review.name}</p>
                      <p className="text-xs md:text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </motion.div>

        {/* Leave Review Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 md:mt-12 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-white/20 mx-2"
        >
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4 md:mb-6">
            Share Your Experience
          </h3>
          
          <form onSubmit={handleSubmitReview} className="max-w-2xl mx-auto">
            {/* Star Rating */}
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="flex gap-1 md:gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-xl md:text-2xl transition-transform duration-200 active:scale-95 touch-manipulation"
                  >
                    <FaStar
                      className={`${
                        star <= (hoverRating || rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Share your experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-4 py-3 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent transition-all duration-300 bg-white touch-manipulation"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                />
              </div>
              <motion.button
                type="submit"
                disabled={!reviewText.trim() || rating === 0 || isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#15803d] hover:bg-[#166534] disabled:bg-gray-400 text-white px-4 md:px-6 py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed touch-manipulation min-h-[48px] text-sm md:text-base"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <FaPaperPlane className="text-xs md:text-sm" />
                      <span className="hidden sm:inline">Send</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Stats - Stack on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-center mx-2"
        >
          <div className="bg-white/60 rounded-xl p-4 md:p-6 shadow-sm border border-white/20">
            <div className="text-2xl md:text-3xl font-bold text-[#15803d]">4.8</div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">Average Rating</div>
          </div>
          <div className="bg-white/60 rounded-xl p-4 md:p-6 shadow-sm border border-white/20">
            <div className="text-2xl md:text-3xl font-bold text-[#15803d]">200+</div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">Happy Customers</div>
          </div>
          <div className="bg-white/60 rounded-xl p-4 md:p-6 shadow-sm border border-white/20">
            <div className="text-2xl md:text-3xl font-bold text-[#15803d]">98%</div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">Would Recommend</div>
          </div>
        </motion.div>
      </div>

      {/* Mobile-specific styles */}
      <style jsx>{`
        /* Improve touch interactions on mobile */
        @media (max-width: 768px) {
          .slick-dots {
            bottom: -40px !important;
          }
          
          .slick-dots li {
            margin: 0 4px !important;
          }
          
          /* Ensure proper tap targets */
          button, input {
            min-height: 44px;
          }
        }
        
        /* Prevent horizontal scroll on mobile */
        .slick-slider {
          overflow: hidden;
        }
        
        .slick-list {
          margin: 0 -8px;
        }
        
        .slick-slide > div {
          margin: 0 8px;
        }
      `}</style>
    </section>
  );
};

export default Reviews;