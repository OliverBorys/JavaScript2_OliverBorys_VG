import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import NoProductsFound from "./NoProductsFound";

const ProductGrid = ({ products, onLikeToggle }) => {  
  
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} onLikeToggle={onLikeToggle} />
        ))
      ) : (
        <NoProductsFound />
      )}
    </section>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  onLikeToggle: PropTypes.func, 
};

export default ProductGrid;
