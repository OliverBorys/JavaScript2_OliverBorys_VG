import { Link } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";

const ProductTable = () => {
  const { state, dispatch, deleteProduct } = useProducts();

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link
          to="/admin/add-product"
          className="px-3 py-1 border border-green-600 bg-white text-md text-green-600 hover:bg-green-600 hover:text-white transition-all text-center rounded"
        >
          Add product
        </Link>
      </div>

      {state.loading && <p>Loading products...</p>}
      {state.error && <p className="text-red-500">{state.error}</p>}

      <table className="table-auto border-collapse border border-black w-full text-left">
        <thead>
          <tr>
            <th className="border border-black px-4 py-2 hidden sm:table-cell">ID</th>
            <th className="border border-black px-4 py-2">Product Name</th>
            <th className="border border-black px-4 py-2 hidden sm:table-cell">Image</th>
            <th className="border border-black px-4 py-2">New in</th>
            <th className="border border-black px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((product) => (
            <tr key={product.id}>
              <td className="border border-black px-4 py-2 text-center hidden sm:table-cell">{product.id}</td>
              <td className="border border-black px-4 py-2">{product.productName}</td>
              <td className="border border-black px-4 py-2 hidden sm:table-cell">
                <img src={product.image} alt={product.productName} className="h-36" />
              </td>
              <td className="border border-black px-4 py-2">{product.isNew.toLowerCase() === "yes" ? "Yes" : "No"}</td>
              <td className="border border-black">
                <div className="flex flex-col p-2 sm:px-2 space-y-2">
                  <Link
                    to={`/admin/edit-product/${product.id}`}
                    className="px-2 py-1 border border-blue-500 bg-white text-blue-500 hover:bg-blue-500 hover:text-white transition-all text-center rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => dispatch({ type: "OPEN_DELETE_MODAL", payload: product.id })}
                    className="px-2 py-1 border border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all text-center rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {state.isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 border-1 border-gray-300 rounded-lg shadow-2xl text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => deleteProduct(state.deleteProductId)} className="px-2 py-1 border border-red-600 bg-white text-red-600 hover:bg-red-600 hover:text-white transition-all text-center rounded">
                Yes, Delete
              </button>
              <button onClick={() => dispatch({ type: "CLOSE_DELETE_MODAL" })} className="px-2 py-1 border border-gray-600 bg-white text-gray-600 hover:bg-gray-600 hover:text-white transition-all text-center rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
