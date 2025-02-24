import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";

const CartSheet = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);


  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: cartData.items.map(item => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: "Pabna Sader, test2", // Replace with actual address if needed
        contactNo: "01712345668", // Replace with actual contact number if needed
        city: "Pabna", // Replace with actual city if needed
      };

      console.log("cartData from handlePlaceOrder", { orderData });
      await createOrder(orderData).unwrap();
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place order: " + error?.message);
    }
  };

  const toastId = "cart";
  useEffect(() => {
    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="relative">
          <FaShoppingCart />

          <Badge className="absolute right-0 top-0 bg-red-600 text-white rounded-full text-xs p-1">
            {cartData.totalQuantity}
          </Badge>
          {/* <p className=" font-extrabold absolute top-0 right-0   text-red-600"> {cartData.totalQuantity}</p> */}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl font-semibold">Your Cart</SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            Review your items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {cartData.items.length > 0 ? (
            <ul className="space-y-4">
              {cartData.items.map((item) => (
                <li key={item._id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item._id,
                              quantity: Math.max(item.quantity - 1, 1),
                            })
                          )
                        }
                        className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item._id,
                              quantity: Math.min(item.quantity + 1, item.stock),
                            })
                          )
                        }
                        className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}

          <div className="border-b my-3"></div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Total Quantity:
            </span>
            <span className="text-lg font-bold">{cartData.totalQuantity}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Total Price:
            </span>
            <span className="text-lg font-bold">
              ${cartData.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <SheetFooter className="border-t pt-4">
          <SheetClose asChild>
            <Button className="w-full" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
