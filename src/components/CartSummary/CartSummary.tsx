"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./CartSummary.module.scss";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/types/types";

const CartSummary = () => {
  const { cartItems } = useCart();
  const router = useRouter();

  const total = useMemo(() => {
    return cartItems.reduce((acc: number, item: CartItem) => {
      const price: number = item.size
        ? item.product.sizes[item.size] || 0
        : 0;
      return acc + price * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const handleContinueShopping = () => {
    router.push("/catalog");
  };

  return (
    <section className={styles.cartSummary}>
      <div className={styles.summaryContainer}>
        <h2 className={styles.summaryHeader}>ПІДСУМОК КОШИКА</h2>
        <div className={styles.totalPrice}>
          <p>Проміжний підсумок: </p>
          <p>₴{total}</p>
        </div>
        <div className={styles.summaryDelyvery}>
          <h3 className={styles.deliveryHeader}> Доставка</h3>
          <div className={styles.deliveryOptions}>
            <div className={styles.deliveryOption}>
              <input type="radio" name="delivery" id="delivery-standard" />
              <label
                className={styles.deliveryOptionDescription}
                htmlFor="delivery-standard"
              >
                Стандартна доставка
              </label>
            </div>
            <div className={styles.deliveryOption}>
              <input type="radio" name="delivery" id="delivery-express" />
              <label
                className={styles.deliveryOptionDescription}
                htmlFor="delivery-express"
              >
                Експрес доставка
              </label>
            </div>
          </div>
        </div>
        <div className={styles.summaryTotal}>
          <h3>Всього</h3>
          <p>₴{total}</p>
        </div>
      </div>
      <button
        className={styles.checkoutButton}
        onClick={() => router.push("/summary")}
      >
        ОФОРМИТИ ЗАМОВЛЕННЯ
      </button>
      <button
        className={styles.continueShoppingButton}
        onClick={handleContinueShopping}
      >
        ПРОДОВЖИТИ ПОКУПКИ
      </button>
    </section>
  );
};

export default CartSummary;
