import { useState } from "react";
import { addToCart } from "../../../utils/LocalStorage";
import PropTypes from "prop-types";
import ProductInfoAccordion from "./ProductInfoAccordion";

const ProductInfo = ({ product, onCartUpdate }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) return <p className="text-center text-gray-500">Product not found</p>;

  const handleAddToCart = () => {
    const cartProduct = { ...product, size: selectedSize };
    addToCart(cartProduct);
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { openCart: true } }));

    if (onCartUpdate) onCartUpdate(true);
  };

  return (
    <section className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg">
      <h3 className="text-xl font-bold">{product.productName}</h3>
      <span className="text-lg font-medium">${product.price}</span>

             <div className="mb-4">
         <h4 className="text-lg font-semibold text-gray-900 mb-2">
           Select Size
         </h4>
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
       <ProductInfoAccordion title="Product Description">
         {product.productDescription || "No description available."}
       </ProductInfoAccordion>
       <button
         className="w-full mt-6 bg-black text-white font-medium py-3 hover:scale-95 transition"
         onClick={handleAddToCart}
       >
         Add to Cart
       </button>
     </section>
   );
 };

ProductInfo.propTypes = {
  product: PropTypes.object,
  onCartUpdate: PropTypes.func,
};

export default ProductInfo;