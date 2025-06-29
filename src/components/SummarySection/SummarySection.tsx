"use client";

import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HighlightText from "@/components/HighLightText/HighLightText";
import { useCart } from "@/context/CartContext";
import styles from "./SummarySection.module.scss";
import LiqPayButton from "../LiqPayButton/LiqPayButton";
import SummaryForm from "../SummaryForm/SummaryForm";

const SummarySection = () => {
  const { cartItems } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState<any>({});
  const [formValid, setFormValid] = useState(false);
  const formRef = useRef<any>(null);
  const [orderId, setOrderId] = useState<string>("");

  const getItemPrice = (item: any) => {
    if (!item.size || !item.product.sizes) return 0;

    if (Array.isArray(item.product.sizes)) {
      const sizeObj = item.product.sizes.find((s: any) => s.size === item.size);
      return sizeObj?.price || 0;
    }

    return (item.product.sizes as Record<string, number>)[item.size] || 0;
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc: number, item: any) => {
      const price = getItemPrice(item);
      return acc + price * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const handleContinueShopping = () => {
    router.push("/catalog");
  };

  const generateOrderId = () => {
    const id = `RECO_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setOrderId(id);
    return id;
  };

  // Обработчик для LiqPayButton
  const handleLiqPayClick = async (e: React.FormEvent) => {
    if (!formValid && formRef.current) {
      e.preventDefault();
      await formRef.current.triggerValidation();
    }
    // если форма валидна, LiqPayButton сам обработает submit
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

      <SummaryForm
        ref={formRef}
        onFormChange={(data, isValid) => {
          setFormData(data);
          setFormValid(isValid);
        }}
      />

      <div className={styles.buttonPlaceholder}>
        {cartTotal > 0 && (
          <LiqPayButton
            amount={cartTotal}
            description={cartItems
              .map(
                (item) =>
                  `${item.product.name}${item.size ? ` (${item.size})` : ""} x${item.quantity} — ${getItemPrice(item) * item.quantity} грн`
              )
              .join("\n")}
            orderId={generateOrderId()}
            deliveryData={formData}
            cartItems={cartItems}
            isFormValid={formValid}
            onClick={handleLiqPayClick}
            onSuccess={() => {
              router.push(`/payment/success?orderId=${orderId}`);
            }}
            onError={() => {
              router.push("/payment/error");
            }}
          />
        )}
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
