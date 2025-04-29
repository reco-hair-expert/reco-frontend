import styles from "./ArowButton.module.scss";
import { ButtonArrowProps } from "./types/ArowButton";
import Icon from "../Icon/Icon";

const ButtonArrow = ({
  className,
  icon,
  onClick,
  onTouchEnd
}: ButtonArrowProps) => {
  return (
    <button
      className={`${styles.buttonArrow} ${className}`}
      onClick={onClick}
      onTouchStart={onTouchEnd}
    >
      {icon === "left" ? (
        <Icon
          name="icon-arrow-right2"
          size={30}
          fill="black"
          stroke="none"
          className={styles.arrowLeft}
        />
      ) : (
        <Icon
          name="icon-arrow-right2"
          size={30}
          fill=" black"
          stroke="none"
          className={styles.arrowRight}
        />
      )}
    </button>
  );
};

export default ButtonArrow;
