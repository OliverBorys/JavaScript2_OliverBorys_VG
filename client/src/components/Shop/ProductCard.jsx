import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  return (
    <a
      href={`/products/${product.id}`}
      className="max-w-[300px] w-full p-4 flex flex-col items-center justify-between bg-white rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
    >
      <div className="relative group">
        <img
          src={product.image}
          alt={product.productName}
          className="w-full h-48 object-cover rounded-t-lg group-hover:hidden"
        />
        {product.secondaryImage1 && (
          <img
            src={product.secondaryImage1}
            alt={`${product.productName} alternate view`}
            className="w-full h-48 object-cover rounded-t-lg hidden group-hover:block"
          />
        )}
      </div>
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-bold text-gray-800">{product.productName}</h3>
        <p className="text-sm text-gray-600">{product.brand}</p>
        <p className="text-lg font-semibold text-gray-900">${product.price}</p>
      </div>
    </a>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    secondaryImage1: PropTypes.string,
    brand: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
