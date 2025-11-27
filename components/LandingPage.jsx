


import BrutalistButton from './BrutalistButton';
import { Zap, Globe, Cpu, BookOpen, Palette, Play, Music, Trophy, Map, Settings, Film, PenTool, Archive } from 'lucide-react';
import { useGameStore } from '../store';
import { playSound } from '../utils/sound';
import { motion, AnimatePresence } from 'framer-motion';

const TOPICS = [
  "Science",
  "History",
  "Tech",
  "Arts",
  "Music",
  "Sports",
  "Geography",
  "Movies",
];


const LandingPage = () => {
  const { config, setPendingConfig, startGame, setView } = useGameStore();

  const handleStart = () => {
    playSound('start');
    startGame();
  };

  const getIcon = (topic) => {
    switch (topic) {
      case 'Science': return <Zap size={20} />;
      case 'History': return <BookOpen size={20} />;
      case 'Tech': return <Cpu size={20} />;
      case 'Arts': return <Palette size={20} />;
      case 'Music': return <Music size={20} />;
      case 'Sports': return <Trophy size={20} />;
      case 'Geography': return <Map size={20} />;
      case 'Movies': return <Film size={20} />;
      case 'Custom': return <PenTool size={20} />;
      default: return <Globe size={20} />;
    }
  };

  const difficulties = ['Easy', 'Medium', 'Hard', 'Brutal'];
  const counts = [5, 10, 15, 20];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 10 } }
  };



  const FloatingIcon = ({ children, delay, duration, top, left, right, bottom }) => (
    <motion.div
      animate={{ y: [-15, 15, -15], rotate: [0, 5, -5, 0] }}
      transition={{ duration: duration, repeat: Infinity, ease: "easeInOut", delay: delay }}
      className="absolute opacity-10 pointer-events-none z-0"
      style={{ top, left, right, bottom }}
    >
      {children}
    </motion.div>
  );

  const GlitchText = ({ text }) => (
    <div className="relative inline-block">
      <motion.span
        className="absolute top-0 left-0 -z-10 text-brut-red opacity-70"
        animate={{ x: [-2, 2, -1, 0], y: [1, -1, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatType: "mirror", repeatDelay: 2 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-brut-cyan opacity-70"
        animate={{ x: [2, -2, 1, 0], y: [-1, 1, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatType: "mirror", repeatDelay: 3 }}
      >
        {text}
      </motion.span>
      <span className="relative z-10">{text}</span>
    </div>
  );



  return (
    <div
      className="relative flex flex-col flex-grow p-4 md:p-12 bg-transparent overflow-hidden"
    >

      <div className="relative z-10 flex flex-col gap-8 md:gap-12 w-full">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-0 border-4 border-black shadow-hard bg-white"
        >
          <div className="col-span-12 md:col-span-8 p-6 md:p-12 flex flex-col justify-center border-b-4 md:border-b-0 md:border-r-4 border-black">
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] mb-6">
              Journey Through a{' '}
              <span className="relative px-2 inline-block">
                <motion.span
                  className="absolute inset-0 bg-brut-cyan"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: "circOut", delay: 0.4 }}
                  style={{ originX: 0, zIndex: 0 }}
                />
                <span className="relative z-10 text-white">
                  <GlitchText text="World" />
                </span>
              </span>{' '}
              of Questions
            </h2>

            {/* Animated Vertical Line Container */}
            <div className="flex mb-8 max-w-lg items-stretch">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.8, ease: "circOut", delay: 0.6 }}
                className="w-1 bg-brut-orange mr-4 flex-shrink-0"
              />
              <p className="text-xl md:text-2xl font-bold">
                Test your knowledge. No mercy. Pure facts.
              </p>
            </div>

            <div className="mt-4">
              <BrutalistButton
                onClick={() => setView('HISTORY')}
                variant="outline"
                size="sm"
                className="bg-white hover:bg-gray-100"
              >
                <Archive className="mr-2" size={18} /> VIEW MISSION ARCHIVES
              </BrutalistButton>
            </div>

          </div>
          <div className="col-span-12 md:col-span-4 bg-brut-black text-white p-6 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-10 -right-10 p-4 opacity-20 pointer-events-none">
              <Zap size={180} strokeWidth={1} />
            </div>
            <div className="z-10">
              <p className="font-mono text-sm mb-2">STATUS</p>
              <motion.p
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-4xl font-black text-brut-green"
              >
                ONLINE
              </motion.p>
            </div>
            <div className="z-10 mt-8">
              <p className="font-mono text-sm mb-2">SYSTEM</p>
              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xl font-bold"
              >
                READY FOR INPUT
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Configuration Panel */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* Topic Selector */}
            <motion.div variants={item} className="border-4 border-black p-6 bg-white shadow-hard">
              <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2 flex items-center gap-2">
                <Globe /> Select Topic
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPendingConfig({ topic: 'All' })}
                  className={`p-3 border-2 border-black font-bold uppercase text-sm flex flex-col items-center justify-center gap-2 transition-colors ${config.topic === 'All' ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'}`}
                >
                  <Globe size={24} />
                  All Topics
                </motion.button>
                {TOPICS.map((topic) => (
                  <motion.button
                    key={topic}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPendingConfig({ topic })}
                    className={`p-3 border-2 border-black font-bold uppercase text-sm flex flex-col items-center justify-center gap-2 transition-colors ${config.topic === topic ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'}`}
                  >
                    {getIcon(topic)}
                    {topic}
                  </motion.button>
                ))}
                {/* Custom Topic Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPendingConfig({ topic: 'Custom' })}
                  className={`p-3 border-2 border-black font-bold uppercase text-sm flex flex-col items-center justify-center gap-2 transition-colors ${config.topic === 'Custom' ? 'bg-brut-orange text-black' : 'bg-white hover:bg-brut-orange hover:text-black'}`}
                >
                  <PenTool size={24} />
                  Custom
                </motion.button>
              </div>

              {/* Custom Topic Input Field - Animated expansion */}
              <AnimatePresence>
                {config.topic === 'Custom' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-4 border-black p-4 bg-brut-orange/20">
                      <label className="block font-mono font-bold mb-2 text-sm uppercase">
                        Enter Custom Instructions / Topic:
                      </label>
                      <textarea
                        className="w-full border-4 border-black p-4 font-bold text-lg uppercase focus:outline-none focus:bg-black focus:text-white transition-colors placeholder:text-gray-400 resize-none h-32"
                        placeholder="E.G. '80S HAIR METAL BANDS' OR 'QUANTUM PHYSICS FOR TODDLERS'"
                        value={config.customTopic || ''}
                        onChange={(e) => setPendingConfig({ customTopic: e.target.value })}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Difficulty Selector */}
              <motion.div variants={item} className="border-4 border-black p-6 bg-white shadow-hard">
                <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2 flex items-center gap-2">
                  <Settings /> Difficulty
                </h3>
                <div className="flex flex-col gap-2">
                  {difficulties.map(diff => (
                    <motion.button
                      key={diff}
                      whileHover={{ x: 10 }}
                      onClick={() => setPendingConfig({ difficulty: diff })}
                      className={`p-3 border-2 border-black font-bold uppercase text-left flex justify-between items-center transition-colors ${config.difficulty === diff ? 'bg-brut-orange text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-white'}`}
                    >
                      {diff}
                      {config.difficulty === diff && <div className="w-3 h-3 bg-black"></div>}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Count Selector */}
              <motion.div variants={item} className="border-4 border-black p-6 bg-white shadow-hard">
                <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2 flex items-center gap-2">
                  <Zap /> Quantity
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {counts.map(num => (
                    <motion.button
                      key={num}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setPendingConfig({ questionCount: num })}
                      className={`p-4 border-2 border-black font-black text-2xl transition-colors ${config.questionCount === num ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'}`}
                    >
                      {num}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Launch Pad */}
          <motion.div variants={item} className="lg:col-span-4 flex flex-col">
            <div className="bg-brut-cyan border-4 border-black p-6 md:p-8 mb-8 shadow-hard flex-grow">
              <p className="font-mono text-lg mb-4 font-bold border-b-2 border-black pb-2">MISSION CONFIG:</p>
              <ul className="font-bold text-xl space-y-4">
                <li className="flex justify-between">
                  <span>TOPIC:</span>
                  <span className="uppercase truncate max-w-[120px]">
                    {config.topic === 'Custom' ? 'CUSTOM' : config.topic}
                  </span>
                </li>
                {config.topic === 'Custom' && (
                  <li className="flex flex-col border-t-2 border-black pt-2">
                    <span className="text-xs font-mono">CUSTOM DETAILS:</span>
                    <span className="uppercase text-sm leading-tight line-clamp-2 italic">
                      {config.customTopic || "PENDING INPUT..."}
                    </span>
                  </li>
                )}
                <li className="flex justify-between">
                  <span>MODE:</span>
                  <span className="uppercase">{config.difficulty}</span>
                </li>
                <li className="flex justify-between">
                  <span>LENGTH:</span>
                  <span>{config.questionCount} Qs</span>
                </li>
              </ul>
            </div>
            <BrutalistButton
              size="xl"
              fullWidth
              onClick={handleStart}
              disabled={config.topic === 'Custom' && (!config.customTopic || config.customTopic.trim() === '')}
              className="group py-8"
            >
              <span className="mr-4">INITIATE</span>
              <Play className="inline-block group-hover:translate-x-2 transition-transform" fill="currentColor" />
            </BrutalistButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
