import { useState } from "react";
import PropTypes from "prop-types";

const ProductInfoAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full border-b border-gray-300 pb-2">
      <button
        className="flex justify-between items-center w-full text-gray-900 text-lg font-normal focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-900">{title}</span>
        <span className="text-gray-900 text-2xl">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="py-4 space-y-4 text-gray-900 border-t border-gray-300 mt-2 -mb-2">
          {children}
        </div>
      )}
    </section>
  );
};

ProductInfoAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProductInfoAccordion;
