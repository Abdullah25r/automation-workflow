import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const ProductList = ({ data, title }) => {
  const [updatedItem, setUpdatedItem] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    category: '',
    name: '',
    price: '',
    discountPrice: '',
    description: '',
    feature: '',
    color: '',
    image: '',
  });

  function onAdd() {
    setShowForm(!showForm);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageURL }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('New Product:', formData);

    // Reset form and hide
    setFormData({
      id: '',
      category: '',
      name: '',
      price: '',
      discountPrice: '',
      description: '',
      feature: '',
      color: '',
      image: '',
    });
    setShowForm(false);
  }

  function onEdit(product) {}

  function onDelete(id) {
     if (window.confirm("Are you sure you want to delete this product?"))
     setUpdatedItem(updatedItem.filter((p)=> p.id !== id));
  }

  return (
    <>
      {/* Header with Title and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold capitalize">{title}</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1 text-sm px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Close' : 'Add'}
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-800 p-4 rounded-md mb-6 grid sm:grid-cols-2 gap-4 text-sm"
        >
          {[
            { label: 'ID', name: 'id' },
            { label: 'Category', name: 'category' },
            { label: 'Name', name: 'name' },
            { label: 'Price', name: 'price' },
            { label: 'Discount Price', name: 'discountPrice' },
            { label: 'Description', name: 'description' },
            { label: 'Feature', name: 'feature' },
            { label: 'Color', name: 'color' },
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col">
              <label className="mb-1 text-zinc-300">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="px-3 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          ))}

          {/* Image Input */}
          <div className="flex flex-col">
            <label className="mb-1 text-zinc-300">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="px-3 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div className="sm:col-span-2 text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Save Product
            </button>
          </div>
        </form>
      )}

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {data.length > 0 ? (
          data.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 p-4 rounded-lg shadow-md flex flex-col justify-between h-full"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain rounded bg-zinc-800 p-2"
              />
              <div className="mt-3 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-zinc-400 line-clamp-2">{product.description}</p>
                <p className="mt-1 font-bold">${product.price}</p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => onEdit(product)}
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </>
  );
};

export default ProductList;
