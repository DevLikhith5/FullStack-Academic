
import React, { useEffect, useState, useRef } from 'react';

import { QUESTION_TIMER_SECONDS } from '../constants';
import BrutalistButton from './BrutalistButton';
import { Clock, Target, Check, X, LogOut } from 'lucide-react';
import { useGameStore } from '../store';
import { playSound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';

const QuizEngine = () => {
    const { questions, currentQuestionIndex, config, answerQuestion, nextQuestion, resetGame } = useGameStore();

    const currentQuestion = questions[currentQuestionIndex];

    const [timer, setTimer] = useState(QUESTION_TIMER_SECONDS);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswerLocked, setIsAnswerLocked] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState([]);


    const processedAnswerRef = useRef(null);


    useEffect(() => {
        if (currentQuestion) {
            setShuffledOptions([...currentQuestion.options].sort(() => Math.random() - 0.5));
            setTimer(QUESTION_TIMER_SECONDS);
            setIsAnswerLocked(false);
            setSelectedOption(null);
            processedAnswerRef.current = null;
        }
    }, [currentQuestion]);


    useEffect(() => {
        if (isAnswerLocked) return;

        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
                if (timer <= 5) {
                    playSound('tick');
                }
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {

            handleAnswerSubmit(null);
        }
    }, [timer, isAnswerLocked]);

    const handleAnswerSubmit = (option) => {
        if (isAnswerLocked || processedAnswerRef.current !== null) return;

        setIsAnswerLocked(true);
        setSelectedOption(option);
        processedAnswerRef.current = option || 'TIMEOUT';

        const isCorrect = option === currentQuestion.correctAnswer;

        if (isCorrect) {
            playSound('correct');
        } else {
            playSound('incorrect');
        }

        const newAnswer = {
            questionId: currentQuestion.id,
            selectedAnswer: option || 'TIMEOUT',
            isCorrect: isCorrect,
            timeSpent: QUESTION_TIMER_SECONDS - timer
        };


        setTimeout(() => {
            answerQuestion(newAnswer);

            const totalQuestions = questions.length;
            const answeredCount = useGameStore.getState().userAnswers.length;

            if (answeredCount < totalQuestions) {
                nextQuestion();
            } else {
                playSound('finish');
            }

        }, 1500);
    };


    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;


    const currentScore = useGameStore(state => state.score);


    const displayTopic = config.topic === 'Custom' && config.customTopic
        ? config.customTopic
        : config.topic;

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="flex flex-col h-full p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto w-full gap-6 md:gap-10">

            {/* Header with Exit Button */}
            <div className="flex justify-end">
                <BrutalistButton
                    onClick={resetGame}
                    variant="outline"
                    className="border-2 h-10 text-sm px-4 hover:bg-brut-red hover:text-white hover:border-black"
                >
                    <LogOut size={16} className="mr-2" /> EXIT QUIZ
                </BrutalistButton>
            </div>

            {/* HUD */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b-4 border-black pb-6">
                <div className="border-4 border-black p-3 bg-white shadow-hard-sm flex flex-col justify-center items-center relative overflow-hidden">
                    <span className="text-xs font-mono font-bold mb-1 block">TOPIC</span>
                    <span className="text-xl md:text-2xl font-black uppercase truncate w-full text-center z-10 relative" title={displayTopic}>
                        {displayTopic}
                    </span>
                    {/* Background pattern for Custom */}
                    {config.topic === 'Custom' && (
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]"></div>
                    )}
                </div>
                <div className="border-4 border-black p-3 bg-white shadow-hard-sm flex flex-col justify-center items-center relative overflow-hidden">
                    <span className="text-xs font-mono font-bold mb-1 block z-10">TIME LEFT</span>
                    <div className="flex items-center gap-2 z-10">
                        <Clock size={24} />
                        <motion.span
                            key={timer}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className={`text-3xl md:text-4xl font-black ${timer < 5 ? 'text-brut-red' : 'text-black'}`}
                        >
                            {timer < 10 ? `0${timer}` : timer}
                        </motion.span>
                    </div>
                    {/* Timer Bar Background */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-2 bg-brut-red"
                        initial={{ width: "100%" }}
                        animate={{ width: `${(timer / QUESTION_TIMER_SECONDS) * 100}%` }}
                        transition={{ duration: 1, ease: "linear" }}
                    ></motion.div>
                </div>
                <div className="border-4 border-black p-3 bg-white shadow-hard-sm flex flex-col justify-center items-center">
                    <span className="text-xs font-mono font-bold mb-1 block">PROGRESS</span>
                    <span className="text-xl md:text-2xl font-black">{currentQuestionIndex + 1} / {questions.length}</span>
                </div>
                <div className="border-4 border-black p-3 bg-white shadow-hard-sm flex flex-col justify-center items-center">
                    <span className="text-xs font-mono font-bold mb-1 block">SCORE</span>
                    <motion.span
                        key={currentScore}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-xl md:text-2xl font-black"
                    >
                        {currentScore * 100}
                    </motion.span>
                </div>
            </div>

            {/* Question Area */}
            <div className="flex-grow flex flex-col justify-center relative overflow-hidden min-h-[400px] p-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="w-full"
                    >
                        <div className="border-4 border-black bg-white p-6 md:p-12 lg:p-16 mb-8 lg:mb-12 shadow-hard relative">
                            <div className="absolute -top-4 -left-4 bg-black text-white px-4 py-1 font-mono text-sm border-2 border-white">
                                QUERY_ID: {currentQuestion.id.toUpperCase().slice(-6)}
                            </div>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase leading-tight">
                                {currentQuestion.text}
                            </h2>
                        </div>

                        {/* Answers Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                            {shuffledOptions.map((option, idx) => {
                                let variant = 'primary';

                                if (isAnswerLocked) {
                                    if (option === currentQuestion.correctAnswer) {
                                        variant = 'success';
                                    } else if (option === selectedOption) {
                                        variant = 'danger';
                                    } else {
                                        variant = 'outline';
                                    }
                                }

                                return (
                                    <BrutalistButton
                                        key={`${currentQuestion.id}-${idx}`}
                                        variant={variant}
                                        onClick={() => handleAnswerSubmit(option)}
                                        disabled={isAnswerLocked}
                                        className={`h-24 md:h-32 lg:h-40 text-lg md:text-xl lg:text-2xl leading-none flex justify-between items-center px-8 lg:px-12 ${isAnswerLocked && variant === 'outline' ? 'opacity-40 border-2' : 'border-4'}`}
                                    >
                                        <span className="text-left">{option}</span>
                                        {isAnswerLocked && option === currentQuestion.correctAnswer &&
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                <Check size={32} className="lg:w-12 lg:h-12" />
                                            </motion.div>
                                        }
                                        {isAnswerLocked && option === selectedOption && option !== currentQuestion.correctAnswer &&
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                <X size={32} className="lg:w-12 lg:h-12" />
                                            </motion.div>
                                        }
                                    </BrutalistButton>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Global Progress Bar */}
            <div className="h-4 lg:h-6 border-4 border-black w-full bg-gray-200">
                <motion.div
                    className="h-full bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                ></motion.div>
            </div>

        </div>
    );
};

export default QuizEngine;
