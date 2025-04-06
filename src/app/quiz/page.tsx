"use client";

import React from "react";
import Quiz from "@/components/Quiz/Quiz";
import { quizData } from "@/constants/quizData";
import styles from "./QuizPage.module.scss";

export default function QuizPage() {
  const handleQuizComplete = (results: {
    recommendedProducts: { name: string; score: number }[];
  }) => {
    console.log("Рекомендовані продукти:", results.recommendedProducts);
    // Тут можна додати логіку перенаправлення або збереження результатів
    // Наприклад:
    // localStorage.setItem('quizResults', JSON.stringify(results));
    // або перенаправлення на сторінку результатів
    // redirect('/results');
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>Персоналізований підбір догляду за волоссям</h1>
        <p>Відповідайте на питання, щоб отримати індивідуальні рекомендації</p>
      </div>

      <div className={styles.quizWrapper}>
        <Quiz data={quizData} onComplete={handleQuizComplete} />
      </div>

      <div className={styles.footer}>
        <p>
          Цей тест допоможе підібрати оптимальні засоби для вашого типу волосся
        </p>
      </div>
    </main>
  );
}
