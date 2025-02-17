import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import NoProductsFound from "./NoProductsFound";

const ProductGrid = ({ products }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <NoProductsFound />
      )}
    </section>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      productName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      secondaryImage1: PropTypes.string,
      secondaryImage2: PropTypes.string,
      secondaryImage3: PropTypes.string,
      brand: PropTypes.string,
      productDescription: PropTypes.string,
      isNew: PropTypes.string,
      categoryName: PropTypes.string,
      publishingDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductGrid;
