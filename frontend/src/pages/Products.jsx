import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import ProductsHeader from "../components/ProductsComponents/ProductsHeader";
import ProductCard from "../components/ProductsComponents/ProductCard";
import { baseURL } from "../Api/productapi";
const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-[#2a2a2a] rounded-lg h-56"></div>
    <div className="mt-3 space-y-2">
      <div className="h-4 bg-[#2a2a2a] rounded w-3/4"></div>
      <div className="h-4 bg-[#2a2a2a] rounded w-1/2"></div>
      <div className="h-4 bg-[#2a2a2a] rounded w-1/4"></div>
    </div>
  </div>
);

function Products(props) {
  const [category, setCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isChangingCategory, setIsChangingCategory] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const API_URL = `${baseURL}/api/products`; 

  const filterProducts = (categoryToFilter) => {
    if (categoryToFilter === "all") {
      return fetchedProducts;
    }
    return fetchedProducts.filter(product => product.category === categoryToFilter);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); 
      try {
        const response = await axios.get(API_URL);
        setFetchedProducts(response.data); // Set the fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        
        const timer = setTimeout(() => {
          setIsLoading(false); 
        }, 1000);
        return () => clearTimeout(timer); 
      }
    };

    fetchProducts();
  },[]); // Empty dependency array means this runs once on mount

  // Handle category changes
  const handleCategoryChange = (newCategory) => {
    setIsChangingCategory(true);
    setCategory(newCategory);

    setTimeout(() => {
      setIsChangingCategory(false);
    }, 400);
  };

  return (
    <div className="px-4">
      <ProductsHeader onCategorySelect={handleCategoryChange} />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        {(isLoading || isChangingCategory) ? (
          Array(8).fill(0).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          // Render actual product cards once data is loaded and not changing category
          filterProducts(category).map((product, index) => (
            <ProductCard
              key={product.product_id} // Use product_id as the unique key
              id={product.product_id} // Map product_id from API to id prop
              path={product.image} // Map image from API to path prop
              name={product.name}
              desc={product.description}
              price={product.price}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
