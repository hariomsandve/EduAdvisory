import { useState } from 'react';
import { 
  Map, ChevronRight, BookOpen, Award, Briefcase, 
  GraduationCap, Code, Stethoscope, Calculator, PenTool, 
  Globe, Shield, Database, Smartphone, Server, Cpu, 
  Layout, Terminal, Cloud, Lock, Anchor, Users, 
  TrendingUp, Building2, Gavel, FileText, Camera,
  Search, Brain
} from 'lucide-react';
import { motion } from 'framer-motion';

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  duration?: string;
  skills?: string[];
  exams?: string[];
}

interface CareerPath {
  id: string;
  title: string;
  group: 'Role-based' | 'Skill-based' | 'Government' | 'Non-Technical';
  icon: any;
  color: string;
  description: string;
  salary: string;
  growth: string;
  steps: RoadmapStep[];
}

export default function CareerRoadmap() {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState('All');

  // Helper to generate generic steps for paths without specific data yet
  const getGenericSteps = (title: string): RoadmapStep[] => [
    {
      id: 'step1',
      title: 'Foundations',
      description: `Learn the core concepts and basics of ${title}.`,
      icon: BookOpen,
      duration: '3-6 Months'
    },
    {
      id: 'step2',
      title: 'Advanced Concepts',
      description: 'Master advanced topics and tools.',
      icon: Code,
      duration: '6 Months'
    },
    {
      id: 'step3',
      title: 'Projects & Portfolio',
      description: 'Build real-world projects to showcase your skills.',
      icon: Briefcase,
      duration: '3 Months'
    },
    {
      id: 'step4',
      title: 'Professional Experience',
      description: 'Internships and entry-level positions.',
      icon: Award
    }
  ];

  const careerPaths: CareerPath[] = [
    // --- Role-based (Technical) ---
    {
      id: 'frontend',
      title: 'Frontend Developer',
      group: 'Role-based',
      icon: Layout,
      color: 'bg-blue-500',
      description: 'Build the user interface of websites and applications.',
      salary: '₹5L - ₹20L',
      growth: 'High',
      steps: getGenericSteps('Frontend Development')
    },
    {
      id: 'backend',
      title: 'Backend Developer',
      group: 'Role-based',
      icon: Server,
      color: 'bg-green-600',
      description: 'Handle server-side logic and databases.',
      salary: '₹6L - ₹25L',
      growth: 'High',
      steps: getGenericSteps('Backend Development')
    },
    {
      id: 'fullstack',
      title: 'Full Stack Developer',
      group: 'Role-based',
      icon: Code,
      color: 'bg-indigo-600',
      description: 'Master both frontend and backend technologies.',
      salary: '₹8L - ₹30L',
      growth: 'Very High',
      steps: getGenericSteps('Full Stack Development')
    },
    {
      id: 'devops',
      title: 'DevOps Engineer',
      group: 'Role-based',
      icon: Cloud,
      color: 'bg-orange-500',
      description: 'Bridge the gap between development and operations.',
      salary: '₹10L - ₹35L',
      growth: 'Very High',
      steps: getGenericSteps('DevOps')
    },
    {
      id: 'ai-engineer',
      title: 'AI Engineer',
      group: 'Role-based',
      icon: Brain,
      color: 'bg-purple-600',
      description: 'Build and deploy Artificial Intelligence models.',
      salary: '₹12L - ₹40L',
      growth: 'Explosive',
      steps: getGenericSteps('Artificial Intelligence')
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      group: 'Role-based',
      icon: Database,
      color: 'bg-teal-600',
      description: 'Analyze complex data to help make decisions.',
      salary: '₹10L - ₹35L',
      growth: 'High',
      steps: getGenericSteps('Data Science')
    },
    {
      id: 'android',
      title: 'Android Developer',
      group: 'Role-based',
      icon: Smartphone,
      color: 'bg-green-500',
      description: 'Build mobile applications for Android devices.',
      salary: '₹5L - ₹20L',
      growth: 'Stable',
      steps: getGenericSteps('Android Development')
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security',
      group: 'Role-based',
      icon: Shield,
      color: 'bg-red-600',
      description: 'Protect systems and networks from digital attacks.',
      salary: '₹8L - ₹30L',
      growth: 'Very High',
      steps: getGenericSteps('Cyber Security')
    },
    
    // --- Skill-based ---
    {
      id: 'react',
      title: 'React',
      group: 'Skill-based',
      icon: Code,
      color: 'bg-blue-400',
      description: 'Master the React.js library.',
      salary: '₹5L - ₹20L',
      growth: 'High',
      steps: getGenericSteps('React')
    },
    {
      id: 'python',
      title: 'Python',
      group: 'Skill-based',
      icon: Terminal,
      color: 'bg-yellow-500',
      description: 'Learn Python for web, data, and automation.',
      salary: '₹6L - ₹25L',
      growth: 'High',
      steps: getGenericSteps('Python')
    },
    {
      id: 'aws',
      title: 'AWS',
      group: 'Skill-based',
      icon: Cloud,
      color: 'bg-orange-400',
      description: 'Master Amazon Web Services cloud platform.',
      salary: '₹8L - ₹30L',
      growth: 'High',
      steps: getGenericSteps('AWS')
    },

    // --- Government Jobs ---
    {
      id: 'ias',
      title: 'IAS Officer (UPSC)',
      group: 'Government',
      icon: Building2,
      color: 'bg-amber-700',
      description: 'Indian Administrative Service - Top civil service post.',
      salary: '₹56k - ₹2.5L/mo',
      growth: 'Prestige',
      steps: [
        {
          id: 'step1',
          title: 'Graduation',
          description: 'Complete a Bachelor\'s degree in any stream.',
          icon: GraduationCap,
          duration: '3-4 Years'
        },
        {
          id: 'step2',
          title: 'UPSC Prelims',
          description: 'General Studies and CSAT papers.',
          icon: BookOpen,
          duration: '1 Year Prep',
          exams: ['CSE Prelims']
        },
        {
          id: 'step3',
          title: 'UPSC Mains',
          description: '9 subjective papers including optional subject.',
          icon: PenTool,
          exams: ['CSE Mains']
        },
        {
          id: 'step4',
          title: 'Interview',
          description: 'Personality test by UPSC board.',
          icon: Users
        },
        {
          id: 'step5',
          title: 'LBSNAA Training',
          description: 'Foundation course and professional training.',
          icon: Award,
          duration: '2 Years'
        }
      ]
    },
    {
      id: 'ips',
      title: 'IPS Officer (UPSC)',
      group: 'Government',
      icon: Shield,
      color: 'bg-blue-800',
      description: 'Indian Police Service - Law and order leadership.',
      salary: '₹56k - ₹2.25L/mo',
      growth: 'Prestige',
      steps: getGenericSteps('UPSC CSE (IPS)')
    },
    {
      id: 'ssc-cgl',
      title: 'SSC CGL',
      group: 'Government',
      icon: FileText,
      color: 'bg-green-700',
      description: 'Staff Selection Commission - Group B & C posts.',
      salary: '₹40k - ₹80k/mo',
      growth: 'Stable',
      steps: getGenericSteps('SSC CGL')
    },
    {
      id: 'banking',
      title: 'Bank PO (IBPS/SBI)',
      group: 'Government',
      icon: Building2,
      color: 'bg-indigo-700',
      description: 'Probationary Officer in Public Sector Banks.',
      salary: '₹50k - ₹70k/mo',
      growth: 'Stable',
      steps: getGenericSteps('Bank PO Exams')
    },

    // --- Non-Technical ---
    {
      id: 'product-manager',
      title: 'Product Manager',
      group: 'Non-Technical',
      icon: Briefcase,
      color: 'bg-pink-600',
      description: 'Guide the success of a product and lead teams.',
      salary: '₹15L - ₹40L',
      growth: 'High',
      steps: getGenericSteps('Product Management')
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      group: 'Non-Technical',
      icon: TrendingUp,
      color: 'bg-orange-400',
      description: 'Promote brands using digital channels.',
      salary: '₹4L - ₹15L',
      growth: 'High',
      steps: getGenericSteps('Digital Marketing')
    },
    {
      id: 'graphic-design',
      title: 'Graphic Designer',
      group: 'Non-Technical',
      icon: PenTool,
      color: 'bg-purple-500',
      description: 'Create visual content to communicate messages.',
      salary: '₹3L - ₹12L',
      growth: 'Moderate',
      steps: getGenericSteps('Graphic Design')
    },
    {
      id: 'hr-manager',
      title: 'HR Manager',
      group: 'Non-Technical',
      icon: Users,
      color: 'bg-blue-500',
      description: 'Manage recruitment and employee relations.',
      salary: '₹5L - ₹18L',
      growth: 'Stable',
      steps: getGenericSteps('Human Resources')
    }
  ];

  // Import Brain locally since it was missing in imports
  // const Brain = Cpu; 

  const groups = ['All', 'Role-based', 'Skill-based', 'Government', 'Non-Technical'];

  const filteredPaths = careerPaths.filter(path => 
    (activeGroup === 'All' || path.group === activeGroup) &&
    path.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Map className="text-indigo-600" size={32} />
            Career Roadmaps
          </h1>
          <p className="text-gray-500 mt-1">Step-by-step guides for your career journey.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search roadmaps..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
          />
        </div>
      </div>

      {!selectedPath ? (
        /* Career Selection View */
        <div className="space-y-8">
          {/* Group Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-gray-100">
            {groups.map(group => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`px-5 py-2.5 rounded-t-xl text-sm font-bold whitespace-nowrap transition-all relative top-[1px] ${
                  activeGroup === group 
                    ? 'bg-white text-indigo-600 border-x border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {group}
              </button>
            ))}
          </div>

          {/* Career Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPaths.map((path) => (
              <motion.div
                key={path.id}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedPath(path)}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 ${path.color} shadow-sm`}>
                  <path.icon size={20} />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{path.title}</h3>
                  <p className="text-xs text-gray-500 truncate">{path.group}</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-gray-300 group-hover:text-indigo-500" />
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Detailed Roadmap View */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100"
        >
          <button 
            onClick={() => setSelectedPath(null)}
            className="mb-6 text-gray-500 hover:text-indigo-600 font-medium flex items-center gap-2 transition-colors"
          >
            <ChevronRight size={20} className="rotate-180" />
            Back to All Roadmaps
          </button>

          <div className="flex items-start gap-6 mb-12">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white ${selectedPath.color} shadow-lg`}>
              <selectedPath.icon size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{selectedPath.title}</h2>
              <p className="text-gray-500 mt-1 text-lg">{selectedPath.description}</p>
              <div className="flex gap-4 mt-4">
                 <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-600">
                   {selectedPath.salary}
                 </span>
                 <span className="px-3 py-1 bg-green-50 rounded-lg text-xs font-bold text-green-700">
                   Growth: {selectedPath.growth}
                 </span>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gray-200"></div>

            <div className="space-y-12">
              {selectedPath.steps.map((step, index) => (
                <div key={step.id} className="relative flex gap-8 group">
                  {/* Step Number/Icon */}
                  <div className={`relative z-10 w-16 h-16 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center shrink-0 group-hover:border-gray-300 transition-colors`}>
                    <div className={`w-10 h-10 rounded-full ${selectedPath.color} flex items-center justify-center text-white shadow-md`}>
                      <step.icon size={20} />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                      {step.duration && (
                        <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-500 whitespace-nowrap shadow-sm">
                          ⏱ {step.duration}
                        </span>
                      )}
                    </div>

                    {(step.exams || step.skills) && (
                      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200/50">
                        {step.exams && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-400 uppercase">Exams:</span>
                            <div className="flex gap-2">
                              {step.exams.map(exam => (
                                <span key={exam} className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-bold rounded-md border border-red-100">
                                  {exam}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {step.skills && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-400 uppercase">Skills:</span>
                            <div className="flex gap-2">
                              {step.skills.map(skill => (
                                <span key={skill} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-md border border-blue-100">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
