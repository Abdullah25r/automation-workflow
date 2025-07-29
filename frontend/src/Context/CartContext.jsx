import React, { createContext, useState } from 'react';

export const cartContext = createContext();

export function CartContext({ children }) {
    const [items, setItem] = useState([]);
    // New state for cart UI visibility
    const [isCartOpen, setIsCartOpen] = useState(false);

    function addProduct(product) {
        const productIndex = items.findIndex(item => item.id === product.id);

        if (productIndex === -1) {
            return setItem([...items, { ...product, count: 1 }]);
        } else {
            const updatedItems = [...items];
            updatedItems[productIndex].count += 1;
            return setItem(updatedItems);
        }
    }

    function removeProduct(id) {
        return setItem(items.filter((p) => p.id !== id));
    }

    function increaseCount(id) {
        setItem(items =>
            items.map(item =>
                item.id === id ? { ...item, count: item.count + 1 } : item
            )
        );
    }

    function decreaseCount(id) {
        setItem(items =>
            items.map(item =>
                item.id === id ? { ...item, count: item.count > 1 ? item.count - 1 : 1 } : item
            )
        );
    }

    function clearCart() {
        setItem([]);
    }

    // Functions to control cart UI visibility
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);


    return (
        <cartContext.Provider value={{
            addProduct,
            removeProduct,
            items,
            increaseCount,
            decreaseCount,
            clearCart,
            isCartOpen,   // Expose UI state
            openCart,     // Expose UI functions
            closeCart,
            toggleCart
        }}>
            {children}
        </cartContext.Provider>
    );
}

// export const useCart = () => useContext(cartContext);
