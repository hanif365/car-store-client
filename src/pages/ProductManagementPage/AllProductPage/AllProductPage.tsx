import {
  selectAllProducts,
  selectProductsMeta,
} from "@/redux/features/products/productsSlice";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";

const AllProductPage = () => {
  const products = useAppSelector(selectAllProducts);
  const meta = useAppSelector(selectProductsMeta);

  console.log("products in all products page", products);
  console.log("pagination meta", meta);

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl font-bold relative inline-block">
          <span className="text-brand-secondary">All</span>
          <span className="text-brand-primary"> Products</span>
          <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-brand-primary rotate-45"></div>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products?.map((product) => (
          <div
            key={product._id}
            className="group border rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125 absolute top-0 left-0"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.brand}</p>
              <p className="text-lg font-bold text-primary">${product.price}</p>
              <Link
                to={`/products/${product._id}`}
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      {meta && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Page: {meta.page} of {Math.ceil(meta.total / meta.limit)}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllProductPage;
