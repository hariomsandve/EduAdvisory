import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, CartesianGrid,
  LineChart, Line
} from 'recharts';
import { 
  Home, MessageSquare, Calendar, CreditCard, Bell, BookOpen, 
  Plus, CheckCircle2, ChevronLeft, ChevronRight, Search, Settings, 
  LogOut, TrendingUp, Users, Target, BookMarked, Brain, Shield, Star,
  Activity, Heart, Globe, MapPin, DollarSign, FileText, Compass, Award, Briefcase, Video,
  Zap, FileCheck, Mic, ClipboardList, BarChart2, History, AlertTriangle, TrendingDown,
  Wallet, Coins, Volume2, Radio, UserPlus, Clock, PenTool, Camera, Smile, Edit3, Video as VideoIcon, PenBox, Map
} from 'lucide-react';

// Mock Data Definitions
const childData = [
  { id: 1, name: 'Alex (11th)', avatar: 'https://picsum.photos/seed/alex/100/100', track: 'PCM', locationColor: 'bg-green-500', locationText: 'In Class: Room 302', lastSeen: 'Civil Engineering Lab, 10 mins ago' },
  { id: 2, name: 'Sarah (9th)', avatar: 'https://picsum.photos/seed/sarah/100/100', track: 'General', locationColor: 'bg-yellow-500', locationText: 'On Campus: Library', lastSeen: 'Central Library, 5 mins ago' },
  { id: 'all', name: 'Unified View', avatar: 'https://picsum.photos/seed/unified/100/100', track: 'All Children', locationColor: '', locationText: '', lastSeen: '' }
];

<<<<<<< HEAD
const goalsData = [
  { title: 'Aptitude Tests', completed: 3, total: 5, progress: 60, color: 'text-green-500', bg: 'bg-green-500', lightBg: 'bg-green-50' },
  { title: 'Career Prep Sessions', completed: 7, total: 10, progress: 70, color: 'text-green-500', bg: 'bg-green-500', lightBg: 'bg-green-50' },
  { title: 'Math Modules', completed: 15, total: 20, progress: 75, color: 'text-blue-500', bg: 'bg-blue-500', lightBg: 'bg-blue-50' }
];

const recommendedTutors = [
  { subject: 'Advanced Mathematics', target: 'JEE Prep', tutor: 'Prof. Sharma', rating: 4.9, avatar: 'https://picsum.photos/seed/prof1/100/100' },
  { subject: 'Physics & Mechanics', target: 'Board Exams', tutor: 'Ms. Verma', rating: 4.8, avatar: 'https://picsum.photos/seed/prof2/100/100' },
];

const subjectsData = [
    { name: 'Mathematics', tutor: 'Prof. Sharma', time: '10:00 - 11:30 AM', status: 'Upcoming' },
    { name: 'Physics', tutor: 'Ms. Verma', time: '1:00 - 2:00 PM', status: 'Completed' },
    { name: 'Chemistry', tutor: 'Dr. Rao', time: '3:00 - 4:00 PM', status: 'Upcoming' }
=======
const ahaMoments = [
  { id: 1, student: 'Alex', teacher: 'Dr. Carter', time: '2 hours ago', text: 'Alex finally nailed the bridge stress-test model! Beautiful use of tension distribution.', image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=400&h=200&auto=format&fit=crop' },
  { id: 2, student: 'Sarah', teacher: 'Mr. Davis', time: '4 hours ago', text: 'Great presentation on the Solar System. The class loved the visuals!', image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=400&h=200&auto=format&fit=crop' }
>>>>>>> 0285e45c0caac0d941674d1aad2c64c884823936
];

const weeklyProgressData = [
  { day: 'Mon', hours: 2, focus: 85 },
  { day: 'Tue', hours: 3.5, focus: 90 },
  { day: 'Wed', hours: 4, focus: 88 },
  { day: 'Thu', hours: 2.5, focus: 75 },
  { day: 'Fri', hours: 5, focus: 95 },
  { day: 'Sat', hours: 6, focus: 92 },
  { day: 'Sun', hours: 1, focus: 60 },
];

const conceptMasteryData = [
  { subject: 'Algebra', A: 120, B: 110, fullMark: 150 },
  { subject: 'Calculus', A: 98, B: 130, fullMark: 150 },
  { subject: 'Mechanics', A: 86, B: 130, fullMark: 150 },
  { subject: 'Literature', A: 99, B: 100, fullMark: 150 },
  { subject: 'History', A: 85, B: 90, fullMark: 150 },
  { subject: 'Biology', A: 65, B: 85, fullMark: 150 },
];

const multiChildComparisonData = [
  { subject: 'Math', Alex: 90, Sarah: 75 },
  { subject: 'Science', Alex: 85, Sarah: 80 },
  { subject: 'English', Alex: 70, Sarah: 95 },
  { subject: 'History', Alex: 65, Sarah: 90 },
  { subject: 'Art', Alex: 50, Sarah: 85 },
];

const effortVsResultData = [
  { name: 'Alex', effort: 92, result: 76 },
  { name: 'Sarah', effort: 65, result: 95 },
];

const academicTimelineData = [
  { grade: '1st', math: 85, science: 80, language: 90, benchmark: 82 },
  { grade: '2nd', math: 88, science: 85, language: 85, benchmark: 84 },
  { grade: '3rd', math: 90, science: 88, language: 82, benchmark: 85 },
  { grade: '4th', math: 92, science: 90, language: 85, benchmark: 88 },
  { grade: '5th', math: 70, science: 85, language: 88, benchmark: 90, alert: 'Struggled with Fractions' },
  { grade: '6th', math: 82, science: 88, language: 90, benchmark: 92 },
  { grade: '7th', math: 88, science: 92, language: 92, benchmark: 95 },
];

const timelineNodes = [
  { grade: '1st', status: 'blue', label: 'High' },
  { grade: '2nd', status: 'blue', label: 'High' },
  { grade: '3rd', status: 'blue', label: 'High' },
  { grade: '4th', status: 'blue', label: 'High' },
  { grade: '5th', status: 'red', label: 'Decline' },
  { grade: '6th', status: 'yellow', label: 'Recovery' },
  { grade: '7th', status: 'blue', label: 'On Track' },
];

const fluencyData = [
  { week: 'W1', pronunciation: 65, vocabulary: 40 },
  { week: 'W2', pronunciation: 70, vocabulary: 50 },
  { week: 'W3', pronunciation: 72, vocabulary: 65 },
  { week: 'W4', pronunciation: 85, vocabulary: 80 },
];

const walletTransactions = [
  { id: 1, title: 'Physics Mock Success (>80%)', amount: '+₹100', date: 'Today, 2:30 PM', type: 'credit' },
  { id: 2, title: 'Snack at Cafeteria', amount: '-₹45', date: 'Yesterday, 1:15 PM', type: 'debit' },
  { id: 3, title: 'Completed Weekend Math Module', amount: '+₹50', date: 'Oct 18, 10:00 AM', type: 'credit' },
];

const tutors = [
  { name: 'Dr. Evelyn Carter', role: 'Physics Expert', rating: 4.9, price: '$40/hr', avatar: 'https://picsum.photos/seed/tutor1/100/100' },
  { name: 'Prof. Raj Sharma', role: 'Advanced Calculus', rating: 4.8, price: '$35/hr', avatar: 'https://picsum.photos/seed/tutor2/100/100' },
];

const forums = [
  { title: "Handling pre-exam anxiety?", replies: 24, author: "Anonymous Parent" },
  { title: "Best resources for 11th grade Chemistry?", replies: 18, author: "Anonymous Parent" },
];

const scholarships = [
  { name: 'STEM Innovators Fund', amount: '$5,000', deadline: 'Oct 30', match: '95%' },
  { name: 'Future Leaders Grant', amount: '$2,500', deadline: 'Nov 15', match: '88%' },
];

// Reusable Components
const CircularProgress = ({ progress, barColor }: { progress: number, barColor: string }) => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
      <circle className="text-gray-100 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
      <circle
        className={`${barColor} stroke-current transition-all duration-1000 ease-out`}
        strokeWidth="8"
        strokeLinecap="round"
        cx="50" cy="50" r="40" fill="transparent"
        strokeDasharray="251.2"
        strokeDashoffset={251.2 - (251.2 * progress) / 100}
      ></circle>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800">
      {progress}%
    </div>
  </div>
);

interface ParentDashboardProps {
  userName?: string;
  onLogout?: () => void;
}

const ParentDashboard = ({ userName = "Parent", onLogout }: ParentDashboardProps) => {
  const [activeChild, setActiveChild] = useState<number | string>(childData[0].id);
  const [selectedChildren, setSelectedChildren] = useState<number[]>([1, 2]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Monitor Dashboard', icon: Home },
    { id: 'family', label: 'Family Sync', icon: Users },
    { id: 'growth', label: 'Growth Journey', icon: History },
    { id: 'academic', label: 'Academic Intelligence', icon: TrendingUp },
    { id: 'counselor', label: 'Counselor & Comms', icon: MessageSquare },
    { id: 'future', label: 'Future Readiness', icon: Compass },
    { id: 'finances', label: 'Finances & Admin', icon: CreditCard },
    { id: 'resources', label: 'Resource Center', icon: BookOpen },
    { id: 'productivity', label: 'Productivity Suite', icon: Zap },
    { id: 'community', label: 'Community Hub', icon: Globe },
    { id: 'campusLife', label: 'Campus Life', icon: Map },
    { id: 'collaboration', label: 'Collaboration Hub', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  /* -------------------------------------------------------------
     RENDER VIEWS BASED ON SELECTED MENU
  ------------------------------------------------------------- */
  const renderHome = () => (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 flex-1 text-white rounded-[32px] p-8 lg:p-10 shadow-xl shadow-green-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 h-full flex flex-col justify-center">
          <h2 className="text-3xl lg:text-4xl font-black mb-3 text-white">Hello, {userName}!</h2>
          <p className="text-green-100 text-lg flex items-center gap-2 mb-6 max-w-md">
            Stay intimately connected with your child's academic progress and wellness.
          </p>
          <div className="flex gap-4">
             <button className="bg-white text-green-600 px-6 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-green-50 transition-colors">
                <Shield size={18} /> View Daily Digest
             </button>
          </div>
        </div>
      </div>

      {/* Smart Alerts */}
      <div className="flex flex-col gap-4">
         <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-start gap-3 shadow-sm">
            <Bell className="text-blue-500 shrink-0 mt-0.5" size={20}/>
            <div>
               <h4 className="font-bold text-blue-900 text-sm">Morning Briefing</h4>
               <p className="text-sm text-blue-800">Alex has a heavy day today: 3 Lectures and a Physics Mock Exam at 2:00 PM. Wish him luck!</p>
            </div>
         </div>
         <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3 shadow-sm">
            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20}/>
            <div>
               <h4 className="font-bold text-red-900 text-sm">"Empty Chair" Alert</h4>
               <p className="text-sm text-red-800">Alex missed his 11:00 AM Fluid Mechanics lecture (but was marked Present at the main gate). Would you like to check in with him?</p>
            </div>
         </div>
      </div>

      {/* A-ha Moments Feed */}
      <div>
         <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-4">
           <Camera size={20} className="text-green-500"/> Classroom Stories (A-ha! Moments)
         </h3>
         <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {ahaMoments.map(moment => (
               <div key={moment.id} className="min-w-[300px] w-[300px] bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                  <img src={moment.image} alt="Classroom WIN" className="h-32 w-full object-cover"/>
                  <div className="p-4 flex-1 flex flex-col">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{moment.teacher}</span>
                        <span className="text-xs text-gray-400">{moment.time}</span>
                     </div>
                     <p className="text-sm text-gray-700 font-medium italic leading-relaxed">"{moment.text}"</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Child Selection / Unified Feed (Sibling Switcher) */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Users size={20} className="text-green-500"/> Sibling Switcher
              </h3>
           </div>
           
           <div className="space-y-4">
              {childData.map((child) => (
                 <div 
                    key={child.id}
                    onClick={() => setActiveChild(child.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2 ${activeChild === child.id ? 'border-green-500 bg-green-50/50 shadow-md' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}
                 >
                    <img src={child.avatar} alt="child" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                    <div className="flex-1">
                       <p className="font-bold text-gray-900">{child.name}</p>
                       <div className="flex items-center gap-2 mt-1">
                          {child.locationColor && <span className={`w-2 h-2 rounded-full ${child.locationColor}`}></span>}
                          <p className="text-xs text-gray-600 font-medium">{child.locationText || child.track}</p>
                       </div>
                    </div>
                    {activeChild === child.id && <CheckCircle2 size={24} className="text-green-500" />}
                    {child.id !== 'all' && (
                      <button 
                         onClick={(e) => { e.stopPropagation(); setActiveMenuItem('family'); }}
                         className="ml-2 text-xs font-bold text-green-600 border border-green-200 px-2 py-1 rounded bg-white hover:bg-green-50 transition-colors shadow-sm"
                      >
                         Compare
                      </button>
                    )}
                 </div>
              ))}
           </div>
        </div>

        {/* AI Trend Spotter */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-green-50/50">
            <Brain size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 text-green-600 font-bold">
              <Brain size={20} /> AI Trend Spotter
            </div>
            <p className="font-bold text-gray-900 text-lg mb-2">Noticeable Dip in Physics Focus</p>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Alex's engagement drops by 20% on Thursday afternoons. We've detected this pattern over the last 3 weeks.
            </p>
            <div className="p-3 bg-green-50 border border-green-100 rounded-xl text-sm text-green-800 font-medium">
              <strong>Recommendation:</strong> Reschedule heavy math/physics modules to mornings.
            </div>
          </div>
        </div>

        {/* Wellness & Mental Health Flag */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-rose-500 font-bold">
            <Heart size={20} /> Wellness Pulse
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center border-4 border-green-50">
              <Activity size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">Optimal</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Stress Levels</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Sleep Schedule</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">Consistent</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Screen Time</span>
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">Elevated</span>
            </div>
          </div>
        </div>

        {/* Agenda Card */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 h-full">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Calendar size={20} className="text-green-500"/> Today's Agenda
              </h3>
              <span className="bg-red-100 text-red-600 text-xs font-black px-2 py-1 rounded animate-pulse flex items-center gap-1"><Radio size={12}/> LIVE</span>
           </div>
           
           <div className="space-y-4">
              <div className="p-4 bg-green-50 border-2 border-green-500 rounded-2xl shadow-sm relative overflow-hidden">
                 <div className="flex justify-between items-start mb-2">
                    <div>
                       <h4 className="font-black text-gray-900">Structural Mechanics</h4>
                       <p className="text-xs text-green-700 font-bold">Room 302 • Prof. Sharma</p>
                    </div>
                    <span className="text-xs font-bold text-gray-500">10:00 - 11:30 AM</span>
                 </div>
                 <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold text-green-800 mb-1">
                       <span>45 mins elapsed</span>
                       <span>45 mins left</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-1.5">
                       <div className="bg-green-500 h-1.5 rounded-full w-[50%]"></div>
                    </div>
                 </div>
              </div>
              
              <div className="p-4 border border-gray-100 rounded-2xl opacity-60">
                 <div className="flex justify-between items-start">
                    <div>
                       <h4 className="font-bold text-gray-700">Lunch Break</h4>
                       <p className="text-xs text-gray-500">Main Cafeteria</p>
                    </div>
                    <span className="text-xs font-bold text-gray-400">11:30 - 12:30 PM</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderGrowthJourney = () => {
    // Custom label for alert nodes in chart
    const CustomizedDot = (props: any) => {
      const { cx, cy, payload } = props;
      if (payload.alert && props.dataKey === 'math') {
        return (
          <svg x={cx - 12} y={cy - 24} width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
      }
      return <circle cx={cx} cy={cy} r={6} fill={props.stroke} />;
    };

    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-2xl font-black text-gray-900">Academic Time Machine</h2>
          <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-xl font-bold text-sm text-center">Target Track: PCM</span>
        </div>

        {/* Academic Pulse Timeline */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 overflow-x-auto custom-scrollbar">
           <h3 className="font-bold text-gray-900 text-lg mb-6">The Academic Pulse</h3>
           <div className="flex items-center min-w-[600px] justify-between relative px-4 mb-4">
              <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
              {timelineNodes.map((node, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center cursor-pointer group w-16">
                   <div className={`w-8 h-8 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-transform group-hover:scale-125 ${node.status === 'blue' ? 'bg-blue-500' : node.status === 'red' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                   </div>
                   <p className="mt-3 font-bold text-gray-900 text-sm">{node.grade}</p>
                   <p className="text-xs text-gray-500 text-center leading-tight mt-1">{node.label}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Decline & Progress Multi-Graph & Benchmark */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
           <div className="xl:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col h-[500px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="font-bold text-gray-900 text-lg">Long-Term Trajectory (Grades 1-7)</h3>
                <div className="flex gap-4 text-xs font-bold flex-wrap">
                   <span className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-500 rounded-full"></div> Math</span>
                   <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Science</span>
                   <span className="flex items-center gap-1"><div className="w-2 h-2 bg-purple-500 rounded-full"></div> Language</span>
                   <span className="flex items-center gap-1"><div className="w-4 h-0.5 bg-gray-400 border-t border-dashed"></div> PCM Benchmark</span>
                </div>
              </div>
              <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={academicTimelineData} margin={{ top: 30, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="grade" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} domain={[50, 100]}/>
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}}
                      formatter={(value: any, name: any) => [value + '%', name.charAt(0).toUpperCase() + name.slice(1)]}
                    />
                    <Line type="monotone" dataKey="math" stroke="#f97316" strokeWidth={3} dot={<CustomizedDot/>} activeDot={{r: 8}} />
                    <Line type="monotone" dataKey="science" stroke="#3b82f6" strokeWidth={3} dot={{r: 5, strokeWidth: 2}} />
                    <Line type="monotone" dataKey="language" stroke="#a855f7" strokeWidth={3} dot={{r: 5, strokeWidth: 2}} />
                    <Line type="monotone" dataKey="benchmark" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 items-start cursor-pointer hover:bg-red-100 transition-colors">
                 <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
                 <div>
                    <h4 className="font-bold text-red-900 text-sm">5th Grade Dip Detected</h4>
                    <p className="text-sm text-red-800 mt-1">Alex struggled here due to the introduction of Complex Fractions. Click to see how he recovered in 6th grade.</p>
                 </div>
              </div>
           </div>

           {/* Predictive Benchmarking */}
           <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[32px] p-8 shadow-xl text-white flex flex-col justify-center relative overflow-hidden h-[500px]">
              <Target className="absolute right-[-20px] top-[-20px] text-white/5" size={150} />
              <h3 className="font-bold text-xl mb-4 relative z-10 flex items-center gap-2">
                <Compass className="text-green-400" /> Gap Analysis
              </h3>
              <p className="text-gray-300 leading-relaxed relative z-10 flex-1">
                <strong className="text-white text-lg">Alex is currently in 7th Grade.</strong><br/><br/>
                To stay on track for top Engineering Colleges (PCM track), he needs to improve his <span className="text-orange-400 font-bold">'Logical Reasoning'</span> score by <span className="text-green-400 font-black text-lg">10%</span> next term to match the 8th-grade competitive entry benchmark.
              </p>
              <button className="mt-8 w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20 relative z-10">
                View Learning Path
              </button>
           </div>
        </div>

        {/* Then vs. Now */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
             <History size={20} className="text-green-500"/> Then vs. Now
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="p-6 bg-gray-50 border-2 border-gray-200 rounded-3xl border-dashed">
                 <div className="flex justify-between items-center mb-6">
                    <span className="bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded-lg text-sm">1st Grade Alex</span>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Age: 6</span>
                 </div>
                 <p className="text-sm font-medium text-gray-500 mb-2">Math Score: <span className="text-gray-900 font-bold text-base">85% (Basic Addition)</span></p>
                 <p className="text-sm font-medium text-gray-500 mb-6">Teacher Insight: <span className="text-gray-900 italic font-medium">"Very curious."</span></p>
                 <div className="h-20 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-xs shadow-sm">
                    [Handwriting Sample Image]
                 </div>
              </div>
              <div className="p-6 bg-green-50 border-2 border-green-200 rounded-3xl shadow-sm relative overflow-hidden">
                 <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>
                 <div className="flex justify-between items-center mb-6 relative z-10">
                    <span className="bg-green-500 text-white font-bold px-3 py-1 rounded-lg text-sm shadow-md">7th Grade Alex (Now)</span>
                    <span className="text-xs text-green-700 font-bold uppercase tracking-wider">Age: 12</span>
                 </div>
                 <p className="text-sm font-medium text-green-800 mb-2 relative z-10">Math Score: <span className="text-green-900 font-black text-base">88% (Pre-Algebra)</span></p>
                 <p className="text-sm font-medium text-green-800 mb-6 relative z-10">Teacher Insight: <span className="text-green-900 italic font-bold">"Strong analytical thinker."</span></p>
                 <div className="h-20 bg-white border border-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold text-xs shadow-sm relative z-10">
                    [Robotics Project Model]
                 </div>
              </div>
           </div>
           
           <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="p-4 bg-white/10 rounded-2xl shrink-0 border border-white/10 backdrop-blur-md relative z-10">
                 <Brain className="text-green-400" size={32}/>
              </div>
              <p className="text-sm sm:text-base leading-relaxed relative z-10">
                 <strong className="text-green-400 font-black text-lg block mb-1">Growth Summary:</strong> 
                 "Since 1st Grade, Alex's problem-solving speed has increased by <span className="font-bold underline decoration-green-400/50 decoration-2 underline-offset-4">400%</span>, but focus in languages has gradually declined. Early intervention in literacy is recommended to maintain the competitive trajectory."
              </p>
           </div>
        </div>

      </div>
    );
  };

  const renderAcademic = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900">Academic Intelligence</h2>
        <button 
          onClick={() => setActiveMenuItem('family')}
          className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors"
        >
          <Users size={16}/> View with Sibling
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Concept Mastery Map */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <Target size={20} className="text-green-500"/> Concept Mastery Map
            </h3>
            <button className="text-xs font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-lg border border-green-100">Curriculum Alignment</button>
          </div>
          <div className="flex-1 w-full bg-gray-50 rounded-2xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={conceptMasteryData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Alex" dataKey="B" stroke="#22c55e" fill="#22c55e" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multi-Child Comparison */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col h-[400px]">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
            <BarChart2 size={20} className="text-green-500"/> Multi-Child Score Comparison
          </h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={multiChildComparisonData}>
                <defs>
                  <linearGradient id="colorAlex" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSarah" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}}/>
                <Tooltip />
                <Area type="monotone" dataKey="Alex" stroke="#22c55e" fillOpacity={1} fill="url(#colorAlex)" />
                <Area type="monotone" dataKey="Sarah" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSarah)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
             <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 bg-green-500 rounded-full"></div>Alex</div>
             <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 bg-purple-500 rounded-full"></div>Sarah</div>
          </div>
        </div>
      </div>

      {/* Effort vs Result Analysis */}
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
           <div>
             <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
               <Activity size={20} className="text-green-500"/> Effort vs. Result Analysis
             </h3>
             <p className="text-gray-500 text-sm mt-1">Reward persistence. See who is working hardest, regardless of grades.</p>
           </div>
           <div className="flex gap-4">
             <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <div className="w-3 h-3 bg-green-500 rounded"></div> Study Effort
             </div>
             <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <div className="w-3 h-3 bg-gray-200 rounded"></div> Test Results
             </div>
           </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={effortVsResultData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barGap={8}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontSize: 14, fontWeight: 'bold'}} width={60} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'}}/>
                  <Bar dataKey="effort" fill="#22c55e" radius={[0, 8, 8, 0]} barSize={24} name="Study Effort (%)"/>
                  <Bar dataKey="result" fill="#E5E7EB" radius={[0, 8, 8, 0]} barSize={24} name="Test Results (%)"/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
               <div className="p-4 bg-green-50 border border-green-100 rounded-2xl">
                  <span className="text-xs font-bold text-green-600 uppercase">Insights</span>
                  <p className="font-bold text-gray-900 mt-1">Alex is working 40% harder</p>
                  <p className="text-sm text-gray-600 mt-1">Alex has lower grades but puts in significantly more practice hours. Acknowledging this persistence builds long-term grit.</p>
               </div>
               <button className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl shadow-sm hover:border-green-300 hover:text-green-600 transition-colors">
                  Send Kudos to Alex
               </button>
            </div>
         </div>
      </div>

      {/* Classroom-to-Home Activity Bridge */}
      <div className="bg-amber-50 rounded-[32px] p-8 shadow-sm border border-amber-200">
         <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
               <Smile size={32}/>
            </div>
            <div className="flex-1">
               <h3 className="font-bold text-amber-900 text-lg mb-1 flex items-center gap-2">Classroom-to-Home Activity Bridge</h3>
               <p className="text-amber-800 text-sm leading-relaxed">
                 <strong>Alex is learning Ratios this week.</strong> Try a 10-minute baking session tonight and let him measure the ingredients! It turns abstract math into a tasty, hands-on experience without needing a textbook.
               </p>
            </div>
            <button className="bg-amber-500 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-amber-600 transition-colors shrink-0 shadow-md">
               Mark as Completed
            </button>
         </div>
      </div>

      {/* AI Language Labs */}
      <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden">
         <Volume2 className="absolute right-[-20px] top-[-20px] text-white/5" size={150}/>
         <div className="flex flex-col lg:flex-row gap-8 relative z-10">
            <div className="flex-1">
               <h3 className="font-bold text-xl flex items-center gap-2 mb-2">
                 <Mic size={24} className="text-blue-400"/> AI Language Labs (Skill Accelerator)
               </h3>
               <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                 We don't just track written tests. Oral fluency is analyzed using advanced speech recognition to map pronunciation accuracy and vocabulary growth in real-time.
               </p>
               <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-200 font-bold uppercase tracking-wider">Current Fluency Level</p>
                    <p className="text-2xl font-black mt-1 text-white">Intermediate B1</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center border-4 border-blue-400">
                    <span className="font-bold text-lg">85%</span>
                  </div>
               </div>
               <button className="bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-600 transition-colors w-full sm:w-auto">
                 Listen to Last Session
               </button>
            </div>
            
            <div className="flex-1 min-h-[250px] bg-white/5 rounded-2xl p-6 border border-white/10">
               <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-blue-200">Fluency Heatmap (Last 4 Weeks)</span>
                  <div className="flex gap-4 text-xs">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-400 rounded-full"></div> Pronunciation</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-purple-400 rounded-full"></div> Vocabulary</span>
                  </div>
               </div>
               <div className="h-[200px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={fluencyData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                     <XAxis dataKey="week" stroke="#bfdbfe" fontSize={12} tickLine={false} axisLine={false}/>
                     <YAxis stroke="#bfdbfe" fontSize={12} tickLine={false} axisLine={false}/>
                     <Tooltip contentStyle={{backgroundColor: '#1e3a8a', border: 'none', borderRadius: '12px', color: '#fff'}}/>
                     <Line type="monotone" dataKey="pronunciation" stroke="#60a5fa" strokeWidth={3} dot={{r: 4}} />
                     <Line type="monotone" dataKey="vocabulary" stroke="#c084fc" strokeWidth={3} dot={{r: 4}} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderCounselor = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-gray-900">Counselor & Communication</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Micro-Tutor Marketplace */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
            <Users size={20} className="text-green-500"/> Micro-Tutor Marketplace
          </h3>
          <div className="space-y-4">
            {tutors.map((tutor, idx) => (
              <div key={idx} className="flex gap-4 p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                <img src={tutor.avatar} alt="tutor" className="w-12 h-12 rounded-full border border-gray-200" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">{tutor.name}</h4>
                      <p className="text-xs text-gray-500">{tutor.role}</p>
                    </div>
                    <span className="flex items-center text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                      <Star size={12} className="mr-1 fill-yellow-500 text-yellow-500"/> {tutor.rating}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm font-bold text-green-600">{tutor.price}</span>
                    <button className="bg-green-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-green-700">Book</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-green-300 hover:text-green-600 transition-all">
            Find More Tutors
          </button>
        </div>

        {/* Office Hours & Forums */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[32px] p-8 shadow-sm text-white relative overflow-hidden">
             <VideoIcon className="absolute right-6 top-6 text-white/20" size={80} />
             <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">One-Click "Micro-PTM"</h3>
                <p className="text-blue-100 text-sm mb-6 max-w-[90%] font-medium">Resolve small issues in 5 minutes via video before they become big problems.</p>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mb-4">
                   <p className="text-xs text-blue-100 uppercase tracking-widest font-bold mb-3">Teacher's Office Hours (Today)</p>
                   <div className="flex gap-2">
                      <button className="flex-1 bg-white text-blue-600 font-bold py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">4:00 PM</button>
                      <button className="flex-1 bg-white text-blue-600 font-bold py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">4:15 PM</button>
                      <button className="flex-1 bg-transparent border border-white/40 text-white font-bold py-2 rounded-lg text-sm hover:bg-white/10 transition-colors">More</button>
                   </div>
                </div>
                <button className="w-full bg-blue-700/50 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors border border-blue-400/30">Schedule Quick-Sync</button>
             </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[32px] p-8 shadow-sm text-white relative overflow-hidden">
             <Calendar className="absolute right-6 top-6 text-white/20" size={80} />
             <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">Book Counselor "Office Hours"</h3>
                <p className="text-green-100 text-sm mb-6 max-w-[80%]">1-on-1 sessions with school counselors for personalized guidance.</p>
                <button className="bg-white text-green-600 font-bold px-6 py-2.5 rounded-xl hover:bg-green-50">Schedule Now</button>
             </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
             <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
               <MessageSquare size={20} className="text-green-500"/> Anonymous Parent Forums
             </h3>
             <div className="space-y-4">
                {forums.map((forum, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 cursor-pointer">
                     <h4 className="font-bold text-sm text-gray-900 mb-2">{forum.title}</h4>
                     <div className="flex justify-between text-xs text-gray-500">
                        <span>{forum.author}</span>
                        <span className="flex items-center gap-1"><MessageSquare size={12}/> {forum.replies} replies</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  );

  const renderFuture = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-gray-900">Future Readiness</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* University Match-Score */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 lg:col-span-2">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <Globe size={20} className="text-green-500"/> University Match-Score
           </h3>
           <div className="flex flex-col md:flex-row gap-6 items-center bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <CircularProgress progress={85} barColor="text-green-500" />
              <div className="flex-1">
                 <h4 className="text-xl font-bold text-gray-900">MIT (Massachusetts Institute of Technology)</h4>
                 <p className="text-sm text-gray-500 mt-1">Based on Alex's current trajectory in PCM track.</p>
                 <div className="mt-4 flex gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md font-bold">Math matches profile</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-md font-bold">Needs more extracurriculars</span>
                 </div>
              </div>
              <button className="bg-green-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-700 w-full md:w-auto">Explore AI Paths</button>
           </div>
        </div>

        {/* Scholarships */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <Award size={20} className="text-green-500"/> Scholarship Engine
           </h3>
           <div className="space-y-4">
              {scholarships.map((schol, idx) => (
                <div key={idx} className="border-l-4 border-green-500 bg-gray-50 p-4 rounded-r-xl">
                   <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-900 text-sm">{schol.name}</h4>
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">{schol.match} Match</span>
                   </div>
                   <div className="flex justify-between items-center mt-3 text-sm">
                      <span className="font-black text-gray-800">{schol.amount}</span>
                      <span className="text-gray-500 text-xs">Due: {schol.deadline}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Shadowing & Alumni */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 lg:col-span-3">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <Briefcase size={20} className="text-green-500"/> Networking & Experience
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-100 p-6 rounded-2xl flex gap-4 items-center">
                 <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center shrink-0">
                    <Activity className="text-green-700" size={24}/>
                 </div>
                 <div>
                    <h4 className="font-bold text-green-900">Shadowing & Internships</h4>
                    <p className="text-sm text-green-800 mt-1">Track summer internships and local tech company shadowing.</p>
                 </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex gap-4 items-center">
                 <div className="w-12 h-12 bg-emerald-200 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="text-emerald-700" size={24}/>
                 </div>
                 <div>
                    <h4 className="font-bold text-emerald-900">Alumni Mentor Connect</h4>
                    <p className="text-sm text-emerald-800 mt-1">Connect with recent grads in Alex's field of interest.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderFinances = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-gray-900">Finances & Logistics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* College Fund */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <DollarSign size={20} className="text-green-500"/> College Fund Calculator
           </h3>
           <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Projected Goal for 2028 (MIT)</p>
              <div className="flex justify-between items-end mb-2">
                 <span className="text-3xl font-black text-gray-900">$102,000</span>
                 <span className="text-sm text-green-600 font-bold">On Track</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                 <div className="bg-green-500 h-3 rounded-full w-[65%]"></div>
              </div>
           </div>
           <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
             If you increase monthly contributions by $150, you'll hit 100% of your initial goal without loans.
           </p>
        </div>

        {/* Bus Pulse */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <MapPin size={20} className="text-green-500"/> Bus/Attendance Live Pulse
           </h3>
           <div className="bg-gray-900 text-white rounded-2xl p-6 relative z-10">
              <div className="flex justify-between items-center mb-4">
                 <span className="font-bold flex items-center gap-2"><MapPin size={16} className="text-red-400"/> Route #42</span>
                 <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded font-bold">In Transit</span>
              </div>
              <p className="text-sm text-gray-300">Next stop: Elm Street (5 mins away)</p>
              <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between text-sm">
                 <span className="text-gray-400">Alex's Status:</span>
                 <span className="font-bold text-green-400">On Board</span>
              </div>
           </div>
        </div>

        {/* Vault & Group Buy */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 lg:col-span-2">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-100 rounded-2xl flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
                 <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0"><FileText size={24}/></div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-lg">One-Tap Doc Vault</h4>
                    <p className="text-sm text-gray-500 mt-1">Sign permission slips, medical forms, and secure tax documents.</p>
                 </div>
              </div>
              <div className="p-6 border border-gray-100 rounded-2xl flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
                 <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center shrink-0"><Users size={24}/></div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-lg">Group-Buy Learning</h4>
                    <p className="text-sm text-gray-500 mt-1">Split costs on bulk premium educational resources with other parents.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900">Resource Center</h2>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50">
          <Globe size={16}/> Language: EN
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bridge the Gap */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 col-span-1">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <BookOpen size={20} className="text-green-500"/> Bridge the Gap
           </h3>
           <p className="text-sm text-gray-500 mb-6">Recommended materials to help your child overcome current hurdles in Physics.</p>
           <div className="space-y-4">
              <div className="flex gap-4 p-4 border border-gray-100 rounded-2xl">
                 <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0"><Video size={24}/></div>
                 <div>
                    <h4 className="font-bold text-sm">Khan Academy: Vectors</h4>
                    <p className="text-xs text-gray-500 mb-2">15 mins • Directly addresses recent quiz</p>
                    <button className="text-xs font-bold text-green-600">Assign to Alex</button>
                 </div>
              </div>
           </div>
        </div>

        {/* Masterclasses */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 col-span-1">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <Star size={20} className="text-green-500"/> Parenting Pro Masterclasses
           </h3>
           <div className="space-y-4">
              <div className="bg-green-50 p-4 border border-green-100 rounded-2xl">
                 <span className="text-xs font-bold text-green-700 uppercase">Upcoming Live Session</span>
                 <h4 className="font-bold text-green-900 text-lg mt-1 mb-2">"Navigating High School Burnout"</h4>
                 <p className="text-sm text-green-800 mb-4">Dr. Emily Chen, Child Psychologist</p>
                 <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm w-full">Reserve Seat</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderProductivity = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-gray-900">Productivity Suite</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* AI Lesson Co-Pilot */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <Brain size={20} className="text-green-500"/> AI Lesson Co-Pilot
              </h3>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full animate-pulse">Active</span>
           </div>
           <p className="text-gray-500 mb-6 leading-relaxed">Instantly generate lesson plans, activities, and discussion questions.</p>
           <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row gap-2">
               <input type="text" placeholder="e.g., Photosynthesis" className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-400" />
               <button className="bg-green-600 text-white rounded-xl px-4 py-2 font-bold shadow-md hover:bg-green-700 transition shrink-0">Generate</button>
           </div>
        </div>

        {/* Automatic Rubric Generator */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <FileCheck size={20} className="text-green-500"/> Automatic Rubric Generator
           </h3>
           <p className="text-gray-500 mb-6 leading-relaxed">Save hours of manual grading setup. Create detailed grading rubrics in seconds.</p>
           <button className="w-full flex justify-between items-center bg-gray-50 border border-gray-200 p-4 rounded-2xl hover:bg-green-50 hover:border-green-200 transition-colors group">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-green-100 text-gray-500 group-hover:text-green-600 transition-colors">
                 <Plus size={18}/>
               </div>
               <span className="font-bold text-gray-700 group-hover:text-green-800 transition-colors">Create New Rubric</span>
             </div>
           </button>
        </div>

        {/* Voice-to-Grade Assistant */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-4">
             <Mic size={20} className="text-green-500"/> Voice-to-Grade Assistant
           </h3>
           <p className="text-gray-500 mb-6 leading-relaxed">Dictate feedback directly. The AI will transcribe and organize your thoughts into formal grading notes.</p>
           <div className="flex justify-center flex-col items-center py-6 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
             <button className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 hover:scale-105 transition-all shadow-inner">
               <Mic size={28} className="text-green-600"/>
             </button>
             <p className="text-sm font-bold text-gray-500 mt-4">Tap to start recording</p>
           </div>
        </div>

        {/* Automated Sub-Plans */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden">
           <ClipboardList className="absolute right-6 top-6 text-white/10" size={100} />
           <div className="relative z-10">
             <h3 className="font-bold text-xl flex items-center gap-2 mb-3">
               <Calendar size={24} className="text-green-400"/> Automated Sub-Plans
             </h3>
             <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-[80%]">Generate comprehensive, easy-to-follow substitute teacher plans based on your current curriculum timeline.</p>
             <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 shadow-lg shadow-green-500/20">
               Generate Plan 
             </button>
           </div>
        </div>

      </div>
    </div>
  );

  const renderFamilySync = () => {
    const toggleChildSync = (id: number) => {
      setSelectedChildren(prev => 
        prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
      );
    };

    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-black text-gray-900">Family Sync Hub</h2>
        <p className="text-gray-500 text-sm mb-4">Seamlessly compare your children side-by-side and manage synchronized family logistics.</p>
        
        <div className="flex flex-wrap gap-4 mb-6">
           {childData.filter(c => c.id !== 'all').map(child => (
             <button 
               key={child.id}
               onClick={() => toggleChildSync(child.id as number)}
               className={`flex items-center gap-3 px-4 py-2 rounded-full border-2 transition-colors ${selectedChildren.includes(child.id as number) ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white opacity-50'}`}
             >
                <img src={child.avatar} alt="avatar" className="w-8 h-8 rounded-full border border-gray-100"/>
                <span className="font-bold text-gray-900 text-sm">{child.name}</span>
             </button>
           ))}
        </div>

        {/* The Grid / Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {selectedChildren.map(id => {
             const childInfo = childData.find(c => c.id === id);
             const isAlex = id === 1;
             return (
               <div key={id} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col">
                  <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                     <img src={childInfo?.avatar} className="w-14 h-14 rounded-full border border-gray-200 shadow-sm"/>
                     <div>
                       <h3 className="font-black text-xl text-gray-900">{isAlex ? 'Alex - 11th Std' : 'Sarah - 7th Std'}</h3>
                       <p className="text-sm font-bold text-gray-500">{isAlex ? 'PCM Track' : 'General Track'}</p>
                     </div>
                  </div>
                  <div className="space-y-4 flex-1">
                     <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <span className="text-sm font-bold text-gray-600">{isAlex ? 'Current Average' : 'Math Modules'}</span>
                        <span className="text-lg font-black text-green-600">{isAlex ? 'A Grade' : '75% Completed'}</span>
                     </div>
                     <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <span className="text-sm font-bold text-gray-600">{isAlex ? 'Upcoming Event' : 'Next Milestone'}</span>
                        <span className="text-sm font-bold text-gray-900">{isAlex ? 'Physics Mock (Oct 24)' : 'Parent-Counselor Meet'}</span>
                     </div>
                     {isAlex ? (
                       <div className="mt-4 p-5 bg-orange-50 rounded-2xl border border-orange-100">
                          <p className="text-xs font-bold text-orange-600 mb-1 uppercase tracking-wide">Growth Pulse</p>
                          <p className="text-sm text-orange-900 font-medium">Logic Reasoning is trending up! +10% needed for MIT benchmark.</p>
                       </div>
                     ) : (
                       <div className="mt-4 p-5 bg-purple-50 rounded-2xl border border-purple-100">
                          <p className="text-xs font-bold text-purple-600 mb-1 uppercase tracking-wide">Growth Pulse</p>
                          <p className="text-sm text-purple-900 font-medium">Has progressed steadily since 1st Grade. Strong in Literature.</p>
                       </div>
                     )}
                  </div>
               </div>
             )
          })}
        </div>

        {/* 5 Unique Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Cross-Sibling Mentorship */}
           <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden lg:col-span-2">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-6 relative z-10 w-full">
                 <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                    <Brain className="text-green-400" size={32}/>
                 </div>
                 <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                       <Star size={18} className="text-green-400 fill-green-400"/> Cross-Sibling Mentorship Nudge
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                       "Alex is currently excelling in 11th Grade Algebra. Sarah is struggling slightly with 7th Grade Pre-Algebra Basics. Suggest a 15-minute 'Peer-Tutor' session between them this weekend? It reinforces Alex's fundamentals and builds Sarah's confidence."
                    </p>
                 </div>
                 <div className="flex sm:flex-col gap-3 shrink-0 self-stretch sm:self-auto justify-center">
                    <button className="bg-green-500 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-green-600 shadow-md whitespace-nowrap">Schedule Session</button>
                    <button className="bg-white/10 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-white/20 transition-colors whitespace-nowrap">Dismiss</button>
                 </div>
              </div>
           </div>

           {/* Shared Calendar (Chaos Map) */}
           <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
                  <Calendar size={20} className="text-green-500"/> Shared Calendar (Chaos Map)
                </h3>
                <p className="text-xs text-gray-500 mb-4 font-bold uppercase tracking-wider">Upcoming Overlaps:</p>
                <div className="space-y-3">
                   <div className="p-4 border-l-4 border-blue-500 bg-blue-50/50 rounded-r-xl border-y border-r border-blue-100">
                      <div className="flex justify-between items-start">
                         <span className="font-bold text-sm text-gray-900">Alex's Physics Mock</span>
                         <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">Thurs, 2:00 PM</span>
                      </div>
                   </div>
                   <div className="p-4 border-l-4 border-purple-500 bg-purple-50/50 rounded-r-xl border-y border-r border-purple-100">
                      <div className="flex justify-between items-start">
                         <span className="font-bold text-sm text-gray-900">Sarah's Science Fair</span>
                         <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">Thurs, 3:30 PM</span>
                      </div>
                   </div>
                </div>
              </div>
              <div className="mt-6 bg-orange-50 border border-orange-200 p-4 rounded-2xl flex gap-3 text-orange-800 text-sm shadow-sm">
                 <AlertTriangle size={18} className="shrink-0 text-orange-500"/>
                 <p className="leading-tight"><strong>Heads Up!</strong> Thursday afternoon is extremely busy for both children.</p>
              </div>
           </div>

           {/* Family Achievement Wall */}
           <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
                  <Award size={20} className="text-green-500"/> Family Achievement Wall
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                   <div className="shrink-0 w-36 h-44 bg-gray-50 border border-gray-200 rounded-3xl flex flex-col items-center justify-center p-4 text-center hover:border-green-300 hover:bg-green-50 cursor-pointer transition-colors group">
                      <Award size={40} className="text-blue-500 mb-3 group-hover:scale-110 transition-transform"/>
                      <p className="font-bold text-xs text-gray-900">State Math Olympiad</p>
                      <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest bg-white px-2 py-0.5 rounded shadow-sm">Alex (2025)</p>
                   </div>
                   <div className="shrink-0 w-36 h-44 bg-gray-50 border border-gray-200 rounded-3xl flex flex-col items-center justify-center p-4 text-center hover:border-green-300 hover:bg-green-50 cursor-pointer transition-colors group">
                      <FileText size={40} className="text-purple-500 mb-3 group-hover:scale-110 transition-transform"/>
                      <p className="font-bold text-xs text-gray-900">Excellence in Literature</p>
                      <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest bg-white px-2 py-0.5 rounded shadow-sm">Sarah (2026)</p>
                   </div>
                </div>
              </div>
              <button className="mt-4 w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-green-300 hover:text-green-600 transition-colors">
                Add New Certificate
              </button>
           </div>

           {/* Unified Logistics Sync */}
           <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <MapPin size={20} className="text-green-500"/> Unified Logistics Sync
                </h3>
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">Live Tracker</span>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                 <div className="flex-1 bg-gray-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-inner border border-gray-800">
                    <MapPin className="absolute right-[-20px] bottom-[-20px] text-white/5" size={140}/>
                    <div className="relative z-10 flex justify-between items-center mb-6">
                       <span className="font-bold text-blue-400 text-lg">Alex's Route #42</span>
                       <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1.5 rounded-lg border border-green-500/30 font-black tracking-wide uppercase">5 mins away</span>
                    </div>
                    <div className="relative z-10 space-y-2">
                       <p className="text-sm text-gray-400">Next stop: <strong className="text-white">Elm Street</strong></p>
                       <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                          <div className="bg-blue-500 h-1.5 rounded-full w-[85%] relative">
                             <div className="absolute right-0 top-1/2 w-3 h-3 bg-white rounded-full -translate-y-1/2 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="flex-1 bg-gray-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-inner border border-gray-800">
                    <MapPin className="absolute right-[-20px] bottom-[-20px] text-white/5" size={140}/>
                    <div className="relative z-10 flex justify-between items-center mb-6">
                       <span className="font-bold text-purple-400 text-lg">Sarah's Route #12</span>
                       <span className="bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1.5 rounded-lg border border-yellow-500/30 font-black tracking-wide uppercase">15 mins away</span>
                    </div>
                    <div className="relative z-10 space-y-2">
                       <p className="text-sm text-gray-400">Next stop: <strong className="text-white">Oak Avenue</strong></p>
                       <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                          <div className="bg-purple-500 h-1.5 rounded-full w-[45%] relative">
                             <div className="absolute right-0 top-1/2 w-3 h-3 bg-white rounded-full -translate-y-1/2 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Edu-Wallet */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 lg:col-span-2">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-6 gap-4">
              <div>
                <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                  <Wallet size={24} className="text-green-500"/> Edu-Wallet (Incentive Engine)
                </h3>
                <p className="text-gray-500 text-sm mt-1">Reward academic achievements directly via in-app wallet balance connected to the school cafe.</p>
              </div>
              <div className="bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-4 w-full md:w-auto overflow-x-auto">
                 <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Available Balance</p>
                    <p className="text-2xl font-black text-green-400">₹450.00</p>
                 </div>
                 <div className="h-10 w-px bg-gray-700 mx-2"></div>
                 <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-xl font-bold text-sm transition-colors whitespace-nowrap">
                    <Plus size={16}/> Load funds
                 </button>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Active Rules */}
              <div>
                 <h4 className="font-bold text-gray-900 text-md mb-4 flex items-center gap-2"><Target size={18} className="text-gray-400"/> Active Auto-Reward Rules</h4>
                 <div className="space-y-3">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer">
                       <div>
                          <p className="text-sm font-bold text-green-900">Math Module &gt; 80%</p>
                          <p className="text-xs text-green-700 mt-0.5">Auto-deposits ₹50 to Alex's wallet</p>
                       </div>
                       <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-lg">Active</span>
                    </div>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer">
                       <div>
                          <p className="text-sm font-bold text-gray-700">100% Attendance (Weekly)</p>
                          <p className="text-xs text-gray-500 mt-0.5">Auto-deposits ₹100</p>
                       </div>
                       <span className="bg-gray-300 text-gray-600 text-xs font-bold px-2 py-1 rounded-lg">Paused</span>
                    </div>
                    <button className="w-full mt-2 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-green-300 hover:text-green-600 transition-colors flex justify-center items-center gap-2 text-sm">
                      <Plus size={18}/> Create New Rule
                    </button>
                 </div>
              </div>
              
              {/* Transaction History */}
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
                 <h4 className="font-bold text-gray-900 text-md mb-4 flex items-center gap-2"><History size={18} className="text-gray-400"/> Transaction History</h4>
                 <div className="space-y-1">
                    {walletTransactions.map((trx) => (
                      <div key={trx.id} className="flex justify-between items-center p-3 border-b border-gray-200 last:border-0 hover:bg-white rounded-xl transition-colors cursor-pointer">
                         <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm ${trx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                               {trx.type === 'credit' ? <Target size={18}/> : <Coins size={18}/>}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-gray-900">{trx.title}</p>
                               <p className="text-xs text-gray-500 mt-0.5">{trx.date}</p>
                            </div>
                         </div>
                         <span className={`font-black text-sm px-2 py-1 rounded-lg ${trx.type === 'credit' ? 'text-green-600 bg-green-50' : 'text-gray-900 bg-gray-100'}`}>{trx.amount}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  };

  const renderCommunity = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-black text-gray-900">Community Hub</h2>
            <p className="text-gray-500 text-sm mt-1">Move from a passive monitor to an active contributor in our school's ecosystem.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Guest Speaker Registry */}
         <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden lg:col-span-2 flex flex-col md:flex-row gap-8 items-center">
            <Radio className="absolute right-[-20px] top-[-20px] text-white/10" size={200}/>
            <div className="flex-1 relative z-10 space-y-4">
               <h3 className="font-bold text-2xl flex items-center gap-2">
                 <Mic size={28} className="text-green-200"/> Guest Speaker Registry
               </h3>
               <p className="text-green-50 leading-relaxed text-sm">
                 Join our searchable database of parent professionals! Teachers can filter by your specified topics and invite you to speak to classes relevant to your expertise. Share your real-world experience and inspire the next generation.
               </p>
               <div className="flex flex-wrap gap-4 mt-4">
                 <span className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-xl text-xs font-bold border border-white/30 backdrop-blur-md"><Globe size={16}/> Virtual or In-Person</span>
                 <span className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-xl text-xs font-bold border border-white/30 backdrop-blur-md"><UserPlus size={16}/> 45+ Active Parents</span>
               </div>
            </div>
            
            {/* The Professional Profile Card */}
            <div className="w-full md:w-[450px] bg-white rounded-3xl p-6 shadow-2xl relative z-10 text-gray-900">
               <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                  <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <Briefcase size={20} className="text-green-600"/> Professional Profile
                  </h4>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-lg border border-green-200">Active</span>
               </div>
               
               <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Industry</label>
                    <input type="text" className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors" defaultValue="Civil Engineering" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Years of Exp.</label>
                      <input type="number" className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors" defaultValue={15} />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Format</label>
                      <select className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                         <option>Virtual / Zoom</option>
                         <option>In-Person</option>
                         <option>Both</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Expertise Topics</label>
                    <div className="mt-2 flex flex-wrap gap-2 mb-3">
                       <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">Bridge Design <button className="hover:text-red-500 ml-1">&times;</button></span>
                       <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">Python Automation <button className="hover:text-red-500 ml-1">&times;</button></span>
                    </div>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Add a topic (e.g., Fluid Mechanics)..." />
                  </div>
                  <button className="w-full mt-4 bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 text-sm">Update Profile to Teacher Hub</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderCampusLife = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-gray-900">Campus Life & Weekly Timetable</h2>
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
         <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
           <Calendar size={20} className="text-green-500"/> Alex's Master Timetable
         </h3>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
               <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                     <th className="p-4 rounded-tl-xl border-b border-gray-100">Time</th>
                     <th className="p-4 border-b border-gray-100">Monday</th>
                     <th className="p-4 border-b border-gray-100">Tuesday</th>
                     <th className="p-4 border-b border-gray-100">Wednesday</th>
                     <th className="p-4 border-b border-gray-100">Thursday</th>
                     <th className="p-4 rounded-tr-xl border-b border-gray-100">Friday</th>
                  </tr>
               </thead>
               <tbody className="text-sm">
                  <tr className="border-b border-gray-100">
                     <td className="p-4 font-bold text-gray-900">09:00 AM</td>
                     <td className="p-4"><div className="bg-blue-50 text-blue-700 p-2 rounded-lg font-bold text-xs"><p>Physics</p><p className="font-medium">Room 101</p></div></td>
                     <td className="p-4"><div className="bg-purple-50 text-purple-700 p-2 rounded-lg font-bold text-xs"><p>Math</p><p className="font-medium">Room 204</p></div></td>
                     <td className="p-4"><div className="bg-blue-50 text-blue-700 p-2 rounded-lg font-bold text-xs"><p>Physics</p><p className="font-medium">Room 101</p></div></td>
                     <td className="p-4"><div className="bg-green-50 text-green-700 p-2 rounded-lg font-bold text-xs"><p>Chemistry</p><p className="font-medium">Lab 2</p></div></td>
                     <td className="p-4"><div className="bg-orange-50 text-orange-700 p-2 rounded-lg font-bold text-xs"><p>English</p><p className="font-medium">Room 305</p></div></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                     <td className="p-4 font-bold text-gray-900">10:00 AM</td>
                     <td className="p-4"><div className="bg-purple-50 text-purple-700 p-2 rounded-lg font-bold text-xs"><p>Math</p><p className="font-medium">Room 204</p></div></td>
                     <td className="p-4"><div className="bg-green-50 text-green-700 p-2 rounded-lg font-bold text-xs"><p>Chemistry</p><p className="font-medium">Lab 2</p></div></td>
                     <td className="p-4"><div className="bg-blue-50 text-blue-700 p-2 rounded-lg font-bold text-xs"><p>Physics</p><p className="font-medium">Room 101</p></div></td>
                     <td className="p-4 border-2 border-red-400 rounded-lg relative"><div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full -mt-1 -mr-1 animate-ping"></div><div className="bg-red-50 text-red-700 p-2 rounded-lg font-bold text-xs shadow-sm"><p>Struct. Mechanics</p><p className="font-medium">Room 302</p></div></td>
                     <td className="p-4"><div className="bg-blue-50 text-blue-700 p-2 rounded-lg font-bold text-xs"><p>Physics</p><p className="font-medium">Room 101</p></div></td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );

  const renderCollaboration = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-gray-900">Collaboration Hub</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Goal Setting Contract */}
         <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-4">
              <PenBox size={20} className="text-green-500"/> Collaborative "Goal-Setting" Contract
            </h3>
            <p className="text-sm text-gray-500 mb-6">Jointly agree on specific goals for the child to turn complaints into a shared mission.</p>
            <div className="space-y-4 mb-6">
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0"><CheckCircle2 size={14} className="text-green-500"/></div>
                  <span className="text-sm font-bold text-gray-700">Improve handwriting in science labs</span>
               </div>
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0"></div>
                  <span className="text-sm font-bold text-gray-700">Participate in at least one extracurricular club</span>
               </div>
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0"></div>
                  <span className="text-sm font-bold text-gray-700">Master PCM foundational formulas by Midterms</span>
               </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-2xl border border-green-200">
               <div className="text-sm">
                  <p className="font-bold text-green-900">Digital Signatures</p>
                  <p className="text-green-700 mt-1">✓ Term 1 Agreement Pending</p>
               </div>
               <button className="bg-green-600 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:bg-green-700 transition-colors">Sign Contract</button>
            </div>
         </div>

         {/* Tone-Check AI Assistant */}
         <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden">
            <Edit3 className="absolute right-[-20px] bottom-[-20px] text-white/5" size={150}/>
            <div className="relative z-10 flex flex-col h-full">
               <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                 <Brain size={24} className="text-purple-400"/> AI "Tone-Check" Assistant
               </h3>
               <p className="text-gray-400 text-sm mb-6">Maintain professional, supportive communication with teachers.</p>
               
               <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-4">
                  <div>
                     <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Your Draft</p>
                     <p className="text-sm font-medium bg-red-500/10 text-red-200 p-3 rounded-xl border border-red-500/20">"Why did my son get a C?"</p>
                  </div>
                  <div>
                     <p className="text-xs text-green-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-1"><Brain size={12}/> AI Suggestion (Collaborative)</p>
                     <p className="text-sm font-medium bg-green-500/10 text-green-100 p-3 rounded-xl border border-green-500/30">"I noticed Alex struggled with the recent exam. Could you suggest specific areas for us to practice at home?"</p>
                  </div>
               </div>
               <div className="flex gap-4 mt-6">
                  <button className="flex-1 bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 shadow-lg transition-colors text-sm">Use Suggestion</button>
                  <button className="flex-1 bg-transparent border border-gray-600 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">Edit Original</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeMenuItem) {
      case 'home': return renderHome();
      case 'family': return renderFamilySync();
      case 'growth': return renderGrowthJourney();
      case 'academic': return renderAcademic();
      case 'counselor': return renderCounselor();
      case 'future': return renderFuture();
      case 'campusLife': return renderCampusLife();
      case 'collaboration': return renderCollaboration();
      case 'finances': return renderFinances();
      case 'resources': return renderResources();
      case 'productivity': return renderProductivity();
      case 'community': return renderCommunity();
      default: return renderHome();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <motion.div 
        initial={{ width: 280 }}
        animate={{ width: isSidebarOpen ? 280 : 80 }} 
        transition={{ duration: 0.3, type: "spring", stiffness: 100, damping: 20 }} 
        className="bg-white shadow-xl z-20 flex flex-col relative shrink-0"
      >
        {/* Logo Area */}
        <div className={`flex items-center gap-3 h-20 px-6 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
          <Shield className="text-green-600 shrink-0" size={32} />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-xl font-bold tracking-tight whitespace-nowrap overflow-hidden"
              >
<<<<<<< HEAD
                Edu-<span className="text-green-500">Parent</span>
=======
                Edu-<span className="text-green-600">Parent</span>
>>>>>>> 0285e45c0caac0d941674d1aad2c64c884823936
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-24 bg-white border border-gray-200 text-gray-500 hover:text-green-600 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all z-50"
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenuItem(item.id)}
              className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-left transition-all group relative ${
                activeMenuItem === item.id 
                  ? 'bg-green-50 text-green-600 font-semibold shadow-sm border border-green-100/50' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              } ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <item.icon size={22} className={`shrink-0 ${activeMenuItem === item.id ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
              
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        {/* Log Out Button */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={onLogout}
            className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-left text-red-500 hover:bg-red-50 transition-all ${!isSidebarOpen ? 'justify-center' : ''}`}
          >
            <LogOut size={22} className="shrink-0" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden font-medium"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-gray-50/50">
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 px-8 flex justify-between items-center shrink-0 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-black text-gray-900 hidden md:block">Parent Portal</h1>
          </div>
          <div className="flex items-center gap-6">
            
            <div className="relative hidden md:block w-64">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search reports..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-200 text-sm"/>
            </div>

<<<<<<< HEAD
=======
            <button className="relative p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-full transition-colors group">
              <MapPin size={20} />
              <div className="absolute right-0 top-full mt-2 w-max bg-gray-900 text-white text-xs font-bold py-2 px-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl z-50">
                 {typeof activeChild === 'number' ? `Last seen: ${childData.find(c => c.id === activeChild)?.lastSeen || 'Unknown'}` : 'Select a child to view location'}
              </div>
            </button>

>>>>>>> 0285e45c0caac0d941674d1aad2c64c884823936
            <button className="relative p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-gray-200"></div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-sm text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 font-medium">Guardian Account</p>
              </div>
<<<<<<< HEAD
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-green-400 flex items-center justify-center text-white font-bold shadow-md border-2 border-white">
=======
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-md border-2 border-white">
>>>>>>> 0285e45c0caac0d941674d1aad2c64c884823936
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 scroll-smooth">
<<<<<<< HEAD
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Child Selector & Welcome Card */}
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Welcome */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 flex-1 text-white rounded-[32px] p-8 lg:p-10 shadow-xl shadow-green-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <h2 className="text-3xl lg:text-4xl font-black mb-3 text-white">Hello, {userName}!</h2>
                  <p className="text-green-100 text-lg flex items-center gap-2 mb-6 max-w-md">
                    Stay intimately connected with your child's academic progress and career roadmap.
                  </p>
                  <div className="flex gap-4">
                     <button className="bg-white text-green-600 px-6 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-green-50 transition-colors">
                        <Users size={18} /> Book Counselor
                     </button>
                     <button className="bg-green-600 border border-green-400 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-green-700 transition-colors hidden sm:block">
                        View Detailed Report
                     </button>
                  </div>
                </div>
              </div>

              {/* Child Profile Cards */}
              <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 shrink-0 w-full xl:w-[350px]">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Target size={20} className="text-green-500"/> Select Child Profile
                    </h3>
                    <button className="p-1.5 bg-gray-50 text-gray-500 rounded-lg hover:text-green-600"><Plus size={18}/></button>
                 </div>
                 
                 <div className="space-y-4">
                    {childData.map((child) => (
                       <div 
                          key={child.id}
                          onClick={() => setActiveChild(child.id)}
                          className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2 ${activeChild === child.id ? 'border-green-500 bg-green-50/50 shadow-md' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}
                       >
                          <img src={child.avatar} alt="child" className="w-14 h-14 rounded-full border-2 border-white shadow-sm" />
                          <div>
                             <p className="font-bold text-gray-900 text-lg">{child.name}</p>
                             <div className="flex gap-2 text-xs mt-1">
                                <span className="bg-white px-2 py-0.5 rounded text-gray-600">Avg Grade: A</span>
                                <span className="bg-white px-2 py-0.5 rounded text-gray-600">Track: PCM</span>
                             </div>
                          </div>
                          {activeChild === child.id && <CheckCircle2 size={24} className="text-green-500 ml-auto" />}
                       </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Grid Stats Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-8">
                {/* Academic Goals Tracker */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Weekly Milestones</h2>
                    <span className="text-sm font-bold text-green-500 bg-green-50 px-3 py-1 rounded-lg">This Week</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {goalsData.map((goal, index) => (
                      <div key={index} className={`p-5 rounded-3xl border border-gray-100 ${goal.lightBg}`}>
                        <div className="flex justify-between items-start mb-4">
                           <div className={`p-2 bg-white rounded-xl shadow-sm ${goal.color}`}>
                              <BookMarked size={20} />
                           </div>
                           <CircularProgress progress={goal.progress} barColor={goal.color} />
                        </div>
                        <p className="font-bold text-gray-900 mt-2">{goal.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{goal.completed} of {goal.total} tasks completed</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Chart */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                   <div className="flex justify-between items-center mb-8">
                     <h2 className="text-xl font-bold text-gray-900">Study Hours & Focus Score</h2>
                     <button className="text-sm text-gray-500 hover:text-green-600 font-medium">Export Data</button>
                   </div>
                   <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyProgressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                          cursor={{ stroke: '#22c55e', strokeWidth: 1, strokeDasharray: '3 3' }}
                        />
                        <Area type="monotone" dataKey="hours" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                      </AreaChart>
                    </ResponsiveContainer>
                   </div>
                </div>

                {/* Recommended Tutors */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Expert Recommendations</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendedTutors.map((tutor, index) => (
                      <div key={index} className="p-5 border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all rounded-2xl group">
                        <div className="flex gap-4">
                          <img src={tutor.avatar} alt="Tutor" className="w-14 h-14 rounded-full border border-gray-200" />
                          <div className="flex-1">
                              <div className="flex justify-between">
                                 <p className="font-bold text-gray-900">{tutor.subject}</p>
                                 <span className="flex items-center text-xs font-bold text-yellow-500 bg-yellow-50 px-1.5 py-0.5 rounded"><Star size={12} className="mr-0.5 fill-yellow-500"/> {tutor.rating}</span>
                              </div>
                              <p className="text-sm text-gray-500 mt-0.5">{tutor.tutor} • {tutor.target}</p>
                              
                              <div className="flex gap-2 mt-4">
                                <button className="flex-1 bg-white border border-gray-200 py-1.5 rounded-lg text-xs font-bold text-gray-600 hover:border-gray-300">View Profile</button>
                                <button className="flex-1 bg-green-500 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-green-600">Connect</button>
                              </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar widgets */}
              <div className="space-y-8">
                {/* Upcoming Schedule */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                   <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Agenda</h2>
                      <div className="flex space-x-1">
                          <button className="p-1 bg-gray-50 text-gray-400 rounded-lg hover:text-gray-900"><ChevronLeft size={20}/></button>
                          <button className="p-1 bg-gray-50 text-gray-400 rounded-lg hover:text-gray-900"><ChevronRight size={20}/></button>
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                     {upcomingEvents.map((event, index) => (
                       <div key={index} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-green-200 transition-colors cursor-pointer group">
                          <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 ${event.type === 'meeting' ? 'bg-green-100 text-green-600' : event.type === 'test' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                             <span className="text-xs font-bold uppercase">{event.date.split(' ')[0]}</span>
                             <span className="text-lg font-black">{event.date.split(' ')[1] || 'TMR'}</span>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">{event.title}</p>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                              <Calendar size={14}/> {event.time}
                            </p>
                          </div>
                       </div>
                     ))}
                   </div>
                   
                   <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-green-300 hover:text-green-500 transition-all flex items-center justify-center gap-2">
                     <Plus size={18}/> Schedule Meeting
                   </button>
                </div>

                {/* Subject Monitoring */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="flex justify-between items-center mb-6 relative z-10">
                      <h2 className="text-xl font-bold">Class Monitoring</h2>
                      <Brain className="text-green-400" size={24}/>
                    </div>
                    
                    <div className="space-y-4 relative z-10">
                        {subjectsData.map((subject, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
                                <div>
                                    <p className="font-bold text-white text-sm">{subject.name}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{subject.tutor} • {subject.time}</p>
                                </div>
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${subject.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-400'}`}>
                                  {subject.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

              </div>
            </div>
            
=======
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMenuItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
>>>>>>> 0285e45c0caac0d941674d1aad2c64c884823936
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParentDashboard;
