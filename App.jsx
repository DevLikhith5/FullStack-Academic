
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import QuizEngine from './components/QuizEngine';
import ResultsPage from './components/ResultsPage';
import ReviewList from './components/ReviewList';
import LoadingScreen from './components/LoadingScreen';
import AuthPage from './components/AuthPage';
import HistoryView from './components/HistoryView';
import { useGameStore } from './store';
import BrutalistButton from './components/BrutalistButton';
import { RefreshCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {
  const {
    questions,
    userAnswers,
    isReviewMode,
    reviewFilter,
    error,
    retryQuiz,
    resetGame,
    setReviewMode,
    exitReview
  } = useGameStore();


  const location = useLocation();



  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="w-full flex flex-col "
            >
              <AuthPage />
            </motion.div>
          } />
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="w-full flex flex-col "
            >
              <LandingPage />
            </motion.div>
          } />
          <Route path="/loading" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="w-full flex flex-col "
            >
              <LoadingScreen />
            </motion.div>
          } />
          <Route path="/error" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="w-full flex flex-col "
            >
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
                <div className="border-4 border-black p-8 bg-brut-red text-white shadow-hard max-w-md">
                  <h2 className="text-3xl font-black mb-4">SYSTEM ERROR</h2>
                  <p className="font-mono mb-8">{error || "Unknown anomaly detected."}</p>
                  <BrutalistButton onClick={resetGame} variant="secondary" className="border-white hover:bg-black hover:text-white">
                    <RefreshCcw className="mr-2" /> REBOOT
                  </BrutalistButton>
                </div>
              </div>
            </motion.div>
          } />
          <Route path="/quiz" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="w-full flex flex-col "
            >
              <QuizEngine />
            </motion.div>
          } />
          <Route path="/history" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="w-full flex flex-col "
            >
              <HistoryView />
            </motion.div>
          } />
          <Route path="/results" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="w-full flex flex-col "
            >
              {isReviewMode ? (
                <ReviewList
                  questions={questions}
                  userAnswers={userAnswers}
                  filter={reviewFilter}
                  onBack={exitReview}
                />
              ) : (
                <ResultsPage
                  questions={questions}
                  userAnswers={userAnswers}
                  onRetry={retryQuiz}
                  onReview={setReviewMode}
                  onHome={resetGame}
                />
              )}
            </motion.div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
