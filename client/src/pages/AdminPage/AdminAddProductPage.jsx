import { useEffect } from "react";
import useProductForm from "../../hooks/useProductForm";
import FormInput from "../../components/Admin/AddProduct/FormInput";
import FormTextarea from "../../components/Admin/AddProduct/FormTextarea";
import FormSelect from "../../components/Admin/AddProduct/FormSelect";
import SubmitButton from "../../components/Admin/AddProduct/FormSubmitButton";

const AdminAddProductPage = () => {
  const { formData, handleChange, handleSubmit, isFormValid, loading } = useProductForm(
    {
      productName: "",
      price: "",
      image: "",
      secondaryImage1: "",
      secondaryImage2: "",
      secondaryImage3: "",
      brand: "",
      productDescription: "",
      isNew: "No",
      categoryId: "",
      publishingDate: "",
    },
    "http://localhost:5000/api/products",
    "POST"
  );

    useEffect(() => {
      document.title = "Admin: Add product";
    }, []);

  return (
    <section>
      <form onSubmit={handleSubmit} className="mt-26 space-y-4 p-6 mx-6 bg-white rounded-md shadow-md">
        <h1 className="text-center text-2xl font-medium text-gray-800 mb-6">Add Product</h1>

        <FormInput label="Product Name *" type="text" name="productName" value={formData.productName} onChange={handleChange} required />
        <FormInput label="Price (In USD) *" type="number" name="price" value={formData.price} onChange={handleChange} required />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Main Image (URL) *" type="text" name="image" value={formData.image} onChange={handleChange} required />
          <FormInput label="Secondary Image 1 (URL)" type="text" name="secondaryImage1" value={formData.secondaryImage1} onChange={handleChange} />
          <FormInput label="Secondary Image 2 (URL)" type="text" name="secondaryImage2" value={formData.secondaryImage2} onChange={handleChange} />
          <FormInput label="Secondary Image 3 (URL)" type="text" name="secondaryImage3" value={formData.secondaryImage3} onChange={handleChange} />
        </div>

        <FormInput label="Brand *" type="text" name="brand" value={formData.brand} onChange={handleChange} required />
        <FormTextarea label="Product Description *" name="productDescription" value={formData.productDescription} onChange={handleChange} required />

        <FormSelect
          label="Is New? *"
          name="isNew"
          value={formData.isNew}
          onChange={handleChange}
          options={[{ value: "No", label: "No" }, { value: "Yes", label: "Yes" }]}
          required
        />

        <FormSelect
          label="Category *"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          options={[
            { value: "", label: "Select Category" },
            { value: "1", label: "Shoes" },
            { value: "2", label: "Clothes" },
            { value: "3", label: "Bags" },
            { value: "4", label: "Watches" },
            { value: "5", label: "Sunglasses" },
          ]}
          required
        />

        <FormInput label="Publishing Date *" type="date" name="publishingDate" value={formData.publishingDate} onChange={handleChange} required />
        <SubmitButton text="Add Product" disabled={!isFormValid() || loading} />
      </form>
    </section>
  );
};

export default AdminAddProductPage;
