import { useState } from 'react';
import { 
  Briefcase, TrendingUp, DollarSign, Clock, Users, 
  ChevronRight, Search, Filter, Star, Info, 
  BarChart3, MapPin, GraduationCap, Building2, Map, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoadmapPhase {
  title: string;
  duration: string;
  description: string;
  topics: string[];
}

interface CareerPath {
  id: string;
  title: string;
  category: string;
  demand: 'High' | 'Medium' | 'Stable';
  salaryRange: string;
  description: string;
  progression: {
    level: string;
    years: string;
    salary: string;
  }[];
  skills: string[];
  dayInLife: string[];
  topCompanies: string[];
  roadmap: RoadmapPhase[];
}

const careerPaths: CareerPath[] = [
  {
    id: '1',
    title: 'AI / Machine Learning Engineer',
    category: 'Technology',
    demand: 'High',
    salaryRange: '₹10L - ₹50L+',
    description: 'AI/ML Engineers build systems that learn from data. They are the driving force behind AI chatbots, recommendation engines, autonomous systems, and predictive models.',
    progression: [
      { level: 'Junior ML Engineer', years: '0-2 yrs', salary: '₹8L - ₹15L' },
      { level: 'Senior ML Engineer', years: '3-6 yrs', salary: '₹18L - ₹30L' },
      { level: 'Principal AI Scientist', years: '7+ yrs', salary: '₹35L - ₹60L+' },
    ],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Mathematics', 'NLP', 'Computer Vision'],
    dayInLife: [
      'Reading the latest AI research papers (ArXiv)',
      'Training and tuning complex deep learning models',
      'Optimizing models for fast deployment and inference',
      'Working with data engineers to build robust data pipelines'
    ],
    topCompanies: ['OpenAI', 'Google DeepMind', 'Microsoft', 'NVIDIA', 'Meta'],
    roadmap: [
      {
        title: "Phase 1: Mathematics & Programming Foundations",
        duration: "Months 1-3",
        description: "Master the fundamental math and coding skills required to understand how ML algorithms work under the hood.",
        topics: ["Linear Algebra", "Calculus", "Probability & Statistics", "Python (Advanced)", "Data Structures"]
      },
      {
        title: "Phase 2: Data Handling & Classical ML",
        duration: "Months 4-6",
        description: "Learn to clean data, extract features, and apply traditional machine learning algorithms.",
        topics: ["Pandas & NumPy", "Data Visualization (Matplotlib)", "Scikit-Learn", "Regression", "Classification & Clustering"]
      },
      {
        title: "Phase 3: Deep Learning & Neural Networks",
        duration: "Months 7-9",
        description: "Dive into neural networks and learn how to build architectures for complex data like images and text.",
        topics: ["TensorFlow / PyTorch", "CNNs (Computer Vision)", "RNNs & LSTMs", "Transfer Learning"]
      },
      {
        title: "Phase 4: Advanced AI & MLOps",
        duration: "Months 10-12",
        description: "Understand modern generative AI and how to deploy your models to production servers.",
        topics: ["Transformers & LLMs (HuggingFace)", "Prompt Engineering", "Docker & Kubernetes", "Model Deployment (FastAPI)", "AWS/GCP ML Tools"]
      }
    ]
  },
  {
    id: '2',
    title: 'Software Engineer (SDE)',
    category: 'Technology',
    demand: 'High',
    salaryRange: '₹8L - ₹40L+',
    description: 'Software Engineers design, develop, and maintain the software systems that power modern businesses and consumer applications.',
    progression: [
      { level: 'SDE 1 (Junior)', years: '0-2 yrs', salary: '₹8L - ₹15L' },
      { level: 'SDE 2 (Mid-Level)', years: '2-5 yrs', salary: '₹16L - ₹28L' },
      { level: 'SDE 3 / Architect', years: '6+ yrs', salary: '₹30L - ₹55L+' },
    ],
    skills: ['Data Structures', 'Algorithms', 'Java/C++', 'System Design', 'Git', 'APIs'],
    dayInLife: [
      'Daily stand-up meetings with the agile team',
      'Writing scalable and efficient code for new features',
      'Conducting strict code reviews for peers',
      'Designing system architecture for scalability'
    ],
    topCompanies: ['Amazon', 'Atlassian', 'Uber', 'Microsoft', 'Google'],
    roadmap: [
      {
        title: "Phase 1: Programming & Problem Solving",
        duration: "Months 1-3",
        description: "Gain extreme fluency in at least one programming language and learn to solve logical problems.",
        topics: ["C++ / Java / Python", "Variables & Control Flow", "OOP Concepts", "Memory Management"]
      },
      {
        title: "Phase 2: Data Structures & Algorithms",
        duration: "Months 4-6",
        description: "The core of software engineering interviews. Master efficient data organization.",
        topics: ["Arrays & Strings", "Linked Lists & Trees", "Graphs", "Dynamic Programming", "Time & Space Complexity (Big O)"]
      },
      {
        title: "Phase 3: Core Computer Science",
        duration: "Months 7-8",
        description: "Understand how computers and networks communicate internally.",
        topics: ["Operating Systems", "Database Management (SQL)", "Computer Networks (TCP/IP)", "Multithreading"]
      },
      {
        title: "Phase 4: System Design & Architecture",
        duration: "Months 9-10",
        description: "Learn how to design massive systems that scale to millions of users.",
        topics: ["High-Level Design (HLD)", "Low-Level Design (LLD)", "Caching (Redis)", "Message Queues (Kafka)", "Microservices"]
      }
    ]
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    category: 'Technology',
    demand: 'High',
    salaryRange: '₹6L - ₹35L+',
    description: 'A Full Stack Developer handles both the front-end (user interface) and back-end (server logic) of web applications. They are the "Swiss Army Knives" of the tech world.',
    progression: [
      { level: 'Junior Developer', years: '0-2 yrs', salary: '₹4L - ₹8L' },
      { level: 'Senior Developer', years: '3-6 yrs', salary: '₹12L - ₹22L' },
      { level: 'Tech Lead / Architect', years: '7+ yrs', salary: '₹25L - ₹50L+' },
    ],
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'System Design'],
    dayInLife: [
      'Daily stand-up meetings with the team',
      'Building UI components for the web app',
      'Designing database schemas and writing queries',
      'Writing API endpoints to connect frontend and backend'
    ],
    topCompanies: ['Zomato', 'CRED', 'Flipkart', 'Swiggy', 'Razorpay'],
    roadmap: [
      {
        title: "Phase 1: Frontend Basics",
        duration: "Months 1-2",
        description: "Learn the building blocks of the web and create static, responsive websites.",
        topics: ["HTML5 & CSS3", "JavaScript (ES6+)", "Tailwind CSS", "DOM Manipulation", "Responsive Design"]
      },
      {
        title: "Phase 2: Frontend Frameworks",
        duration: "Months 3-4",
        description: "Build dynamic, single-page applications using modern frameworks.",
        topics: ["React.js", "State Management (Redux/Zustand)", "Next.js", "API Fetching (Axios)"]
      },
      {
        title: "Phase 3: Backend Development",
        duration: "Months 5-6",
        description: "Build secure servers, REST APIs, and connect them to databases.",
        topics: ["Node.js & Express", "RESTful APIs", "MongoDB / PostgreSQL", "JWT Authentication", "MVC Architecture"]
      },
      {
        title: "Phase 4: DevOps & Deployment",
        duration: "Months 7-8",
        description: "Learn to host your applications on the cloud and set up continuous integration.",
        topics: ["Git & GitHub Actions", "AWS / Vercel deployment", "Docker Basics", "Nginx", "Linux Basics"]
      }
    ]
  },
  {
    id: '4',
    title: 'Cybersecurity Specialist',
    category: 'Technology',
    demand: 'High',
    salaryRange: '₹8L - ₹38L+',
    description: 'Cybersecurity Specialists protect networks, systems, and programs from digital attacks, acting as the digital shields for modern organizations.',
    progression: [
      { level: 'Security Analyst', years: '0-2 yrs', salary: '₹6L - ₹12L' },
      { level: 'Penetration Tester', years: '3-6 yrs', salary: '₹15L - ₹25L' },
      { level: 'CISO', years: '8+ yrs', salary: '₹40L - ₹70L+' },
    ],
    skills: ['Network Security', 'Linux', 'Ethical Hacking', 'Cryptography', 'SIEM'],
    dayInLife: [
      'Monitoring network traffic for suspicious activity',
      'Conducting vulnerability assessments on web apps',
      'Writing incident reports and patching flaws',
      'Configuring firewalls and intrusion detection systems'
    ],
    topCompanies: ['Palo Alto', 'CrowdStrike', 'Cisco', 'IBM', 'TCS Security'],
    roadmap: [
      {
        title: "Phase 1: IT & Networking Foundations",
        duration: "Months 1-2",
        description: "Understand how networks operate and how computers talk to each other.",
        topics: ["Computer Networks (OSI Model)", "TCP/IP", "Linux Command Line", "Windows Server Internals"]
      },
      {
        title: "Phase 2: Security Fundamentals",
        duration: "Months 3-4",
        description: "Learn the core concepts of securing data and identity management.",
        topics: ["Cryptography", "Firewalls & VPNs", "Identity & Access Management (IAM)", "Security Policies"]
      },
      {
        title: "Phase 3: Ethical Hacking (Offense)",
        duration: "Months 5-7",
        description: "Learn how hackers attack systems so you can secure them.",
        topics: ["Kali Linux", "Web App Exploitation (OWASP Top 10)", "Metasploit", "Burp Suite", "Network Sniffing (Wireshark)"]
      },
      {
        title: "Phase 4: Blue Teaming (Defense)",
        duration: "Months 8-9",
        description: "Focus on defending systems, detecting threats, and incident response.",
        topics: ["SIEM Tools (Splunk)", "Intrusion Detection (Snort)", "Malware Analysis", "Digital Forensics"]
      }
    ]
  },
  {
    id: '5',
    title: 'Data Scientist',
    category: 'Data Science',
    demand: 'Stable',
    salaryRange: '₹8L - ₹40L+',
    description: 'Data Scientists use statistical methods and machine learning to extract insights from complex data sets to drive business decisions.',
    progression: [
      { level: 'Junior Data Analyst', years: '0-2 yrs', salary: '₹6L - ₹10L' },
      { level: 'Data Scientist', years: '3-6 yrs', salary: '₹15L - ₹28L' },
      { level: 'Principal Data Scientist', years: '8+ yrs', salary: '₹35L - ₹60L+' },
    ],
    skills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Tableau/PowerBI'],
    dayInLife: [
      'Cleaning and preprocessing raw data',
      'Building and training ML models for predictive analysis',
      'Creating interactive dashboards',
      'Presenting insights to business stakeholders'
    ],
    topCompanies: ['Meta', 'Netflix', 'Fractal Analytics', 'Mu Sigma', 'Deloitte'],
    roadmap: [
      {
        title: "Phase 1: Data Analytics Basics",
        duration: "Months 1-2",
        description: "Learn to query, manipulate, and visualize raw data.",
        topics: ["Advanced SQL", "Excel", "Python (Pandas, NumPy)", "Descriptive Statistics"]
      },
      {
        title: "Phase 2: Data Visualization & BI",
        duration: "Months 3-4",
        description: "Translate complex data into easily understandable dashboards.",
        topics: ["Tableau / PowerBI", "Matplotlib & Seaborn", "Storytelling with Data", "KPI Definition"]
      },
      {
        title: "Phase 3: Machine Learning",
        duration: "Months 5-7",
        description: "Build models to predict trends and classify information.",
        topics: ["Supervised Learning", "Unsupervised Learning", "Scikit-Learn", "Model Evaluation Metrics"]
      },
      {
        title: "Phase 4: Big Data & Advanced Analytics",
        duration: "Months 8-9",
        description: "Learn to handle massive datasets that don't fit on a single computer.",
        topics: ["A/B Testing", "Apache Spark", "Hadoop Basics", "Cloud Data Warehouses (Snowflake)"]
      }
    ]
  }
];

export default function CareerPaths() {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technology', 'Management', 'Data Science', 'Design', 'Finance'];

  const filteredPaths = careerPaths.filter(path => {
    const matchesCategory = activeCategory === 'All' || path.category === activeCategory;
    const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Career Paths</h1>
          <p className="text-gray-500">Explore the hierarchy, learning roadmaps, salary, and daily life of professional roles.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none w-64 text-sm shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-indigo-600 transition-colors shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              activeCategory === cat 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* List of Paths (Left Panel) */}
        <div className="lg:col-span-4 space-y-4">
          {filteredPaths.map(path => (
            <button
              key={path.id}
              onClick={() => setSelectedPath(path)}
              className={`w-full text-left p-5 rounded-[2rem] border transition-all ${
                selectedPath?.id === path.id 
                  ? 'bg-white border-indigo-600 shadow-xl shadow-indigo-100/50' 
                  : 'bg-white border-gray-100 hover:border-indigo-300 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-indigo-50/80 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Briefcase size={22} />
                </div>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                  path.demand === 'High' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {path.demand} Demand
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{path.title}</h3>
              <p className="text-xs text-gray-500 font-medium mb-5">{path.category}</p>
              
              <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1.5 text-gray-700 font-bold">
                  <DollarSign size={16} className="text-green-500" />
                  {path.salaryRange}
                </div>
                <ChevronRight size={18} className={selectedPath?.id === path.id ? 'text-indigo-600' : 'text-gray-300'} />
              </div>
            </button>
          ))}
          {filteredPaths.length === 0 && (
            <div className="text-center py-12 bg-white rounded-[2rem] border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">No roles found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Detailed View (Right Panel) */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedPath ? (
              <motion.div
                key={selectedPath.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 space-y-12"
              >
                {/* Header & Overview */}
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{selectedPath.title}</h2>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedPath.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
                    {selectedPath.description}
                  </p>
                </div>

                {/* --- PROPER ROADMAP SECTION --- */}
                <div className="space-y-8 bg-indigo-50/30 p-8 rounded-[2rem] border border-indigo-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <Map className="text-indigo-600" size={28} />
                      Learning Roadmap
                    </h3>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      Step-by-Step Guide
                    </span>
                  </div>
                  
                  {/* Vertical Timeline UI */}
                  <div className="relative border-l-2 border-indigo-200/60 ml-4 md:ml-6 space-y-8 pb-2">
                    {selectedPath.roadmap.map((phase, i) => (
                      <div key={i} className="relative pl-8 md:pl-12">
                        {/* Timeline Node Dot */}
                        <div className="absolute -left-[11px] top-1.5 w-5 h-5 bg-indigo-600 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        
                        {/* Phase Content Card */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                            <h4 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">{phase.title}</h4>
                            <div className="flex items-center gap-1.5 text-[11px] bg-gray-50 text-gray-600 font-bold px-3 py-1.5 rounded-lg w-fit border border-gray-100">
                              <Clock size={12} />
                              {phase.duration}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                            {phase.description}
                          </p>
                          
                          {/* Topics List */}
                          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                            {phase.topics.map((topic, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50/50 border border-indigo-100/50 rounded-lg text-xs font-semibold text-indigo-900">
                                <BookOpen size={12} className="text-indigo-400" />
                                {topic}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progression Ladder */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <TrendingUp className="text-emerald-500" size={28} />
                    Career Progression & Salary
                  </h3>
                  <div className="space-y-4">
                    {selectedPath.progression.map((step, i) => (
                      <div key={i} className="flex items-center gap-4 md:gap-6 p-5 md:p-6 bg-white shadow-sm rounded-[1.5rem] border border-gray-100 hover:border-emerald-100 transition-colors">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center font-black text-emerald-600 shrink-0 text-lg">
                          {i + 1}
                        </div>
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Level</p>
                            <p className="font-bold text-gray-900 text-sm md:text-base">{step.level}</p>
                          </div>
                          <div className="hidden md:block">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Experience</p>
                            <p className="font-bold text-gray-700 text-sm md:text-base">{step.years}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Est. Salary</p>
                            <p className="font-bold text-emerald-600 text-sm md:text-base">{step.salary}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Day in the Life & Companies */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Clock className="text-orange-500" size={24} />
                      A Day in the Life
                    </h3>
                    <ul className="space-y-4 bg-orange-50/30 p-6 rounded-[1.5rem] border border-orange-50 h-full">
                      {selectedPath.dayInLife.map((item, i) => (
                        <li key={i} className="flex gap-3 text-gray-700 text-sm font-medium leading-relaxed">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0 shadow-sm" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Building2 className="text-blue-500" size={24} />
                      Top Employers
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedPath.topCompanies.map(company => (
                        <div key={company} className="p-4 bg-white shadow-sm rounded-2xl border border-gray-100 flex items-center gap-3 hover:shadow-md transition-all">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center font-black text-gray-400 text-[12px] border border-gray-200 shrink-0">
                            {company[0]}
                          </div>
                          <span className="font-bold text-gray-800 text-sm truncate">{company}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-medium bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                    <Info size={14} className="text-indigo-500" />
                    Data based on current 2024-25 market trends in India.
                  </div>
                  <button className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
                    Find Courses for this Path
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                  <BarChart3 size={48} className="text-indigo-400" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Select a Career Path</h3>
                <p className="text-sm font-medium text-gray-500 max-w-sm mx-auto leading-relaxed">
                  Click on any role from the left menu to explore detailed insights, comprehensive learning roadmaps, and salary expectations.
                </p>
                
                <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-lg mx-auto">
                  <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="mx-auto w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                      <Map size={24} />
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Roadmaps</p>
                  </div>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="mx-auto w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600">
                      <DollarSign size={24} />
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Salaries</p>
                  </div>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="mx-auto w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-500">
                      <Clock size={24} />
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Daily Life</p>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}