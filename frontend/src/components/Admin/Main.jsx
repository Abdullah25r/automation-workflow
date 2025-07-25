import React from "react";
import StatCard from './StatCard';
import { products } from '../../AllProducts';
function Main() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to TimePods Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Products" value={products.length} />
        <StatCard title="Total Orders" value="0" />
        <StatCard title="Revenue" value="$0" />
      </div>
    </div>
  );
}

export default Main;
