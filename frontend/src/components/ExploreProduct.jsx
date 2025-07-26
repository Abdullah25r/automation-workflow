import { useEffect, useState } from "react";
import ProductCard from "./ProductsComponents/ProductCard";
import { products } from "../AllProducts";
function Card() {
  const [randomProducts, setRandomProducts] = useState([]);

  function getRandomProducts() {
    const numberOfProductsToSelect = 6;

    if (!products || products.length < numberOfProductsToSelect) {
      console.warn(`Not enough products in 'products' array to select ${numberOfProductsToSelect} unique items. Displaying all available products.`);
      setRandomProducts([...products]);
      return;
    }

    const selectedProductIds = new Set();
    const finalSelectedProducts = [];

    while (finalSelectedProducts.length < numberOfProductsToSelect) {
      const randomIndex = Math.floor(Math.random() * products.length);
      const product = products[randomIndex];
      if (product && product.id && !selectedProductIds.has(product.id)) {
        selectedProductIds.add(product.id);
        finalSelectedProducts.push(product);
      }
    }
    setRandomProducts(finalSelectedProducts)
  }
  useEffect(() => {
    getRandomProducts();
  }, []);

  return (
    <div className="w-full overflow-x-auto sm:overflow-x-visible">
      <div className="flex flex-nowrap sm:flex-wrap gap-5 sm:gap-0 px-4
      sm:px-1 my-4 scroll-smooth sm:justify-center">
        {randomProducts.length > 0 ? (
          randomProducts.map((product) => (
            <ProductCard
              key={product.id} 
              id={product.id} 
              path={product.image || `./img/${product.image}`}
              alt={product.name}
              name={product.name}
              desc={product.description}
              price={product.price} 
            />
          ))
        ) : (
          <p>Loading products or no product available...</p>
        )}
      </div>
    </div>
  );
}

export default Card;