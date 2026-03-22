import React, { useState, useEffect } from 'react';
import { 
  Flame, Trophy, CheckCircle2, Play, Lock, BookOpen, 
  Target, Award, Zap, ChevronRight, Star, Shield, Layout,
  Timer, Sparkles, Plus, SkipForward, ArrowRight, BarChart3,
  Search, Bell, MoreHorizontal, HelpCircle, RefreshCw,
  Gift, Crown, Rocket, Brain, Coffee, Glasses, BookCopy,
  CheckCircle, XCircle, TrendingUp, Lightbulb, Frown, Smile,
  AlertCircle, Bookmark, Clock, Grid, Layers, Zap as ZapIcon, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StudyResources from './StudyResources';

// --- Types ---
interface Quest {
  id: number;
  title: string;
  description: string;
  xp: number;
  progress: number;
  total: number;
  status: 'available' | 'started' | 'completed' | 'skipped';
  category: 'AI' | 'Recall' | 'Technical' | 'Social';
}

interface Badge {
  id: number;
  name: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
  reward: number;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
}

interface WeeklyChallenge {
  id: number;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface SyllabusItem {
  id: number;
  subject: string;
  topic: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

interface AIRecommendation {
  id: number;
  type: 'weak-area' | 'strength' | 'trending' | 'skill-gap';
  title: string;
  description: string;
  suggestedAction: string;
  confidenceScore: number;
}

interface EduLearnProps {
  userName: string;
}

// --- Component: Animated Level Display ---
const LevelDisplay = ({ level, xp, totalXpForLevel }: { level: number; xp: number; totalXpForLevel: number }) => {
  const progress = (xp / totalXpForLevel) * 100;
  const levelUpThreshold = totalXpForLevel * 0.95;
  const isLevelingUp = xp >= levelUpThreshold;

  return (
    <motion.div 
      className="relative w-32 h-32 flex items-center justify-center"
      animate={isLevelingUp ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.8, repeat: isLevelingUp ? Infinity : 0 }}
    >
      {/* Animated outer ring */}
      <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="55"
          fill="none"
          stroke="#f3f4f6"
          className="dark:stroke-gray-700"
          strokeWidth="4"
        />
        <motion.circle
          cx="60"
          cy="60"
          r="55"
          fill="none"
          stroke="url(#levelGradient)"
          strokeWidth="4"
          strokeDasharray={2 * Math.PI * 55}
          initial={{ strokeDashoffset: 2 * Math.PI * 55 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 55 * (1 - progress / 100) }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="levelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <motion.div 
        className="flex flex-col items-center justify-center z-10"
        animate={isLevelingUp ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 0.6, repeat: isLevelingUp ? Infinity : 0 }}
      >
        <span className="text-3xl font-black text-orange-600">{level}</span>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Level</span>
      </motion.div>

      {/* Sparkles on level up */}
      {isLevelingUp && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full"
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 1, 
                opacity: 1 
              }}
              animate={{ 
                x: Math.cos((i / 6) * Math.PI * 2) * 60,
                y: Math.sin((i / 6) * Math.PI * 2) * 60,
                scale: 0,
                opacity: 0
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

// --- Component: Streak Booster ---
const StreakBooster = ({ multiplier }: { multiplier: number }) => (
  <motion.div 
    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-[1.5rem] shadow-xl shadow-orange-200/50 backdrop-blur-xl border border-orange-400/20"
    animate={{ scale: [1, 1.02, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
      <Flame size={20} className="fill-white" />
    </motion.div>
    <div className="flex flex-col">
       <span className="text-[10px] font-black uppercase tracking-widest leading-none opacity-80 mb-1">Streak Boost</span>
       <span className="text-xl font-black leading-none">{multiplier}x XP</span>
    </div>
  </motion.div>
);

// --- Component: Quest Card ---
const QuestCard = ({ quest, onStart, onSkip }: { quest: Quest; onStart: (id: number) => void; onSkip: (id: number) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryColors = {
    'AI': 'from-blue-600 to-cyan-500',
    'Recall': 'from-purple-600 to-pink-500',
    'Technical': 'from-green-600 to-emerald-500',
    'Social': 'from-orange-600 to-rose-500'
  };

  return (
    <motion.div 
      layout
      className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-500 backdrop-blur-xl ${
        isExpanded 
          ? 'p-8 ring-4 ring-orange-500/30 shadow-3xl bg-white/80 dark:bg-gray-800/80 border-orange-200/50 dark:border-orange-500/20' 
          : 'p-6 shadow-sm border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl hover:-translate-y-1 bg-white/60 dark:bg-gray-800/60'
      }`}
    >
      <div className="flex items-start justify-between gap-6 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex gap-5">
           <motion.div 
             className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 bg-gradient-to-br ${categoryColors[quest.category]} text-white shadow-lg`}
             whileHover={{ scale: 1.1, rotate: 5 }}
           >
              {quest.status === 'completed' ? <CheckCircle size={24} /> : <Brain size={24} />}
           </motion.div>
           <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight leading-none mb-2">{quest.title}</h3>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest text-[10px]">{quest.category} Division</p>
           </div>
        </div>
        <motion.div 
          className="flex flex-col items-end gap-2"
          animate={quest.status === 'completed' ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.6, repeat: quest.status === 'completed' ? 2 : 0 }}
        >
           <span className="px-5 py-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-full text-xs font-black shadow-lg shadow-orange-200/40">+{quest.xp} XP</span>
           {quest.status === 'completed' && <span className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-1"><CheckCircle size={12} /> Mastered</span>}
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 space-y-6 overflow-hidden"
          >
             <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-[1.8]">
               {quest.description}
             </p>
             
             <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Progress Metrics</p>
                   <p className="text-xs font-black text-orange-600">{quest.progress}/{quest.total}</p>
                </div>
                <div className="w-full h-3 bg-gray-100/80 dark:bg-gray-900/80 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${(quest.progress / quest.total) * 100}%` }}
                     className={`h-full bg-gradient-to-r ${categoryColors[quest.category]} rounded-full`}
                   />
                </div>
             </div>

             <div className="flex gap-3 pt-2">
                {quest.status !== 'completed' && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onStart(quest.id); }}
                      className="flex-1 py-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-[1.2rem] font-black text-sm shadow-xl shadow-orange-200/40 hover:shadow-2xl hover:shadow-orange-300/50 active:scale-95 transition-all"
                    >
                      Initialize Quest
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onSkip(quest.id); }}
                      className="px-6 py-4 border-2 border-gray-100 dark:border-gray-700 text-gray-400 rounded-[1.2rem] font-black text-sm hover:border-red-500 hover:text-red-500 transition-all"
                    >
                      <SkipForward size={18} />
                    </button>
                  </>
                )}
                {quest.status === 'completed' && (
                  <button className="w-full py-4 bg-green-100 dark:bg-green-500/20 text-green-600 rounded-[1.2rem] font-black text-sm cursor-default flex items-center justify-center gap-2">
                     <CheckCircle size={16} /> Collected
                  </button>
                )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Component: Badge Card ---
const BadgeCard = ({ badge }: { badge: Badge }) => {
  const [showDetails, setShowDetails] = useState(false);

  const rarityColors = {
    'common': 'from-gray-400 to-gray-500',
    'rare': 'from-blue-400 to-blue-600',
    'epic': 'from-purple-500 to-indigo-600',
    'legendary': 'from-amber-400 via-orange-500 to-red-600'
  };

  const rarityBg = {
    'common': 'bg-gray-100 dark:bg-gray-700',
    'rare': 'bg-blue-100 dark:bg-blue-500/20',
    'epic': 'bg-purple-100 dark:bg-purple-500/20',
    'legendary': 'bg-amber-100 dark:bg-amber-500/20'
  };

  return (
    <motion.div
      onHoverStart={() => setShowDetails(true)}
      onHoverEnd={() => setShowDetails(false)}
      className={`relative cursor-pointer overflow-hidden rounded-2xl p-6 shadow-lg transition-all ${rarityBg[badge.rarity]} ${!badge.unlocked && 'opacity-40'}`}
      whileHover={badge.unlocked ? { scale: 1.08, y: -8 } : {}}
    >
      <div className="flex flex-col items-center justify-center h-24">
        <motion.div 
          className={`text-4xl mb-2 ${!badge.unlocked && 'grayscale opacity-50'}`}
          animate={badge.unlocked && showDetails ? { scale: 1.2, rotate: 12 } : {}}
        >
          {badge.icon}
        </motion.div>
        <p className="text-xs font-black text-center text-gray-600 dark:text-gray-300 line-clamp-2">{badge.name}</p>
      </div>

      <AnimatePresence>
        {showDetails && badge.unlocked && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-gradient-to-br from-orange-900/95 to-orange-800/95 backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center justify-center text-white text-center"
          >
            <p className="text-xs font-bold mb-2">{badge.description}</p>
            <div className="flex items-center gap-1 mt-2">
              <Flame size={14} className="text-amber-300" />
              <span className="text-xs font-black">+{badge.reward} XP</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!badge.unlocked && badge.progress && (
        <div className="mt-4 space-y-2">
          <div className="w-full h-2 bg-gray-300/50 dark:bg-gray-600/50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-orange-600 to-amber-500"
              animate={{ width: `${(badge.progress / 100) * 100}%` }}
            />
          </div>
          <p className="text-[9px] font-black text-center text-gray-500">{badge.progress}%</p>
        </div>
      )}
    </motion.div>
  );
};

// --- Component: Weekly Challenge Card ---
const WeeklyChallengeCard = ({ challenge }: { challenge: WeeklyChallenge }) => {
  const difficultyColors = {
    'easy': { bg: 'bg-green-100 dark:bg-green-500/20', text: 'text-green-600', border: 'border-green-300' },
    'medium': { bg: 'bg-yellow-100 dark:bg-yellow-500/20', text: 'text-yellow-600', border: 'border-yellow-300' },
    'hard': { bg: 'bg-red-100 dark:bg-red-500/20', text: 'text-red-600', border: 'border-red-300' }
  };

  const colors = difficultyColors[challenge.difficulty];
  const progress = (challenge.progress / challenge.total) * 100;

  return (
    <motion.div
      className={`p-6 rounded-2xl border-2 ${colors.border} ${colors.bg} backdrop-blur-xl transition-all hover:shadow-lg`}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-sm font-black text-gray-900 dark:text-white mb-1">{challenge.title}</h4>
          <p className={`text-xs font-bold uppercase tracking-widest ${colors.text}`}>{challenge.difficulty} Challenge</p>
        </div>
        <span className="px-3 py-1 bg-white/40 dark:bg-white/10 backdrop-blur-sm rounded-full text-xs font-black text-orange-600">+{challenge.reward} XP</span>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">{challenge.description}</p>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-black text-gray-500">
          <span>Progress</span>
          <span>{challenge.progress}/{challenge.total}</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-orange-600 to-amber-500"
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// --- Component: Syllabus Item ---
const SyllabusItemCard = ({ item }: { item: SyllabusItem }) => {
  const priorityColors = {
    'low': 'from-blue-400 to-blue-600',
    'medium': 'from-yellow-400 to-orange-500',
    'high': 'from-red-400 to-red-600'
  };

  const statusIcon = {
    'not-started': <Lock size={16} />,
    'in-progress': <Clock size={16} />,
    'completed': <CheckCircle2 size={16} />
  };

  return (
    <motion.div
      className="p-5 rounded-xl bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-800/40 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-md hover:shadow-lg transition-all"
      whileHover={{ x: 4 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">{item.subject}</p>
          <h5 className="text-sm font-black text-gray-900 dark:text-white mb-2">{item.topic}</h5>
        </div>
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${priorityColors[item.priority]} text-white flex items-center justify-center text-xs font-black`}>
          {item.priority === 'high' ? '!' : item.priority === 'medium' ? '-' : 'i'}
        </div>
      </div>
      <div className="space-y-2">
        <div className="w-full h-2 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-orange-600 to-amber-500"
            animate={{ width: `${item.progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-500">{item.progress}% Complete</span>
          <span className={`text-orange-600 ${item.status === 'completed' ? 'text-green-600' : ''}`}>
            {statusIcon[item.status]}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// --- Component: AI Recommendation ---
const AIRecommendationCard = ({ rec }: { rec: AIRecommendation }) => {
  const typeConfig = {
    'weak-area': { icon: <Frown size={20} />, color: 'from-red-500 to-orange-500', bg: 'bg-red-100/80 dark:bg-red-500/20' },
    'strength': { icon: <Smile size={20} />, color: 'from-green-500 to-emerald-500', bg: 'bg-green-100/80 dark:bg-green-500/20' },
    'trending': { icon: <TrendingUp size={20} />, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-100/80 dark:bg-blue-500/20' },
    'skill-gap': { icon: <Lightbulb size={20} />, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-100/80 dark:bg-purple-500/20' }
  };

  const config = typeConfig[rec.type];

  return (
    <motion.div
      className={`p-6 rounded-2xl ${config.bg} border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 8 }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${config.color} text-white flex items-center justify-center shadow-lg flex-shrink-0`}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-black text-gray-900 dark:text-white mb-1">{rec.title}</h4>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{rec.description}</p>
          <button className="text-xs font-black text-orange-600 hover:text-orange-700 uppercase tracking-wider flex items-center gap-2 group">
            {rec.suggestedAction}
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowRight size={12} />
            </motion.span>
          </button>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-300/40 dark:bg-gray-600/40 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-orange-600 to-amber-500"
                animate={{ width: `${rec.confidenceScore}%` }}
              />
            </div>
            <span className="text-[9px] font-black text-gray-500">{rec.confidenceScore}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function EduLearn({ userName }: EduLearnProps) {
  const [activeView, setActiveView] = useState<'overview' | 'challenges' | 'syllabus' | 'recommendations'>('overview');
  const [level, setLevel] = useState(12);
  const [xp, setXp] = useState(480);
  const [streak, setStreak] = useState(14);
  const [resetTimer, setResetTimer] = useState('22:15:08');

  const totalXpForLevel = 1500;

  const [quests, setQuests] = useState<Quest[]>([
    { 
      id: 1, 
      title: 'Analyze Root Cause', 
      description: 'Use the AI Logic Assistant to break down a Class 12 Physics derivation into 5 core concepts.', 
      xp: 150, 
      progress: 0, 
      total: 5, 
      status: 'available',
      category: 'AI'
    },
    { 
      id: 2, 
      title: 'Quick-Fire Recall', 
      description: 'Test your memory on the latest Organic Chemistry formulas using our active recall module.', 
      xp: 100, 
      progress: 2, 
      total: 10, 
      status: 'started',
      category: 'Recall'
    },
    { 
      id: 3, 
      title: 'Global Peer Review', 
      description: 'Find a peer roadmap in the Community Forum and provide 3 constructive feedback points.', 
      xp: 200, 
      progress: 0, 
      total: 3, 
      status: 'available',
      category: 'Social'
    },
  ]);

  const [badges, setBadges] = useState<Badge[]>([
    { id: 1, name: 'First Blood', icon: '⚔️', rarity: 'common', description: 'Complete your first quest', reward: 50, unlocked: true, unlockedDate: '2026-03-15' },
    { id: 2, name: 'Streak Master', icon: '🔥', rarity: 'rare', description: '14-day streak achieved', reward: 150, unlocked: true, unlockedDate: '2026-03-22' },
    { id: 3, name: 'AI Whisperer', icon: '🧠', rarity: 'epic', description: 'Complete 5 AI quests', reward: 300, unlocked: false, progress: 60 },
    { id: 4, name: 'Legend', icon: '👑', rarity: 'legendary', description: 'Reach Level 50', reward: 1000, unlocked: false, progress: 24 },
    { id: 5, name: 'Quick Thinker', icon: '⚡', rarity: 'rare', description: 'Complete quest in under 5 min', reward: 100, unlocked: true, unlockedDate: '2026-03-20' },
    { id: 6, name: 'Leaderboard King', icon: '👼', rarity: 'epic', description: 'Rank #1 on leaderboard', reward: 500, unlocked: false, progress: 45 },
    { id: 7, name: 'Consistency', icon: '📈', rarity: 'rare', description: '7-day streak', reward: 120, unlocked: true, unlockedDate: '2026-03-19' },
    { id: 8, name: 'Perfectionist', icon: '✨', rarity: 'common', description: '100% quest completion', reward: 80, unlocked: false, progress: 85 },
  ]);

  const [weeklyChallenges, setWeeklyChallenges] = useState<WeeklyChallenge[]>([
    { id: 1, title: 'Algorithm Champion', description: 'Complete 5 DSA problems with 90%+ accuracy', reward: 250, progress: 3, total: 5, difficulty: 'hard' },
    { id: 2, title: 'Learning Spree', description: 'Study for 10+ hours this week', reward: 180, progress: 7, total: 10, difficulty: 'medium' },
    { id: 3, title: 'Social Butterfly', description: 'Help 5 peers in the community forum', reward: 150, progress: 2, total: 5, difficulty: 'easy' },
    { id: 4, title: 'Resource Collector', description: 'Save 15 learning resources', reward: 100, progress: 8, total: 15, difficulty: 'easy' },
  ]);

  const [syllabus, setSyllabus] = useState<SyllabusItem[]>([
    { id: 1, subject: 'Data Structures', topic: 'Arrays & Linked Lists', progress: 100, status: 'completed', priority: 'high' },
    { id: 2, subject: 'Data Structures', topic: 'Trees & Graphs', progress: 75, status: 'in-progress', priority: 'high' },
    { id: 3, subject: 'Algorithms', topic: 'Sorting & Searching', progress: 45, status: 'in-progress', priority: 'high' },
    { id: 4, subject: 'Web Dev', topic: 'React Hooks', progress: 60, status: 'in-progress', priority: 'medium' },
    { id: 5, subject: 'System Design', topic: 'Scalability Basics', progress: 20, status: 'not-started', priority: 'medium' },
    { id: 6, subject: 'Database', topic: 'SQL Optimization', progress: 0, status: 'not-started', priority: 'low' },
  ]);

  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([
    { 
      id: 1, 
      type: 'weak-area',
      title: 'Dynamic Programming Gap',
      description: 'Your performance on DP problems is 40% below your average. Time to focus here.',
      suggestedAction: 'Start DP Fundamentals',
      confidenceScore: 92
    },
    { 
      id: 2, 
      type: 'strength',
      title: 'String Manipulation Mastery',
      description: 'You\'re crushing string problems! Consider advanced challenges.',
      suggestedAction: 'Explore Hard Problems',
      confidenceScore: 88
    },
    { 
      id: 3, 
      type: 'trending',
      title: 'System Design Rising',
      description: 'Many high-paying interviews focus on this. Your learning curve is promising.',
      suggestedAction: 'Deep Dive Recommended',
      confidenceScore: 82
    },
    {
      id: 4,
      type: 'skill-gap',
      title: 'Interview Communication',
      description: 'Your mock interviews show good logic but weaker explanations. Let\'s improve this.',
      suggestedAction: 'Join Mock Interview',
      confidenceScore: 78
    },
  ]);

  const leaderboard = [
    { rank: 1, name: 'Satyajit S.', xp: 4890, tier: 'Apex', level: 18, avatar: 'https://i.pravatar.cc/100?u=1', change: 0 },
    { rank: 2, name: 'Nikita R.', xp: 3200, tier: 'Diamond', level: 16, avatar: 'https://i.pravatar.cc/100?u=2', change: 1 },
    { rank: 3, name: 'You', xp: xp, tier: 'Diamond', level: level, avatar: 'https://i.pravatar.cc/100?u=preeti', isUser: true, change: -1 },
    { rank: 4, name: 'Arjun K.', xp: 1150, tier: 'Gold', level: 14, avatar: 'https://i.pravatar.cc/100?u=4', change: 0 },
    { rank: 5, name: 'Priya M.', xp: 980, tier: 'Gold', level: 13, avatar: 'https://i.pravatar.cc/100?u=5', change: 2 },
  ];

  const handleStartQuest = (id: number) => {
    setQuests(prev => prev.map(q => q.id === id ? { ...q, status: 'started' } : q));
    setXp(prev => prev + 30);
  };

  const handleSkipQuest = (id: number) => {
    setQuests(prev => prev.filter(q => q.id !== id));
  };

  const bonusXp = quests.every(q => q.status === 'completed') ? 500 : 0;

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 pb-20">
      
      {/* === HEADER WITH LEVEL & STATS === */}
      <header className="mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 rounded-[3rem] p-8 border border-orange-200/30 dark:border-orange-500/20 shadow-lg">
            
            {/* Left: Branding */}
            <div className="flex items-center gap-6">
              <motion.div 
                className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-2xl shadow-orange-900/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Rocket size={40} />
              </motion.div>
              <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-2">EduLearn Pro</h1>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Interactive Learning Accelerator</p>
              </div>
            </div>

            {/* Center: Level & XP */}
            <div className="flex items-center gap-12">
              <LevelDisplay level={level} xp={xp} totalXpForLevel={totalXpForLevel} />
              <div className="hidden sm:flex flex-col gap-4">
                <div className="flex-1 max-w-md">
                  <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-[10px] font-black text-gray-600 dark:text-gray-300 uppercase tracking-widest">XP Progress</span>
                    <span className="text-xs font-black text-orange-600">{xp} / {totalXpForLevel} XP</span>
                  </div>
                  <div className="w-48 h-3 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden p-0.5 backdrop-blur-sm border border-orange-100/50 dark:border-orange-500/20">
                    <motion.div 
                      animate={{ width: `${(xp / totalXpForLevel) * 100}%` }}
                      className="h-full bg-gradient-to-r from-orange-600 to-amber-400 rounded-full shadow-lg shadow-orange-400/50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Streak & Notifications */}
            <div className="flex items-center gap-6">
              <StreakBooster multiplier={streak} />
              <motion.button 
                className="w-14 h-14 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-100/30 transition-all backdrop-blur-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell size={22} />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* === NAVIGATION TABS === */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex gap-2 p-2 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-200/30 dark:border-gray-700/30 w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: <Grid size={18} /> },
            { id: 'challenges', label: 'Challenges', icon: <Target size={18} /> },
            { id: 'syllabus', label: 'Syllabus', icon: <BookCopy size={18} /> },
            { id: 'recommendations', label: 'AI Insights', icon: <Lightbulb size={18} /> },
          ].map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-black text-sm tracking-wide flex items-center gap-2 transition-all ${
                activeView === tab.id 
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-300/40' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-orange-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* === CONTENT SECTIONS === */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* OVERVIEW TAB */}
          {activeView === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left: Quests & Learning (2 cols) */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Daily Quests Section */}
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">Daily Quests</h2>
                      <p className="text-sm font-medium text-gray-500 max-w-md">AI-generated missions tailored to your learning gaps and goals.</p>
                    </div>
                    <motion.div 
                      className="flex items-center gap-4 px-6 py-3 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-orange-100/50 dark:border-orange-500/20 backdrop-blur-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Reset in</span>
                        <span className="text-base font-black text-gray-900 dark:text-white leading-none font-mono">{resetTimer}</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="space-y-6">
                    {quests.map(quest => (
                      <QuestCard key={quest.id} quest={quest} onStart={handleStartQuest} onSkip={handleSkipQuest} />
                    ))}
                    
                    <motion.button 
                      whileHover={{ scale: 1.02, borderColor: '#ea580c' }}
                      className="w-full h-36 border-4 border-dashed border-gray-200/50 dark:border-gray-700/50 rounded-2xl flex items-center justify-center gap-4 group hover:border-orange-500/50 transition-all backdrop-blur-sm hover:bg-orange-50/20 dark:hover:bg-orange-500/5"
                    >
                      <div className="p-3 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl group-hover:bg-orange-100/50 dark:group-hover:bg-orange-500/20 transition-colors">
                        <Plus className="text-gray-300 group-hover:text-orange-600" />
                      </div>
                      <span className="text-base font-black text-gray-300 group-hover:text-orange-600">Request Custom AI Quest</span>
                    </motion.button>
                  </div>
                </div>

                {/* Resume Learning Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                    <BookCopy className="text-orange-600" size={28} /> Smart Resume
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <motion.div 
                      className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-500/20 dark:to-indigo-600/10 p-8 rounded-2xl border border-indigo-200/50 dark:border-indigo-500/30 shadow-lg backdrop-blur-xl overflow-hidden relative group"
                      whileHover={{ y: -4 }}
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-10 -z-10 group-hover:scale-110 transition-transform duration-700"><Glasses size={80} /></div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="px-4 py-2 bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 rounded-lg text-[10px] font-black uppercase tracking-widest">Active Module</span>
                        <span className="text-xs font-black text-indigo-600">85% Done</span>
                      </div>
                      <h4 className="text-lg font-black text-gray-900 dark:text-white tracking-tight mb-2">Neural Networks vs LLMs</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 font-medium mb-6 italic">Continue at: Step 8: Tokenization</p>
                      <motion.button 
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black text-sm shadow-lg shadow-indigo-300/40 flex items-center justify-center gap-2 hover:shadow-xl transition-all"
                        whileHover={{ gap: 12 }}
                      >
                        Resume Session <ArrowRight size={16} />
                      </motion.button>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-500/20 dark:to-purple-600/10 p-8 rounded-2xl border border-purple-200/50 dark:border-purple-500/30 shadow-lg backdrop-blur-xl overflow-hidden relative group"
                      whileHover={{ y: -4 }}
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-10 -z-10 group-hover:scale-110 transition-transform duration-700"><Target size={80} /></div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="px-4 py-2 bg-purple-600/20 text-purple-600 dark:text-purple-300 rounded-lg text-[10px] font-black uppercase tracking-widest">Upcoming</span>
                        <span className="text-xs font-black text-gray-400">Free</span>
                      </div>
                      <h4 className="text-lg font-black text-gray-900 dark:text-white tracking-tight mb-2">Career Ethics in AI</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 font-medium mb-6 italic">New course added to your roadmap</p>
                      <motion.button 
                        className="w-full py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-black text-sm hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all"
                        whileHover={{ scale: 1.02 }}
                      >
                        View Syllabus
                      </motion.button>
                    </motion.div>
                  </div>
                </div>

              </div>

              {/* Right: Leaderboard & Bonuses (1 col) */}
              <div className="space-y-8 h-fit lg:sticky lg:top-32">
                
                {/* Leaderboard */}
                <motion.div 
                  className="bg-gradient-to-br from-white/60 to-white/30 dark:from-gray-800/60 dark:to-gray-800/30 p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl backdrop-blur-xl relative overflow-hidden isolate"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl -z-10" />
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                      <Trophy className="text-amber-500" size={24} /> Leaderboard
                    </h4>
                    <motion.button 
                      className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                      whileHover={{ rotate: 180 }}
                    >
                      <BarChart3 size={18} />
                    </motion.button>
                  </div>

                  <div className="space-y-3">
                    {leaderboard.map((user, idx) => (
                      <motion.div 
                        key={user.rank}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all backdrop-blur-sm ${
                          user.isUser 
                            ? 'bg-gradient-to-r from-orange-600/30 to-amber-500/30 border border-orange-400/50 dark:border-orange-500/30' 
                            : 'hover:bg-gray-100/50 dark:hover:bg-gray-700/30'
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="relative flex-shrink-0">
                            <span className={`absolute -left-2 -top-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white dark:border-gray-800 ${
                              user.rank === 1 ? 'bg-amber-400 text-white' : user.rank === 2 ? 'bg-gray-300 text-gray-700' : 'bg-amber-600 text-white'
                            }`}>
                              {user.rank}
                            </span>
                            <img src={user.avatar} className="w-12 h-12 rounded-lg object-cover shadow-md" alt={user.name} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-black text-gray-900 dark:text-white tracking-tight truncate">{user.name}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Level {user.level}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="text-right">
                            <p className="text-xs font-black text-orange-600">{user.xp} XP</p>
                            {user.change !== undefined && (
                              <p className={`text-[9px] font-bold ${user.change > 0 ? 'text-green-600' : user.change < 0 ? 'text-red-600' : 'text-gray-400'}`}>
                                {user.change > 0 ? '↑' : user.change < 0 ? '↓' : '-'} {Math.abs(user.change) || '-'}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button 
                    className="w-full mt-6 py-3 text-[10px] font-black text-orange-600 hover:text-orange-700 uppercase tracking-widest hover:bg-orange-100/20 dark:hover:bg-orange-500/10 rounded-lg transition-all"
                    whileHover={{ x: 4 }}
                  >
                    View Full Rankings →
                  </motion.button>
                </motion.div>

                {/* Daily Bonus */}
                <motion.div 
                  className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-900/40 dark:to-orange-900/40 p-8 rounded-2xl text-gray-900 dark:text-white shadow-xl backdrop-blur-xl border border-amber-200/50 dark:border-amber-500/30 relative overflow-hidden isolate group cursor-pointer"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="absolute top-0 right-0 p-8 opacity-20 -z-10 group-hover:scale-125 transition-transform duration-700"><Gift size={100} /></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center">
                      <Crown size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black tracking-tight">Daily Bonus</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-70">All 3 quests done</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-6 leading-relaxed opacity-90">
                    Complete all daily quests to unlock the <span className="font-black text-amber-600 dark:text-amber-300">Legendary Chest</span> with <span className="font-black">+{bonusXp} XP</span>!
                  </p>
                  <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden p-1 shadow-inner backdrop-blur-sm">
                    <motion.div 
                      animate={{ width: `${(quests.filter(q => q.status === 'completed').length / quests.  length) * 100}%` }}
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg"
                    />
                  </div>
                </motion.div>

              </div>

            </motion.div>
          )}

          {/* CHALLENGES TAB */}
          {activeView === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">Weekly Challenges</h2>
                <p className="text-sm font-medium text-gray-500 mb-8">Complete challenges to earn massive XP and exclusive rewards.</p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {weeklyChallenges.map((challenge, idx) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <WeeklyChallengeCard challenge={challenge} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Badge Vault */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                  <Award className="text-purple-600" size={28} /> Badge Vault
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {badges.map((badge, idx) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <BadgeCard badge={badge} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* SYLLABUS TAB */}
          {activeView === 'syllabus' && (
            <motion.div
              key="syllabus"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">Syllabus Tracker</h2>
                <p className="text-sm font-medium text-gray-500 mb-8">Track your learning progress across all subjects and topics.</p>
                
                <div className="grid gap-4">
                  {syllabus.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <SyllabusItemCard item={item} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* RECOMMENDATIONS TAB */}
          {activeView === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">AI Recommendations</h2>
                <p className="text-sm font-medium text-gray-500 mb-8">Personalized insights powered by machine learning analysis of your performance.</p>
                
                <div className="grid gap-6">
                  {aiRecommendations.map((rec, idx) => (
                    <motion.div
                      key={rec.id}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <AIRecommendationCard rec={rec} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* === BACKGROUND GRADIENTS === */}
      <div className="fixed inset-0 pointer-events-none -z-50 opacity-20 select-none overflow-hidden">
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-orange-400/40 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-amber-300/30 blur-[150px]" />
      </div>

    </div>
  );
}
