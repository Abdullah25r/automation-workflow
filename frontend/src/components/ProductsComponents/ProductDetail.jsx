import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'; // Import Axios
import ProductReviews from "./ProductReviews";
import { cartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { baseURL } from "../../Api/productapi";

// --- Skeleton Loader Component ---
const ProductDetailSkeleton = () => (
  <div className="container mx-auto p-4 my-10 flex flex-col md:flex-row md:space-x-10 animate-pulse">
    {/* Image Placeholder */}
    <div className="bg-gray-800 p-5 rounded-lg shadow-md flex-1 h-96 md:h-[500px] flex items-center justify-center">
      <div className="w-full h-full bg-gray-700 rounded-lg"></div>
    </div>

    {/* Details Placeholder */}
    <div className="flex-1 mt-6 md:mt-0">
      {/* Title Placeholder */}
      <div className="h-16 bg-gray-700 rounded-md w-3/4 mb-6"></div>

      {/* Category, Color, Features Placeholders */}
      <div className="mt-3 space-y-3">
        <div className="h-6 bg-gray-700 rounded-md w-1/2"></div>
        {/* Added placeholders for new fields */}
        <div className="h-6 bg-gray-700 rounded-md w-2/3"></div> {/* Color placeholder */}
        <div className="h-6 bg-gray-700 rounded-md w-1/2"></div> {/* Features placeholder */}
      </div>

      {/* Description Placeholder */}
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-700 rounded-md w-full"></div>
        <div className="h-4 bg-gray-700 rounded-md w-11/12"></div>
        <div className="h-4 bg-gray-700 rounded-md w-10/12"></div>
      </div>

      {/* Price Placeholders */}
      <div className="mt-1 pt-6 space-y-2">
        <div className="h-6 bg-gray-700 rounded-md w-1/4"></div> {/* Original Price placeholder */}
        <div className="h-8 bg-gray-700 rounded-md w-1/3"></div> {/* Discount Price placeholder */}
      </div>

      {/* Button Placeholders */}
      <div className="flex flex-col gap-4 mt-4 pt-8">
        <div className="h-12 bg-gray-700 rounded-lg w-full"></div>
        <div className="h-12 bg-gray-700 rounded-lg w-full"></div>
      </div>
    </div>
  </div>
);

// --- ProductDetail Component ---
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
        setLoading(true); // Set loading state to true before fetching
        setError(null);   // Clear any previous errors

        // Construct the API URL using the product ID (UUID)
        const apiUrl = `${baseURL}/api/productdetails/${id}`; // Assuming this is the correct endpoint for specific product details

        // Make the GET request using Axios
        const response = await axios.get(apiUrl);

        // Axios automatically parses JSON, so data is directly in response.data
        setProduct(response.data);

      } catch (err) {
        // Handle different types of errors
        if (axios.isAxiosError(err)) {
          // Axios-specific error (e.g., network error, 4xx/5xx response)
          if (err.response) {
            // Server responded with a status other than 2xx
            if (err.response.status === 404) {
              setError("Product not found.");
            } else {
              setError(`Error: ${err.response.status} - ${err.response.data.error || 'Something went wrong on the server.'}`);
            }
          } else if (err.request) {
            // Request was made but no response was received (e.g., network down)
            setError("Network error: Could not connect to the server.");
          } else {
            // Something else happened while setting up the request
            setError("An unexpected error occurred.");
          }
        } else {
          // Non-Axios error
          setError("An unknown error occurred.");
        }
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false); // Set loading state to false after fetch completes (success or error)
      }
    };

    if (id) { // Only fetch if an ID (UUID) is available from the URL
      fetchProduct();
    }
  }, [id]); // Dependency array: re-run effect if the 'id' changes

  // --- Render Logic based on loading/error/product state ---
  if (loading) {
    return <ProductDetailSkeleton />; // Render the skeleton component
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

  // Determine if there's a valid discount price to display
  // Check if discount_price exists AND is not null
  const hasDiscount = product.discount_price !== null && product.discount_price !== undefined;
  // Also check if discount_price is actually less than price (to avoid displaying same price as discount)
  const isActuallyDiscounted = hasDiscount && product.discount_price < product.price;

  return (
    <div>
      <div className="container mx-auto p-4 my-10 flex flex-col md:flex-row md:space-x-10">
        <div className="bg-[#1a1a1a] p-5 rounded-lg shadow-md flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/000000/FFFFFF?text=Image+Not+Found"; }}
          />
        </div>
        <div className="flex-1 mt-6 md:mt-0">
          <h1 className="text-6xl font-bold text-white mb-6">{product.name}</h1>
          <div className="mt-3">
            <p className="text-gray-400 mb-2">Category: {product.category}</p>

            {/* Display Color if available */}
            {product.color && (
              <p className="text-gray-400 mb-2">
                Color:{" "}
                <span className="text-white font-medium">{product.color}</span>
              </p>
            )}

            {/* Display Features if available */}
            {product.features && ( // Assuming 'features' is the correct property name from backend
              <p className="text-gray-400 mb-2">
                Features:{" "}
                <span className="text-white font-medium">{product.features}</span>
              </p>
            )}

            <p className="text-gray-300 mt-4">{product.description}</p>
          </div>
          <div className="mt-1">
            {/* Conditional Price Display */}
            {isActuallyDiscounted ? (
              <>
                <p className="text-lg text-gray-400 pt-6">
                  Original Price:{" "}
                  <span className="line-through">Rs. {product.price}</span>
                </p>
                <p className="text-xl font-semibold text-green-500 mt-1">
                  Now: Rs. {product.discount_price} {/* Use discount_price here */}
                </p>
              </>
            ) : (
              // If no discount, just show the original price
              <p className="text-xl font-semibold text-white pt-6">
                Price: Rs. {product.price}
              </p>
            )}
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
      {/* Ensure product.product_id is correctly accessed, assuming backend returns 'product_id' */}
      <ProductReviews id={product.product_id} />
    </div>
  );
}

export default ProductDetail;