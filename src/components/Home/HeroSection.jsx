import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [heroImages, setHeroImages] = useState([null, null]);

  useEffect(() => {
    fetch("http://localhost:5000/api/hero-images")
      .then((res) => res.json())
      .then((data) => {
        if (data.length >= 2) {
          setHeroImages([data[0].image_url, data[1].image_url]);
        }
      })
      .catch((error) => console.error("Error fetching hero images:", error));
  }, []);

  return (
    <section>
      <div className="relative bg-black h-[90vh] flex flex-col sm:flex-row">
        <img
          src={heroImages[0]}
          alt="hero image womens fashion"
          className="h-full w-full object-cover object-top sm:w-1/2"
        />
        <img
          src={heroImages[1]}
          alt="hero image mens fashion"
          className="hidden sm:block h-full w-full object-cover object-top sm:w-1/2"
        />
        <Link
          to="/shop"
          className="absolute left-1/2 top-2/3 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 font-medium text-black bg-gray-100 hover:bg-black hover:text-white hover:border-1 hover:border-white transition-all text-center rounded-lg w-40"
        >
          Shop
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
