import { baseApi } from "@/redux/api/baseApi";
import { logout } from "@/redux/features/auth/authSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { store } from "@/redux/store";

export const handleLogoutUtilFunction = () => {
  // Clear RTK Query cache
  store.dispatch(baseApi.util.resetApiState());
  
  // Clear auth state
  store.dispatch(logout());
  
  // Clear cart
  store.dispatch(clearCart());
  
  // Remove token from localStorage
  localStorage.removeItem("token");
};