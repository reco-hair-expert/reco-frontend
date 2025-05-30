import styles from "./HighLightText.module.scss";
import React from "react";

const HighlightText = ({ children }: { children: React.ReactNode }) => {
  return <span className={styles.highlight}>{children}</span>;
};

export default HighlightText;
