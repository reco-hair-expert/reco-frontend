"use client";

import React from "react";
import type { CartButtonProps } from "./types/CartButton.types";
import styles from "./CartButton.module.scss";
import classNames from "classnames";
import Icon from "@/components/Icon/Icon";
import { useContext, useMemo, useCallback } from "react";
import { CartContext } from "@/context/CartContext";
import type { CartItem } from "@/types/types";

const CartButton = ({
  className,
  onClick,
  "aria-label": ariaLabel
}: CartButtonProps) => {
  const cartContext = useContext(CartContext);

  const cartItems = useMemo(() => cartContext?.cartItems ?? [], [cartContext]);

  const totalItems = useMemo(
    () =>
      cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
    [cartItems]
  );

  const handleClick = useCallback(() => {
    if (onClick) onClick();
  }, [onClick]);

  const classes = classNames(styles.button, className, {
    [styles.disabled]: totalItems === 0
  });

  return (
    <button
      id="cart-icon"
      aria-label={ariaLabel}
      className={classes}
      disabled={totalItems === 0}
      onClick={handleClick}
    >
      <Icon className={styles.icon} name="icon-cart" size={25} stroke="black" />
      {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
    </button>
  );
};

export default CartButton;
