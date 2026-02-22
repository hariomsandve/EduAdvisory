import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronLeft, 
  Sparkles, 
  Languages, 
  Mic, 
  Loader2,
  ArrowRight
} from 'lucide-react';
import { generateQuizQuestions, QuizQuestion } from '../services/gemini';

interface CareerQuizProps {
  userData: { selectedClass: string; selectedInterests: string[] };
  onComplete: (results: any) => void;
  onSkip: () => void;
}

export default function CareerQuiz({ userData, onComplete, onSkip }: CareerQuizProps) {
  const [step, setStep] = useState<'intro' | 'quiz' | 'loading'>('intro');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const startQuiz = async () => {
    setStep('loading');
    try {
      const qs = await generateQuizQuestions(userData);
      setQuestions(qs);
      setStep('quiz');
    } catch (error) {
      console.error(error);
      setStep('intro');
    }
  };

  const handleAnswer = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: optionId }));
    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    } else {
      onComplete(answers);
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <p className="text-xl font-bold text-gray-900">Generating your personalized quiz...</p>
      </div>
    );
  }

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center p-4 relative">
        {/* Header */}
        <div className="w-full max-w-7xl flex justify-between items-center py-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            English
            <ChevronDown size={16} />
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Edu-Advisory Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold tracking-tight">
              <span className="text-green-600">Edu</span>-<span className="text-orange-500">Advisory</span>
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-orange-500 mb-6 tracking-tight"
          >
            Career Compass
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 font-medium mb-12"
          >
            Discover your perfect career path with AI-driven guidance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 w-full sm:w-auto"
          >
            <button
              onClick={startQuiz}
              className="px-12 py-5 bg-orange-500 text-white rounded-full font-bold text-xl hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              🚀 Start Career Quiz
            </button>
            <button
              onClick={onSkip}
              className="text-gray-400 font-bold hover:text-orange-500 transition-colors"
            >
              Skip for now
            </button>
          </motion.div>
        </div>

        {/* Voice Button */}
        <button className="fixed bottom-8 left-8 w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-110 transition-transform">
          <Mic size={32} />
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 relative">
      {/* Header */}
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center py-6">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            English
            <ChevronDown size={16} />
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Edu-Advisory Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold tracking-tight">
              <span className="text-green-600">Edu</span>-<span className="text-orange-500">Advisory</span>
            </span>
          </div>
        </div>
        
        <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-orange-500"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl mx-auto w-full px-4">
        {/* Illustration Side */}
        <div className="hidden lg:block w-1/2">
          <img 
            src="https://picsum.photos/seed/career-quiz/800/600" 
            alt="Career Illustration" 
            className="w-full max-w-md mx-auto"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Quiz Side */}
        <div className="w-full lg:w-1/2 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-orange-50/50 border-2 border-orange-500 rounded-[40px] p-12 relative overflow-hidden">
                <div className="absolute top-4 left-4 flex gap-1">
                  <div className="w-1 h-1 bg-orange-300 rounded-full" />
                  <div className="w-1 h-1 bg-orange-300 rounded-full" />
                  <div className="w-1 h-1 bg-orange-300 rounded-full" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 text-center leading-tight">
                  {currentQuestion.question}
                </h2>
                <div className="absolute bottom-4 right-4 flex gap-1">
                  <div className="w-1 h-1 bg-orange-300 rounded-full" />
                  <div className="w-1 h-1 bg-orange-300 rounded-full" />
                  <div className="w-1 h-1 bg-orange-300 rounded-full" />
                </div>
              </div>

              <div className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    className={`w-full p-6 rounded-3xl border-2 text-left transition-all flex items-center gap-4 group ${
                      answers[currentIndex] === option.id
                        ? 'bg-orange-500 border-orange-500 text-white'
                        : 'bg-white border-gray-100 text-gray-700 hover:border-orange-200'
                    }`}
                  >
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      answers[currentIndex] === option.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-50 text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500'
                    }`}>
                      {option.id}
                    </span>
                    <span className="text-lg font-medium">{option.text}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-0"
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>
                
                <button
                  onClick={onSkip}
                  className="text-gray-400 font-bold hover:text-orange-500 transition-colors"
                >
                  Skip Quiz
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Voice Button */}
      <button className="fixed bottom-8 left-8 w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-110 transition-transform">
        <Mic size={32} />
      </button>
    </div>
  );
}
