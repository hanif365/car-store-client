/* eslint-disable @typescript-eslint/no-explicit-any */
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
      toast.error("Failed to place order: " + (error as any)?.message);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Order Summary */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg flex flex-col">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
                Order Summary
              </h2>
              <div className="space-y-4 sm:space-y-6 flex-grow">
                {cartData.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-4 sm:pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-primary">
                      ${cartData.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              {/* Powered by section at the bottom of left card */}
              <div className="mt-auto pt-4 flex items-center gap-2">
                <p className="text-xs sm:text-sm text-gray-500">Powered by</p>
                <a
                  href="https://shurjopay.com.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105"
                >
                  <img src={shurjopayLogo} alt="Shurjopay" className="w-12 sm:w-16" />
                </a>
              </div>
            </div>

            {/* Shipping Information Form */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
              <form onSubmit={handlePlaceOrder} className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
                  Shipping Information
                </h2>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <Input
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    required
                    className="w-full text-sm sm:text-base p-3 sm:p-4 h-11"
                    placeholder="Enter your full address"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <Input
                    name="contactNo"
                    value={shippingInfo.contactNo}
                    onChange={handleInputChange}
                    required
                    className="w-full text-sm sm:text-base p-3 sm:p-4 h-11"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <Input
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full text-sm sm:text-base p-3 sm:p-4 h-11"
                    placeholder="Enter your city"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 text-sm sm:text-base bg-brand-primary text-white hover:bg-brand-secondary transition-all duration-300 rounded-xl"
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
    </div>
  );
};

export default CheckoutPage;
