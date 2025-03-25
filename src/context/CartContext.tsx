"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/config/types";

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

export const CartContext = createContext<CartContextValue>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  cartTotal: 0,
  cartCount: 0
});

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
    const savedCartItems = loadCartFromLocalStorage();
    setCartItems(savedCartItems);
  }, []);

  useEffect(() => {
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  const addToCart = (product: Product, size: string = "") => {
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingCartItemIndex !== -1) {
      const existingCartItem = cartItems[existingCartItemIndex];
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1
      };
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { product, quantity: 1, size }]);
    }
  };

  const removeFromCart = (productId: number, size: string = "") => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product.id !== productId || item.size !== size
    );
    setCartItems(updatedCartItems);
  };

  const updateCartItemQuantity = (
    productId: number,
    quantity: number,
    size: string = ""
  ) => {
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.product.id === productId && item.size === size
    );
    if (existingCartItemIndex !== -1) {
      const existingCartItem = cartItems[existingCartItemIndex];
      const updatedCartItem = {
        ...existingCartItem,
        quantity
      };
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
      setCartItems(updatedCartItems);
    }
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
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
