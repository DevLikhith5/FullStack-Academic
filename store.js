
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { generateQuizQuestions } from './ai';
import { saveQuizResult, fetchUserHistory } from './api';



export const useGameStore = create(
  persist(
    (set, get) => ({
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

      startGame: async () => {
        const { config } = get();
        

        if (config.topic === 'Custom' && (!config.customTopic || config.customTopic.trim() === '')) {
            alert("PLEASE ENTER A CUSTOM TOPIC TO PROCEED.");
            return;
        }

        set({ error: undefined });

        try {
          const questions = await generateQuizQuestions(
              config.topic, 
              config.difficulty, 
              config.questionCount,
              config.customTopic
          );
          
          set({
            questions,
            currentQuestionIndex: 0,
            userAnswers: [],
            score: 0
          });
        } catch (error) {
          set({ 
            error: 'Failed to load questions. The AI signal was intercepted. Try again.' 
          });
        }
      },

      answerQuestion: (answer) => {
        const state = get();
        const newAnswers = [...state.userAnswers, answer];
        const newScore = answer.isCorrect ? state.score + 1 : state.score;
        

        const isFinished = newAnswers.length === state.questions.length;

        console.log(`[STORE] answerQuestion: Correct? ${answer.isCorrect}, New Score: ${newScore}`);

        set({
            userAnswers: newAnswers,
            score: newScore,
        });

        if (isFinished) {

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
                    console.log(`[STORE] Quiz Result Saved. Score: ${newScore}`);
                });
            } else {
                console.warn('[STORE] User not found. Quiz result NOT saved.');
            }


        }
      },

      nextQuestion: () => set((state) => {
          if (state.currentQuestionIndex < state.questions.length - 1) {
              return { currentQuestionIndex: state.currentQuestionIndex + 1 };
          }
          return {};
      }),

      retryQuiz: () => {

          set((state) => ({
              currentQuestionIndex: 0,
              userAnswers: [],
              score: 0,
              isReviewMode: false
          }));
      },

      resetGame: () => {

          set({
              currentQuestionIndex: 0,
              userAnswers: [],
              score: 0,
              questions: [],
              isReviewMode: false
          });
      },

      setReviewMode: (filter) => set({ isReviewMode: true, reviewFilter: filter }),
      exitReview: () => set({ isReviewMode: false }),

      login: (user) => set({ user }),
      logout: () => set({ 
        user: undefined, 
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
    }),
    {
      name: 'game-storage', 
      partialize: (state) => ({ 
        user: state.user, 
        history: state.history,
        config: state.config,
        score: state.score,
        questions: state.questions,
        currentQuestionIndex: state.currentQuestionIndex,
        userAnswers: state.userAnswers
      }),
    }
  )
);
