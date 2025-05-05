import React from "react";
import styles from "./SuccessBlock.module.scss";

const SuccessBlock: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ГОТОВО !</h1>
      <p className={styles.subtitle}>
        Ми підібрали найкращі засоби саме для тебе
      </p>
    </div>
  );
};

export default SuccessBlock;
