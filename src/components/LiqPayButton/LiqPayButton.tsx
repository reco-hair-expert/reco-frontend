"use client";

import { useEffect, useState } from "react";
import styles from "./LiqPayButton.module.scss";

interface LiqPayButtonProps {
  amount: number;
  description: string;
  orderId: string;
  onSuccess?: () => void;
  onError?: () => void;
}

const LiqPayButton = ({
  amount,
  description,
  orderId,
  onSuccess,
  onError,
}: LiqPayButtonProps) => {
  const [formData, setFormData] = useState<{
    data: string;
    signature: string;
    url: string;
  } | null>(null);

  // useEffect(() => {
  //   // Этот useEffect будет использоваться для получения данных LiqPay
  //   // от вашего внешнего бэкенда.
  //   // Когда ваш бэкенд будет готов, раскомментируйте этот блок
  //   // и замените заглушки реальными вызовами API.
  //   const fetchLiqPayData = async () => {
  //     try {
  //       // TODO: Замените на реальный эндпоинт вашего бэкенда для генерации данных LiqPay
  //       const response = await fetch("YOUR_EXTERNAL_LIQPAY_API_ENDPOINT", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           amount,
  //           description,
  //           orderId,
  //           result_url: `${window.location.origin}/payment/success`,
  //           server_url: `${window.location.origin}/api/payment/callback`, // Этот URL должен быть доступен для LiqPay
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch LiqPay data from backend");
  //       }

  //       const { data, signature } = await response.json();
  //       setFormData({
  //         data,
  //         signature,
  //         url: "https://www.liqpay.ua/api/3/checkout",
  //       });
  //     } catch (error) {
  //       console.error("Error fetching LiqPay data:", error);
  //       if (onError) onError();
  //     }
  //   };

  //   fetchLiqPayData();
  // }, [amount, description, orderId, onError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Пока бэкенд не готов, мы просто не будем ничего делать
    // В будущем, здесь будет вызов к вашему бэкенду для получения данных LiqPay
    try {
      // TODO: Раскомментируйте и замените на реальный вызов к вашему бэкенду
      // который вернет { data: string, signature: string }
      const response = await fetch("YOUR_EXTERNAL_LIQPAY_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          description,
          orderId,
          result_url: `${window.location.origin}/payment/success`,
          server_url: `YOUR_EXTERNAL_LIQPAY_CALLBACK_ENDPOINT`, // Это будет эндпоинт вашего внешнего бэкенда для колбэков LiqPay
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get LiqPay data from external backend");
      }

      const { data, signature } = await response.json();

      // После получения данных от бэкенда, отправляем форму в LiqPay
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://www.liqpay.ua/api/3/checkout";

      const dataInput = document.createElement("input");
      dataInput.type = "hidden";
      dataInput.name = "data";
      dataInput.value = data;

      const signatureInput = document.createElement("input");
      signatureInput.type = "hidden";
      signatureInput.name = "signature";
      signatureInput.value = signature;

      form.appendChild(dataInput);
      form.appendChild(signatureInput);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

    } catch (error) {
      console.error("Error initiating LiqPay payment:", error);
      if (onError) onError();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.liqpayForm}>
      <button type="submit" className={styles.liqpayButton}>
        Оплатити через LiqPay
      </button>
    </form>
  );
};

export default LiqPayButton; 