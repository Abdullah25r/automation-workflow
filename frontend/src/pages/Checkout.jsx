import React, { useContext, useState } from "react";
import { cartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { items } = useContext(cartContext);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
    number: ""
  });

  const shippingFee = 200;
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.count, 0);
  const finalTotal = totalPrice + shippingFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Placed:", form, items);
    alert("Order Placed Successfully!");
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <header className="border-b border-[#2a2a2a] py-4">
        <div className="container mx-auto px-4 flex justify-center">
          <Link to="/" className="flex items-center group">
            <img 
              src="./img/logo.gif" 
              alt="TimePods Logo" 
              className="h-7 transition-transform group-hover:scale-105" 
            />
            <span className="font-kanit text-xl ml-3 text-[#ced4da] group-hover:text-white transition-colors tracking-wider">
              TimePods
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-white mb-10 tracking-wide">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Shipping Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-[#1a1a1a] p-8 rounded-2xl border border-[#2a2a2a] shadow-xl space-y-10">
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#2a2a2a] pb-2">Contact Information</h2>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg focus:ring-2 focus:ring-white border border-transparent focus:border-white transition-all"
                />
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#2a2a2a] pb-2">Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-transparent focus:ring-2 focus:ring-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-transparent focus:ring-2 focus:ring-white transition-all"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm text-gray-400 mb-2 block">Address</label>
                <input
                  name="address"
                  type="text"
                  placeholder="123 Main Street"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-transparent focus:ring-2 focus:ring-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">City</label>
                  <input
                    name="city"
                    type="text"
                    placeholder="Karachi"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-transparent focus:ring-2 focus:ring-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Postal Code</label>
                  <input
                    name="postalCode"
                    type="text"
                    placeholder="12345"
                    value={form.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-transparent focus:ring-2 focus:ring-white transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#2a2a2a] pb-2">Payment</h2>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Phone Number</label>
                <input
                  name="number"
                  type="tel"
                  placeholder="03XX-XXXXXXX"
                  value={form.number}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-transparent focus:ring-2 focus:ring-white transition-all"
                />
              </div>
              <div className="mt-4">
                <label className="text-sm text-gray-400 mb-2 block">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg focus:ring-2 focus:ring-white border border-transparent focus:border-white transition-all"
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="online">Online Card Payment</option>
                </select>
              </div>
            </section>
          </form>

          {/* Right Column - Order Summary */}
          <div className="flex flex-col justify-between bg-[#1a1a1a] p-6 rounded-2xl border border-[#2a2a2a] shadow-xl h-fit sticky top-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-5 border-b border-[#2a2a2a] pb-3">
                Order Summary
              </h2>
              <div className="space-y-5 max-h-96 overflow-y-auto pr-1">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 border-b border-[#2a2a2a] pb-4">
                    <img
                      src={item.path}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-400">Qty: {item.count}</p>
                    </div>
                    <p className="font-semibold text-sm text-white">
                      ₨{(item.price * item.count).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₨{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₨{shippingFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-[#2a2a2a] pt-3 mt-2 text-white font-bold text-base">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>₨{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-opacity-90 transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-xl"
              >
                Confirm Order
              </button>
              <Link
                to="/cart"
                className="block text-center bg-[#2a2a2a] border border-[#3a3a3a] text-white font-semibold py-3 rounded-lg hover:bg-[#333] transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
