import React, { useState, useEffect } from "react";
import axios from "axios";
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
        setFetchedProducts(response.data);
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
  }, []);

  const handleCategoryChange = (newCategory) => {
    setIsChangingCategory(true);
    setCategory(newCategory);

    setTimeout(() => {
      setIsChangingCategory(false);
    }, 400);
  };

  // Get filtered products
  const filteredProducts = filterProducts(category);
  
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-[1430px] mx-auto px-4">
        <ProductsHeader onCategorySelect={handleCategoryChange} />
        
        {/* Results count */}
        <div className="my-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {category === "all" ? "All Products" : `${category.charAt(0).toUpperCase() + category.slice(1)}`}
          </h2>
          <span className="text-gray-400">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {(isLoading || isChangingCategory) ? (
            Array(8).fill(0).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.product_id}
                id={product.product_id}
                path={product.image}
                name={product.name}
                desc={product.description}
                price={product.price}
                category={product.category} // Pass category if needed
              />
            ))
          ) : (
            // No products found message
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No products found</div>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;