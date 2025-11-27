
import React from 'react';
import { useGameStore } from '../store';
import { LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const { resetGame, user, logout, view } = useGameStore();

  const handleTitleClick = () => {
    if (user) {
      resetGame();
    }
  };

  const ConstructionBanner = () => (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 1 }}
      className="w-full relative z-50 flex flex-col items-center pointer-events-none"
    >
      {/* Chains */}
      <div className="flex gap-32 mb-[-5px]">
        <div className="w-2 h-16 bg-gradient-to-b from-gray-800 to-gray-600 border-x-2 border-black relative">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-4 h-3 border-2 border-black rounded-full absolute left-1/2 -translate-x-1/2" style={{ top: i * 10 }} />
          ))}
        </div>
        <div className="w-2 h-16 bg-gradient-to-b from-gray-800 to-gray-600 border-x-2 border-black relative">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-4 h-3 border-2 border-black rounded-full absolute left-1/2 -translate-x-1/2" style={{ top: i * 10 }} />
          ))}
        </div>
      </div>

      {/* Sign */}
      <motion.div
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="bg-brut-orange border-4 border-black p-4 shadow-hard flex flex-col items-center relative overflow-hidden pointer-events-auto"
      >
        {/* Stripes */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)' }}
        />

        <div className="relative z-10 text-center">
          <h3 className="font-black text-2xl uppercase leading-none mb-1">Warning</h3>
          <div className="bg-black text-white px-2 py-1 font-mono font-bold text-sm">
            NO BACKEND DETECTED
          </div>
          <p className="font-bold text-xs mt-1">CLIENT-SIDE OPERATIONS ONLY</p>
        </div>

        {/* Bolts */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-gray-400 border-2 border-black rounded-full" />
        <div className="absolute top-2 right-2 w-3 h-3 bg-gray-400 border-2 border-black rounded-full" />
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-gray-400 border-2 border-black rounded-full" />
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-gray-400 border-2 border-black rounded-full" />
      </motion.div>
    </motion.div>
  );

  const containerRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
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
            <img
              src="/logo.png"
              alt="TriviaTrek Logo"
              className="w-8 h-8 md:w-10 md:h-10 object-contain border-2 border-black group-hover:rotate-12 transition-transform duration-300 bg-white"
            />
            <motion.h1
              className="text-2xl md:text-4xl font-black tracking-tighter uppercase flex"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {Array.from("TriviaTrek").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="group-hover:text-brut-red transition-colors"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
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
        <main
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="flex-grow flex flex-col relative overflow-hidden"
        >
          {/* Spotlight & Grid Background */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
              }}
            />
            {/* Spotlight Gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 174, 239, 0.15), transparent 40%)`,
              }}
            />
          </div>

          {(view === 'LANDING' || view === 'AUTH') && <ConstructionBanner />}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
