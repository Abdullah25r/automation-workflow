// components/ProductList.jsx
import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import { Plus } from "lucide-react";
const ProductList = ({ data = [], title = "Products" }) => {
  const [products, setProducts] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    setProducts(data);
  }, [data]);
  const handleAddClick = () => {
    setShowForm(true);
    setEditMode(false);
    setSelectedProduct(null);
  };

  const handleEditClick = (product) => {
    setShowForm(true);
    setEditMode(true);
    setSelectedProduct(product);
  };
  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleFormSubmit = (formData) => {
    if (editMode && selectedProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id ? { ...formData, id: p.id } : p
        )
      );
    } else {
      setProducts((prev) => [...prev, { ...formData, id: Date.now() }]);
    }

    setShowForm(false);
    setEditMode(false);
    setSelectedProduct(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditMode(false);
    setSelectedProduct(null);
  };

  return (
    <div className="text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold capitalize">{title}</h2>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          <Plus />
        </button>
      </div>

      {showForm && (
        <ProductForm
          mode={editMode ? "edit" : "add"}
          initialData={selectedProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-[#1a1a1a] p-4 rounded space-y-2 shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm">{product.description}</p>
              <p className="text-green-400 font-semibold">₨{product.price}</p>
              <div className="flex justify-evenly">
              <button
                onClick={() => handleEditClick(product)}
                className="bg-yellow-500 text-black px-3 py-1 rounded mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded mt-2"
              >
                Delete
              </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
