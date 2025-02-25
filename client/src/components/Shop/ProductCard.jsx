import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  toggleLikeProduct,
  isProductLiked,
} from "../../utils/LocalStorage";

const ProductCard = ({ product, onLikeToggle }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isProductLiked(product.id));
  }, [product.id]);

  const handleLikeClick = (e) => {
    e.preventDefault();
    const updatedLikes = toggleLikeProduct(product.id);
    setLiked(updatedLikes.includes(product.id));
    
    if (typeof onLikeToggle === "function") {
      onLikeToggle();
    } else {
      console.warn("onLikeToggle is not defined or not a function!");
    }
  };

  return (
    <Link to={`/products/${product.id}`}
      className="max-w-[300px] w-full p-4 flex flex-col items-center justify-between bg-white rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer relative"
    >
      <button
        className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md"
        onClick={handleLikeClick}
      >
        <img
          src={liked ? "/images/heart-filled.svg" : "/images/heart.svg"}
          alt="Like"
          className="w-6 h-6"
        />
      </button>

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
    </Link>
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
  onLikeToggle: PropTypes.func.isRequired,
};

export default ProductCard;
