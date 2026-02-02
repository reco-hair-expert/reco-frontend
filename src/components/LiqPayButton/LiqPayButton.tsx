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
  onError?: (error?: string) => void;
  label?: string;
  isPrepaid?: boolean;
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
  onError,
  label,
  isPrepaid
}: LiqPayButtonProps) => {
  const router = useRouter();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);

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
          cartItems,
          isPrepaid
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Ошибка сервера: ${res.status}`
        );
      }

      const response = await res.json();

      // Обработка разных форматов ответа от бэкенда
      if (response.checkoutUrl) {
        // Вариант 1: Прямой URL для редиректа
        window.location.href = response.checkoutUrl;
        return;
      } else if (response.html) {
        // Вариант 2: Бэкенд вернул готовую HTML форму
        openHtmlForm(response.html);
        return;
      } else if (response.data && response.signature) {
        // Вариант 3: Data и signature для SDK или своей формы
        if (window.LiqPayCheckout) {
          // Используем SDK
          openLiqPayPopup(response.data, response.signature);
        } else {
          // Создаем свою форму
          createAndSubmitForm(response.data, response.signature);
        }
        return;
      } else if (response.formData) {
        // Вариант 4: Данные для самостоятельной формы
        createAndSubmitForm(response.formData.data, response.formData.signature);
        return;
      }

      // Если формат ответа неизвестен
      throw new Error("Неизвестный формат ответа от сервера");

    } catch (error: any) {
      console.error("LiqPay error:", error);
      const errorMessage = error.message || "Ошибка оплаты";
      if (onError) onError(errorMessage);
      router.push("/payment/error?message=" + encodeURIComponent(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  // Метод для открытия HTML формы (если бэкенд вернул готовую форму)
  const openHtmlForm = (html: string) => {
    const newWindow = window.open("", "_blank");
    if (!newWindow) {
      alert("Пожалуйста, разрешите всплывающие окна для оплаты");
      return;
    }
    
    newWindow.document.write(html);
    newWindow.document.close();
    
    // Слушаем сообщения от окна оплаты (если нужно)
    const messageHandler = (event: MessageEvent) => {
      if (event.data === "payment_success") {
        handlePaymentSuccess();
        window.removeEventListener("message", messageHandler);
      } else if (event.data === "payment_error") {
        handlePaymentError();
        window.removeEventListener("message", messageHandler);
      }
    };
    
    window.addEventListener("message", messageHandler);
  };

  // Метод для открытия через LiqPay SDK
  const openLiqPayPopup = (data: string, signature: string) => {
    const checkout = window.LiqPayCheckout!.init({
      data,
      signature,
      embedTo: "#liqpay_checkout",
      mode: "popup",
      language: "uk"
    });

    checkout
      .on("liqpay.callback", (data: any) => {
        console.log("LiqPay callback:", data);
        if (data.status === "success" || data.status === "sandbox") {
          handlePaymentSuccess();
        } else {
          handlePaymentError(data.status, data.err_description);
        }
      })
      .on("liqpay.ready", () => {
        console.log("LiqPay ready");
      })
      .on("liqpay.close", () => {
        console.log("LiqPay closed");
      });
  };

  // Метод для создания и отправки своей формы
  const createAndSubmitForm = (data: string, signature: string) => {
    // Удаляем старую форму если есть
    const oldForm = document.getElementById("liqpay_custom_form");
    if (oldForm) oldForm.remove();

    // Создаем новую форму
    const form = document.createElement("form");
    form.id = "liqpay_custom_form";
    form.method = "POST";
    form.action = "https://www.liqpay.ua/api/3/checkout";
    form.style.display = "none";

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

    // Отправляем форму
    form.submit();
  };

  // Обработка успешной оплаты
  const handlePaymentSuccess = () => {
    if (onSuccess) onSuccess();
    clearCart();
    
    setTimeout(() => {
      router.push("/payment/success");
    }, 1000);
  };

  // Обработка ошибки оплаты
  const handlePaymentError = (status?: string, description?: string) => {
    const errorMessage = description || `Статус оплаты: ${status || "unknown"}`;
    if (onError) onError(errorMessage);
    
    // Сохраняем детали ошибки для страницы ошибок
    try {
      if (typeof window !== "undefined" && "sessionStorage" in window) {
        window.sessionStorage.setItem("payment_error", errorMessage);
      }
    } catch {
      // Игнорируем ошибки sessionStorage (например, в приватном режиме)
    }
    router.push("/payment/error");
  };

  // Загрузка скрипта LiqPay
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Проверяем, не загружен ли уже скрипт
      if (!window.LiqPayCheckout && !document.getElementById("liqpay-checkout-script")) {
        const script = document.createElement("script");
        script.src = "https://static.liqpay.ua/libjs/checkout.js";
        script.async = true;
        script.id = "liqpay-checkout-script";
        
        script.onload = () => {
          console.log("LiqPay SDK loaded");
        };
        
        script.onerror = () => {
          console.error("Failed to load LiqPay SDK");
        };
        
        document.body.appendChild(script);
      }
    }
  }, []);

  return (
    <div>
      <div className={styles.liqpayForm}>
        <button
          type="button"
          className={styles.liqpayButton}
          disabled={disabled || loading || isFormValid === false}
          onClick={handleLiqPay}
        >
          {loading ? (
            <>
              <span className={styles.spinner} />
              Завантаження...
            </>
          ) : (
            label || "Оплатити через LiqPay"
          )}
        </button>
      </div>
      <div id="liqpay_checkout" style={{ marginTop: 24 }} />
    </div>
  );
};

export default LiqPayButton;
