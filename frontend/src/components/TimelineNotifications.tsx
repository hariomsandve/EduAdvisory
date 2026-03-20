import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalIcon, BookOpen, GraduationCap, Search, Filter, 
  Bookmark, Link as LinkIcon, FileText, Upload, CheckCircle, 
  AlertCircle, ShieldCheck, ChevronRight, LayoutDashboard, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Scholarship {
  id: string;
  name: string;
  category: 'Government' | 'Private' | 'International';
  level: string[];
  amount: string;
  deadline: string;
  link: string;
  status: 'Open' | 'Closing Soon' | 'Closed';
}

interface Exam {
  id: string;
  name: string;
  category: string;
  stage: '9th' | '10th' | '12th';
  examDate: string;
  deadline: string;
  link: string;
  description: string;
}

// --- Mock Data ---
const scholarships: Scholarship[] = [
  { id: '1', name: 'NSP National Scholarship', category: 'Government', level: ['10th', '12th', 'UG'], amount: '₹50,000/year', deadline: '2026-03-30', link: 'https://scholarships.gov.in', status: 'Closing Soon' },
  { id: '2', name: 'Reliance Foundation Scholarship', category: 'Private', level: ['UG', 'PG'], amount: '₹2,00,000', deadline: '2026-05-15', link: '#', status: 'Open' },
  { id: '3', name: 'HDFC Parivartan', category: 'Private', level: ['9th', '10th', '12th'], amount: '₹35,000', deadline: '2026-04-10', link: '#', status: 'Open' },
];

const exams: Exam[] = [
  { id: 'e1', name: 'JEE Main', category: 'Engineering', stage: '12th', examDate: '2026-04-05', deadline: '2026-03-20', link: '#', description: 'Entrance for NITs and IIITs.' },
  { id: 'e2', name: 'NEET-UG', category: 'Medical', stage: '12th', examDate: '2026-05-03', deadline: '2026-04-15', link: '#', description: 'National eligibility entrance for MBBS.' },
  { id: 'e3', name: 'NTSE', category: 'Talent Search', stage: '10th', examDate: '2026-11-10', deadline: '2026-09-30', link: '#', description: 'National level scholarship exam.' },
];

export default function ScholarshipExamModule() {
  const [activeTab, setActiveTab] = useState('Scholarships');
  const [searchQuery, setSearchQuery] = useState('');
  const [educationFilter, setEducationFilter] = useState('All');
  const [savedItems, setSavedItems] = useState<string[]>([]);

  // Filtering Logic
  const filteredScholarships = scholarships.filter(s => 
    (educationFilter === 'All' || s.level.includes(educationFilter)) &&
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSave = (id: string) => {
    setSavedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getStatusColor = (status: string) => {
    if (status === 'Closing Soon') return 'bg-red-100 text-red-600 border-red-200';
    if (status === 'Open') return 'bg-green-100 text-green-600 border-green-200';
    return 'bg-gray-100 text-gray-500 border-gray-200';
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
        
        {/* HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">{activeTab}</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your academic future and financial aid.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 shadow-sm"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* SECTION: SCHOLARSHIPS */}
        {activeTab === 'Scholarships' && (
          <div className="space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {['All', '9th', '10th', '12th', 'UG', 'PG'].map(lvl => (
                <button 
                  key={lvl}
                  onClick={() => setEducationFilter(lvl)}
                  className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    educationFilter === lvl ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {lvl} {lvl !== 'All' ? 'Students' : ''}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredScholarships.map((s) => (
                  <motion.div 
                    layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    key={s.id} 
                    className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(s.status)}`}>
                        {s.status}
                      </span>
                      <button onClick={() => toggleSave(s.id)} className={`p-2 rounded-full transition-colors ${savedItems.includes(s.id) ? 'bg-indigo-50 text-indigo-600' : 'text-slate-300 hover:bg-slate-50'}`}>
                        <Bookmark size={18} fill={savedItems.includes(s.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-indigo-600 transition-colors">{s.name}</h3>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <GraduationCap size={14} className="text-slate-400"/> {s.level.join(', ')}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Clock size={14} className="text-slate-400"/> Deadline: {new Date(s.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Amount</p>
                        <p className="text-indigo-600 font-black">{s.amount}</p>
                      </div>
                      <a href={s.link} className="bg-slate-100 p-2 rounded-lg text-slate-600 hover:bg-indigo-600 hover:text-white transition-all">
                        <LinkIcon size={16} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* SECTION: ELIGIBILITY CHECKER (STUDENT TOOLS) */}
        {activeTab === 'Student Tools' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600"><GraduationCap size={24}/></div>
                  <h2 className="text-xl font-black">Eligibility Checker</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Current Class</label>
                    <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>10th Standard</option>
                      <option>12th Standard</option>
                      <option>Undergraduate</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Stream / Field</label>
                    <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Science (PCM)</option>
                      <option>Science (PCB)</option>
                      <option>Commerce</option>
                      <option>Arts</option>
                    </select>
                  </div>
                </div>
                <button className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                  Show Recommendations <ChevronRight size={18}/>
                </button>
              </div>

              {/* DOCUMENT MANAGER */}
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <FileText size={24} className="text-indigo-400" />
                    <h2 className="text-xl font-bold">Document Manager</h2>
                  </div>
                  <button className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">
                    <Upload size={14}/> Upload New
                  </button>
                </div>
                <div className="space-y-3">
                  {['Aadhaar Card', '10th Marksheet', 'Income Certificate'].map(doc => (
                    <div key={doc} className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CheckCircle size={16} className="text-green-400" />
                        <span className="text-sm font-medium">{doc}</span>
                      </div>
                      <span className="text-[10px] text-white/40 font-mono">PDF • 1.2MB</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* UPCOMING ALERTS SIDEBAR */}
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
                <h3 className="text-red-700 font-black text-sm uppercase tracking-tighter mb-4 flex items-center gap-2">
                  <AlertCircle size={16}/> Critical Deadlines
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-2xl border border-red-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-800">JEE Main Registration</p>
                    <p className="text-[10px] text-red-500 font-bold mt-1">4 Days Left</p>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-red-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-800">NSP Scholarship</p>
                    <p className="text-[10px] text-red-500 font-bold mt-1">Tomorrow</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DEFAULT VIEW FOR EXAMS */}
        {activeTab === 'Exams' && (
          <div className="space-y-8">
            {['12th', '10th', '9th'].map((stg) => (
              <div key={stg}>
                <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                   Exams After {stg} <ChevronRight size={18} className="text-indigo-500" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exams.filter(e => e.stage === stg).map(exam => (
                    <div key={exam.id} className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between hover:border-indigo-400 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-xs">
                          {exam.category[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{exam.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{exam.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-800">{new Date(exam.examDate).toLocaleDateString('en-GB')}</p>
                        <p className="text-[9px] text-slate-400 uppercase font-black">Exam Date</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}