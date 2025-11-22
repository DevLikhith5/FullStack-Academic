import React from 'react';
import { Question, UserAnswer } from '../types';
import BrutalistButton from './BrutalistButton';
import { RefreshCw, List, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultsPageProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  onRetry: () => void;
  onReview: (filter: 'ALL' | 'INCORRECT') => void;
  onHome: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ questions, userAnswers, onRetry, onReview, onHome }) => {
  const correctCount = userAnswers.filter(a => a.isCorrect).length;
  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
  const hasIncorrect = correctCount < totalQuestions;

  let grade = '';
  let feedback = '';
  let colorClass = '';

  if (scorePercentage === 100) {
      grade = 'S';
      feedback = 'FLAWLESS VICTORY';
      colorClass = 'bg-brut-green';
  } else if (scorePercentage >= 80) {
      grade = 'A';
      feedback = 'EXCELLENT WORK';
      colorClass = 'bg-brut-cyan';
  } else if (scorePercentage >= 50) {
      grade = 'C';
      feedback = 'ACCEPTABLE';
      colorClass = 'bg-brut-orange';
  } else {
      grade = 'F';
      feedback = 'CRITICAL FAILURE';
      colorClass = 'bg-brut-red';
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto w-full flex flex-col gap-8 lg:gap-12">

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="border-4 border-black bg-white shadow-hard p-6 md:p-12 text-center relative overflow-hidden"
      >
         <div className={`absolute top-0 left-0 w-full h-4 ${colorClass}`}></div>

         <h2 className="text-xl md:text-2xl font-mono font-bold mb-4 text-gray-500">MISSION REPORT</h2>

         <div className="flex justify-center items-baseline gap-2 mb-2">
            <motion.span 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-7xl md:text-9xl lg:text-[10rem] font-black leading-none"
            >
                {correctCount}
            </motion.span>
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-400">/{totalQuestions}</span>
         </div>

         <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }}
            className={`inline-block px-4 py-2 border-2 border-black text-white font-bold uppercase text-xl lg:text-2xl mb-8 ${colorClass}`}
         >
            {feedback}
         </motion.div>

         <div className="grid grid-cols-2 gap-4 border-t-4 border-black pt-8">
            <div className="text-center">
                <p className="font-mono text-sm mb-1">GRADE</p>
                <motion.p 
                    initial={{ rotate: -10, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="text-4xl md:text-5xl lg:text-7xl font-black"
                >
                    {grade}
                </motion.p>
            </div>
            <div className="text-center">
                <p className="font-mono text-sm mb-1">ACCURACY</p>
                <p className="text-4xl md:text-5xl lg:text-7xl font-black">{scorePercentage}%</p>
            </div>
         </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <BrutalistButton onClick={onRetry} size="lg" variant="primary">
            <RefreshCw className="mr-2" />
            Restart Journey
        </BrutalistButton>
        <BrutalistButton onClick={onHome} size="lg" variant="secondary">
            Return to Base
        </BrutalistButton>
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="border-4 border-black p-6 lg:p-8 bg-gray-50"
      >
        <h3 className="text-2xl lg:text-3xl font-black uppercase mb-6 flex items-center gap-2">
            <List /> Review Path
        </h3>
        <div className="flex flex-col gap-4">
            <BrutalistButton onClick={() => onReview('ALL')} fullWidth variant="outline" className="bg-white">
                Review All Answers
            </BrutalistButton>

            {hasIncorrect ? (
                <BrutalistButton onClick={() => onReview('INCORRECT')} fullWidth variant="danger">
                    <AlertTriangle className="mr-2" />
                    Face Your Challenges ({totalQuestions - correctCount})
                </BrutalistButton>
            ) : (
                <div className="p-4 border-2 border-brut-green bg-green-50 text-brut-green font-bold text-center uppercase text-lg">
                    No Incorrect Answers to Review
                </div>
            )}
        </div>
      </motion.div>

    </div>
  );
};

export default ResultsPage;