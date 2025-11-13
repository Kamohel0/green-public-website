import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Product1 from "../../assets/gel.png";
import Product2 from "../../assets/butter.png";
import Product3 from "../../assets/oil.png";
import Product4 from "../../assets/balm.png";

const items = [
  { 
    img: Product1, 
    name: "Sea Moss Gel", 
    price: "R 120", 
    id: 1,
    category: "gels",
    description: "Nutrient-rich sea moss gel for daily wellness"
  },
  { 
    img: Product2, 
    name: "Sea Moss Body Butter", 
    price: "R 180", 
    id: 2,
    category: "skincare",
    description: "Luxurious hydration for silky smooth skin"
  },
  { 
    img: Product3, 
    name: "Sea Moss Oil", 
    price: "R 100", 
    id: 3,
    category: "oils",
    description: "Nourishing oil for hair and skin vitality"
  },
  { 
    img: Product4, 
    name: "Sea Moss Lip Balm", 
    price: "R 80", 
    id: 4,
    category: "skincare",
    description: "Soothing lip care with natural ingredients"
  },
];

const Products = ({ searchTerm }) => {
  const [search, setSearch] = useState(searchTerm || "");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Extract unique categories
  const categories = ["all", ...new Set(items.map(item => item.category))];

  // Filter items based on search and category
  const filteredItems = items.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategory === "all" || p.category === selectedCategory)
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="bg-white py-16 md:py-20" id="products">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our collection of natural sea moss products crafted for your wellness and beauty
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Search Input */}
          <div className="w-full md:w-64">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent transition-all duration-300"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#15803d] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${search}-${selectedCategory}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  layout
                  whileHover="hover"
                  onHoverStart={() => setHoveredProduct(product.id)}
                  onHoverEnd={() => setHoveredProduct(null)}
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer border border-gray-100">
                      {/* Product Image */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-[#f8f4f0] to-[#f0e6d8] p-6">
                        <motion.img
                          src={product.img}
                          alt={product.name}
                          className="mx-auto w-48 h-48 object-contain transform group-hover:scale-110 transition-transform duration-500"
                          whileHover={{ scale: 1.1 }}
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
                      </div>

                      {/* Product Info */}
                      <div className="p-6 text-center">
                        <motion.h3 
                          className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {product.name}
                        </motion.h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[40px]">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-[#15803d]">
                            {product.price}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#15803d] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#166534] transition-colors duration-300 shadow-md hover:shadow-lg"
                          >
                            View Details
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Products;