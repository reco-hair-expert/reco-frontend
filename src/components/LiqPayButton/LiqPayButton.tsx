"use client";

import { useEffect, useState } from "react";
import styles from "./LiqPayButton.module.scss";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface LiqPayButtonProps {
  amount: number;
  description: string;
  deliveryData: any;
  cartItems: any[];
  disabled?: boolean;
  isFormValid?: boolean;
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
  deliveryData,
  cartItems,
  disabled,
  isFormValid,
  onClick,
  onSuccess,
  onError
}: LiqPayButtonProps) => {
  const router = useRouter();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !document.getElementById("liqpay-checkout-script")
    ) {
      const script = document.createElement("script");
      script.src = "https://static.liqpay.ua/libjs/checkout.js";
      script.async = true;
      script.id = "liqpay-checkout-script";
      document.body.appendChild(script);
    }
  }, []);

  const handleLiqPay = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (disabled || loading || isFormValid === false) return;
    if (onClick) await onClick(e);

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/payments/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          description,
          deliveryData,
          cartItems
        })
      });

      if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
      const { data, signature } = await res.json();

      if (!window.LiqPayCheckout) throw new Error("LiqPay SDK не загружен");

      const checkout = window.LiqPayCheckout.init({
        data,
        signature,
        embedTo: "#liqpay_checkout",
        mode: "popup"
      });

      checkout
        .on("liqpay.callback", (data: any) => {
          if (data.status === "success" || data.status === "sandbox") {
            if (onSuccess) onSuccess();
            clearCart();
            router.push("/payment/success");
          } else {
            if (onError) onError();
            router.push("/payment/error");
          }
        })
        .on("liqpay.ready", () => {
        })
        .on("liqpay.close", () => {
        });
    } catch (error) {
      if (onError) onError();
      router.push("/payment/error");
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
          disabled={disabled || loading || isFormValid === false}
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
