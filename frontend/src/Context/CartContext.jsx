import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const cartContext = createContext();

export function CartContext({ children }) {
    const [items, setItem] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on component mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                setItem(parsedCart);
            }
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
            
        }
    }, []);

    // Save cart to localStorage whenever items change
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(items));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
            // Optional: Show error toast to user
            // toast.error('Failed to save cart items');
        }
    }, [items]);

    function addProduct(product) {
        const productIndex = items.findIndex(item => item.id === product.id);
         
        if (productIndex === -1) {
            toast.success(`${product.name} added to cart`);
            const newItems = [...items, { ...product, count: 1 }];
            setItem(newItems);
        } else {
            const updatedItems = [...items];
            updatedItems[productIndex].count += 1;
            toast.success(`Increased quantity of ${product.name}`);
            setItem(updatedItems);
        }
    }

    function removeProduct(id) {
        const removedItem = items.find((p) => p.id === id);
        toast.error(`${removedItem?.name || 'Item'} removed from cart`);
        const newItems = items.filter((p) => p.id !== id);
        setItem(newItems);
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
        // Also clear from localStorage
        try {
            localStorage.removeItem('cartItems');
        } catch (error) {
            console.error('Failed to clear cart from localStorage:', error);
        }
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
            isCartOpen,
            openCart,
            closeCart,
            toggleCart
        }}>
            {children}
        </cartContext.Provider>
    );
}