import { useContext, useState, useEffect, useRef } from "react";
import { HeaderContext } from "../../context/HeaderContext";
import { Link } from "react-router-dom";
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "../../utils/LocalStorage";
import cartWhite from "/images/cart-white.svg";
import cartBlack from "/images/cart.svg";
import PropTypes from "prop-types";

const HeaderCart = ({ isHeaderWhite }) => {
  const { state, dispatch } = useContext(HeaderContext);
  const [cartItems, setCartItems] = useState(getCartItems());
  const cartRef = useRef(null);
  const closeTimeout = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      setTimeout(() => {
        if (
          cartRef.current &&
          !cartRef.current.contains(event.target) &&
          !event.target.closest(".cart-button")
        ) {
          dispatch({ type: "TOGGLE_CART", payload: false });
        }
      }, 100);
    };

    if (state.isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [state.isCartOpen, dispatch]);

  useEffect(() => {
    const handleCartUpdate = (event) => {
      setCartItems(getCartItems());
      if (event.detail.openCart) {
        dispatch({ type: "TOGGLE_CART", payload: true });
        
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        closeTimeout.current = setTimeout(() => {
          dispatch({ type: "TOGGLE_CART", payload: false });
        }, 3000);
    
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
    window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [dispatch]);

  const handleRemove = (event, productId) => {
    event.stopPropagation();
    removeFromCart(productId);
    setCartItems(getCartItems());
    dispatch({ type: "TOGGLE_CART", payload: true });
  };

  const handleQuantityChange = (event, productId, quantity) => {
    event.stopPropagation();
    if (quantity < 1) return;
    updateCartQuantity(productId, quantity);
    setCartItems(getCartItems());
    dispatch({ type: "TOGGLE_CART", payload: true });
  };

  return (
    <section>
      <button onClick={() => dispatch({ type: "TOGGLE_CART" })}>
        <img
          src={isHeaderWhite ? cartBlack : cartWhite}
          alt="Cart"
          className="h-6"
        />
      </button>

      {state.isCartOpen && (
        <div
          ref={cartRef}
          className="fixed top-14 lg:top-16 right-0 h-full w-full sm:w-3/5 bg-white shadow-lg transform transition-transform duration-300 z-40 flex flex-col"
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
                        onClick={(event) =>
                          handleQuantityChange(
                            event,
                            item.id,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 flex text-center justify-center border border-gray-700 rounded-full text-xl font-medium hover:scale-95"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-lg font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={(event) =>
                          handleQuantityChange(
                            event,
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 flex text-center justify-center border border-gray-700 rounded-full text-xl font-medium hover:scale-95"
                      >
                        +
                      </button>
                      <button
                        onClick={(event) => handleRemove(event, item.id)}
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

          <div className="w-full mb-15 p-4 bg-white shadow-inner border-t">
            <div className="text-right text-lg font-medium">
              Total: $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
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
    </section>
  );
};

HeaderCart.propTypes = {
  isHeaderWhite: PropTypes.bool.isRequired,
};

export default HeaderCart;
