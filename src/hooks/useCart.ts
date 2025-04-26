import { useState, useEffect, useCallback } from "react";
import { Product, CartItem } from "@/types/types";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product, size: string) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (productInCart) {
        return prevCart.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1, size }];
      }
    });
  }, []);

  const removeFromCart = useCallback((product: Product, size: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === product.id && item.size === size)
      )
    );
  }, []);

  const decreaseQuantity = useCallback((product: Product, size: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const sizePrice = item.size
        ? item.product.sizes.find((s) => s.size === item.size)?.price || 0
        : 0;
      return total + sizePrice * item.quantity;
    }, 0);
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    getCartTotal
  };
};
