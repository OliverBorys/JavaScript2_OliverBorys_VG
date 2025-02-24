import { useState } from "react";
import PropTypes from "prop-types";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b border-gray-900 last:border-b-0">
      <button
        className="flex justify-between items-center w-full text-gray-900 text-lg font-normal py-5 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-medium">{title}</span>
        <span className="text-gray-900 text-2xl">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div className="col-span-3 mt-2 bg-gray-900 h-[1px] mr-0"></div>


      {isOpen && (
        <div className="py-4 space-y-4 text-gray-900 text-md">
          {children}
        </div>
      )}
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Accordion;
