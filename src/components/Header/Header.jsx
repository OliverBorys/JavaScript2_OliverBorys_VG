import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logoWhite from "/images/logo-white.svg";
import logoBlack from "/images/logo.svg";
import loginWhite from "/images/login-white.svg";
import loginBlack from "/images/login.svg";
import cartWhite from "/images/cart-white.svg";
import cartBlack from "/images/cart.svg";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const sidebarRef = useRef(null);
  const cartRef = useRef(null);
  const loginPopupRef = useRef(null);

  const isTransparentPage = location.pathname === "/" || location.pathname === "/about";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        setSidebarOpen(false);
      }
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        isCartSidebarOpen
      ) {
        setCartSidebarOpen(false);
      }
      if (
        isLoginPopupOpen &&
        loginPopupRef.current &&
        !loginPopupRef.current.contains(event.target)
      ) {
        setLoginPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, isCartSidebarOpen, isLoginPopupOpen]);

  const isHeaderWhite = !isTransparentPage || isScrolled || isHovered || isSidebarOpen || isCartSidebarOpen || isLoginPopupOpen;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleCartSidebar = () => {
    setCartSidebarOpen(!isCartSidebarOpen);
  };

  const toggleLoginPopup = () => {
    setLoginPopupOpen(!isLoginPopupOpen);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setLoginPopupOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };


  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isHeaderWhite ? "bg-white text-black" : "bg-transparent text-white"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between px-4 md:px-10 py-4">
        <button
          className="lg:hidden grid item-center z-50"
          onMouseDown={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
        >
          <div
            className={`w-6 h-0.5 mb-1.5 bg-current transition-all duration-300 ${
              isSidebarOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-current transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-0" : ""
            }`}
          />
          <div
            className={`w-6 h-0.5 mt-1.5 bg-current transition-all duration-300 ${
              isSidebarOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/">
            <img
              src={isHeaderWhite ? logoBlack : logoWhite}
              alt="Logo"
              className="h-8"
            />
          </Link>
        </div>

        <div className="flex items-center lg:hidden space-x-4">
          <button
            onMouseDown={(e) => {
              e.stopPropagation();
              toggleLoginPopup();
            }}
          >
            <img
              src={isHeaderWhite ? loginBlack : loginWhite}
              alt="Login"
              className="h-6"
            />
          </button>
          <button
            onMouseDown={(e) => {
              e.stopPropagation();
              toggleCartSidebar();
            }}
          >
            <img
              src={isHeaderWhite ? cartBlack : cartWhite}
              alt="Cart"
              className="h-6"
            />
          </button>
        </div>

        <div className="hidden lg:flex items-center justify-between w-full">
          <nav className="flex items-center space-x-6">
            <Link to="/shop" className="text-lg font-medium">
              Shop
            </Link>
            <Link to="/about" className="text-lg font-medium">
              About
            </Link>
            <Link to="/contact" className="text-lg font-medium">
              Contact
            </Link>
            {isLoggedIn && (
              <Link to="/admin" className="text-lg font-medium">
                Administration
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative w-48">
              <div className="search-container">
                <form action="/search" method="GET" className="search-input rounded-lg bg-white">
                  <input
                    type="text"
                    name="q"
                    placeholder="Search..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none text-black"
                  />
                </form>
              </div>
            </div>

            <button
              onMouseDown={(e) => {
                e.stopPropagation();
                toggleLoginPopup();
              }}
            >
              <img
                src={isHeaderWhite ? loginBlack : loginWhite}
                alt="Login"
                className="h-6"
              />
            </button>
            <button
              onMouseDown={(e) => {
                e.stopPropagation();
                toggleCartSidebar();
              }}
            >
              <img
                src={isHeaderWhite ? cartBlack : cartWhite}
                alt="Cart"
                className="h-6"
              />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={sidebarRef}
        className={`fixed top-14 left-0 h-full w-full sm:w-1/3 text-black bg-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-40 shadow-lg`}
      >
        <ul className="mt-4 space-y-4 px-4">
        <li>
          <div className="search-container">
            <form action="/search" method="GET" className="search-input">
              <input
                type="text"
                name="q"
                placeholder="Search..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none text-black"
              />
            </form>
          </div>
        </li>
          <li>
            <Link to="/shop" className="text-lg font-medium" onClick={toggleSidebar}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-lg font-medium" onClick={toggleSidebar}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-lg font-medium" onClick={toggleSidebar}>
              Contact
            </Link>
          </li>
          <li>
            {isLoggedIn && (
              <Link to="/admin" className="text-lg font-medium">
                Administration
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div
        ref={cartRef}
        className={`fixed top-18.5 right-0 h-full w-full md:w-2/5 bg-white shadow-lg transform ${
          isCartSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-40 shadow-lg`}
      >
        <div className="p-4 flex flex-col gap-4 items-start">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <div id="cart-content" className="w-full"></div>

          <div className="mt-4 w-full text-right text-lg font-bold">
            Total: <span id="cart-total">0</span>
          </div>

          <a
            href="/checkout"
            id="checkout-button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-center mt-4 w-full"
          >
            Checkout
          </a>
        </div>
      </div>

      {isLoginPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div
            ref={loginPopupRef}
            className="bg-white p-8 rounded-lg shadow-lg text-center relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-3xl"
              onClick={toggleLoginPopup}
            >
              &times;
            </button>
            {!isLoggedIn ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Please enter your login details below
                </h2>
                <form
                  onSubmit={handleLogin}
                  className="flex flex-col text-left"
                >
                  <label className="text-lg" htmlFor="username">
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    required
                    className="p-1 border border-black rounded focus:outline-none focus:border-blue-500"
                  />

                  <label className="text-lg mt-2" htmlFor="password">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="p-1 border border-black rounded focus:outline-none focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    className="px-8 py-3 mt-4 border border-black bg-white hover:bg-black hover:text-white transition-all text-center"
                  >
                    Sign In
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  You’re already signed in
                </h2>
                <button
                  onClick={handleLogout}
                  className="px-8 py-3 border border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all text-center rounded"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
