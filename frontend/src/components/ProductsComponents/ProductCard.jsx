import React, { useContext } from "react";
import Star from "../Star";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const context = useContext(cartContext);

  return (
    <div className="bg-[#1a1a1a] p-5 mb-10 mt-3 hover:-translate-y-2 transition-all rounded-lg shadow-md hover:shadow-[#1a1a1a] duration-300">
      {/* Only this portion should navigate to detail page */}
      <Link to={`/product/${props.id}`}>
        <div className="align-items-center flex cursor-pointer -mx-2 flex-col mb-5">
          <img
            src={props.path}
            alt={props.alt}
            className="h-52  object-contain rounded-md bg-[#2a2a2a] mb-3"
          />
        </div>
        <div className="description-section">
          <h2 className="font-poppins font-semibold">{props.name}</h2>
          <p className="text-wrap w-56 line-clamp-2">{props.desc}</p>
          <Star />
        </div>
      </Link>

      {/* Add to cart button outside of the Link */}
      <div className="flex justify-between items-center mt-7">
        <span className="font-semibold">{props.price}</span>
        <button
          type="button"
          className="text-black bg-white text-sm md:px-2 md:py-2 px-1 py-1 text-center inline-flex items-center me-2 border border-[#64748b] rounded-md hover:bg-[#1a1a1a] hover:text-white transition duration-250 ease-in-out font-semibold"
          onClick={() => {
            context.addProduct(props);
          }}
        >
          <svg
            className="w-3.5 h-3.5 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 21"
          >
            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
          </svg>
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
