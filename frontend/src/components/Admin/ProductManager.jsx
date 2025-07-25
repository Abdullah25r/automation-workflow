import React, { useState } from "react";

const ProductManager = () => {
  const [products, setProducts] = useState([]); // store product list
  const [showAddForm, setShowAddForm] = useState(false); // toggle form visibility
  const [newProduct, setNewProduct] = useState({
    id: "",
    category: "",
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    feature: "",
    color: "",
    image: "",
  });

  // ✅ onAdd function — opens form
  function onAdd() {
    setShowAddForm(true);
  }

  // ✅ Handle input change
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // ✅ Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, newProduct]);
    setNewProduct({
      id: "",
      category: "",
      name: "",
      price: "",
      discountPrice: "",
      description: "",
      feature: "",
      color: "",
      image: "",
    });
    setShowAddForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Product Manager</h2>
        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </div>

      {/* ✅ Render Form if showAddForm is true */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-800 p-4 rounded-md">
          <input type="text" name="id" placeholder="ID" value={newProduct.id} onChange={handleChange} className="p-2 rounded bg-zinc-900 text-white" required />
          <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleChange} className="p-2 rounded bg-zinc-900 text-white" required />
          <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleChange} className="p-2 rounded bg-zinc-900 text-white" required />
          <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} className="p-2 rounded bg-zinc-900 text-white" required />
          <input type="number" name="discountPrice" placeholder="Discount Price" value={newProduct.discountPrice} onChange={handleChange} className="p-2 rounded bg-zinc-900 text-white" />
          <input type="text" name="color" placeholder="Color" value={newProduct.color} onChange={handleChange} className="p-2 rounded bg-zinc-900 text-white" />
          <input type="text" name="feature" placeholder="Feature" value={newProduct.feature} onChange={handleChange} className="p-2 rounded bg-zinc-900 text-white" />
          <input type="text" name="image" placeholder="Image URL" value={newProduct.image} onChange={handleChange} className="p-2 rounded bg-zinc-900 text-white" />
          <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} className="p-2 rounded bg-zinc-900 text-white md:col-span-2" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition md:col-span-2">Add Product</button>
        </form>
      )}

      {/* 🔍 Preview Products */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-zinc-900 p-4 rounded">
            <img src={product.image} alt={product.name} className="w-full h-40 object-contain bg-zinc-800 rounded" />
            <h3 className="mt-2 font-bold">{product.name}</h3>
            <p className="text-sm text-zinc-400">{product.description}</p>
            <p className="text-sm text-green-400">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;
