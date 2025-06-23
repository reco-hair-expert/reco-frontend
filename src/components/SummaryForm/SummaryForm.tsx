"use client";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import styles from "./SummaryForm.module.scss";

import type { FormInput } from "./types/SummaryForm.types";
import InputLabel from "../InputLabel/InputLabel";
import handlePhoneChange from "@/utils/handlePhoneChange";
import { useCart } from "@/context/CartContext";
import HighlightText from "@/components/HighLightText/HighLightText";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    LiqPayCheckout?: any;
    LiqPayCheckoutCallback?: any;
  }
}

const SummaryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormInput>();
  const { cartItems } = useCart();
  const router = useRouter();
  const liqpayRef = useRef<HTMLDivElement>(null);

  const getItemPrice = (item: any) => {
    if (!item.size || !item.product.sizes) return 0;
    if (Array.isArray(item.product.sizes)) {
      const sizeObj = item.product.sizes.find((s: any) => s.size === item.size);
      return sizeObj?.price || 0;
    }
    return item.product.sizes[item.size] || 0;
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const price = getItemPrice(item);
    return total + price * (item.quantity || 1);
  }, 0);

  useEffect(() => {
    // Подключаем Liqpay SDK только на клиенте
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

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    // Здесь можно отправить заказ на сервер и получить данные для Liqpay
    // Для sandbox — просто пример вызова Liqpay виджета
    if (window.LiqPayCheckoutCallback) {
      window.LiqPayCheckoutCallback = function() {
        window.LiqPayCheckout.init({
          data: "sandbox-data",
          signature: "sandbox-signature",
          embedTo: liqpayRef.current,
          mode: "embed" // или 'popup'
        });
      };
    }
    // reset();
  };

  const handleLiqpayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Здесь должен быть реальный запрос на backend для получения data/signature
    // Пока просто пример вызова Liqpay виджета
    if (window.LiqPayCheckout) {
      window.LiqPayCheckout.init({
        data: "sandbox-data",
        signature: "sandbox-signature",
        embedTo: liqpayRef.current,
        mode: "embed"
      });
    } else {
      alert("Liqpay SDK не загружен");
    }
  };

  const handleContinueShopping = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/catalog");
  };

  return (
    <form
      className={styles.summaryForm}
      data-testid="summaryForm"
      id="summaryForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.formTitle}>Платіжні дані</h2>
      <div className={styles.inputContainerWrapper}>
        <div className={styles.inputContainer}>
          <InputLabel htmlFor="firstName" required={true}>
            Ім&#39;я
          </InputLabel>

          <input
            id="firstName"
            placeholder="Введіть ім'я"
            type="text"
            {...register("firstName", {
              required: "Це поле обовʼязкове",
              pattern: {
                value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ'ʼ\s]+$/,
                message: "Імʼя повинно містити тільки букви"
              }
            })}
            className={`${styles.inputField} ${errors.firstName ? styles.inputError : ""}`}
          />

          {errors.firstName && (
            <p className={styles.inputErrorText}>{errors.firstName.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <InputLabel htmlFor="lastName" required={true}>
            Прізвище
          </InputLabel>

          <input
            id="lastName"
            placeholder="Введіть прізвище"
            type="text"
            {...register("lastName", {
              required: "Це поле обовʼязкове",
              pattern: {
                value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ'ʼ\s]+$/,
                message: "Прізвище повинно містити тільки букви"
              }
            })}
            className={`${styles.inputField} ${errors.lastName ? styles.inputError : ""}`}
          />

          {errors.lastName && (
            <p className={styles.inputErrorText}>{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className={styles.inputContainer}>
        <InputLabel htmlFor="phoneNumber" required={true}>
          Телефон
        </InputLabel>

        <input
          id="phoneNumber"
          placeholder="+380 __ ___ __ __"
          type="text"
          {...register("phoneNumber", {
            required: "Це поле обовʼязкове",
            minLength: {
              value: 17,
              message: "Введіть повний номер"
            }
          })}
          className={`${styles.inputField} ${errors.phoneNumber ? styles.inputError : ""}`}
          onChange={(event) => handlePhoneChange(event, setValue)}
          onFocus={(event) => handlePhoneChange(event, setValue)}
        />

        {errors.phoneNumber && (
          <p className={styles.inputErrorText}>{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <InputLabel htmlFor="country" required={true}>
          Країна / Регіон
        </InputLabel>

        <input
          className={styles.inputField}
          id="country"
          placeholder="Україна"
          type="text"
          {...register("country", {
            required: "Це поле обовʼязкове"
          })}
        />

        {errors.country && (
          <p className={styles.inputErrorText}>{errors.country.message}</p>
        )}
      </div>

      <div className={styles.inputContainerWrapper}>
        <div className={styles.inputContainer}>
          <InputLabel htmlFor="city" required={true}>
            Місто
          </InputLabel>

          <input
            className={styles.inputField}
            id="city"
            placeholder="Виберіть місто"
            type="text"
            {...register("city", {
              required: "Це поле обовʼязкове"
            })}
          />

          {errors.city && (
            <p className={styles.inputErrorText}>{errors.city.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <InputLabel htmlFor="postOffice" required={true}>
            Відділення
          </InputLabel>

          <input
            className={styles.inputField}
            id="postOffice"
            placeholder="Виберіть відділення"
            type="text"
            {...register("postOffice", {
              required: "Це поле обовʼязкове"
            })}
          />

          {errors.postOffice && (
            <p className={styles.inputErrorText}>{errors.postOffice.message}</p>
          )}
        </div>
      </div>

      <div className={styles.inputContainer}>
        <InputLabel htmlFor="comment">Нотатки до замовлення</InputLabel>

        <textarea
          className={styles.inputField}
          id="comment"
          placeholder="Наприклад спеціальні нотатки для доставки"
          {...register("comment")}
        />

        {errors.comment && (
          <p className={styles.inputErrorText}>{errors.comment.message}</p>
        )}
      </div>

      {/* КОРЗИНА */}
      <section className={styles.cartItems} style={{ marginTop: 32 }}>
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
      </section>
      {/* КНОПКИ */}
      <div className={styles.buttonPlaceholder}>
        <button
          className={styles.checkoutButton}
          type="button"
          onClick={handleLiqpayClick}
        >
          Оплатити через Liqpay
        </button>
        <button
          className={styles.continueShoppingButton}
          type="button"
          onClick={handleContinueShopping}
        >
          ПРОДОВЖИТИ ПОКУПКИ
        </button>
      </div>
      {/* Liqpay embed placeholder */}
      <div ref={liqpayRef} style={{ marginTop: 24 }} />
    </form>
  );
};

export default SummaryForm;
