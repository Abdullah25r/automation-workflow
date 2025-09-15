import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, ShoppingBag, MapPin, CreditCard } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderData } = location.state || {}; // we’ll pass orderData from navigate()

  if (!orderData) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex flex-col items-center justify-center text-white px-6">
        <p className="text-xl mb-6">No order details found ❌</p>
        <Link
          to="/"
          className="bg-gradient-to-r from-[#fff] to-[#ced4da] text-black px-6 py-3 rounded-xl font-semibold shadow hover:-translate-y-0.5 transition"
        >
          Go Home
        </Link>
      </div>
    );
  }

  const { customer, order, order_items } = orderData;

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white">
      {/* Header */}
      <header className="bg-[#2a2a2a] py-4 border-b border-[#3a3a3a]">
        <div className="container mx-auto px-4 flex justify-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="./img/logo.gif"
              alt="TimePods Logo"
              className="h-7"
            />
            <span className="text-lg font-semibold tracking-wide text-gray-200">
              TimePods
            </span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-[#2a2a2a] rounded-3xl p-10 text-center shadow-lg">
          <CheckCircle className="mx-auto text-green-400 mb-6" size={72} />
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-gray-400 text-lg mb-10">
            Your order has been placed successfully. We’ll send you an update
            when it’s on the way 🚚
          </p>

          {/* Order Summary */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 text-left space-y-6 border border-[#3a3a3a]">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShoppingBag size={22} className="text-blue-400" /> Order Details
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p>
                  <span className="text-gray-400">Name: </span>
                  {customer.first_name} {customer.last_name}
                </p>
                <p>
                  <span className="text-gray-400">Email: </span>
                  {customer.email}
                </p>
                <p>
                  <span className="text-gray-400">Phone: </span>
                  {customer.phone_number}
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <MapPin size={18} className="text-red-400" />
                  {order.shipping_address}
                </p>
                <p className="flex items-center gap-2">
                  <CreditCard size={18} className="text-yellow-400" />
                  {order.payment_method === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </p>
                <p className="font-semibold text-lg">
                  Total: ₨{order.total_amount}
                </p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mt-8 bg-[#1a1a1a] rounded-2xl p-6 border border-[#3a3a3a]">
            <h2 className="text-xl font-semibold mb-4">Items</h2>
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {order_items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-[#2a2a2a] rounded-xl p-4 border border-[#3a3a3a]"
                >
                  <img
                    src={item.image || "./img/product-placeholder.png"}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₨{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/products"
              className="bg-gradient-to-r from-[#fff] to-[#ced4da] text-black px-6 py-3 rounded-xl font-semibold shadow hover:-translate-y-0.5 transition"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="bg-[#2a2a2a] px-6 py-3 rounded-xl font-semibold border border-[#3a3a3a] hover:bg-[#3a3a3a] transition"
            >
              Go Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
