import { useState } from "react";
import PropTypes from "prop-types";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="accordion-button flex justify-between items-center w-full bg-white text-black text-md font-medium px-6 py-4 border border-blue-200 rounded-md hover:bg-blue-200 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span
          className={`accordion-icon text-blue-500 transition-transform duration-700 ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>
      <div
        className={`panel bg-gray-50 px-6 py-4 border border-t-0 rounded-md border-blue-200 ${isOpen ? "block" : "hidden"}`}
      >
        {children}
      </div>
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Accordion;
