import { FC } from "react";
import { CallButtonProps } from "./types/CallButton.types";
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
    <button className={classes} onClick={onClick} aria-label={ariaLabel}>
      <span className={styles.button__text}>{phoneNumber}</span>{" "}
      <div className={styles.icon_container}>
        <Icon name="icon-phone" size={30} fill="none" stroke="white" />
      </div>
    </button>
  );
};

export default CallButton;
