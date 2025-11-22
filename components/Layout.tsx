
import React from 'react';
import { useGameStore } from '../store';
import { LogOut, User } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resetGame, user, logout } = useGameStore();

  const handleTitleClick = () => {
    if (user) {
        resetGame();
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-brut-cyan selection:text-black overflow-x-hidden">
      <div className="w-full max-w-[1920px] mx-auto min-h-screen border-x-0 md:border-x-4 border-black flex flex-col">
        {/* Header Bar */}
        <header className="border-b-4 border-black p-4 md:p-6 bg-white flex justify-between items-center sticky top-0 z-20">
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={handleTitleClick}
              title="Return to Base"
            >
                <div className="w-6 h-6 md:w-8 md:h-8 bg-brut-red border-2 border-black group-hover:rotate-45 transition-transform duration-300"></div>
                <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase group-hover:text-brut-red transition-colors">TriviaTrek</h1>
            </div>
            
            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end mr-2">
                            <span className="text-[10px] font-mono font-bold leading-none text-gray-500">OPERATOR</span>
                            <span className="font-bold uppercase leading-none">{user.name}</span>
                        </div>
                        <div className="w-10 h-10 border-2 border-black bg-gray-100 flex items-center justify-center">
                             <User size={20} />
                        </div>
                        <button 
                            onClick={logout}
                            className="bg-black text-white p-2 border-2 border-black hover:bg-brut-red hover:border-brut-red transition-colors"
                            title="Disconnect"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="hidden md:flex gap-2">
                        <div className="w-5 h-5 bg-black"></div>
                        <div className="w-5 h-5 bg-brut-cyan border-2 border-black"></div>
                        <div className="w-5 h-5 bg-white border-2 border-black"></div>
                    </div>
                )}
            </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col relative overflow-hidden">
            {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
