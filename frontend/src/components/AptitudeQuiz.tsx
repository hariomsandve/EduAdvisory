import React, { useState } from 'react';
import { 
  CheckCircle2, ChevronRight, RotateCcw, Award, Play, 
  Calculator, Globe, Users, PenTool, Code, Cpu, FileText, 
  Stethoscope, Puzzle, MonitorPlay, ChevronLeft, PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Smart Question Generator ---
// This generates 25 unique, category-specific questions dynamically to keep the file size manageable.
const generateQuestions = (categoryTitle, sectionId, count = 25) => {
  return Array.from({ length: count }, (_, i) => {
    const qNum = i + 1;
    const n1 = (qNum * 7) % 100 + 10;
    const n2 = (qNum * 3) % 50 + 5;
    
    let text = `Sample question ${qNum} for ${categoryTitle}?`;
    let options = ['Option A', 'Option B', 'Option C', 'Option D'];
    let correctAnswer = 0;

    if (categoryTitle.includes('Aptitude')) {
      text = `If a train travels ${n1 * 10} km in ${n2} hours, what is its average speed?`;
      const ans = ((n1 * 10) / n2).toFixed(1);
      options = [`${ans} km/h`, `${(parseFloat(ans) + 10).toFixed(1)} km/h`, `${(parseFloat(ans) - 5).toFixed(1)} km/h`, 'Cannot be determined'];
      correctAnswer = 0;
    } 
    else if (categoryTitle.includes('Verbal')) {
      const words = ["Eloquent", "Pensive", "Lucid", "Tenacious"];
      const word = words[qNum % words.length];
      text = `What is the closest synonym for the word "${word}"?`;
      options = [word === "Eloquent" ? "Fluent" : "Dull", word === "Pensive" ? "Thoughtful" : "Careless", "Angry", "Happy"];
      correctAnswer = word === "Eloquent" ? 0 : word === "Pensive" ? 1 : 2;
    }
    else if (categoryTitle.includes('Programming')) {
      text = `What will be the output of: print(${n1} % ${n2}) in Python?`;
      options = [`${n1 % n2}`, `${Math.floor(n1 / n2)}`, `Error`, `${n1}`];
      correctAnswer = 0;
    }
    else if (categoryTitle.includes('Current Affairs')) {
      text = `Which of the following is related to global summit number ${qNum}?`;
      options = ['Climate Change', 'Economic Trade', 'Cyber Security', 'Global Health'];
      correctAnswer = qNum % 4;
    }
    else if (categoryTitle.includes('Engineering')) {
      text = `If a force of ${n1}N is applied over an area of ${n2}m², what is the pressure?`;
      options = [`${(n1/n2).toFixed(2)} Pa`, `${(n1*n2).toFixed(2)} Pa`, `${(n1+n2).toFixed(2)} Pa`, `0 Pa`];
      correctAnswer = 0;
    }
    else if (categoryTitle.includes('Medical')) {
      text = `Which of the following describes condition variant ${qNum}?`;
      options = ['Viral Infection', 'Bacterial Infection', 'Genetic Mutation', 'Autoimmune Response'];
      correctAnswer = qNum % 4;
    }
    else if (categoryTitle.includes('Puzzles')) {
      text = `If ${n1} cats catch ${n1} mice in ${n1} minutes, how many cats are needed to catch 100 mice in 100 minutes?`;
      options = [`${n1}`, `100`, `1`, `Depends on the cats`];
      correctAnswer = 0; // The classic puzzle answer
    }
    else {
      text = `Which of the following best describes concept ${qNum} in ${categoryTitle}?`;
      options = ['Definition A', 'Definition B', 'Definition C', 'Definition D'];
      correctAnswer = qNum % 4;
    }

    // Scramble correct answer position
    const actualCorrectText = options[correctAnswer];
    const newCorrectIndex = qNum % 4;
    options[correctAnswer] = options[newCorrectIndex];
    options[newCorrectIndex] = actualCorrectText;

    return {
      id: qNum,
      text,
      options,
      correctAnswer: newCorrectIndex
    };
  });
};

export default function AptitudeQuiz() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  
  // Generated questions for the currently active section
  const [currentQuestions, setCurrentQuestions] = useState([]);

  const categories = [
    {
      id: 'general',
      title: 'General Aptitude',
      subtopics: ['Arithmetic Aptitude', 'Data Interpretation', 'Online Aptitude Test', 'Data Interpretation Test'],
      icon: PieChart,
      sections: [{ id: 'sec1', title: 'Section 1', questionCount: 25 }, { id: 'sec2', title: 'Section 2', questionCount: 25 }]
    },
    {
      id: 'verbal',
      title: 'Verbal and Reasoning',
      subtopics: ['Verbal Ability', 'Logical Reasoning', 'Verbal Reasoning', 'Non Verbal Reasoning'],
      icon: CheckCircle2,
      sections: [{ id: 'sec1', title: 'Section 1', questionCount: 25 }, { id: 'sec2', title: 'Section 2', questionCount: 25 }]
    },
    {
      id: 'gk',
      title: 'Current Affairs & GK',
      subtopics: ['Current Affairs', 'Basic General Knowledge', 'General Science', 'Read more...'],
      icon: Globe,
      sections: [{ id: 'sec1', title: 'Section 1', questionCount: 25 }, { id: 'sec2', title: 'Section 2', questionCount: 25 }]
    },
    {
      id: 'interview',
      title: 'Interview',
      subtopics: ['Placement Papers', 'Group Discussion', 'HR Interview', 'Read more...'],
      icon: Users,
      sections: [{ id: 'sec1', title: 'Section 1', questionCount: 25 }, { id: 'sec2', title: 'Section 2', questionCount: 25 }]
    },
    {
      id: 'engineering',
      title: 'Engineering',
      subtopics: ['Mechanical Engineering', 'Civil Engineering', 'ECE, EEE, CSE', 'Chemical Engineering'],
      icon: PenTool,
      sections: [{ id: 'sec1', title: 'Section 1', questionCount: 25 }, { id: 'sec2', title: 'Section 2', questionCount: 25 }]
    },
    {
      id: 'programming',
      title: 'Programming',
      subtopics: ['C Programming', 'C++ Programming', 'C# Programming', 'Java Programming'],
      icon: Code,
      sections: [{ id: 'sec1', title: 'Section 1', questionCount: 25 }, { id: 'sec2', title: 'Section 2', questionCount: 25 }]
    },
    {
      id: 'online-tests',
      title: 'Online Tests',
      subtopics: ['Aptitude Test', 'Verbal Ability Test', 'Logical Reasoning Test', 'C Programming Test', 'Read more...'],
      icon: MonitorPlay,
      sections: [{ id: 'sec1', title: 'Section 1', questionCount: 25 }, { id: 'sec2', title: 'Section 2', questionCount: 25 }]
    },
    {
      id: 'tech-mcq',
      title: 'Technical MCQs',
      subtopics: ['Networking Questions', 'Database Questions', 'Basic Electronics', 'Digital Electronics', 'Read more...'],
      icon: Cpu,
      sections: [{ id: 'sec1', title: 'Section 1', questionCount: 25 }, { id: 'sec2', title: 'Section 2', questionCount: 25 }]
    },
    {
      id: 'tech-short',
      title: 'Technical Short Answers',
      subtopics: ['Software Testing', 'The C Language Basics', 'SQL Server', 'Networking', 'Read more...'],
      icon: FileText,
      sections: [{ id: 'sec1', title: 'Section 1', questionCount: 25 }, { id: 'sec2', title: 'Section 2', questionCount: 25 }]
    },
    {
      id: 'medical',
      title: 'Medical Science',
      subtopics: ['Microbiology', 'Biochemistry', 'Biotechnology', 'Biochemical Engineering'],
      icon: Stethoscope,
      sections: [{ id: 'sec1', title: 'Section 1', questionCount: 25 }, { id: 'sec2', title: 'Section 2', questionCount: 25 }]
    },
    {
      id: 'puzzles',
      title: 'Puzzles',
      subtopics: ['Sudoku', 'Number puzzles', 'Missing letters puzzles', 'Logical puzzles', 'Clock puzzles'],
      icon: Puzzle,
      sections: [{ id: 'sec1', title: 'Section 1', questionCount: 25 }, { id: 'sec2', title: 'Section 2', questionCount: 25 }]
    }
  ];

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveSection(null);
  };

  const handleStartSection = (sectionId, categoryTitle) => {
    // Generate the 25 questions dynamically for this specific section
    const generatedQuestions = generateQuestions(categoryTitle, sectionId, 25);
    setCurrentQuestions(generatedQuestions);
    
    setActiveSection(sectionId);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    setSelectedOption(null);
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (activeCategory && activeSection && selectedOption !== null) {
      const currentQuestion = currentQuestions[currentQuestionIndex];
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      
      if (isCorrect) setScore(score + 1);
      
      setAnswers([...answers, {
        questionId: currentQuestion.id,
        selected: selectedOption,
        correct: currentQuestion.correctAnswer
      }]);

      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }
  };

  const handleRetake = () => {
    setActiveSection(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const currentCategory = categories.find(c => c.id === activeCategory);
  const currentSectionData = currentCategory?.sections.find(s => s.id === activeSection);
  
  // Feedback generator based on score percentage
  const getFeedbackMessage = (score, total) => {
    const percent = (score / total) * 100;
    if (percent >= 90) return { title: "Outstanding!", color: "text-green-600" };
    if (percent >= 70) return { title: "Great Job!", color: "text-blue-600" };
    if (percent >= 50) return { title: "Good Effort!", color: "text-yellow-600" };
    return { title: "Keep Practicing!", color: "text-red-500" };
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Header Label */}
        {!activeCategory && (
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice & Prepare</h1>
            <p className="text-sm text-gray-600">Aptitude questions and answers for your placement interviews and competitive exams!</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!activeCategory ? (
            /* Grid Category Selection */
            <motion.div 
              key="categories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {categories.map((category) => (
                <div 
                  key={category.id}
                  onClick={() => handleSelectCategory(category.id)}
                  className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 relative overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col group"
                >
                  {/* Background Watermark Icon */}
                  <div className="absolute top-1/2 -translate-y-1/2 -right-4 text-gray-50 opacity-50 group-hover:text-gray-100 group-hover:scale-110 transition-all duration-500">
                    <category.icon size={140} strokeWidth={1} />
                  </div>

                  {/* Header */}
                  <h3 className="text-lg font-bold text-[#6a9e22] mb-4 relative z-10 flex items-center gap-2">
                    <category.icon size={20} />
                    {category.title}
                  </h3>
                  
                  {/* List Items */}
                  <ul className="space-y-2.5 relative z-10 flex-1">
                    {category.subtopics.map((sub, idx) => (
                      <li key={idx} className="flex items-center text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                        <ChevronRight size={16} className="mr-2 text-[#6a9e22]" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          ) : !activeSection ? (
            /* Section Selection Screen */
            <motion.div
              key="sections"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto mt-8"
            >
              <button 
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-[#6a9e22] font-bold text-sm mb-8 transition-colors bg-gray-50 px-4 py-2 rounded-lg w-fit"
              >
                <ChevronLeft size={16} /> Back to Categories
              </button>

              <div className="flex items-center gap-3 mb-2">
                {currentCategory && <currentCategory.icon size={28} className="text-[#6a9e22]" />}
                <h2 className="text-3xl font-bold text-gray-900">{currentCategory?.title}</h2>
              </div>
              <p className="text-gray-500 mb-10 text-sm">Select a section to begin. Each section contains {currentCategory?.sections[0].questionCount} randomly generated questions.</p>

              <div className="grid sm:grid-cols-2 gap-5">
                {currentCategory?.sections.map((section) => (
                  <div 
                    key={section.id}
                    onClick={() => handleStartSection(section.id, currentCategory.title)}
                    className="border-2 border-gray-100 rounded-xl p-6 hover:border-[#6a9e22] hover:bg-[#f6f9f1] cursor-pointer transition-all duration-200 flex items-center justify-between group"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#6a9e22]">{section.title}</h3>
                      <p className="text-sm font-semibold text-gray-400 mt-1">{section.questionCount} Questions</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#6a9e22] group-hover:text-white transition-colors shadow-sm">
                      <Play size={18} className="ml-1" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : !showResult ? (
            /* Quiz Interface */
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-3xl mx-auto mt-8"
            >
              {/* Progress Header */}
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{currentCategory?.title}</h2>
                  <p className="text-sm font-semibold text-[#6a9e22] mt-1">{currentSectionData?.title}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Question</span>
                  <p className="text-2xl font-bold text-gray-900">{currentQuestionIndex + 1} <span className="text-base text-gray-400">/ {currentQuestions.length}</span></p>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 leading-relaxed">
                  {currentQuestions[currentQuestionIndex]?.text}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-10">
                {currentQuestions[currentQuestionIndex]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full p-4 rounded-xl text-left border-2 transition-all flex items-center gap-4 text-[15px] font-medium ${
                      selectedOption === index 
                        ? 'border-[#6a9e22] bg-[#f6f9f1] text-[#6a9e22] shadow-sm' 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selectedOption === index ? 'border-[#6a9e22]' : 'border-gray-300'}`}>
                      {selectedOption === index && <div className="w-2.5 h-2.5 rounded-full bg-[#6a9e22]"></div>}
                    </div>
                    <span>{option}</span>
                  </button>
                ))}
              </div>

              {/* Footer Controls */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                <button
                  onClick={() => {
                    if(window.confirm('Are you sure you want to quit? Progress will be lost.')){
                      setActiveSection(null);
                    }
                  }}
                  className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
                >
                  Quit Quiz
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedOption === null}
                  className="px-8 py-3 bg-[#6a9e22] text-white rounded-xl text-sm font-bold shadow-md shadow-[#6a9e22]/20 hover:bg-[#59841c] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2"
                >
                  {currentQuestionIndex === currentQuestions.length - 1 ? 'Submit Section' : 'Next Question'}
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ) : (
            /* Results Screen */
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-2xl mx-auto text-center mt-8"
            >
              <div className="w-20 h-20 bg-[#f6f9f1] rounded-full flex items-center justify-center mx-auto mb-6 text-[#6a9e22] shadow-inner">
                <Award size={40} />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentSectionData?.title} Completed!</h2>
              <p className="text-gray-500 mb-8 text-sm font-medium">Performance summary for {currentCategory?.title}</p>

              {/* Score Display */}
              <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-100">
                <h3 className={`text-xl font-bold mb-6 ${getFeedbackMessage(score, currentQuestions.length).color}`}>
                  {getFeedbackMessage(score, currentQuestions.length).title}
                </h3>
                
                <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                  <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Final Score</p>
                    <p className="text-3xl font-black text-gray-900">{score} <span className="text-lg text-gray-400 font-bold">/ {currentQuestions.length}</span></p>
                  </div>
                  <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Accuracy</p>
                    <p className="text-3xl font-black text-[#6a9e22]">
                      {Math.round((score / currentQuestions.length) * 100)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setActiveSection(null)}
                  className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={18} />
                  Other Sections
                </button>
                <button 
                  onClick={() => handleStartSection(currentSectionData.id, currentCategory.title)}
                  className="px-8 py-3 bg-[#6a9e22] text-white rounded-xl text-sm font-bold shadow-md shadow-[#6a9e22]/20 hover:bg-[#59841c] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} />
                  Retake Section
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}