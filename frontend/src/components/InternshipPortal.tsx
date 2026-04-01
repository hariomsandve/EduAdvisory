import { useState, useEffect } from 'react';
import { 
  Briefcase, MapPin, Calendar, Search, Bookmark, Send, X, 
  Building2, Clock, Loader2, CheckCircle2, XCircle, ChevronLeft,
  Banknote, FileText, CheckSquare, Sparkles, Bot, Settings, Target,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
  isBookmarked: boolean;
}

interface AiInsight {
  companyInfo: string;
  roleMatch: string;
  interviewTips: string;
}

const mockInternships: Internship[] = [
  {
    id: '1',
    title: 'Software Development Intern',
    company: 'Tech Innovations Inc.',
    location: 'Bangalore, India (Remote)',
    duration: '6 Months',
    stipend: '₹25,000/month',
    description: 'Join our dynamic team to work on cutting-edge web applications. You will be involved in the full software development lifecycle, from ideation to deployment.',
    responsibilities: [
      'Develop and maintain web applications using React and Node.js.',
      'Collaborate with senior developers on system design and architecture.',
      'Write clean, maintainable, and efficient code.',
      'Participate in code reviews and team meetings.'
    ],
    requirements: [
      'Proficiency in JavaScript/TypeScript.',
      'Familiarity with React.js and Node.js.',
      'Basic understanding of database concepts (SQL/NoSQL).',
      'Strong problem-solving skills and attention to detail.',
      'Currently pursuing a Bachelor\'s or Master\'s degree in Computer Science or a related field.'
    ],
    postedDate: '2026-02-15',
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'Data Insights Co.',
    location: 'Pune, India',
    duration: '3 Months',
    stipend: '₹20,000/month',
    description: 'Work with our elite data science team to analyze large datasets, build predictive models, and extract actionable business insights.',
    responsibilities: [
      'Assist in data collection, cleaning, and preprocessing.',
      'Develop and implement machine learning models.',
      'Generate insights and create visualizations from data.',
      'Present findings to stakeholders.'
    ],
    requirements: [
      'Strong understanding of Python and its data science libraries (Pandas, NumPy, Scikit-learn).',
      'Knowledge of statistical modeling and machine learning algorithms.',
      'Experience with data visualization tools (Matplotlib, Seaborn).',
      'Excellent analytical and communication skills.',
      'Currently pursuing a Bachelor\'s or Master\'s degree in Data Science, Statistics, or a related field.'
    ],
    postedDate: '2026-02-10',
    isBookmarked: true,
  },
  {
    id: '3',
    title: 'UI/UX Design Intern',
    company: 'Creative Studio',
    location: 'Mumbai, India',
    duration: '4 Months',
    stipend: '₹18,000/month',
    description: 'Contribute to the design of intuitive and engaging user interfaces for our mobile and web products used by millions.',
    responsibilities: [
      'Conduct user research and usability testing.',
      'Create wireframes, prototypes, and high-fidelity mockups.',
      'Collaborate with product managers and developers.',
      'Ensure design consistency across all platforms.'
    ],
    requirements: [
      'Proficiency in design tools like Figma, Sketch, or Adobe XD.',
      'Understanding of user-centered design principles.',
      'Portfolio showcasing design projects.',
      'Strong communication and teamwork skills.',
      'Currently pursuing a Bachelor\'s or Master\'s degree in Design, HCI, or a related field.'
    ],
    postedDate: '2026-02-01',
    isBookmarked: false,
  },
  {
    id: '4',
    title: 'Marketing Intern',
    company: 'Global Brands Ltd.',
    location: 'Delhi, India',
    duration: '5 Months',
    stipend: '₹22,000/month',
    description: 'Support our marketing team in executing digital campaigns, driving brand awareness, and content creation for modern platforms.',
    responsibilities: [
      'Assist in managing social media accounts.',
      'Create engaging content for various platforms.',
      'Analyze campaign performance and generate reports.',
      'Research market trends and competitor activities.'
    ],
    requirements: [
      'Strong written and verbal communication skills.',
      'Familiarity with social media platforms and digital marketing concepts.',
      'Basic knowledge of SEO/SEM.',
      'Ability to work independently and as part of a team.',
      'Currently pursuing a Bachelor\'s or Master\'s degree in Marketing, Business, or a related field.'
    ],
    postedDate: '2026-01-28',
    isBookmarked: false,
  },
];

export default function InternshipPortal() {
  const [internships, setInternships] = useState<Internship[]>(mockInternships);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    duration: '',
  });
  
  // Automatically select the first internship on load
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(mockInternships[0]);
  
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  // Job Preferences State
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [jobPreferences, setJobPreferences] = useState({
    role: 'Software Development',
    location: 'Remote',
    type: 'Full-time'
  });
  
  // Temp state for editing preferences in modal
  const [tempPreferences, setTempPreferences] = useState(jobPreferences);

  // AI Bot State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<AiInsight | null>(null);

  // Reset AI state when selected internship changes
  useEffect(() => {
    setAiInsights(null);
    setIsAiLoading(false);
  }, [selectedInternship?.id]);

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = filters.location === '' || internship.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesDuration = filters.duration === '' || internship.duration.toLowerCase().includes(filters.duration.toLowerCase());
    const matchesBookmark = showBookmarkedOnly ? internship.isBookmarked : true;

    return matchesSearch && matchesLocation && matchesDuration && matchesBookmark;
  });

  const toggleBookmark = (id: string) => {
    setInternships(prev => 
      prev.map(int => 
        int.id === id ? { ...int, isBookmarked: !int.isBookmarked } : int
      )
    );
    
    // Update selected internship if it's the one being bookmarked
    if (selectedInternship?.id === id) {
      setSelectedInternship(prev => prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null);
    }
  };

  const handleApply = async () => {
    setApplicationStatus('submitting');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      // Simulate success or error randomly (80% success rate)
      if (Math.random() > 0.2) { 
        setApplicationStatus('success');
      } else {
        throw new Error('Application failed');
      }
    } catch (error) {
      setApplicationStatus('error');
    }
  };

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setTimeout(() => setApplicationStatus('idle'), 300); // Reset after animation
  };

  const handleSavePreferences = () => {
    setJobPreferences(tempPreferences);
    setShowPreferencesModal(false);
  };

  const handleGenerateInsights = async (internship: Internship) => {
    setIsAiLoading(true);
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Dynamic mock insights based on internship data
    const isTech = internship.title.toLowerCase().includes('software') || internship.title.toLowerCase().includes('data');
    
    setAiInsights({
      companyInfo: `${internship.company} is highly rated for its collaborative work culture and mentorship programs. Former interns often highlight the hands-on experience and flexible working hours. They are rapidly expanding their ${isTech ? 'engineering' : 'core'} teams this quarter.`,
      roleMatch: `Based on standard student profiles, this is an 85% match for you. Highlighting your background in ${internship.requirements[0].split(' ').pop()?.replace('.', '') || 'the relevant field'} will make your application stand out.`,
      interviewTips: `Expect behavioral questions focusing on teamwork, along with technical assessments related to ${internship.requirements[1] || 'core concepts'}. Be prepared to discuss your previous projects in detail.`
    });
    setIsAiLoading(false);
  };

  const bookmarkedCount = internships.filter(i => i.isBookmarked).length;

  // Helper to check if internship is a match based on user preferences
  const isMatch = (internship: Internship) => {
    if (!jobPreferences.role) return false;
    const matchesRole = internship.title.toLowerCase().includes(jobPreferences.role.toLowerCase().split(' ')[0]);
    const matchesLoc = internship.location.toLowerCase().includes(jobPreferences.location.toLowerCase());
    return matchesRole || matchesLoc;
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900 relative">
      
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 lg:p-8 h-screen flex flex-col overflow-hidden max-w-[1600px] mx-auto w-full">
        
        {/* HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
          <div className="flex items-center gap-4">
             <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-2xl text-white hidden md:block shadow-lg shadow-indigo-200">
               <Briefcase size={24} strokeWidth={2.5}/>
             </div>
             <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight">Internship Portal</h1>
               <p className="text-slate-500 text-sm mt-1 font-medium">Discover opportunities, gain experience, and launch your career.</p>
             </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-full text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
              <ChevronLeft size={18} /> Back
            </button>
            <button 
              onClick={() => {
                setTempPreferences(jobPreferences);
                setShowPreferencesModal(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-full text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <Settings size={18} className="text-slate-400" /> Preferences
            </button>
            <button 
              onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm border ${
                showBookmarkedOnly 
                  ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 shadow-indigo-200' 
                  : 'bg-white text-indigo-600 border-slate-200 hover:bg-indigo-50 hover:border-indigo-200'
              }`}
            >
              <Bookmark size={18} fill={showBookmarkedOnly ? 'currentColor' : 'none'} /> 
              Saved ({bookmarkedCount})
            </button>
          </div>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-3 shrink-0 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by role, company, or keywords..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl focus:ring-0 outline-none text-sm font-medium text-slate-800 placeholder-slate-400"
            />
          </div>
          <div className="hidden md:block w-px bg-slate-200 my-2"></div>
          <select 
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="px-4 py-3 bg-transparent focus:ring-0 outline-none text-sm font-bold text-slate-600 cursor-pointer min-w-[160px] hover:text-indigo-600 transition-colors"
          >
            <option value="">All Locations</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Remote">Remote</option>
          </select>
          <div className="hidden md:block w-px bg-slate-200 my-2"></div>
          <select 
            value={filters.duration}
            onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
            className="px-4 py-3 bg-transparent focus:ring-0 outline-none text-sm font-bold text-slate-600 cursor-pointer min-w-[160px] hover:text-indigo-600 transition-colors"
          >
            <option value="">All Durations</option>
            <option value="3 Months">3 Months</option>
            <option value="4 Months">4 Months</option>
            <option value="5 Months">5 Months</option>
            <option value="6 Months">6 Months</option>
          </select>
        </div>

        {/* SPLIT VIEW AREA */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          
          {/* LEFT PANEL - INTERNSHIP LIST */}
          <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col gap-4 overflow-hidden shrink-0">
            <div className="flex justify-between items-center px-2">
              <h2 className="font-bold text-slate-500 text-xs uppercase tracking-widest">Results ({filteredInternships.length})</h2>
              {jobPreferences.role && (
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5 border border-indigo-200">
                  <Target size={12} /> {jobPreferences.role}
                </span>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-10">
              <AnimatePresence>
                {filteredInternships.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-slate-500 py-16 bg-white rounded-[2rem] border border-slate-200 border-dashed">
                    <Search size={48} className="mx-auto mb-4 opacity-20 text-indigo-600" />
                    <p className="text-lg font-bold text-slate-800">No internships found</p>
                    <p className="text-sm mt-1 text-slate-500">Try adjusting your filters or search terms.</p>
                  </motion.div>
                ) : (
                  filteredInternships.map(internship => {
                    const recommendationMatch = isMatch(internship);
                    const isSelected = selectedInternship?.id === internship.id;

                    return (
                      <motion.div
                        key={internship.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={() => setSelectedInternship(internship)}
                        className={`p-6 rounded-[1.5rem] border cursor-pointer transition-all relative group ${
                          isSelected 
                            ? 'bg-indigo-50/50 border-indigo-300 shadow-md ring-4 ring-indigo-50/50' 
                            : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-md'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            {recommendationMatch && (
                               <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-amber-100 to-orange-100 text-orange-700 text-[10px] font-black tracking-wider mb-3 border border-orange-200 shadow-sm">
                                 <Sparkles size={12} className="text-orange-500" /> PERFECT MATCH
                               </div>
                            )}
                            <h3 className={`font-black text-lg leading-tight ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>{internship.title}</h3>
                            <p className="text-sm font-semibold text-slate-500 mt-1">{internship.company}</p>
                          </div>
                          
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleBookmark(internship.id); }}
                            className={`p-2 rounded-full transition-colors ${internship.isBookmarked ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-indigo-500'}`}
                          >
                            <Bookmark size={18} fill={internship.isBookmarked ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-5">
                          <span className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[11px] font-bold border border-slate-200/60">
                            <MapPin size={12} className="text-slate-400"/> {internship.location.split(',')[0]}
                          </span>
                          <span className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[11px] font-bold border border-slate-200/60">
                            <Clock size={12} className="text-slate-400"/> {internship.duration}
                          </span>
                          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-[11px] font-black border border-emerald-100">
                            <Banknote size={12} /> {internship.stipend}
                          </span>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT PANEL - INTERNSHIP DETAILS */}
          <div className="hidden lg:flex flex-1 bg-white rounded-[2rem] shadow-md shadow-slate-200/50 border border-slate-200 flex-col overflow-hidden">
            {selectedInternship ? (
              <>
                {/* Detail Header with Gradient */}
                <div className="relative p-10 overflow-hidden shrink-0 border-b border-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 z-0"></div>
                  <div className="absolute -right-12 -top-12 text-indigo-500/5 z-0 transform rotate-12">
                    <Briefcase size={250} />
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start gap-6">
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                          <Building2 size={36} className="text-indigo-600" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-1">{selectedInternship.title}</h2>
                          <p className="text-lg font-bold text-indigo-600 flex items-center gap-2">
                            {selectedInternship.company}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        <button 
                          onClick={() => toggleBookmark(selectedInternship.id)}
                          className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all ${
                            selectedInternship.isBookmarked 
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                              : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <Bookmark size={22} fill={selectedInternship.isBookmarked ? 'currentColor' : 'none'} />
                        </button>
                        <button 
                          onClick={() => setShowApplyModal(true)}
                          className="h-12 px-8 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                          Apply Now <Send size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-8">
                      <span className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm">
                        <MapPin size={16} className="text-indigo-400"/> {selectedInternship.location}
                      </span>
                      <span className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm">
                        <Calendar size={16} className="text-indigo-400"/> {selectedInternship.duration}
                      </span>
                      <span className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-sm font-black text-emerald-700 shadow-sm">
                        <Banknote size={16} className="text-emerald-500" /> {selectedInternship.stipend}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Detail Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                  <motion.div
                    key={selectedInternship.id}
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                    className="space-y-10"
                  >
                    {/* --- LinkedIn-style AI Insights Section --- */}
                    <div>
                      {!aiInsights && !isAiLoading ? (
                        <button 
                          onClick={() => handleGenerateInsights(selectedInternship)}
                          className="w-full py-5 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 hover:from-indigo-100/50 hover:to-purple-100/50 border border-indigo-200/50 rounded-[1.5rem] flex items-center justify-center gap-3 text-indigo-700 font-bold transition-all shadow-sm group"
                        >
                          <Sparkles size={20} className="text-indigo-500 group-hover:scale-125 transition-transform duration-300" /> 
                          Ask AI for Company & Role Insights
                        </button>
                      ) : isAiLoading ? (
                        <div className="w-full py-10 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex flex-col items-center justify-center gap-4">
                          <Loader2 className="animate-spin text-indigo-500" size={32} />
                          <p className="text-sm font-bold text-slate-500">Analyzing company profile and matching requirements...</p>
                        </div>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                          className="bg-white border-2 border-indigo-100 rounded-[1.5rem] p-8 shadow-lg shadow-indigo-100/50 relative overflow-hidden"
                        >
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                          <h3 className="font-black text-indigo-950 text-lg flex items-center gap-2 mb-6">
                            <Bot size={24} className="text-indigo-600" /> AI Career Insights
                          </h3>
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Building2 size={14}/> Company Culture</h4>
                              <p className="text-slate-700 leading-relaxed font-medium">{aiInsights?.companyInfo}</p>
                            </div>
                            <div className="h-px w-full bg-slate-100"></div>
                            <div>
                              <h4 className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><CheckSquare size={14}/> Profile Match</h4>
                              <p className="text-slate-700 leading-relaxed font-medium">{aiInsights?.roleMatch}</p>
                            </div>
                            <div className="h-px w-full bg-slate-100"></div>
                            <div>
                              <h4 className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Sparkles size={14}/> Interview Prep Tips</h4>
                              <p className="text-slate-700 leading-relaxed font-medium">{aiInsights?.interviewTips}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <section>
                      <h3 className="text-base font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileText size={20} className="text-slate-400"/> Role Overview
                      </h3>
                      <p className="text-slate-700 leading-relaxed font-medium text-[15px]">
                        {selectedInternship.description}
                      </p>
                    </section>

                    <section>
                      <h3 className="text-base font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <CheckSquare size={20} className="text-slate-400"/> Key Responsibilities
                      </h3>
                      <ul className="space-y-4">
                        {selectedInternship.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-4 text-slate-700 font-medium text-[15px]">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0 shadow-sm"></span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-base font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Award size={20} className="text-slate-400"/> Requirements
                      </h3>
                      <ul className="space-y-4">
                        {selectedInternship.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-4 text-slate-700 font-medium text-[15px]">
                            <span className="w-2 h-2 rounded-full bg-slate-300 mt-2 shrink-0"></span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                    
                    <div className="pt-6 mt-6 border-t border-slate-100 text-sm font-bold text-slate-400 flex items-center gap-1.5">
                      <Clock size={16} /> Posted on {new Date(selectedInternship.postedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </motion.div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 bg-slate-50/50">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                  <Briefcase size={40} className="text-slate-300" />
                </div>
                <p className="text-2xl font-black text-slate-800">Select an opportunity</p>
                <p className="text-base mt-2 font-medium text-slate-500 max-w-sm text-center leading-relaxed">Click on any internship card on the left to view the full details, AI insights, and apply.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* JOB PREFERENCES MODAL */}
      <AnimatePresence>
        {showPreferencesModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] p-8 shadow-2xl max-w-md w-full relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Target className="text-indigo-600" /> Job Preferences
                </h2>
                <button onClick={() => setShowPreferencesModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2.5">Desired Role</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Software Developer, Data Analyst"
                    value={tempPreferences.role}
                    onChange={(e) => setTempPreferences({...tempPreferences, role: e.target.value})}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2.5">Preferred Location</label>
                  <select 
                    value={tempPreferences.location}
                    onChange={(e) => setTempPreferences({...tempPreferences, location: e.target.value})}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-800"
                  >
                    <option value="">Anywhere</option>
                    <option value="Remote">Remote</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2.5">Internship Type</label>
                  <select 
                    value={tempPreferences.type}
                    onChange={(e) => setTempPreferences({...tempPreferences, type: e.target.value})}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-800"
                  >
                    <option value="Full-time">Full-time Internship</option>
                    <option value="Part-time">Part-time Internship</option>
                    <option value="Flexible">Flexible Schedule</option>
                  </select>
                </div>
              </div>

              <div className="mt-10 flex gap-3">
                <button 
                  onClick={() => setShowPreferencesModal(false)}
                  className="flex-1 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSavePreferences}
                  className="flex-1 py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* APPLY MODAL */}
      <AnimatePresence>
        {showApplyModal && selectedInternship && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-2xl max-w-md w-full text-center relative overflow-hidden"
            >
              {applicationStatus === 'idle' && (
                <div className="space-y-8">
                  <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={32} className="ml-1" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-3">Submit Application</h2>
                    <p className="text-slate-500 text-base font-medium">You are applying for the <span className="font-bold text-slate-800">{selectedInternship.title}</span> role at <span className="font-bold text-slate-800">{selectedInternship.company}</span>.</p>
                  </div>
                  
                  <div className="bg-slate-50 p-5 rounded-2xl text-left border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Attaching Profile:</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">JD</div>
                      <div>
                        <p className="font-bold text-slate-900 text-base">John Doe</p>
                        <p className="text-sm font-medium text-slate-500">Software Engineering Student</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 pt-2">
                    <button 
                      onClick={closeApplyModal}
                      className="px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors w-full"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleApply}
                      className="px-6 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-md w-full"
                    >
                      Confirm Apply
                    </button>
                  </div>
                </div>
              )}

              {applicationStatus === 'submitting' && (
                <div className="flex flex-col items-center justify-center space-y-6 py-12">
                  <Loader2 size={56} className="animate-spin text-indigo-600" />
                  <p className="text-xl font-bold text-slate-800">Submitting securely...</p>
                </div>
              )}

              {applicationStatus === 'success' && (
                <div className="flex flex-col items-center justify-center space-y-5 py-10">
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">Success!</h2>
                  <p className="text-base text-slate-500 font-medium px-4">Your application has been sent to {selectedInternship.company}.</p>
                  <button 
                    onClick={closeApplyModal}
                    className="mt-8 w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-md"
                  >
                    Back to Portal
                  </button>
                </div>
              )}

              {applicationStatus === 'error' && (
                <div className="flex flex-col items-center justify-center space-y-5 py-10">
                  <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
                    <XCircle size={48} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">Oops!</h2>
                  <p className="text-base text-slate-500 font-medium">Something went wrong. Please try again later.</p>
                  <button 
                    onClick={closeApplyModal}
                    className="mt-8 w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}