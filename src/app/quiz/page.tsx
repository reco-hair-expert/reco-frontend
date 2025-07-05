"use client";

import React, { useEffect, useState, Suspense } from "react";
import Quiz from "@/components/Quiz/Quiz";
import { quizData } from "@/constants/quizData";
import styles from "./QuizPage.module.scss";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const QuizPopup = dynamic(() => import("@/components/Popup/QuizPopup"), {
  ssr: false
});

function QuizContent() {
  const searchParams = useSearchParams();
  const skipPopup = searchParams.get("direct") === "true";

  const [isPopupOpen, setIsPopupOpen] = useState(!skipPopup);
  const [quizStarted, setQuizStarted] = useState(skipPopup);

  const handleQuizComplete = (results: {
    recommendedProducts: { name: string; score: number }[];
  }) => {
    // ... existing code ...
  };

  useEffect(() => {
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
          {!skipPopup && (
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
          )}
          {!skipPopup && (
            <QuizPopup isVisible={isPopupOpen} onClose={handleClosePopup} />
          )}
        </>
      ) : (
        <div className={styles.quizWrapper}>
          <Quiz data={quizData} onComplete={handleQuizComplete} />
        </div>
      )}
    </main>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizContent />
    </Suspense>
  );
}
