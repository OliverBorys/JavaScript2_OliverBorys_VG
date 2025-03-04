import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "../../utils/LocalStorage";
import logoWhite from "/images/logo-white.svg";
import logoBlack from "/images/logo.svg";
import loginWhite from "/images/login-white.svg";
import loginBlack from "/images/login.svg";
import cartWhite from "/images/cart-white.svg";
import cartBlack from "/images/cart.svg";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState(getCartItems());
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const sidebarRef = useRef(null);
  const cartRef = useRef(null);
  const loginPopupRef = useRef(null);

  const isTransparentPage =
    location.pathname === "/" || location.pathname === "/about";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleCartUpdate = (event) => {
      setCartItems(getCartItems());

      const shouldOpenCart = event.detail?.openCart ?? false;

      if (shouldOpenCart) {
        setCartSidebarOpen(true);
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartSidebarOpen(false);
      }
    };

    if (isCartSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartSidebarOpen]);

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setCartItems(getCartItems());
  };

  const handleQuantityChange = (productId, quantity) => {
    updateCartQuantity(productId, quantity);
    setCartItems(getCartItems());
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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

  const isHeaderWhite =
    !isTransparentPage ||
    isScrolled ||
    isHovered ||
    isSidebarOpen ||
    isCartSidebarOpen ||
    isLoginPopupOpen;

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
      <div className="flex items-center justify-between px-10 py-4">
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
              className="h-10"
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
            <Link
              to="/shop"
              className="relative text-lg font-medium leading-6 group block"
            >
              Shop
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3b0001] transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link
              to="/about"
              className="relative text-lg font-medium leading-6 group block"
            >
              About
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3b0001] transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link
              to="/contact"
              className="relative text-lg font-medium leading-6 group block"
            >
              Contact
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3b0001] transition-all duration-500 group-hover:w-full"></span>
            </Link>
            {isLoggedIn && (
              <Link
                to="/admin"
                className="relative text-lg font-medium leading-6 group block"
              >
                Administration
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3b0001] transition-all duration-500 group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative w-48">
              <div className="search-container">
                <form
                  action="/search"
                  method="GET"
                  className="search-input rounded-lg"
                >
                  <input
                    type="text"
                    name="q"
                    placeholder="Search..."
                    className="w-full px-4 py-2 border-1 rounded-lg focus:outline-none text-black"
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
        className={`fixed top-14 lg:top-18 left-0 h-full w-full sm:w-1/3 text-black bg-white transform ${
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
            <Link
              to="/shop"
              className="text-lg font-medium"
              onClick={toggleSidebar}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-lg font-medium"
              onClick={toggleSidebar}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-lg font-medium"
              onClick={toggleSidebar}
            >
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

      {isCartSidebarOpen && (
        <div
          ref={cartRef}
          className="fixed top-14 lg:top-18 right-0 h-full w-full sm:w-3/5 bg-white shadow-lg transform transition-transform duration-300 z-40 
          flex flex-col"
        >
          <div className="p-4 flex-1 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold">Your Cart</h2>

            <div className="w-full">
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col max-[424px]:flex-col min-[425px]:flex-row justify-between items-center border-b py-2"
                  >
                    <Link to={`/products/${item.id}`} className="flex">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-20 h-20 object-contain"
                      />
                      <div className="flex-1 ml-4">
                        <h3 className="font-medium">{item.productName}</h3>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        <p>${item.price}</p>
                      </div>
                    </Link>
                    <div className="flex items-center my-2 sm:my-0">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex text-center justify-center border border-gray-700 rounded-full text-xl font-medium hover:scale-95"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-lg font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex text-center justify-center border border-gray-700 rounded-full text-xl font-medium hover:scale-95"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 font-medium hover:text-red-700 mx-2 sm:mt-0"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="w-full mb-20 p-4 bg-white shadow-inner border-t">
            <div className="text-right text-lg font-medium">
              Total: ${totalAmount.toFixed(2)}
            </div>
            <Link
              to="/checkout"
              id="checkout-button"
              className="block bg-black text-white py-2 text-center w-full mt-2"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}

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
                    id="username"
                    name="username"
                    required
                    autoComplete="username"
                    className="p-1 border border-black rounded focus:outline-none focus:border-blue-500"
                  />

                  <label className="text-lg mt-2" htmlFor="password">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    autoComplete="current-password"
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
