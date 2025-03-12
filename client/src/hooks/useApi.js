import { useEffect, useReducer, useCallback } from "react";

const initialState = {
  data: null,
  loading: false,
  error: null,
  categories: [],
  isModalOpen: false,
  deleteProductId: null,
};

const apiReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, data: action.payload, loading: false };
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
        data: state.data.filter((item) => item.id !== action.payload),
        isModalOpen: false,
      };
    default:
      return state;
  }
};

const useApi = (config) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);
  const {
    url,
    method = "GET",
    body = null,
    dependencies = [],
    withCategories = false,
  } = config;

  const bodyString = body ? JSON.stringify(body) : null;

  const fetchData = useCallback(async () => {
    if (!url) {
      dispatch({ type: "FETCH_SUCCESS", payload: null });
      return;
    }

    dispatch({ type: "FETCH_START" });

    try {
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
      };
      if (bodyString) options.body = bodyString;

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "Resource not found"
            : "Failed to fetch data"
        );
      }

      const result = await response.json();
      dispatch({ type: "FETCH_SUCCESS", payload: result });

      if (withCategories) {
        const categoriesResponse = await fetch(
          "http://localhost:5000/api/categories"
        );
        if (categoriesResponse.ok) {
          const categories = await categoriesResponse.json();
          dispatch({ type: "FETCH_CATEGORIES", payload: categories });
        }
      }
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  }, [url, method, bodyString, withCategories]);

  const deleteItem = useCallback(
    async (id) => {
      try {
        const response = await fetch(`${url}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete");
        dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: id });
        dispatch({ type: "CLOSE_DELETE_MODAL" });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    },
    [url]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    categories: state.categories,
    isModalOpen: state.isModalOpen,
    deleteProductId: state.deleteProductId, 
    deleteItem,
    dispatch,
  };
};

export default useApi;
