import { useState } from 'react';
import { 
  Brain, Clock, CheckCircle2, XCircle, ChevronRight, 
  RotateCcw, Award, BarChart3, Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface QuizCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  questions: Question[];
}

export default function AptitudeQuiz() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{questionId: number, selected: number, correct: number}[]>([]);

  const categories: QuizCategory[] = [
    {
      id: 'logical',
      title: 'Logical Reasoning',
      description: 'Test your problem-solving and analytical skills.',
      icon: Brain,
      color: 'bg-purple-500',
      questions: [
        {
          id: 1,
          text: 'Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?',
          options: ['(1/3)', '(1/8)', '(2/8)', '(1/16)'],
          correctAnswer: 1
        },
        {
          id: 2,
          text: 'SCD, TEF, UGH, ____, WKL',
          options: ['CMN', 'UJI', 'VIJ', 'IJT'],
          correctAnswer: 2
        },
        {
          id: 3,
          text: 'Which word does NOT belong with the others?',
          options: ['Index', 'Glossary', 'Chapter', 'Book'],
          correctAnswer: 3
        }
      ]
    },
    {
      id: 'verbal',
      title: 'Verbal Ability',
      description: 'Assess your grammar, vocabulary, and comprehension.',
      icon: Award,
      color: 'bg-blue-500',
      questions: [
        {
          id: 1,
          text: 'Choose the correct synonym for: CANDID',
          options: ['Apparent', 'Explicit', 'Frank', 'Bright'],
          correctAnswer: 2
        },
        {
          id: 2,
          text: 'Find the correctly spelt word.',
          options: ['Adolescent', 'Adolscent', 'Adolesent', 'Adolescant'],
          correctAnswer: 0
        },
        {
          id: 3,
          text: 'Antonym of: ARTIFICIAL',
          options: ['Red', 'Natural', 'Truthful', 'Solid'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'quant',
      title: 'Quantitative Aptitude',
      description: 'Evaluate your numerical and mathematical ability.',
      icon: BarChart3,
      color: 'bg-green-500',
      questions: [
        {
          id: 1,
          text: 'What is the average of the first 50 natural numbers?',
          options: ['25.30', '25.5', '25.00', '12.25'],
          correctAnswer: 1
        },
        {
          id: 2,
          text: 'If A is 150% of B, then B is what percent of (A + B)?',
          options: ['33.33%', '40%', '75%', '80%'],
          correctAnswer: 1
        },
        {
          id: 3,
          text: 'A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?',
          options: ['120 metres', '180 metres', '324 metres', '150 metres'],
          correctAnswer: 3
        }
      ]
    }
  ];

  const handleStartQuiz = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    setSelectedOption(null);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (activeCategory && selectedOption !== null) {
      const category = categories.find(c => c.id === activeCategory);
      if (!category) return;

      const currentQuestion = category.questions[currentQuestionIndex];
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      
      if (isCorrect) setScore(score + 1);
      
      setAnswers([...answers, {
        questionId: currentQuestion.id,
        selected: selectedOption,
        correct: currentQuestion.correctAnswer
      }]);

      if (currentQuestionIndex < category.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }
  };

  const handleRetake = () => {
    setActiveCategory(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const currentCategory = categories.find(c => c.id === activeCategory);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Aptitude Quiz</h1>
        <p className="text-gray-500 mt-1">Test your skills and prepare for competitive exams.</p>
      </div>

      <AnimatePresence mode="wait">
        {!activeCategory ? (
          /* Category Selection */
          <motion.div 
            key="categories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {categories.map((category) => (
              <div 
                key={category.id}
                className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group"
                onClick={() => handleStartQuiz(category.id)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 ${category.color} shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}>
                  <category.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-500 text-sm mb-6">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1 rounded-full">
                    {category.questions.length} Questions
                  </span>
                  <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Play size={20} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        ) : !showResult && currentCategory ? (
          /* Quiz Interface */
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 max-w-3xl mx-auto"
          >
            {/* Quiz Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentCategory.title}</h2>
                <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {currentCategory.questions.length}</p>
              </div>
              <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full font-medium text-sm">
                <Clock size={16} />
                <span>05:00</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
              <div 
                className="bg-orange-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / currentCategory.questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-900 leading-relaxed">
                {currentCategory.questions[currentQuestionIndex].text}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentCategory.questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between ${
                    selectedOption === index 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  {selectedOption === index && (
                    <CheckCircle2 size={20} className="text-orange-500" />
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
                className="px-8 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {currentQuestionIndex === currentCategory.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Results Screen */
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <Award size={48} />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
            <p className="text-gray-500 mb-8">Here is how you performed in {currentCategory?.title}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Score</p>
                <p className="text-2xl font-black text-gray-900">{score}/{currentCategory?.questions.length}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Accuracy</p>
                <p className="text-2xl font-black text-blue-600">
                  {currentCategory ? Math.round((score / currentCategory.questions.length) * 100) : 0}%
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Time</p>
                <p className="text-2xl font-black text-orange-500">02:14</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button 
                onClick={handleRetake}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <RotateCcw size={20} />
                Back to Categories
              </button>
              <button 
                onClick={() => handleStartQuiz(currentCategory!.id)}
                className="px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
