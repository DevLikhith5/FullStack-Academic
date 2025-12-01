import React from 'react';
import BrutalistButton from './BrutalistButton';
import { Check, X, ArrowLeft } from 'lucide-react';


const ReviewList = ({ questions, userAnswers, filter, onBack }) => {
  const filteredData = userAnswers.map(ans => {
    const question = questions.find(q => q.id === ans.questionId);
    return { answer: ans, question };
  }).filter(item => {
    if (filter === 'INCORRECT') return !item.answer.isCorrect;
    return true;
  });

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
            <BrutalistButton onClick={onBack} size="sm" variant="secondary">
                <ArrowLeft className="mr-2" size={16} /> Back to Results
            </BrutalistButton>
            <h2 className="text-2xl md:text-4xl font-black uppercase">
                {filter === 'INCORRECT' ? 'Incorrect Answers' : 'Full Review'}
            </h2>
        </div>

        <div className="space-y-8">
            {filteredData.map(({ answer, question }, idx) => {
                if (!question) return null;
                return (
                    <div key={idx} className={`border-4 border-black p-6 lg:p-8 shadow-hard bg-white relative ${!answer.isCorrect ? 'border-b-8 border-b-brut-red' : 'border-b-8 border-b-brut-green'}`}>
                         <div className="absolute -top-3 -left-3 bg-black text-white px-3 py-1 font-mono text-xs">
                            #{idx + 1}
                         </div>

                         <h3 className="text-xl md:text-2xl font-bold uppercase mb-6 mt-2">{question.text}</h3>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="p-4 border-2 border-black bg-gray-50">
                                <span className="block text-xs font-mono text-gray-500 mb-1">YOUR ANSWER</span>
                                <div className="flex items-center gap-2 font-bold text-lg">
                                    {answer.isCorrect ? <Check className="text-brut-green"/> : <X className="text-brut-red"/>}
                                    <span className={answer.isCorrect ? 'text-brut-green' : 'text-brut-red'}>
                                        {answer.selectedAnswer}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 border-2 border-black bg-brut-green/10">
                                <span className="block text-xs font-mono text-gray-500 mb-1">CORRECT ANSWER</span>
                                <div className="flex items-center gap-2 font-bold text-black text-lg">
                                    <Check className="text-black" size={16}/>
                                    {question.correctAnswer}
                                </div>
                            </div>
                         </div>

                         <div className="bg-black text-white p-4 font-mono text-sm lg:text-base">
                            <span className="text-brut-cyan font-bold mr-2"> INFO:</span>
                            {question.explanation}
                         </div>
                    </div>
                );
            })}

            {filteredData.length === 0 && (
                 <div className="p-12 text-center border-4 border-black border-dashed">
                    <p className="text-2xl font-bold text-gray-400">NO ENTRIES FOUND</p>
                 </div>
            )}
        </div>

        <div className="mt-8 flex justify-center">
             <BrutalistButton onClick={onBack} fullWidth size="lg">CONTINUE</BrutalistButton>
        </div>
    </div>
  );
};

export default ReviewList;