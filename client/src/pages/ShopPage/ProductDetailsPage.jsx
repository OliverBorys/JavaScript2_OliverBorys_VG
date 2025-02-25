import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductImage from "../../components/Shop/ProductDetails/ProductImage";
import ProductInfo from "../../components/Shop/ProductDetails/ProductInfo";
import Swiper from "../../components/Shop/ProductDetails/Swiper";
import Header from "../../components/Header/Header";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        document.title = data.productName;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleCartSidebar = (forceOpen = false) => {
    setCartSidebarOpen(forceOpen || ((prev) => !prev));
    setCartUpdated((prev) => !prev);
  };
  

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product)
    return <p className="text-center text-gray-500">Product not found</p>;

  return (
    <>
      <Header
        isCartSidebarOpen={isCartSidebarOpen}
        toggleCartSidebar={toggleCartSidebar}
        cartUpdated={cartUpdated}
      />
      <main className="mt-14 sm:mt-20 lg:mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start max-w-screen-xl mx-auto px-4">
          <ProductImage product={product} />
          <ProductInfo onCartUpdate={toggleCartSidebar} />
        </div>
        <Swiper productId={id} />
      </main>
    </>
  );
};

export default ProductDetailsPage;
