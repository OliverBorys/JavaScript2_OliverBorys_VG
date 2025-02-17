import { useEffect } from "react";

const CheckoutPage = () => {
  useEffect(() => {
    document.title = "Checkout";
  }, []);

  return <h1 className="text-center text-2xl mt-20 font-bold">Checkout Page</h1>;
};

export default CheckoutPage;
