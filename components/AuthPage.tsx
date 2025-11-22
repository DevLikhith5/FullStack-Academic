
import React, { useState } from 'react';
import { useGameStore } from '../store';
import { Github, Globe, Lock, UserPlus, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthPage: React.FC = () => {
  const { login } = useGameStore();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const handleAuth = (provider: 'google' | 'github') => {
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      const mockUser = {
        id: `${provider}-${Date.now()}`,
        name: `${provider === 'google' ? 'Google' : 'GitHub'} Agent`,
        email: `agent@${provider}.com`,
        provider: provider
      };
      
      login(mockUser);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 md:p-8 w-full">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md flex flex-col"
      >
        {/* Tabs */}
        <div className="flex w-full z-10">
            <button 
                onClick={() => setMode('signin')}
                className={`flex-1 border-4 border-black p-4 font-black text-xl uppercase transition-all flex items-center justify-center gap-2 relative 
                ${mode === 'signin' 
                    ? 'bg-white text-black border-b-0 top-1 pb-5 z-20' 
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300 border-b-4 top-1 z-0'}`}
            >
                <LogIn size={20} />
                Sign In
            </button>
            <button 
                onClick={() => setMode('signup')}
                className={`flex-1 border-4 border-black border-l-0 p-4 font-black text-xl uppercase transition-all flex items-center justify-center gap-2 relative 
                ${mode === 'signup' 
                    ? 'bg-white text-black border-b-0 top-1 pb-5 z-20' 
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300 border-b-4 top-1 z-0'}`}
            >
                <UserPlus size={20} />
                Sign Up
            </button>
        </div>

        {/* Main Card */}
        <div className="border-4 border-black bg-white p-8 md:p-12 flex flex-col gap-8 text-center relative z-10 shadow-hard">
            <div>
                <div className={`w-20 h-20 bg-white text-black flex items-center justify-center mx-auto mb-6 border-4 border-black shadow-[4px_4px_0px_0px_#000000] transition-colors duration-300 ${mode === 'signup' ? 'bg-brut-cyan' : 'bg-brut-green'}`}>
                    {mode === 'signin' ? <Lock size={40} /> : <UserPlus size={40} />}
                </div>
                <h2 className="text-3xl font-black uppercase leading-none mb-2">
                    {mode === 'signin' ? 'Welcome Back' : 'New Operator'}
                </h2>
                <p className="font-mono font-bold text-gray-500">
                    {mode === 'signin' ? 'ESTABLISH UPLINK' : 'INITIALIZE PROTOCOL'}
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <button 
                    onClick={() => handleAuth('google')}
                    disabled={isLoading}
                    className="group relative w-full border-4 border-black p-4 flex items-center justify-center gap-3 font-black text-xl hover:bg-brut-red hover:text-white transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[4px_4px_0px_0px_#000000] bg-white"
                >
                    <Globe size={24} />
                    <span>{mode === 'signin' ? 'LOGIN WITH GOOGLE' : 'JOIN WITH GOOGLE'}</span>
                </button>

                <button 
                    onClick={() => handleAuth('github')}
                    disabled={isLoading}
                    className="group relative w-full border-4 border-black bg-black text-white p-4 flex items-center justify-center gap-3 font-black text-xl hover:bg-gray-800 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[4px_4px_0px_0px_#888]"
                >
                    <Github size={24} />
                    <span>{mode === 'signin' ? 'LOGIN WITH GITHUB' : 'JOIN WITH GITHUB'}</span>
                </button>
            </div>

            <div className="font-mono text-xs text-gray-400 mt-4">
                {mode === 'signin' 
                    ? 'SECURE CONNECTION RE-ESTABLISHED' 
                    : 'NEW CREDENTIALS WILL BE MINTED'}
            </div>

        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
