import React from "react";
import { useForm } from "react-hook-form";
import styles from "./PhoneConsultationForm.module.scss";
import InputLabel from "../InputLabel/InputLabel";
import handlePhoneChange from "@/utils/handlePhoneChange";
import Icon from "../Icon/Icon";
import useDeviceDetection from "@/context/useDeviceDetection";
import Button from "../Button/Button";
import Image from "next/image";

type FormData = {
  phoneNumber: string;
};

const PhoneConsultationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    defaultValues: {
      phoneNumber: ""
    }
  });

  const { isMobile, isTablet } = useDeviceDetection();

  const getButtonSize = () => {
    if (isMobile) return "m";
    if (isTablet) return "xl";
    return "xl";
  };

  const onSubmit = (data: FormData) => {
    // ... existing code ...
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        Залиш номер телефону, щоб отримати консультацію
      </h2>
      <div className={styles.Arrow} />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <InputLabel htmlFor="phoneNumber" required={true}>
            НОМЕР ТЕЛЕФОНУ
          </InputLabel>

          <div className={styles.phoneNumberInputContainer}>
            <input
              id="phoneNumber"
              {...register("phoneNumber", {
                required: "Це поле обовʼязкове",
                minLength: {
                  value: 17,
                  message: "Введіть повний номер"
                }
              })}
              className={`${styles.formInput} ${errors.phoneNumber ? styles.inputError : ""}`}
              placeholder="+380 __ ___ __ __"
              type="tel"
              onChange={(event) => handlePhoneChange(event, setValue)}
              onFocus={(event) => handlePhoneChange(event, setValue)}
            />
            <Icon
              className={styles.inputIconPhone}
              color="none"
              name="icon-phone"
              stroke="#96989B"
            />
          </div>

          {errors.phoneNumber && (
            <p className={styles.inputErrorText}>
              {errors.phoneNumber.message}
            </p>
          )}

          <div className={styles.ImgContainer}>
            <Image
              fill
              alt="happy end"
              src="/images/sections/quiz/Happy_end.png"
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className={styles.buttonContainer}>
            <Button
              className="feedbackButton"
              size={getButtonSize()}
              variant="primary"
            >
              <div className={styles.iconContainer}>
                <Icon
                  className={styles.formButtonIcon}
                  fill="white"
                  name="icon-arrow-up-right2"
                  size={isMobile ? 20 : 30}
                  stroke="none"
                />
              </div>
              <span className={styles.formButtonText}>
                {isMobile ? "КОНСУЛЬТАЦІЯ" : "ОТРИМАТИ КОНСУЛЬТАЦІЮ"}
              </span>{" "}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PhoneConsultationForm;
