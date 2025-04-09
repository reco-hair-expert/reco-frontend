import React from "react";
import styles from "./quiz.module.scss";

interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressText}>
        Запитання <span className={styles.currentNumber}>{current}</span> з{" "}
        {total}
      </div>

      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
