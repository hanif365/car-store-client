import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
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
    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      dispatch(clearCart());
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [
    data?.data,
    data?.message,
    error,
    isError,
    isLoading,
    isSuccess,
    dispatch,
  ]);

  // Prevent showing empty cart message if order is being processed
  //   if (cartData.items.length === 0) {
  //     return (
  //       <div className="container mx-auto px-4 py-8">
  //         <div className="text-center">
  //           <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
  //           {/* <Button onClick={() => navigate("/")}>Continue Shopping</Button> */}
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartData.items.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${cartData.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information Form */}
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div>
              <label className="block mb-2">Address</label>
              <Input
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Contact Number</label>
              <Input
                name="contactNo"
                value={shippingInfo.contactNo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2">City</label>
              <Input
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Order Now"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
