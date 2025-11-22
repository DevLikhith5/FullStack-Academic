
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic: Topic;
}

export type Topic = 'General' | 'Science' | 'History' | 'Tech' | 'Arts' | 'Movies' | 'Music' | 'Geography' | 'Sports' | 'Custom';

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Brutal';

export interface QuizConfig {
  topic: Topic | 'All';
  customTopic?: string; // For user-defined topics
  difficulty: Difficulty;
  questionCount: number;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  provider: 'email' | 'google' | 'github';
}

export interface QuizResult {
  id?: string;
  userId: string;
  topic: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  timestamp: string;
}

export interface GameState {
  view: 'AUTH' | 'LANDING' | 'LOADING' | 'QUIZ' | 'RESULTS' | 'ERROR' | 'HISTORY';
  config: QuizConfig;
  score: number;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  error?: string;
  isReviewMode: boolean;
  reviewFilter: 'ALL' | 'INCORRECT';
  user?: User;
  history: QuizResult[];
}

export const TOPICS: Topic[] = ['General', 'Science', 'History', 'Tech', 'Arts', 'Movies', 'Music', 'Geography', 'Sports'];
