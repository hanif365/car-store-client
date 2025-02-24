import { useParams } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectAllProducts } from "@/redux/features/products/productsSlice";    

const ProductDetails = () => {
  const { id } = useParams();
  const products = useAppSelector(selectAllProducts);

  const product = products.find((item) => item._id === id);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-2xl font-bold">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center mb-10">{product.name}</h2>
      <div className="flex flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover mb-4 md:mb-0"
        />
        <div className="md:ml-4">
          <p className="text-lg font-semibold">Brand: {product.brand}</p>
          <p className="text-lg font-semibold">Model: {product.model}</p>
          <p className="text-lg font-semibold">Year: {product.yearOfManufacture}</p>
          <p className="text-lg font-semibold">Price: ${product.price}</p>
          <p className="mt-4">{product.description}</p>
        </div>
      </div>
      <div className="text-center mt-6">
        <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;