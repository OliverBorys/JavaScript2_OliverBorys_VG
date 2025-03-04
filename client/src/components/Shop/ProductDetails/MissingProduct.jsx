import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCartItems, saveCartItems } from "../../../utils/LocalStorage";

const MissingProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      removeMissingProductFromCart(id);
    }
  }, [id]);

  const removeMissingProductFromCart = (productId) => {
    let cartItems = getCartItems();
    
    const updatedCart = cartItems.filter((item) => item.id !== parseInt(productId));

    if (cartItems.length !== updatedCart.length) {
      saveCartItems(updatedCart, false);
      
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { openCart: false } }));
      console.log(`Removed product ${productId} from cart.`);
    } else {
      console.log(`Product ${productId} not found in cart.`);
    }
  };

  return (
    <div className="text-center mt-20 lg:mt-24">
      <h2 className="text-2xl font-bold text-red-500">Product not found</h2>
      <p className="text-gray-600 mt-2">
        The product you are looking for does not exist or has been removed.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default MissingProduct;
