import { useState, useEffect, useCallback } from 'react';
import { 
  Trophy, Brain, Timer, Star, Play, RotateCcw, 
  ChevronLeft, Zap, Target, Award, Flame, Heart, BookOpen, CheckCircle2, XCircle, CalendarDays,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type GameType = 'memory' | 'math' | 'pattern' | 'quiz' | null;

export default function GamifiedLearning() {
  const [activeGame, setActiveGame] = useState<GameType>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);

  // Dynamic Weekly Activity & Streak State
  const currentDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // Mon=0, Sun=6
  const [activity, setActivity] = useState<boolean[]>(() => {
    const initial = Array(7).fill(false);
    // Simulate an existing streak for the past couple of days
    if (currentDayIndex > 0) initial[currentDayIndex - 1] = true;
    if (currentDayIndex > 1) initial[currentDayIndex - 2] = true;
    return initial;
  });
  const [streak, setStreak] = useState(currentDayIndex > 1 ? 2 : currentDayIndex > 0 ? 1 : 0);

  const addXp = (amount: number) => {
    const newXp = xp + amount;
    if (newXp >= level * 100) {
      setLevel(level + 1);
      setXp(newXp - (level * 100));
    } else {
      setXp(newXp);
    }

    // Update Daily Streak
    if (!activity[currentDayIndex]) {
      setActivity(prev => {
        const newAct = [...prev];
        newAct[currentDayIndex] = true;
        return newAct;
      });
      setStreak(s => s + 1);
    }
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900 relative">
      
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 lg:p-8 min-h-screen flex flex-col max-w-[1600px] mx-auto w-full">
        
        {/* HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
          <div className="flex items-center gap-4">
             <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-2xl text-white hidden md:block shadow-lg shadow-indigo-200">
               <Brain size={24} strokeWidth={2.5}/>
             </div>
             <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mind Gym</h1>
               <p className="text-slate-500 text-sm mt-1 font-medium">Train your brain with scientifically designed mind games and subject quizzes.</p>
             </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-full text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
              <ChevronLeft size={18} /> Back to Dashboard
            </button>
          </div>
        </div>

        {/* CONTENT WRAPPER */}
        <div className="flex-1 pb-10 flex flex-col">
          
          {/* USER DASHBOARD & STATS BANNER */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col xl:flex-row justify-between items-center gap-8 shrink-0 mb-8">
            
            {/* Left side: Stats */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full xl:w-auto">
              {/* Level Progress */}
              <div className="flex-1 md:w-72">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Current Level</span>
                  <span className="text-3xl font-black text-indigo-600 leading-none">{level}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(xp / (level * 100)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <p className="text-[10px] font-bold text-slate-400 text-right mt-2">{xp} / {level * 100} XP to next level</p>
              </div>

              <div className="hidden md:block w-px h-16 bg-slate-100"></div>

              {/* Total XP & Rank Container */}
              <div className="flex gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-start">
                {/* Total XP */}
                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Total XP</p>
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Zap size={24} fill="currentColor" className="text-indigo-400" />
                    <span className="text-2xl font-black">{xp + (level - 1) * 100}</span>
                  </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-slate-100 self-center"></div>

                {/* Rank */}
                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Rank</p>
                  <div className="flex items-center gap-2 text-amber-500">
                    <Trophy size={24} fill="currentColor" />
                    <span className="text-2xl font-black">{level < 5 ? 'Novice' : level < 10 ? 'Adept' : 'Master'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Daily Streak Calendar */}
            <div className="w-full xl:w-auto bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><CalendarDays size={14}/> Weekly Activity</span>
                <span className="text-sm font-black text-orange-500 flex items-center gap-1"><Flame size={16} fill="currentColor" /> {streak} Day Streak</span>
              </div>
              <div className="flex gap-2 sm:gap-3 justify-between">
                {weekDays.map((day, i) => {
                  const isActive = activity[i];
                  const isToday = i === currentDayIndex;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-md shadow-orange-200'
                          : isToday
                            ? 'bg-white border-2 border-dashed border-slate-300 text-slate-400'
                            : 'bg-white border border-slate-200 text-slate-400'
                      }`}>
                        {isActive ? <Flame size={16} fill="currentColor" /> : day[0]}
                      </div>
                      <span className={`text-[9px] font-bold uppercase tracking-widest ${isToday ? 'text-indigo-600' : 'text-slate-400'}`}>
                        {isToday ? 'Today' : day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          <AnimatePresence mode="wait">
            {!activeGame ? (
              /* GAME SELECTION GRID */
              <motion.div 
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 content-start"
              >
                <GameCard 
                  title="Subject Mastery"
                  description="Test your knowledge across core subjects with 20-question MCQ challenges."
                  icon={BookOpen}
                  color="from-emerald-400 to-teal-500"
                  iconColor="text-emerald-100"
                  onClick={() => setActiveGame('quiz')}
                  difficulty="All Levels"
                  xpReward="200 XP"
                />
                <GameCard 
                  title="Memory Match"
                  description="Test your short-term memory by matching pairs of educational icons."
                  icon={Target}
                  color="from-blue-500 to-indigo-500"
                  iconColor="text-blue-100"
                  onClick={() => setActiveGame('memory')}
                  difficulty="Easy"
                  xpReward="50 XP"
                />
                <GameCard 
                  title="Math Sprint"
                  description="Sharpen your cognitive speed. Solve as many arithmetic problems as you can in 60 seconds."
                  icon={Zap}
                  color="from-orange-400 to-red-500"
                  iconColor="text-orange-100"
                  onClick={() => setActiveGame('math')}
                  difficulty="Medium"
                  xpReward="100 XP"
                />
                <GameCard 
                  title="Pattern Recall"
                  description="Enhance your working memory. Watch a sequence of lights and repeat them perfectly."
                  icon={Award}
                  color="from-purple-500 to-fuchsia-500"
                  iconColor="text-purple-100"
                  onClick={() => setActiveGame('pattern')}
                  difficulty="Hard"
                  xpReward="150 XP"
                />
              </motion.div>
            ) : (
              /* ACTIVE GAME VIEW */
              <motion.div
                key="active-game"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 flex-1 flex flex-col"
              >
                {/* Game Header */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0 rounded-t-[2.5rem]">
                  <button 
                    onClick={() => setActiveGame(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-full hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm"
                  >
                    <ChevronLeft size={18} /> Exit Game
                  </button>
                  <div className="px-5 py-2.5 bg-white border border-slate-200 rounded-full flex items-center gap-2 shadow-sm">
                    <Star className="text-yellow-500" size={18} fill="currentColor" />
                    <span className="font-black text-slate-800 text-sm tracking-wide">Score: {score}</span>
                  </div>
                </div>

                {/* Game Canvas */}
                <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/30 rounded-b-[2.5rem]">
                  {activeGame === 'quiz' && <SubjectQuizGame onEnd={(s) => { setScore(prev => prev + s); addXp(s * 10); }} />}
                  {activeGame === 'memory' && <MemoryGame onWin={(s) => { setScore(prev => prev + s); addXp(50); }} />}
                  {activeGame === 'math' && <MathGame onEnd={(s) => { setScore(prev => prev + s); addXp(s * 10); }} />}
                  {activeGame === 'pattern' && <PatternGame onEnd={(s) => { setScore(prev => prev + s); addXp(s * 20); }} />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function GameCard({ title, description, icon: Icon, color, iconColor, onClick, difficulty, xpReward }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 flex flex-col h-full group cursor-pointer hover:shadow-xl hover:border-indigo-200 transition-all relative overflow-hidden"
      onClick={onClick}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all group-hover:rotate-3`}>
          <Icon size={32} className={iconColor} />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-md text-[10px] font-black uppercase tracking-widest border border-slate-200">{difficulty}</span>
          <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-black uppercase tracking-widest border border-indigo-100">+{xpReward}</span>
        </div>
      </div>
      
      <div className="flex-1 relative z-10">
        <h3 className="text-2xl font-black text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
      </div>

      <button className="mt-8 w-full py-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all flex items-center justify-center gap-2 relative z-10">
        <Play size={18} fill="currentColor" />
        Play Now
      </button>
    </motion.div>
  );
}

// ============================================================================
// NEW GAME: SUBJECT MASTERY QUIZ (With Full Academic Taxonomy)
// ============================================================================
type Question = { q: string; options: string[]; ans: number; };

const ACADEMIC_TAXONOMY = [
  {
    category: "Classes 5 to 8 (Middle School)",
    subjects: [
      "English", "Hindi / Regional Language", "Mathematics", "Science", 
      "History", "Geography", "Civics", "Computer / IT Basics", 
      "General Knowledge (GK)", "Moral Science", "Art & Craft", "Physical Education"
    ]
  },
  {
    category: "Classes 9 & 10 (Secondary Level)",
    subjects: [
      "English", "Hindi / Regional Language", "Mathematics", "Physics", 
      "Chemistry", "Biology", "History", "Geography", "Political Science", 
      "Economics", "Computer Science / IT", "Sanskrit", "Physical Education"
    ]
  },
  {
    category: "Classes 11 & 12 (Science Stream)",
    subjects: [
      "English", "Hindi / Regional", "Physics", "Chemistry", "Mathematics", 
      "Biology", "Computer Science", "Informatics Practices", "Physical Education"
    ]
  },
  {
    category: "Classes 11 & 12 (Commerce Stream)",
    subjects: [
      "English", "Hindi / Regional", "Accountancy", "Business Studies", 
      "Economics", "Mathematics", "Informatics Practices", "Entrepreneurship", "Physical Education"
    ]
  },
  {
    category: "Classes 11 & 12 (Arts / Humanities Stream)",
    subjects: [
      "English", "Hindi / Regional", "History", "Geography", "Political Science", 
      "Sociology", "Psychology", "Economics", "Philosophy", "Fine Arts", "Physical Education"
    ]
  }
];

// --- Hardcoded 20-Question Databases for Core Subjects ---
const QUIZ_DATABASES: Record<string, Question[]> = {
  "Classes 5 to 8 (Middle School)_Science": [
    { q: "What is the process by which plants make their own food?", options: ["Respiration", "Digestion", "Photosynthesis", "Transpiration"], ans: 2 },
    { q: "Which part of the plant absorbs water and minerals from the soil?", options: ["Stem", "Leaves", "Roots", "Flowers"], ans: 2 },
    { q: "What is the standard unit of measuring mass?", options: ["Liters", "Kilograms", "Meters", "Newtons"], ans: 1 },
    { q: "Which state of matter has a definite volume but no definite shape?", options: ["Solid", "Liquid", "Gas", "Plasma"], ans: 1 },
    { q: "What type of energy is stored in a stretched rubber band?", options: ["Kinetic Energy", "Thermal Energy", "Potential Energy", "Chemical Energy"], ans: 2 },
    { q: "Which organ in the human body pumps blood?", options: ["Lungs", "Brain", "Liver", "Heart"], ans: 3 },
    { q: "What is the boiling point of pure water at sea level?", options: ["50°C", "90°C", "100°C", "120°C"], ans: 2 },
    { q: "Which gas do humans breathe out during respiration?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], ans: 2 },
    { q: "What is the primary source of energy for the Earth?", options: ["The Moon", "Fossil Fuels", "The Sun", "Wind"], ans: 2 },
    { q: "Which of these is a magnetic material?", options: ["Wood", "Glass", "Iron", "Plastic"], ans: 2 },
    { q: "What force pulls objects towards the center of the Earth?", options: ["Friction", "Magnetism", "Gravity", "Tension"], ans: 2 },
    { q: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], ans: 2 },
    { q: "How many planets are in our Solar System?", options: ["7", "8", "9", "10"], ans: 1 },
    { q: "Which vitamin is abundant in citrus fruits like oranges and lemons?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], ans: 2 },
    { q: "What is the green pigment in leaves called?", options: ["Chloroplast", "Melanin", "Chlorophyll", "Hemoglobin"], ans: 2 },
    { q: "Which of these is an example of a renewable resource?", options: ["Coal", "Oil", "Solar Energy", "Natural Gas"], ans: 2 },
    { q: "What is the main function of the human skeleton?", options: ["To pump blood", "To digest food", "To support and protect the body", "To help us breathe"], ans: 2 },
    { q: "Which animal is an amphibian?", options: ["Snake", "Frog", "Lizard", "Turtle"], ans: 1 },
    { q: "Sound cannot travel through:", options: ["Water", "Air", "Solid Steel", "A Vacuum (Space)"], ans: 3 },
    { q: "What instrument is used to measure temperature?", options: ["Barometer", "Microscope", "Thermometer", "Telescope"], ans: 2 },
  ],
  "Classes 9 & 10 (Secondary Level)_Mathematics": [
    { q: "What is the sum of angles in a quadrilateral?", options: ["180°", "270°", "360°", "400°"], ans: 2 },
    { q: "If x + 5 = 12, what is x?", options: ["6", "7", "8", "9"], ans: 1 },
    { q: "What is the square root of 144?", options: ["10", "12", "14", "16"], ans: 1 },
    { q: "Which of these is a prime number?", options: ["15", "21", "29", "31"], ans: 3 },
    { q: "What is the formula for the area of a circle?", options: ["2πr", "πr²", "πd", "2πr²"], ans: 1 },
    { q: "If the radius of a circle is 7cm, its circumference is (approx):", options: ["22 cm", "44 cm", "154 cm", "49 cm"], ans: 1 },
    { q: "In a right-angled triangle, if sides are 3 and 4, the hypotenuse is:", options: ["5", "6", "7", "8"], ans: 0 },
    { q: "What is the value of 5³?", options: ["15", "25", "125", "625"], ans: 2 },
    { q: "If a = 2, b = 3, what is (a+b)²?", options: ["13", "25", "36", "10"], ans: 1 },
    { q: "A polygon with 6 sides is called a:", options: ["Pentagon", "Hexagon", "Heptagon", "Octagon"], ans: 1 },
    { q: "The HCF of 12 and 18 is:", options: ["2", "3", "4", "6"], ans: 3 },
    { q: "The LCM of 4 and 5 is:", options: ["1", "9", "20", "40"], ans: 2 },
    { q: "What is the probability of getting a head when tossing a fair coin?", options: ["1", "0.5", "0.25", "0.75"], ans: 1 },
    { q: "Sin(30°) is equal to:", options: ["1", "1/2", "√3/2", "0"], ans: 1 },
    { q: "The volume of a cube with side 'a' is:", options: ["3a", "a²", "a³", "6a²"], ans: 2 },
    { q: "Which axis runs horizontally on a Cartesian plane?", options: ["X-axis", "Y-axis", "Z-axis", "Origin"], ans: 0 },
    { q: "What is 20% of 150?", options: ["20", "30", "40", "50"], ans: 1 },
    { q: "The sum of the first 5 natural numbers is:", options: ["10", "15", "20", "25"], ans: 1 },
    { q: "If 3x = 18, what is 2x?", options: ["6", "12", "15", "18"], ans: 1 },
    { q: "The longest chord of a circle is its:", options: ["Radius", "Tangent", "Diameter", "Secant"], ans: 2 },
  ],
  "Classes 11 & 12 (Science Stream)_Physics": [
    { q: "Which law states that every action has an equal and opposite reaction?", options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"], ans: 2 },
    { q: "What is the SI unit of Force?", options: ["Joule", "Newton", "Pascal", "Watt"], ans: 1 },
    { q: "The rate of change of velocity is called:", options: ["Speed", "Displacement", "Momentum", "Acceleration"], ans: 3 },
    { q: "What is the value of acceleration due to gravity (g) on Earth?", options: ["9.8 m/s²", "10.5 m/s²", "8.9 m/s²", "9.0 m/s²"], ans: 0 },
    { q: "Work done is defined as the dot product of Force and:", options: ["Velocity", "Acceleration", "Displacement", "Time"], ans: 2 },
    { q: "Which electromagnetic wave has the highest frequency?", options: ["Radio Waves", "Visible Light", "X-Rays", "Gamma Rays"], ans: 3 },
    { q: "The resistance of an ideal voltmeter is:", options: ["Zero", "Infinite", "100 Ohms", "1 Ohm"], ans: 1 },
    { q: "In an AC circuit, the frequency in India is typically:", options: ["50 Hz", "60 Hz", "100 Hz", "220 Hz"], ans: 0 },
    { q: "Total Internal Reflection occurs when light travels from:", options: ["Rarer to denser medium", "Denser to rarer medium", "Vacuum to glass", "Air to water"], ans: 1 },
    { q: "The energy of a photon is given by E =", options: ["mc²", "mgh", "hν", "1/2 mv²"], ans: 2 },
    { q: "Which particle has a negative elementary charge?", options: ["Proton", "Neutron", "Electron", "Photon"], ans: 2 },
    { q: "Capacitance is measured in:", options: ["Henry", "Farad", "Coulomb", "Ohm"], ans: 1 },
    { q: "According to Ohm's Law, Voltage (V) equals:", options: ["I/R", "I*R", "R/I", "I+R"], ans: 1 },
    { q: "A convex lens is also known as a:", options: ["Diverging lens", "Converging lens", "Plano-concave lens", "Bifocal lens"], ans: 1 },
    { q: "The phenomenon of splitting of white light into seven colors is called:", options: ["Reflection", "Refraction", "Dispersion", "Diffraction"], ans: 2 },
    { q: "What is the dimensional formula for velocity?", options: ["[M0 L1 T-1]", "[M1 L1 T-1]", "[M0 L2 T-2]", "[M1 L0 T-1]"], ans: 0 },
    { q: "The core of a transformer is laminated to reduce:", options: ["Copper loss", "Eddy current loss", "Hysteresis loss", "Flux leakage"], ans: 1 },
    { q: "In a p-n junction diode, the depletion region is created by:", options: ["Drift of electrons", "Diffusion of charge carriers", "Migration of ions", "Applied voltage"], ans: 1 },
    { q: "The half-life of a radioactive substance depends on its:", options: ["Mass", "Temperature", "Pressure", "Decay constant"], ans: 3 },
    { q: "Which logic gate is known as the universal gate?", options: ["AND", "OR", "NAND", "NOT"], ans: 2 },
  ]
};

// --- Dynamic Fallback Generator ---
const generateFallbackQuestions = (category: string, subject: string): Question[] => {
  const dbKey = `${category}_${subject}`;
  if (QUIZ_DATABASES[dbKey]) {
    return QUIZ_DATABASES[dbKey];
  }

  // Generates 20 mock questions dynamically so the user can literally play every single subject listed
  return Array.from({ length: 20 }, (_, i) => ({
    q: `Mock Question ${i + 1} for ${subject} (${category}): Which of the following is a core concept associated with this topic?`,
    options: [
      `Standard Concept A for ${subject}`,
      `Theoretical Principle B`,
      `Incorrect Assumption C`,
      `Irrelevant Data D`
    ],
    ans: Math.floor(Math.random() * 2) // Answers will randomly be A or B in the mock
  }));
};


function SubjectQuizGame({ onEnd }: { onEnd: (score: number) => void }) {
  const [step, setStep] = useState<'selectCategory' | 'selectSubject' | 'playing' | 'result'>('selectCategory');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleStartQuiz = (category: string, subject: string) => {
    setSelectedCategory(category);
    setSelectedSubject(subject);
    const loadedQuestions = generateFallbackQuestions(category, subject);
    setQuestions(loadedQuestions);
    setCurrentQIndex(0);
    setScore(0);
    setStep('playing');
  };

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === questions[currentQIndex].ans) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setStep('result');
        onEnd(score + (index === questions[currentQIndex].ans ? 1 : 0));
      }
    }, 1500);
  };

  if (step === 'selectCategory') {
    return (
      <div className="w-full max-w-4xl space-y-6 mx-auto">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Subject Mastery Quiz</h2>
          <p className="text-slate-500 font-medium">Select your academic stage to begin a 20-question challenge.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACADEMIC_TAXONOMY.map(cat => (
            <motion.button 
              key={cat.category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedCategory(cat.category); setStep('selectSubject'); }}
              className="p-6 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm hover:border-emerald-400 hover:shadow-md transition-all text-left group flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-lg text-slate-800 group-hover:text-emerald-600 transition-colors">{cat.category}</h3>
                <p className="text-xs font-medium text-slate-400 mt-1">{cat.subjects.length} Subjects Available</p>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-emerald-500" />
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'selectSubject') {
    const categoryData = ACADEMIC_TAXONOMY.find(c => c.category === selectedCategory);
    return (
      <div className="w-full max-w-4xl space-y-6 mx-auto">
        <button onClick={() => setStep('selectCategory')} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 mb-6">
          <ChevronLeft size={16}/> Back to Stages
        </button>
        
        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-900 mb-2">{selectedCategory}</h2>
          <p className="text-slate-500 font-medium">Choose a subject to launch the 20 MCQ assessment.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryData?.subjects.map(subject => {
            const hasRealDB = QUIZ_DATABASES[`${selectedCategory}_${subject}`] !== undefined;
            return (
              <motion.button 
                key={subject}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleStartQuiz(selectedCategory, subject)}
                className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-emerald-400 hover:bg-emerald-50/30 transition-all text-left flex flex-col justify-between min-h-[120px] relative overflow-hidden"
              >
                {hasRealDB && <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-bl-lg">VERIFIED DB</div>}
                <h3 className="font-bold text-sm text-slate-800 pr-4">{subject}</h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">20 Questions</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    );
  }

  if (step === 'playing') {
    const q = questions[currentQIndex];
    const progress = ((currentQIndex + 1) / 20) * 100;

    return (
      <div className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{selectedSubject}</span>
            <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">Question {currentQIndex + 1} / 20</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
              initial={{ width: `${((currentQIndex) / 20) * 100}%` }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-black text-slate-900 mb-8 leading-relaxed">{q.q}</h2>

        <div className="space-y-3 flex-1">
          {q.options.map((opt, i) => {
            let stateClass = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300";
            let Icon = null;
            
            if (isAnswered) {
              if (i === q.ans) {
                stateClass = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-md shadow-emerald-100";
                Icon = CheckCircle2;
              } else if (i === selectedOption) {
                stateClass = "bg-red-50 border-red-400 text-red-800 shadow-sm";
                Icon = XCircle;
              } else {
                stateClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
              }
            }

            return (
              <button 
                key={i}
                disabled={isAnswered}
                onClick={() => handleOptionClick(i)}
                className={`w-full p-5 rounded-2xl border text-left transition-all flex justify-between items-center ${stateClass}`}
              >
                <span className="font-medium text-[15px]">{opt}</span>
                {Icon && <Icon size={20} className={i === q.ans ? "text-emerald-500" : "text-red-400"} />}
              </button>
            )
          })}
        </div>
      </div>
    );
  }

  if (step === 'result') {
    const pass = score >= 10;
    return (
      <div className="text-center space-y-8 bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm max-w-lg w-full mx-auto">
        <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto shadow-inner border-8 ${pass ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-orange-50 text-orange-500 border-orange-100'}`}>
          {pass ? <Trophy size={56} /> : <Target size={56} />}
        </div>
        
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">{pass ? 'Quiz Completed!' : 'Good Effort!'}</h2>
          <p className="text-slate-500 font-medium">You completed the <span className="font-bold text-slate-800">{selectedSubject}</span> assessment.</p>
        </div>

        <div className="py-8 border-y border-slate-100">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Final Score</p>
          <div className="text-6xl font-black text-slate-900 tracking-tighter">
            {score}<span className="text-3xl text-slate-300">/20</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setStep('selectCategory')}
            className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-black text-sm shadow-md hover:bg-slate-800 transition-all"
          >
            Change Subject
          </button>
          <button 
            onClick={() => handleStartQuiz(selectedCategory, selectedSubject)}
            className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-black text-sm shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} /> Retry
          </button>
        </div>
      </div>
    );
  }

  return null;
}


// ============================================================================
// GAME 1: MEMORY MATCH
// ============================================================================
function MemoryGame({ onWin }: { onWin: (score: number) => void }) {
  const icons = [Brain, Zap, Target, Award, Flame, Heart, Star, Trophy];
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initialize = useCallback(() => {
    const deck = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((Icon, i) => ({ id: i, Icon }));
    setCards(deck);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleClick = (id: number) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].Icon === cards[second].Icon) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        if (solved.length + 2 === cards.length) {
          onWin(Math.max(100 - moves * 2, 10));
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="space-y-10 flex flex-col items-center w-full max-w-xl mx-auto">
      <div className="w-full flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div className="font-bold text-slate-500 uppercase tracking-widest text-sm">Moves: <span className="text-indigo-600 text-lg ml-1">{moves}</span></div>
        <button onClick={initialize} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors text-sm">
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-5 w-full perspective-1000">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || solved.includes(i);
          return (
            <motion.div
              key={card.id}
              whileHover={{ scale: isFlipped ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(i)}
              className="relative w-full aspect-square cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Back of card (Hidden when flipped) */}
                <div 
                  className={`absolute w-full h-full backface-hidden bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center shadow-sm ${isFlipped ? 'invisible' : 'visible'}`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <Brain size={32} className="text-slate-300" />
                </div>

                {/* Front of card (Visible when flipped) */}
                <div 
                  className={`absolute w-full h-full backface-hidden rounded-2xl flex items-center justify-center shadow-md ${
                    solved.includes(i) ? 'bg-emerald-500 border-emerald-600' : 'bg-indigo-600 border-indigo-700'
                  }`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <card.Icon size={40} className="text-white" />
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {solved.length === cards.length && cards.length > 0 && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-8 py-4 rounded-2xl font-black text-xl shadow-sm flex items-center gap-3">
          <Trophy size={28} className="text-emerald-500" /> Level Cleared!
        </motion.div>
      )}
    </div>
  );
}

// ============================================================================
// GAME 2: MATH SPRINT
// ============================================================================
function MathGame({ onEnd }: { onEnd: (score: number) => void }) {
  const [problem, setProblem] = useState({ a: 0, b: 0, op: '+', ans: 0 });
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const generateProblem = useCallback(() => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, ans;
    if (op === '*') {
      a = Math.floor(Math.random() * 12) + 1;
      b = Math.floor(Math.random() * 12) + 1;
      ans = a * b;
    } else {
      a = Math.floor(Math.random() * 50) + 1;
      b = Math.floor(Math.random() * 50) + 1;
      ans = op === '+' ? a + b : a - b;
    }
    setProblem({ a, b, op, ans });
  }, []);

  useEffect(() => {
    let timer: any;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      onEnd(score);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, score, onEnd]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(input) === problem.ans) {
      setScore(s => s + 1);
      setInput('');
      generateProblem();
    } else {
      setInput('');
    }
  };

  if (!isActive && timeLeft === 60) {
    return (
      <div className="text-center space-y-8 bg-white p-12 rounded-[2rem] border border-slate-200 shadow-sm max-w-md w-full mx-auto">
        <div className="w-24 h-24 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto shadow-inner border border-orange-100">
          <Timer size={48} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Math Sprint</h2>
          <p className="text-slate-500 font-medium">Solve as many equations as you can in 60 seconds.</p>
        </div>
        <button 
          onClick={() => { setIsActive(true); generateProblem(); }}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-black text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all"
        >
          Start Sprint
        </button>
      </div>
    );
  }

  if (!isActive && timeLeft === 0) {
    return (
      <div className="text-center space-y-8 bg-white p-12 rounded-[2rem] border border-slate-200 shadow-sm max-w-md w-full mx-auto">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
          <Trophy size={48} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Time's Up!</h2>
          <p className="text-slate-500 font-medium">You solved <span className="text-indigo-600 font-bold">{score}</span> problems.</p>
        </div>
        <button 
          onClick={() => { setTimeLeft(60); setScore(0); }}
          className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-lg shadow-md hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} /> Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-white p-10 rounded-[2rem] shadow-sm border border-slate-200 mx-auto">
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-100">
        <div className={`flex items-center gap-2 font-black text-2xl ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
          <Timer size={28} />
          00:{timeLeft.toString().padStart(2, '0')}
        </div>
        <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-black text-xl border border-indigo-100">
          Score: {score}
        </div>
      </div>

      <div className="text-7xl font-black text-slate-900 tracking-tighter text-center mb-10">
        {problem.a} {problem.op === '*' ? '×' : problem.op} {problem.b} <span className="text-slate-300">=</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          autoFocus
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl text-4xl text-center font-black focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-100 outline-none transition-all placeholder-slate-300"
          placeholder="?"
        />
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest text-center mt-4">Press Enter to Submit</p>
      </form>
    </div>
  );
}

// ============================================================================
// GAME 3: PATTERN RECALL
// ============================================================================
function PatternGame({ onEnd }: { onEnd: (score: number) => void }) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isShowing, setIsShowing] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle');

  const startNextRound = useCallback((currentSeq: number[]) => {
    const next = Math.floor(Math.random() * 4);
    const newSeq = [...currentSeq, next];
    setSequence(newSeq);
    setUserSequence([]);
    showSequence(newSeq);
  }, []);

  const showSequence = async (seq: number[]) => {
    setIsShowing(true);
    // Small pause before sequence starts
    await new Promise(r => setTimeout(r, 500)); 
    for (let i = 0; i < seq.length; i++) {
      setActiveIndex(seq[i]);
      await new Promise(r => setTimeout(r, 500));
      setActiveIndex(null);
      await new Promise(r => setTimeout(r, 200));
    }
    setIsShowing(false);
  };

  const handlePadClick = (index: number) => {
    if (isShowing || gameState !== 'playing') return;

    // Flash the pad visually when clicked
    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 150);

    const newUserSeq = [...userSequence, index];
    setUserSequence(newUserSeq);

    // Wrong move
    if (newUserSeq[newUserSeq.length - 1] !== sequence[newUserSeq.length - 1]) {
      setGameState('over');
      onEnd(sequence.length - 1);
      return;
    }

    // Sequence completed successfully
    if (newUserSeq.length === sequence.length) {
      setIsShowing(true); // Prevent clicks while waiting
      setTimeout(() => startNextRound(sequence), 1000);
    }
  };

  if (gameState === 'idle') {
    return (
      <div className="text-center space-y-8 bg-white p-12 rounded-[2rem] border border-slate-200 shadow-sm max-w-md w-full mx-auto">
        <div className="w-24 h-24 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-purple-100">
          <Zap size={48} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Pattern Recall</h2>
          <p className="text-slate-500 font-medium">Watch the lights and repeat the sequence perfectly.</p>
        </div>
        <button 
          onClick={() => { setGameState('playing'); startNextRound([]); }}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-xl font-black text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] transition-all"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === 'over') {
    return (
      <div className="text-center space-y-8 bg-white p-12 rounded-[2rem] border border-slate-200 shadow-sm max-w-md w-full mx-auto">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner border border-red-100">
          <Target size={48} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Game Over</h2>
          <p className="text-slate-500 font-medium">You reached <span className="text-indigo-600 font-bold">Round {sequence.length - 1}</span>.</p>
        </div>
        <button 
          onClick={() => { setGameState('playing'); startNextRound([]); }}
          className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-lg shadow-md hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} /> Try Again
        </button>
      </div>
    );
  }

  const padColors = [
    'from-red-400 to-rose-500', 
    'from-blue-400 to-indigo-500', 
    'from-emerald-400 to-teal-500', 
    'from-amber-400 to-orange-500'
  ];

  const glowColors = [
    'shadow-rose-500/50', 
    'shadow-indigo-500/50', 
    'shadow-emerald-500/50', 
    'shadow-orange-500/50'
  ];

  return (
    <div className="w-full max-w-lg bg-white p-10 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col items-center mx-auto">
      <div className="w-full flex justify-between items-center mb-10 pb-6 border-b border-slate-100">
        <div className="font-bold text-slate-400 uppercase tracking-widest text-sm">Round</div>
        <div className="px-5 py-2 bg-purple-50 text-purple-700 rounded-xl font-black text-xl border border-purple-100">
          {sequence.length}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-10">
        {[0, 1, 2, 3].map((i) => {
          const isActive = activeIndex === i;
          return (
            <motion.div
              key={i}
              whileTap={{ scale: isShowing ? 1 : 0.95 }}
              onClick={() => handlePadClick(i)}
              className={`w-32 h-32 md:w-40 md:h-40 rounded-3xl cursor-pointer transition-all duration-200 border-4 ${
                isActive 
                  ? `bg-gradient-to-br ${padColors[i]} border-white shadow-xl ${glowColors[i]} scale-105 opacity-100 brightness-110` 
                  : 'bg-slate-100 border-slate-200 opacity-60 hover:opacity-80'
              }`}
            />
          )
        })}
      </div>
      
      <div className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-colors ${
        isShowing ? 'bg-amber-50 text-amber-600 border border-amber-200 animate-pulse' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
      }`}>
        {isShowing ? 'Watch the sequence...' : 'Your Turn! Repeat it.'}
      </div>
    </div>
  );
}