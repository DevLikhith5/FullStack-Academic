
import { create } from 'zustand';
import { GameState, Question, UserAnswer, QuizConfig, Topic, User } from './types';
import { generateQuizQuestions } from './ai';
import { saveQuizResult, fetchUserHistory } from './api';

interface GameStore extends GameState {
  // Actions
  setPendingConfig: (config: Partial<QuizConfig>) => void;
  startGame: () => Promise<void>;
  answerQuestion: (answer: UserAnswer) => void;
  nextQuestion: () => void;
  retryQuiz: () => void;
  resetGame: () => void;
  setReviewMode: (filter: 'ALL' | 'INCORRECT') => void;
  exitReview: () => void;
  login: (user: User) => void;
  logout: () => void;
  loadHistory: () => Promise<void>;
  setView: (view: GameState['view']) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  view: 'AUTH',
  config: {
    topic: 'All',
    difficulty: 'Medium',
    questionCount: 5,
    customTopic: ''
  },
  score: 0,
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  error: undefined,
  isReviewMode: false,
  reviewFilter: 'ALL',
  user: undefined,
  history: [],

  setPendingConfig: (newConfig) => set((state) => ({
    config: { ...state.config, ...newConfig }
  })),

  setView: (view) => set({ view }),

  startGame: async () => {
    const { config } = get();
    
    // Basic validation for custom topic
    if (config.topic === 'Custom' && (!config.customTopic || config.customTopic.trim() === '')) {
        alert("PLEASE ENTER A CUSTOM TOPIC TO PROCEED.");
        return;
    }

    set({ view: 'LOADING', error: undefined });

    try {
      const questions = await generateQuizQuestions(
          config.topic, 
          config.difficulty, 
          config.questionCount,
          config.customTopic
      );
      set({
        questions,
        view: 'QUIZ',
        currentQuestionIndex: 0,
        userAnswers: [],
        score: 0
      });
    } catch (error) {
      set({ 
        view: 'ERROR', 
        error: 'Failed to load questions. The AI signal was intercepted. Try again.' 
      });
    }
  },

  answerQuestion: (answer: UserAnswer) => {
    const state = get();
    const newAnswers = [...state.userAnswers, answer];
    const newScore = answer.isCorrect ? state.score + 1 : state.score;
    
    // Check if it was the last question
    const isFinished = newAnswers.length === state.questions.length;

    set({
        userAnswers: newAnswers,
        score: newScore,
    });

    if (isFinished) {
        // Persist result to json-server
        if (state.user) {
            const displayTopic = state.config.topic === 'Custom' && state.config.customTopic 
                ? state.config.customTopic 
                : state.config.topic;

            saveQuizResult({
                userId: state.user.id,
                topic: displayTopic,
                difficulty: state.config.difficulty,
                score: newScore,
                totalQuestions: state.questions.length,
                timestamp: new Date().toISOString()
            }).then(() => {
                // Optional: refresh history in background
                // get().loadHistory(); 
            });
        }

        set({ view: 'RESULTS' });
    }
  },

  nextQuestion: () => set((state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
          return { currentQuestionIndex: state.currentQuestionIndex + 1 };
      }
      return {};
  }),

  retryQuiz: () => {
      // Re-use same questions, reset state
      set((state) => ({
          view: 'QUIZ',
          currentQuestionIndex: 0,
          userAnswers: [],
          score: 0,
          isReviewMode: false
      }));
  },

  resetGame: () => set({
      view: 'LANDING',
      currentQuestionIndex: 0,
      userAnswers: [],
      score: 0,
      questions: [],
      isReviewMode: false
  }),

  setReviewMode: (filter) => set({ isReviewMode: true, reviewFilter: filter }),
  exitReview: () => set({ isReviewMode: false }),

  login: (user: User) => set({ user, view: 'LANDING' }),
  logout: () => set({ 
    user: undefined, 
    view: 'AUTH', 
    currentQuestionIndex: 0, 
    score: 0, 
    userAnswers: [],
    questions: [],
    history: []
  }),

  loadHistory: async () => {
      const { user } = get();
      if (user) {
          const history = await fetchUserHistory(user.id);
          set({ history });
      }
  }
}));
