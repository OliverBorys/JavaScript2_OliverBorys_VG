import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import PropTypes from "prop-types";

const ProductImage = ({ product }) => {
  if (!product) return <p className="text-center text-gray-500">Product not found</p>;

  const images = [product.image, product.secondaryImage1, product.secondaryImage2, product.secondaryImage3].filter(Boolean);

  return (
    <section>
    <div className="lg:hidden w-full max-w-2xl mx-auto">
      <Swiper modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={10} slidesPerView={1}>
        {images.map((img, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <img src={img} alt={`Product ${index + 1}`} className="w-full max-h-[400px] object-contain" />
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

ProductImage.propTypes = {
  product: PropTypes.object,
};

export default ProductImage;

