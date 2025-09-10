import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductsComponents/ProductCard";
import LatestProductSkeleton from "./LatestProductSkeleton";
import {Link , useNavigate} from "react-router-dom"

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: 10000,
});

function LatestProducts() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchLatestProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get("/api/products/latest", {
          cancelToken: source.token,
        });
        setLatestProducts(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          console.error("Failed to fetch latest products:", err);
          let msg = "Failed to load latest products. Please try again later.";
          if (err.response) {
            msg = `Server error: ${err.response.status} - ${
              err.response.data?.error || "Unknown error"
            }`;
          } else if (err.request) {
            msg =
              "Network error: Could not connect to server. Please check if your backend is running on " +
              (process.env.REACT_APP_API_URL || "http://localhost:3000");
          }
          setError(msg);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestProducts();
    return () => {
      source.cancel("Component unmounted, request canceled");
    };
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  // Reduced top/bottom padding
  const sectionClasses = "w-full py-4 lg:py-8";

  if (isLoading) {
    return (
      <section className={sectionClasses}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[...Array(8)].map((_, index) => (
              <LatestProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={sectionClasses}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Latest Products
            </h2>
            <p className="text-lg text-gray-600">Discover our newest arrivals</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Connection Error
            </h3>
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-sm text-gray-600 mb-6">
              Make sure your backend server is running on{" "}
              {process.env.REACT_APP_API_URL || "http://localhost:3000"}
            </p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (latestProducts.length === 0) {
    return (
      <section className={sectionClasses}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Products Available
            </h3>
            <p className="text-gray-600 mb-6">Check back later for new arrivals.</p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className="overflow-x-auto sm:overflow-x-visible scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          style={{ WebkitOverflowScrolling: "touch" }}
          tabIndex={0}
          aria-label="Latest Products Scroll Container"
        >
          <div
            className="sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 flex sm:flex-none space-x-4 sm:space-x-0 px-4 sm:px-0"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {latestProducts.map((product) => (
              <div
                key={product.product_id}
                className="flex-shrink-0 w-64 sm:w-auto"
                style={{ scrollSnapAlign: "start" }}
              >
                <ProductCard
                  id={product.product_id}
                  path={product.image}
                  alt={product.name}
                  name={product.name}
                  desc={product.description}
                  price={product.price}
                  discountPrice={product.discount_price}
                  category={product.category}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10 lg:mt-12">
          <button onClick={(e) => {navigate("/products");window.scrollTo(0, 0);}} className="inline-flex items-center px-3 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-200">
            View All Products
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default LatestProducts;
