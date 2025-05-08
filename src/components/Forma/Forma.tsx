import React from "react";
import styles from "./Form.module.scss";
import Icon from "../Icon/Icon";
import useDeviceDetection from "@/context/useDeviceDetection";
import Button from "../Button/Button";

const PhoneConsultationForm: React.FC = () => {
  const { isMobile, isTablet } = useDeviceDetection();

  const getButtonSize = () => {
    if (isMobile) return "m";
    if (isTablet) return "m";
    return "xl";
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <h3 className={styles.title}>Індивідуальний підбір — за 2 хвилини!</h3>
        <h3 className={styles.subtitle}>
          Пройди короткий квіз і дізнайся, що справді працює для тебе
          <span className={styles.highlight}>
            {" "}
            + в подарунок безкоштовна консультація
          </span>
        </h3>
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
            {isMobile ? "ПОЧАТИ" : "ПОЧАТИ КВІЗ"}
          </span>
        </Button>
      </form>
    </div>
  );
};

export default PhoneConsultationForm;
