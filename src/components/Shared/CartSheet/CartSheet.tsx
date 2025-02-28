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
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { FaShoppingCart } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const CartSheet = () => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="relative">
          <FaShoppingCart className="text-lg sm:text-xl md:text-2xl" />

          {cartData.totalQuantity ? (
            <p className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 text-xs sm:text-sm flex items-center justify-center">
              {cartData.totalQuantity}
            </p>
          ) : null}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 bg-white shadow-lg rounded-lg w-[90vw] sm:w-[450px] max-w-full">
        <SheetHeader className="border-b pb-3 sm:pb-4">
          <SheetTitle className="text-lg sm:text-xl font-semibold">
            Your Shopping Cart
          </SheetTitle>
          <SheetDescription className="text-xs sm:text-sm text-gray-500">
            Please review your selected items before proceeding to checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {cartData.items.length > 0 ? (
            <ul className="space-y-3 sm:space-y-4">
              {cartData.items.map((item) => (
                <li key={item._id} className="flex items-center gap-2 sm:gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 sm:h-16 sm:w-16 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-medium truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-1 sm:gap-2 mt-1">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item._id,
                              quantity: Math.max(item.quantity - 1, 1),
                            })
                          )
                        }
                        disabled={item.quantity <= 1}
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-xs sm:text-sm rounded ${
                          item.quantity <= 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                      >
                        -
                      </button>
                      <span className="text-xs sm:text-sm font-medium min-w-[20px] text-center">
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
                        disabled={item.quantity >= item.stock}
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-xs sm:text-sm rounded ${
                          item.quantity >= item.stock
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-600 text-xs sm:text-sm hover:underline whitespace-nowrap"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-xs sm:text-sm text-gray-500">
              Your cart is empty.
            </p>
          )}

          <div className="border-b my-2 sm:my-3"></div>

          <div className="flex justify-between items-center mb-2 sm:mb-4">
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Total Quantity:
            </span>
            <span className="text-sm sm:text-lg font-bold">
              {cartData.totalQuantity}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2 sm:mb-4">
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Total Price:
            </span>
            <span className="text-sm sm:text-lg font-bold">
              ${cartData.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <SheetFooter className="border-t pt-3 sm:pt-4">
          <SheetClose asChild>
            <Button
              className="w-full bg-brand-primary text-white text-xs sm:text-sm py-2 sm:py-3 hover:bg-brand-secondary transition-colors duration-200"
              onClick={() => navigate("/checkout")}
              disabled={cartData.items.length === 0}
            >
              Proceed to Checkout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
