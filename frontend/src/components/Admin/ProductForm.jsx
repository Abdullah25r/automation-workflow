import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from '../../Api/productapi';

const ProductForm = ({
  mode = "add",
  initialData = null,
  onSubmit,
  onCancel,
}) => {
  // Initialize formData with empty strings for all fields.
  // This ensures the form is always controlled and handles 'null' or 'undefined'
  // values from initialData gracefully.
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    color: "",
    features: "",
    discount_price: "",
  });

  const [uploading, setUploading] = useState(false); // For image upload
  const [submitting, setSubmitting] = useState(false); // For form submission

  // Use a useEffect hook to populate the form fields when in 'edit' mode.
  // This runs whenever the 'mode' or 'initialData' props change.
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        // Use the nullish coalescing operator (??) to ensure a value is never null
        // in the form state, which prevents React from throwing warnings.
        name: initialData.name ?? "",
        description: initialData.description ?? "",
        price: initialData.price ?? "",
        image: initialData.image ?? "",
        category: initialData.category ?? "",
        color: initialData.color ?? "",
        features: initialData.features ?? "",
        // Convert the discount price to a string for the input field,
        // using an empty string if the value is null.
        discount_price: initialData.discount_price !== null && initialData.discount_price !== undefined
          ? String(initialData.discount_price)
          : "",
      });
    } else if (mode === "add") {
      // Reset form data when switching to 'add' mode
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        color: "",
        features: "",
        discount_price: "",
      });
    }
  }, [mode, initialData]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    // Environment variables for Cloudinary
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

    if (name === "image" && files?.[0]) {
      const file = files[0];
      const formDataCloud = new FormData();
      formDataCloud.append("file", file);
      formDataCloud.append("upload_preset", uploadPreset);

      setUploading(true); // Start image upload loader

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formDataCloud,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = res.data.secure_url;
        // Update the image field in the form state
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      } catch (error) {
        console.error(
          "Cloudinary upload error:",
          error.response?.data || error
        );
        // Use a custom message box instead of alert()
        alert("Image upload failed.");
      } finally {
        setUploading(false); // End image upload loader
      }
    } else {
      // For all other fields, update the form data
      if (name === "price" || name === "discount_price") {
        setFormData((prev) => ({
          ...prev,
          [name]: value === "" ? "" : Number(value),
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true); // Start form submission loader

    try {
      const dataToSend = {
        ...formData,
        // Convert string values from form to numbers for the backend
        price: Number(formData.price),
        discount_price: formData.discount_price === "" ? null : Number(formData.discount_price),
        color: formData.color || null,
        features: formData.features || null,
      };

      if (mode === "edit") {
        await axios.put(
          `${baseURL}/api/products/${initialData.product_id}`,
          dataToSend
        );
        alert("Product updated successfully!");
      } else {
        await axios.post(
          `${baseURL}/api/products`,
          dataToSend
        );
        alert("Product added successfully!");
      }

      if (mode === "add") {
        setFormData({
          name: "", description: "", price: "", image: "", category: "",
          color: "", features: "", discount_price: "",
        });
      }

      if (onSubmit) onSubmit();
    } catch (error) {
      console.error("Submit error:", error.response?.data || error);
      alert(`Failed to ${mode === "edit" ? "update" : "add"} product.`);
    } finally {
      setSubmitting(false); // End form submission loader
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1a1a1a] p-4 rounded space-y-4 mb-6"
    >
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
        step="0.01"
        className="w-full p-2 bg-black text-white rounded"
        required
      />
      <input
        name="color"
        value={formData.color}
        onChange={handleChange}
        placeholder="Color (e.g., Black, Silver)"
        className="w-full p-2 bg-black text-white rounded"
      />
      <textarea
        name="features"
        value={formData.features}
        onChange={handleChange}
        placeholder="Features (e.g., '16GB RAM, 512GB SSD')"
        className="w-full p-2 bg-black text-white rounded"
      />
      <input
        name="discount_price"
        value={formData.discount_price}
        onChange={handleChange}
        placeholder="Discount Price (Optional)"
        type="number"
        step="0.01"
        className="w-full p-2 bg-black text-white rounded"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 bg-black text-white rounded"
        required
      >
        <option value="" disabled>
          Select Category
        </option>
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
        required={!formData.image && mode === "add"}
      />
      {formData.image?.trim() && (
        <img
          src={formData.image}
          alt="Preview"
          className="w-32 h-32 object-cover rounded border border-gray-500"
        />
      )}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={uploading || submitting}
          className={`px-4 py-2 rounded flex items-center justify-center gap-2 ${
            (uploading || submitting) ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          } text-white font-semibold`}
        >
          {(uploading || submitting) ? (
            <>
              {/* Simple SVG Spinner */}
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.088 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {uploading ? "Uploading Image..." : `${mode === "edit" ? "Updating..." : "Adding..."}`}
            </>
          ) : (
            `${mode === "edit" ? "Update" : "Add"} Product`
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
