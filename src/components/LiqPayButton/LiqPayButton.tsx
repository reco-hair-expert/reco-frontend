"use client";

import { useEffect, useState } from "react";
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Загружаем SDK один раз
  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("liqpay-checkout-script")) {
      const script = document.createElement("script");
      script.src = "https://static.liqpay.ua/libjs/checkout.js";
      script.async = true;
      script.id = "liqpay-checkout-script";
      document.body.appendChild(script);
    }
  }, []);

  const handleLiqPay = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (disabled || loading) return;
    if (onClick) await onClick(e);

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/payment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, description, orderId, deliveryData, cartItems }),
      });

      if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
      const { data, signature } = await res.json();

      if (!window.LiqPayCheckout) throw new Error("LiqPay SDK не загружен");

      const checkout = window.LiqPayCheckout.init({
        data,
        signature,
        embedTo: "#liqpay_checkout",
        mode: "popup", 
      });

      checkout
        .on("liqpay.callback", (data: any) => {
          console.log("Payment status:", data.status);
          if (data.status === "success" || data.status === "sandbox") {
            if (onSuccess) onSuccess();
            router.push("/payment/success");
          } else {
            if (onError) onError();
            alert("Платеж не прошёл или отменён.");
          }
        })
        .on("liqpay.ready", () => {
          console.log("LiqPay готов");
        })
        .on("liqpay.close", () => {
          console.log("Окно оплаты закрыто");
        });
    } catch (error) {
      console.error("Ошибка LiqPay:", error);
      alert("Ошибка при инициализации оплаты");
      if (onError) onError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.liqpayForm}>
        <button
          type="button"
          className={styles.liqpayButton}
          disabled={disabled || loading}
          onClick={handleLiqPay}
        >
          {loading ? "Загрузка..." : "Оплатити через LiqPay"}
        </button>
      </div>
      <div id="liqpay_checkout" style={{ marginTop: 24 }} />
    </div>
  );
};

export default LiqPayButton;
