import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { filterProducts, sortProducts } from "../../utils/FilterAndSort";
import CategoryFilter from "../../components/Shop/CategoryFilter";
import SortDropdown from "../../components/Shop/SortDropdown";
import ProductGrid from "../../components/Shop/ProductGrid";
import NoProductsFound from "../../components/Shop/NoProductsFound";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";
  const [sort, setSort] = useState("newest");

  const { data: products, categories } = useApi({
    url: "http://localhost:5000/api/products",
    withCategories: true
  });

  const handleCategoryChange = (category) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (category) {
        newParams.set("category", category.toLowerCase());
      } else {
        newParams.delete("category");
      }
      return newParams;
    });
  };

  const handleSortChange = (value) => setSort(value);

  const filteredProducts = filterProducts(products || [], query, selectedCategory);
  const sortedProducts = sortProducts(filteredProducts, sort);

  const handleLikeToggle = () => {
  };

  return (
    <main className="py-10 flex-grow">
      <section className="container mx-auto px-4 pt-20">
        <h1 className="text-center my-8 text-2xl font-medium text-gray-800">
          {query ? `Search results: ${query}` : "Shop"}
        </h1>

        <div className="flex flex-row gap-4 mb-4 sm:flex-col">
          <CategoryFilter 
            categories={categories || []} 
            selectedCategory={selectedCategory} 
            handleCategoryChange={handleCategoryChange} 
          />
          <SortDropdown 
            sort={sort} 
            handleSortChange={handleSortChange} 
          />
        </div>

        {sortedProducts.length > 0 ? (
          <ProductGrid 
            products={sortedProducts} 
            onLikeToggle={handleLikeToggle} 
          />
        ) : (
          <NoProductsFound message={`No products found for "${query}"`} />
        )}
      </section>
    </main>
  );
};

export default ShopPage;