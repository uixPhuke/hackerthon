import React, { useState, useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddProduct from "./AddProduct"; // Import the AddProduct component
import { GlobalState } from "../../../GlobalState";

const AdminProduct = ({ product }) => {
  // const state = useContext(GlobalState);
  // const { createProducts } = state.ProductAPI; // Correctly access ProductAPI from GlobalState

  const [products, setProducts] = useState(product || []); // Initialize with product prop
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for managing modal visibility
  const [newProduct, setNewProduct] = useState({
    product_id: "",
    title: "",
    price: "",
    description: "",
    content: "",
    images: {},
    category: "",
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.product_id === id);
    setNewProduct(productToEdit);
    setEditProductId(id);
    setIsEditing(true);
    setIsModalOpen(true); // Open the modal when editing
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.product_id !== id));
  };

  const handleCreateOrUpdate = () => {
    if (isEditing) {
      setProducts(
        products.map((product) =>
          product.product_id === editProductId ? newProduct : product
        )
      );
      setIsEditing(false);
    } else {
      setProducts([
        ...products,
        { ...newProduct, product_id: (products.length + 1).toString() },
      ]);
    }
    setNewProduct({
      product_id: "",
      title: "",
      price: "",
      description: "",
      content: "",
      images: {},
      category: "",
    });
    setIsModalOpen(false); // Close the modal after adding or updating the product
    alert(
      isEditing
        ? "Product updated successfully!"
        : "Product created successfully!"
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div className="p-4 bg-transparent min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="w-full max-w-5xl">
        {/* Search and Actions */}
        <div className="flex justify-between mb-4">
          <input
            type="text"
            className="border border-gray-300 px-4 py-2 rounded-md w-1/2"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={() => {
              setIsEditing(false);
              setIsModalOpen(true); // Open the modal for adding a product
            }}
          >
            Add Product
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-sm font-medium text-gray-900">
                  TITLE
                </th>
                <th className="py-3 px-4 text-sm font-medium text-gray-900">
                  PRICE
                </th>
                <th className="py-3 px-4 text-sm font-medium text-gray-900">
                  CATEGORY
                </th>
                <th className="py-3 px-4 text-sm font-medium text-gray-900">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.product_id} className="border-b">
                  <td className="py-4 px-4 flex items-center space-x-4">
                    {/* Assuming the `images` field is an object with a `url` key for the product image */}
                    <img
                      src={product.images.url || "default-image.png"} // Provide a default image if none is available
                      alt={product.title}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <span>{product.title}</span>
                  </td>
                  <td className="py-4 px-4">${product.price}</td>
                  <td className="py-4 px-4">{product.category}</td>
                  <td className="py-4 px-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(product.product_id)}
                      className="text-blue-500 hover:text-blue-600 transition"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.product_id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProduct
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newProduct={newProduct}
        handleInputChange={handleInputChange}
        handleCreateOrUpdate={handleCreateOrUpdate}
        isEditing={isEditing}
        
      />
    </div>
  );
};

export default AdminProduct;
