import styles from "./ArowButton.module.scss";
import React from "react";
import type { ButtonArrowProps } from "./types/ArowButton";
import Icon from "../Icon/Icon";

const ButtonArrow: React.FC<ButtonArrowProps> = ({
  className,
  icon,
  onClick,
  onTouchEnd
}) => {
  return (
    <button
      className={`${styles.buttonArrow} ${className}`}
      onClick={onClick}
      onTouchStart={onTouchEnd}
    >
      {icon === "left" ? (
        <Icon
          className={styles.arrowLeft}
          fill="black"
          name="icon-arrow-right2"
          size={30}
          stroke="none"
        />
      ) : (
        <Icon
          className={styles.arrowRight}
          fill=" black"
          name="icon-arrow-right2"
          size={30}
          stroke="none"
        />
      )}
    </button>
  );
};

export default ButtonArrow;
