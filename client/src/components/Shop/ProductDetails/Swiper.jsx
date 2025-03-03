import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const SwiperComponent = () => {
  const { id } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        const currentProduct = data.find(
          (product) => product.id === Number(id)
        );
        if (!currentProduct) throw new Error("Product not found");

        setFilteredProducts(
          data.filter(
            (product) =>
              product.categoryId === currentProduct.categoryId &&
              product.id !== Number(id)
          )
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="px-6 pt-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
        Related products
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        centeredSlides
        breakpoints={{
          500: { slidesPerView: 2, centeredSlides: false },
          768: { slidesPerView: 3, spaceBetween: 20, centeredSlides: false },
          1024: { slidesPerView: 4, spaceBetween: 10, centeredSlides: false },
        }}
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product.id} className="flex justify-center">
            <Link
              to={`/products/${product.id}`}
              className="max-w-[300px] w-full p-4 flex flex-col items-center bg-white rounded-lg shadow-lg hover:shadow-xl transition-all min-h-[350px]"
            >
              <div className="relative w-full h-[200px] flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="max-h-full w-auto object-contain rounded-t-lg"
                />
              </div>

              <div className="p-4 flex flex-col items-center flex-grow">
                <h3 className="text-lg font-bold text-gray-800 w-full text-center truncate">
                  {product.productName}
                </h3>
                <p className="text-sm text-gray-600">{product.brand}</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${product.price}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="mt-4 text-gray-500 text-center">← Swipe for more →</p>
    </section>
  );
};
export default SwiperComponent;
