"use client";

import { useEffect, useRef } from "react";
import styles from "./LiqPayButton.module.scss";

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

  // Пример тестовых data/signature для sandbox (реальные значения должен отдавать backend)
  const sandboxData = "eyJwdWJsaWNfa2V5Ijoic2FuZGJveF9pNDIyMzk1MDk2OCIsInZlcnNpb24iOjMsImFtb3VudCI6IjEwMCIsImN1cnJlbmN5IjoiVUFIIiwibGFuZ3VhZ2UiOiJ1ayIsInR5cGUiOiJidXkiLCJkZXNjcmlwdGlvbiI6IlRlc3Qgd2l0aCBMSVFQQVkgU0RLIiwib3JkZXJfaWQiOiJURU1QX09SREVSIiwicmVzdWx0X3VybCI6Imh0dHBzOi8vZXhhbXBsZS5jb20vcGF5bWVudC9zdWNjZXNzIiwic2VydmVyX3VybCI6Imh0dHBzOi8vZXhhbXBsZS5jb20vYXBpL3BheW1lbnQvY2FsbGJhY2sifQ==";
  const sandboxSignature = "test";

  const handleLiqpayClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    if (onClick) {
      await onClick(e);
      if (e.defaultPrevented) return;
    }
    if (window.LiqPayCheckout) {
      window.LiqPayCheckout.init({
        data: sandboxData,
        signature: sandboxSignature,
        embedTo: liqpayRef.current,
        mode: "embed",
        language: "uk"
      });
      if (onSuccess) onSuccess();
    } else {
      alert("LiqPay SDK не загружен");
      if (onError) onError();
    }
  };

  return (
    <div>
      <form onSubmit={handleLiqpayClick} className={styles.liqpayForm}>
        <button type="submit" className={styles.liqpayButton} disabled={disabled}>
          Оплатити через LiqPay
        </button>
      </form>
      <div ref={liqpayRef} style={{ marginTop: 24 }} />
    </div>
  );
};

export default LiqPayButton; 