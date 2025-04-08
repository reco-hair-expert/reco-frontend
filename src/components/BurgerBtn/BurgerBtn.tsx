"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./BurgerBtn.module.scss";
import classNames from "classnames";
import ModalMenu from "../MobileMenu/ModalMenu";

interface BurgerBtnProps {
  'aria-label'?: string;
}

const BurgerBtn = ({ 'aria-label': ariaLabel }: BurgerBtnProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (modalIsOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [modalIsOpen, isClient]);

  const handleClick = () => {
    setModalIsOpen((prev) => !prev);
  };

  return (
    <>
      <button
        type="button"
        className={classNames(styles.burgerBtn, { [styles.open]: modalIsOpen })}
        onClick={handleClick}
        aria-label={ariaLabel}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      {isClient &&
        createPortal(
          <ModalMenu isOpen={modalIsOpen} onClick={handleClick} />,
          document.body
        )}
    </>
  );
};

export default BurgerBtn;
