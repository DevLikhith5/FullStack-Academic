
import React from 'react';
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

const App: React.FC = () => {
  const {
    view,
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

  const renderContent = () => {
    switch (view) {
      case 'AUTH':
        return <AuthPage />;
      case 'LOADING':
        return <LoadingScreen />;
      case 'ERROR':
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
            <div className="border-4 border-black p-8 bg-brut-red text-white shadow-hard max-w-md">
              <h2 className="text-3xl font-black mb-4">SYSTEM ERROR</h2>
              <p className="font-mono mb-8">{error || "Unknown anomaly detected."}</p>
              <BrutalistButton onClick={resetGame} variant="secondary" className="border-white hover:bg-black hover:text-white">
                <RefreshCcw className="mr-2" /> REBOOT
              </BrutalistButton>
            </div>
          </div>
        );
      case 'LANDING':
        return <LandingPage />;
      case 'QUIZ':
        return <QuizEngine />;
      case 'HISTORY':
        return <HistoryView />;
      case 'RESULTS':
        if (isReviewMode) {
          return (
            <ReviewList
              questions={questions}
              userAnswers={userAnswers}
              filter={reviewFilter}
              onBack={exitReview}
            />
          );
        }
        return (
          <ResultsPage
            questions={questions}
            userAnswers={userAnswers}
            onRetry={retryQuiz}
            onReview={setReviewMode}
            onHome={resetGame}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className="w-full flex flex-col flex-grow"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
