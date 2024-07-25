import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [shippedItems, setShippedItems] = useState([]);

  // Add item to cart with checked property
  const addToCart = (item) => {
    setCartItems((prevItems) => [
      ...prevItems,
      {
        ...item,
        totalPrice: (item.price * item.quantity).toFixed(2),
        checked: false, // Initialize as unchecked
      },
    ]);
  };

  // Update quantity and recalculate totalPrice
  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(item.quantity + change, 1),
              totalPrice: (
                item.price * Math.max(item.quantity + change, 1)
              ).toFixed(2),
            }
          : item
      )
    );
  };

  // Toggle the checked state of an item
  const toggleChecked = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addShippedItem = (item) => {
    setShippedItems([...shippedItems, item]);
  };

  const removeFromShip = (id) => {
    setShippedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        toggleChecked,
        removeFromCart,
        addShippedItem,
        removeFromShip,
        shippedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
