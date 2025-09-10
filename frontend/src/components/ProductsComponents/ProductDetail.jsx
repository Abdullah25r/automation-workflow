import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import ProductReviews from "./ProductReviews";
import { cartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { baseURL } from "../../Api/productapi";
import { FiShoppingCart, FiArrowRight, FiCheck } from "react-icons/fi";

// --- Skeleton Loader Component ---
const ProductDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row md:space-x-10 animate-pulse">
    {/* Image Placeholder */}
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl flex-1 h-96 md:h-[500px] flex items-center justify-center">
      <div className="w-full h-full bg-gray-700 rounded-xl"></div>
    </div>

    {/* Details Placeholder */}
    <div className="flex-1 mt-8 md:mt-0">
      {/* Title Placeholder */}
      <div className="h-12 bg-gray-700 rounded-xl w-3/4 mb-6"></div>

      {/* Category, Color, Features Placeholders */}
      <div className="mt-6 space-y-4">
        <div className="h-5 bg-gray-700 rounded-md w-1/2"></div>
        <div className="h-5 bg-gray-700 rounded-md w-2/3"></div>
        <div className="h-5 bg-gray-700 rounded-md w-1/2"></div>
      </div>

      {/* Description Placeholder */}
      <div className="mt-6 space-y-3">
        <div className="h-4 bg-gray-700 rounded-md w-full"></div>
        <div className="h-4 bg-gray-700 rounded-md w-11/12"></div>
        <div className="h-4 bg-gray-700 rounded-md w-10/12"></div>
      </div>

      {/* Price Placeholders */}
      <div className="mt-8 pt-6 space-y-3">
        <div className="h-7 bg-gray-700 rounded-md w-1/4"></div>
        <div className="h-10 bg-gray-700 rounded-md w-1/3"></div>
      </div>

      {/* Button Placeholders */}
      <div className="flex flex-col gap-4 mt-8 pt-8">
        <div className="h-14 bg-gray-700 rounded-xl w-full"></div>
        <div className="h-14 bg-gray-700 rounded-xl w-full"></div>
      </div>
    </div>
  </div>
);

// --- ProductDetail Component ---
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(cartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = `${baseURL}/api/productdetails/${id}`;
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

  const handleAddToCart = async (product) => {
    setAddingToCart(true);
    context.addProduct(product);
    
    // Simulate a brief loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    setAddingToCart(false);
  };

  const handleCheckout = (product) => {
    context.addProduct(product);
    navigate("/checkout");
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <p className="text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/products')} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const hasDiscount = product.discount_price !== null && product.discount_price !== undefined;
  const isActuallyDiscounted = hasDiscount && product.discount_price < product.price;
  const discountPercentage = isActuallyDiscounted 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 py-52">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-xl object-cover shadow-lg"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/600x400/1a1a1a/FFFFFF?text=Image+Not+Found"; 
                }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700">
              {/* Product Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {product.name}
              </h1>

              {/* Product Meta */}
              <div className="space-y-3 mb-6">
                <p className="text-gray-400 flex items-center">
                  <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium mr-3">
                    {product.category}
                  </span>
                </p>

                {product.color && (
                  <p className="text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-current rounded-full mr-2"></span>
                    Color: <span className="text-white font-medium ml-1">{product.color}</span>
                  </p>
                )}

                {product.features && (
                  <div className="flex items-start">
                    <FiCheck className="w-4 h-4 text-green-400 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-300">Features:{" "}
                      <span className="text-white font-medium">{product.features}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-8 pt-4 border-t border-gray-700">
                {isActuallyDiscounted ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-green-400">
                        Rs. {product.discount_price.toLocaleString()}
                      </span>
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                        Save {discountPercentage}%
                      </span>
                    </div>
                    <p className="text-lg text-gray-400">
                      <span className="line-through">Rs. {product.price.toLocaleString()}</span>
                    </p>
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-white">
                    Rs. {product.price.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 mt-8">
                <button
                  onClick={() => handleCheckout(product)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  Buy Now
                  <FiArrowRight className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={addingToCart}
                  className="border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingToCart ? (
                    <>
                      <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <FiShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Reviews */}
        <div className="mt-16">
          <ProductReviews id={product.product_id} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;