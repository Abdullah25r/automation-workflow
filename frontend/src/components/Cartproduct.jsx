import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { cartContext } from "../Context/CartContext";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    x: 100, //  Slide to the right on exit
    transition: { duration: 0.25 },
  },
};

function Cartproduct(props) {
  const cContext = useContext(cartContext);

  return (
    <motion.div
      layout // Makes animation smooth when layout shifts
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col sm:flex-row items-stretch justify-between bg-[#2a2a2a] p-3 rounded-lg mb-3 gap-2 sm:gap-1 relative"
    >
      {/* Mobile Total Price */}
      <div className="sm:hidden absolute top-3 right-3 flex flex-col items-end mb-2">
        <p className="text-sm font-medium text-gray-100">
          Rs.{(props.price * props.count).toFixed(2)}
        </p>
      </div>

      {/* Product Image and Info */}
      <div className="flex items-center flex-1 min-w-0 gap-3 mt-4 sm:mt-0">
        <div className="w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0">
          <img
            src={props.path}
            alt={props.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-medium font-poppins text-gray-100 line-clamp-2 text-sm sm:text-base">
            {props.name}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm pt-3 ">Rs.{props.price}</p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between mt-2 sm:mt-0 sm:ml-5">
        {/* Quantity Controls */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="flex items-center border border-gray-600 rounded-md text-xs sm:text-base"
        >
          <button
            className="px-2 py-0.5 text-gray-300 hover:bg-gray-700 transition-colors"
            onClick={() => cContext.decreaseCount(props.id)}
          >
            -
          </button>
          <span className="px-2 py-0.5 text-gray-100 border-x border-gray-600">
            {props.count}
          </span>
          <button
            className="px-2 py-0.5 text-gray-300 hover:bg-gray-700 transition-colors"
            onClick={() => cContext.increaseCount(props.id)}
          >
            +
          </button>
        </motion.div>

        {/* Mobile Delete Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => cContext.removeProduct(props.id)}
          className="sm:hidden text-gray-400 hover:text-red-500 transition-colors p-1 ml-3"
        >
          <MdDelete className="text-lg" title="Delete item" />
        </motion.button>

        {/* Desktop Price and Delete */}
        <div className="hidden sm:flex items-center ml-8 w-40 justify-end gap-4">
          <p className="text-lg font-medium text-gray-100">
            Rs.{(props.price * props.count).toFixed(2)}
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => cContext.removeProduct(props.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
          >
            <MdDelete className="text-xl" title="Delete item" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default Cartproduct;
