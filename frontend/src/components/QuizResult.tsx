import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  Zap, Brain, BarChart3, TrendingUp, ArrowRight,
  RotateCcw, Sparkles, Target, CheckCircle2, ChevronRight, Pause, Play, Compass, ChevronDown,
  Search, Lightbulb, Users, PenTool
} from 'lucide-react';

// =============================================
// CAREER DIRECTORY DATA
// =============================================
const careerDirectory = [
  {
    domain: "STEM & Tech",
    emoji: "💻",
    color: "#3b82f6",
    bg: "#eff6ff",
    degrees: ["B.Tech / B.E.", "BCA / MCA", "B.Sc Computer Science", "B.Sc Mathematics", "B.Sc Physics"],
    careers: ["Software Engineer", "Data Scientist", "AI/ML Engineer", "Cybersecurity Analyst", "Cloud Architect", "Blockchain Developer", "DevOps Engineer", "Game Developer", "Robotics Engineer", "Network Engineer"]
  },
  {
    domain: "Medical",
    emoji: "🏥",
    color: "#ef4444",
    bg: "#fef2f2",
    degrees: ["MBBS", "BDS (Dentistry)", "B.Pharm / M.Pharm", "B.Sc Nursing", "BAMS / BHMS", "B.Sc Physiotherapy"],
    careers: ["Doctor / Specialist", "Dentist", "Pharmacist", "Nurse", "Physiotherapist", "Medical Researcher", "Public Health Specialist", "Mental Health Counselor", "Ayurvedic Practitioner", "Veterinary Surgeon"]
  },
  {
    domain: "Business",
    emoji: "💼",
    color: "#f59e0b",
    bg: "#fffbeb",
    degrees: ["BBA / MBA", "B.Com / M.Com", "CA (Chartered Accountancy)", "CS (Company Secretary)", "Economics", "Marketing"],
    careers: ["Business Analyst", "Chartered Accountant", "Product Manager", "Marketing Director", "Startup Founder", "HR Manager", "Investment Banker", "Supply Chain Manager", "E-commerce Specialist", "Financial Advisor"]
  },
  {
    domain: "Arts / Creative",
    emoji: "🎨",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    degrees: ["B.Des (Design)", "BFA (Fine Arts)", "BA Mass Communication", "BA Journalism", "B.Arch (Architecture)", "BA Psychology"],
    careers: ["UI/UX Designer", "Graphic Designer", "Architect", "Film Director", "Journalist", "Psychologist / Counselor", "Lawyer", "Content Creator", "Social Media Manager", "Interior Designer"]
  },
  {
    domain: "Vocational / Emerging",
    emoji: "⚡",
    color: "#10b981",
    bg: "#ecfdf5",
    degrees: ["Diploma (ITI)", "Aviation Crew Cert.", "Culinary Arts", "Hotel Management", "Digital Marketing Cert.", "Web3 / Blockchain Cert."],
    careers: ["Ethical Hacker", "Blockchain Developer", "Digital Marketer", "Aviation Pilot / Cabin Crew", "Chef / Culinary Expert", "Event Manager", "Fitness Trainer", "Yoga Instructor", "Esports Player", "Influencer / Creator"]
  }
];

interface QuizResultProps {
  onDashboard: () => void;
  onRetake: () => void;
  quizResult?: any; // passed from CareerQuiz onComplete
}

// ── tiny animated ring for match% ──
function MatchRing({ pct, color, size = 160 }: { pct: number; color: string; size?: number }) {
  const [animated, setAnimated] = useState(0);
  const r = (size / 2) - 14;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const id = setTimeout(() => setAnimated(pct), 300);
    return () => clearTimeout(id);
  }, [pct]);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size/2} cy={size/2} r={r} strokeWidth={10} fill="none"
        stroke="rgba(255,255,255,0.1)" />
      <circle cx={size/2} cy={size/2} r={r} strokeWidth={10} fill="none"
        stroke={color} strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ - (animated / 100) * circ}
        style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)' }} />
    </svg>
  );
}

// ── horizontal bar for career comparison ──
function CompBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 400 + delay); return () => clearTimeout(t); }, [pct, delay]);
  const color = '#6366f1'; // Unified indigo-500 professional accent
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-semibold text-slate-700">{label}</span>
        <span className="font-bold text-indigo-500">{pct}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-[1.2s] ease-out"
          style={{ width: `${w}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
      </div>
    </div>
  );
}

export default function QuizResult({ onDashboard, onRetake, quizResult }: QuizResultProps) {
  const [countdown, setCountdown] = useState(15);
  const [phase, setPhase] = useState<'analysis' | 'redirecting'>('analysis');
  const [profileAnimated, setProfileAnimated] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [openDomain, setOpenDomain] = useState<number | null>(null);
  const [showDirectory, setShowDirectory] = useState(false);

  const cogProfile = [
    { label: 'Analytical', pct: 72, color: '#3b82f6', icon: Search },
    { label: 'Creative',   pct: 58, color: '#8b5cf6', icon: Lightbulb },
    { label: 'Social',     pct: 85, color: '#f97316', icon: Users },
    { label: 'Hands-On',  pct: 45, color: '#10b981', icon: PenTool },
  ];

  // Default mock data — override with real quizResult if provided
  const data = {
    career: quizResult?.careers?.[0] ?? 'Doctor / Medical Professional',
    match: 87,
    identity: quizResult?.title ?? 'STRATEGIC LEADER',
    identityTag: quizResult?.subtitle ?? 'People & Vision',
    description: quizResult?.description ?? 'Aligns with your desire to help others and analytical skills.',
    superpowers: ['Empathy', 'Communication', 'Leadership Support'],
    comparison: [
      { label: quizResult?.careers?.[0] ?? 'Doctor / Medical Professional', pct: 87, color: '#f97316' },
      { label: quizResult?.careers?.[1] ?? 'UI/UX Designer', pct: 62, color: '#8b5cf6' },
      { label: quizResult?.careers?.[2] ?? 'Software Developer', pct: 55, color: '#3b82f6' },
      { label: quizResult?.careers?.[3] ?? 'Data Scientist', pct: 48, color: '#10b981' },
    ],
    trendingFields: ['EdTech', 'Social Entrepreneurship', 'HR Tech', 'HealthTech'],
    skills: ['Critical Thinking', 'Emotional Intelligence', 'Adaptability'],
  };

  // Countdown + auto-redirect
  useEffect(() => {
    if (isPaused || phase === 'redirecting') return;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase('redirecting');
          setTimeout(onDashboard, 600);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onDashboard, isPaused, phase]);

  // Trigger profile ring animations after mount
  useEffect(() => {
    const t = setTimeout(() => setProfileAnimated(true), 700);
    return () => clearTimeout(t);
  }, []);

  const accentColor = '#f97316';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50 font-sans"
      style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
    >
      {/* ── HERO HEADER ── */}
      <div className="relative overflow-hidden" style={{ background: 'radial-gradient(circle at top right, #f97316, #ea580c)' }}>

        {/* Abstract Geometric Pattern Context */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '32px 32px' }} />

        {/* Glow orbs for depth */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl opacity-30 mix-blend-overlay"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl opacity-30 mix-blend-overlay"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-white">
          {/* Top badge */}
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 mb-8 w-fit px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur text-xs font-bold tracking-widest text-orange-300">
            <Sparkles size={12} /> DATA ANALYSIS COMPLETE
          </motion.div>

          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
            {/* Left: text */}
            <div className="flex-1">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                className="text-xs tracking-[0.3em] text-slate-400 mb-2 font-mono uppercase">
                Primary Career Match
              </motion.p>
              <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
                className="text-3xl md:text-5xl font-black leading-tight mb-3"
                style={{ background: 'linear-gradient(135deg,#fff,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {data.career}
              </motion.h1>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-3 mt-4">
                {data.skills.map((sk, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/20 text-slate-300">
                    ✦ {sk}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: ring */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
              className="relative shrink-0">
              <MatchRing pct={data.match} color={accentColor} size={160} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{data.match}%</span>
                <span className="text-xs text-orange-300 font-bold tracking-widest">MATCH</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div className="max-w-5xl mx-auto px-6 -mt-6 pb-24 grid md:grid-cols-3 gap-6">

        {/* ── SUPERPOWER IDENTIFICATION ── */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
          className="md:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Zap size={16} className="text-amber-500" />
            </div>
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Your Superpowers</h2>
          </div>
          <div className="space-y-3">
            {data.superpowers.map((sp, i) => (
              <motion.div key={i} initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl border border-orange-100 bg-orange-50/50">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                  style={{ background: `hsl(${25 + i * 40},90%,55%)` }}>
                  {i + 1}
                </div>
                <span className="font-bold text-slate-700 text-sm">{sp}</span>
                <CheckCircle2 size={14} className="ml-auto text-orange-400" />
              </motion.div>
            ))}
          </div>

          {/* Identity summary */}
          <div className="mt-5 pt-5 border-t border-slate-100">
            <p className="text-[10px] tracking-[0.3em] text-slate-400 font-bold mb-2 uppercase">Identity</p>
            <p className="text-base font-black text-slate-900">{data.identity}</p>
            <p className="text-xs text-orange-500 font-bold">{data.identityTag}</p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{data.description}</p>
          </div>
        </motion.div>

        {/* ── COMPETITIVE ANALYSIS ── */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
          className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <BarChart3 size={16} className="text-blue-500" />
            </div>
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Career Match Comparison</h2>
          </div>

          <div className="space-y-5">
            {data.comparison.map((item, i) => (
              <CompBar key={i} label={item.label} pct={item.pct} delay={i * 120} />
            ))}
          </div>

          {/* Top match callout */}
          <div className="mt-6 p-4 rounded-xl border border-orange-200 bg-orange-50 flex items-center gap-4">
            <Target size={22} className="text-orange-500 shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-slate-800 text-sm">{data.career}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {data.match}% match based on your skill profile and personality results.
              </p>
            </div>
            <span className="text-xl font-black text-orange-500">{data.match}%</span>
          </div>
        </motion.div>

        {/* ── TRENDING FIELDS ── */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
          className="md:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <TrendingUp size={16} className="text-green-500" />
            </div>
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Trending For You</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.trendingFields.map((f, i) => (
              <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.7 + i * 0.08, type: 'spring', stiffness: 200 }}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 bg-transparent hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-default"
              >
                {f}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── BRAIN PROFILE ── */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.65 }}
          className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <Brain size={16} className="text-purple-500" />
            </div>
            <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Your Cognitive Profile</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cogProfile.map((dim, i) => {
              const circ = 2 * Math.PI * 34; // Slightly smaller radius to accommodate thicker stroke
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                      <circle cx="48" cy="48" r="34" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                      <circle cx="48" cy="48" r="34" fill="none"
                        stroke={dim.color} strokeWidth="12" strokeLinecap="round"
                        strokeDasharray={circ}
                        strokeDashoffset={profileAnimated ? circ * (1 - dim.pct / 100) : circ}
                        style={{ transition: `stroke-dashoffset 1.2s ease ${i * 0.12}s` }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-0.5">
                      <dim.icon size={18} style={{ color: dim.color }} className="mb-0.5" />
                      <span className="text-[10px] font-black text-slate-700 leading-none">
                        {profileAnimated ? dim.pct : 0}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-600 mt-3">{dim.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── EXPLORE OTHER COURSES (CAREER DIRECTORY) ── */}
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}
        className="max-w-5xl mx-auto px-6 pb-32">
        
        {!showDirectory ? (
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => { setShowDirectory(true); setIsPaused(true); }}
              className="flex items-center gap-3 px-8 py-5 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all text-slate-800 font-bold text-lg group w-full sm:w-auto justify-center"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass size={24} className="text-orange-500" />
              </div>
              <span>Explore Other Courses</span>
              <ChevronDown size={20} className="ml-2 text-slate-400 group-hover:text-orange-500 transition-colors" />
            </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Compass size={20} className="text-orange-500" />
                </div>
                <div>
                  <h2 className="font-black text-slate-800 text-lg">Explore Other Courses</h2>
                  <p className="text-xs text-slate-500">View the complete career landscape mapping degrees to options</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {careerDirectory.map((domain, di) => (
                <div key={di} className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-300"
                  style={{ borderColor: openDomain === di ? domain.color : '#e2e8f0' }}>
                  <button
                    onClick={() => setOpenDomain(openDomain === di ? null : di)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{domain.emoji}</span>
                      <span className="font-bold text-slate-700">{domain.domain}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: domain.bg, color: domain.color }}>
                        {domain.degrees.length + domain.careers.length} entries
                      </span>
                      <ChevronDown size={18} className="text-slate-400 transition-transform duration-300"
                        style={{ transform: openDomain === di ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {openDomain === di && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-slate-50 border-t border-slate-200">
                        <div className="p-6 grid md:grid-cols-2 gap-8">
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-xs font-black tracking-widest uppercase" style={{ color: domain.color }}>Common Degrees</span>
                              <div className="h-px flex-1" style={{ background: domain.bg }}></div>
                            </div>
                            <ul className="space-y-3">
                              {domain.degrees.map((deg, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: domain.color }}></div>
                                  <span className="text-sm text-slate-600 font-medium">{deg}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-xs font-black tracking-widest uppercase" style={{ color: domain.color }}>Career Options</span>
                              <div className="h-px flex-1" style={{ background: domain.bg }}></div>
                            </div>
                            <ul className="space-y-3">
                              {domain.careers.map((car, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className="p-0.5 rounded-md mt-0.5 shrink-0" style={{ background: domain.bg }}>
                                    <ArrowRight size={12} style={{ color: domain.color }} />
                                  </div>
                                  <span className="text-sm text-slate-600 font-medium">{car}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ── STICKY FOOTER WITH COUNTDOWN ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 shadow-2xl z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Countdown ring */}
            <div className="relative w-10 h-10">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                <circle cx="20" cy="20" r="16" fill="none"
                  stroke="#475569" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 16}`}
                  strokeDashoffset={`${2 * Math.PI * 16 * (1 - countdown / 15)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear' }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black text-slate-600">{countdown}</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              {isPaused ? 'Auto-redirect paused' : (
                <>Redirecting to dashboard in <span className="font-black text-slate-700">{countdown}s</span></>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">
              {isPaused ? <Play size={15} /> : <Pause size={15} />} {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button onClick={onRetake}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">
              <RotateCcw size={15} /> Retake Quiz
            </button>
            <button onClick={onDashboard}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg transition-all hover:brightness-110 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#475569,#334155)', boxShadow: '0 4px 16px #47556940' }}>
              Go to Dashboard <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-slate-100">
          <div className="h-full bg-slate-600 transition-all duration-1000 ease-linear"
            style={{ width: `${((15 - countdown) / 15) * 100}%` }} />
        </div>
      </div>

      {/* Redirect overlay */}
      <AnimatePresence>
        {phase === 'redirecting' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-white flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-orange-500/40">
                <ChevronRight size={40} className="text-white" />
              </div>
              <p className="text-xl font-black text-slate-900">Loading Dashboard…</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
