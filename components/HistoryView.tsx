
import React, { useEffect } from 'react';
import { useGameStore } from '../store';
import BrutalistButton from './BrutalistButton';
import { ArrowLeft, Calendar, Target, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

const HistoryView: React.FC = () => {
  const { history, loadHistory, resetGame, user } = useGameStore();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <BrutalistButton onClick={resetGame} size="sm" variant="secondary">
            <ArrowLeft className="mr-2" size={16} /> RETURN TO BASE
        </BrutalistButton>
        <div className="text-right">
            <h2 className="text-2xl md:text-4xl font-black uppercase">Mission Archives</h2>
            <p className="font-mono text-sm text-gray-500">OPERATOR: {user?.name}</p>
        </div>
      </div>

      <div className="space-y-4">
        {history.length === 0 ? (
          <div className="border-4 border-black p-12 text-center bg-gray-100">
             <p className="text-2xl font-black text-gray-400">NO RECORDS FOUND</p>
             <p className="font-mono mt-2">COMPLETE MISSIONS TO POPULATE DATABASE</p>
          </div>
        ) : (
          history.map((entry, idx) => (
            <motion.div 
                key={entry.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-4 border-black bg-white shadow-hard p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4"
            >
               <div className="flex-1 w-full md:w-auto">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="bg-black text-white px-2 py-0.5 font-mono text-xs font-bold">
                        {new Date(entry.timestamp).toLocaleDateString()}
                     </span>
                     <span className={`px-2 py-0.5 border-2 border-black font-bold text-xs uppercase ${
                         entry.difficulty === 'Brutal' ? 'bg-brut-red text-white' : 'bg-gray-100'
                     }`}>
                        {entry.difficulty}
                     </span>
                  </div>
                  <h3 className="text-xl font-black uppercase truncate">{entry.topic}</h3>
               </div>

               <div className="flex gap-6 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-center">
                     <span className="block text-[10px] font-mono font-bold text-gray-500">SCORE</span>
                     <span className="text-2xl font-black flex items-center justify-center gap-1 text-brut-green">
                        <Target size={20} /> {entry.score}
                     </span>
                  </div>
                  <div className="text-center">
                     <span className="block text-[10px] font-mono font-bold text-gray-500">TOTAL</span>
                     <span className="text-2xl font-black flex items-center justify-center gap-1">
                        <Hash size={20} /> {entry.totalQuestions}
                     </span>
                  </div>
                  <div className="text-center">
                     <span className="block text-[10px] font-mono font-bold text-gray-500">GRADE</span>
                     <span className="text-2xl font-black text-brut-cyan">
                        {Math.round((entry.score / entry.totalQuestions) * 100)}%
                     </span>
                  </div>
               </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryView;
