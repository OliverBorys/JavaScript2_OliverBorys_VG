import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "../../utils/LocalStorage";

const ProductGrid = () => {
  const [cartItems, setCartItems] = useState(getCartItems());

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartItems(getCartItems());
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setCartItems(getCartItems());

    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: { openCart: false } })
    );
  };

  const handleQuantityChange = (productId, quantity) => {
    updateCartQuantity(productId, quantity);
    setCartItems(getCartItems());

    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: { openCart: false } })
    );
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section>
      {cartItems.length === 0 ? (
        <p className="p-4 text-center font-medium text-lg">
          Your cart is empty
        </p>
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
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="w-8 h-8 flex text-center justify-center border border-gray-700 rounded-full text-xl font-medium hover:scale-95"
              >
                -
              </button>
              <span className="w-8 text-center text-lg font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
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
      <div className="p-4 pb-2">
        <div className="text-right text-lg font-medium">
          Total: ${totalAmount.toFixed(2)}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
