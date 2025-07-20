import React, { createContext, useState } from 'react'

export const cartContext = createContext();
export function CartContext({children}) {

    const[items , setItem] = useState([]);

    function addProduct(product){
        console.log("Product added to cart:", product);
        return setItem([...items , product])
        
    }

    function removeProduct(id){
        return setItem(items.filter((p) => p.id !== id))
    }



  return (
    <cartContext.Provider value={{addProduct, removeProduct, items}}>
        {children}
    </cartContext.Provider>
  )
}

// export const useCart = () => useContext(cartContext);