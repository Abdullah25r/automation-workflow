import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../../AllProducts";
import ProductReviews from "./ProductReviews";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="p-4">Product not found.</div>;
  }

  return (
    <div>
      <div className="container mx-auto p-4 my-10 flex flex-col md:flex-row md:space-x-10">
        <div className="bg-[#1a1a1a] p-5 rounded-lg shadow-md flex-1">
          <img
            src={`../${product.image}`}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="flex-1 mt-6 md:mt-0">
          <h1 className="text-6xl font-bold text-white mb-6">{product.name}</h1>
          <div className="mt-3">
            <p className="text-gray-400 mb-2">Category: {product.category}</p>
            <p className="text-gray-400 mb-2">
              Color:{" "}
              <span className="text-white font-medium">{product.color}</span>
            </p>
            <p className="text-gray-400 mb-2">
              Features:{" "}
              <span className="text-white font-medium">{product.feature}</span>
            </p>
            <p className="text-gray-300 mt-4">{product.description}</p>
          </div>
          <div className="mt-1">
            <p className="text-lg text-gray-400 pt-6">
              Original Price:{" "}
              <span className="line-through">Rs. {product.price}</span>
            </p>
            <p className="text-xl font-semibold text-green-500 mt-1">
              Now: Rs. {product.discountPrice}
            </p>
          </div>
          <div className="flex flex-col  gap-4 mt-4 pt-8">
            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Buy Now
            </button>
            <button
              type="button"
              className="border border-green-600 text-green-500 hover:bg-green-600 hover:text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <ProductReviews productId={product.id} />
    </div>
  );
}

export default ProductDetail;
