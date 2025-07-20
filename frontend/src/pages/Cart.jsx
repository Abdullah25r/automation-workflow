import React, { useContext, useRef } from "react";
import { HiOutlineX } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import Cartproduct from "../components/Cartproduct";
import { cartContext } from "../Context/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

function Cart({ isOpen, onClose }) {
  const cartProduct = useContext(cartContext);
  const cartRef = useRef();

  const handleBackdropClick = (e) => {
    // Close if clicked outside cart
    if (cartRef.current && !cartRef.current.contains(e.target)) {
      onClose();
    }
  };
  // Disable background scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable background scroll
    } else {
      document.body.style.overflow = "auto"; // Restore scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Clean up
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={cartRef}
            className={`
              fixed top-0 right-0 h-full w-full sm:w-3/5 md:w-2/5
            bg-[#1a1a1a] shadow-lg z-50 transform transition-transform duration-300 ease-in-out
            flex flex-col
            `}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.1 }}
          >
            <div className="flex justify-between p-4 bg-[#2a2a2a] rounded-lg m-3">
              <div className="text-white flex gap-5">
                <FiShoppingCart className="text-3xl mt-1" />
                <p className="text-3xl font-poppins font-semibold">Cart</p>
              </div>
              <button onClick={onClose} className="text-white">
                <HiOutlineX className="text-2xl" />
              </button>
            </div>

            <div className="p-4 pr-2 h-[calc(100vh-100px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-[#1a1a1a]">
              <AnimatePresence>
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
              </AnimatePresence>
            </div>
            {/* CheckOut section */}
            <div className="sticky bottom-0 bg-[#2a2a2a] rounded-lg flex justify-between px-4 py-2 m-1">
              <h2 className="font-semibold text-[#ffffff] font-poppins mt-2 text-lg ml-5">
                Total:{" "}$
                {cartProduct.items
                  .reduce((acc, item) => acc + item.price * item.count, 0)
                  .toFixed(2)}
              </h2>
              <button className="bg-white font-semibold font-poppins text-black px-7 transition-all duration-200 py-1 rounded-lg text-2xl border border-transparent hover:bg-[#2a2a2a] hover:border-[#ced4da] hover:text-white">CHECKOUT</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Cart;
