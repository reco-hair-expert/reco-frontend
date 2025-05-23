"use client";
import { useEffect, useState } from "react";
import { navigationButtons } from "@/constants/navigationButtons";
import NavBar from "../NavBar/NavBar";
import NavButtons from "../NavButtons/NavButton";
import styles from "./ModalMenu.module.scss";
import type { ModalMenuProps } from "./types/ModalMenu.types";

const ModalMenu = ({ isOpen, onClick }: ModalMenuProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.show : styles.hide}`}
      onClick={onClick}
    >
      <NavBar>
        <NavButtons
          buttons={navigationButtons}
          className={styles.modalNavBtns}
          labels={navigationButtons.map((button) => button.title)}
        />
      </NavBar>
    </div>
  );
};

export default ModalMenu;
