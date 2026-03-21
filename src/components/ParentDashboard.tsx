import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { 
  Home, MessageSquare, Calendar, CreditCard, Bell, BookOpen, 
  MoreHorizontal, Plus, RefreshCw, CheckCircle2, ChevronLeft, 
  ChevronRight, Search, Settings, LogOut, TrendingUp, Users, Target, BookMarked, Brain, Shield, Star
} from 'lucide-react';

// Mock Data
const childData = [
  { id: 1, name: 'Alex (11th)', avatar: 'https://picsum.photos/seed/alex/100/100' },
  { id: 2, name: 'Sarah (9th)', avatar: 'https://picsum.photos/seed/sarah/100/100' }
];

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

const upcomingEvents = [
  { title: 'Parent-Counselor Meet', date: 'Tomorrow', time: '10:00 AM', participants: ['Alex'], type: 'meeting' },
  { title: 'Physics Mock Test', date: '24 Oct', time: '2:00 PM', participants: ['Alex'], type: 'test' },
  { title: 'Career Path Workshop', date: '26 Oct', time: '5:00 PM', participants: ['Sarah'], type: 'workshop' },
];

// Reusable Circular Progress
const CircularProgress = ({ progress, barColor }: { progress: number, barColor: string }) => (
  <div className="relative w-20 h-20 flex items-center justify-center">
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
    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
      {progress}%
    </div>
  </div>
);

interface ParentDashboardProps {
  userName?: string;
  onLogout?: () => void;
}

const ParentDashboard = ({ userName = "Parent", onLogout }: ParentDashboardProps) => {
  const [activeChild, setActiveChild] = useState(childData[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Monitor Dashboard', icon: Home },
    { id: 'progress', label: 'Academic Progress', icon: TrendingUp },
    { id: 'messages', label: 'Counselor Chat', icon: MessageSquare },
    { id: 'calendar', label: 'Schedule & Tests', icon: Calendar },
    { id: 'finances', label: 'Payments', icon: CreditCard },
    { id: 'resources', label: 'Parent Guides', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

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
                Edu-<span className="text-green-500">Parent</span>
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-green-400 flex items-center justify-center text-white font-bold shadow-md border-2 border-white">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 scroll-smooth">
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
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParentDashboard;
