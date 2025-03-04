import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { filterProducts, sortProducts } from "../../utils/FilterAndSort";
import CategoryFilter from "../../components/Shop/CategoryFilter";
import SortDropdown from "../../components/Shop/SortDropdown";
import ProductGrid from "../../components/Shop/ProductGrid";
import NoProductsFound from "../../components/Shop/NoProductsFound";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";
  const [sort, setSort] = useState("newest");

  const { products, categories } = useProducts();

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

  const filteredProducts = filterProducts(products, query, selectedCategory);
  const sortedProducts = sortProducts(filteredProducts, sort);

  return (
    <main className="py-10 flex-grow">
      <section className="container mx-auto px-4 pt-20">
        <header className="text-center my-8">
          <h1 className="text-2xl font-medium text-gray-800">
            {query ? `Search results: ${query}` : "Shop"}
          </h1>
        </header>

        <div className="flex flex-row gap-4 mb-4 sm:flex-col">
          <CategoryFilter categories={categories} selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
          <SortDropdown sort={sort} handleSortChange={handleSortChange} />
        </div>

        {sortedProducts.length > 0 ? <ProductGrid products={sortedProducts} /> : <NoProductsFound message={`No products found for "${query}"`} />}
      </section>
    </main>
  );
};

export default SearchPage;
