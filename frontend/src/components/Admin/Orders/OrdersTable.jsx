import React, { useEffect, useState } from "react";
import axios from "axios";
import StatusBadge from "./StatusBadge"; 
import OrderDetailView from "./OrderDetailView"; 
import {baseURL} from '../../../Api/productapi'
const OrdersTableSkeleton = () => (
  <div className="bg-[#1a1a1a] p-4 rounded text-white animate-pulse">
    <div className="h-6 bg-[#2a2a2a] rounded w-1/4 mb-4"></div> {/* Title skeleton */}
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#111] text-gray-300">
          <tr>
            <th className="p-3">Order ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Email</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Total</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array(5).fill(0).map((_, index) => ( // Render 5 skeleton rows
            <tr key={`skeleton-row-${index}`} className="border-t border-gray-700">
              <td className="p-3">
                <div className="h-4 bg-[#2a2a2a] rounded w-2/3"></div>
              </td>
              <td className="p-3">
                <div className="h-4 bg-[#2a2a2a] rounded w-full"></div>
              </td>
              <td className="p-3">
                <div className="h-4 bg-[#2a2a2a] rounded w-full"></div>
              </td>
              <td className="p-3">
                <div className="h-4 bg-[#2a2a2a] rounded w-3/4"></div>
              </td>
              <td className="p-3">
                <div className="h-4 bg-[#2a2a2a] rounded w-1/2"></div>
              </td>
              <td className="p-3">
                <div className="h-4 bg-[#2a2a2a] rounded w-1/3"></div>
              </td>
              <td className="p-3">
                <div className="h-4 bg-[#2a2a2a] rounded w-1/4"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // New state for selected order ID

  const API_URL = `${baseURL}/api/admin/orders`; // Centralize API URL

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setOrders(response.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); // Initial fetch

    // Set up periodic refresh every 30 seconds
    const intervalId = setInterval(fetchOrders, 30000); // Refresh every 30 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  // Function to handle viewing a specific order
  const handleViewOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  // Function to close the order detail view and return to the table
  const handleCloseOrderDetail = () => {
    setSelectedOrderId(null);
  };

  // If an order is selected, render the OrderDetailView
  if (selectedOrderId) {
    return (
      <OrderDetailView
        orderId={selectedOrderId}
        onClose={handleCloseOrderDetail}
        onOrderDispatched={fetchOrders} // Pass fetchOrders to re-fetch when an order is dispatched
      />
    );
  }

  // Render loading, error, or empty states for the table
  if (loading) {
    return <OrdersTableSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-[#1a1a1a] p-4 rounded text-red-400 flex justify-center items-center h-40">
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-[#1a1a1a] p-4 rounded text-gray-400 flex justify-center items-center h-40">
        <p>No orders found.</p>
      </div>
    );
  }

  // Render the actual orders table
  return (
    <div className="bg-[#1a1a1a] p-4 rounded text-white">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#111] text-gray-300">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Email</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Total</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-700">
                <td className="p-3">#{order.id.substring(0, 8)}...</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">{order.customerEmail}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="p-3">Rs. {order.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleViewOrder(order.id)} // Call handleViewOrder on click
                    className="bg-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
