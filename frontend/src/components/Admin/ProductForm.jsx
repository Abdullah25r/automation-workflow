import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({
  mode = "add",
  initialData = null,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.[0]) {
      const file = files[0];
      const formDataCloud = new FormData();
      formDataCloud.append("file", file);
      formDataCloud.append("upload_preset", "pods-store"); 

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/df65hidyu/image/upload",
          formDataCloud,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = res.data.secure_url;
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      } catch (error) {
        console.error("Cloudinary upload error:", error.response?.data || error);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (mode === "edit") {
      await axios.put(`http://localhost:3001/api/products/${formData.id}`, formData);
      alert("Product updated successfully!");
    } else {
      await axios.post("http://localhost:3001/api/products", formData);
      alert("Product added successfully!");
    }

    // Reset form (optional in edit mode)
    if (mode === "add") {
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
      });
    }

    if (onSubmit) onSubmit(); // Let parent component refresh or close
  } catch (error) {
    console.error("Submit error:", error.response?.data || error);
    alert(`Failed to ${mode === "edit" ? "update" : "add"} product.`);
  }
};

  return (
    <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-4 rounded space-y-4 mb-6">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full p-2 bg-black text-white rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 bg-black text-white rounded"
      />
      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
        className="w-full p-2 bg-black text-white rounded"
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 bg-black text-white rounded"
        required
      >
        <option value="" disabled>Select Category</option>
        <option value="pods">Pods</option>
        <option value="headphones">Headphones</option>
        <option value="watch">Watch</option>
        <option value="extras">Extras</option>
      </select>
      <input
        name="image"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-2 bg-black text-white rounded"
        required={!formData.image}
      />
      {formData.image?.trim() && (
        <img
          src={formData.image}
          alt="Preview"
          className="w-32 h-32 object-cover rounded border border-gray-500"
        />
      )}
      <div className="flex gap-4">
        <button type="submit" className="bg-green-600 px-4 py-2 rounded">
          {mode === "edit" ? "Update" : "Add"} Product
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
