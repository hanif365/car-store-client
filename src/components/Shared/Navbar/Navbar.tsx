import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import "./Navbar.css";
import { FaEquals, FaXmark } from "react-icons/fa6";
import { useAppSelector } from "@/redux/hooks";
import CartSheet from "@/components/Shared/CartSheet/CartSheet";
import { handleLogoutUtilFunction } from "@/utils/auth";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showShadow, setShowShadow] = useState(false);
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  console.log("user", user);

  const location = useLocation();

  const handleLogout = () => {
    handleLogoutUtilFunction();
    setNavbar(false);
  };

  const changeBackgroundNavbar = () => {
    if (window.scrollY >= 800) {
      setShowNavbar(true);
      setShowShadow(true);
    } else if (window.scrollY <= 20) {
      setShowNavbar(true);
      setShowShadow(false);
    } else {
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackgroundNavbar);
    return () => {
      window.removeEventListener("scroll", changeBackgroundNavbar);
    };
  }, []);

  return (
    <nav
      className={`${
        showNavbar
          ? showShadow
            ? "md:translate-y-0 w-full bg-white fixed top-0 left-0 right-0 z-50 shadow-md"
            : "translate-y-0 w-full bg-white md:bg-transparent fixed top-0 left-0 right-0 z-50"
          : "w-full bg-white top-0 left-0 right-0 z-50 fixed md:-translate-y-full"
      } transform transition-all duration-1000 py-2`}
    >
      <div className="justify-between px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl md:items-center md:flex">
        <div className="flex-1">
          <div className="flex items-center justify-between py-3 md:py-5">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/car-store1.png"
                alt="CarStore Logo"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
              <span className="text-lg sm:text-xl font-bold text-brand-secondary hidden md:block">
                CarStore
              </span>
            </Link>

            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <FaXmark className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                ) : (
                  <FaEquals className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "p-6 sm:p-8 md:p-0 block" : "hidden md:block"
            }`}
          >
            <ul className="h-screen md:h-auto items-center justify-end md:flex space-y-4 md:space-y-0 md:space-x-4 lg:space-x-6">
              <li
                className={`text-base sm:text-lg font-bold py-2 text-center border-b-2 md:border-b-0 hover:text-brand-primary transition duration-700 ease-in-out ${
                  location.pathname === "/"
                    ? "text-brand-primary"
                    : "text-brand-secondary"
                }`}
              >
                <Link
                  to="/"
                  className={
                    location.pathname === "/" ? "" : "underline_design"
                  }
                  onClick={() => setNavbar(false)}
                >
                  Home
                </Link>
              </li>

              <li
                className={`text-base sm:text-lg font-bold py-2 text-center border-b-2 md:border-b-0 hover:text-brand-primary transition duration-700 ease-in-out ${
                  location.pathname === "/about"
                    ? "text-brand-primary"
                    : "text-brand-secondary"
                }`}
              >
                <Link
                  to="/about"
                  className={
                    location.pathname === "/about" ? "" : "underline_design"
                  }
                  onClick={() => setNavbar(false)}
                >
                  About
                </Link>
              </li>

              {token && (
                <li
                  className={`text-base sm:text-lg font-bold py-2 text-center border-b-2 md:border-b-0 hover:text-brand-primary transition duration-700 ease-in-out ${
                    location.pathname === "/dashboard"
                      ? "text-brand-primary"
                      : "text-brand-secondary"
                  }`}
                >
                  <Link
                    to={`/${user?.role}/dashboard`}
                    className={
                      location.pathname === "/dashboard"
                        ? ""
                        : "underline_design"
                    }
                    onClick={() => setNavbar(false)}
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              <li className="text-base sm:text-lg font-bold py-2 text-center border-b-2 md:border-b-0 hover:text-brand-primary transition duration-700 ease-in-out">
                <CartSheet />
              </li>

              {token ? (
                <li className="text-base sm:text-lg font-bold py-2 text-center border-b-2 md:border-b-0">
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600 transition duration-700 ease-in-out"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="text-base sm:text-lg font-bold py-2 text-center border-b-2 md:border-b-0">
                  <Link
                    to="/login"
                    className="text-green-500 hover:text-green-600 transition duration-700 ease-in-out"
                    onClick={() => setNavbar(false)}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
