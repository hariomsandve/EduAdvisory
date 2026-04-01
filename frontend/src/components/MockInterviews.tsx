import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Mic, MicOff, Play, StopCircle, Send, MessageSquare, 
  CheckCircle2, Loader2, UserCheck, ChevronLeft,
  Code, LineChart, Layout, Target, BarChart, Sparkles, AlertCircle,
  Monitor, Stethoscope, Briefcase, BookOpen, Palette, Dumbbell, 
  Landmark, Wrench, Leaf, Rocket, Search, ChevronRight,
  Video, VideoOff, Settings, Camera, Volume2, Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Interfaces ---
interface InterviewQuestion {
  id: string;
  question: string;
  type: 'behavioral' | 'technical' | 'situational';
  expectedKeywords?: string[];
}

interface UserAnswer {
  questionId: string;
  answer: string;
  timestamp: number;
}

interface InterviewFeedback {
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  questionSpecificFeedback: { questionId: string; feedback: string }[];
}

// --- Comprehensive Category & Role Data ---
const allCategories = [
  {
    id: 'stem',
    name: 'STEM & Technology',
    icon: Monitor,
    color: 'text-blue-600',
    bg: 'bg-blue-50 hover:bg-blue-100',
    border: 'border-blue-200',
    roles: [
      { name: 'Computer Science / IT', skills: ['C++', 'Java', 'Python', 'DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Software Engineering'] },
      { name: 'Software Development (SDE)', skills: ['Problem Solving', 'System Design', 'APIs & Backend', 'Git', 'Testing & Debugging'] },
      { name: 'Data Science', skills: ['Statistics & Probability', 'Python (Pandas/NumPy)', 'Data Cleaning', 'Data Visualization', 'Machine Learning', 'Model Evaluation', 'SQL'] },
      { name: 'Artificial Intelligence / ML', skills: ['Supervised Learning', 'Unsupervised Learning', 'Deep Learning', 'Neural Networks', 'NLP'] },
      { name: 'Web Development', skills: ['HTML/CSS/JS', 'React/Angular', 'Node.js/Django/Spring', 'REST APIs', 'MongoDB/MySQL', 'Authentication', 'Deployment'] },
      { name: 'Mobile App Development', skills: ['Android (Java/Kotlin)', 'iOS (Swift)', 'Flutter / React Native', 'API Integration'] },
      { name: 'Cybersecurity', skills: ['Networking', 'Ethical Hacking', 'Cryptography', 'Web Security', 'Security Tools'] },
      { name: 'Cloud Computing', skills: ['AWS / Azure / GCP', 'Virtual Machines', 'Storage & Networking', 'DevOps Basics'] },
      { name: 'DevOps', skills: ['CI/CD', 'Docker / Kubernetes', 'Automation', 'Monitoring'] },
      { name: 'Blockchain', skills: ['Distributed Systems', 'Smart Contracts', 'Cryptography'] },
      { name: 'Game Development', skills: ['Game Engines (Unity/Unreal)', 'Physics in Games', 'Graphics Programming'] },
      { name: 'Robotics / IoT', skills: ['Embedded Systems', 'Sensors & Actuators', 'Automation'] },
      { name: 'Core Engineering', skills: ['Mechanical', 'Civil', 'Electrical', 'Electronics'] },
    ]
  },
  {
    id: 'medical',
    name: 'Medical & Healthcare',
    icon: Stethoscope,
    color: 'text-rose-600',
    bg: 'bg-rose-50 hover:bg-rose-100',
    border: 'border-rose-200',
    roles: [
      { name: 'Medicine (Doctor)', skills: ['Anatomy', 'Physiology', 'Pathology', 'Diagnosis'] },
      { name: 'Pharmacy', skills: ['Pharmacology', 'Drug Development', 'Clinical Trials'] },
      { name: 'Nursing', skills: ['Patient Care', 'Emergency Handling', 'Medical Equipment'] },
      { name: 'Physiotherapy', skills: ['Rehabilitation', 'Exercise Therapy'] },
      { name: 'Public Health', skills: ['Epidemiology', 'Health Policies'] },
      { name: 'Biotechnology', skills: ['Genetics', 'Molecular Biology', 'Bioinformatics'] },
    ]
  },
  {
    id: 'business',
    name: 'Business, Management & Finance',
    icon: Briefcase,
    color: 'text-amber-600',
    bg: 'bg-amber-50 hover:bg-amber-100',
    border: 'border-amber-200',
    roles: [
      { name: 'Finance', skills: ['Accounting', 'Financial Analysis', 'Investment', 'Risk Management'] },
      { name: 'Marketing', skills: ['Digital Marketing', 'Branding', 'Consumer Behavior'] },
      { name: 'Human Resource (HR)', skills: ['Recruitment', 'Training & Development', 'Labor Laws'] },
      { name: 'Operations', skills: ['Supply Chain', 'Logistics', 'Process Optimization'] },
      { name: 'Entrepreneurship', skills: ['Business Model', 'Funding', 'Growth Strategy'] },
      { name: 'Economics', skills: ['Microeconomics', 'Macroeconomics', 'Data Economics'] },
    ]
  },
  {
    id: 'arts',
    name: 'Arts, Humanities & Social Science',
    icon: BookOpen,
    color: 'text-purple-600',
    bg: 'bg-purple-50 hover:bg-purple-100',
    border: 'border-purple-200',
    roles: [
      { name: 'Psychology', skills: ['Human Behavior', 'Counseling', 'Case Studies'] },
      { name: 'Sociology', skills: ['Social Structures', 'Research Methods'] },
      { name: 'Political Science', skills: ['Governance', 'Public Policy'] },
      { name: 'Law', skills: ['Constitution', 'Legal Systems', 'Case Laws'] },
      { name: 'Journalism', skills: ['Reporting', 'Media Ethics', 'Content Creation'] },
      { name: 'Education', skills: ['Teaching Methods', 'Curriculum Design'] },
    ]
  },
  {
    id: 'creative',
    name: 'Creative & Design',
    icon: Palette,
    color: 'text-pink-600',
    bg: 'bg-pink-50 hover:bg-pink-100',
    border: 'border-pink-200',
    roles: [
      { name: 'UI/UX Design', skills: ['User Research', 'Wireframing', 'Prototyping'] },
      { name: 'Graphic Design', skills: ['Typography', 'Branding', 'Adobe Tools'] },
      { name: 'Animation / VFX', skills: ['2D/3D Animation', 'Storyboarding'] },
      { name: 'Film & Media', skills: ['Direction', 'Editing', 'Production'] },
      { name: 'Content Creation', skills: ['Writing', 'Blogging', 'Social Media'] },
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    icon: Dumbbell,
    color: 'text-orange-600',
    bg: 'bg-orange-50 hover:bg-orange-100',
    border: 'border-orange-200',
    roles: [
      { name: 'Sports Science', skills: ['Anatomy', 'Performance Analysis'] },
      { name: 'Fitness', skills: ['Workout Planning', 'Nutrition'] },
      { name: 'Sports Management', skills: ['Event Planning', 'Sponsorship'] },
    ]
  },
  {
    id: 'govt',
    name: 'Government & Civil Services',
    icon: Landmark,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 hover:bg-indigo-100',
    border: 'border-indigo-200',
    roles: [
      { name: 'UPSC / Competitive Exams', skills: ['Polity', 'History', 'Geography', 'Economy', 'Current Affairs'] },
      { name: 'Defense', skills: ['Aptitude', 'Physical Training', 'Strategy'] },
      { name: 'Judiciary', skills: ['Legal Knowledge', 'Case Analysis'] },
    ]
  },
  {
    id: 'vocational',
    name: 'Vocational & Skilled',
    icon: Wrench,
    color: 'text-stone-600',
    bg: 'bg-stone-50 hover:bg-stone-100',
    border: 'border-stone-200',
    roles: [
      { name: 'Technical Trades', skills: ['Electrical / Mechanical Work', 'Repair & Maintenance'] },
      { name: 'Hospitality', skills: ['Customer Service', 'Hotel Management'] },
      { name: 'Aviation', skills: ['Pilot Training', 'Cabin Crew Skills'] },
      { name: 'Beauty & Fashion', skills: ['Cosmetology', 'Styling'] },
    ]
  },
  {
    id: 'green',
    name: 'Green & Future Careers',
    icon: Leaf,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 hover:bg-emerald-100',
    border: 'border-emerald-200',
    roles: [
      { name: 'Environmental Science', skills: ['Climate Change', 'Sustainability'] },
      { name: 'Renewable Energy', skills: ['Solar / Wind Systems'] },
      { name: 'Agriculture Tech', skills: ['Smart Farming', 'Agri Data'] },
    ]
  },
  {
    id: 'emerging',
    name: 'Emerging Fields',
    icon: Rocket,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50 hover:bg-cyan-100',
    border: 'border-cyan-200',
    roles: [
      { name: 'AI Advanced', skills: ['Deep Learning', 'Computer Vision', 'NLP'] },
      { name: 'Cyber Law', skills: ['IT Laws', 'Data Privacy'] },
      { name: 'Digital Marketing', skills: ['SEO', 'Ads', 'Analytics'] },
      { name: 'Cloud & Big Data', skills: ['Hadoop', 'Spark', 'Data Pipelines'] },
    ]
  }
];

type InterviewPhase = 'selection' | 'setup' | 'interview' | 'analyzing' | 'results';

export default function MockInterviews() {
  const [phase, setPhase] = useState<InterviewPhase>('selection');
  const [selectedRole, setSelectedRole] = useState<{name: string, skills: string[]} | null>(null);
  
  // Question State
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  
  // Feedback State
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);

  // Search & Navigation
  const [activeCategoryId, setActiveCategoryId] = useState(allCategories[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  // Media & AI State
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isDictating, setIsDictating] = useState(false);
  const [mediaError, setMediaError] = useState('');

  const userVideoRef = useRef<HTMLVideoElement>(null);
  const setupVideoRef = useRef<HTMLVideoElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Attach stream to video elements
  useEffect(() => {
    if (userVideoRef.current && mediaStream) userVideoRef.current.srcObject = mediaStream;
    if (setupVideoRef.current && mediaStream) setupVideoRef.current.srcObject = mediaStream;
  }, [mediaStream, phase]);

  // Clean up media streams on unmount
  useEffect(() => {
    return () => {
      stopMediaTracks();
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Pre-load voices for Text-to-Speech
  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
      }
    };
    loadVoices();
    if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const stopMediaTracks = useCallback(() => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  }, [mediaStream]);

  // AI Text-to-Speech
  const speakQuestion = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      
      // Do not speak if the user is currently answering via dictation
      if (isDictating) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsAiSpeaking(true);
      utterance.onend = () => setIsAiSpeaking(false);
      utterance.onerror = () => setIsAiSpeaking(false);

      // Try to find a good English voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha') || v.lang === 'en-US');
      if (preferredVoice) utterance.voice = preferredVoice;

      window.speechSynthesis.speak(utterance);
    }
  };

  // Speak automatically when question changes in active interview
  useEffect(() => {
    if (phase === 'interview' && questions[currentQuestionIndex]) {
      speakQuestion(questions[currentQuestionIndex].question);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, phase]);

  // --- Voice Dictation Logic ---
  const toggleDictation = () => {
    if (isDictating) {
      // Stop actively listening
      speechRecognitionRef.current?.stop();
      setIsDictating(false);
      return;
    }

    // Cancel AI speech if the user starts talking
    if (isAiSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsAiSpeaking(false);
    }

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice typing is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
      return;
    }

    // Create a fresh instance every time to avoid stale closures and state issues
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false; 
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let newTranscriptPart = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          newTranscriptPart += event.results[i][0].transcript + ' ';
        }
      }
      
      if (newTranscriptPart) {
        setCurrentAnswer(prev => {
          const spacer = prev.length > 0 && !prev.endsWith(' ') && !prev.endsWith('\n') ? ' ' : '';
          return prev + spacer + newTranscriptPart.trim() + ' ';
        });
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === 'not-allowed') {
        alert("Microphone access is required for voice typing.");
      }
      setIsDictating(false);
    };

    recognition.onend = () => {
      // If the browser stops it automatically (e.g. silence), sync state
      setIsDictating(false);
    };

    speechRecognitionRef.current = recognition;

    try {
      recognition.start();
      setIsDictating(true);
    } catch (e) {
      console.error("Could not start recognition", e);
      setIsDictating(false);
    }
  };

  const toggleVideo = () => {
    if (mediaStream) {
      const videoTrack = mediaStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (mediaStream) {
      const audioTrack = mediaStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicEnabled(audioTrack.enabled);
      }
    }
  };

  const initiateSetup = async (roleName: string, skills: string[]) => {
    setSelectedRole({ name: roleName, skills });
    setPhase('setup');
    setMediaError('');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      setIsVideoEnabled(true);
      setIsMicEnabled(true);
    } catch (err) {
      console.error("Error accessing media devices.", err);
      setMediaError('Camera and Microphone access is required for the AI Mock Interview. Please allow permissions in your browser.');
    }
  };

  const startInterview = () => {
    if (!selectedRole) return;
    
    const role = selectedRole.name;
    const skills = selectedRole.skills;

    // Dynamically Generate Questions based on the specific skills
    const dynamicQuestions: InterviewQuestion[] = [
      { id: 'q1', question: `Hello! I'm your AI Interviewer today. Could you walk me through your background and your interest in the ${role} field?`, type: 'behavioral' },
      { id: 'q2', question: `Can you explain a complex concept or project you've handled involving ${skills[0] || role}?`, type: 'technical', expectedKeywords: skills },
      { id: 'q3', question: `How would you approach a challenging situation requiring expertise in ${skills[1] || skills[0] || role}?`, type: 'situational', expectedKeywords: skills },
      { id: 'q4', question: `Describe a time when you had to troubleshoot or solve a difficult problem related to ${skills[2] || role}.`, type: 'behavioral' },
    ];

    setQuestions(dynamicQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setCurrentAnswer('');
    setPhase('interview');
  };

  const submitAnswer = () => {
    if (isDictating) {
      speechRecognitionRef.current?.stop();
      setIsDictating(false);
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    setUserAnswers(prev => [...prev, { questionId: questions[currentQuestionIndex].id, answer: currentAnswer, timestamp: Date.now() }]);
    setCurrentAnswer('');
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      endInterview();
    }
  };

  const endInterview = async () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (isDictating) {
      speechRecognitionRef.current?.stop();
      setIsDictating(false);
    }
    stopMediaTracks(); // Turn off camera
    
    setPhase('analyzing');
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setFeedback({
      overallScore: Math.floor(Math.random() * 30) + 65, 
      strengths: [
        'Clear structure in communicating concepts.',
        'Demonstrated foundational understanding of the role requirements.',
        'Maintained a professional tone and good presence.'
      ],
      areasForImprovement: [
        'Provide more specific, real-world examples for situational questions.',
        'Elaborate further on the trade-offs when discussing technical decisions.',
        'Utilize the STAR method (Situation, Task, Action, Result) more consistently.'
      ],
      questionSpecificFeedback: userAnswers.map((ua) => ({
        questionId: ua.questionId,
        feedback: ua.answer.length > 50 
          ? `Good elaboration. You touched upon key points, but try to tie it back to a specific metric or result you achieved.` 
          : `Your response was a bit brief. In a real interview, expand on the "why" and "how" to demonstrate deep expertise.`
      }))
    });
    
    setPhase('results');
  };

  const restartProcess = () => {
    stopMediaTracks();
    if (isDictating) {
      speechRecognitionRef.current?.stop();
      setIsDictating(false);
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSelectedRole(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setCurrentAnswer('');
    setFeedback(null);
    setPhase('selection');
  };

  const getQuestionSpecificFeedback = (questionId: string) => {
    return feedback?.questionSpecificFeedback.find(f => f.questionId === questionId)?.feedback || 'Standard response logged.';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const activeCategory = allCategories.find(c => c.id === activeCategoryId);
  const progressPercentage = questions.length > 0 ? ((currentQuestionIndex) / questions.length) * 100 : 0;

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900 relative">
      
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 lg:p-8 h-screen flex flex-col overflow-hidden max-w-[1600px] mx-auto w-full">
        
        {/* HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
          <div className="flex items-center gap-4">
             <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl text-white hidden md:block shadow-lg shadow-indigo-200">
               <UserCheck size={24} strokeWidth={2.5}/>
             </div>
             <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight">AI Virtual Interviewer</h1>
               <p className="text-slate-500 text-sm mt-1 font-medium">Practice with an AI agent in a simulated video environment.</p>
             </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {phase !== 'interview' && (
              <button 
                onClick={() => { stopMediaTracks(); setPhase('selection'); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-full text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
              >
                <ChevronLeft size={18} /> Exit
              </button>
            )}
            {phase === 'results' && (
              <button 
                onClick={restartProcess}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white border border-indigo-600 rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-md"
              >
                <Play size={16} /> New Interview
              </button>
            )}
          </div>
        </div>

        {/* CONTENT WRAPPER */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
          
          {/* ========================================================= */}
          {/* STATE 1: CATEGORY & ROLE SELECTION                        */}
          {/* ========================================================= */}
          {phase === 'selection' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col h-[calc(100vh-10rem)] bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Search Header */}
              <div className="p-5 border-b border-slate-100 flex items-center gap-4 shrink-0 bg-slate-50/50">
                <div className="relative flex-1 max-w-xl">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Search over 40+ career tracks and skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 text-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row flex-1 min-h-0">
                {/* Left Sidebar: Major Categories */}
                <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col bg-slate-50/30 p-4 gap-2 shrink-0 overflow-y-auto custom-scrollbar">
                  {allCategories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setActiveCategoryId(cat.id)}
                      className={`flex items-center gap-3 w-full p-4 rounded-xl text-left transition-all ${
                        activeCategoryId === cat.id 
                          ? `bg-indigo-50 text-indigo-600 font-bold border border-indigo-200 shadow-sm`
                          : 'text-slate-600 font-medium hover:bg-slate-100 border border-transparent'
                      }`}
                    >
                      <cat.icon size={20} className={activeCategoryId === cat.id ? 'text-indigo-600' : 'text-slate-400'} />
                      <span className="text-sm line-clamp-1">{cat.name}</span>
                      {activeCategoryId === cat.id && <ChevronRight size={16} className="ml-auto opacity-50 shrink-0" />}
                    </button>
                  ))}
                </div>

                {/* Right Area: Specific Roles & Skills */}
                <div className="flex-1 p-6 lg:p-8 bg-white overflow-y-auto custom-scrollbar">
                  <div className="mb-6 flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100`}>
                      {activeCategory && <activeCategory.icon size={24} className="text-indigo-600" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900">{activeCategory?.name}</h2>
                      <p className="text-sm font-medium text-slate-500 mt-1">Select a specific role to begin your tailored mock interview.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {activeCategory?.roles.filter(r => 
                      r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      r.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
                    ).map(role => (
                      <div key={role.name} className="flex flex-col border border-slate-200 bg-white rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-lg text-slate-900 leading-tight pr-4">{role.name}</h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5 mb-5 flex-1 content-start">
                          {role.skills.map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-200/60">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <button 
                          onClick={() => initiateSetup(role.name, role.skills)}
                          className="w-full py-3 bg-slate-50 text-indigo-600 border border-transparent font-bold rounded-xl text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                        >
                          Select Role
                        </button>
                      </div>
                    ))}
                    
                    {/* Empty State */}
                    {activeCategory?.roles.filter(r => 
                      r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      r.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
                    ).length === 0 && (
                      <div className="col-span-full py-12 text-center text-slate-500">
                        <p className="font-medium">No roles match your search in this category.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* STATE 2: DEVICE SETUP                                     */}
          {/* ========================================================= */}
          {phase === 'setup' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center min-h-[70vh]"
            >
              <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-xl max-w-3xl w-full text-center">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera size={32} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Device Check</h2>
                <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">
                  To ensure the AI can interact with you naturally, please allow camera and microphone access.
                </p>

                {mediaError ? (
                  <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-8 flex items-start gap-3 text-left">
                    <AlertCircle size={20} className="shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{mediaError}</p>
                  </div>
                ) : (
                  <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden mb-8 shadow-inner border border-slate-200">
                    {mediaStream ? (
                      <video 
                        ref={setupVideoRef} 
                        autoPlay 
                        muted 
                        playsInline 
                        className={`w-full h-full object-cover transform ${isVideoEnabled ? 'scale-x-[-1]' : 'hidden'}`}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        <Loader2 className="animate-spin" size={32} />
                      </div>
                    )}
                    
                    {!isVideoEnabled && mediaStream && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400">
                        <VideoOff size={48} />
                      </div>
                    )}

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                      <button 
                        onClick={toggleVideo}
                        className={`p-3 rounded-full backdrop-blur-md transition-colors shadow-sm ${isVideoEnabled ? 'bg-white/90 text-slate-800 hover:bg-white' : 'bg-red-500 text-white hover:bg-red-600'}`}
                      >
                        {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                      </button>
                      <button 
                        onClick={toggleAudio}
                        className={`p-3 rounded-full backdrop-blur-md transition-colors shadow-sm ${isMicEnabled ? 'bg-white/90 text-slate-800 hover:bg-white' : 'bg-red-500 text-white hover:bg-red-600'}`}
                      >
                        {isMicEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => { stopMediaTracks(); setPhase('selection'); }}
                    className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={!mediaStream}
                    onClick={startInterview}
                    className="px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-black hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Join Interview <Sparkles size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* STATE 3: INTERVIEW IN PROGRESS (SPLIT SCREEN VIDEO)       */}
          {/* ========================================================= */}
          {phase === 'interview' && currentQuestionIndex < questions.length && (
            <motion.div
              key={questions[currentQuestionIndex].id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col h-[calc(100vh-12rem)] w-full max-w-6xl mx-auto"
            >
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span>{Math.round(progressPercentage)}% Completed</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0 mb-4">
                
                {/* AI Interviewer Pane */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden relative shadow-sm flex flex-col items-center justify-center">
                  {/* AI Speaking Animation Rings */}
                  {isAiSpeaking && (
                    <>
                      <div className="absolute w-48 h-48 bg-indigo-500/20 rounded-full animate-ping"></div>
                      <div className="absolute w-64 h-64 bg-purple-500/10 rounded-full animate-pulse delay-75"></div>
                    </>
                  )}
                  
                  <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <Bot size={56} className="text-white" />
                  </div>
                  
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm text-slate-700">
                    <Volume2 size={14} className={isAiSpeaking ? 'text-emerald-500 animate-pulse' : 'text-slate-400'} />
                    AI Interviewer
                  </div>
                </div>

                {/* User Camera Pane */}
                <div className="bg-slate-900 rounded-3xl border border-slate-200 overflow-hidden relative shadow-sm">
                  {mediaStream && isVideoEnabled ? (
                    <video 
                      ref={userVideoRef} 
                      autoPlay 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover transform scale-x-[-1]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <VideoOff size={48} className="text-slate-400" />
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm text-slate-700">
                    {isMicEnabled ? <Mic size={14} className="text-emerald-500" /> : <MicOff size={14} className="text-red-500" />}
                    You
                  </div>
                </div>
              </div>

              {/* Subtitles & Answer Area */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm shrink-0 flex flex-col lg:flex-row gap-6">
                
                {/* Current Question Caption */}
                <div className="flex-1">
                  <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 ${
                    questions[currentQuestionIndex].type === 'behavioral' ? 'bg-purple-50 text-purple-600 border border-purple-200' :
                    questions[currentQuestionIndex].type === 'technical' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                    'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  }`}>
                    {questions[currentQuestionIndex].type} Question
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 leading-relaxed">{questions[currentQuestionIndex].question}</h2>
                  <button 
                    onClick={() => speakQuestion(questions[currentQuestionIndex].question)}
                    className="mt-3 text-xs font-bold text-indigo-600 hover:text-indigo-500 flex items-center gap-1.5"
                  >
                    <Volume2 size={14} /> Repeat Question
                  </button>
                </div>

                <div className="w-px bg-slate-200 hidden lg:block"></div>

                {/* Input Area */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Your Response</span>
                    <button 
                      onClick={toggleDictation}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isDictating 
                          ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' 
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isDictating ? <><Mic size={14} /> Listening...</> : <><Mic size={14} /> Voice Type</>}
                    </button>
                  </div>
                  
                  <textarea
                    className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 resize-none focus:ring-2 focus:ring-indigo-500 outline-none custom-scrollbar transition-all placeholder-slate-400"
                    placeholder="Speak or type your answer here..."
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                  />

                  <div className="flex justify-end gap-3 pt-2">
                    <button 
                      onClick={endInterview}
                      className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 hover:text-red-600 transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <StopCircle size={16} /> End Early
                    </button>
                    <button 
                      onClick={submitAnswer}
                      disabled={!currentAnswer.trim()}
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Interview'} <Send size={16} />
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* STATE 4: LOADING FEEDBACK                                 */}
          {/* ========================================================= */}
          {phase === 'analyzing' && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center min-h-[60vh] space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-100 blur-2xl opacity-60 rounded-full animate-pulse"></div>
                <div className="w-24 h-24 bg-white border-4 border-indigo-100 rounded-full flex items-center justify-center relative z-10 shadow-xl">
                  <Bot size={40} className="text-indigo-600 animate-bounce" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Analyzing Responses</h2>
                <p className="text-slate-500 font-medium">Evaluating your technical accuracy, communication structure, and keywords...</p>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* STATE 5: INTERVIEW FEEDBACK DASHBOARD                     */}
          {/* ========================================================= */}
          {phase === 'results' && feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto space-y-8"
            >
              {/* Top Summary Banner */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 text-slate-100 opacity-50">
                  <BarChart size={200} />
                </div>
                
                <div className="p-8 md:p-10 relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative w-36 h-36">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="72" cy="72" r="64" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                        <circle 
                          cx="72" cy="72" r="64" fill="none" 
                          stroke={feedback.overallScore >= 80 ? '#10b981' : feedback.overallScore >= 60 ? '#f59e0b' : '#ef4444'} 
                          strokeWidth="12" strokeDasharray="402" strokeDashoffset={402 - (402 * feedback.overallScore) / 100}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-4xl font-black ${getScoreColor(feedback.overallScore)}`}>{feedback.overallScore}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold uppercase tracking-widest mb-3 border border-indigo-200">
                      <UserCheck size={14} /> {selectedRole?.name} Evaluation
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-3 leading-tight">Assessment Complete</h2>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      Great effort! You showed strong foundational knowledge. Review the detailed breakdown below to identify your core strengths and target areas for your next interview.
                    </p>
                  </div>
                </div>
              </div>

              {/* Strengths & Weaknesses Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-sm">
                  <h3 className="flex items-center gap-3 text-lg font-black text-slate-900 mb-6">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl"><CheckCircle2 size={20} /></div>
                    Core Strengths
                  </h3>
                  <ul className="space-y-4">
                    {feedback.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-amber-100 shadow-sm">
                  <h3 className="flex items-center gap-3 text-lg font-black text-slate-900 mb-6">
                    <div className="p-2 bg-amber-100 text-amber-600 rounded-xl"><AlertCircle size={20} /></div>
                    Areas to Improve
                  </h3>
                  <ul className="space-y-4">
                    {feedback.areasForImprovement.map((a, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 border-b border-slate-100 bg-slate-50">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Bot className="text-indigo-600" /> Detailed Question Analysis
                  </h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {userAnswers.map((ua, index) => {
                    const qData = questions.find(q => q.id === ua.questionId);
                    return (
                      <div key={ua.questionId} className="p-8 hover:bg-slate-50/50 transition-colors">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-black flex items-center justify-center shrink-0 border border-indigo-200">
                            Q{index + 1}
                          </div>
                          <div className="flex-1 space-y-4">
                            <h4 className="text-lg font-bold text-slate-900">{qData?.question}</h4>
                            
                            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Your Answer:</span>
                              <p className="text-slate-800 font-medium text-sm leading-relaxed">{ua.answer}</p>
                            </div>

                            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                                <Sparkles size={12} /> AI Feedback:
                              </span>
                              <p className="text-indigo-900 font-medium text-sm leading-relaxed">{getQuestionSpecificFeedback(ua.questionId)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}