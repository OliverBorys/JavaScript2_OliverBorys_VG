import { getLikedProducts } from "./LocalStorage";

export const filterProducts = (products, query, selectedCategory) => {
  if (selectedCategory === "favorites") {
    const likedProducts = getLikedProducts();
    return products.filter((product) => likedProducts.includes(product.id));
  }

  return products.filter((product) => {
    return (
      (!query || product.productName.toLowerCase().includes(query.toLowerCase())) &&
      (!selectedCategory || product.categoryName.toLowerCase() === selectedCategory.toLowerCase())
    );
  });
};

export const sortProducts = (products, sort) => {
  return [...products].sort((a, b) => {
    if (sort === "newest") return new Date(b.publishingDate) - new Date(a.publishingDate);
    if (sort === "oldest") return new Date(a.publishingDate) - new Date(b.publishingDate);
    if (sort === "highest") return b.price - a.price;
    if (sort === "lowest") return a.price - b.price;
    return 0;
  });
};
