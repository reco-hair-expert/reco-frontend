"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import QuizProgress from "./QuizProgress";
import styles from "./quiz.module.scss";
import type { Answer, QuizProps, QuizState, RecommendedProduct } from "./types";
import { fetchProducts } from "@/services/products";
import Button from "@/components/Button/Button";
import Icon from "../Icon/Icon";
import useDeviceDetection from "@/context/useDeviceDetection";
import { Product } from "@/types/types";

const Quiz: React.FC<QuizProps> = ({ data, onComplete }) => {
  const { isMobile, isTablet } = useDeviceDetection();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

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

  const calculateResults = (
    userAnswers: Answer[]
  ): { name: string; score: number }[] => {
    const productScores: Record<string, number> = {};

    // Ініціалізуємо всі продукти з нульовими балами
    products.forEach((product) => {
      productScores[product.name] = 0;
    });

    // Рахуємо бали для продуктів з відповідей
    userAnswers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      const option = question?.options.find((o) => o.id === answer.optionId);

      option?.recommendedProducts?.forEach((productName) => {
        if (productName in productScores) {
          productScores[productName] += 1;
        }
      });
    });

    // Сортуємо за балом (спадання) і повертаємо топ-3
    return Object.entries(productScores)
      .map(([name, score]) => ({ name, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const enrichResultsWithProductData = (
    results: { name: string; score: number }[]
  ): RecommendedProduct[] => {
    return results
      .map((result) => {
        const product = products.find((p) => p.name === result.name);
        return product
          ? {
              ...product,
              score: result.score,
              photoProduct: product.photo,
              price: product.sizes?.[0]?.price || 0,
              isNew: product.isNewProduct,
              volume: product.sizes?.[0]?.size || ""
            }
          : null;
      })
      .filter((product): product is RecommendedProduct => product !== null);
  };
  const handleNext = () => {
    if (!hasAnsweredCurrent) {
      alert("Будь ласка, оберіть варіант відповіді");
      return;
    }

    if (isLastQuestion) {
      if (products.length === 0) {
        alert("Продукти ще не завантажені. Спробуйте ще раз.");
        return;
      }

      const results = calculateResults(answers);
      console.log("Raw results:", results); // Додали логування

      const enrichedResults = enrichResultsWithProductData(results);
      console.log("Enriched results:", enrichedResults); // Додали логування

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

  if (isLoading) {
    return <div className={styles.loading}>Завантаження продуктів...</div>;
  }

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
              <div className={styles.productPrice}>
                Від {product.sizes?.[0]?.price || 0} грн
              </div>
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
          disabled={
            !hasAnsweredCurrent || (isLastQuestion && products.length === 0)
          }
          className={styles.nextButton}
        >
          {isLastQuestion ? "РЕЗУЛЬТАТ" : "ДАЛІ"}
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
