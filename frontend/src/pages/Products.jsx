import React, { useState, useEffect } from "react";
import ProductsHeader from "../components/ProductsComponents/ProductsHeader";
import ProductCard from "../components/ProductsComponents/ProductCard";
import { products } from "../AllProducts";

// Skeleton loader component
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

function filterProducts(category) {
  if (category === "all") return products;
  return products.filter(product => product.category === category);
}

function Products(props) {
  const [category, setCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isChangingCategory, setIsChangingCategory] = useState(false);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle category changes
  const handleCategoryChange = (newCategory) => {
    setIsChangingCategory(true);
    setCategory(newCategory);
    
    // Simulate API delay for category change
    setTimeout(() => {
      setIsChangingCategory(false);
    }, 400); // Slightly faster than initial load
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
          filterProducts(category).map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`} // Better key for re-renders
              id={product.id}
              path={product.image}
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