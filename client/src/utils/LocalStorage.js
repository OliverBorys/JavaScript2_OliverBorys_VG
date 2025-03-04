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

const cartUpdatedEvent = "cartUpdated";

export const getCartItems = () => {
  return JSON.parse(localStorage.getItem("cartItems")) || [];
};

export const saveCartItems = (cartItems, openCart = true) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.dispatchEvent(new CustomEvent(cartUpdatedEvent, { detail: { openCart } }));
};

export const addToCart = (product) => {
  let cartItems = getCartItems();
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  saveCartItems(cartItems, true);
};


export const removeFromCart = (productId) => {
  let cartItems = getCartItems().filter((item) => item.id !== productId);
  saveCartItems(cartItems, false);
};


export const updateCartQuantity = (productId, quantity) => {
  let cartItems = getCartItems().map((item) =>
    item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
  );
  saveCartItems(cartItems, false);
};


export const clearCart = () => {
  localStorage.removeItem("cartItems"); 
  window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { openCart: true } }));
};