"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import QuizProgress from "./QuizProgress";
import styles from "./quiz.module.scss";
import type { QuizData, QuizResults, Answer } from "./types";
import Button from "@/components/Button/Button";
import { products } from "@/constants/products";
import { StaticImageData } from "next/image";
import Icon from "../Icon/Icon";
import useDeviceDetection from "@/context/useDeviceDetection";

interface RecommendedProduct {
  id: number;
  name: string;
  photo: StaticImageData;
  photoProduct: StaticImageData;
  type: string;
  description: string;
  price: number;
  badgeInfo?: string;
  isNew: boolean;
  score: number;
  volume: string;
  sizes: Record<string, number>;
}

interface QuizProps {
  data: QuizData;
  onComplete: (results: QuizResults) => void;
}

interface QuizState {
  currentQuestionIndex: number;
  answers: Answer[];
  showResults: boolean;
  recommendedProducts: RecommendedProduct[];
}

const Quiz: React.FC<QuizProps> = ({ data, onComplete }) => {
  const { isMobile, isTablet } = useDeviceDetection();

  const getButtonSize = () => {
    if (isMobile) return "s";
    if (isTablet) return "m";
    return "l";
  };

  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: [],
    showResults: false,
    recommendedProducts: []
  });

  const { questions } = data;
  const { currentQuestionIndex, answers, showResults, recommendedProducts } =
    state;

  const { currentQuestion, totalQuestions, isLastQuestion, isFirstQuestion } =
    useMemo(
      () => ({
        currentQuestion: questions[currentQuestionIndex],
        totalQuestions: questions.length,
        isLastQuestion: currentQuestionIndex === questions.length - 1,
        isFirstQuestion: currentQuestionIndex === 0
      }),
      [currentQuestionIndex, questions]
    );

  const hasAnsweredCurrent = useMemo(
    () => answers.some((a) => a.questionId === currentQuestion.id),
    [answers, currentQuestion.id]
  );

  const handleOptionSelect = (optionId: number) => {
    const newAnswer = {
      questionId: currentQuestion.id,
      optionId
    };

    setState((prev) => ({
      ...prev,
      answers: prev.answers.some((a) => a.questionId === currentQuestion.id)
        ? prev.answers.map((a) =>
            a.questionId === currentQuestion.id ? newAnswer : a
          )
        : [...prev.answers, newAnswer]
    }));
  };

  const calculateResults = (userAnswers: Answer[]) => {
    const productScores: Record<string, number> = {};

    userAnswers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      const option = question?.options.find((o) => o.id === answer.optionId);

      option?.recommendedProducts.forEach((productName) => {
        productScores[productName] = (productScores[productName] || 0) + 1;
      });
    });

    return Object.entries(productScores)
      .map(([name, score]) => ({ name, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const enrichResultsWithProductData = (
    results: { name: string; score: number }[]
  ): RecommendedProduct[] => {
    const fallbackImage = {
      src: "/product.png",
      height: 1,
      width: 1,
      blurDataURL: ""
    } as StaticImageData;

    return results.map((result) => {
      const product = products.find((p) => p.name === result.name);
      if (!product) {
        return {
          id: 0,
          name: result.name,
          type: "Unknown",
          description: "No description available",
          price: 0,
          isNew: false,
          score: result.score,
          volume: "N/A",
          sizes: {},
          photo: fallbackImage,
          photoProduct: fallbackImage,
          badgeInfo: ""
        };
      }

      return {
        ...product,
        photoProduct: product.photoProduct as StaticImageData,
        score: result.score,
        sizes: Object.fromEntries(
          Object.entries(product.sizes).map(([key, value]) => [key, value ?? 0])
        )
      };
    });
  };

  const handleNext = () => {
    if (!hasAnsweredCurrent) {
      alert("Будь ласка, оберіть варіант відповіді");
      return;
    }

    if (isLastQuestion) {
      const results = calculateResults(answers);
      const enrichedResults = enrichResultsWithProductData(results);
      setState((prev) => ({
        ...prev,
        showResults: true,
        recommendedProducts: enrichedResults
      }));
      onComplete({ recommendedProducts: results });
    } else {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const handleBack = () => {
    if (!isFirstQuestion) {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const restartQuiz = () => {
    setState({
      currentQuestionIndex: 0,
      answers: [],
      showResults: false,
      recommendedProducts: []
    });
  };

  if (showResults) {
    return (
      <div className={styles.resultsContainer}>
        <h2 className={styles.resultsTitle}>Ваші рекомендації</h2>

        <div className={styles.productsGrid}>
          {recommendedProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <Image
                  src={product.photo}
                  alt={product.name}
                  width={200}
                  height={200}
                  className={styles.productImage}
                  priority={true}
                />
                {product.badgeInfo && (
                  <span className={styles.productBadge}>
                    {product.badgeInfo}
                  </span>
                )}
              </div>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productType}>{product.type}</p>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.productPrice}>Від {product.price} грн</div>
              <div className={styles.productScore}>
                Рейтинг: {product.score}
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="primary"
          size="m"
          onClick={restartQuiz}
          className={styles.restartButton}
        >
          Пройти тест знову
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <QuizProgress current={currentQuestionIndex + 1} total={totalQuestions} />

      <h2 className={styles.questionText}>{currentQuestion.text}</h2>

      <div className={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <div
            key={option.id}
            className={`${styles.optionItem} ${
              answers.some(
                (a) =>
                  a.questionId === currentQuestion.id &&
                  a.optionId === option.id
              )
                ? styles.selected
                : ""
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            {option.text}
          </div>
        ))}
      </div>

      <div className={styles.navigationButtons}>
        <Button
          variant="secondary"
          size={getButtonSize()}
          onClick={handleBack}
          disabled={isFirstQuestion}
          className={styles.backButton}
        >
          <div className={styles.iconContainer}>
            <Icon
              name="icon-left-icon"
              size={isMobile ? 20 : 30}
              fill="black"
              stroke="white"
              className={styles.feedbackButtonIcon}
            />
          </div>
          НАЗАД
        </Button>

        <Button
          variant="primary"
          size={getButtonSize()}
          onClick={handleNext}
          disabled={!hasAnsweredCurrent}
          className={styles.nextButton}
        >
          {isLastQuestion ? "РЕЗУЛЬТАТ" : "ДАЛІ"}
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
