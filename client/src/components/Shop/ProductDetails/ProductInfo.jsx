import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../../../utils/LocalStorage";
import PropTypes from "prop-types"

const ProductInfo = ({ onCartUpdate }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return <p className="text-center text-gray-500">Product not found</p>;

  const handleAddToCart = () => {
    const cartProduct = { ...product, size: selectedSize };
    addToCart(cartProduct);
    window.dispatchEvent(new Event("cartUpdated"));
    onCartUpdate(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg">
      <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
        <h3 className="text-xl font-bold text-gray-900">{product.productName}</h3>
        <span className="text-lg font-medium text-gray-800">${product.price}</span>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Select Size</h4>
        <div className="grid grid-cols-3 gap-2">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <label
              key={size}
              className={`border px-4 py-2 text-center cursor-pointer transition ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "border-black text-gray-900 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="size"
                value={size}
                className="hidden"
                onChange={() => setSelectedSize(size)}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      <button
        className="w-full bg-black text-white font-medium py-3 hover:scale-95 transition"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};


ProductInfo.propTypes = {
  onCartUpdate: PropTypes.func.isRequired,
};

export default ProductInfo;
