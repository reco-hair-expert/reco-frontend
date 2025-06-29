"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./PaymentSuccess.module.scss";
import { Suspense } from "react";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Дякуємо за замовлення!</h1>
      <p className={styles.message}>
        Ваше замовлення успішно оплачено. Ми надіслали підтвердження на вашу електронну пошту.
      </p>
      {orderId && (
        <p className={styles.orderId}>Номер замовлення: <b>{orderId}</b></p>
      )}
      <button
        className={styles.button}
        onClick={() => router.push("/catalog")}
      >
        Повернутися до каталогу
      </button>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense>
      <PaymentSuccessContent />
    </Suspense>
  );
} 