import React, { useState, useEffect } from "react";

const ProductForm = ({ mode = "add", initialData = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", description: "", price: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-4 rounded space-y-4 mb-6">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full p-2 bg-black text-white rounded"
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
        className="w-full p-2 bg-black text-white rounded"
        type="number"
      />
      <input
        name="image"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-2 bg-black text-white rounded"
      />
      
      {formData.image && (
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
        <button type="button" onClick={onCancel} className="bg-gray-600 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
