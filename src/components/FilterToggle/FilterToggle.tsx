"use client";

import { useState } from "react";
import styles from "./FilterToggle.module.scss";

const FilterToggle = () => {
  const [active, setActive] = useState("Сухе");
  const options = ["Сухе", "Фабоване", "Термозахист"];

  return (
    <div className={styles.toggleGroup}>
      {options.map((option) => (
        <div
          key={option}
          className={`${styles.toggleOption} ${active === option ? styles.active : ""}`}
          onClick={() => setActive(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default FilterToggle;
