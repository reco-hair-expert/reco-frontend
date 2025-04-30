import React from "react";
import styles from "./QuizPopup.module.scss";
import Link from "next/link";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import useDeviceDetection from "@/context/useDeviceDetection";

interface QuizPopupProps {
  onClose: () => void;
  isVisible: boolean;
}

const QuizPopup: React.FC<QuizPopupProps> = ({ onClose, isVisible }) => {
  const { isMobile, isTablet } = useDeviceDetection();

  const getButtonSize = () => {
    if (isMobile) return "s";
    if (isTablet) return "m";
    return "l";
  };

  return (
    <div
      className={`${styles.popupOverlay} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.popupContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.popupTitle}>
          Пройдіть короткий тест – дізнайтеся, що потрібно вашому волоссю!
        </h2>
        <p className={styles.popupText}>
          Лише 6 питань – і ви дізнаєтеся свій ідеальний догляд!
        </p>
        <div className={styles.buttonWrapper}>
          <Link passHref href="/quiz">
            <Button
              className={styles.button}
              size={getButtonSize()}
              variant="primary"
            >
              <div className={styles.iconContainer}>
                <Icon
                  className={styles.ButtonIcon}
                  fill="white"
                  name="icon-arrow-up-right2"
                  size={isMobile ? 20 : 30}
                  stroke="none"
                />
              </div>
              <span className={styles.button__text}>
                {isMobile ? "РОЗПОЧАТИ" : "РОЗПОЧАТИ КВІЗ"}
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizPopup;
