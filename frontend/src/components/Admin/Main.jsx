import React from "react";
import StatCard from './StatCard';
import { products } from '../../AllProducts'; 
import axios from 'axios';
import { LogOut, Package, ShoppingCart, Users } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import {baseURL} from '../../Api/productapi'
function Main() { 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${baseURL}/api/admin/logout`,
        {},
        { withCredentials: true }
      );
      navigate("/admin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="relative p-8 bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      {/* Logout Button - Absolute positioning relative to this div */}
      <button
        onClick={handleLogout}
        className="absolute top-8 right-8 bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center z-10"
        aria-label="Logout"
        title="Logout"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Logout
      </button>

      {/* Main Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-2">Admin Dashboard</h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          Welcome back! Here's an overview of your store's performance.
        </p>
      </header>

      {/* Dashboard Stats */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-zinc-700 dark:text-zinc-200">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Products" value={products.length} icon={<Package className="text-indigo-500" />} />
          <StatCard title="Total Orders" value="1,245" icon={<ShoppingCart className="text-green-500" />} />
          <StatCard title="Total Customers" value="890" icon={<Users className="text-orange-500" />} />
          <StatCard title="Revenue (MTD)" value="12,500" icon={<span className="text-emerald-500 font-bold text-xl">$</span>} />
        </div>
      </section>

      {/* Recent Orders/Activity Feed */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-zinc-700 dark:text-zinc-200">Recent Activity</h2>
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 border border-zinc-100 dark:border-zinc-700">
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
            <li className="py-3 flex justify-between items-center">
              <span>New order <span className="font-semibold text-indigo-600 dark:text-indigo-400">#TP2024001</span> placed by John Doe</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">2 minutes ago</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span>Product "<span className="font-semibold">Vintage Watch</span>" updated by Admin</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">1 hour ago</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span>Customer <span className="font-semibold">Mary Smith</span> registered</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Yesterday</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span>Order <span className="font-semibold text-indigo-600 dark:text-indigo-400">#TP2023998</span> marked as shipped</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">2 days ago</span>
            </li>
          </ul>
          <div className="mt-4 text-right">
            <a href="#" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold transition-colors duration-200">
              View All Activity &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Sales Trends Chart Placeholder */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-zinc-700 dark:text-zinc-200">Sales Trends</h2>
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 border border-zinc-100 dark:border-zinc-700 h-80 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
          {/* Replace with actual chart component like Recharts, Nivo, or Chart.js */}
          <p className="text-lg">Graph/Chart Component Goes Here (e.g., Monthly Sales)</p>
        </div>
      </section>

      {/* Quick Actions (Example) */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-zinc-700 dark:text-zinc-200">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center">
            <Package className="w-5 h-5 mr-3" /> Add New Product
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 mr-3" /> View Pending Orders
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center">
            <Users className="w-5 h-5 mr-3" /> Manage Customers
          </button>
        </div>
      </section>
    </div>
  );
}

export default Main;