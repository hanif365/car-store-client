import { useState } from "react";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import ProductFilters from "./ProductFilters";
import { Link } from "react-router-dom";
import Loader from "@/components/Shared/Loader/Loader";
import Pagination from "@/components/Shared/Pagination/Pagination";

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
              <div
                key={product._id}
                className="group border rounded-lg overflow-hidden shadow-lg flex flex-col"
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125"
                  />
                </div>
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{product.brand}</p>
                  <p className="text-base sm:text-lg font-bold text-primary mt-1">${product.price}</p>
                  <Link
                    to={`/products/${product._id}`}
                    className="mt-auto inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white text-sm sm:text-base rounded hover:bg-blue-700 transition duration-300 text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
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
