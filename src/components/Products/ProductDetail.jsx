import { useParams } from "react-router-dom";
import { FaMinus, FaPlus, FaHeart, FaShoppingBag, FaStar } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import Footer from "../footer/Footer";

// Import product images
import Product1 from "../../assets/gel.png";
import Product2 from "../../assets/butter.png";
import Product3 from "../../assets/oil.png";
import Product4 from "../../assets/balm.png";

// Product data array
const items = [
  { img: Product1, name: "Sea Moss Gel", price: "R 250", desc: "Gel description...", id: "1" },
  { img: Product2, name: "Sea Moss Body Butter", price: "R 180", desc: "Butter description...", id: "2" },
  { img: Product3, name: "Sea Moss Body Butter", price: "R 180", desc: "Butter description...", id: "3" },
  { img: Product4, name: "Sea Moss Lip Balm", price: "R 80", desc: "Lip balm description...", id: "4" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = items.find((p) => p.id === id);

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <div className="font-sans text-[#2E2E2E]">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-6 px-4 py-10 max-w-6xl mx-auto">
        {/* Product Image */}
        <div className="bg-[#F6E9E0] p-6 rounded">
          <img src={product.img} alt={product.name} className="w-full max-w-sm mx-auto" />
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-2">{product.name}</h2>
          <p className="mb-4 text-sm">{product.desc}</p>
          <p className="font-bold text-lg">{product.price}</p>
          <p className="text-sm">250g</p>

          {/* Quantity & Actions */}
          <div className="flex items-center space-x-3 mt-4">
            <button className="p-2 border rounded"><FaMinus /></button>
            <span>1</span>
            <button className="p-2 border rounded"><FaPlus /></button>
            <button className="ml-4 p-2 border rounded"><FaHeart /></button>
          </div>

          {/* Add to Bag */}
          <button className="mt-6 bg-green-800 text-white px-6 py-2 rounded flex items-center gap-2">
            <FaShoppingBag /> Add to Cart
          </button>
        </div>
      </div>

      {/* Review Section */}
      <div className="px-4 max-w-4xl mx-auto mb-10">
        <div className="flex items-center space-x-2 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} />)}
        </div>
        <p className="mt-2 text-sm font-semibold">Tumi - 07 Jun 2025 <span className="text-xs italic">(Reviewed 7 days after purchase)</span></p>
        <p className="text-sm mt-2">
          This is my first time trying sea moss body butter, and I’m really impressed! It exceeded my expectations for daily skincare — it’s super lightweight and absorbs quickly. My skin feels soft, nourished, and naturally hydrated, which is a huge plus. The light vanilla scent is soothing, and while the texture looked thicker in pictures, it’s actually smooth and easy to apply.
        </p>

        {/* Helpful Button */}
        <button className="flex items-center gap-2 border rounded-full px-4 py-1 mt-4 text-sm">
          <FiThumbsUp /> Helpful (2)
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}