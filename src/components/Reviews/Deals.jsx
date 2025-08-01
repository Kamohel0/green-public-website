const Deals = () => {
  return (
    <div className="bg-[#DAB6A2] py-12  flex items-center justify-center" style={{ fontFamily: "'Playfair Display', serif" }}>
      <div className="container mx-auto px-4 text-center">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Deals
        </h2>
        <div className="mt-8 max-w-md mx-auto flex gap-2">
          <input
            type="text"
            placeholder="your-email@example.com"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          />
          <button
            className="bg-[#3c6e33] hover:bg-green-800 text-white px-8 rounded text-lg font-semibold cursor-default"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deals;
