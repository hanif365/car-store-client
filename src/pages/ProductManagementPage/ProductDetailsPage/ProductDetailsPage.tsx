import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { selectAllProducts } from "@/redux/features/products/productsSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const cartData = useAppSelector((state) => state.cart);

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-2xl font-bold">Loading products...</div>
      </div>
    );
  }

  // Convert id to string for a proper match
  const product = products.find((item) => String(item._id) === String(id));

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-2xl font-bold">Product not found</div>
      </div>
    );
  }

  const existingCartItem = cartData.items?.find(
    (item) => String(item._id) === String(product._id)
  );

  const currentQuantity = existingCartItem ? existingCartItem.quantity : 0;

  const handleAddToCart = () => {
    if (currentQuantity >= product.stock) {
      return;
    }

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.stock,
        image: product.image,
      })
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 pt-20">
        <div className="rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/2 relative">
              <div className="w-full h-[400px] relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-10 left-4 z-10">
                <span className="bg-brand-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8 md:p-12 space-y-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-brand-secondary font-medium">
                {product.brand} {product.model}
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Year</span>
                  <span className="text-lg font-semibold">
                    {product.yearOfManufacture}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Stock</span>
                  <span className="text-lg font-semibold">
                    {product.stock} units
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="text-3xl font-bold text-brand-primary">
                    ৳{product.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="pt-6">
                {currentQuantity >= product.stock ? (
                  <button
                    className="w-full py-4 bg-gray-400 text-white rounded-lg font-semibold cursor-not-allowed"
                    disabled
                  >
                    Out of Stock
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg font-semibold"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
