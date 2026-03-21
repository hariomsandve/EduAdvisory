import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, CheckCircle2, Clock, 
  FileText, ExternalLink, MessageSquare, Briefcase, 
  Calendar, Award, Building2, ChevronRight, AlertCircle, X, CheckSquare, Square
} from 'lucide-react';
import { useState } from 'react';

type AppType = 'College' | 'Scholarship' | 'Internship';
type AppStatus = 'Under Review' | 'Applying' | 'Drafting' | 'Completed';

interface Document {
  id: string;
  name: string;
  status: 'Verified' | 'Attached' | 'Draft' | 'Pending';
  isCompleted: boolean;
}

interface ApplicationData {
  id: string;
  institution: string;
  program: string;
  type: AppType;
  status: AppStatus;
  progress: number;
  deadline: string;
  nextAction: { text: string; date: string };
  actionBtn: string;
  colorTheme: 'blue' | 'red' | 'green' | 'yellow' | 'purple';
  documents: Document[];
}

const initialApplications: ApplicationData[] = [
  {
    id: 'app-1',
    institution: 'IIT Bombay',
    program: 'B.Tech CS',
    type: 'College',
    status: 'Under Review',
    progress: 75,
    deadline: 'JAN 20',
    nextAction: { text: 'Review Results', date: 'Apr 10' },
    actionBtn: 'View Application Notes',
    colorTheme: 'blue',
    documents: [
      { id: 'd1', name: 'JEE Scores (Verified)', status: 'Verified', isCompleted: true },
      { id: 'd2', name: 'LOR #1 (Mentor Submitted)', status: 'Attached', isCompleted: true },
    ]
  },
  {
    id: 'app-2',
    institution: 'Stanford University',
    program: 'Early Decision',
    type: 'College',
    status: 'Applying',
    progress: 35,
    deadline: 'JAN 15',
    nextAction: { text: 'Finish Essay', date: 'Jan 10' },
    actionBtn: 'Request Mentor Review',
    colorTheme: 'red',
    documents: [
      { id: 'd3', name: 'Stanford Essay (v2)', status: 'Draft', isCompleted: false },
      { id: 'd4', name: 'SAT Scores', status: 'Verified', isCompleted: true },
    ]
  },
  {
    id: 'app-3',
    institution: 'Microsoft',
    program: 'Summer SWE Intern',
    type: 'Internship',
    status: 'Drafting',
    progress: 10,
    deadline: 'FEB 15',
    nextAction: { text: 'Update Resume', date: 'Feb 01' },
    actionBtn: 'Review Job Dist',
    colorTheme: 'green',
    documents: [
      { id: 'd5', name: 'Tech Resume Final', status: 'Pending', isCompleted: false },
      { id: 'd6', name: 'Cover Letter', status: 'Draft', isCompleted: false },
    ]
  }
];

export default function MyApplications() {
  const [activeTab, setActiveTab] = useState('All Active');
  const [applications, setApplications] = useState<ApplicationData[]>(initialApplications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modal State
  const [newApp, setNewApp] = useState({ institution: '', program: '', type: 'College', deadline: '' });

  const tabs = ['All Active', 'Colleges', 'Scholarships', 'Internships', 'Completed'];

  const filteredApps = applications.filter(app => {
    if (activeTab === 'All Active') return app.status !== 'Completed';
    if (activeTab === 'Colleges') return app.type === 'College';
    if (activeTab === 'Scholarships') return app.type === 'Scholarship';
    if (activeTab === 'Internships') return app.type === 'Internship';
    if (activeTab === 'Completed') return app.status === 'Completed';
    return true;
  });

  const toggleDocumentStatus = (appId: string, docId: string) => {
    setApplications(apps => apps.map(app => {
      if (app.id !== appId) return app;
      const updatedDocs = app.documents.map(doc => 
        doc.id === docId ? { ...doc, isCompleted: !doc.isCompleted, status: (!doc.isCompleted ? 'Attached' : 'Pending') as 'Attached' | 'Pending' } : doc
      );
      // Automatically slightly adjust progress based on doc completion for realistic effect
      const completedCount = updatedDocs.filter(d => d.isCompleted).length;
      const newProgress = Math.min(100, Math.max(10, Math.floor((completedCount / updatedDocs.length) * 100)));
      return { ...app, documents: updatedDocs, progress: newProgress };
    }));
  };

  const handleAddApplication = () => {
    if (!newApp.institution || !newApp.program) return;
    
    const newEntry: ApplicationData = {
      id: `app-${Date.now()}`,
      institution: newApp.institution,
      program: newApp.program,
      type: newApp.type as AppType,
      status: 'Drafting',
      progress: 0,
      deadline: newApp.deadline || 'TBA',
      nextAction: { text: 'Start Applying', date: 'Today' },
      actionBtn: 'Begin Setup',
      colorTheme: 'purple',
      documents: [
        { id: `d-${Date.now()}-1`, name: 'Resume/CV', status: 'Pending', isCompleted: false },
        { id: `d-${Date.now()}-2`, name: 'Basic Details Form', status: 'Pending', isCompleted: false }
      ]
    };

    setApplications([...applications, newEntry]);
    setIsModalOpen(false);
    setNewApp({ institution: '', program: '', type: 'College', deadline: '' });
  };

  const getColorClasses = (theme: string) => {
    switch (theme) {
      case 'red': return 'bg-red-50 text-red-600 border-red-100';
      case 'green': return 'bg-green-50 text-green-600 border-green-100';
      case 'yellow': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'purple': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'blue': default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group hover:border-orange-100 transition-colors">
        <div className="absolute right-0 top-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0 group-hover:bg-orange-50 transition-colors duration-1000" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            My Applications Hub
          </h1>
          <p className="text-gray-500 mt-2 max-w-3xl leading-relaxed">
            Track and manage your applications to colleges, scholarships, and internships, ensuring all documents are verified for 'Deep Work' validation.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="relative z-10 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all whitespace-nowrap"
        >
          <Plus size={20} />
          Create New Application Entry
        </button>
      </div>

      {/* 2. "Status at a Glance" Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card A: Deadlines */}
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-gray-400" />
            Upcoming Deadlines
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-bold border border-red-100 hover:scale-[1.02] transition-transform cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
              JAN 15 (College): Stanford Early Decision - DUE IN 3 DAYS
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-yellow-50 text-yellow-700 text-xs font-bold border border-yellow-100 hover:scale-[1.02] transition-transform cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
              FEB 01 (Scholarship): Reliance Foundation Grant
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-green-50 text-green-700 text-xs font-bold border border-green-100 hover:scale-[1.02] transition-transform cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              FEB 15 (Internship): Microsoft Summer Program
            </div>
          </div>
        </div>

        {/* Card B: Document Pipeline */}
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <FileText size={18} className="text-gray-400" />
              Document Pipeline Readiness
            </h3>
          </div>
          <p className="text-xs text-gray-400 font-medium mb-4 pb-2 border-b border-gray-50 flex items-center justify-between">
            <span>Overall Status</span>
            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold">Good</span>
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-700 group cursor-pointer transition-colors hover:text-green-600">
              <CheckCircle2 size={16} className="text-green-500 shrink-0" />
              <span className="font-medium">Resume v3.1</span> <span className="text-gray-400 text-xs group-hover:text-green-500 transition-colors">(Attached)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 group cursor-pointer transition-colors hover:text-green-600">
              <CheckCircle2 size={16} className="text-green-500 shrink-0" />
              <span className="font-medium">Transcripts</span> <span className="text-gray-400 text-xs group-hover:text-green-500 transition-colors">(Attached)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 group cursor-pointer transition-colors hover:text-yellow-600">
              <Clock size={16} className="text-yellow-500 shrink-0" />
              <span className="font-medium">Stanford Essay</span> <span className="text-gray-400 text-xs group-hover:text-yellow-600 transition-colors">(Draft)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 group cursor-pointer transition-colors hover:text-orange-500">
              <AlertCircle size={16} className="text-orange-400 shrink-0" />
              <span className="font-medium">LOR #2</span> <span className="text-gray-400 text-xs group-hover:text-orange-400 transition-colors">(Pending Mentor)</span>
            </div>
          </div>
        </div>

        {/* Card C: Verified Activities */}
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-default group">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award size={18} className="text-gray-400 group-hover:text-purple-500 transition-colors" />
            Verified Deep Work Activities
          </h3>
          <div className="flex justify-between items-center h-full pb-6">
            <div className="text-center flex-1 border-r border-gray-100 group-hover:scale-105 transition-transform">
              <div className="text-5xl font-black text-gray-900 mb-2 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">18</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deep Work Hours</div>
            </div>
            <div className="text-center flex-1 group-hover:scale-105 transition-transform">
              <div className="text-5xl font-black text-gray-900 mb-2 bg-gradient-to-br from-orange-500 to-orange-400 bg-clip-text text-transparent">3</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Skill Certificates</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Main Body - Timeline & Task Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Timeline & Task Grid</h2>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
              {filteredApps.length} Application{filteredApps.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {/* Tabs */}
          <div className="flex p-1.5 bg-white border border-gray-100 rounded-2xl overflow-x-auto no-scrollbar shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-orange-50 text-orange-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredApps.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] p-12 text-center"
                >
                  <p className="text-gray-500 font-medium">No applications found in this category.</p>
                  <button onClick={() => setIsModalOpen(true)} className="mt-4 text-orange-600 font-bold hover:underline">Start a new one</button>
                </motion.div>
              ) : (
                filteredApps.map((app, index) => (
                  <motion.div 
                    layout
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm transition-all hover:shadow-lg hover:border-orange-200 group"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        {/* Header Details */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${getColorClasses(app.colorTheme)}`}>
                            {app.type === 'College' ? <Building2 size={24} /> : app.type === 'Scholarship' ? <Award size={24} /> : <Briefcase size={24} />}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                              {app.institution} - {app.program}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-lg border ${getColorClasses(app.colorTheme)}`}>
                                {app.status}
                              </span>
                              <span className="text-xs text-gray-400 font-medium px-2 py-1 bg-gray-50 rounded-lg">Deadline: <strong className="text-gray-600">{app.deadline}</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* Progress Pipeline */}
                        <div className="mb-6 relative">
                          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                              <span className={`${app.progress > 0 ? 'text-green-600' : ''} transition-colors`}>Preparation</span>
                              <span className={`${app.progress >= 50 ? 'text-orange-500' : ''} transition-colors`}>Requirements Met</span>
                              <span className={`${app.progress >= 100 ? 'text-blue-500' : ''} transition-colors`}>Ready to Send</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2 relative overflow-hidden group-hover:bg-gray-200 transition-colors">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${app.progress}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className={`absolute top-0 left-0 h-full ${app.progress === 100 ? 'bg-green-500' : 'bg-orange-400'} rounded-full`} 
                              />
                          </div>
                        </div>

                        {/* Documents Specific to this App */}
                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 group-hover:bg-orange-50/30 transition-colors">
                          <div className="flex justify-between items-center mb-3">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Documents Required</p>
                            <span className="text-[10px] bg-white px-2 py-1 rounded-full text-gray-500 font-medium border border-gray-100 shadow-sm">{app.documents.filter(d => d.isCompleted).length} / {app.documents.length}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {app.documents.map(doc => (
                              <button 
                                key={doc.id}
                                onClick={() => toggleDocumentStatus(app.id, doc.id)}
                                className={`flex items-center gap-3 text-sm p-2 rounded-xl transition-all border ${
                                  doc.isCompleted 
                                    ? 'bg-green-50 border-green-100 hover:bg-green-100 hover:border-green-200' 
                                    : 'bg-white hover:bg-gray-50 border-white hover:border-gray-200 shadow-sm'
                                }`}
                              >
                                {doc.isCompleted ? (
                                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckSquare size={16} className="text-green-600 shrink-0" /></motion.div>
                                ) : (
                                  <Square size={16} className="text-gray-300 shrink-0" />
                                )}
                                <span className={`text-left text-xs sm:text-sm font-medium transition-colors ${doc.isCompleted ? 'text-green-800 line-through opacity-70' : 'text-gray-700'}`}>
                                  {doc.name}
                                </span>
                              </button>
                            ))}
                          </div>
                          {app.documents.length === 0 && (
                            <p className="text-xs text-gray-400 italic py-2">No documents mapped yet.</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col justify-between items-end md:w-48 shrink-0">
                        <button className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-700 hover:text-orange-600 hover:border-orange-300 rounded-xl text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-center">
                          {app.actionBtn}
                        </button>
                        <div className="mt-4 text-right bg-orange-50 p-3 rounded-xl border border-orange-100 w-full group-hover:bg-orange-100 transition-colors">
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Next Action Steps</p>
                          <p className="text-sm font-bold text-gray-800 mt-1">{app.nextAction.text}</p>
                          <p className="text-xs text-orange-600 font-medium mt-0.5">By {app.nextAction.date}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. "Application Support" Side Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Application Support</h2>
            
            {/* LOR Tracking */}
            <div className="mb-8 group">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  LOR Tracking Timeline
                </h3>
                <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">Live</span>
              </div>
              <div className="overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-inner">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold border-b border-gray-100">
                    <tr>
                      <th className="px-3 py-3">Mentor</th>
                      <th className="px-3 py-3">Focus</th>
                      <th className="px-3 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="px-3 py-4 font-medium text-gray-900 text-xs">Prof. Smith</td>
                      <td className="px-3 py-4 text-gray-500 text-xs">Stanford</td>
                      <td className="px-3 py-4">
                        <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-[10px] bg-orange-50 px-2 py-1.5 rounded-md uppercase tracking-wider">
                          <Clock size={10} /> Pending
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="px-3 py-4 font-medium text-gray-900 text-xs">Dr. Mehta</td>
                      <td className="px-3 py-4 text-gray-500 text-xs">Stanford</td>
                      <td className="px-3 py-4">
                        <span className="inline-flex items-center gap-1 text-green-600 font-bold text-[10px] bg-green-50 px-2 py-1.5 rounded-md uppercase tracking-wider">
                           <CheckCircle2 size={10} /> Sent
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="w-full mt-3 py-2 text-xs font-bold text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                + Request new LOR
              </button>
            </div>

            {/* Refine Your Prep */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                Refine Your Prep
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 hover:shadow-sm text-gray-600 hover:text-orange-600 transition-all group">
                  <div className="flex items-center gap-3 font-bold text-sm">
                    <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-orange-100 transition-colors text-gray-400 group-hover:text-orange-500">
                       <Calendar size={18} />
                    </div>
                    Schedule Mock Interview
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                </button>
                <button className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 hover:shadow-sm text-gray-600 hover:text-orange-600 transition-all group">
                  <div className="flex items-center gap-3 font-bold text-sm">
                    <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-orange-100 transition-colors text-gray-400 group-hover:text-orange-500">
                      <FileText size={18} />
                    </div>
                    Resume Builder
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                </button>
                <button className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 hover:shadow-sm text-gray-600 hover:text-orange-600 transition-all group">
                  <div className="flex items-center gap-3 font-bold text-sm">
                    <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-orange-100 transition-colors text-gray-400 group-hover:text-orange-500">
                      <MessageSquare size={18} />
                    </div>
                    Discuss in Forum
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL overlay for Create New Application */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-[32px] p-8 shadow-2xl z-50 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">New Application</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Institution / Organization Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. MIT, Microsoft, Reliance Foundation"
                    value={newApp.institution}
                    onChange={(e) => setNewApp({...newApp, institution: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all text-gray-900 font-medium" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Program / Position</label>
                    <input 
                      type="text" 
                      placeholder="e.g. B.Tech, Intern"
                      value={newApp.program}
                      onChange={(e) => setNewApp({...newApp, program: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all text-gray-900 font-medium" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                    <div className="relative">
                      <select 
                        value={newApp.type}
                        onChange={(e) => setNewApp({...newApp, type: e.target.value as AppType})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all text-gray-900 font-medium appearance-none"
                      >
                        <option value="College">College</option>
                        <option value="Scholarship">Scholarship</option>
                        <option value="Internship">Internship</option>
                      </select>
                      <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Target Deadline</label>
                  <input 
                    type="text" 
                    placeholder="e.g. MAR 15"
                    value={newApp.deadline}
                    onChange={(e) => setNewApp({...newApp, deadline: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all text-gray-900 font-medium" 
                  />
                </div>
                
                <button 
                  onClick={handleAddApplication}
                  className="w-full py-4 mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none focus:ring-4 focus:ring-orange-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!newApp.institution || !newApp.program}
                >
                  Save to My Hub
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
