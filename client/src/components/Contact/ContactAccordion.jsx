// import { useState } from "react";
// import PropTypes from "prop-types";

// const ContactAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="place-self-center border-b border-gray-500 last:border-b-0 w-3/4 sm:w-3/5">
//       <button
//         className="flex justify-between items-center w-full text-gray-900 text-lg font-normal py-4 focus:outline-none"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {title}
//         <span
//           className="text-gray-900 text-3xl"
//         >
//         {isOpen ? "-" : "+"}
//         </span>
//       </button>

//       {/* ✅ Accordion Content (only visible when open) */}
//       {isOpen && (
//         <div className="text-gray-900 text-md py-4">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// ContactAccordion.propTypes = {
//   title: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
// };

// export default ContactAccordion;


import { useState } from "react";
import PropTypes from "prop-types";

const ContactAccordion = ({ title, children }) => {
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

      {isOpen && (
        <div className="py-4 space-y-4 text-gray-900 text-md">
          {children}
        </div>
      )}
    </div>
  );
};

ContactAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ContactAccordion;
