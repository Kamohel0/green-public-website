import { Link } from "react-router-dom";
import Product1 from "../../assets/gel.png";
import Product2 from "../../assets/butter.png";
import Product3 from "../../assets/oil.png";
import Product4 from "../../assets/balm.png";

const items = [
  { img: Product1, name: "Sea Moss Gel", price: "R 180", id: 1 },
  { img: Product2, name: "Sea Moss Body Butter", price: "R 180", id: 2 },
  { img: Product3, name: "Sea Moss Castor Oil", price: "R 180", id: 3 },
  { img: Product4, name: "Sea Moss Lip Balm", price: "R 80", id: 4 },
];

const Products = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-4 gap-8">
          {items.map((p) => (
            <Link to={`/product/${p.id}`} key={p.id}>
              <div className="bg-[#f8eee7] p-4 rounded-md text-center shadow-sm cursor-pointer hover:shadow-lg transition" style={{ fontFamily: "'Playfair Display', serif" }}>
                <img src={p.img} alt={p.name} className="mx-auto w-32 mb-3" />
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-600">{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
        {/* <div className="text-center mt-8">
          <button className="bg-[#15803d] hover:bg-green-800 text-white px-6 py-2 rounded"
          style={{ fontFamily: "'Playfair Display', serif" }}>
            View All
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Products;