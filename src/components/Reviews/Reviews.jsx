import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import swirl from "../../assets/swirl.svg";
import avater from "../../assets/avatar.jpeg"; // Adjust the path as necessary

const reviews = [
  {
    text: "The sea moss body butter has done wonders for my skin, love it!",
    avatar: avater,
  },
  {
    text: "Amazing products and fast delivery!",
    avatar: avater,
  },
  {
    text: "My favorite shop for natural skincare.",
    avatar: avater,
  },
  {
    text: "Customer service was super helpful and friendly.",
    avatar: avater,
  },
];

const Reviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    appendDots: (dots) => (
      <div>
        <ul style={{ margin: "-10px" }}>{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "#2e3c22",
          opacity: 0.3,
          display: "inline-block",
        }}
      />
    ),
  };

  return (
    <div
      className="bg-[#e9d6c5] py-12  flex items-center justify-center"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <div className="w-full max-w-xl mx-auto text-center bg-[#e9d6c5] rounded-lg p-8 shadow-none">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <Slider
          {...settings}
          className="relative"
          dotsClass="slick-dots custom-dots"
        >
          {reviews.map((review, idx) => (
            <div key={idx}>
              <div className="flex flex-col items-center">
                {/* Swirl SVG */}
                <img src={swirl} alt="" className="w-24 mb-2" />
                {/* Avatar */}
                <img
                  src={review.avatar}
                  alt="avatar"
                  className="w-16 h-16 rounded-full object-cover border-4 border-white mx-auto mb-4 shadow"
                />
                {/* Review Text */}
                <p className="text-xl font-italics text-[#2e2e2e] mb-2">
                  {review.text}
                </p>
              </div>
            </div>
          ))}
        </Slider>
        {/* Custom Dots Styling */}
        <style>
          {`
            .custom-dots li.slick-active div {
              opacity: 1 !important;
              background: #2e3c22 !important;
            }
            .custom-dots {
              margin-top: 1rem;
              margin-bottom: 1rem;
            }
            .slick-arrow {
              color: #2e2e2e !important;
              z-index: 1;
            }
          `}
        </style>
        {/* Review Input */}
        <div className="mt-8 max-w-md mx-auto flex gap-2">
          <input
            type="text"
            placeholder="Leave a review"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none bg-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          />
          <button
            className="bg-[#3c6e33] hover:bg-green-800 text-white px-8 rounded text-lg font-semibold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
