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
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">CarStore</h3>
            <p className="text-gray-400">
              Your premier destination for luxury and reliable vehicles.
              Experience excellence in automotive retail.
            </p>
            <div className="flex space-x-4 pt-4">
              {[
                { icon: FaFacebookF, link: "#" },
                { icon: FaTwitter, link: "#" },
                { icon: FaInstagram, link: "#" },
                { icon: FaLinkedinIn, link: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-primary transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-xl font-semibold text-white mb-4">
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
                    className="hover:text-brand-primary transition-colors duration-300 block"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-xl font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-brand-primary" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-brand-primary" />
                <span>info@carstore.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-brand-primary" />
                <span>123 Car Street, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-xl font-semibold text-white mb-4">
              Newsletter
            </h4>
            <p className="text-gray-400">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} CarStore. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
