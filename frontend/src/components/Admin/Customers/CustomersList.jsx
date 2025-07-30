import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../Api/productapi"; 
const CustomersTableSkeleton = () => (
  <div className="bg-[#1a1a1a] p-4 rounded text-white animate-pulse">
    <div className="h-6 bg-[#2a2a2a] rounded w-1/4 mb-4"></div> {/* Title skeleton */}
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#111] text-gray-300">
          <tr>
            <th className="p-3">Customer ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">City</th>
            <th className="p-3">Joined Date</th>
          </tr>
        </thead>
        <tbody>
          {Array(7).fill(0).map((_, index) => ( // Render 7 skeleton rows
            <tr key={`customer-skeleton-row-${index}`} className="border-t border-gray-700">
              <td className="p-3"><div className="h-4 bg-[#2a2a2a] rounded w-2/3"></div></td>
              <td className="p-3"><div className="h-4 bg-[#2a2a2a] rounded w-full"></div></td>
              <td className="p-3"><div className="h-4 bg-[#2a2a2a] rounded w-full"></div></td>
              <td className="p-3"><div className="h-4 bg-[#2a2a2a] rounded w-3/4"></div></td>
              <td className="p-3"><div className="h-4 bg-[#2a2a2a] rounded w-1/2"></div></td>
              <td className="p-3"><div className="h-4 bg-[#2a2a2a] rounded w-1/3"></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `${baseURL}/api/admin/customers`; 
  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setCustomers(response.data);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
      setError("Failed to load customers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
    // Optional: Set up periodic refresh for customer list
    // const intervalId = setInterval(fetchCustomers, 60000); // Refresh every 60 seconds
    // return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <CustomersTableSkeleton />; // Render the skeleton loader
  }

  if (error) {
    return (
      <div className="bg-[#1a1a1a] p-4 rounded text-red-400 flex justify-center items-center h-40">
        <p>{error}</p>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="bg-[#1a1a1a] p-4 rounded text-gray-400 flex justify-center items-center h-40">
        <p>No customers found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] p-4 rounded text-white">
      <h2 className="text-xl font-semibold mb-4">Customers</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#111] text-gray-300">
            <tr>
              <th className="p-3">Customer ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">City</th>
              <th className="p-3">Joined Date</th>
              {/* Add more columns if needed, e.g., Payment Method, Actions */}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id} className="border-t border-gray-700">
                <td className="p-3">#{customer.customer_id.substring(0, 8)}...</td> {/* Shorten UUID for display */}
                <td className="p-3">{customer.first_name} {customer.last_name}</td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.phone_number}</td>
                <td className="p-3">{customer.city}</td>
                <td className="p-3">{customer.created_at}</td>
                {/* Add more data cells */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersList;
