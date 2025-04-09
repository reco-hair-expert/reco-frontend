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
