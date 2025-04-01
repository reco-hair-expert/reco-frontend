"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types/types";

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: number, size?: string) => void;
  updateCartItemQuantity: (
    productId: number,
    quantity: number,
    size?: string
  ) => void;
  cartTotal: number;
  cartCount: number;
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

interface Props {
  children: React.ReactNode;
}

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
};

const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  }
  return [];
};

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCartItems = loadCartFromLocalStorage();
      if (savedCartItems.length > 0) {
        setCartItems(savedCartItems);
      }
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      saveCartToLocalStorage(cartItems);
    }
  }, [cartItems]);

  const addToCart = (product: Product, size: string = "") => {
    setCartItems((prevCart) => {
      const existingCartItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingCartItemIndex !== -1) {
        return prevCart.map((item, index) =>
          index === existingCartItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1, size }];
      }
    });
  };

  const removeFromCart = (productId: number, size: string = "") => {
    setCartItems((prevCart) =>
      prevCart.filter(
        (item) => item.product.id !== productId || item.size !== size
      )
    );
  };

  const updateCartItemQuantity = (
    productId: number,
    quantity: number,
    size: string = ""
  ) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
