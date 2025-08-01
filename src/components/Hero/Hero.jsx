// File: src/components/Hero.jsx
import Logo from "../../assets/logo.png"; // Adjust the path as necessary

const Hero = () => {
  return (
    <div className="bg-[#DAB6A2] py-10 text-center">
      <img src={Logo} alt="Hero" className="mx-auto mb-1 mt-2" style={{ width: "500px", height: "300px" }} />

      <h1 className="text-4xl font-semibold mt-4"
      style={{ fontFamily: "'Playfair Display', serif" }}>Glow from within</h1>
      <button className="mt-6 bg-[#3c6e33] hover:bg-green-800 text-white px-6 py-2 rounded"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        Shop Now
      </button>
    </div>
  );
};

export default Hero;