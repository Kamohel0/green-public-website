import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaGift, FaTag, FaRocket } from "react-icons/fa";

const Deals = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would typically send to your email service
    console.log("Newsletter signup:", email);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section 
      className="bg-gradient-to-br from-[#E8D0BC] to-[#DAB6A2] py-12 md:py-16 lg:py-20 relative overflow-hidden"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#2e3c22] md:top-8 md:left-8 md:w-12 md:h-12"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[#15803d] md:bottom-8 md:right-8 md:w-10 md:h-10"></div>
        <div className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-[#2e3c22]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 md:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
              Join Our Newsletter
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-1 bg-[#15803d] mx-auto rounded-full"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto px-2"
          >
            Join to get special offers, giveaways, new product launches and exclusive deals delivered straight to your inbox.
          </motion.p>

          {/* Benefits Icons - Hidden on mobile, shown on tablet+ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden sm:grid grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-10 max-w-2xl mx-auto"
          >
            {[
              { icon: FaGift, text: "Special Offers" },
              { icon: FaTag, text: "Exclusive Deals" },
              { icon: FaRocket, text: "New Launches" }
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-white/50 rounded-full p-3 md:p-4 mb-2 shadow-sm">
                  <item.icon className="text-[#15803d] text-lg md:text-xl" />
                </div>
                <span className="text-sm md:text-base text-gray-700 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Newsletter Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="your-email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 md:py-4 text-sm md:text-base border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent transition-all duration-300 bg-white/95 shadow-sm touch-manipulation"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={!email.trim() || isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#15803d] hover:bg-[#166534] disabled:bg-gray-400 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed touch-manipulation min-h-[48px] text-sm md:text-base shadow-lg hover:shadow-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    />
                  ) : isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <FaPaperPlane className="text-sm" />
                      <span className="hidden sm:inline">Joined!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <FaPaperPlane className="text-sm" />
                      <span className="hidden sm:inline">Join Now</span>
                      <span className="sm:hidden">Join</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.form>

          {/* Success Message */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm"
              >
                🎉 Welcome to the family! Check your email for a special welcome gift.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Privacy Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xs text-gray-600 mt-4 md:mt-6 max-w-md mx-auto px-4"
          >
            We respect your privacy. Unsubscribe at any time. No spam, ever.
          </motion.p>
        </motion.div>
      </div>

      {/* Mobile-specific decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/10 to-transparent md:hidden"></div>
    </section>
  );
};

export default Deals;