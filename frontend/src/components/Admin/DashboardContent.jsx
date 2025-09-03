// DashboardContent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import Main from "./Main";
import OrdersTable from "./Orders/OrdersTable";
import CustomersList from "./Customers/CustomersList";
import { baseURL } from "../../Api/productapi";

const DashboardContent = ({ selected }) => {
  const lowerSelected = selected.toLowerCase();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/products/`);
      
      // --- CORRECTED MAPPING ---
      // Map all fields from the backend response, keeping the original
      // product_id key and including the new fields.
      const data = res.data.map((p) => ({
        product_id: p.product_id, // Keep the original key for ProductForm
        name: p.name,
        description: p.description,
        price: parseFloat(p.price),
        image: p.image,
        category: p.category.toLowerCase(),
        color: p.color, // Include the new field
        features: p.features, // Include the new field
        // Parse the discount price
        discount_price: parseFloat(p.discount_price), // Include the new field
      }));
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => p.category === lowerSelected);

  const renderContent = () => {
    if (loading) return <p className="p-4">Loading products...</p>;

    switch (lowerSelected) {
      case "dashboard":
        return <Main />;
      case "products":
        return (
          <ProductList
            data={products}
            title="All Products"
            refetchProducts={fetchProducts}
          />
        );
      case "pods":
      case "headphone":
      case "watch":
      case "extras":
        return (
          <ProductList
            data={filtered}
            title={selected}
            refetchProducts={fetchProducts}
          />
        );
      case "orders":
        return <OrdersTable />;
      case "customers":
        return <CustomersList />;
      case "analytics":
      case "setting":
        return <p className="p-4">Section under construction.</p>;
      default:
        return <p className="p-4">Please select a section from the sidebar.</p>;
    }
  };

  return <div>{renderContent()}</div>;
};

export default DashboardContent;
