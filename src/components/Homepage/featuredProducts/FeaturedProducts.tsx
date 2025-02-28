/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { useAppDispatch } from "@/redux/hooks";
import { setAllProducts } from "@/redux/features/products/productsSlice";
import { motion } from "framer-motion";

const FeaturedProducts = () => {
  const dispatch = useAppDispatch();
  const { data: productsData } = useGetProductsQuery({});

  if (productsData?.data) {
    dispatch(
      setAllProducts({
        data: productsData.data.data,
        meta: productsData.data.meta,
      })
    );
  }

  return (
    <div id="featured-cars" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl font-bold relative inline-block">
          <span className="text-brand-primary">Featured</span>
          <span className="text-brand-secondary"> Products</span>
          <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-brand-primary rotate-45"></div>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsData?.data?.data?.slice(0, 8).map((product: any) => (
          <motion.div
            key={product._id}
            className="group bg-white rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_30px_rgba(0,0,0,0.15)] transition-shadow duration-300 h-[300px] relative"
            whileHover="hover"
            initial="rest"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/90 to-black/100 flex flex-col justify-end p-6"
              initial={{ opacity: 0 }}
              variants={{
                hover: { opacity: 1 },
                rest: { opacity: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                variants={{
                  hover: { y: 0, opacity: 1 },
                  rest: { y: 20, opacity: 0 }
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="space-y-1.5 mb-3 text-white">
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

                <div className="text-xl font-bold text-white mb-4">
                  ৳ {product.price.toLocaleString()}
                </div>

                <Link
                  to={`/products/${product._id}`}
                  className="block w-full px-4 py-2.5 bg-brand-primary text-white text-center rounded-lg hover:bg-white hover:text-brand-primary transition-colors duration-300 font-medium"
                >
                  View Details
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/all-products"
          className="inline-block px-8 py-3.5 bg-brand-secondary text-white rounded-lg hover:bg-brand-primary transition-colors duration-300 font-medium text-lg"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
