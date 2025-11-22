import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [text, setText] = useState("INITIALIZING");

  useEffect(() => {
    const texts = ["INITIALIZING", "ESTABLISHING UPLINK", "GENERATING ENTITIES", "CALIBRATING LOGIC", "PREPARING TREK"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setText(texts[i]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full p-8">
      <div className="relative">
        <Zap size={80} className="animate-pulse text-brut-black mb-8" />
      </div>
      
      <div className="border-4 border-black p-8 bg-brut-cyan shadow-hard max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-white animate-[ping_1s_ease-in-out_infinite]"></div>
        <h2 className="text-2xl font-black uppercase mb-2">System Busy</h2>
        <p className="font-mono font-bold text-lg">{text}...</p>
      </div>

      <div className="mt-8 flex gap-2">
        <div className="w-4 h-4 bg-black animate-bounce delay-0"></div>
        <div className="w-4 h-4 bg-black animate-bounce delay-100"></div>
        <div className="w-4 h-4 bg-black animate-bounce delay-200"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
