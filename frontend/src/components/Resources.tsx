import { useState } from 'react';
import { 
  Book, Video, FileText, Wrench, Search, Filter, ExternalLink, 
  Download, PlayCircle, CheckCircle, Star, Clock, ChevronRight,
  Library, GraduationCap, Lightbulb, Target, ChevronDown, DownloadCloud, X,
  BrainCircuit, MonitorPlay
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResourceItem {
  id: string;
  title: string;
  category: 'book' | 'video' | 'test' | 'tool';
  description: string;
  provider: string;
  link: string;
  tags: string[];
  rating?: number;
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  targetLevels: string[]; 
  contentNotes?: string; // Field to hold detailed notes for the modal
  downloadContent?: string; // Field to hold actual downloadable file content
  downloadFileName?: string; // File name for the download
}

const mockResources: ResourceItem[] = [
  // --- INTEGRATED USER CONTENT GUIDES ---
  {
    id: 'guide-1',
    title: 'Scholarships, Olympiads & Talent Search Guide',
    category: 'book',
    description: 'A complete guide to talent search exams, olympiads, and scholarship competitions for students planning their future.',
    provider: 'EduParent Resources',
    link: '#',
    tags: ['Scholarships', 'Olympiads', 'NTSE'],
    difficulty: 'Beginner',
    targetLevels: ['10th', '12th'],
    contentNotes: `👉 Focus: Scholarships, Olympiads, Talent Search

🧠 Talent Search Exams
• NTSE (National Talent Search Examination)
• NSTSE (National Level Science Talent Search Exam)
• KVPY (Junior Stream)
• Other Talent Search Exams

🏆 Olympiads
• SOF Olympiads (Science, Math, English, etc.)

🎓 Scholarships & Competitions
• State Scholarship Exams
• Homi Bhabha Competition
• Dr. Homi Bhabha Exam

📘 Exams After Class 10 (Career Direction Stage)
👉 Focus: Stream selection + early career entry

🛠️ Technical / Diploma Path
• Polytechnic Entrance Exams
• ITI Entrance Exams

🪖 Defence
• NDA (you can start applying after 10th, exam after 12th)

🧠 Talent & Olympiads
• NTSE
• KVPY (SA Stream)
• Science Olympiads
• Other Talent Search Exams`
  },
  {
    id: 'guide-2',
    title: 'Careers & Degrees: STEM, Tech & Healthcare',
    category: 'book',
    description: 'Comprehensive organized list of degrees and career options in Technology, Engineering, and Medical sciences.',
    provider: 'EduParent Resources',
    link: '#',
    tags: ['STEM', 'Medical', 'Engineering'],
    difficulty: 'Beginner',
    targetLevels: ['10th', '12th', 'Undergraduate'],
    contentNotes: `💻 1. STEM & Technology Careers
📚 Common Degrees:
• BCA / MCA
• B.Sc Computer Science
• B.Tech (CSE, IT, AI, Mechanical, Civil, Electrical, Robotics, Aerospace)
• M.Sc (AI/ML)

🚀 Career Options:
• Computer Science & IT
• Artificial Intelligence / Machine Learning
• Data Science & Analytics
• Cybersecurity
• Software / Web / Mobile App Development
• Robotics & Automation
• Electronics & Communication
• Engineering (Mechanical, Civil, Electrical, Aerospace/Aviation)
• Biotechnology / Bioinformatics / Nanotechnology
• Space Science & Astronomy
• Gaming & Game Development

🏥 2. Medical & Healthcare Careers
📚 Common Degrees:
• MBBS, BDS, BAMS, BHMS
• BPT (Physiotherapy)
• B.Sc Nursing
• B.Pharm, M.Pharm

🩺 Career Options:
• Doctor (MBBS, Specialist)
• Nursing, Dentistry, Pharmacy, Physiotherapy
• Veterinary Science
• Public Health Expert, Medical Researcher
• Healthcare Technology Specialist
• Nutritionist / Dietician
• Mental Health Counselor`,
    // ADDED DOWNLOAD CONTENT EXTRACTED FROM PDF
    downloadFileName: 'technology_engineering_medical_careers_guide.txt',
    downloadContent: `Comprehensive Guide to Degrees and Career Options
in Technology, Engineering, and Medical Sciences

This document provides an organized overview of major academic degrees, key concepts, and career
opportunities across three major fields: Technology, Engineering, and Medical Sciences.

1. Technology

Core Concept:
Technology focuses on computing systems, software development, data, artificial intelligence,
cybersecurity, and digital infrastructure used to solve real-world problems.

Popular Degrees:
- Computer Science (BSc/B.Tech/BS/MS/PhD)
- Information Technology (IT)
- Software Engineering
- Data Science and Analytics
- Artificial Intelligence & Machine Learning
- Cybersecurity / Information Security
- Cloud Computing
- Human-Computer Interaction (HCI)
- Game Development
- Blockchain Technology

Career Options:
- Software Developer / Engineer
- Data Scientist
- AI / Machine Learning Engineer
- Cybersecurity Analyst
- Cloud Architect
- DevOps Engineer
- Mobile App Developer
- Game Developer
- Blockchain Developer
- UI/UX Designer

2. Engineering

Core Concept:
Engineering applies scientific and mathematical principles to design, build, and improve machines,
infrastructure, systems, and processes.

Popular Degrees:
- Mechanical Engineering
- Civil Engineering
- Electrical Engineering
- Electronics and Communication Engineering
- Computer Engineering
- Aerospace Engineering
- Chemical Engineering
- Biomedical Engineering
- Environmental Engineering
- Industrial Engineering
- Robotics Engineering
- Mechatronics Engineering

Career Options:
- Mechanical Design Engineer
- Civil Structural Engineer
- Electrical Power Engineer
- Robotics Engineer
- Aerospace Engineer
- Automotive Engineer
- Industrial Process Engineer
- Renewable Energy Engineer
- Construction Project Manager
- Research and Development Engineer

3. Medical Sciences

Core Concept:
Medical sciences focus on human health, disease diagnosis, treatment, research, and healthcare
technologies.

Popular Degrees:
- MBBS (Bachelor of Medicine, Bachelor of Surgery)
- BDS (Dental Surgery)
- BAMS (Ayurvedic Medicine)
- BHMS (Homeopathic Medicine)
- BPT (Physiotherapy)
- BSc Nursing
- Pharmacy (BPharm / MPharm / PharmD)
- Biomedical Science
- Public Health
- Medical Laboratory Technology

Career Options:
- Doctor / Physician
- Dentist
- Surgeon
- Pharmacist
- Physiotherapist
- Nurse
- Medical Research Scientist
- Clinical Laboratory Technologist
- Public Health Specialist
- Hospital Administrator

Conclusion
Technology, Engineering, and Medical Sciences offer diverse academic pathways and career
opportunities. Choosing the right field depends on interests in problem solving, innovation, healthcare, or
scientific research.`
  },
  {
    id: 'guide-3',
    title: 'Careers & Degrees: Business, Arts & Design',
    category: 'book',
    description: 'Explore opportunities in Business Management, Humanities, Fine Arts, and Creative Design.',
    provider: 'EduParent Resources',
    link: '#',
    tags: ['Commerce', 'Arts', 'Design'],
    difficulty: 'Beginner',
    targetLevels: ['10th', '12th', 'Undergraduate'],
    contentNotes: `💼 3. Business, Management & Finance
📚 Common Degrees: BBA, BMS, MBA (Finance, HR, Marketing), B.Com, CA, CS, CFA, CMA
📊 Career Options:
• Business Administration, Finance & Accounting
• Chartered Accountant (CA), Company Secretary (CS)
• Economics / Data Economics
• Entrepreneurship / Startups
• Marketing & Sales, Human Resource Management
• Supply Chain & Logistics, International Business
• E-commerce / Digital Business

📚 4. Arts, Humanities & Social Sciences
📚 Common Degrees: BA (History, Psychology, Sociology, Political Science), LLB / BA LLB / LLM, B.Ed / M.Ed / D.El.Ed
🧠 Career Options:
• Psychology / Counseling, Sociology / Social Work
• Political Science / Public Policy, History / Archaeology, Philosophy
• Languages & Literature, Journalism / Mass Communication
• Law / Legal Studies, Criminology / Forensic Science
• Anthropology, Education & Teaching

🎨 5. Creative & Design Careers
📚 Common Degrees: B.Des (Fashion, Graphic, Interior, UI/UX), BFA (Fine Arts), BPA (Performing Arts)
🎭 Career Options:
• Graphic Design, UI/UX Design, Fashion Design, Interior Design
• Architecture, Fine Arts (Painting, Sculpture)
• Photography / Cinematography
• Performing Arts (Music, Dance, Acting), Film & Media Production
• Content Writing / Blogging, Animation & VFX, Creative Advertising`
  },
  {
    id: 'guide-4',
    title: 'Careers & Degrees: Govt, Sports & Emerging Fields',
    category: 'book',
    description: 'Discover careers in Civil Services, Sports, Vocational skills, and Future-oriented green technologies.',
    provider: 'EduParent Resources',
    link: '#',
    tags: ['Govt', 'Sports', 'Emerging Careers'],
    difficulty: 'Beginner',
    targetLevels: ['10th', '12th', 'Undergraduate', 'Postgraduate'],
    contentNotes: `🏃 6. Sports & Physical Careers
📚 Degrees: B.P.Ed, Sports Management, Coaching Diplomas
⚽ Careers: Professional Athlete, Fitness Trainer / Gym Instructor, Sports Medicine Specialist, Physical Education Teacher, Coach, Umpire / Referee, Yoga Instructor, Adventure Sports Guide, Esports Player.

🏛️ 7. Government & Civil Services
📚 Degrees: Any degree (Arts, Science, Commerce)
🇮🇳 Careers: UPSC (IAS, IPS, IFS, IRS), State Civil Services, Defense Services (Army, Navy, Air Force), Police Services, Railway Services, Public Sector Jobs (PSU, Banks), Teaching (Lecturer), Judiciary (Judge).

🔧 8. Vocational & Skilled Careers
📚 Degrees: Diplomas in AI/ML, Digital Marketing, Film & Media
🛠️ Careers: Electrician / Technician, Plumbing & Carpentry, Automotive Mechanic, Hospitality & Tourism, Culinary Arts / Chef, Aviation Crew (Pilot, Cabin Crew), Fashion & Textile Work, Event Management, Beauty & Cosmetology.

🌱 9. Green & Future-Oriented Careers
📚 Degrees: B.Sc (Environmental Science, Agriculture, Forestry), B.Tech in Renewable Energy
🌍 Careers: Renewable Energy Engineering, Environmental Science, Sustainable Development, Climate Change Specialist, AgriTech, Food Technology, Forestry & Wildlife Conservation, Oceanography / Marine Biology, Urban Planning.

🌐 10. Emerging & Specialized Careers
📚 Degrees: Certifications / Diplomas (Blockchain, Cloud, Cyber Law)
🚀 Careers: Digital Marketing & Content Strategy, Cyber Law / Tech Policy, Blockchain Developer, Ethical Hacker, Cloud Computing Specialist, Foreign Languages & Translation, NGO / Development Sector, Archaeology & Museum Studies, Astrology / Vedic Studies, Tourism & Travel Planner, Influencer / Social Media Creator.`
  },

  // --- 10th Grade Resources ---
  {
    id: '10-1',
    title: 'NCERT Class 10 Mathematics Solutions',
    category: 'book',
    description: 'Complete step-by-step solutions for Class 10 Math board exams, covering algebra, geometry, and trigonometry.',
    provider: 'CBSE Board Prep',
    link: '#',
    tags: ['Math', 'Board Exams', 'NCERT'],
    rating: 4.9,
    difficulty: 'Beginner',
    targetLevels: ['10th']
  },
  {
    id: '10-2',
    title: 'Class 10 Science - Full Physics Mock Test',
    category: 'test',
    description: 'Test your readiness for the upcoming board exams with this full-length physics mock paper.',
    provider: 'EduLearn Test Series',
    link: '#',
    tags: ['Physics', 'Mock Test'],
    duration: '90 mins',
    difficulty: 'Intermediate',
    targetLevels: ['10th']
  },

  // --- 12th Grade Resources ---
  {
    id: '12-1',
    title: 'JEE Advanced Physics Masterclass',
    category: 'video',
    description: 'Deep dive into mechanics, electromagnetism, and modern physics for engineering entrance exams.',
    provider: 'Physics Wallah',
    link: '#',
    tags: ['JEE', 'Physics', 'Engineering'],
    duration: '45 hours',
    rating: 4.9,
    difficulty: 'Advanced',
    targetLevels: ['12th']
  },
  {
    id: '12-2',
    title: '12th Commerce: Accountancy Crash Course',
    category: 'book',
    description: 'Quick revision notes and ledger formats for Class 12 Accountancy board exams.',
    provider: 'Commerce Academy',
    link: '#',
    tags: ['Commerce', 'Accounts'],
    rating: 4.6,
    difficulty: 'Intermediate',
    targetLevels: ['12th']
  },

  // --- Undergraduate Resources ---
  {
    id: 'u-1',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    category: 'book',
    description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees.',
    provider: 'Robert C. Martin',
    link: 'https://example.com/clean-code',
    tags: ['Programming', 'Best Practices'],
    rating: 4.8,
    difficulty: 'Intermediate',
    targetLevels: ['Undergraduate', 'Postgraduate']
  },
  {
    id: 'u-2',
    title: 'React Course For Beginners - Learn React.js from Scratch',
    category: 'video',
    description: 'Learn React.js from scratch in this full course. We will build a project and learn all the core concepts.',
    provider: 'FreeCodeCamp',
    link: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    tags: ['Frontend', 'React', 'Web Dev'],
    duration: '10:45:00',
    difficulty: 'Beginner',
    targetLevels: ['Undergraduate']
  },
  {
    id: 'u-3',
    title: 'LeetCode - Leading Online Programming Platform',
    category: 'tool',
    description: 'Level up your coding skills and quickly land a job. This is the best place to expand your knowledge.',
    provider: 'LeetCode',
    link: 'https://leetcode.com',
    tags: ['Coding', 'Interview Prep'],
    difficulty: 'Advanced',
    targetLevels: ['Undergraduate', 'Postgraduate']
  },

  // --- Postgraduate Resources ---
  {
    id: 'p-1',
    title: 'Machine Learning Specialization',
    category: 'video',
    description: 'A foundational online program created in collaboration between DeepLearning.AI and Stanford Online.',
    provider: 'Andrew Ng',
    link: 'https://www.youtube.com/playlist?list=PLkDaE6sCZn6Ec-XTbcX1uRg2_u4xOEKy0',
    tags: ['AI', 'Machine Learning', 'Data Science'],
    duration: '40+ hours',
    difficulty: 'Intermediate',
    targetLevels: ['Undergraduate', 'Postgraduate']
  },
  {
    id: 'p-2',
    title: 'Research Methodology Fundamentals',
    category: 'book',
    description: 'A comprehensive guide to qualitative and quantitative research methods for master\'s and PhD candidates.',
    provider: 'Dr. Sarah Jennings',
    link: '#',
    tags: ['Research', 'Thesis', 'Academic'],
    rating: 4.7,
    difficulty: 'Advanced',
    targetLevels: ['Postgraduate']
  },
  {
    id: 'p-3',
    title: 'Advanced Data Structures & System Design',
    category: 'test',
    description: 'Evaluate your readiness for MAANG technical interviews with this intensive system design mock exam.',
    provider: 'TechInterviews Pro',
    link: '#',
    tags: ['System Design', 'Algorithms'],
    duration: '120 mins',
    difficulty: 'Advanced',
    targetLevels: ['Postgraduate']
  },

  // --- General / All Levels ---
  {
    id: 'g-1',
    title: 'Thinking, Fast and Slow',
    category: 'book',
    description: 'A world-class psychologist and winner of the Nobel Prize in Economics takes us on a groundbreaking tour of the mind.',
    provider: 'Daniel Kahneman',
    link: 'https://example.com/thinking-fast',
    tags: ['Psychology', 'Decision Making'],
    rating: 4.7,
    difficulty: 'Beginner',
    targetLevels: ['10th', '12th', 'Undergraduate', 'Postgraduate']
  },
  {
    id: 'g-2',
    title: 'Notion - All-in-one Workspace',
    category: 'tool',
    description: 'A workspace that adapts to your needs. Write, plan, collaborate, and get organized.',
    provider: 'Notion Labs',
    link: 'https://notion.so',
    tags: ['Productivity', 'Organization'],
    difficulty: 'Beginner',
    targetLevels: ['10th', '12th', 'Undergraduate', 'Postgraduate']
  }
];

export default function Resources() {
  const [activeTab, setActiveTab] = useState<'all' | 'book' | 'video' | 'test' | 'tool'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLevel, setActiveLevel] = useState<string>('All');
  
  // State for handling the resource details modal
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  const filteredResources = mockResources.filter(res => {
    const matchesTab = activeTab === 'all' || res.category === activeTab;
    const matchesLevel = activeLevel === 'All' || res.targetLevels.includes(activeLevel);
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesLevel && matchesSearch;
  });

  const tabs = [
    { id: 'all', label: 'All Resources', icon: Library },
    { id: 'book', label: 'Books Library', icon: Book },
    { id: 'video', label: 'Learning Videos', icon: Video },
    { id: 'test', label: 'Mock Tests', icon: FileText },
    { id: 'tool', label: 'Self-Improvement', icon: Target },
  ];

  const educationLevels = ['All', '10th', '12th', 'Undergraduate', 'Postgraduate'];

  // Helper functions for SVG styling
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'book': return <Book size={48} className="text-white opacity-90" />;
      case 'video': return <PlayCircle size={48} className="text-white opacity-90" />;
      case 'test': return <BrainCircuit size={48} className="text-white opacity-90" />;
      case 'tool': return <Wrench size={48} className="text-white opacity-90" />;
      default: return <Library size={48} className="text-white opacity-90" />;
    }
  };

  const getCategoryGradient = (category: string) => {
    switch(category) {
      case 'book': return 'from-blue-500 to-indigo-600';
      case 'video': return 'from-red-500 to-rose-600';
      case 'test': return 'from-green-500 to-emerald-600';
      case 'tool': return 'from-purple-500 to-fuchsia-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  // Function to handle downloading content as a file
  const handleDownload = (resource: ResourceItem) => {
    if (resource.downloadContent) {
      // Create a blob with the text content
      const blob = new Blob([resource.downloadContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', resource.downloadFileName || `${resource.title.replace(/\s+/g, '_')}.txt`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      alert(`Downloading PDF for ${resource.title}...`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 font-sans relative">
      
      {/* Resource Details Modal */}
      <AnimatePresence>
        {selectedResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedResource(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-3xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedResource(null)} 
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full z-20 transition-colors"
              >
                <X size={20} />
              </button>
              
              {/* Modal Banner */}
              <div className={`shrink-0 p-8 w-full bg-gradient-to-br ${getCategoryGradient(selectedResource.category)} flex items-center gap-6 relative overflow-hidden`}>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
                  {getCategoryIcon(selectedResource.category)}
                </div>
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                  {getCategoryIcon(selectedResource.category)}
                </div>
                <div className="text-white z-10">
                  <span className="uppercase text-xs font-black tracking-widest opacity-80 mb-1 block">
                    {selectedResource.category} Resource
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">{selectedResource.title}</h2>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-8 overflow-y-auto flex-1 space-y-8">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {selectedResource.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {selectedResource.rating && (
                      <div className="flex items-center gap-1.5 text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-lg font-bold text-sm">
                        <Star size={16} className="fill-current" /> {selectedResource.rating} / 5.0
                      </div>
                    )}
                    {selectedResource.difficulty && (
                      <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg font-bold text-sm border border-gray-200">
                        <Target size={16} /> {selectedResource.difficulty}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Description</h4>
                  <p className="text-gray-700 text-lg leading-relaxed">{selectedResource.description}</p>
                </div>

                {/* Detailed Notes Section */}
                {selectedResource.contentNotes && (
                  <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <FileText size={18} /> Detailed Content Notes
                    </h4>
                    <div className="text-[15px] text-gray-800 whitespace-pre-line leading-relaxed font-medium">
                      {selectedResource.contentNotes}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                   <div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Provided By</p>
                     <p className="font-bold text-gray-900">{selectedResource.provider}</p>
                   </div>
                   <div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Target Audience</p>
                     <p className="font-bold text-gray-900">{selectedResource.targetLevels.join(', ')}</p>
                   </div>
                </div>
              </div>
              
              {/* Modal Footer Actions */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-4 shrink-0">
                <button onClick={() => setSelectedResource(null)} className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                  Close
                </button>
                
                {selectedResource.category === 'book' && (
                  <button 
                    onClick={() => handleDownload(selectedResource)} 
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all"
                  >
                    <DownloadCloud size={18} /> {selectedResource.downloadContent ? 'Download Guide' : 'Download PDF'}
                  </button>
                )}
                {selectedResource.category === 'video' && (
                  <a href={selectedResource.link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-red-700 shadow-md shadow-red-600/20 transition-all">
                    <MonitorPlay size={18} /> Watch Video
                  </a>
                )}
                {selectedResource.category === 'test' && (
                  <button onClick={() => alert('Starting Mock Test...')} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all">
                    <CheckCircle size={18} /> Start Test Now
                  </button>
                )}
                {selectedResource.category === 'tool' && (
                  <a href={selectedResource.link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-purple-700 shadow-md shadow-purple-600/20 transition-all">
                    <ExternalLink size={18} /> Visit Website
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Resource Center</h1>
          <p className="text-gray-500 mt-2">Everything you need to accelerate your learning journey.</p>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Education Level Dropdown */}
          <div className="relative w-full sm:w-48">
            <select
              value={activeLevel}
              onChange={(e) => setActiveLevel(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold text-gray-700 cursor-pointer"
            >
              {educationLevels.map(level => (
                <option key={level} value={level}>
                  {level === 'All' ? 'All Education Levels' : `${level} Level`}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search books, videos, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredResources.map((res) => (
            <motion.div
              layout
              key={res.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedResource(res)}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col group cursor-pointer"
            >
              {/* Dynamic SVG Thumbnail Banner */}
              <div className={`h-40 w-full flex items-center justify-center bg-gradient-to-br ${getCategoryGradient(res.category)} relative overflow-hidden`}>
                <div className="absolute opacity-20 transform scale-150 rotate-12">
                   {getCategoryIcon(res.category)}
                </div>
                <div className="z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-md">
                   {getCategoryIcon(res.category)}
                </div>
                
                {res.category === 'video' && res.duration && (
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg shadow-sm z-20 flex items-center gap-1">
                    <Clock size={10} /> {res.duration}
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                    res.category === 'book' ? 'bg-blue-50 text-blue-600' :
                    res.category === 'video' ? 'bg-red-50 text-red-600' :
                    res.category === 'test' ? 'bg-green-50 text-green-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>
                    {res.category}
                  </span>
                  {res.rating && (
                    <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md">
                      <Star size={12} className="fill-current" />
                      <span className="text-[11px] font-bold">{res.rating}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {res.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-3 flex-1 font-medium leading-relaxed">
                  {res.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {res.tags.slice(0,3).map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Provider</span>
                    <span className="text-xs font-bold text-gray-700 truncate max-w-[120px]">{res.provider}</span>
                  </div>
                  <div className="p-2.5 bg-gray-50 text-gray-400 rounded-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all shadow-sm">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <Library size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-900">No resources found</h3>
          <p className="text-gray-500 mt-2 font-medium">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
            onClick={() => { setActiveTab('all'); setSearchQuery(''); setActiveLevel('All'); }}
            className="mt-6 px-6 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Quick Access Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] p-8 md:p-10 text-white shadow-xl shadow-indigo-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner">
              <GraduationCap size={24} />
            </div>
            <h2 className="text-2xl font-bold">Learning Paths</h2>
          </div>
          <p className="text-indigo-100 mb-8 font-medium leading-relaxed">Curated collections of resources to help you master specific skills from scratch.</p>
          <div className="space-y-4">
            {['Frontend Development', 'Data Science & AI', 'Product Management'].map((path) => (
              <button key={path} className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group border border-white/5">
                <span className="font-bold text-sm">{path}</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center border border-orange-100">
                <Lightbulb size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Daily Tip</h2>
            </div>
            <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100/50 italic text-gray-700 leading-relaxed font-medium">
              "The best way to learn is to teach. Try explaining a complex concept you just learned to a friend or write a blog post about it. It solidifies your understanding like nothing else."
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/user${i}/40/40`} 
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm" 
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              ))}
              <div className="w-10 h-10 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm z-10">
                +12k
              </div>
            </div>
            <span className="text-sm font-bold text-gray-400">Join 12,000+ learners today</span>
          </div>
        </div>
      </div>
    </div>
  );
}