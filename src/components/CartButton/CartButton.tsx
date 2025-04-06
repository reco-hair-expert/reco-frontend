"use client";

import { CartButtonProps } from "./types/CartButton.types";
import styles from "./CartButton.module.scss";
import classNames from "classnames";
import Icon from "@/components/Icon/Icon";
import { useContext, useMemo, useCallback } from "react";
import { CartContext } from "@/context/CartContext";
import { CartItem } from "@/types/types";

const CartButton = ({ className, onClick }: CartButtonProps) => {
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
      className={classes}
      onClick={handleClick}
      disabled={totalItems === 0}
    >
      <Icon name="icon-cart" stroke="black" size={25} className={styles.icon} />
      {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
    </button>
  );
};

export default CartButton;
