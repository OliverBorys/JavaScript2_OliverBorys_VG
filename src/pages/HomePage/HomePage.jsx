import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../../components/Shop/ProductGrid";

const HomePage = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        return response.json();
      })
      .then((data) => {
        // Filter only trending (new) products
        const filteredProducts = data.filter(
          (product) => product.isNew.toLowerCase() === "yes"
        );

        // Shuffle products (if more than 4, pick 4 random ones)
        let productsToDisplay = [...filteredProducts];
        if (filteredProducts.length > 4) {
          for (let i = filteredProducts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [productsToDisplay[i], productsToDisplay[j]] = [
              productsToDisplay[j],
              productsToDisplay[i],
            ];
          }
          productsToDisplay = productsToDisplay.slice(0, 4);
        }

        setTrendingProducts(productsToDisplay);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <main>
      <section>
        <div className="relative bg-black h-[90vh] flex flex-col sm:flex-row">
          <img
            src="/path-to-hero-image-womens.jpg" // Update to actual image
            alt="hero image womens fashion"
            className="h-full w-full object-cover object-top sm:w-1/2"
          />
          <img
            src="/path-to-hero-image-mens.jpg" // Update to actual image
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

      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-6">
            What&apos;s Trending Now
          </h2>
          <ProductGrid products={trendingProducts} />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
