// DashboardContent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import Main from "./Main";
import OrdersTable from "./Orders/OrdersTable";
import CustomersList from "./Customers/CustomersList";

const DashboardContent = ({ selected }) => {
  const lowerSelected = selected.toLowerCase();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/products/");
      const data = res.data.map((p) => ({
        id: p.product_id,
        name: p.name,
        description: p.description,
        price: parseFloat(p.price),
        image: p.image,
        category: p.category.toLowerCase(),
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
        return <CustomersList/>;
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
