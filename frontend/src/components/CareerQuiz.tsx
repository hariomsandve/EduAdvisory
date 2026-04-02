import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Cpu, Users, PenTool, ArrowLeft, ArrowRight, Star, Zap, Trophy, Target, BrainCircuit, Rocket, CheckCircle, ArrowUp } from 'lucide-react';

// 15 Questions
const quizQuestions = [
  {
    id: 1, question: "1. Do you feel more energized when working…",
    options: [{ text: 'With data & ideas', type: 'analytical' }, { text: 'Designing things', type: 'creative' }, { text: 'With people', type: 'social' }, { text: 'With hands/tools', type: 'hands-on' }]
  },
  {
    id: 2, question: "2. When faced with a difficult problem, you rely on…",
    options: [{ text: 'Step-by-step logic', type: 'analytical' }, { text: 'Intuition & Art', type: 'creative' }, { text: 'Group discussion', type: 'social' }, { text: 'Trial & error', type: 'hands-on' }]
  },
  {
    id: 3, question: "3. Do you prefer working…",
    options: [{ text: 'Independently', type: 'analytical' }, { text: 'In a creative flow', type: 'creative' }, { text: 'In a team', type: 'social' }, { text: 'Out in the field', type: 'hands-on' }]
  },
  {
    id: 4, question: "4. What motivates you more?",
    options: [{ text: 'Earning money', type: 'analytical' }, { text: 'Building the new', type: 'creative' }, { text: 'Helping others', type: 'social' }, { text: 'Recognition', type: 'hands-on' }]
  },
  {
    id: 5, question: "5. When making decisions, you trust…",
    options: [{ text: 'Facts & analysis', type: 'analytical' }, { text: 'Creative vision', type: 'creative' }, { text: 'Feelings & values', type: 'social' }, { text: 'Practical tests', type: 'hands-on' }]
  },
  {
    id: 6, question: "6. Do you like…",
    options: [{ text: 'Advance Planning', type: 'analytical' }, { text: 'Going with flow', type: 'creative' }, { text: 'Group consensus', type: 'social' }, { text: 'Adapting on fly', type: 'hands-on' }]
  },
  {
    id: 7, question: "7. For your career, what do you prefer?",
    options: [{ text: 'Stability & Security', type: 'analytical' }, { text: 'Creative Risk', type: 'creative' }, { text: 'Growth w/ Balance', type: 'social' }, { text: 'Tangible Results', type: 'hands-on' }]
  },
  {
    id: 8, question: "8. Would you rather…",
    options: [{ text: 'Improve systems', type: 'analytical' }, { text: 'Invent solutions', type: 'creative' }, { text: 'Coach others', type: 'social' }, { text: 'Build prototypes', type: 'hands-on' }]
  },
  {
    id: 9, question: "9. Do you enjoy expressing yourself more through…",
    options: [{ text: 'Numbers & Code', type: 'analytical' }, { text: 'Art & Writing', type: 'creative' }, { text: 'Speaking/Debate', type: 'social' }, { text: 'Crafting/Making', type: 'hands-on' }]
  },
  {
    id: 10, question: "10. Are you more interested in…",
    options: [{ text: 'Data & Software', type: 'analytical' }, { text: 'Media & Design', type: 'creative' }, { text: 'Human Behavior', type: 'social' }, { text: 'Machines/Systems', type: 'hands-on' }]
  },
  {
    id: 11, question: "11. Which do you enjoy more?",
    options: [{ text: 'Logical puzzles', type: 'analytical' }, { text: 'Designing things', type: 'creative' }, { text: 'Social issues', type: 'social' }, { text: 'Physical tasks', type: 'hands-on' }]
  },
  {
    id: 12, question: "12. Do you enjoy…",
    options: [{ text: 'Organizing data', type: 'analytical' }, { text: 'Brainstorming', type: 'creative' }, { text: 'Leading a group', type: 'social' }, { text: 'Supporting roles', type: 'hands-on' }]
  },
  {
    id: 13, question: "13. Which attracts you more?",
    options: [{ text: 'Complex theories', type: 'analytical' }, { text: 'Abstract ideas', type: 'creative' }, { text: 'Team synergy', type: 'social' }, { text: 'Practical hands-on', type: 'hands-on' }]
  },
  {
    id: 14, question: "14. Do you often…",
    options: [{ text: 'Prefer structure', type: 'analytical' }, { text: 'Get creative ideas', type: 'creative' }, { text: 'Help your friends', type: 'social' }, { text: 'Fix broken things', type: 'hands-on' }]
  },
  {
    id: 15, question: "15. In a project, your natural role is…",
    options: [{ text: 'Problem-solver', type: 'analytical' }, { text: 'Creator', type: 'creative' }, { text: 'Motivator', type: 'social' }, { text: 'Organizer', type: 'hands-on' }]
  }
];

// --- SLEEK MODERN PLAYER AVATAR ---
const ModernPlayer = ({ facingRight, isJumping }: { facingRight: boolean, isJumping: boolean }) => (
  <div className="relative w-12 h-16 transition-transform duration-75 drop-shadow-lg" style={{ transform: `scaleX(${facingRight ? 1 : -1}) ${isJumping ? 'translateY(-4px)' : ''}` }}>
    {/* Jetpack Spark */}
    {isJumping && <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-sm animate-pulse"></div>}
    
    {/* Body */}
    <div className="absolute bottom-0 w-12 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-b-2xl shadow-inner flex justify-center items-center">
       <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
         <Zap size={12} className="text-white opacity-80" />
       </div>
    </div>
    
    {/* Head */}
    <div className="absolute top-0 w-12 h-8 bg-white rounded-t-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex justify-center items-center overflow-hidden z-10">
      <div className="w-8 h-4 bg-gray-900 rounded-full flex items-center justify-end px-1 border-2 border-gray-100 shadow-inner">
        <div className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,1)] animate-pulse"></div>
      </div>
    </div>
  </div>
);

// --- MODERN CLOUD COMPONENT ---
const ModernCloud = ({ delay, yOffset, speed, scale = 1 }: { delay: number, yOffset: string, speed: number, scale?: number }) => (
  <motion.div 
    initial={{ x: '-20vw' }} 
    animate={{ x: '120vw' }} 
    transition={{ repeat: Infinity, duration: speed, ease: 'linear', delay: delay }}
    className={`absolute ${yOffset} z-0 opacity-70`}
    style={{ transform: `scale(${scale})` }}
  >
    <div className="relative w-40 h-12 bg-white/60 backdrop-blur-md rounded-full shadow-sm">
      <div className="absolute -top-6 left-6 w-20 h-20 bg-white/60 backdrop-blur-md rounded-full"></div>
      <div className="absolute -top-3 left-20 w-16 h-16 bg-white/60 backdrop-blur-md rounded-full"></div>
    </div>
  </motion.div>
);

interface CareerQuizProps {
  userData?: any;
  onComplete?: (results: any) => void;
  onSkip?: () => void;
}

export default function CareerQuiz({ onComplete, onSkip }: CareerQuizProps) {
  const [step, setStep] = useState<'intro' | 'game' | 'result'>('intro');
  const [playerAnswers, setPlayerAnswers] = useState<string[]>([]);
  const [hitBlock, setHitBlock] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const marioContainerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const hitBlockRef = useRef<number | null>(null);
  const [facingRight, setFacingRight] = useState(true);
  const [isJumping, setIsJumping] = useState(false);
  
  const physics = useRef({ x: 50, y: 0, vx: 0, vy: 0, isJumping: false, facingRight: true });
  const keys = useRef({ left: false, right: false, jump: false });

  useEffect(() => {
    if (step !== 'game') return;

    const updatePhysics = (time?: number) => {
      const p = physics.current;
      const k = keys.current;

      if (hitBlockRef.current === null) {
        if (k.right) { p.vx = 7; p.facingRight = true; } 
        else if (k.left) { p.vx = -7; p.facingRight = false; } 
        else { p.vx = 0; }

        if (k.jump && !p.isJumping) {
          p.vy = 20; 
          p.isJumping = true;
        }
      } else {
        p.vx = 0; 
      }

      p.vy -= 1.2; // Gravity
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = 0;
      if (p.x > window.innerWidth - 48) p.x = window.innerWidth - 48;

      if (p.y <= 0) {
        p.y = 0;
        p.vy = 0;
        p.isJumping = false;
      }

      const hitBoxBottom = 160; 
      const marioHead = p.y + 64; 

      if (p.vy > 0 && marioHead >= hitBoxBottom && marioHead <= hitBoxBottom + 20) {
        const blockCenters = [0.15, 0.35, 0.55, 0.75].map(pct => window.innerWidth * pct);
        
        blockCenters.forEach((center, index) => {
          const blockLeft = center - 50; 
          const blockRight = center + 50;
          const marioLeft = p.x;
          const marioRight = p.x + 48; 

          if (marioRight > blockLeft && marioLeft < blockRight && hitBlockRef.current === null) {
            p.vy = -5; // Bounce off block
            handleBlockHit(index);
          }
        });
      }

      if (marioContainerRef.current) {
        marioContainerRef.current.style.transform = `translate(${p.x}px, ${-p.y}px)`;
        setFacingRight(p.facingRight);
        setIsJumping(p.isJumping);
      }

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [step]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'd') keys.current.right = true;
      if (e.key === 'ArrowLeft' || e.key === 'a') keys.current.left = true;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') keys.current.jump = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'd') keys.current.right = false;
      if (e.key === 'ArrowLeft' || e.key === 'a') keys.current.left = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') keys.current.jump = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleBlockHit = (index: number) => {
    hitBlockRef.current = index;
    setHitBlock(index);
    setScore(prev => prev + 250);

    setPlayerAnswers(prev => {
      const currentLevel = prev.length;
      const type = quizQuestions[currentLevel].options[index].type;
      const newAnswers = [...prev, type];
      
      setTimeout(() => {
        if (currentLevel < quizQuestions.length - 1) {
          setHitBlock(null);
          hitBlockRef.current = null;
          physics.current.x = 50; 
        } else {
          setStep('result');
        }
      }, 1000); 
      
      return newAnswers;
    });
  };

  const calculateIdentity = () => {
    const counts = { analytical: 0, creative: 0, social: 0, 'hands-on': 0 };
    playerAnswers.forEach(type => { if (type in counts) counts[type as keyof typeof counts]++; });

    if (counts.creative >= 5 && counts.analytical >= 3) {
      return {
        title: "CREATIVE TECHNOLOGIST", subtitle: "Art Meets Engineering", icon: Palette, color: "text-purple-500", bg: "bg-purple-50",
        description: "You love art, but have an analytical mind. Architecture, UI/UX design, and front-end development are your paths.",
        careers: ["ARCHITECT", "PRODUCT DESIGNER", "UI/UX DESIGNER", "FRONT-END DEV"]
      };
    } else if (counts.analytical >= 6) {
      return {
        title: "SYSTEMS MASTERMIND", subtitle: "Pure Logic & Code", icon: Cpu, color: "text-blue-500", bg: "bg-blue-50",
        description: "You see the world in logic. Build future infrastructure! Engineering, data science, and software are calling you.",
        careers: ["SOFTWARE ENGINEER", "DATA SCIENTIST", "CLOUD ARCHITECT", "AI RESEARCHER"]
      };
    } else if (counts['hands-on'] >= counts.analytical && counts['hands-on'] >= counts.creative) {
      return {
        title: "INNOVATION CRAFTSMAN", subtitle: "Building & Making", icon: PenTool, color: "text-green-500", bg: "bg-green-50",
        description: "You learn by doing. Building with your hands is where you shine. Engineering and rapid prototyping are your areas.",
        careers: ["MECHANICAL ENGINEER", "CIVIL ENGINEER", "SYSTEMS TESTER", "FIELD TECH"]
      };
    } else {
      return {
        title: "STRATEGIC LEADER", subtitle: "People & Vision", icon: Users, color: "text-orange-500", bg: "bg-orange-50",
        description: "The glue that holds everything together. Strategy. People. Marketing. Leading teams to victory.",
        careers: ["PRODUCT MANAGER", "MARKETING DIRECTOR", "STARTUP FOUNDER", "CONSULTANT"]
      };
    }
  };

  const currentLevel = Math.min(playerAnswers.length, quizQuestions.length - 1);
  const currentQ = quizQuestions[currentLevel];

  // ==========================================
  // 1. INTRO SCREEN
  // ==========================================
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex flex-col items-center justify-center p-6 relative font-sans overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-xl p-10 md:p-16 rounded-[40px] shadow-2xl border border-white/50 text-center max-w-2xl relative z-10"
        >
          <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-3xl mx-auto flex items-center justify-center mb-8 rotate-3 shadow-sm border border-orange-200">
            <Target size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Interactive <span className="text-orange-500">Career Game</span></h1>
          <p className="text-lg text-gray-500 mb-10 max-w-lg mx-auto">Play through 15 quick levels to discover your true career path identity and get tailored recommendations matching your unique strengths.</p>
          
          <button onClick={() => setStep('game')} className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95">
            <Rocket size={22} />
            Start The Game
          </button>
          
          <button onClick={onSkip} className="mt-6 text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors block mx-auto underline-offset-4 hover:underline">
            Skip for now
          </button>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // 2. RESULTS SCREEN
  // ==========================================
  if (step === 'result') {
    const result = calculateIdentity();
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 relative font-sans">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-b-[60px] shadow-xl"></div>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white w-full max-w-3xl rounded-[32px] shadow-xl shadow-gray-200/50 overflow-hidden relative z-10 border border-gray-100 mt-10"
        >
          {/* Top Banner section */}
          <div className="px-10 py-12 flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-pink-500 to-green-500"></div>
             
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-8">
               <Trophy size={14} /> Course Clear
             </div>
             
             <div className={`w-24 h-24 rounded-full ${result.bg} ${result.color} flex items-center justify-center mb-6 shadow-inner ring-8 ring-white`}>
               <result.icon size={48} />
             </div>
             
             <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{result.title}</h2>
             <p className={`font-bold uppercase tracking-widest text-sm ${result.color}`}>{result.subtitle}</p>
          </div>
          
          {/* Details Section */}
          <div className="bg-gray-50/50 px-10 py-8 border-t border-gray-100">
             <p className="text-gray-600 text-center text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-medium">
               "{result.description}"
             </p>
             
             <div className="mb-8">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center mb-4">Recommended Career Paths</p>
               <div className="flex flex-wrap justify-center gap-3">
                 {result.careers.map((career, idx) => (
                   <span key={idx} className="bg-white text-gray-700 px-5 py-2.5 rounded-xl border border-gray-200 font-bold text-sm shadow-sm flex items-center gap-2">
                     <BrainCircuit size={16} className="text-orange-400" />
                     {career}
                   </span>
                 ))}
               </div>
             </div>
             
             <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-gray-100">
                <button 
                  onClick={() => { setPlayerAnswers([]); setStep('intro'); setScore(0); hitBlockRef.current = null; physics.current.x = 50; }} 
                  className="px-6 py-3.5 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-all shadow-sm flex-1 max-w-[200px]"
                >
                  Play Again
                </button>
                <button 
                  onClick={() => onComplete && onComplete(result)} 
                  className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 text-white font-bold rounded-xl transition-all flex-1 max-w-[240px]"
                >
                  Save & View Roadmap
                </button>
             </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // 3. PLAYABLE MODERN GAME SCREEN
  // ==========================================
  return (
    <div className="w-full h-screen bg-gradient-to-b from-orange-50 via-white to-white flex flex-col relative overflow-hidden select-none font-sans">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Glowing Sun */}
        <div className="absolute top-16 right-[15%] w-32 h-32 bg-gradient-to-br from-orange-300 to-yellow-200 rounded-full shadow-[0_0_80px_rgba(251,146,60,0.4)] z-0"></div>

        {/* Animated Modern Clouds */}
        <ModernCloud delay={0} yOffset="top-20" speed={45} scale={1} />
        <ModernCloud delay={15} yOffset="top-40" speed={60} scale={0.8} />
        <ModernCloud delay={30} yOffset="top-12" speed={50} scale={1.2} />
        
        {/* Sleek Ground */}
        <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gray-50 border-t border-gray-200 z-20 flex flex-col">
          {/* Active play floor */}
          <div className="w-full h-3 bg-gradient-to-r from-orange-400 via-orange-500 to-green-500 absolute top-0 left-0 shadow-[0_2px_15px_rgba(249,115,22,0.3)]"></div>
          
          {/* Subtle background grid pattern on the floor for depth */}
          <div className="w-full flex-1 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div> 
        
        {/* Minimalist Tech Pillars Instead of Pipes */}
        <div className="absolute bottom-[120px] left-[8%] w-16 h-20 bg-white border border-gray-200 rounded-t-2xl z-10 shadow-sm flex flex-col items-center justify-start pt-2">
           <div className="w-10 h-2 bg-green-100 rounded-full mb-1"></div>
           <div className="w-8 h-1 bg-gray-100 rounded-full"></div>
        </div>
        <div className="absolute bottom-[120px] right-[8%] w-16 h-32 bg-white border border-gray-200 rounded-t-2xl z-10 shadow-sm flex flex-col items-center justify-start pt-2">
           <div className="w-10 h-2 bg-orange-100 rounded-full mb-1"></div>
           <div className="w-8 h-1 bg-gray-100 rounded-full"></div>
           <div className="w-8 h-1 bg-gray-100 rounded-full mt-4"></div>
        </div>
      </div>

      {/* MODERN HUD */}
      <div className={`w-full flex justify-between items-center p-8 z-30 text-gray-800 font-bold tracking-wide`}>
        <div className="bg-white/80 backdrop-blur px-5 py-2.5 rounded-2xl shadow-sm border border-white flex gap-6 items-center">
          <div>
             <p className="text-xs text-gray-400 uppercase tracking-widest">Score</p>
             <p className="text-xl text-orange-500">{score.toString().padStart(5, '0')}</p>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div>
             <p className="text-xs text-gray-400 uppercase tracking-widest">Level</p>
             <p className="text-xl text-gray-900 flex items-center gap-1"><Star size={16} className="text-yellow-400 fill-yellow-400"/> {currentLevel + 1}<span className="text-sm text-gray-400">/15</span></p>
          </div>
        </div>
      </div>

      {/* QUESTION BOX */}
      <div className="w-full flex justify-center z-30 px-4 mt-2">
        <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[32px] shadow-xl p-8 max-w-3xl w-full mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-green-400"></div>
          <h2 className="text-gray-900 text-lg md:text-2xl font-bold leading-relaxed break-words whitespace-normal text-center">
            {currentQ.question}
          </h2>
        </div>
      </div>

      {/* GAME PLAY AREA */}
      <div className="flex-1 relative w-full z-30" style={{ marginBottom: '120px' }}>
        
        {/* 4 Sleek modern hit-boxes */}
        {[15, 35, 55, 75].map((leftPos, index) => {
          const isHit = hitBlock === index;
          return (
            <div key={index} className="absolute flex flex-col items-center w-[120px] md:w-[150px]" style={{ left: `calc(${leftPos}vw - 60px)`, bottom: '160px' }}>
              
              {/* Option Text Label */}
              <div className={`bg-gray-900/90 backdrop-blur-sm rounded-xl p-3 mb-6 w-full h-20 flex items-center justify-center shadow-lg transition-all duration-300 ${hitBlock !== null && !isHit ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                <p className="text-white text-center text-[10px] md:text-xs font-medium leading-snug tracking-wide">
                  {currentQ.options[index].text}
                </p>
              </div>
              
              {/* The Block */}
              <div className={`w-20 h-16 border-2 rounded-2xl flex items-center justify-center text-3xl font-black shadow-xl transition-all duration-300 relative
                ${isHit ? 'bg-orange-500 border-orange-600 text-white shadow-orange-500/40 scale-95' : 'bg-white border-orange-100 text-orange-400 hover:border-orange-300 hover:shadow-orange-200'}
              `}>
                {isHit ? <CheckCircle size={32} /> : '?'}
                
                {/* Clean Pop Animation */}
                {isHit && (
                  <motion.div 
                    className="absolute text-orange-500 font-bold text-2xl z-[-1]"
                    initial={{ y: 0, opacity: 1, scale: 1 }}
                    animate={{ y: -80, opacity: 0, scale: 1.5 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    +250
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}

        {/* MODERN PLAYER */}
        <div ref={marioContainerRef} className="absolute bottom-0 z-50 will-change-transform">
          <ModernPlayer facingRight={facingRight} isJumping={isJumping} />
        </div>
      </div>

      {/* Modern Mobile Controls */}
      <div className="absolute bottom-6 w-full flex justify-between px-8 z-50 md:hidden pb-safe">
        <div className="flex gap-4">
          <button 
            onPointerDown={() => keys.current.left = true} onPointerUp={() => keys.current.left = false}
            onTouchStart={() => keys.current.left = true} onTouchEnd={() => keys.current.left = false}
            className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-lg active:bg-gray-50 active:scale-95 transition-all text-gray-500"
          ><ArrowLeft size={32}/></button>
          <button 
            onPointerDown={() => keys.current.right = true} onPointerUp={() => keys.current.right = false}
            onTouchStart={() => keys.current.right = true} onTouchEnd={() => keys.current.right = false}
            className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-lg active:bg-gray-50 active:scale-95 transition-all text-gray-500"
          ><ArrowRight size={32}/></button>
        </div>
        <button 
          onPointerDown={() => keys.current.jump = true} onPointerUp={() => keys.current.jump = false}
          onTouchStart={() => keys.current.jump = true} onTouchEnd={() => keys.current.jump = false}
          className="w-20 h-20 bg-orange-500 rounded-[28px] flex items-center justify-center shadow-xl shadow-orange-500/30 active:bg-orange-600 active:scale-95 transition-all text-white border-b-4 border-orange-600 active:border-b-0"
        ><ArrowUp size={36} strokeWidth={3} /></button>
      </div>

    </div>
  );
}