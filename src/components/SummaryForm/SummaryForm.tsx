"use client";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useEffect, useImperativeHandle, forwardRef } from "react";
import styles from "./SummaryForm.module.scss";
import type { FormInput } from "./types/SummaryForm.types";
import InputLabel from "../InputLabel/InputLabel";
import handlePhoneChange from "@/utils/handlePhoneChange";

interface SummaryFormProps {
  onFormChange: (data: FormInput, isValid: boolean) => void;
}

const SummaryForm = forwardRef(function SummaryForm({ onFormChange }: SummaryFormProps, ref) {
  const {
    register,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger
  } = useForm<FormInput>({ mode: "onChange" });

  const values = watch();

  useEffect(() => {
    onFormChange(values, isValid);
  }, [values, isValid, onFormChange]);

  useImperativeHandle(ref, () => ({
    triggerValidation: () => trigger(undefined, { shouldFocus: true })
  }));

  return (
    <form className={styles.summaryForm} id="summaryForm">
      <h2 className={styles.formTitle}>Доставка у відділення Нова Пошта</h2>
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

      {/* <div className={styles.inputContainer}>
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
      </div> */}

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
    </form>
  );
});

export default SummaryForm;
