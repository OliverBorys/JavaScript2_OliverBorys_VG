import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryFilter from "../../components/Shop/CategoryFilter";
import SortDropdown from "../../components/Shop/SortDropdown";
import ProductGrid from "../../components/Shop/ProductGrid";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("newest");
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

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

  const handleSortChange = (value) => setSort(value);

  const handleCategoryChange = (category) => {
    setSearchParams(category ? { category } : {});
  };

  const filteredProducts = products.filter((product) =>
    selectedCategory ? product.categoryName.toLowerCase() === selectedCategory.toLowerCase() : true
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "newest") return new Date(b.publishingDate) - new Date(a.publishingDate);
    if (sort === "oldest") return new Date(a.publishingDate) - new Date(b.publishingDate);
    if (sort === "highest") return b.price - a.price;
    if (sort === "lowest") return a.price - b.price;
    return 0;
  });

  useEffect(() => {
    document.title = "Shop";
  }, []);

  return (
    <main className="py-10 flex-grow">
      <section className="container mx-auto px-4 pt-12">
        <header className="text-center my-8">
          <h1 className="text-2xl font-medium text-gray-800">Shop</h1>
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

        <ProductGrid products={sortedProducts} />
      </section>
    </main>
  );
};

export default ShopPage;
