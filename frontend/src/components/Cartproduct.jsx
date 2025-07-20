import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { cartContext } from "../Context/CartContext";

function Cartproduct(props) {
    const cContext = useContext(cartContext)
  const [count, setCount] = useState(1);

  function increaseCount() {
    return setCount((prev) => prev + 1);
  }
  function decreaseCount() {
    if (count <= 1) return setCount(1);
    return setCount((prev) => prev - 1);
  }

  return (
    <div className="flex justify-between bg-[#2a2a2a] p-4 rounded-lg mb-4">
      <div className="h-28">
        <img src={props.path} alt="img" className="h-28" />
      </div>

      <div className="mr-44">
        <h2 className="font-semibold font-poppins">{props.name}</h2>
        <p>{props.price}</p>
        <div className="flex gap-2 mt-6 bg-[#1a1a1a] px-2 justify-center rounded-md">
          <button
            className=" p-1 font-bold py-0  rounded-sm"
            onClick={decreaseCount}
          >
            -
          </button>
          <p>{count}</p>
          <button
            className=" p-1 font-bold py-0 rounded-sm "
            onClick={increaseCount}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between mb-5">
        <p className="text-xl">{props.price}</p>
        <button onClick={() => cContext.removeProduct(props.id)}> 
          <MdDelete className="text-2xl" title="delete" />
        </button>
      </div>
    </div>
  );
}

export default Cartproduct;
