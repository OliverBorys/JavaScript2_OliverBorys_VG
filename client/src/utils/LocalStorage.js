export const getLikedProducts = () => {
    return JSON.parse(localStorage.getItem("likedProducts")) || [];
  };
  
  export const saveLikedProducts = (likedProducts) => {
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
  };
  
  export const isProductLiked = (productId) => {
    const likedProducts = getLikedProducts();
    return likedProducts.includes(productId);
  };
  
  export const toggleLikeProduct = (productId) => {
    let likedProducts = getLikedProducts();
  
    if (likedProducts.includes(productId)) {
      likedProducts = likedProducts.filter((id) => id !== productId);
    } else {
      likedProducts.push(productId);
    }
  
    saveLikedProducts(likedProducts);
    return likedProducts;
  };
  