import { useState } from "react";
import { Link } from "react-router-dom";
import { clearCart } from "../../utils/LocalStorage"; 

const PayPurchaseButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handlePurchase = () => {
    setShowModal(true); 
  };

  const handleBackToHome = () => {
    clearCart(); 
  };

  return (
    <div className="text-center">
      <button
        onClick={handlePurchase}
        className="mt-5 py-2 px-6 font-medium rounded-md w-full mx-auto text-center border duration-300 border-blue-700 bg-white text-blue-700 hover:bg-blue-700 hover:text-white hover:scale-99"
      >
        Pay Purchase
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 border-1 border-gray-300 rounded-lg shadow-2xl text-center">
          <h2 className="text-lg font-semibold mb-4">Thank you for your purchase!</h2>
            <Link
              to="/"
              onClick={handleBackToHome}
              className="py-2 px-6 rounded-md bg-white text-black border hover:bg-black hover:text-white duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayPurchaseButton;
