import React from "react";
import type { ButtonProps } from "./types/Button.types";
import classNames from "classnames";
import "./Button.scss";

const Button = ({
  size = "m",
  disabled = false,
  variant = "primary",
  state = "default",
  onClick,
  children,
  icon
}: ButtonProps) => {
  const classes = classNames("button", {
    [`button--${size}`]: size,
    [`button--${variant}`]: variant,
    [`button--${variant}--hover`]: state === "hover",
    [`button--${variant}--focus`]: state === "focus",
    [`button--${variant}--pressed`]: state === "pressed",
    "button--disabled": disabled || state === "disabled"
  });

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
    >
      <span className="button__text">{children}</span>
      {typeof icon === "string" && (
        <img alt="icon" className="button__icon" src={icon} />
      )}
      {disabled}
    </button>
  );
};

export default Button;
