import React, { useContext, useState, useEffect } from "react";
import { cartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

// Skeleton loader component
const SkeletonLoader = () => (
  <div className="flex flex-col gap-8 animate-pulse min-h-screen bg-black px-4 py-12">
    <div className="h-12 w-3/6 bg-gray-800 rounded-lg mx-auto mb-10"></div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="bg-gray-900/80 rounded-3xl p-8 h-56"></div>
        <div className="bg-gray-900/80 rounded-3xl p-8 h-56"></div>
      </div>
      <div className="bg-gray-900/80 rounded-3xl p-8 h-80"></div>
    </div>
  </div>
);

// Custom select dropdown component (unchanged)
const CustomSelect = ({ value, onChange, options, name }) => (
  <div className="relative w-full">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full appearance-none bg-[#23272b] text-white p-3 pr-10 rounded-xl border border-[#313131] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow transition-all"
    >
      {options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          className="bg-[#23272b] text-white"
        >
          {opt.label}
        </option>
      ))}
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  </div>
);

const Checkout = () => {
  const { items } = useContext(cartContext);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
    number: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    number: ""
  });

  // Email validation
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Pakistani phone number validation
  const validatePhoneNumber = (number) => {
    const re = /^03\d{9}$/;
    return re.test(number);
  };

  // Check if all required fields are filled and valid
  const isFormComplete = () => {
    return (
      validateEmail(form.email) &&
      validatePhoneNumber(form.number) &&
      form.firstName &&
      form.lastName &&
      form.address &&
      form.city &&
      form.postalCode
    );
  };

  useEffect(() => {
    const t1 = setTimeout(() => setLoading(false), 600);
    const t2 = setTimeout(() => setAnimate(true), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const shippingFee = 5;
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );
  const finalTotal = totalPrice + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Validate email in real-time
    if (name === 'email') {
      setErrors({
        ...errors,
        email: value && !validateEmail(value) ? 'Please enter a valid email address' : ''
      });
    }
    
    // Validate phone number in real-time
    if (name === 'number') {
      setErrors({
        ...errors,
        number: value && !validatePhoneNumber(value) ? 'Must be in 03XXXXXXXXX format (11 digits)' : ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation before submission
    const emailValid = validateEmail(form.email);
    const phoneValid = validatePhoneNumber(form.number);
    
    if (!emailValid || !phoneValid) {
      setErrors({
        email: !emailValid ? 'Please enter a valid email address' : '',
        number: !phoneValid ? 'Must be in 03XXXXXXXXX format (11 digits)' : ''
      });
      return;
    }

    if (items.length === 0 || !isFormComplete()) return;
    
    alert("Order Placed Successfully!");
  };

  if (loading) return <SkeletonLoader />;

  if (items.length === 0) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center">
        <div className="text-white text-3xl font-bold mb-5">
          Your cart is empty!
        </div>
        <Link
          to="/"
          className="bg-gradient-to-r from-[#212529] to-[#434343] border border-[#3a3a3a] text-white font-semibold py-3 px-8 rounded-xl hover:from-[#333] hover:to-[#555] shadow-lg transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <header className="backdrop-blur-md bg-black/70 border-b border-[#232323] py-4 shadow-md">
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
        <h1
          className={`text-4xl font-bold text-center text-white mb-10 tracking-wide transition-all duration-300 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Shipping Form */}
          <form
            onSubmit={handleSubmit}
            className={`lg:col-span-2 bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-[#262626] shadow-2xl space-y-10 transition-all duration-500 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#242424] pb-2">
                Contact Information
              </h2>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#23272b] text-white p-3 rounded-xl focus:ring-2 focus:ring-white border border-[#313131] focus:border-white transition-all shadow-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#242424] pb-2">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#23272b] text-white p-3 rounded-xl border border-[#313131] focus:ring-2 focus:ring-white transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#23272b] text-white p-3 rounded-xl border border-[#313131] focus:ring-2 focus:ring-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm text-gray-400 mb-2 block">
                  Address
                </label>
                <input
                  name="address"
                  type="text"
                  placeholder="123 Main Street"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#23272b] text-white p-3 rounded-xl border border-[#313131] focus:ring-2 focus:ring-white transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    City
                  </label>
                  <input
                    name="city"
                    type="text"
                    placeholder="Karachi"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#23272b] text-white p-3 rounded-xl border border-[#313131] focus:ring-2 focus:ring-white transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Postal Code
                  </label>
                  <input
                    name="postalCode"
                    type="text"
                    placeholder="12345"
                    value={form.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#23272b] text-white p-3 rounded-xl border border-[#313131] focus:ring-2 focus:ring-white transition-all shadow-sm"
                  />
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#242424] pb-2">
                Payment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Phone Number
                  </label>
                  <input
                    name="number"
                    type="tel"
                    placeholder="03XXXXXXXXX"
                    value={form.number}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#23272b] text-white p-3 rounded-xl border border-[#313131] focus:ring-2 focus:ring-white transition-all shadow-sm"
                  />
                  {errors.number && (
                    <p className="text-red-500 text-xs mt-1">{errors.number}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Payment Method
                  </label>
                  <CustomSelect
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                    options={[
                      { value: "cod", label: "Cash on Delivery" },
                      { value: "online", label: "Online Card Payment" },
                    ]}
                  />
                </div>
              </div>
            </section>
          </form>

          {/* Right Column - Order Summary */}
          <div
            className={`flex flex-col justify-between bg-white/10 backdrop-blur-lg p-7 rounded-3xl border border-[#262626] shadow-2xl h-fit sticky top-8 transition-all duration-400 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div>
              <h2 className="text-xl font-semibold text-white mb-5 border-b border-[#232323] pb-3">
                Order Summary
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border border-[#232323] bg-[#23272b] hover:bg-[#2e3340] transition-colors duration-150 rounded-2xl px-4 py-3 shadow-md group"
                    style={{
                      animation: `fadeIn 0.18s ease ${
                        index * 0.04 + 0.01
                      }s both`,
                    }}
                  >
                    <img
                      src={item.path}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-xl border border-[#30343c] bg-[#262a31]"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-base truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400">Qty: {item.count}</p>
                    </div>
                    <p className="font-semibold text-base text-[#d9d9d9]">
                      ₨{(item.price * item.count).toFixed(2)}
                    </p>
                  </div>
                ))}
                <style>{`
                  @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px);}
                    to { opacity: 1; transform: none;}
                  }
                `}</style>
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
                <div className="border-t border-[#232323] pt-3 mt-2 text-white font-bold text-base">
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
                disabled={items.length === 0 || !isFormComplete()}
                className={`w-full font-bold py-3 rounded-xl shadow-xl transition-all duration-300 transform active:translate-y-0 relative
                  ${
                    items.length === 0 || !isFormComplete()
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#fff] to-[#ced4da] text-black hover:-translate-y-0.5 hover:shadow-2xl"
                  }
                  ${
                    animate
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }
                `}
              >
                {!isFormComplete() && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    !
                  </span>
                )}
                Confirm Order
              </button>
              <Link
                to="/products"
                className="block text-center bg-[#23272b] border border-[#313131] text-white font-semibold py-3 rounded-xl hover:bg-[#333] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
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