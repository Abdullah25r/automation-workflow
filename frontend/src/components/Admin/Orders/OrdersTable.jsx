// components/dashboard/OrdersTable.jsx
import React from "react";
import {orders} from "./orders";

const StatusBadge = ({ status }) => {
  const colorMap = {
    Pending: "bg-yellow-600",
    Shipped: "bg-blue-600",
    Delivered: "bg-green-600",
    Cancelled: "bg-red-600",
  };
  return (
    <span className={`px-2 py-1 text-xs rounded-full text-white ${colorMap[status]}`}>{status}</span>
  );
};

const OrdersTable = () => {
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
                <td className="p-3">#{order.id}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">{order.customerEmail}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="p-3">Rs. {order.total.toLocaleString()}</td>
                <td className="p-3">
                  <button className="bg-gray-700 px-2 py-1 rounded text-sm">View</button>
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
