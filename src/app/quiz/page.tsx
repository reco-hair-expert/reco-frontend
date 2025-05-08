"use client";

import React, { useEffect, useState } from "react";
import Quiz from "@/components/Quiz/Quiz";
import { quizData } from "@/constants/quizData";
import styles from "./QuizPage.module.scss";
import dynamic from "next/dynamic";
import Image from "next/image";

const QuizPopup = dynamic(() => import("@/components/Popup/QuizPopup"), {
  ssr: false
});

export default function QuizPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleQuizComplete = (results: {
    recommendedProducts: { name: string; score: number }[];
  }) => {
    console.log("Рекомендовані продукти:", results.recommendedProducts);
  };

  useEffect(() => {
    setIsPopupOpen(true);
    document.body.style.overflow = isPopupOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPopupOpen]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setQuizStarted(true);
  };

  return (
    <main className={styles.container}>
      {!quizStarted ? (
        <>
          <div className={styles.backgroundImage}>
            <Image
              fill
              alt="happy end"
              src="/images/sections/quiz/RecoOn.png"
              quality={100}
              priority
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, 70vw"
            />
          </div>
          <QuizPopup isVisible={isPopupOpen} onClose={handleClosePopup} />
        </>
      ) : (
        <div className={styles.quizWrapper}>
          <Quiz data={quizData} onComplete={handleQuizComplete} />
        </div>
      )}
    </main>
  );
}
