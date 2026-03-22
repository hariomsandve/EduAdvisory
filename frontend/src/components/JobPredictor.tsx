import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Sparkles, Target, ArrowRight, CheckCircle2, 
  Search, Brain, TrendingUp, DollarSign, Clock, Users
} from 'lucide-react';

interface JobRecommendation {
  title: string;
  growth: string;
  salary: string;
  matchScore: number;
  description: string;
  skillsNeeded: string[];
}

export default function JobPredictor() {
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [isPredicting, setIsPredicting] = useState(false);
  const [recommendations, setRecommendations] = useState<JobRecommendation[] | null>(null);

  const handlePredict = () => {
    if (!skills || !interests) {
      alert('Please enter your skills and interests first!');
      return;
    }

    setIsPredicting(true);
    
    // Simulate API call/processing
    setTimeout(() => {
      const mockRecommendations: JobRecommendation[] = [
        {
          title: 'Full Stack AI Developer',
          growth: '+45%',
          salary: 'Very High',
          matchScore: 92,
          description: 'Combines frontend/backend expertise with AI integration capabilities.',
          skillsNeeded: ['React', 'Python', 'Node.js', 'PyTorch']
        },
        {
          title: 'Data Science Specialist',
          growth: '+38%',
          salary: 'High',
          matchScore: 85,
          description: 'Analyzing complex datasets to drive business insights and decisions.',
          skillsNeeded: ['R', 'SQL', 'Statistics', 'Pandas']
        },
        {
          title: 'Cybersecurity Analyst',
          growth: '+32%',
          salary: 'High',
          matchScore: 78,
          description: 'Protecting systems and networks from digital attacks.',
          skillsNeeded: ['Network Security', 'Ethical Hacking', 'Linux']
        }
      ];
      setRecommendations(mockRecommendations);
      setIsPredicting(false);
    }, 1500);
  };

  const resetPredictor = () => {
    setRecommendations(null);
    setSkills('');
    setInterests('');
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Predictor AI</h1>
        <p className="text-gray-500">Discover your future career based on your unique skills and interests.</p>
      </div>

      <AnimatePresence mode="wait">
        {!recommendations ? (
          <motion.div 
            key="input-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[32px] p-8 lg:p-12 shadow-sm border border-gray-100"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Target size={18} className="text-orange-500" />
                    What skills do you have?
                  </label>
                  <textarea 
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g., Programming, Writing, Graphic Design, Mathematics..."
                    className="w-full p-4 rounded-2xl bg-gray-50 border-gray-200 border focus:ring-2 focus:ring-orange-200 focus:border-orange-500 transition-all h-32 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Sparkles size={18} className="text-orange-500" />
                    What are your interests?
                  </label>
                  <textarea 
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="e.g., Solving problems, Helping people, Space technology, Music..."
                    className="w-full p-4 rounded-2xl bg-gray-50 border-gray-200 border focus:ring-2 focus:ring-orange-200 focus:border-orange-500 transition-all h-32 resize-none"
                  />
                </div>
              </div>

              <div className="bg-orange-50 rounded-3xl p-8 flex flex-col justify-center text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Brain className="text-orange-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">How it works</h3>
                <ul className="text-sm text-gray-600 space-y-4 text-left">
                  <li className="flex gap-3">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                    Analyze your current skill set
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                    Match with trending job market data
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                    Predict career growth & salary trends
                  </li>
                </ul>
                <button
                  onClick={handlePredict}
                  disabled={isPredicting}
                  className="mt-8 w-full py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                >
                  {isPredicting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Predict My Future Job
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Predicted Career Paths</h2>
              <button 
                onClick={resetPredictor}
                className="text-orange-600 font-bold hover:underline flex items-center gap-2"
              >
                Reset & Try Again
              </button>
            </div>

            <div className="grid gap-6">
              {recommendations.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-0 opacity-50"></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-bold text-xl">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                          <p className="text-gray-500 text-sm mt-1">{job.description}</p>
                        </div>
                      </div>
                      <div className="bg-green-50 text-green-600 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                        <TrendingUp size={16} />
                        {job.matchScore}% Match
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Market Growth</p>
                        <p className="font-bold text-green-600">{job.growth}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Salary Range</p>
                        <p className="font-bold text-gray-900">{job.salary}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Work Type</p>
                        <p className="font-bold text-gray-900">Hybrid / Remote</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-700 mb-3">Key Skills to Master:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skillsNeeded.map((skill, sIdx) => (
                          <span key={sIdx} className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
