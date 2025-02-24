import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { selectCurrentToken, logout } from "@/redux/features/auth/authSlice";
import "./Navbar.css";
import { FaEquals, FaXmark } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CartSheet from "../CartSheet/CartSheet";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showShadow, setShowShadow] = useState(false);
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
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
      <div className="justify-between px-4 mx-auto lg:max-w-7xl 2xl:max-w-48xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/car-store.png"
                alt="CarStore Logo"
                className="w-6 h-6"
              />
              <span className="text-xl font-bold text-[#00095E] hidden md:block">
                CarStore
              </span>
            </Link>

            <div className="md:hidden">
              <button
                className="text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <FaXmark className="w-8 h-8 text-red-500" />
                ) : (
                  <FaEquals className="w-8 h-8 text-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "p-12 md:p-0 block" : "hidden md:block"
            }`}
          >
            <ul className="h-screen md:h-auto items-center justify-center md:flex">
              <li
                className={`text-xl font-bold py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:text-[#7EA0FF] transition duration-700 ease-in-out ${
                  location.pathname === "/"
                    ? "text-[#7EA0FF]"
                    : "text-[#00095E]"
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
                className={`text-xl font-bold py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:text-[#7EA0FF] transition duration-700 ease-in-out ${
                  location.pathname === "/about"
                    ? "text-[#7EA0FF]"
                    : "text-[#00095E]"
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
                  className={`text-xl font-bold py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:text-[#7EA0FF] transition duration-700 ease-in-out ${
                    location.pathname === "/dashboard"
                      ? "text-[#7EA0FF]"
                      : "text-[#00095E]"
                  }`}
                >
                  <Link
                    to="/dashboard"
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

              <li className="text-xl font-bold py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:text-[#7EA0FF] transition duration-700 ease-in-out">
                <CartSheet />
              </li>

              {token ? (
                <li className="text-xl font-bold py-2 px-6 text-center border-b-2 md:border-b-0">
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600 transition duration-700 ease-in-out"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="text-xl font-bold py-2 px-6 text-center border-b-2 md:border-b-0">
                    <Link
                      to="/login"
                      className="text-green-500 hover:text-green-600 transition duration-700 ease-in-out"
                      onClick={() => setNavbar(false)}
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
