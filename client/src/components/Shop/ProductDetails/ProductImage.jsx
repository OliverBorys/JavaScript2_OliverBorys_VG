import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const ProductImage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const images = [
    product.image,
    product.secondaryImage1,
    product.secondaryImage2,
    product.secondaryImage3,
  ].filter(Boolean);

  return (
    <section className="w-full max-w-2xl mx-auto">
      <div className="block md:mb-6 lg:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img
                src={img}
                alt={`Product ${index + 1}`}
                className="w-full max-h-[400px] object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden lg:grid grid-cols-2 gap-4 lg:mb-6">
        {images.map((img, index) => (
          <div key={index} className="flex justify-center items-center w-full h-auto">
            <img
              src={img}
              alt={`Product ${index + 1}`}
              className="w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductImage;
