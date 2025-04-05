"use client";
import { Product, CartItem } from "@/types/types";
import { useCart } from "@/context/CartContext";
import HighlightText from "@/components/HighLightText/HighLightText";
import styles from "./CartItems.module.scss";
import Image from "next/image";

const CartItems = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, addToCart } =
    useCart();

  const handleIncreaseQuantity = (item: CartItem) => {
    addToCart(item.product, item.size || "");
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity && item.quantity > 1) {
      updateCartItemQuantity(
        item.product.id,
        item.quantity - 1,
        item.size || ""
      );
    }
  };

  return (
    <section className={styles.cartItems}>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li
              key={`${item.product.id}-${item.size}`}
              className={styles.cartItem}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={item.product.photo}
                  alt={item.product.name}
                  width={200}
                  height={200}
                  className={styles.image}
                />
              </div>
              <div className={styles.infoContainer}>
                <HighlightText>
                  <p className={styles.title}>{item.product.name}</p>
                </HighlightText>
                <p className={styles.description}>{item.product.description}</p>

                <div className={styles.controlContainer}>
                  {item.size && (
                    <>
                      <p>{item.size}</p>
                      <p className={styles.price}>
                        {item.product.sizes[item.size]} грн
                      </p>
                    </>
                  )}
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() => handleDecreaseQuantity(item)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <p>{item.quantity || 1}</p>
                    <button
                      onClick={() => handleIncreaseQuantity(item)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.removeContainer}>
                <button
                  onClick={() =>
                    removeFromCart(item.product.id, item.size || "")
                  }
                  className={styles.removeItem}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CartItems;
