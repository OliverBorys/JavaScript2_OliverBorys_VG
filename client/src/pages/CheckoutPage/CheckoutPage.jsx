import { useEffect } from "react";
import PaymentForm from "../../components/Checkout/PaymentForm";
import PayPurchaseButton from "../../components/Checkout/PayPurchaseButton";
import ProductGrid from "../../components/Checkout/ProductGrid";

const CheckoutPage = () => {

  useEffect(() => {
    document.title = "Checkout";
  }, []);

  return (
    <div className="checkout-container">
      <h1 className="text-center text-2xl mt-20 lg:mt-24 mb-6 font-medium">
        Checkout
      </h1>
      <section className="grid md:grid-cols-5 gap-4 mx-4">
      <div className="self-start col-span-5 md:col-span-3 w-full bg-white mt-4 p-4 rounded-lg shadow-md">
        <ProductGrid />
      </div>
      <div className="self-start col-span-5 md:col-span-2 w-full bg-white mt-8 md:mt-4 p-4 rounded-lg shadow-md">
        <PaymentForm />
        <PayPurchaseButton />
      </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
