import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { cartContext } from "../Context/CartContext";
import { products } from "../AllProducts";
import { motion, AnimatePresence } from "framer-motion";

function Cartproduct(props) {
  const cContext = useContext(cartContext);

  return (
    <motion.div
      layout 
      className="flex justify-between bg-[#2a2a2a] p-4 rounded-lg mb-3 h-36"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
    >
      <div className="mr-2 w-32 rounded-lg">
        <img src={props.path} alt="img" className="rounded-lg" />
      </div>

      <div className="flex flex-col justify-between w-32 mr-20">
        <h2 className="font-semibold font-poppins">{props.name}</h2>
        <p>${props.price}</p>
        <div className="flex gap-3  mt-6 bg-[#1a1a1a] px-2 justify-center rounded-md w-20">
          <button
            className=" p-1 font-bold py-0  rounded-sm"
            onClick={() => cContext.decreaseCount(props.id)}
          >
            -
          </button>
          <p>{props.count}</p>
          <button
            className=" p-1 font-bold py-0 rounded-sm "
            onClick={() => cContext.increaseCount(props.id)}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between mb-5">
        <p className="text-xl">${(props.price * props.count).toFixed(2)}</p>
        <button onClick={() => cContext.removeProduct(props.id)}>
          <MdDelete className="text-2xl" title="delete" />
        </button>
      </div>
    </motion.div>
  );
}

export default Cartproduct;
