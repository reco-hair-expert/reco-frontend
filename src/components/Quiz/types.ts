import { StaticImageData } from "next/image";

// types.ts
export type Question = {
  id: number;
  text: string;
  options: Option[];
};

export type Option = {
  id: number;
  text: string;
  recommendedProducts: string[];
};

export type Answer = {
  questionId: number;
  optionId: number;
};

export type QuizData = {
  questions: Question[];
};

export type QuizResults = {
  recommendedProducts: {
    name: string;
    score: number;
  }[];
};

export interface RecommendedProduct {
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

export interface QuizProps {
  data: QuizData;
  onComplete: (results: QuizResults) => void;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Answer[];
  showResults: boolean;
  recommendedProducts: RecommendedProduct[];
}
