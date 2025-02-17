
import HeroSection from "../../components/Home/HeroSection";
import ProductGrid from "../../components/Shop/ProductGrid";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("Failed to fetch products.");
  
        const data = await res.json();
        const filteredProducts = data.filter((p) => p.isNew.toLowerCase() === "yes");
  
        // Shuffle and take 4 products (Fisher-Yates Algorithm)
        const shuffled = filteredProducts
          .map((p) => ({ p, sort: Math.random() })) // Assign random values
          .sort((a, b) => a.sort - b.sort) // Sort randomly
          .map(({ p }) => p) // Extract products
          .slice(0, 4); // Take only 4
  
        setTrendingProducts(shuffled);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    fetchTrendingProducts();
  }, []);
  

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <main>
      <HeroSection />

      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-6">What&rsquo;s Trending Now</h2>
          <ProductGrid products={trendingProducts} />
        </div>
      </section>
    </main>
  );
};

export default HomePage;