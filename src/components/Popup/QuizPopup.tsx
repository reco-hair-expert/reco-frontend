import React from "react";
import styles from "./QuizPopup.module.scss";
import Link from "next/link";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import useDeviceDetection from "@/context/useDeviceDetection";

interface QuizPopupProps {
  onClose: () => void;
}

const QuizPopup: React.FC<QuizPopupProps> = ({ onClose }) => {
  const { isMobile, isTablet } = useDeviceDetection();

  const getButtonSize = () => {
    if (isMobile) return "s";
    if (isTablet) return "m";
    return "l";
  };
  return (
    <div className={styles.popupOverlay}>
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
        <Link href="/quiz" passHref>
          <Button
            size={getButtonSize()}
            variant="primary"
            className={styles.button}
          >
            <div className={styles.iconContainer}>
              <Icon
                name="icon-arrow-up-right2"
                size={30}
                fill="white"
                stroke="none"
                className={styles.ButtonIcon}
              />
            </div>
            <span className={styles.button__text}>РОЗПОЧАТИ КВІЗ</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuizPopup;
