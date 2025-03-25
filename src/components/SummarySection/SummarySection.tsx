"use client";

import { useCart } from "@/context/CartContext";
import HighlightText from "@/components/HighLightText/HighLightText";
import Image from "next/image";
import styles from "./SummarySection.module.scss";
import { CartItem } from "@/config/types";

const SummarySection = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, addToCart, cartTotal } =
    useCart();

  const handleIncreaseQuantity = (item: CartItem) => {
    addToCart(item.product, item.size || "");
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      updateCartItemQuantity(item.product.id, item.quantity - 1, item.size || "");
    }
  };

  return (
    <section className={styles.cartItems}>
      <h1 className={styles.header}>ВАШЕ ЗАМОВЛЕННЯ</h1>

      {cartItems.length === 0 ? (
        <p>ЗАМОВЛЕННЯ ВІДСУТНЄ</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li key={`${item.product.id}-${item.size || "default"}`} className={styles.cartItem}>
              <div className={styles.imageContainer}>
                <Image src={item.product.photo} alt={item.product.name} width={200} height={200} className={styles.image} />
              </div>
              <div className={styles.infoContainer}>
                <HighlightText>
                  <p className={styles.title}>{item.product.name}</p>
                </HighlightText>
                <div className={styles.controlContainer}>
                  {item.size && (
                    <>
                      <p>{item.size}</p>
                      <p className={styles.price}>
                        {item.product.sizes?.[item.size] || item.product.price} грн
                      </p>
                    </>
                  )}
                  <div className={styles.quantityControl}>
                    <button onClick={() => handleDecreaseQuantity(item)} className={styles.quantityButton}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => handleIncreaseQuantity(item)} className={styles.quantityButton}>+</button>
                  </div>
                </div>
              </div>
              <div className={styles.removeContainer}>
                <button onClick={() => removeFromCart(item.product.id, item.size || "")} className={styles.removeItem}>X</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.summaryTotal}>
        <h3>Загалом</h3>
        <p>₴{cartTotal}</p>
      </div>

      <div className={styles.deliveryOptions}>
        <p>Доставка</p>
        <div className={styles.deliveryOption}>
          <input type="radio" name="delivery" id="delivery-standard" />
          <label htmlFor="delivery-standard">Стандартна доставка</label>
        </div>
        <div className={styles.deliveryOption}>
          <input type="radio" name="delivery" id="delivery-express" />
          <label htmlFor="delivery-express">Експрес доставка</label>
        </div>
      </div>

      <div className={styles.buttonPlaceholder}>
        <button className={styles.checkoutButton} onClick={() => alert("Замовлення підтверджено!")}>
          Підтвердити замовлення
        </button>
      </div>
    </section>
  );
};

export default SummarySection;
