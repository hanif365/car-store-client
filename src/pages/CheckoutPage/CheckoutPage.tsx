import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/cartSlice";
import shurjopayLogo from "@/assets/shurjoPay.png";

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);
  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    contactNo: "",
    city: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const orderData = {
        items: cartData.items.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        ...shippingInfo,
      };

      await createOrder(orderData).unwrap();
    } catch (error) {
      toast.error("Failed to place order: " + error?.message);
    }
  };

  const toastId = "cart";
  useEffect(() => {
    if (isLoading) toast.loading("Processing your order...", { id: toastId });

    if (isSuccess) {
      dispatch(clearCart());
      toast.success("Order placed successfully!", { id: toastId });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 1500);
      }
    }

    if (isError)
      toast.error("An error occurred while placing your order.", {
        id: toastId,
      });
  }, [
    data?.data,
    data?.message,
    error,
    isError,
    isLoading,
    isSuccess,
    dispatch,
  ]);

  // if (cartData.items.length === 0 && !isLoading) {
  //   return (
  //     <div className="container mx-auto px-4 py-16">
  //       <div className="text-center">
  //         <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
  //         <p className="text-gray-600 mb-8">
  //           Add some items to your cart to proceed with checkout.
  //         </p>
  //         <Button
  //           onClick={() => (window.location.href = "/")}
  //           className="bg-brand-primary hover:bg-brand-secondary text-white"
  //         >
  //           Continue Shopping
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto px-4 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Order Summary
            </h2>
            <div className="space-y-6">
              {cartData.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center py-2"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-gray-800 font-medium">
                      {item.name}{" "}
                      <span className="text-gray-500">x {item.quantity}</span>
                    </span>
                  </div>
                  <span className="text-gray-900 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-brand-primary">
                    ${cartData.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="pt-40 flex items-center gap-2">
                <p className="text-sm text-gray-500">Powered by </p>
                <a
                  href="https://shurjopay.com.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={shurjopayLogo} alt="Shurjopay" className="w-16" />
                </a>
              </div>
            </div>
          </div>

          {/* Shipping Information Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Shipping Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>
                <Input
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="Enter your full address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <Input
                  name="contactNo"
                  value={shippingInfo.contactNo}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <Input
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="Enter your city"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-3 mt-6 bg-brand-primary text-white hover:bg-brand-secondary transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Processing...
                  </span>
                ) : (
                  "Complete Order"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
