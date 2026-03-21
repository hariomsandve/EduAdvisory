import { motion } from 'framer-motion';
import { Target, Sparkles, ArrowRight, RotateCcw, Briefcase, Zap, ShieldCheck } from 'lucide-react';

interface QuizResultProps {
  userData?: any;
  onDashboard: () => void;
  onRetake: () => void;
}

export default function QuizResult({ userData, onDashboard, onRetake }: QuizResultProps) {
  
  // If the user hasn't completed the quiz yet or data is missing, fallback to a default dynamic profile.
  const resultData = userData?.careerPath || {
    title: "CREATIVE TECHNOLOGIST",
    subtitle: "Art Meets Engineering",
    color: "text-purple-600",
    bg: "bg-purple-100",
    description: "You love art, but have an analytical mind. Architecture, UI/UX design, and front-end development are your paths.",
    careers: ["ARCHITECT", "PRODUCT DESIGNER", "UI/UX DESIGNER", "FRONT-END DEV"]
  };

  // Generate superpowers dynamically based on the title keywords
  const generateSuperpowers = (title: string) => {
    if (title.includes('CREATIVE')) return ["Design Thinking", "Empathy", "Visual Communication"];
    if (title.includes('MASTERMIND') || title.includes('SYSTEM')) return ["Logical Analysis", "Problem Solving", "System Design"];
    if (title.includes('CRAFTSMAN')) return ["Hands-on Execution", "Spatial Awareness", "Practical Engineering"];
    if (title.includes('STRATEGIC') || title.includes('LEADER')) return ["Public Speaking", "Team Leadership", "Strategic Vision"];
    return ["Quick Learner", "Adaptability", "Team Collaboration"];
  };

  const superpowers = generateSuperpowers(resultData.title);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 font-sans flex flex-col items-center justify-center relative overflow-hidden py-20 border-t-8 border-orange-500">
      {/* Decorative Brand Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-200/40 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-4xl w-full mx-auto px-6 relative z-10">
        
        {/* Main Header / Glass Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/90 backdrop-blur-xl border border-gray-100 p-10 md:p-14 rounded-[40px] shadow-2xl relative overflow-hidden text-center mb-8"
        >
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-green-500"></div>

          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className={`w-24 h-24 mx-auto rounded-3xl ${resultData.bg} ${resultData.color} flex items-center justify-center mb-8 shadow-sm border border-gray-100 rotate-3`}
          >
            <Sparkles size={40} className="drop-shadow-sm" />
          </motion.div>

          <p className="text-gray-400 uppercase tracking-[0.2em] text-xs font-black mb-3 flex items-center justify-center gap-2">
            <ShieldCheck size={16} className="text-green-500" />
            Identity Unlocked
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-gray-900 tracking-tight">
            {resultData.title}
          </h1>

          <h2 className={`text-lg md:text-xl font-bold uppercase tracking-widest mb-8 ${resultData.color}`}>
            {resultData.subtitle}
          </h2>

          <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto mb-8"></div>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            "{resultData.description}"
          </p>
        </motion.div>

        {/* Breakdown Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Superpowers */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-[32px] p-8 shadow-lg shadow-gray-200/50 border border-gray-100"
          >
             <h3 className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-6 flex items-center gap-3">
               <Zap size={16} className="text-orange-500" />
               Identified Strengths
             </h3>
             <div className="flex flex-col gap-4">
                {superpowers.map((power, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-orange-50 text-orange-900 border border-orange-100 hover:bg-orange-100 transition-colors">
                    <span className="font-bold text-sm md:text-base">{power}</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <div key={star} className={`w-2 h-5 rounded-sm ${star <= 4 ? 'bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.4)]' : 'bg-orange-200'}`}></div>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          </motion.div>

          {/* Suggested Direct Careers */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.5, duration: 0.6 }}
             className="bg-white rounded-[32px] p-8 shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col"
          >
             <h3 className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-6 flex items-center gap-3">
               <Briefcase size={16} className="text-green-500" />
               Top Industry Matches
             </h3>
             <div className="flex flex-wrap gap-3 mt-auto mb-auto justify-center">
                {resultData.careers.map((career: string, idx: number) => (
                  <div key={idx} className="px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 font-bold text-sm flex-1 min-w-[140px] text-center shadow-sm">
                    {career}
                  </div>
                ))}
             </div>
          </motion.div>

        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button 
            onClick={onRetake}
            className="px-8 py-4 w-full sm:w-auto rounded-2xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex justify-center items-center gap-3 active:scale-95"
          >
             <RotateCcw size={20} /> Retake Quiz
          </button>

          <button 
            onClick={onDashboard}
            className="px-10 py-5 w-full sm:w-auto rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all flex justify-center items-center gap-3 active:scale-95 group"
          >
             Unlock Full Roadmap 
             <ArrowRight size={24} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>

        {/* Explore More Features */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.9 }}
           className="mt-6 text-center"
        >
           <button onClick={onDashboard} className="text-gray-500 hover:text-orange-500 font-bold transition-colors underline-offset-4 hover:underline text-sm uppercase tracking-widest">
              Alternatively, Explore More App Features
           </button>
        </motion.div>

      </div>
    </div>
  );
}
