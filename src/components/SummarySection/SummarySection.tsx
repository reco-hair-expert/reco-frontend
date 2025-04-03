"use client";

import { useMemo } from "react";
import { useCart } from "@/context/CartContext";
import HighlightText from "@/components/HighLightText/HighLightText";
import Image from "next/image";
import styles from "./SummarySection.module.scss";
import { useRouter } from "next/navigation";

const SummarySection = () => {
  const { cartItems } = useCart();
   const router = useRouter();

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price =
        item.size && item.product.sizes[item.size] !== undefined
          ? item.product.sizes[item.size]
          : (item.product.price ?? 0);
      return total + (price ?? 0) * item.quantity;
    }, 0);
  }, [cartItems]);
  const handleContinueShopping = () => {
    router.push("/catalog");
  };

  return (
    <section className={styles.cartItems}>
      <h1 className={styles.header}>ВАШЕ ЗАМОВЛЕННЯ</h1>

      {cartItems.length === 0 ? (
        <p>ЗАМОВЛЕННЯ ВІДСУТНЄ</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li
              key={`${item.product.id}-${item.size || "default"}`}
              className={styles.cartItem}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={item.product.photo}
                  alt={item.product.name}
                  width={150}
                  height={150}
                  className={styles.image}
                />
              </div>
              <div className={styles.infoContainer}>
                <HighlightText>
                  <p className={styles.title}>{item.product.name}</p>
                </HighlightText>
                <div className={styles.controlContainer}>
                  {item.size && (
                    <>
                      <p>{item.size}</p>
                      <p className={styles.quantity}>
                        Кількість: {item.quantity}
                      </p>
                      <p className={styles.price}>
                        {item.product.sizes?.[item.size] || item.product.price}{" "}
                        грн
                      </p>
                    </>
                  )}
                </div>
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
        <button
          className={styles.checkoutButton}
          onClick={() => alert("Замовлення підтверджено!")}
        >
          Підтвердити замовлення
        </button>
        <button
        className={styles.continueShoppingButton}
        onClick={handleContinueShopping}
      >
        ПРОДОВЖИТИ ПОКУПКИ
      </button>
      </div>
    </section>
  );
};

export default SummarySection;
