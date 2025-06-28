"use client";

import { useRouter } from "next/navigation";
import styles from "./PaymentError.module.scss";

export default function PaymentError() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Помилка оплати</h1>
      <p className={styles.message}>
        На жаль, виникла помилка при обробці вашого платежу. Будь ласка, спробуйте ще раз або оберіть інший спосіб оплати.
      </p>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => router.push("/cart")}
        >
          Повернутися до кошика
        </button>
        <button
          className={`${styles.button} ${styles.secondaryButton}`}
          onClick={() => router.push("/catalog")}
        >
          Повернутися до каталогу
        </button>
      </div>
    </div>
  );
} 