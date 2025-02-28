import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">CarStore</h3>
            <p className="text-sm sm:text-base text-gray-400">
              Your premier destination for luxury and reliable vehicles.
              Experience excellence in automotive retail.
            </p>
            <div className="flex space-x-3 sm:space-x-4 pt-3 sm:pt-4">
              {[
                { icon: FaFacebookF, link: "#" },
                { icon: FaTwitter, link: "#" },
                { icon: FaInstagram, link: "#" },
                { icon: FaLinkedinIn, link: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-primary transition-colors duration-300"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { text: "Home", link: "/" },
                { text: "About Us", link: "/about" },
                { text: "Products", link: "/all-products" },
                { text: "Contact", link: "/contact" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="text-sm sm:text-base hover:text-brand-primary transition-colors duration-300 block"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-brand-primary w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-brand-primary w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">info@carstore.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-brand-primary w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">123 Car Street, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
              Newsletter
            </h4>
            <p className="text-sm sm:text-base text-gray-400">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="space-y-2 sm:space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <button
                type="submit"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 text-center"
        >
          <p className="text-sm sm:text-base text-gray-400">
            © {new Date().getFullYear()} CarStore. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
