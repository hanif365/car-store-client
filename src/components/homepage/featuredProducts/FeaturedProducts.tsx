import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { useAppDispatch } from "@/redux/hooks";
import { setAllProducts } from "@/redux/features/products/productsSlice";

const FeaturedProducts = () => {
  const dispatch = useAppDispatch();
  const { data: productsData, error, isLoading } = useGetProductsQuery({});

  console.log("products", productsData);

  if (productsData?.data) {
    dispatch(
      setAllProducts({
        data: productsData.data.data,
        meta: productsData.data.meta,
      })
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productsData?.data?.data?.map((product) => (
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
            <div className="px-5 py-4">
              <div className="flex justify-between">
                <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.brand}</p>
                </div>
                
                <div>
                <p className="text-lg font-bold text-primary">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                </div>
               
              </div>

              <Link
                to={`/products/${product._id}`}
                className="mt-4 block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 text-center"
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
          className="inline-block px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
