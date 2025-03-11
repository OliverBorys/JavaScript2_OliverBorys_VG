import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { data: heroImages, loading, error } = useApi({
    url: "http://localhost:5000/api/hero-images"
  });

  if (loading) return <p>Loading hero images...</p>;
  if (error) return <p>Error loading images</p>;
  if (!heroImages || heroImages.length < 2) return <p>No hero images available</p>;

  return (
    <section>
      <div className="relative bg-black h-[90vh] flex flex-col sm:flex-row">
        <img src={heroImages[0].image_url} alt="hero image womens fashion" className="h-full w-full object-cover sm:w-1/2" />
        <img src={heroImages[1].image_url} alt="hero image mens fashion" className="hidden sm:block h-full w-full object-cover sm:w-1/2" />
        <Link to="/shop" className="absolute left-1/2 top-2/3 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 font-medium text-black bg-gray-100 hover:bg-black hover:text-white transition-all text-center rounded-lg w-40">
          Shop
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
