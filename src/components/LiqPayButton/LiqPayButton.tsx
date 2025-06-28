"use client";

import { useEffect, useRef } from "react";
import styles from "./LiqPayButton.module.scss";
import { useRouter } from "next/navigation";

interface LiqPayButtonProps {
  amount: number;
  description: string;
  orderId: string;
  deliveryData: any;
  cartItems: any[];
  disabled?: boolean;
  onClick?: (e: React.FormEvent) => void;
  onSuccess?: () => void;
  onError?: () => void;
}

declare global {
  interface Window {
    LiqPayCheckout?: any;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

console.log("API_BASE_URL:", API_BASE_URL);

const LiqPayButton = ({
  amount,
  description,
  orderId,
  deliveryData,
  cartItems,
  disabled,
  onClick,
  onSuccess,
  onError,
}: LiqPayButtonProps) => {
  const liqpayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && liqpayRef.current) {
      if (!document.getElementById("liqpay-checkout-script")) {
        const script = document.createElement("script");
        script.src = "https://static.liqpay.ua/libjs/checkout.js";
        script.async = true;
        script.id = "liqpay-checkout-script";
        document.body.appendChild(script);
      }
    }
  }, []);

  const handleLiqPay = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("LiqPay click", { amount, description, orderId, deliveryData, cartItems, disabled });
    if (disabled) {
      console.log("Кнопка disabled, fetch не будет");
      return;
    }
    if (onClick) {
      await onClick(e);
      if (e.defaultPrevented) {
        console.log("e.defaultPrevented, fetch не будет");
        return;
      }
    }
    console.log("Попытка отправить fetch на:", `${API_BASE_URL}/api/payment/create`);
    try {
      const res = await fetch(`${API_BASE_URL}/api/payment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          description,
          orderId,
          deliveryData,
          cartItems,
        }),
      });
      if (!res.ok) {
        throw new Error(`Ошибка запроса: ${res.status}`);
      }
      const { data, signature } = await res.json();
      if (window.LiqPayCheckout && data && signature) {
        window.LiqPayCheckout.init({
          data,
          signature,
          embedTo: "#liqpay_checkout",
          mode: "embed",
          onSuccess: () => router.push('/payment/success'),
          onError: () => alert('Ошибка оплаты'),
        });
      } else {
        alert('Ошибка инициализации LiqPay');
      }
    } catch (e) {
      console.error(e);
      if (onError) onError();
    }
  };

  console.log("cartItems:", cartItems);
  console.log("Рендерим LiqPayButton");

  return (
    <div>
      <div className={styles.liqpayForm}>
        <button
          type="button"
          className={styles.liqpayButton}
          disabled={disabled}
          onClick={handleLiqPay}
        >
          Оплатити через LiqPay
        </button>
      </div>
      <div ref={liqpayRef} style={{ marginTop: 24 }} />
    </div>
  );
};

export default LiqPayButton; 