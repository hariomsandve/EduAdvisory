import React, { useState } from 'react';
import { 
  Calendar as CalIcon, BookOpen, GraduationCap, Search, 
  Bookmark, FileText, Upload, CheckCircle, AlertCircle, 
  ShieldCheck, ChevronRight, Clock, Bell, CalendarDays, Lightbulb, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Scholarship {
  id: string;
  name: string;
  organization: string;
  category: string;
  level: string[];
  amount: string;
  deadline: string;
  status: 'OPEN' | 'CLOSING SOON';
}

interface Exam {
  id: string;
  name: string;
  subject: string;
  date: string;
  time: string;
  countdown: string;
  status: 'UPCOMING' | 'TODAY' | 'COMPLETED';
}

// --- Mock Data ---
const scholarships: Scholarship[] = [
  { id: '1', name: 'NSP National Scholarship', organization: 'Govt of India', category: 'GOVERNMENT', level: ['10th', '12th', 'UG'], amount: '₹50,000/year', deadline: '30 Mar 2026', status: 'CLOSING SOON' },
  { id: '2', name: 'Reliance Foundation Scholarship', organization: 'Reliance Foundation', category: 'PRIVATE', level: ['UG', 'PG'], amount: '₹2,00,000', deadline: '15 May 2026', status: 'OPEN' },
  { id: '3', name: 'HDFC Parivartan', organization: 'HDFC Bank', category: 'MERIT-BASED', level: ['9th', '10th', '12th'], amount: '₹35,000', deadline: '10 Apr 2026', status: 'OPEN' },
  { id: '4', name: 'Tata Capital Pankh', organization: 'Tata Capital', category: 'ABROAD', level: ['10th', '12th', 'UG'], amount: '₹12,000 - ₹50,000', deadline: '15 Apr 2026', status: 'OPEN' },
];

const exams: Exam[] = [
  { id: '1', name: 'JEE Main Phase 1', subject: 'Physics, Chemistry, Maths', date: '5 Apr 2026', time: '09:00 AM - 12:00 PM', countdown: '15 Days Left', status: 'UPCOMING' },
  { id: '2', name: 'CBSE Physics Final', subject: 'Physics (Code 042)', date: '21 Mar 2026', time: '10:30 AM - 01:30 PM', countdown: 'Today', status: 'TODAY' },
  { id: '3', name: 'NEET Mock Test 4', subject: 'Biology, Physics, Chemistry', date: '10 Mar 2026', time: '02:00 PM - 05:20 PM', countdown: 'Completed', status: 'COMPLETED' },
];

export default function ScholarshipExamModule() {
  const [activeTab, setActiveTab] = useState('Scholarships');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getStatusColor = (status: string) => {
    if (status === 'CLOSING SOON') return 'bg-red-50 text-red-600 font-bold';
    if (status === 'OPEN') return 'bg-green-50 text-green-600 font-bold';
    return 'bg-gray-100 text-gray-500 font-bold';
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-4 space-y-2 sticky top-0 h-screen hidden lg:flex">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="bg-indigo-600 p-2 rounded-xl text-white"><ShieldCheck size={24}/></div>
          <span className="text-xl font-black tracking-tight text-slate-800">EduPortal</span>
        </div>

        {[
          { name: 'Scholarships', icon: CalIcon },
          { name: 'Exams', icon: BookOpen },
          { name: 'Upcoming Deadlines', icon: Clock },
          { name: 'Student Tools', icon: GraduationCap },
          { name: 'Saved Items', icon: Bookmark },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === item.name ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <item.icon size={18} />
            {item.name}
          </button>
        ))}
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 lg:p-10 max-w-6xl mx-auto">
        
        {/* HEADER BAR FOR SCHOLARSHIPS / MAIN VIEWS */}
        {(activeTab === 'Scholarships' || activeTab === 'Exams') && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{activeTab}</h1>
              <p className="text-slate-500 text-[13px] mt-1">
                {activeTab === 'Scholarships' ? 'Manage your academic future and financial aid.' : 'Track your upcoming tests, finals, and entrance exams.'}
              </p>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder={`Search ${activeTab.toLowerCase()}...`}
                className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-80 shadow-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* SECTION: SCHOLARSHIPS */}
        {activeTab === 'Scholarships' && (
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Filters</p>
              <div className="flex flex-wrap gap-3 pb-2">
                <button className="px-5 py-2 rounded-full text-xs font-bold leading-none bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors">Class 12 + Engineering</button>
                <button className="px-5 py-2 rounded-full text-xs font-bold leading-none bg-teal-50 text-teal-600 border border-teal-100 hover:bg-teal-100 transition-colors">Post Graduation + Abroad</button>
                <button className="px-5 py-2 rounded-full text-xs font-bold leading-none bg-pink-50 text-pink-600 border border-pink-100 hover:bg-pink-100 transition-colors">Girls / Women</button>
                <button className="px-5 py-2 rounded-full text-xs font-bold leading-none bg-blue-50 text-blue-500 border border-blue-100 hover:bg-blue-100 transition-colors">Government Schemes</button>
              </div>
            </div>

            <p className="text-sm font-medium text-slate-500 mt-6 mb-2">Showing 33 results</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {scholarships.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map((s) => (
                  <motion.div 
                    layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    key={s.id} 
                    className="bg-white border border-slate-200 rounded-[1.5rem] p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-5">
                        <div className="flex gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wide ${getStatusColor(s.status)}`}>
                            {s.status}
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wide font-bold bg-slate-100 text-slate-600`}>
                            {s.category}
                          </span>
                        </div>
                        <button onClick={() => toggleSave(s.id)} className={`p-1.5 rounded-md transition-colors ${savedItems.includes(s.id) ? 'text-indigo-600' : 'text-slate-300 hover:text-slate-500'}`}>
                          <Bookmark size={20} fill={savedItems.includes(s.id) ? "currentColor" : "none"} />
                        </button>
                      </div>

                      <h3 className="font-extrabold text-[1.15rem] leading-tight mb-1 text-slate-800">{s.name}</h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mb-5">
                        <ShieldCheck size={14} className="text-slate-300"/> {s.organization}
                      </div>

                      <div className="space-y-2.5 mb-8">
                        <div className="flex items-center gap-2.5 text-xs text-slate-500 font-medium tracking-tight">
                          <GraduationCap size={15} className="text-slate-400"/> {s.level.join(', ')}
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-slate-500 font-medium tracking-tight">
                          <Clock size={15} className="text-slate-400"/> Deadline: {s.deadline}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-0.5">Amount</p>
                        <p className="text-emerald-600 font-black text-xl">{s.amount}</p>
                      </div>
                      <button className="bg-slate-50 p-2.5 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all border border-slate-200 shadow-sm">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* SECTION: EXAMS */}
        {activeTab === 'Exams' && (
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Filter by Status</p>
              <div className="flex flex-wrap gap-3 pb-2">
                <button className="px-5 py-2 rounded-full text-xs font-bold leading-none bg-indigo-600 text-white border border-indigo-600 shadow-sm">All</button>
                <button className="px-5 py-2 rounded-full text-xs font-bold leading-none bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100 transition-colors">Today</button>
                <button className="px-5 py-2 rounded-full text-xs font-bold leading-none bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors">Upcoming</button>
                <button className="px-5 py-2 rounded-full text-xs font-bold leading-none bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 transition-colors">Completed</button>
              </div>
            </div>

            <p className="text-sm font-medium text-slate-500 mt-6 mb-2">Showing 3 results</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {exams.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase())).map((e) => (
                  <motion.div 
                    layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    key={e.id} 
                    className={`bg-white border rounded-[1.5rem] p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between ${
                      e.status === 'TODAY' ? 'border-amber-400 ring-2 ring-amber-50' : 'border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-extrabold ${
                          e.status === 'TODAY' ? 'bg-amber-100 text-amber-700' : 
                          e.status === 'UPCOMING' ? 'bg-indigo-50 text-indigo-600' : 
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {e.status}
                        </span>
                        {e.status !== 'COMPLETED' && (
                          <button className={`p-1.5 rounded-md transition-colors text-slate-300 hover:text-slate-500 hover:bg-slate-50`}>
                            <Bell size={18} />
                          </button>
                        )}
                      </div>

                      <h3 className="font-extrabold text-[1.15rem] leading-tight mb-1 text-slate-800">{e.name}</h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mb-5">
                        <BookOpen size={14} className="text-slate-300"/> {e.subject}
                      </div>

                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold tracking-tight">
                          <CalendarDays size={15} className="text-slate-400"/> {e.date}
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold tracking-tight">
                          <Clock size={15} className="text-slate-400"/> {e.time}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        {e.status === 'COMPLETED' ? (
                          <>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-0.5">Status</p>
                            <p className="text-slate-400 font-bold text-sm">Done</p>
                          </>
                        ) : (
                          <>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-0.5">Countdown</p>
                            <p className={`font-black text-lg ${e.status === 'TODAY' ? 'text-amber-600' : 'text-indigo-600'}`}>{e.countdown}</p>
                          </>
                        )}
                      </div>
                      {e.status !== 'COMPLETED' && (
                        <button className={`p-2.5 rounded-xl transition-all shadow-sm font-bold text-xs flex items-center gap-1 ${
                          e.status === 'TODAY' ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                        }`}>
                          <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* SECTION: UPCOMING DEADLINES */}
        {activeTab === 'Upcoming Deadlines' && (
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Content */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Urgent */}
                <div>
                  <h2 className="text-[1.15rem] font-bold text-red-600 mb-4 flex items-center gap-2">
                    <AlertCircle size={20}/> Urgent (1-3 Days)
                  </h2>
                  <div className="grid grid-cols-1 gap-5">
                    {/* Urgent Application */}
                    <div className="bg-red-50 border border-red-200 p-6 rounded-[2rem] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-white text-red-600 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-red-100 shadow-sm">
                            APPLICATION
                          </span>
                          <button className="bg-red-500 text-white p-1.5 rounded-full shadow-md shadow-red-200 animate-bounce"><Bell size={14} /></button>
                        </div>
                        <h3 className="font-extrabold text-lg text-slate-900 pr-4 leading-tight mb-2">
                          State Merit Scholarship Form
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-red-600 font-bold mb-6">
                          <Clock size={13}/> Due: Tomorrow!
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-slate-700">Completion Progress</span>
                            <span className="text-red-600">85%</span>
                          </div>
                          <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-red-100">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <button className="w-full bg-red-600 text-white font-bold text-sm py-3.5 rounded-[1.25rem] hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-sm">
                          Complete Now <ChevronRight size={16}/>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* This Week */}
                <div>
                  <h2 className="text-[1.15rem] font-bold text-amber-500 mb-4 flex items-center gap-2">
                    <Clock size={20}/> This Week (4-7 Days)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Scholarship Card */}
                    <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-slate-200">
                            SCHOLARSHIP
                          </span>
                          <button className="text-slate-400 p-1"><Bell size={18} /></button>
                        </div>
                        <h3 className="font-extrabold text-lg text-slate-800 pr-4 leading-tight mb-2">
                          NSP National Scholarship
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-6">
                          <Clock size={13} className="text-slate-400"/> Due: 26 Mar 2026
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-slate-600">Progress</span>
                            <span className="text-slate-900">40%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                        <button className="w-full bg-indigo-600 text-white font-bold text-sm py-3.5 rounded-[1.25rem] hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm">
                          Continue Application <ChevronRight size={16}/>
                        </button>
                      </div>
                    </div>

                    {/* Exam Card */}
                    <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-slate-200">
                            EXAM
                          </span>
                          <button className="bg-indigo-500 text-white p-1.5 rounded-full shadow-md shadow-indigo-200"><Bell size={14} /></button>
                        </div>
                        <h3 className="font-extrabold text-lg text-slate-800 pr-4 leading-tight mb-2">
                          CBSE Board Final Paper
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-6">
                          <Clock size={13} className="text-slate-400"/> Due: 28 Mar 2026
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-slate-600">Progress</span>
                            <span className="text-emerald-500">100%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                        <button className="w-full bg-emerald-50 text-emerald-600 font-bold text-sm py-3.5 rounded-[1.25rem] hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 border border-emerald-100">
                          Review Application <ChevronRight size={16}/>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Later */}
                <div>
                  <h2 className="text-[1.15rem] font-bold text-teal-600 mb-4 flex items-center gap-2">
                    <CheckCircle size={20}/> Later
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Application Card */}
                    <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-slate-200">
                            APPLICATION
                          </span>
                          <button className="text-slate-400 p-1"><Bell size={18} /></button>
                        </div>
                        <h3 className="font-extrabold text-lg text-slate-800 pr-4 leading-tight mb-2">
                          MIT Application Portfolio
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-6">
                          <Clock size={13} className="text-slate-400"/> Due: 10 Apr 2026
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-slate-600">Progress</span>
                            <span className="text-slate-900">20%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: '20%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Sidebar Widgets */}
              <div className="space-y-5">
                {/* Sync widget */}
                <button className="w-full bg-white border border-slate-200 text-indigo-700 font-extrabold text-sm py-5 rounded-3xl hover:bg-slate-50 hover:border-indigo-200 transition-all flex items-center justify-center gap-3 shadow-sm">
                  <CalendarDays size={18}/> Sync with Google Calendar
                </button>

                {/* Smart Tips */}
                <div className="bg-gradient-to-br from-indigo-700 to-purple-800 rounded-[2rem] p-7 text-white shadow-xl relative overflow-hidden isolate">
                  {/* Decorative faint circles */}
                  <div className="absolute top-0 right-0 p-8 opacity-10 -z-10 pointer-events-none">
                     <Target size={180} className="translate-x-12 -translate-y-12" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                     <Lightbulb fill="currentColor" size={22} className="text-yellow-400" />
                     <h3 className="font-black text-xl tracking-tight">Smart Tips</h3>
                  </div>

                  <p className="text-sm text-indigo-100 font-medium leading-relaxed mb-6">
                    Based on your profile, focusing on your <strong>State Merit Scholarship Form</strong> will yield the highest success rate.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-[13px] text-indigo-50 font-medium">Prepare income certificates early.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-[13px] text-indigo-50 font-medium">Take 2 mock tests this weekend.</p>
                    </div>
                  </div>

                  <button className="w-full bg-white text-purple-700 font-black text-sm py-3.5 rounded-2xl hover:bg-indigo-50 transition-colors shadow-sm">
                    Generate Study Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: STUDENT TOOLS */}
        {activeTab === 'Student Tools' && (
          <div className="w-full">
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Student Tools</h1>
              <p className="text-slate-500 text-[13px] mt-1">Manage your academic future and financial aid.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                
                {/* Eligibility Checker */}
                <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><GraduationCap size={24}/></div>
                    <h2 className="text-xl font-black text-slate-800">Eligibility Checker</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Current Class</label>
                      <select className="w-full bg-white border border-slate-200 p-3.5 text-sm font-bold text-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm appearance-none cursor-pointer">
                        <option>10th Standard</option>
                        <option>12th Standard</option>
                        <option>Undergraduate</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Stream / Field</label>
                      <select className="w-full bg-white border border-slate-200 p-3.5 text-sm font-bold text-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm appearance-none cursor-pointer">
                        <option>Science (PCM)</option>
                        <option>Science (PCB)</option>
                        <option>Commerce</option>
                        <option>Arts</option>
                      </select>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-[1.25rem] font-bold text-sm shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                    Show Exam & Scholarship Recommendations <ChevronRight size={18}/>
                  </button>
                </div>

                {/* DOCVAULT */}
                <div className="bg-[#111827] rounded-[2rem] p-8 text-white relative overflow-hidden">
                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-400"><FileText size={22} /></div>
                      <h2 className="text-xl font-bold tracking-tight">DocVault</h2>
                    </div>
                    <button className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-white/20 transition-all border border-white/5">
                      <Upload size={14}/> Upload
                    </button>
                  </div>
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between bg-[#1f2937] p-5 rounded-2xl border border-white/5 shadow-sm hover:border-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CheckCircle size={18} className="text-emerald-400" />
                        <span className="text-sm font-semibold tracking-tight">Aadhaar Card</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold bg-black/20 px-2 py-1 rounded-md">PDF • 1.2MB</span>
                    </div>
                    {/* Faded placeholder items to match app aesthetics */}
                    <div className="flex items-center justify-between bg-[#1f2937]/50 p-5 rounded-2xl border border-white/5 shadow-sm cursor-pointer opacity-50">
                      <div className="flex items-center gap-3">
                        <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-500 shrink-0"></div>
                        <span className="text-sm font-semibold tracking-tight text-slate-300">10th Marksheet</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* UPCOMING ALERTS SIDEBAR */}
              <div className="space-y-6">
                <div className="bg-[#fff4f2] border border-red-100 rounded-3xl p-6">
                  <h3 className="text-red-700 font-black text-sm uppercase tracking-tight mb-5 flex items-center gap-2">
                    <AlertCircle size={18}/> Critical Deadlines
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-red-100/50 shadow-sm flex flex-col items-start gap-1">
                      <p className="text-[13px] font-bold text-slate-800">JEE Main Registration</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-red-500 font-bold mt-1">
                        <Clock size={12}/> 4 Days Left
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-red-100/50 shadow-sm flex flex-col items-start gap-1">
                      <p className="text-[13px] font-bold text-slate-800">NSP Scholarship Phase 1</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-red-500 font-bold mt-1">
                        <Clock size={12}/> Tomorrow
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}