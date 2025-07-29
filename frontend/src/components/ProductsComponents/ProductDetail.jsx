import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'; // Import Axios
import ProductReviews from "./ProductReviews";
import { cartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams(); // 'id' will be the UUID string from the URL
  const navigate = useNavigate();
  const context = useContext(cartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); 
        setError(null);   

        const apiUrl = `http://localhost:3001/api/productdetails/${id}`;
        
        const response = await axios.get(apiUrl);
        
        setProduct(response.data); 

      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            if (err.response.status === 404) {
              setError("Product not found.");
            } else {
              setError(`Error: ${err.response.status} - ${err.response.data.error || 'Something went wrong on the server.'}`);
            }
          } else if (err.request) {
            
            setError("Network error: Could not connect to the server.");
          } else {
            setError("An unexpected error occurred.");
          }
        } else {
          
          setError("An unknown error occurred.");
        }
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) { 
      fetchProduct();
    }
  }, [id]); 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-2xl">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-2xl">
        {error}
      </div>
    );
  }

  if (!product) {
    // This case should ideally be caught by the 404 error, but as a fallback
    return (
      <div className="flex justify-center items-center h-screen text-white text-2xl">
        Product data is not available.
      </div>
    );
  }
  
  // --- Product details rendered once data is available ---
  const handleCheckout = (product) => {
    context.addProduct(product);
    navigate("/checkout");
  };

  return (
    <div>
      <div className="container mx-auto p-4 my-10 flex flex-col md:flex-row md:space-x-10">
        <div className="bg-[#1a1a1a] p-5 rounded-lg shadow-md flex-1">
          {/* Ensure your backend returns the correct relative path or full URL for images */}
          <img
            src={`${product.image}`} 
            alt={product.name}
            className="w-full h-auto rounded-lg"
            // Add an onerror fallback for images
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/000000/FFFFFF?text=Image+Not+Found"; }}
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
              Now: ${product.discountPrice}
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-4 pt-8">
            <button
              onClick={() => handleCheckout(product)}
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Buy Now
            </button>
            <button
              type="button"
              className="border border-green-600 text-green-500 hover:bg-green-600 hover:text-white font-semibold px-6 py-2 rounded-lg transition"
              onClick={() => context.addProduct(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* Pass the product ID (UUID) to ProductReviews */}
      <ProductReviews productId={product.id} />
    </div>
  );
}

export default ProductDetail;
