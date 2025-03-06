import { useEffect, useState } from "react";
import { getCartItems, removeFromCart, updateCartQuantity } from "../utils/LocalStorage";

const useCart = () => {
  const [cartItems, setCartItems] = useState(getCartItems());

  useEffect(() => {
    const handleCartUpdate = () => setCartItems(getCartItems());
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setCartItems(getCartItems());
  };

  const handleQuantityChange = (productId, quantity) => {
    updateCartQuantity(productId, quantity);
    setCartItems(getCartItems());
  };

  return { cartItems, handleRemove, handleQuantityChange };
};

export default useCart;