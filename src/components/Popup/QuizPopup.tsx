"use client";

import React from "react";
import styles from "./QuizPopup.module.scss";
import Link from "next/link";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import useDeviceDetection from "@/context/useDeviceDetection";
import { usePathname } from "next/navigation";

interface QuizPopupProps {
  onClose: () => void;
  isVisible: boolean;
}

const QuizPopup: React.FC<QuizPopupProps> = ({ onClose, isVisible }) => {
  const { isMobile, isTablet } = useDeviceDetection();
  const pathname = usePathname();
  const isQuizPage = pathname === "/quiz";

  const getButtonSize = () => {
    if (isMobile) return "s";
    if (isTablet) return "m";
    return "l";
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    if (isQuizPage) {
      e.preventDefault();
      onClose();
    }
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
          ЛИШЕ 6 ПИТАНЬ – І ВИ ДІЗНАЄТЕСЯ СВІЙ ІДЕАЛЬНИЙ ДОГЛЯД!
        </p>
        <div className={styles.buttonWrapper}>
          <Link
            passHref
            href={isQuizPage ? "/quiz" : "/quiz?direct=true"}
            legacyBehavior
          >
            <Button
              className={styles.button}
              size={getButtonSize()}
              variant="primary"
              onClick={handleButtonClick}
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
                {isMobile ? "ПІДІБРАТИ" : "ПІДІБРАТИ ФОРМУЛУ"}
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizPopup;
