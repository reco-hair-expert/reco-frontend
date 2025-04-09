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
      <div className={styles.quizWrapper}>
        <Quiz data={quizData} onComplete={handleQuizComplete} />
      </div>
    </main>
  );
}
