import PropTypes from "prop-types";

const NoProductsFound = ({ query }) => {
  return (
    <p className="text-center text-gray-600 col-span-full">
      No products found for: {query}
    </p>
  );
};

NoProductsFound.propTypes = {
  query: PropTypes.string.isRequired
};

export default NoProductsFound;

  