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

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );
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
    <div>
      <div className="flex  justify-center pt-4">
        <Link to="/" className="flex items-center">
            <img src="./img/logo.gif" alt="TimePods Logo" className="h-6 sm:h-7 laptop:h-8" />
            <span className="font-kanit text-lg sm:text-xl laptop:text-2xl ml-2 text-[#ced4da] hover:text-[#ffffff] transition tracking-wider">
              TimePods
            </span>
          </Link>
      
      </div>
      <div className="min-h-screen bg-black text-white font-poppins p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-[#1a1a1a] text-white p-3 rounded"
          />
          <div className="flex gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-1/2 bg-[#1a1a1a] text-white p-3 rounded"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-1/2 bg-[#1a1a1a] text-white p-3 rounded"
            />
          </div>
          <input
            name="address"
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full bg-[#1a1a1a] text-white p-3 rounded"
          />
          <div className="flex gap-4">
            <input
              name="city"
              type="text"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              className="w-1/2 bg-[#1a1a1a] text-white p-3 rounded"
            />
            <input
              name="postalCode"
              type="text"
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={handleChange}
              required
              className="w-1/2 bg-[#1a1a1a] text-white p-3 rounded"
            />
            
          </div>
          <input
            name="phone"
            type="text"
            placeholder="Phone"
            value={form.number}
            onChange={handleChange}
            required
            className="w-full bg-[#1a1a1a] text-white p-3 rounded"
          />
          <div className="space-y-2">
            <label className="block text-lg">Payment Method</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] text-white p-3 rounded"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Card Payment</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold text-lg py-3 rounded hover:bg-[#1a1a1a] hover:text-white border hover:border-white transition"
          >
            Complete Order
          </button>
        </form>

        {/* Right Side - Cart Products */}
        <div className="sticky top-6 h-fit">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-[#1a1a1a] pr-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-gray-700 pb-2"
              >
                <img
                  src={item.path}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-400">Qty: {item.count}</p>
                </div>
                <p className="text-lg font-semibold">
                  ₨{(item.price * item.count).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-lg">
              <p>Subtotal:</p>
              <p>₨{totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Shipping:</p>
              <p>₨{shippingFee.toFixed(2)}</p>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between text-2xl font-bold">
              <p>Total:</p>
              <p>₨{finalTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
