import { motion } from "framer-motion";
import aboutImage from "@/assets/about-car1.png";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-12 sm:py-16 md:py-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div variants={itemVariants} className="order-2 lg:order-1">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-gray-800">
            Welcome to CarStore
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg text-gray-700">
              At CarStore, we're revolutionizing the way you shop for premium
              vehicles. Our cutting-edge e-commerce platform brings the showroom
              experience directly to your screen, making luxury car shopping
              more accessible than ever.
            </p>

            <p className="text-base sm:text-lg text-gray-700">
              We've curated an exclusive collection of high-end vehicles, from
              sleek sports cars to elegant luxury sedans. Our digital showroom
              features detailed specifications, high-quality images, and
              transparent pricing.
            </p>

            <p className="text-base sm:text-lg text-gray-700">
              With our secure payment system and dedicated customer support, we
              ensure a seamless buying experience. Track your orders in
              real-time and enjoy our hassle-free delivery service.
            </p>

            <div className="pt-4">
              <Link to="/" className="inline-block w-full sm:w-auto text-center bg-brand-primary text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-brand-secondary transition-colors duration-300 shadow-lg hover:shadow-xl">
                Explore Our Collection
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div variants={imageVariants} className="relative order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
            <img
              src={aboutImage}
              alt="Luxury car showroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl w-[90%] sm:w-[80%]">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-primary">1000+</p>
                <p className="text-xs sm:text-sm text-gray-600">Cars Sold</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-primary">500+</p>
                <p className="text-xs sm:text-sm text-gray-600">Happy Clients</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-primary">24/7</p>
                <p className="text-xs sm:text-sm text-gray-600">Support</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
