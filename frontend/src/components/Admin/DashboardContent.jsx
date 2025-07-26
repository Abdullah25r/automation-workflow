import React from "react";

import { products } from "../../AllProducts";
import ProductList from "./ProductList";
import Main from "./Main";
import OrdersTable from "./Orders/OrdersTable";

const DashboardContent = ({ selected }) => {
  const lowerSelected = selected.toLowerCase();
  const filtered = products.filter(
    (p) => p.category.toLowerCase() === lowerSelected
  );
  const renderContent = () => {
    switch (lowerSelected) {
      case "dashboard":
        return <Main />;

      case "products":
        return <ProductList data={products} title="All Products" />;

      case "pods":
      case "headphone":
      case "watch":
      case "extras": {
        return <ProductList data={filtered} title={selected} />;
      }
      case "orders":
        return <OrdersTable/>;
      case "customers":
        return;
      case 'analytics':
        return;
      case 'setting':
        return;  
      default:
        return (
          <p className="text-lg">Please select a section from the sidebar.</p>
        );
    }
  };

  return <div>{renderContent()}</div>;
};

export default DashboardContent;
