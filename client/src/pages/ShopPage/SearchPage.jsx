import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getLikedProducts } from "../../utils/LocalStorage";
import CategoryFilter from "../../components/Shop/CategoryFilter";
import SortDropdown from "../../components/Shop/SortDropdown";
import ProductGrid from "../../components/Shop/ProductGrid";
import NoProductsFound from "../../components/Shop/NoProductsFound";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryFromUrl = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
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

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const handleSortChange = (value) => setSort(value);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "favorites") {
      const likedProducts = getLikedProducts();
      return likedProducts.includes(product.id);
    }
    return query
      ? product.productName.toLowerCase().includes(query.toLowerCase()) &&
          (selectedCategory
            ? product.categoryName.toLowerCase() ===
              selectedCategory.toLowerCase()
            : true)
      : selectedCategory
        ? product.categoryName.toLowerCase() === selectedCategory.toLowerCase()
        : true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "newest")
      return new Date(b.publishingDate) - new Date(a.publishingDate);
    if (sort === "oldest")
      return new Date(a.publishingDate) - new Date(b.publishingDate);
    if (sort === "highest") return b.price - a.price;
    if (sort === "lowest") return a.price - b.price;
    return 0;
  });

  useEffect(() => {
    document.title = query ? `Search results: ${query}` : "Shop";
  }, [query]);

  return (
    <main className="py-10 flex-grow">
      <section className="container mx-auto px-4 pt-20">
        <header className="text-center my-8">
          <h1 className="text-2xl font-medium text-gray-800">
            {query ? `Search results: ${query}` : "Shop"}
          </h1>
        </header>

        <div className="flex flex-row gap-4 mb-4 place-self-center sm:place-self-auto sm:flex-col">
          <div>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </div>
          <div className="">
            <SortDropdown sort={sort} handleSortChange={handleSortChange} />
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <>
            <ProductGrid products={sortedProducts} />
            <div className="text-center mt-10">
              <p className="text-gray-800">
                Showing <strong>{sortedProducts.length}</strong>{" "}
                {sortedProducts.length === 1 ? "product" : "products"}
              </p>
              <div className="mt-2 mx-20 h-0.5 bg-black"></div>
            </div>
          </>
        ) : (
          <NoProductsFound query={query} />
        )}
      </section>
    </main>
  );
};

export default SearchPage;
