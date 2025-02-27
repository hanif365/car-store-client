/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { useAppDispatch } from "@/redux/hooks";
import { setAllProducts } from "@/redux/features/products/productsSlice";

const FeaturedProducts = () => {
  const dispatch = useAppDispatch();
  const { data: productsData } = useGetProductsQuery({});

  console.log("products", productsData);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productsData?.data?.data?.slice(0, 8).map((product: any) => (
          <div
            key={product._id}
            className="group border rounded-lg overflow-hidden shadow-lg h-full flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125 group-hover:grayscale absolute top-0 left-0"
              />
            </div>
            <div className="px-5 py-4 flex-1 flex flex-col">
              <div className="flex justify-between flex-1">
                <div>
                  <h3 className="text-lg font-bold mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-sm text-gray-600">{product.model}</p>
                </div>

                <div>
                  <p className="text-base font-bold text-primary">
                    ৳ {product.price}
                  </p>
                  {/* <p className="text-xs text-gray-500">Stock: {product.stock}</p> */}
                </div>
              </div>

              <Link
                to={`/products/${product._id}`}
                className="mt-4 block w-full px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-secondary transition duration-300 text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          to="/all-products"
          className="inline-block px-6 py-3 bg-brand-secondary text-white rounded hover:bg-brand-primary transition duration-300"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
