import { useState } from "react";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import ProductFilters from "./ProductFilters";
import { Link } from "react-router-dom";
import Loader from "@/components/Shared/Loader/Loader";
import Pagination from "@/components/Shared/Pagination/Pagination";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  model: string;
  price: number;
  image: string;
}

const AllProductPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10
  });
  const { data: productsData, isLoading } = useGetProductsQuery(filters, {
    refetchOnMountOrArgChange: true,
  });

  console.log("productsData: ",productsData)

  // Extract unique values for filter options from the nested data structure
  const brands = [...new Set(productsData?.data?.data?.map((product: Product) => product.brand) || [])];
  const categories = [...new Set(productsData?.data?.data?.map((product: Product) => product.category) || [])];
  const models = [...new Set(productsData?.data?.data?.map((product: Product) => product.model) || [])];

  const handleFilterChange = (newFilters: Record<string, unknown>) => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([, value]) => value !== "" && value !== false)
    );
    setFilters(prev => ({
      ...prev,
      ...cleanedFilters,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
  };

  // Add this before the return statement
  const totalPages = Math.ceil((productsData?.data?.meta?.total || 0) / (productsData?.data?.meta?.limit || 10));

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 pt-20 md:pt-32 pb-8 md:pb-16">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold relative inline-block">
          <span className="text-brand-secondary">All</span>
          <span className="text-brand-primary"> Products</span>
          <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-brand-primary rotate-45"></div>
        </h2>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 md:gap-8">
        <div className="w-full lg:col-span-1 order-1 lg:order-none">
          <ProductFilters
            onFilterChange={handleFilterChange}
            brands={brands as string[]}
            categories={categories as string[]}
            models={models as string[]}
          />
        </div>

        <div className="w-full lg:col-span-3">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {productsData?.data?.data?.map((product: Product) => (
              <motion.div
                key={product._id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-[300px] relative"
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
          
          <div className="mt-6 sm:mt-8">
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductPage;
