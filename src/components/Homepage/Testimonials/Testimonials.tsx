import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Smith",
    role: "Business Executive",
    image: "https://i.ibb.co.com/JFpMfZGB/person2.png",
    quote:
      "CarStore provided an exceptional car buying experience. Their attention to detail and customer service is unmatched in the industry.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Entrepreneur",
    image: "https://i.ibb.co.com/rGRgwxPL/person3.png",
    quote:
      "I found my dream car through CarStore. The process was smooth, transparent, and their team was incredibly helpful throughout.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Entrepreneur",
    image: "https://i.ibb.co.com/8LHtyrrr/person1.png",
    quote:
      "The selection of premium vehicles at CarStore is impressive. Their expertise helped me make the perfect choice for my needs.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-white via-gray-50 to-white">
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold relative inline-block">
            <span className="text-brand-secondary">What Our</span>
            <span className="text-brand-primary ml-2">Clients Say</span>
            <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"></div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-brand-primary rotate-45"></div>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 md:p-12 backdrop-blur-sm bg-opacity-90"
          >
            <div className="flex flex-col items-center">
              <FaQuoteLeft className="text-3xl sm:text-4xl text-brand-primary mb-4 sm:mb-6 opacity-20" />
              <motion.img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-brand-primary mb-4 sm:mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
              />
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <FaStar className="text-lg sm:text-xl text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-700 text-base sm:text-lg md:text-xl text-center mb-4 sm:mb-6 italic font-light leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-brand-primary mb-1">
                {testimonials[currentIndex].name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-medium">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </motion.div>

          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-brand-primary hover:text-white transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50"
          >
            <FaChevronLeft className="text-lg sm:text-xl" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-brand-primary hover:text-white transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50"
          >
            <FaChevronRight className="text-lg sm:text-xl" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
