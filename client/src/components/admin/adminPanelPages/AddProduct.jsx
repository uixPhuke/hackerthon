import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({
  isOpen,
  onClose,
  newProduct,
  handleInputChange,
  handleCreateOrUpdate,
  isEditing,
}) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // For previewing the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message before submission

    try {
      // Upload the image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);

      const uploadRes = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { public_id, url } = uploadRes.data;

      // Create the product with the image data
      const productData = {
        ...newProduct,
        images: {
          public_id,
          url,
        },
      };

      const res = await axios.post("/api/products", productData);
      setMessage(res.data.msg); // Show success message
      onClose(); // Close the modal after submission
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Error while adding the product");
    }
  };

  if (!isOpen) return null; // Render nothing if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-r from-purple-600 to-blue-500 bg-opacity-80">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-4xl transform transition-all duration-300 scale-100 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="product_id"
            placeholder="Product ID"
            value={newProduct.product_id}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newProduct.title}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="content"
            placeholder="Content"
            value={newProduct.content}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="mb-4 rounded-md border border-gray-300 w-full h-64 object-cover"
            />
          )}
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md p-3 w-full hover:bg-green-500 transition"
          >
            Add Product
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">
          Close
        </button>
        {message && (
          <div
            className={`mt-4 p-3 rounded-md ${
              message.includes("Error")
                ? "bg-red-200 text-red-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
