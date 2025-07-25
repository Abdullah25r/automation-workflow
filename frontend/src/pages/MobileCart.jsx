import React, { useContext} from "react";
import { HiOutlineX } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import Cartproduct from "../components/Cartproduct";
import { cartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

function MobileCart() {
  const cartProduct = useContext(cartContext);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-[#1a1a1a] text-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <FiShoppingCart className="text-2xl" />
          <p className="text-xl font-semibold">Cart</p>
        </div>
        <button onClick={() => navigate(-1)}>
          <HiOutlineX className="text-2xl" />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-[#1a1a1a]">
        {cartProduct.items.map((item, index) => (
          <Cartproduct
            key={index}
            name={item.name}
            path={item.path}
            price={item.price}
            id={item.id}
            count={item.count}
          />
        ))}
      </div>

      {/* Checkout */}
      <div className="p-3 bg-[#2a2a2a] flex justify-between items-center">
        <span className="text-base font-medium">
          Total: $
          {cartProduct.items
            .reduce((acc, item) => acc + item.price * item.count, 0)
            .toFixed(2)}
        </span>
        <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#2a2a2a] hover:text-white border border-transparent hover:border-white transition">
          Checkout
        </button>
      </div>
    </div>
  );
}
export default MobileCart;