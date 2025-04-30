import type { FC } from "react";
import type { CallButtonProps } from "./types/CallButton.types";
import styles from "./CallButton.module.scss";
import classNames from "classnames";
import Icon from "@/components/Icon/Icon";

const CallButton: FC<CallButtonProps> = ({
  className,
  onClick,
  phoneNumber,
  ariaLabel
}) => {
  const classes = classNames(styles.button, className);

  return (
    <button aria-label={ariaLabel} className={classes} onClick={onClick}>
      <span className={styles.button__text}>{phoneNumber}</span>{" "}
      <div className={styles.icon_container}>
        <Icon fill="none" name="icon-phone" size={30} stroke="white" />
      </div>
    </button>
  );
};

export default CallButton;
