import useFetch from "../../hooks/useFetch";
import AboutFindUs from "../../components/Home/AboutFindUs";
import CategoryGrid from "../../components/Home/CategoryGrid";
import HeroSection from "../../components/Home/HeroSection";
import ProductGrid from "../../components/Shop/ProductGrid";
import { useEffect } from "react";

const HomePage = () => {
  const { data: products, loading, error } = useFetch("http://localhost:5000/api/products");

  const trendingProducts = products
    ? products.filter((p) => p.isNew.toLowerCase() === "yes")
        .sort(() => Math.random() - 0.5) // Shuffle
        .slice(0, 4) // Take 4 items
    : [];

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <main>
      <HeroSection />
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-6">What’s Trending Now</h2>
          {loading ? <p>Loading trending products...</p> : error ? <p>{error}</p> : <ProductGrid products={trendingProducts} />}
        </div>
      </section>
      <section className="py-10 mx-10 sm:mx-15 lg:mx-8">
        <div className="mb-10">
          <CategoryGrid />
        </div>
        <div>
          <AboutFindUs />
        </div>
      </section>
    </main>
  );
};

export default HomePage;