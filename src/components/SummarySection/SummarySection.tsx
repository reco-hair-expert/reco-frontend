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

  const getItemPrice = (item: any) => {
    if (!item.size || !item.product.sizes) return 0;

    if (Array.isArray(item.product.sizes)) {
      const sizeObj = item.product.sizes.find((s: any) => s.size === item.size);
      return sizeObj?.price || 0;
    }

    return item.product.sizes[item.size] || 0;
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = getItemPrice(item);
      return total + price * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const handleContinueShopping = () => {
    router.push("/catalog");
  };

  return (
    <section className={styles.cartItems}>
      <h2 className={styles.header}>Ваше замовлення</h2>

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
                  alt={item.product.name}
                  height={150}
                  src={item.product.photo}
                  width={150}
                />
              </div>
              <div className={styles.infoContainer}>
                <HighlightText>
                  <p className={styles.title}>{item.product.name}</p>
                </HighlightText>
                <p className={styles.description}>
                  {item.product.shortDescription}
                </p>
                <div className={styles.controlContainer}>
                  {item.size && (
                    <>
                      <p>{item.size}</p>
                      <p className={styles.quantity}>
                        Кількість: {item.quantity}
                      </p>
                      <p className={styles.price}>{getItemPrice(item)} грн</p>
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
          <input id="delivery-standard" name="delivery" type="radio" />
          <label
            className={styles.deliveryOptionDescription}
            htmlFor="delivery-standard"
          >
            Стандартна доставка
          </label>
        </div>
        <div className={styles.deliveryOption}>
          <input id="delivery-express" name="delivery" type="radio" />
          <label
            className={styles.deliveryOptionDescription}
            htmlFor="delivery-express"
          >
            Експрес доставка
          </label>
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
