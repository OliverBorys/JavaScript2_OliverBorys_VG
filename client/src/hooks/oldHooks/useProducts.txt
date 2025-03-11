import { useEffect, useReducer } from "react";

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  deleteProductId: null,
  isModalOpen: false,
};

// Reducer function
const productReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "FETCH_CATEGORIES":
      return { ...state, categories: action.payload };
    case "OPEN_DELETE_MODAL":
      return { ...state, deleteProductId: action.payload, isModalOpen: true };
    case "CLOSE_DELETE_MODAL":
      return { ...state, deleteProductId: null, isModalOpen: false };
    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
        isModalOpen: false,
      };
    case "DELETE_PRODUCT_ERROR":
      return { ...state, error: action.payload, isModalOpen: false };
    default:
      return state;
  }
};

const useProducts = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_PRODUCTS" });

      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        dispatch({ type: "FETCH_CATEGORIES", payload: data });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: productId });

      console.log(`Product with ID ${productId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting product:", error);
      dispatch({ type: "DELETE_PRODUCT_ERROR", payload: error.message });
    }
  };

  return {
    state,
    dispatch,
    deleteProduct,
    products: state.products || [],
    categories: state.categories || [],
    loading: state.loading,
    error: state.error,
  };
};

export default useProducts;