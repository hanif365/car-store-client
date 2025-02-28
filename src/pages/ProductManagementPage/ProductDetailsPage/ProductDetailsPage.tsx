import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useGetProductQuery } from "@/redux/features/products/productsApi";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import Loader from "@/components/Shared/Loader/Loader";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data: product, isLoading } = useGetProductQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const cartData = useAppSelector((state) => state.cart);

  if (isLoading) {
    return <Loader />;
  }

  if (!product?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 animate-pulse">
          Product not found
        </div>
      </div>
    );
  }

  const productData = product.data;

  const existingCartItem = cartData.items?.find(
    (item) => String(item._id) === String(productData._id)
  );

  const currentQuantity = existingCartItem ? existingCartItem.quantity : 0;

  const handleAddToCart = () => {
    if (currentQuantity >= productData.stock) {
      return;
    }

    const productInfo = {
      _id: productData._id,
      name: productData.name,
      price: productData.price,
      quantity: 1,
      stock: productData.stock,
      image: productData.image,
    };

    dispatch(addToCart(productInfo));
    toast.success("Product added to cart successfully", {
      duration: 1500,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 pt-24 pb-12 sm:py-12 md:py-16 lg:py-32">
        <div className="rounded-3xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/2 relative">
              <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-full relative group">
                <img
                  src={productData.image}
                  alt={productData.name}
                  className="w-full h-full object-cover"
                />
                {/* <div className="absolute inset-0 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.02)] transition-opacity duration-300"></div> */}
              </div>
              <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 z-10 flex flex-col gap-2 sm:gap-3">
                <span className="bg-brand-primary text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg transform hover:scale-105 transition-transform duration-200">
                  {productData.category}
                </span>
                <span className="bg-white text-brand-primary px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg transform hover:scale-105 transition-transform duration-200">
                  {productData.yearOfManufacture}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {productData.name}
                </h1>
                <p className="text-xl sm:text-2xl text-brand-secondary font-medium">
                  {productData.brand} {productData.model}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 py-6 border-y border-gray-100">
                <div className="space-y-2">
                  <span className="text-gray-500 text-sm">Stock Available</span>
                  <p className="text-2xl font-bold text-gray-900">
                    {productData.stock} units
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-gray-500 text-sm">Price</span>
                  <p className="text-3xl font-bold text-brand-primary">
                    ৳{productData.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {productData.description}
                </p>
              </div>

              <div className="pt-6">
                {currentQuantity >= productData.stock ? (
                  <button
                    className="w-full py-4 bg-gray-400 text-white rounded-xl font-semibold cursor-not-allowed transform hover:scale-[0.98] transition-transform duration-200 shadow-lg"
                    disabled
                  >
                    Out of Stock
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-semibold transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm1-11a1 1 0 10-2 0v3H4a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2H9V5z" />
                  </svg>
                  <span className="text-sm">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm1-11a1 1 0 10-2 0v3H4a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2H9V5z" />
                  </svg>
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
