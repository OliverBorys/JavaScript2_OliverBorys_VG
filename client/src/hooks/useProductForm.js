import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useProductForm = (initialState, submitUrl, method = "POST", productId = null) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (method === "PUT" && productId) {
      fetch(`${submitUrl}/${productId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch product");
          return res.json();
        })
        .then((data) => {
          setFormData({
            ...data,
            price: Number(data.price),
            categoryId: String(data.categoryId),
            isNew: data.isNew?.toLowerCase() === "yes" ? "Yes" : "No",
          });
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [method, productId, submitUrl]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${submitUrl}${productId ? `/${productId}` : ""}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      const data = await response.json();
      console.log(`Product ${method === "POST" ? "Added" : "Updated"}:`, data);
      navigate("/admin");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.productName.trim() !== "" &&
      !isNaN(formData.price) &&
      formData.image.trim() !== "" &&
      formData.brand.trim() !== "" &&
      formData.productDescription.trim() !== "" &&
      String(formData.categoryId).trim() !== "" &&
      formData.publishingDate.trim() !== ""
    );
  };

  return { formData, handleChange, handleSubmit, isFormValid, loading };
};

export default useProductForm;
