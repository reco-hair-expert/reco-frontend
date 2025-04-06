import React from "react";
import styles from "./quiz.module.scss";

interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar} style={{ width: `${percentage}%` }} />
      <div className={styles.progressText}>
        Питання {current} з {total}
      </div>
    </div>
  );
};

export default QuizProgress;
