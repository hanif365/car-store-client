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
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-2xl font-bold">Product not found</div>
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
                  src={productData.image}
                  alt={productData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-10 left-4 z-10">
                <span className="bg-brand-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {productData.category}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8 md:p-12 space-y-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {productData.name}
              </h1>
              <p className="text-xl text-brand-secondary font-medium">
                {productData.brand} {productData.model}
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Year</span>
                  <span className="text-lg font-semibold">
                    {productData.yearOfManufacture}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Stock</span>
                  <span className="text-lg font-semibold">
                    {productData.stock} units
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="text-3xl font-bold text-brand-primary">
                    ৳{productData.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {productData.description}
                </p>
              </div>

              <div className="pt-6">
                {currentQuantity >= productData.stock ? (
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
