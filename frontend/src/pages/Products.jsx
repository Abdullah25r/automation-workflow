import React, { useState } from "react";
import ProductsHeader from "../components/ProductsComponents/ProductsHeader";
import ProductCard from "../components/ProductsComponents/ProductCard";
import { products } from "../AllProducts";

function filterProducts(category) {
  if (category === "all") {
    return products;
  }
  return products.filter((product) => {
    return product.category === category;
  });
}
function Products(props) {
  
  const [category, setCategory] = useState("all");

  return (
    <div>
      <ProductsHeader onCategorySelect={setCategory} />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-4">
        {filterProducts(category).map((product,index) => (
          <ProductCard
            key={index}
            id = {product.id}
            path={product.image}
            name={product.name}
            desc={product.description}
            price = {product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
