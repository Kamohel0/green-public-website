import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"
import { useNavigate, useLocation } from "react-router-dom"

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  // Enhanced scroll/navigate helper with error handling
  const handleNavigation = (sectionId) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        })
      }
    } else {
      navigate(`/#${sectionId}`)
    }
  }

  // Social media links data
  const socialLinks = [
    { 
      icon: FaFacebookF, 
      href: "https://facebook.com/greenpublic",
      label: "Visit our Facebook page"
    },
    { 
      icon: FaTwitter, 
      href: "https://twitter.com/greenpublic",
      label: "Visit our Twitter page"
    },
    { 
      icon: FaInstagram, 
      href: "https://instagram.com/greenpublic",
      label: "Visit our Instagram page"
    }
  ]

  // Quick links data
  const quickLinks = [
    { id: "hero", label: "Home" },
    { id: "products", label: "Shop" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Us" }
  ]

  // Policy links data
  const policyLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cookies", label: "Cookies Policy" },
    { href: "/terms", label: "Terms & Conditions" }
  ]

  return (
    <footer className="relative text-gray-800 bg-[#f7f7f7] overflow-hidden">
      {/* SVG Wave with improved semantics */}
      <div 
        className="absolute left-0 w-full bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          width="100%"
          height="220"
          viewBox="0 0 512 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          role="img"
          aria-label="Decorative wave pattern"
        >
          <path
            d="M0,30 C80,0 130,0 200,30 C270,60 340,60 410,30 C470,0 512,20 512,20 L512,100 L0,100 Z"
            fill="#D1B19F"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-sm">
        
        {/* Contact Details */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-4 text-gray-900 text-base">
            Contact Details
          </h3>
          <address className="not-italic space-y-2">
            <p>
              <a 
                href="mailto:greenpublic@gmail.com"
                className="hover:text-green-600 transition-colors duration-200"
              >
                greenpublic@gmail.com
              </a>
            </p>
            <p>
              <a 
                href="tel:+27815413752"
                className="hover:text-green-600 transition-colors duration-200"
              >
                +27 (0) 81 541 3752
              </a>
            </p>
          </address>
          <div className="flex space-x-4 mt-4 justify-center md:justify-start">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-700 hover:text-white hover:bg-green-600 rounded-full transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="font-semibold mb-4 text-gray-900 text-base">
            Quick Links
          </h3>
          <nav aria-label="Footer navigation">
            <ul className="space-y-3">
              {quickLinks.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => handleNavigation(id)}
                    className="text-gray-700 hover:text-green-600 transition-all duration-200 transform hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-2 py-1"
                    aria-label={`Navigate to ${label} section`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Opening Hours */}
        <div className="text-center md:text-right">
          <h3 className="font-semibold mb-4 text-gray-900 text-base">
            Opening Hours
          </h3>
          <div className="space-y-2">
            <p><strong>Mon - Fri:</strong> 8:00–17:00</p>
            <p><strong>Saturday:</strong> 8:00–17:00</p>
            <p><strong>Sunday:</strong> 8:00–17:00</p>
            <p><strong>Public Holidays:</strong> 8:00–17:00</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-gray-300 mx-6">
        <div className="text-gray-600 text-xs flex flex-col md:flex-row justify-between items-center px-6 py-4 gap-4">
          <p>&copy; {new Date().getFullYear()} Green Public. All Rights Reserved</p>
          <nav aria-label="Legal links">
            <div className="flex flex-wrap justify-center gap-4">
              {policyLinks.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="hover:text-green-600 underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-1"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  )
}