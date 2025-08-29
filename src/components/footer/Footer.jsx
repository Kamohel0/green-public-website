import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"
import { useNavigate, useLocation } from "react-router-dom"

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  // Scroll or navigate helper
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

  return (
    <footer className="relative text-black bg-[#f7f7f7] overflow-hidden">
      {/* SVG Wave */}
      <div className="absolute left-0 w-full bottom-0">
        <svg
          width="100%"
          height="220"
          viewBox="0 0 512 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C80,0 130,0 200,30 C270,60 340,60 410,30 C470,0 512,20 512,20 L512,100 L0,100 Z"
            fill="#D1B19F"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8 text-sm text-center">
        {/* Contact Details */}
        <div>
          <h3 className="font-semibold mb-2 text-black">Contact details</h3>
          <p>Email: greenpublic@gmail.com</p>
          <p>Cell: +27 (0) 81 541 3752</p>
          <div className="flex space-x-3 mt-3 text-[#2E2E2E] justify-center">
            <FaFacebookF className="cursor-pointer hover:text-white" />
            <FaTwitter className="cursor-pointer hover:text-white" />
            <FaInstagram className="cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2 text-black">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => handleScroll("hero")}
                className="relative hover:underline transition-all duration-300 before:content-[''] before:absolute before:left-0 before:-bottom-0.5 before:w-0 hover:before:w-full before:h-0.5 before:bg-black before:transition-all before:duration-300"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("products")}
                className="relative hover:underline transition-all duration-300 before:content-[''] before:absolute before:left-0 before:-bottom-0.5 before:w-0 hover:before:w-full before:h-0.5 before:bg-black before:transition-all before:duration-300"
              >
                Shop
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("about")}
                className="relative hover:underline transition-all duration-300 before:content-[''] before:absolute before:left-0 before:-bottom-0.5 before:w-0 hover:before:w-full before:h-0.5 before:bg-black before:transition-all before:duration-300"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("contact")}
                className="relative hover:underline transition-all duration-300 before:content-[''] before:absolute before:left-0 before:-bottom-0.5 before:w-0 hover:before:w-full before:h-0.5 before:bg-black before:transition-all before:duration-300"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="font-semibold mb-2 text-black">Hours</h3>
          <p>Mon to Fri: 8:00–17:00</p>
          <p>Saturday: 8:00–17:00</p>
          <p>Sunday: 8:00–17:00</p>
          <p>Public Holiday: 8:00–17:00</p>
        </div>
      </div>

      <hr className="border-t border-[#2E2E2E] mx-6" />

      {/* Bottom Bar */}
      <div className="text-[#2E2E2E] text-xs flex flex-col md:flex-row justify-between items-center px-6 py-4 gap-2">
        <p>&copy; {new Date().getFullYear()} Green Public. All Rights Reserved</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Privacy policy</a>
          <a href="#" className="hover:underline">Cookies policy</a>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  )
}
