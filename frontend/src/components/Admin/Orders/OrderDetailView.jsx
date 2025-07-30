import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import StatusBadge from "./StatusBadge";
import { Printer, PackageCheck, ArrowLeft } from "lucide-react";
import {baseURL} from '../../../Api/productapi'
const OrderDetailView = ({ orderId, onClose, onOrderDispatched }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dispatching, setDispatching] = useState(false);

  // Ref for the entire component's content that should be printable
  // We'll apply the print-mode class to this wrapper for better isolation
  const componentRef = useRef(null);


  const fetchOrderDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseURL}/api/admin/orders/${orderId}`);
      setOrder(response.data);
    } catch (err) {
      console.error(`Error fetching order ${orderId} details:`, err);
      setError("Failed to load order details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDispatchOrder = async () => {
    setDispatching(true);
    try {
      const response = await axios.put(`${baseURL}/api/admin/orders/${orderId}/dispatch`);
      setOrder(prevOrder => ({ ...prevOrder, status: response.data.order.status }));
      if (onOrderDispatched) {
        onOrderDispatched();
      }
      alert(`Order ${orderId.substring(0, 8)}... successfully dispatched!`);
    } catch (err) {
      console.error(`Error dispatching order ${orderId}:`, err);
      alert(`Failed to dispatch order ${orderId.substring(0, 8)}...: ${err.response?.data?.message || err.message}`);
    } finally {
      setDispatching(false);
    }
  };

  const handlePrintReceipt = () => {
    // Add a class to the specific component container that holds the printable content
    // This allows us to target it precisely with CSS
    if (componentRef.current) {
      componentRef.current.classList.add('print-mode-active');
      window.print();
      // Remove the class after printing (or a short delay)
      setTimeout(() => {
        if (componentRef.current) {
          componentRef.current.classList.remove('print-mode-active');
        }
      }, 500); // Small delay to ensure print dialog appears before class is removed
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] p-6 rounded-lg text-white min-h-[500px] flex justify-center items-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1a1a1a] p-6 rounded-lg text-red-400 min-h-[500px] flex justify-center items-center">
        <p>{error}</p>
        <button onClick={onClose} className="ml-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors">
          Back to Orders
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-[#1a1a1a] p-6 rounded-lg text-gray-400 min-h-[500px] flex justify-center items-center">
        <p>No order data available.</p>
        <button onClick={onClose} className="ml-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors">
          Back to Orders
        </button>
      </div>
    );
  }

  const canDispatch = order.status !== 'shipped' && order.status !== 'delivered' && order.status !== 'cancelled';

  return (
    // Apply the ref and the base class to the outermost container of the component
    <div ref={componentRef} className="bg-[#1a1a1a] p-6 rounded-lg text-white shadow-lg order-detail-container">
      {/* Back Button and Title */}
      <div className="mb-6 flex justify-between items-center print-hide"> {/* Add print-hide class */}
        <button
          onClick={onClose}
          className="flex items-center bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Orders
        </button>
        <h2 className="text-2xl font-semibold">Order Details <span className="text-gray-400">#{order.order_id.substring(0, 8)}...</span></h2>
      </div>

      {/* Printable Receipt Section */}
      {/* This div will be the main content for printing */}
      <div className="bg-zinc-800 p-6 rounded-lg mb-6 receipt-content">
        <h3 className="text-xl font-bold mb-4 text-center text-zinc-100">Order Receipt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
          {/* Order Info */}
          <div>
            <p className="text-sm text-gray-400">Order ID:</p>
            <p className="font-medium">{order.order_id}</p>
            <p className="text-sm text-gray-400 mt-2">Order Date:</p>
            <p className="font-medium">{order.order_date}</p>
            <p className="text-sm text-gray-400 mt-2">Status:</p>
            <StatusBadge status={order.status} />
          </div>
          {/* Customer Info */}
          <div>
            <p className="text-sm text-gray-400">Customer Name:</p>
            <p className="font-medium">{order.customer.first_name} {order.customer.last_name}</p>
            <p className="text-sm text-gray-400 mt-2">Email:</p>
            <p className="font-medium">{order.customer.email}</p>
            <p className="text-sm text-gray-400 mt-2">Phone:</p>
            <p className="font-medium">{order.customer.phone_number}</p>
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className="mb-6">
          <p className="text-sm text-gray-400">Shipping Address:</p>
          <p className="font-medium">{order.shipping_address}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-4">
            <div>
              <p className="text-sm text-gray-400">Payment Method:</p>
              <p className="font-medium">{order.payment_method}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Payment Status:</p>
              <p className="font-medium">{order.payment_status}</p>
            </div>
          </div>
        </div>

        {/* Order Items Table */}
        <h4 className="text-lg font-semibold mb-3 text-zinc-100">Items:</h4>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-zinc-700">
              <tr>
                <th className="p-3 rounded-tl-lg">Product</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Price</th>
                <th className="p-3 rounded-tr-lg text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.order_items.map((item) => (
                <tr key={item.order_item_id} className="border-t border-zinc-700">
                  <td className="p-3 flex items-center">
                    {item.product_image && (
                      <img src={item.product_image} alt={item.product_name} className="w-10 h-10 object-cover rounded-md mr-3" />
                    )}
                    {item.product_name}
                  </td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">Rs. {item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="p-3 text-right">Rs. {(item.quantity * item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex flex-col items-end text-right text-base">
          <div className="flex justify-between w-full max-w-xs py-1 border-t border-zinc-700">
            <span className="text-gray-300">Subtotal:</span>
            <span className="font-semibold">Rs. {order.order_items.reduce((acc, item) => acc + item.quantity * item.price, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between w-full max-w-xs py-1">
            <span className="text-gray-300">Shipping:</span>
            <span className="font-semibold">Rs. 5.00</span>
          </div>
          <div className="flex justify-between w-full max-w-xs py-2 border-t border-zinc-600 text-lg font-bold text-zinc-100">
            <span>Total:</span>
            <span>Rs. {order.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6 print-hide"> {/* Add print-hide class */}
        <button
          onClick={handlePrintReceipt}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold transition-colors shadow-md"
        >
          <Printer className="w-5 h-5 mr-2" /> Print Receipt
        </button>
        {canDispatch && (
          <button
            onClick={handleDispatchOrder}
            disabled={dispatching}
            className={`flex items-center ${dispatching ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white px-5 py-2 rounded-md font-semibold transition-colors shadow-md`}
          >
            {dispatching ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Dispatching...
              </>
            ) : (
              <>
                <PackageCheck className="w-5 h-5 mr-2" /> Dispatch Order
              </>
            )}
          </button>
        )}
      </div>

      {/* CSS for printing - IMPORTANT: This needs to be in a global CSS file or <style> tag in your main HTML/App.js for best results */}
      <style>{`
        /* Hide elements that should not be printed */
        @media print {
          /* Hide everything in the body by default */
          body * {
            visibility: hidden;
          }

          /* Make the specific container visible */
          .order-detail-container.print-mode-active {
            visibility: visible;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto; /* Allow content to dictate height */
            padding: 20px; /* Add some padding for the printout */
            background-color: white !important; /* Force white background */
            color: black !important; /* Force black text */
            box-shadow: none !important;
            border: none !important;
          }

          /* Make all children of the printable container visible */
          .order-detail-container.print-mode-active * {
            visibility: visible;
            color: black !important;
            background-color: white !important;
          }

          /* Hide specific elements within the printable area that shouldn't print */
          .order-detail-container.print-mode-active .print-hide {
            display: none !important;
          }

          /* Adjust styling for print */
          .order-detail-container.print-mode-active h3,
          .order-detail-container.print-mode-active h4,
          .order-detail-container.print-mode-active p,
          .order-detail-container.print-mode-active span,
          .order-detail-container.print-mode-active table,
          .order-detail-container.print-mode-active th,
          .order-detail-container.print-mode-active td {
            color: #000 !important;
            background-color: #fff !important;
          }

          .order-detail-container.print-mode-active table {
            width: 100%;
            border-collapse: collapse;
          }
          .order-detail-container.print-mode-active th,
          .order-detail-container.print-mode-active td {
            border: 1px solid #ccc;
            padding: 8px;
          }
          .order-detail-container.print-mode-active thead {
            background-color: #eee !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderDetailView;
