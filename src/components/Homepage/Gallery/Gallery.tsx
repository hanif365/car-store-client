import { motion } from "framer-motion";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  model: string;
  price: number;
  image: string;
  createdAt: string;
}

const Gallery = () => {
  // Get products with sorting by createdAt
  const { data: productsData } = useGetProductsQuery({
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 5,
  });

  const recentProducts = productsData?.data?.data || [];

  return (
    <section className="container mx-auto px-4 py-8 sm:py-12 md:pb-16">
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold relative inline-block">
          <span className="text-brand-secondary">Our</span>
          <span className="text-brand-primary"> Gallery</span>
          <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-brand-primary rotate-45"></div>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {recentProducts.map((product: Product, index: number) => (
          <motion.div
            key={product._id}
            className={`${
              index === 0
                ? "sm:col-span-2 sm:row-span-2 h-[400px] sm:h-[500px] lg:h-[620px]"
                : "h-[250px] sm:h-[300px]"
            } group bg-white rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_30px_rgba(0,0,0,0.15)] transition-shadow duration-300 relative`}
            whileHover="hover"
            initial="rest"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/90 to-black/100 flex flex-col justify-end p-4 sm:p-6"
              initial={{ opacity: 0 }}
              variants={{
                hover: { opacity: 1 },
                rest: { opacity: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                variants={{
                  hover: { y: 0, opacity: 1 },
                  rest: { y: 20, opacity: 0 },
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3
                  className={`${
                    index === 0 
                      ? "text-xl sm:text-2xl lg:text-3xl" 
                      : "text-lg sm:text-xl"
                  } font-semibold text-white mb-2`}
                >
                  {product.name}
                </h3>
                <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3 text-white text-sm sm:text-base">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Brand:</span>
                    <span>{product.brand}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Category:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Model:</span>
                    <span>{product.model}</span>
                  </div>
                </div>
                <div
                  className={`${
                    index === 0 
                      ? "text-xl sm:text-2xl" 
                      : "text-lg sm:text-xl"
                  } font-bold text-white mb-3 sm:mb-4`}
                >
                  ৳ {product.price.toLocaleString()}
                </div>
                <Link
                  to={`/products/${product._id}`}
                  className="block w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-brand-primary text-white text-center rounded-lg hover:bg-white hover:text-brand-primary transition-colors duration-300 font-medium text-sm sm:text-base"
                >
                  View Details
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
