import React from "react";
import type { ButtonProps } from "./types/Button.types";
import classNames from "classnames";
import "./Button.scss";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  size = "m",
  disabled = false,
  variant = "primary",
  state = "default",
  onClick,
  children,
  icon,
  className,
  style
}, ref) => {
  const classes = classNames("button", {
    [`button--${size}`]: size,
    [`button--${variant}`]: variant,
    [`button--${variant}--hover`]: state === "hover",
    [`button--${variant}--focus`]: state === "focus",
    [`button--${variant}--pressed`]: state === "pressed",
    "button--disabled": disabled || state === "disabled"
  }, className);

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      style={style}
    >
      <span className="button__text">{children}</span>
      {typeof icon === "string" && (
        <img alt="icon" className="button__icon" src={icon} />
      )}
      {disabled}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
