import { useState } from "react";
import CardIcon from "/images/card-icon.png";
import SwishIcon from "/images/swish-icon.png";
import KlarnaIcon from "/images/klarna-icon.png";
import PayPalIcon from "/images/paypal-icon.png";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    postalCode: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    mobilePhone: "",
    paymentMethod: "",
  });

  const paymentIcons = {
    Card: CardIcon,
    Swish: SwishIcon,
    Klarna: KlarnaIcon,
    PayPal: PayPalIcon,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Your information</h2>
      <div className="border rounded-lg">
        <div className="grid grid-cols-2 border-b">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="p-2 border-r outline-none rounded-tl-lg focus:bg-[#fdf5eb]"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="p-2 outline-none rounded-tr-lg focus:bg-[#fdf5eb]"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="w-full p-2 border-b outline-none rounded-tr-lg focus:bg-[#fdf5eb]"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="mobilePhone"
          placeholder="Mobile phone"
          className="w-full p-2 border-b outline-none rounded-tr-lg focus:bg-[#fdf5eb]"
          value={formData.mobilePhone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full p-2 border-b outline-none rounded-tr-lg focus:bg-[#fdf5eb]"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          className="w-full p-2 border-b outline-none rounded-tr-lg focus:bg-[#fdf5eb]"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal code"
          className="w-full p-2 outline-none rounded-tr-lg focus:bg-[#fdf5eb]"
          value={formData.postalCode}
          onChange={handleChange}
        />
      </div>

      <h2 className="text-lg font-semibold mt-4 mb-2">Payment</h2>
      <div className="border rounded-lg">
        {["Card", "Swish", "Klarna", "PayPal"].map((method) => (
          <label
            key={method}
            className="flex items-center justify-between border-b last:border-0 cursor-pointer"
          >
            <div className="p-2 flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={formData.paymentMethod === method}
                onChange={handleChange}
              />
              <span>Pay with {method}</span>
            </div>
            <img
              src={paymentIcons[method]}
              alt={`${method} icon`}
              className="w-15 h-15 object-contain"
            />
          </label>
        ))}
      </div>
    </section>
  );
};

export default PaymentForm;
