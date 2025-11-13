import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaMinus, 
  FaPlus, 
  FaHeart, 
  FaShoppingBag, 
  FaStar,
  FaShare,
  FaCheck,
  FaTruck,
  FaShieldAlt,
  FaLeaf
} from "react-icons/fa";
import { FiThumbsUp, FiArrowRight } from "react-icons/fi";
import Footer from "../footer/Footer";
import useCartStore from "../store/useCartStore";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Product images
import Product1 from "../../assets/gel.png";
import Product2 from "../../assets/butter.png";
import Product3 from "../../assets/oil.png";
import Product4 from "../../assets/balm.png";

// Enhanced slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

// Enhanced product data
const items = [
  { 
    img: Product1, 
    name: "Sea Moss Gel", 
    price: "R 250", 
    priceValue: 250, 
    desc: "Our premium Sea Moss Gel is packed with 92 essential minerals and vitamins. Perfect for boosting immunity, improving digestion, and enhancing skin health. Made from 100% organic Irish sea moss.",
    benefits: ["Boosts Immunity", "Improves Digestion", "Enhances Skin Health", "Rich in Minerals"],
    id: "1",
    category: "wellness"
  },
  { 
    img: Product2, 
    name: "Sea Moss Body Butter", 
    price: "R 180", 
    priceValue: 180, 
    desc: "Luxurious body butter infused with sea moss extract. Provides deep hydration, improves skin elasticity, and leaves your skin feeling silky smooth with a natural glow.",
    benefits: ["Deep Hydration", "Improves Elasticity", "Natural Glow", "Non-Greasy"],
    id: "2",
    category: "skincare"
  },
  { 
    img: Product3, 
    name: "Sea Moss Castor Oil", 
    price: "R 180", 
    priceValue: 180, 
    desc: "Powerful hair growth blend combining sea moss nutrients with Jamaican black castor oil. Strengthens hair follicles and promotes healthy hair growth.",
    benefits: ["Promotes Hair Growth", "Strengthens Follicles", "Nourishes Scalp", "Reduces Breakage"],
    id: "3",
    category: "haircare"
  },
  { 
    img: Product4, 
    name: "Sea Moss Lip Balm", 
    price: "R 80", 
    priceValue: 80, 
    desc: "Soothing lip balm enriched with sea moss and natural oils. Provides long-lasting moisture and protection for dry, chapped lips.",
    benefits: ["Long-lasting Moisture", "Natural Protection", "Soothes Dry Lips", "Vegan Formula"],
    id: "4",
    category: "skincare"
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = items.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const addToCart = useCartStore((state) => state.addToCart);

  // Check wishlist status on component mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(wishlist.some(item => item.id === product?.id));
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Link to="/" className="text-[#15803d] hover:underline">
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = wishlist.find((item) => item.id === product.id);

    let updated;
    if (isAlreadyInWishlist) {
      updated = wishlist.filter((item) => item.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));
    setIsWishlisted(!isWishlisted);
  };

  const relatedProducts = items.filter((p) => p.id !== product.id && p.category === product.category);

  return (
    <div className="font-sans text-[#2E2E2E] bg-gray-50">
      {/* Success Notification */}
      <AnimatePresence>
        {showAddedToCart && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <FaCheck className="text-white" />
            <span>Added to cart successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#F6E9E0] to-[#f8f4f0] p-8 rounded-2xl shadow-sm"
          >
            <img 
              src={product.img} 
              alt={product.name} 
              className="w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-500" 
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600">
              <Link to="/" className="hover:text-[#15803d]">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/#products" className="hover:text-[#15803d]">Products</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800">{product.name}</span>
            </nav>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(42 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-bold text-[#15803d]">{product.price}</p>
              <p className="text-sm text-gray-500">250g • Free shipping</p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-2">
              {product.benefits?.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <FaCheck className="text-green-500 text-xs" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <FaMinus className="text-sm" />
                  </motion.button>
                  <span className="px-4 py-2 min-w-[60px] text-center font-medium">{quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <FaPlus className="text-sm" />
                  </motion.button>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-[#15803d] hover:bg-[#166534] text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-xl"
                  onClick={handleAddToCart}
                >
                  <FaShoppingBag />
                  Add to Cart
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 border rounded-lg transition-all duration-300 ${
                    isWishlisted 
                      ? "bg-red-50 border-red-300 text-red-500" 
                      : "bg-white border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500"
                  }`}
                  onClick={toggleWishlist}
                >
                  <FaHeart className={isWishlisted ? "fill-current" : ""} />
                </motion.button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <FaTruck className="mx-auto text-[#15803d] mb-2" />
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <FaShieldAlt className="mx-auto text-[#15803d] mb-2" />
                <p className="text-xs text-gray-600">Quality Guarantee</p>
              </div>
              <div className="text-center">
                <FaLeaf className="mx-auto text-[#15803d] mb-2" />
                <p className="text-xs text-gray-600">100% Natural</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white rounded-2xl shadow-sm p-6"
        >
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              {["description", "reviews", "shipping"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-4 px-1 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? "text-[#15803d] border-b-2 border-[#15803d]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-6">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{product.desc}</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Sample Review */}
                <div className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-center gap-2 text-yellow-500 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Tumi - <span className="text-gray-500">07 Jun 2025</span>
                  </p>
                  <p className="text-xs text-gray-500 mb-3">(Reviewed 7 days after purchase)</p>
                  <p className="text-gray-700 leading-relaxed">
                    This is my first time trying sea moss body butter, and I'm really impressed! 
                    It exceeded my expectations for daily skincare — it's super lightweight and 
                    absorbs quickly without leaving any greasy residue.
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 border rounded-full px-4 py-2 mt-3 text-sm transition-colors ${
                      isHelpful 
                        ? "bg-green-50 border-green-500 text-green-700" 
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                    onClick={() => setIsHelpful(!isHelpful)}
                  >
                    <FiThumbsUp /> 
                    Helpful ({isHelpful ? 3 : 2})
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="text-gray-700 space-y-3">
                <p><strong>Free shipping</strong> on all orders over R150</p>
                <p><strong>Delivery time:</strong> 3-5 business days</p>
                <p><strong>Returns:</strong> 30-day money-back guarantee</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                View all products
              </h3>
              <Link 
                to="/#products" 
                className="flex items-center gap-2 text-[#15803d] hover:text-[#166534] font-medium transition-colors"
              >
                View all <FiArrowRight />
              </Link>
            </div>

            {/* <Slider {...sliderSettings} className="grid gap-6">
              {relatedProducts.map((p) => (
                <div key={p.id} className="px-3">
                  <Link to={`/product/${p.id}`}>
                    <motion.div 
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                    >
                      <div className="bg-gradient-to-br from-[#f8f4f0] to-[#f0e6d8] rounded-xl p-6 mb-4">
                        <img
                          src={p.img}
                          alt={p.name}
                          className="w-full h-40 object-contain mx-auto transform hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-center">{p.name}</h4>
                      <p className="text-[#15803d] font-bold text-lg text-center">{p.price}</p>
                    </motion.div>
                  </Link>
                </div>
              ))}
            </Slider> */}
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}