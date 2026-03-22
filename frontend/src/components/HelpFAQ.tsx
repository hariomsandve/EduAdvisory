import { useState, useRef, useEffect } from 'react';
import {
  Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone,
  Book, Shield, ExternalLink, MessageSquare, LifeBuoy, FileText,
  Zap, Mic, MicOff, ThumbsUp, ThumbsDown, PlayCircle, UserCircle,
  GraduationCap, Users2, Send, X, ChevronRight, Video,
  ArrowRight, Star, Clock, CheckCircle, TrendingUp, Bookmark, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window { webkitSpeechRecognition: any; }
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  userType: 'Student' | 'Parent' | 'Teacher' | 'All';
  helpful?: number;
  views?: number;
}

const faqs: FAQItem[] = [
  { id: '1', category: 'General', userType: 'All', helpful: 94, views: 1240, question: 'What is Edu-Advisory Pro?', answer: 'Edu-Advisory Pro is an AI-powered platform designed to help students and professionals navigate their career paths. We provide personalized roadmaps, skill-sharing opportunities, resume building tools, and AI-driven homework analysis.' },
  { id: '2', category: 'Account', userType: 'All', helpful: 87, views: 880, question: 'How do I reset my password?', answer: 'You can reset your password by going to Settings > Account Security. Click on "Change Password" and follow the instructions. If you cannot log in, use the "Forgot Password" link on the login page.' },
  { id: '3', category: 'AI Tools', userType: 'Student', helpful: 91, views: 1060, question: 'How accurate is the Homework Analyzer?', answer: 'Our Homework Analyzer uses advanced multimodal AI (Gemini) to understand context, text, and mathematical symbols. While highly accurate, we recommend using it as a learning aid to understand the "why" behind solutions rather than just for raw answers.' },
  { id: '4', category: 'Career', userType: 'Student', helpful: 89, views: 750, question: 'How are the Career Roadmaps generated?', answer: 'Roadmaps are generated based on current industry trends, required skill sets, and successful career trajectories. Our AI analyzes thousands of data points to provide the most relevant path for you.' },
  { id: '5', category: 'Privacy', userType: 'All', helpful: 96, views: 920, question: 'Is my data safe?', answer: 'Yes, we take privacy very seriously. Your personal information and uploaded documents are encrypted with AES-256. We do not share your personal data with third parties without your explicit consent.' },
  { id: '6', category: 'General', userType: 'All', helpful: 82, views: 610, question: 'Is there a mobile app?', answer: 'Currently, Edu-Advisory Pro is a web-based application optimized for both desktop and mobile browsers. A native mobile app is in our future roadmap for Q3 2026.' },
  { id: '7', category: 'Account', userType: 'Parent', helpful: 93, views: 480, question: "How do I monitor my child's progress?", answer: "Parents can use the Parent Portal to view real-time analytics, curriculum progress, and teacher feedback. Link your child's account using their unique Invite Code in Settings > Family." },
  { id: '8', category: 'Career', userType: 'Teacher', helpful: 90, views: 340, question: 'Can I assign career exploration tasks to students?', answer: 'Yes! Teachers can create "Classroom Quests" which include career roadmaps, skill assessments, and AI-graded homework challenges. Go to Dashboard > Classroom > New Quest.' },
  { id: '9', category: 'AI Tools', userType: 'All', helpful: 88, views: 700, question: 'What AI models power the platform?', answer: 'We use the latest Gemini multimodal models for homework analysis, career suggestions, and the AI assistant. Our models are continuously updated to reflect the latest research.' },
  { id: '10', category: 'General', userType: 'Student', helpful: 85, views: 560, question: 'How do I earn badges and rewards?', answer: 'Complete daily challenges, finish career roadmap milestones, score high on Aptitude Quizzes, and maintain login streaks to earn XP and unlock exclusive badges on the Gamified Learning page.' },
];

const aiResponses: Record<string, string> = {
  password: 'To reset your password, go to Settings > Account Security and click "Change Password". Need more help? I can walk you through each step!',
  career: 'Career Roadmaps are AI-generated based on current industry trends. Visit the Career Paths section to explore your personalized roadmap.',
  homework: 'The Homework Analyzer supports text, images, and even handwritten notes. Upload your assignment and get step-by-step explanations instantly!',
  roadmap: 'Your career roadmap is in the Career Paths section. It shows skill milestones, learning resources, and job market fit scores.',
  badge: 'Earn badges by completing daily challenges, streaks, and roadmap milestones on the Gamified Learning page!',
  default: "I found some helpful articles for you! Try browsing the FAQ categories above, or rephrase your question and I'll do my best to assist.",
};

const quickActions = [
  { icon: Book, label: 'User Guide', desc: 'Full platform walkthrough', color: 'bg-blue-50 text-blue-600 border-blue-100', action: 'guide' },
  { icon: Zap, label: 'Quick Start', desc: 'Up and running in 5 min', color: 'bg-orange-50 text-orange-600 border-orange-100', action: 'quickstart' },
  { icon: Shield, label: 'Privacy Hub', desc: 'How we protect your data', color: 'bg-green-50 text-green-600 border-green-100', action: 'privacy' },
  { icon: MessageSquare, label: 'Community', desc: 'Join 50k+ learners', color: 'bg-purple-50 text-purple-600 border-purple-100', action: 'community' },
  { icon: TrendingUp, label: 'Changelog', desc: "What's new this month", color: 'bg-rose-50 text-rose-600 border-rose-100', action: 'changelog' },
  { icon: Bookmark, label: 'Tutorials', desc: 'Step-by-step guides', color: 'bg-teal-50 text-teal-600 border-teal-100', action: 'tutorials' },
];

const videos = [
  { title: 'Quick Start: Set Up Your Profile', duration: '3:45', thumb: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&h=450&auto=format&fit=crop', desc: 'Learn how to personalize your profile in under 5 minutes.' },
  { title: 'Mastering AI Homework Analysis', duration: '5:12', thumb: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&h=450&auto=format&fit=crop', desc: 'Upload assignments and get AI explanations instantly.' },
  { title: 'Career Roadmaps Explained', duration: '6:30', thumb: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&h=450&auto=format&fit=crop', desc: 'Navigate your personalized career path with confidence.' },
  { title: 'Gamified Learning & Badges', duration: '4:00', thumb: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=800&h=450&auto=format&fit=crop', desc: 'Earn XP and badges as you learn.' },
];

function getAIReply(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(aiResponses)) {
    if (lower.includes(key)) return aiResponses[key];
  }
  const matchedFaq = faqs.find(f =>
    f.question.toLowerCase().split(' ').some(w => lower.includes(w) && w.length > 4)
  );
  if (matchedFaq) return `Here's what I found: "${matchedFaq.answer}"`;
  return aiResponses.default;
}

export default function HelpFAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [userType, setUserType] = useState<'Student' | 'Parent' | 'Teacher'>('Student');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'ai', text: 'Hello! I\'m your Edu-Advisory Support AI 🎓 Ask me anything about the platform!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, 'up' | 'down'>>({});
  const [savedFaqs, setSavedFaqs] = useState<string[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [showQuickAction, setShowQuickAction] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice input is not supported in this browser. Please try Chrome.');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      setSearchQuery(event.results[0][0].transcript);
      setIsListening(false);
      setShowSuggestions(true);
    };
    recognition.start();
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now(), type: 'user', text: chatInput };
    const query = chatInput;
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);
    setTimeout(() => {
      const reply = getAIReply(query);
      setChatMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  const toggleSave = (id: string) => {
    setSavedFaqs(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedback(prev => ({ ...prev, [id]: type }));
  };

  const categories = ['All', 'General', 'Account', 'AI Tools', 'Career', 'Privacy'];

  const suggestions = searchQuery
    ? faqs.filter(f => f.question.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesUserType = faq.userType === 'All' || faq.userType === userType;
    const matchesSearch = !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesUserType && matchesSearch;
  });

  const contextSuggestions = faqs
    .filter(f => (f.userType === userType || f.userType === 'All') && f.id !== expandedId)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-14 pb-28 relative" onClick={() => setShowSuggestions(false)}>

      {/* ── Hero / Search ────────────────────────────────── */}
      <div className="text-center space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold border border-indigo-100">
          <LifeBuoy size={16} /> Help Center
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          How can we help you?
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg">Search our knowledge base or ask our AI assistant</motion.p>

        {/* Search Bar */}
        <div ref={searchRef} className="relative max-w-2xl mx-auto z-50" onClick={e => e.stopPropagation()}>
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={21} />
          <input
            type="text"
            placeholder="Search questions, keywords, or topics..."
            value={searchQuery}
            onFocus={() => setShowSuggestions(true)}
            onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
            className="w-full pl-14 pr-32 py-4.5 py-[18px] bg-white border-2 border-gray-200 rounded-3xl shadow-xl shadow-indigo-50/60 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-base font-medium"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button onClick={handleVoiceInput} title="Voice search"
              className={`p-2.5 rounded-2xl transition-all ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'hover:bg-indigo-50 text-gray-400 hover:text-indigo-600'}`}>
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button onClick={() => setShowSuggestions(false)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-colors">
              Search
            </button>
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden">
                <p className="px-5 pt-4 pb-2 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Suggestions</p>
                {suggestions.map(s => (
                  <button key={s.id} onClick={() => { setSearchQuery(s.question); setShowSuggestions(false); setExpandedId(s.id); }}
                    className="w-full px-5 py-3.5 text-left hover:bg-indigo-50 flex items-center gap-3 transition-colors group border-t border-gray-50">
                    <Search size={15} className="text-gray-300 group-hover:text-indigo-400 transition-colors shrink-0" />
                    <span className="text-gray-700 font-semibold text-sm">{s.question}</span>
                    <span className="ml-auto text-[11px] font-bold text-gray-300 bg-gray-50 px-2 py-1 rounded-lg">{s.category}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats row */}
        <div className="flex justify-center gap-8 pt-2">
          {[{ val: '50+', lbl: 'Articles' }, { val: '24/7', lbl: 'AI Support' }, { val: '98%', lbl: 'Resolved' }].map(s => (
            <div key={s.lbl} className="text-center">
              <p className="text-xl font-extrabold text-indigo-700">{s.val}</p>
              <p className="text-xs text-gray-400 font-semibold">{s.lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── User Type Selector ───────────────────────────── */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">I am a...</p>
        <div className="flex gap-2 p-1.5 bg-gray-100 rounded-2xl">
          {(['Student', 'Parent', 'Teacher'] as const).map(type => (
            <button key={type} onClick={() => { setUserType(type); setActiveCategory('All'); }}
              className={`px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all flex items-center gap-2 ${userType === type ? 'bg-white text-indigo-700 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}>
              {type === 'Student' && <GraduationCap size={16} />}
              {type === 'Parent' && <UserCircle size={16} />}
              {type === 'Teacher' && <Users2 size={16} />}
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* ── Quick Actions Grid ───────────────────────────── */}
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-5">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((item) => (
            <motion.button key={item.label} whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setShowQuickAction(item.action)}
              className={`p-5 bg-white rounded-3xl border shadow-sm hover:shadow-lg transition-all flex items-start gap-4 text-left ${item.color}`}>
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
                <item.icon size={22} />
              </div>
              <div>
                <p className="font-extrabold text-gray-900 text-sm">{item.label}</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{item.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Action Modal */}
      <AnimatePresence>
        {showQuickAction && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
            onClick={() => setShowQuickAction(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-3xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold text-gray-900 capitalize">{quickActions.find(q => q.action === showQuickAction)?.label}</h3>
                <button onClick={() => setShowQuickAction(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X size={20} /></button>
              </div>
              <p className="text-gray-500 leading-relaxed mb-6">
                {showQuickAction === 'guide' && "Our full user guide covers every feature of Edu-Advisory Pro with screenshots and walkthroughs. Start from the Dashboard overview and work your way through each module."}
                {showQuickAction === 'quickstart' && "Get started in 5 minutes: 1) Complete your profile, 2) Set your career goal, 3) Try the Homework Analyzer, 4) Explore your Career Roadmap. That's it!"}
                {showQuickAction === 'privacy' && "We use AES-256 encryption, never sell your data, and let you export or delete your account at any time. Your data is yours — always."}
                {showQuickAction === 'community' && "Join our Discord community of 50,000+ learners! Share roadmap tips, get peer feedback on resumes, and join weekly career Q&A sessions."}
                {showQuickAction === 'changelog' && "March 2026: New Gamified Learning badges, improved AI accuracy for Math problems, Parent Portal dashboard enhancements, and Career Roadmap milestone celebrations."}
                {showQuickAction === 'tutorials' && "Browse step-by-step video tutorials for every feature. Each tutorial is under 6 minutes and includes timestamps for easy navigation."}
              </p>
              <button onClick={() => setShowQuickAction(null)}
                className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-extrabold hover:bg-indigo-700 transition-colors">
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Context-Aware Suggestions ────────────────────── */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">Recommended for {userType}s</h3>
              <p className="text-indigo-200 text-xs">Most viewed by people like you</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {contextSuggestions.map(s => (
              <button key={s.id}
                onClick={() => { setExpandedId(s.id); document.getElementById(`faq-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
                className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl px-4 py-3 text-left transition-all group">
                <p className="text-sm font-bold leading-snug">{s.question}</p>
                <p className="text-xs text-indigo-200 mt-1 flex items-center gap-1"><Clock size={11} /> {s.views} views</p>
              </button>
            ))}
          </div>
        </div>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      {/* ── FAQ Section ──────────────────────────────────── */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          {savedFaqs.length > 0 && (
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
              {savedFaqs.length} saved
            </span>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-extrabold transition-all ${activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Search size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-bold text-lg">No results found</p>
              <p className="text-sm mt-1">Try a different search term or category</p>
            </div>
          ) : filteredFaqs.map((faq, i) => (
            <motion.div key={faq.id} id={`faq-${faq.id}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-3xl border overflow-hidden transition-all ${expandedId === faq.id ? 'border-indigo-200 shadow-lg shadow-indigo-50' : 'border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'}`}>

              <button onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full p-5 flex items-center gap-4 text-left">
                <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-gray-900 text-base leading-snug">{faq.question}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-lg">{faq.category}</span>
                    <span className="text-[11px] text-gray-300 flex items-center gap-1"><Star size={10} className="fill-amber-400 text-amber-400" />{faq.helpful}% helpful</span>
                    <span className="text-[11px] text-gray-300 flex items-center gap-1"><Clock size={10} />{faq.views} views</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={e => { e.stopPropagation(); toggleSave(faq.id); }}
                    className={`p-1.5 rounded-lg transition-colors ${savedFaqs.includes(faq.id) ? 'text-indigo-600 bg-indigo-50' : 'text-gray-300 hover:text-indigo-400'}`}
                    title="Save FAQ">
                    <Bookmark size={16} fill={savedFaqs.includes(faq.id) ? 'currentColor' : 'none'} />
                  </button>
                  {expandedId === faq.id ? <ChevronUp className="text-indigo-500" size={20} /> : <ChevronDown className="text-gray-400" size={20} />}
                </div>
              </button>

              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden">
                    <div className="px-6 pb-6 border-t border-indigo-50">
                      <p className="text-gray-600 leading-relaxed pt-4 text-sm">{faq.answer}</p>
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-400 font-medium">Was this helpful?</span>
                          <button onClick={() => handleFeedback(faq.id, 'up')}
                            className={`p-1.5 rounded-lg transition-all ${feedback[faq.id] === 'up' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100 text-gray-400'}`}>
                            <ThumbsUp size={16} />
                          </button>
                          <button onClick={() => handleFeedback(faq.id, 'down')}
                            className={`p-1.5 rounded-lg transition-all ${feedback[faq.id] === 'down' ? 'bg-red-100 text-red-500' : 'hover:bg-gray-100 text-gray-400'}`}>
                            <ThumbsDown size={16} />
                          </button>
                          <AnimatePresence>
                            {feedback[faq.id] && (
                              <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle size={12} /> Thanks for the feedback!
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        <button
                          onClick={() => { setChatInput(faq.question); setIsChatOpen(true); }}
                          className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1">
                          <MessageCircle size={13} /> Ask AI
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Video Tutorials ───────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
            <PlayCircle className="text-indigo-600" size={24} /> Video Tutorials
          </h2>
          <button className="text-sm font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {videos.map((v, i) => (
            <motion.div key={i} whileHover={{ y: -4 }}
              className="group relative rounded-3xl overflow-hidden shadow-xl bg-gray-900 cursor-pointer"
              onClick={() => setActiveVideo(i === activeVideo ? null : i)}>
              <div className="aspect-video relative">
                <img src={v.thumb} alt={v.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div whileHover={{ scale: 1.1 }} className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40">
                    <Video className="text-white ml-1" size={26} />
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-white font-extrabold text-base leading-snug">{v.title}</h4>
                  <p className="text-gray-300 text-xs mt-1 flex items-center gap-2"><Clock size={11} />{v.duration} · {v.desc}</p>
                </div>
              </div>
              {activeVideo === i && (
                <div className="bg-indigo-900 text-white p-4 text-sm font-medium text-center animate-pulse">
                  ▶ Playing — connect your video source to embed real content
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Contact Section ───────────────────────────────── */}
      <div className="bg-indigo-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold mb-2">Still have questions?</h2>
            <p className="text-indigo-200 text-sm">Our team is ready to help. Choose how you'd like to connect.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { Icon: MessageCircle, title: 'Live Chat', desc: 'Available 24/7', btn: 'Start Chat', action: () => setIsChatOpen(true) },
              { Icon: Mail, title: 'Email Support', desc: 'Response in 24h', btn: 'Send Email', action: () => window.open('mailto:support@eduadvisory.com') },
              { Icon: Phone, title: 'Call Us', desc: 'Mon-Fri, 9am-6pm', btn: 'Call Now', action: () => window.open('tel:+1234567890') },
            ].map(({ Icon, title, desc, btn, action }) => (
              <div key={title} className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 space-y-4 hover:bg-white/15 transition-colors">
                <Icon size={30} className="text-indigo-300" />
                <div><h3 className="font-extrabold">{title}</h3><p className="text-sm text-indigo-200">{desc}</p></div>
                <button onClick={action} className="w-full py-2.5 bg-white text-indigo-900 rounded-2xl font-extrabold text-sm hover:bg-indigo-50 transition-colors">{btn}</button>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/15 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-800/40 rounded-full -ml-32 -mb-32 blur-3xl" />
      </div>

      {/* ── Footer Links ──────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-8 text-sm font-extrabold text-gray-400 uppercase tracking-widest">
        {[{ icon: FileText, label: 'User Manual' }, { icon: Shield, label: 'Privacy Policy' }, { icon: ExternalLink, label: 'Terms of Service' }].map(({ icon: Icon, label }) => (
          <button key={label} className="hover:text-indigo-600 flex items-center gap-2 transition-colors">
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* ── Floating AI Chatbot ───────────────────────────── */}
      <div className="fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-3">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl border border-indigo-100 flex flex-col w-[360px] h-[520px] overflow-hidden mb-2">
              {/* Header */}
              <div className="bg-indigo-900 px-5 py-4 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm">Support AI</h4>
                    <p className="text-[10px] text-indigo-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" /> Online
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-xl transition-colors"><X size={18} /></button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/40">
                {chatMessages.map(msg => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] font-medium leading-relaxed shadow-sm ${msg.type === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                    }`}>{msg.text}</div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 shadow-sm">
                      {[0, 0.15, 0.3].map((d, i) => (
                        <motion.span key={i} className="w-2 h-2 bg-indigo-400 rounded-full block"
                          animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: d }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Chips */}
              <div className="px-4 pt-2 pb-1 flex gap-2 overflow-x-auto no-scrollbar border-t border-gray-100 bg-white">
                {['Reset password', 'Career roadmap', 'Homework AI'].map(chip => (
                  <button key={chip} onClick={() => { setChatInput(chip); }}
                    className="shrink-0 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors">
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-gray-100">
                <div className="relative flex items-center gap-2">
                  <input type="text" value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleChatSend()}
                    placeholder="Ask anything..."
                    className="flex-1 pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all" />
                  <button onClick={handleChatSend}
                    className="w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 shrink-0">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-300 transition-colors relative ${isChatOpen ? 'bg-gray-900' : 'bg-indigo-700'}`}>
          {isChatOpen ? <X size={26} /> : <MessageCircle size={26} />}
          {!isChatOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500" />
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
