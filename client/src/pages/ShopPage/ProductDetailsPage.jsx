import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import ProductImage from "../../components/Shop/ProductDetails/ProductImage";
import ProductInfo from "../../components/Shop/ProductDetails/ProductInfo";
import Swiper from "../../components/Shop/ProductDetails/Swiper";
import MissingProduct from "../../components/Shop/ProductDetails/MissingProduct";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useApi({
    url: id ? `http://localhost:5000/api/products/${id}` : null,
  });

  useEffect(() => {
    if (product?.productName) {
      document.title = product.productName;
    }
  }, [product]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <MissingProduct />;

  return (
    <main className="mt-14 sm:mt-20 lg:mt-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
        <ProductImage product={product} />
        <ProductInfo product={product} />
      </div>
      <Swiper product={product} />
    </main>
  );
};

export default ProductDetailsPage;
