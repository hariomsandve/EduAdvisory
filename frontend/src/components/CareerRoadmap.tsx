import { useState } from 'react';
import { 
  Map, ChevronRight, BookOpen, Award, Briefcase, 
  GraduationCap, Code, Stethoscope, Calculator, PenTool, 
  Globe, Shield, Database, Smartphone, Server, Cpu, 
  Layout, Terminal, Cloud, Lock, Anchor, Users, 
  TrendingUp, Building2, Gavel, FileText, Camera,
  Search, Brain, Monitor, Gamepad2, HardDrive, Wifi, 
  CheckSquare, Headset, Star, Flag, Target, Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CareerCategory = 
  | 'STEM & Technology' 
  | 'Medical & Healthcare' 
  | 'Business & Finance' 
  | 'Arts & Humanities' 
  | 'Creative & Design' 
  | 'Sports & Physical' 
  | 'Government & Civil Services' 
  | 'Vocational & Skilled' 
  | 'Green & Sustainability' 
  | 'Emerging & Specialized';

const getGenericSteps = (title: string) => [
  { id: '1', title: 'Foundations & Education', description: `Complete degrees and core concepts of ${title}.`, icon: BookOpen, duration: '3-4 Years' },
  { id: '2', title: 'Specialized Skills', description: 'Master advanced tools and industry standards.', icon: Code, duration: '6-12 Months' },
  { id: '3', title: 'Practical Experience', description: 'Build real-world projects or internships.', icon: Briefcase, duration: '6-12 Months' },
  { id: '4', title: 'Professional Career', description: 'Enter the industry as a certified professional.', icon: Award }
];

// Re-structured completely to match verbatim provided data
const sectorData = [
  {
    group: "STEM & Technology", title: "STEM & Technology Careers", icon: Cpu, color: "text-blue-600", bg: "bg-blue-50",
    degrees: ["BCA", "B.Sc Computer Science", "B.Tech (CSE, IT, AI, etc.)", "MCA", "M.Sc (AI/ML)", "B.Tech (Mechanical, Civil, Electrical, Robotics, Aerospace)"],
    options: ["Computer Science & IT", "Artificial Intelligence / Machine Learning", "Data Science & Analytics", "Cybersecurity", "Software / Web Development", "Mobile App Development", "Robotics & Automation", "Electronics & Communication", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Aerospace / Aviation Engineering", "Biotechnology / Bioinformatics", "Nanotechnology", "Space Science & Astronomy", "Gaming & Game Development"]
  },
  {
    group: "Medical & Healthcare", title: "Medical & Healthcare Careers", icon: Stethoscope, color: "text-red-500", bg: "bg-red-50",
    degrees: ["MBBS", "BDS", "BAMS", "BHMS", "BPT (Physiotherapy)", "B.Sc Nursing", "B.Pharm", "M.Pharm"],
    options: ["Doctor (MBBS, Specialist)", "Nursing", "Dentistry", "Pharmacy", "Physiotherapy", "Veterinary Science", "Public Health Expert", "Medical Researcher", "Healthcare Technology Specialist", "Nutritionist / Dietician", "Mental Health Counselor"]
  },
  {
    group: "Business, Management & Finance", title: "Business, Management & Finance", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50",
    degrees: ["BBA", "BMS", "MBA (Finance, HR, Marketing)", "B.Com", "CA", "CS", "CFA", "CMA"],
    options: ["Business Administration", "Finance & Accounting", "Chartered Accountant (CA)", "Company Secretary (CS)", "Economics / Data Economics", "Entrepreneurship / Startups", "Marketing & Sales", "Human Resource Management", "Supply Chain & Logistics", "International Business", "E-commerce / Digital Business"]
  },
  {
    group: "Arts, Humanities & Social Sciences", title: "Arts, Humanities & Social Sciences", icon: BookOpen, color: "text-orange-600", bg: "bg-orange-50",
    degrees: ["BA (History, Psychology, Sociology, Political Science)", "LLB / BA LLB / LLM", "B.Ed / M.Ed / D.El.Ed"],
    options: ["Psychology / Counseling", "Sociology / Social Work", "Political Science / Public Policy", "History / Archaeology", "Philosophy", "Languages & Literature", "Journalism / Mass Communication", "Law / Legal Studies", "Criminology / Forensic Science", "Anthropology", "Education & Teaching"]
  },
  {
    group: "Creative & Design Careers", title: "Creative & Design Careers", icon: PenTool, color: "text-pink-500", bg: "bg-pink-50",
    degrees: ["B.Des (Fashion, Graphic, Interior, UI/UX)", "BFA (Fine Arts)", "BPA (Performing Arts)"],
    options: ["Graphic Design", "UI/UX Design", "Fashion Design", "Interior Design", "Architecture", "Fine Arts (Painting, Sculpture)", "Photography / Cinematography", "Performing Arts (Music, Dance, Acting)", "Film & Media Production", "Content Writing / Blogging", "Animation & VFX", "Creative Advertising"]
  },
  {
    group: "Sports & Physical Careers", title: "Sports & Physical Careers", icon: Award, color: "text-yellow-600", bg: "bg-yellow-50",
    degrees: ["B.P.Ed", "Sports Management", "Coaching Diplomas"],
    options: ["Professional Athlete", "Fitness Trainer / Gym Instructor", "Sports Medicine Specialist", "Physical Education Teacher", "Coach", "Umpire / Referee", "Yoga Instructor", "Adventure Sports Guide", "Esports Player / Game Caster"]
  },
  {
    group: "Government & Civil Services", title: "Government & Civil Services", icon: Shield, color: "text-indigo-700", bg: "bg-indigo-50",
    degrees: ["Any degree (Arts, Science, Commerce)"],
    options: ["UPSC (IAS, IPS, IFS, IRS)", "State Civil Services", "Defense Services (Army, Navy, Air Force)", "Police Services", "Railway Services", "Public Sector Jobs (PSU, Banks)", "Teaching (Lecturer)", "Judiciary (Judge, Legal Officer)"]
  },
  {
    group: "Vocational & Skilled Careers", title: "Vocational & Skilled Careers", icon: Terminal, color: "text-gray-700", bg: "bg-gray-100",
    degrees: ["Diplomas in AI/ML, Data Science, Cybersecurity", "Digital Marketing Courses", "Film & Media Courses"],
    options: ["Electrician / Technician", "Plumbing & Carpentry", "Automotive Mechanic", "Hospitality & Tourism", "Culinary Arts / Chef", "Aviation Crew (Pilot, Cabin Crew)", "Fashion & Textile Work", "Event Management", "Beauty & Cosmetology"]
  },
  {
    group: "Green & Future-Oriented", title: "Green & Future-Oriented Careers", icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50",
    degrees: ["B.Sc (Environmental Science, Agriculture, Forestry)", "B.Tech in Renewable Energy"],
    options: ["Renewable Energy Engineering", "Environmental Science", "Sustainable Development", "Climate Change Specialist", "AgriTech", "Food Technology", "Forestry & Wildlife Conservation", "Oceanography / Marine Biology", "Urban Planning"]
  },
  {
    group: "Emerging & Specialized", title: "Emerging & Specialized Careers", icon: Star, color: "text-purple-600", bg: "bg-purple-50",
    degrees: ["Certifications / Diplomas (Blockchain, Cloud, Cyber Law)"],
    options: ["Digital Marketing & Content Strategy", "Cyber Law / Tech Policy", "Blockchain Developer", "Ethical Hacker", "Cloud Computing Specialist", "Foreign Languages & Translation", "NGO / Development Sector", "Archaeology & Museum Studies", "Astrology / Vedic Studies", "Tourism & Travel Planner", "Influencer / Social Media Creator"]
  }
];

const examsData = [
  {
    stage: 'Exams After Class 9',
    phase: '(Foundation Stage)',
    focus: 'Focus: Scholarships, Olympiads, Talent Search',
    color: 'from-blue-400 to-indigo-500',
    icon: Target,
    categories: [
      { name: 'Talent Search Exams', exams: ['NTSE (National Talent Search Examination)', 'NSTSE (National Level Science Talent Search Exam)', 'KVPY (Junior Stream)', 'Other Talent Search Exams'] },
      { name: 'Olympiads', exams: ['SOF Olympiads (Science, Math, English, etc.)'] },
      { name: 'Scholarships & Competitions', exams: ['State Scholarship Exams', 'Homi Bhabha Competition', 'Dr. Homi Bhabha Exam'] }
    ]
  },
  {
    stage: 'Exams After Class 10',
    phase: '(Career Direction Stage)',
    focus: 'Focus: Stream selection + early career entry',
    color: 'from-orange-400 to-red-500',
    icon: Flag,
    categories: [
      { name: 'Technical / Diploma Path', exams: ['Polytechnic Entrance Exams', 'ITI Entrance Exams'] },
      { name: 'Defence', exams: ['NDA (you can start applying after 10th, exam after 12th)'] },
      { name: 'Talent & Olympiads', exams: ['NTSE', 'KVPY (SA Stream)', 'Science Olympiads', 'Other Talent Search Exams'] },
      { name: 'Other Competitions', exams: ['Pariksha Pe Charcha'] }
    ]
  },
  {
    stage: 'Exams After Class 12',
    phase: '(Major Career Gateways)',
    focus: 'Focus: This is the MOST IMPORTANT stage 🔥',
    color: 'from-green-500 to-emerald-600',
    icon: Award,
    categories: [
      { name: 'Engineering Exams', exams: ['JEE Main & Advanced', 'BITSAT', 'VITEEE', 'SRMJEEE', 'MET (Manipal)', 'State CETs'] },
      { name: 'Medical Exams', exams: ['NEET-UG', 'AIIMS Nursing', 'JIPMER Nursing', 'AFMC Pune MBBS'] },
      { name: 'Defence Exams', exams: ['NDA & NA', 'Indian Navy B.Tech Entry', 'Indian Army TES'] },
      { name: 'Law Exams', exams: ['CLAT', 'AILET', 'LSAT–India'] },
      { name: 'Management / Business', exams: ['IPMAT', 'CUET (for BBA, BMS, etc.)', 'DU JAT (via CUET)'] },
      { name: 'Design & Architecture', exams: ['NATA (Architecture)', 'UCEED (Design)', 'NID DAT (Design)'] },
      { name: 'Hotel Management', exams: ['NCHM JEE', 'IIHM eCHAT'] },
      { name: 'Agriculture', exams: ['ICAR AIEEA'] },
      { name: 'Abroad Pathway', exams: ['SAT', 'ACT', 'IELTS / TOEFL'] }
    ]
  }
];

export default function CareerRoadmap() {
  const [mainTab, setMainTab] = useState<'careers' | 'degrees' | 'exams'>('degrees');
  const [selectedPath, setSelectedPath] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState<CareerCategory | 'All'>('All');

  const careerPaths = [
    // 1. STEM & TECHNOLOGY
    { id: 'cs-it', title: 'Computer Science & IT', group: 'STEM & Technology', icon: Server, color: 'bg-blue-600', description: 'Core computer science and networking.', salary: '₹4L - ₹20L', growth: 'High', steps: getGenericSteps('Computer Science & IT') },
    { id: 'ai-ml', title: 'Artificial Intelligence / ML', group: 'STEM & Technology', icon: Brain, color: 'bg-purple-600', description: 'Build predictive models and algorithms.', salary: '₹10L - ₹40L', growth: 'Explosive', steps: getGenericSteps('Artificial Intelligence') },
    { id: 'software-dev', title: 'Software Development', group: 'STEM & Technology', icon: Code, color: 'bg-blue-500', description: 'Design and build applications.', salary: '₹6L - ₹25L', growth: 'High', steps: getGenericSteps('Software Development') },
    
    // 2. MEDICAL & HEALTHCARE
    { id: 'doctor', title: 'Doctor / Medical Specialist', group: 'Medical & Healthcare', icon: Stethoscope, color: 'bg-red-500', description: 'Diagnose and treat medical conditions (MBBS/MD).', salary: '₹8L - ₹30L+', growth: 'High', steps: getGenericSteps('Medical Practice') },
    { id: 'nursing', title: 'Nursing', group: 'Medical & Healthcare', icon: Users, color: 'bg-pink-500', description: 'Provide critical patient care in hospitals.', salary: '₹3L - ₹10L', growth: 'Stable', steps: getGenericSteps('Nursing') },
    
    // 3. BUSINESS, MANAGEMENT & FINANCE
    { id: 'business-admin', title: 'Business Administration', group: 'Business & Finance', icon: Briefcase, color: 'bg-amber-600', description: 'Manage corporate operations and strategies.', salary: '₹6L - ₹35L+', growth: 'High', steps: getGenericSteps('Business Administration') },
    { id: 'ca', title: 'Chartered Accountant', group: 'Business & Finance', icon: FileText, color: 'bg-emerald-700', description: 'Certified expert in auditing, taxation, and accounting.', salary: '₹8L - ₹25L', growth: 'High', steps: getGenericSteps('Chartered Accountancy') },
    
    // 4. ARTS, HUMANITIES
    { id: 'psychology', title: 'Psychology / Counseling', group: 'Arts & Humanities', icon: Brain, color: 'bg-fuchsia-600', description: 'Study human behavior and provide clinical support.', salary: '₹4L - ₹18L', growth: 'Very High', steps: getGenericSteps('Psychology') },
    { id: 'law', title: 'Law / Legal Studies', group: 'Arts & Humanities', icon: Gavel, color: 'bg-stone-700', description: 'Practice law, corporate advisory, or judiciary.', salary: '₹5L - ₹30L+', growth: 'Moderate', steps: getGenericSteps('Law') },
    
    // 5. CREATIVE & DESIGN
    { id: 'ui-ux', title: 'UI / UX Design', group: 'Creative & Design', icon: Layout, color: 'bg-purple-600', description: 'Design user-friendly digital interfaces and experiences.', salary: '₹6L - ₹25L', growth: 'Very High', steps: getGenericSteps('UI/UX Design') }
  ];

  const groups: (CareerCategory | 'All')[] = [
    'All', 'STEM & Technology', 'Medical & Healthcare', 'Business & Finance', 
    'Arts & Humanities', 'Creative & Design', 'Sports & Physical', 
    'Government & Civil Services', 'Vocational & Skilled', 
    'Green & Sustainability', 'Emerging & Specialized'
  ];

  const filteredPaths = careerPaths.filter(path => 
    (activeGroup === 'All' || path.group === activeGroup) &&
    path.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10 px-4 mt-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-gradient-to-r from-orange-500 to-green-600 p-8 rounded-3xl text-white shadow-xl shadow-orange-500/20">
        <div>
          <h1 className="text-3xl md:text-4xl font-black flex items-center gap-3">
            <Navigation /> Explore Other Courses
          </h1>
          <p className="text-white/90 mt-2 font-medium">Discover Sectors, Common Degrees, Outcomes, and Milestone Exams.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search degrees or exams..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white text-gray-900 rounded-2xl focus:ring-4 focus:ring-white/30 outline-none shadow-inner font-bold placeholder-gray-400"
          />
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex bg-gray-100/50 backdrop-blur-sm p-1.5 rounded-2xl max-w-2xl mx-auto shadow-sm border border-gray-200">
        <button 
          className={`flex-1 py-3 px-4 rounded-[14px] text-sm md:text-base font-bold transition-all flex justify-center items-center gap-2 ${mainTab === 'degrees' ? 'bg-white shadow flex-1 text-green-600' : 'text-gray-500 hover:text-gray-700'}`} 
          onClick={() => setMainTab('degrees')}
        >
          <GraduationCap size={18} /> Sectors & Degrees
        </button>
        <button 
          className={`flex-1 py-3 px-4 rounded-[14px] text-sm md:text-base font-bold transition-all flex justify-center items-center gap-2 ${mainTab === 'exams' ? 'bg-white shadow flex-1 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} 
          onClick={() => setMainTab('exams')}
        >
          <FileText size={18} /> Milestone Exams
        </button>
        <button 
          className={`flex-1 py-3 px-4 rounded-[14px] text-sm md:text-base font-bold transition-all flex justify-center items-center gap-2 ${mainTab === 'careers' ? 'bg-white shadow flex-1 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`} 
          onClick={() => { setMainTab('careers'); setSelectedPath(null); }}
        >
          <Briefcase size={18} /> Detailed Steps
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* ======================= */}
        {/* TAB 1: SECTORS & DEGREES */}
        {/* ======================= */}
        {mainTab === 'degrees' && (
          <motion.div key="degrees" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 space-y-0">
               {sectorData.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.degrees.some(deg => deg.toLowerCase().includes(searchQuery.toLowerCase()))).map((category, idx) => {
                 const Icon = category.icon;
                 return (
                 <div key={idx} className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-50 transition-colors z-0"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${category.bg} ${category.color} shadow-sm border border-white`}>
                            <Icon size={28} />
                         </div>
                         <div>
                           <h3 className="text-xl font-black text-gray-900 leading-tight">{category.title}</h3>
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{category.group}</p>
                         </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Degrees Column */}
                        <div className="space-y-4">
                           <p className="text-xs font-bold uppercase text-indigo-500 tracking-wider flex items-center gap-2">
                             <GraduationCap size={16} /> Common Degrees
                           </p>
                           <ul className="space-y-3">
                             {category.degrees.map((deg, i) => (
                               <li key={i} className="flex items-start gap-3">
                                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                                 <span className="text-sm font-bold text-gray-700 leading-snug">{deg}</span>
                               </li>
                             ))}
                           </ul>
                        </div>

                        {/* Career Options Column */}
                        <div className="space-y-4">
                           <p className="text-xs font-bold uppercase text-orange-500 tracking-wider flex items-center gap-2">
                             <TrendingUp size={16} /> Career Options
                           </p>
                           <ul className="space-y-3">
                             {category.options.map((opt, i) => (
                               <li key={i} className="flex items-start gap-3">
                                 <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                                 <span className="text-sm font-medium text-gray-600 leading-snug">{opt}</span>
                               </li>
                             ))}
                           </ul>
                        </div>
                      </div>
                    </div>
                 </div>
               )})}
            </div>
          </motion.div>
        )}

        {/* ======================= */}
        {/* TAB 2: MILESTONE EXAMS  */}
        {/* ======================= */}
        {mainTab === 'exams' && (
          <motion.div key="exams" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
            {examsData.filter(d => d.stage.toLowerCase().includes(searchQuery.toLowerCase()) || d.categories.some(c => c.exams.some(e => e.toLowerCase().includes(searchQuery.toLowerCase())))).map((stageInfo, idx) => {
              const StageIcon = stageInfo.icon;
              return (
              <div key={idx} className="bg-white rounded-[32px] border border-gray-200 overflow-hidden shadow-sm">
                 {/* Stage Header */}
                 <div className={`bg-gradient-to-r ${stageInfo.color} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] mix-blend-screen z-0 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 flex items-center gap-4">
                       <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-inner">
                          <StageIcon size={32} />
                       </div>
                       <div>
                          <h2 className="text-2xl md:text-3xl font-black flex flex-col md:flex-row md:items-center gap-2">
                             {stageInfo.stage}
                             <span className="font-bold opacity-90 text-lg md:text-2xl">{stageInfo.phase}</span>
                          </h2>
                          <div className="mt-2 font-medium opacity-100 flex items-center gap-2 bg-black/20 px-4 py-1.5 rounded-xl w-fit">
                             <span className="text-sm">{stageInfo.focus}</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Exam Categories mapping */}
                 <div className="p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50/20">
                    {stageInfo.categories.map((cat, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
                         <h4 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                           <Shield size={18} className="text-blue-500" /> {cat.name}
                         </h4>
                         <ul className="space-y-3">
                           {cat.exams.map((exam, j) => (
                             <li key={j} className="flex gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 items-center">
                               <CheckSquare size={16} className="text-green-500 shrink-0" />
                               <span className="text-sm font-bold text-gray-700 leading-snug">{exam}</span>
                             </li>
                           ))}
                         </ul>
                      </div>
                    ))}
                 </div>
              </div>
            )})}
          </motion.div>
        )}

        {/* ======================= */}
        {/* TAB 3: CAREERS EXAMPLES */}
        {/* ======================= */}
        {mainTab === 'careers' && !selectedPath && (
          <motion.div key="careers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredPaths.map((path) => (
                <motion.div
                  key={path.id}
                  whileHover={{ y: -4, boxShadow: "0px 10px 20px rgba(0,0,0,0.05)" }}
                  onClick={() => setSelectedPath(path)}
                  className="bg-white rounded-[20px] p-5 border border-gray-200 shadow-sm hover:border-orange-300 transition-all cursor-pointer group flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 ${path.color} shadow-sm group-hover:scale-110 transition-transform`}>
                      <path.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">{path.title}</h3>
                      <p className="text-xs text-gray-400 font-bold uppercase mt-1">{path.group}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ROADMAP DETAIL VIEW     */}
        {mainTab === 'careers' && selectedPath && (
          <motion.div key="roadmap-detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
             <button onClick={() => setSelectedPath(null)} className="mb-6 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm">
                <ChevronRight size={18} className="rotate-180" /> Back to List
             </button>
             <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-gray-100 shadow-gray-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-[80px] -z-10 -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="flex items-center gap-6 mb-12">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white ${selectedPath.color} shadow-lg shadow-${selectedPath.color.split('-')[1]}-500/30`}>
                    <selectedPath.icon size={40} />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{selectedPath.title}</h2>
                    <p className="text-gray-500 mt-2 text-lg font-medium">{selectedPath.description}</p>
                  </div>
                </div>

                <div className="relative pl-8 md:pl-0">
                  <div className="absolute left-[39px] md:left-[59px] top-6 bottom-6 w-1 bg-gray-100 rounded-full"></div>
                  <div className="space-y-10">
                    {selectedPath.steps.map((step: any, index: number) => (
                      <div key={step.id} className="relative flex gap-8 group md:ml-[34px]">
                        <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-4 border-gray-50 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${selectedPath.color} flex items-center justify-center text-white shadow-inner`}>
                            <step.icon size={18} />
                          </div>
                        </div>
                        <div className="flex-1 bg-white border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-md hover:border-orange-200 transition-all">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                          </div>
                          <p className="text-gray-600 font-medium">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}