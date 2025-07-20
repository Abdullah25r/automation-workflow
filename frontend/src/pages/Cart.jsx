// Cart.js
import React, { useContext } from "react";
import { HiOutlineX } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi"; // Cart Icon
import Cartproduct from "../components/Cartproduct"; // Importing Cartproduct component
import { cartContext } from "../Context/CartContext"; // Importing cart context
import { AnimatePresence } from "framer-motion";

function Cart({ isOpen, onClose }) {
  const cartProduct = useContext(cartContext);
  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-2/5 bg-[#1a1a1a] shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto
    `}
    >
      <div className="flex justify-between p-4 bg-[#2a2a2a] rounded-lg m-3">
        <div className="text-white flex gap-5">
          {" "}
          <FiShoppingCart className="text-3xl mt-1" />{" "}
          <p className="text-3xl font-poppins font-semibold">Cart</p>
        </div>
        <button onClick={onClose} className="text-white">
          <HiOutlineX className="text-2xl" />
        </button>
      </div>
      <div className="p-4">
        <AnimatePresence>
          {cartProduct.items.map((item, index) => {
            return (
              <Cartproduct
                key={index}
                name={item.name}
                path={item.path}
                price={item.price}
                id={item.id}
                count={item.count}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Cart;
