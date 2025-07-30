import React from 'react';

const StatusBadge = ({ status }) => {
  // Normalize the status to lowercase for consistent mapping,
  // as database statuses are typically lowercase (e.g., 'pending', 'shipped').
  const normalizedStatus = status ? status.toLowerCase() : 'unknown';

  // Define color mapping for different order statuses.
  // Ensure these keys match the exact status strings you expect from the backend
  // for the 'status' column in your 'orders' table.
  const colorMap = {
    pending: "bg-yellow-600",  // Initial state of an order
    shipped: "bg-blue-600",    // After dispatch
    delivered: "bg-green-600", // Once the order has reached the customer
    cancelled: "bg-red-600",   // If the order is cancelled
    processing: "bg-purple-600", // Optional: if you add a 'processing' state
    // Add a default color for any status not explicitly mapped,
    // or if 'status' is null/undefined.
    default: "bg-gray-500",
  };

  // Get the appropriate background color from the map,
  // falling back to 'default' if the status is not found.
  const badgeColor = colorMap[normalizedStatus] || colorMap.default;

  return (
    // Apply the badge color and ensure text is capitalized for display.
    // The 'capitalize' class will make 'pending' display as 'Pending', 'shipped' as 'Shipped', etc.
    <span className={`px-2 py-1 text-xs rounded-full text-white ${badgeColor} capitalize`}>
      {status} {/* Display the original status string */}
    </span>
  );
};

export default StatusBadge;
