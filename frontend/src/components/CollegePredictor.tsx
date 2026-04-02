import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Award, Search, Building2, MapPin, 
  ChevronRight, Calculator, Star, Filter, ArrowRight, RotateCcw
} from 'lucide-react';

interface CollegePrediction {
  id: number;
  name: string;
  category: string;
  type: 'Government' | 'Private';
  address: string;
  rating: number;
  probability: 'High' | 'Medium' | 'Low';
  cutoffIndex: number; // For simulation
}

export default function CollegePredictor() {
  const [examType, setExamType] = useState('JEE Main');
  const [marks, setMarks] = useState('');
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictions, setPredictions] = useState<CollegePrediction[] | null>(null);

  const mockColleges: CollegePrediction[] = [
    { id: 1, name: 'Savitribai Phule Pune University', category: 'Engineering', type: 'Government', address: 'Pune, Maharashtra', rating: 4.7, probability: 'High', cutoffIndex: 95 },
    { id: 2, name: 'COEP Technological University', category: 'Engineering', type: 'Government', address: 'Shivajinagar, Pune', rating: 4.8, probability: 'Medium', cutoffIndex: 98 },
    { id: 3, name: 'PICT Pune', category: 'Computer Science', type: 'Private', address: 'Dhankawadi, Pune', rating: 4.7, probability: 'Medium', cutoffIndex: 97 },
    { id: 4, name: 'VIT Pune', category: 'Technology', type: 'Private', address: 'Bibwewadi, Pune', rating: 4.5, probability: 'High', cutoffIndex: 94 },
    { id: 5, name: 'MIT World Peace University', category: 'Multiple Streams', type: 'Private', address: 'Kothrud, Pune', rating: 4.4, probability: 'High', cutoffIndex: 90 },
    { id: 6, name: 'Walchand College of Engineering', category: 'Engineering', type: 'Government', address: 'Sangli, Maharashtra', rating: 4.6, probability: 'High', cutoffIndex: 93 },
  ];

  const handlePredict = () => {
    if (!marks) {
      alert('Please enter your marks/rank first!');
      return;
    }

    setIsPredicting(true);
    
    // Simulate prediction logic
    setTimeout(() => {
      const score = parseFloat(marks);
      let filtered: CollegePrediction[] = [];
      
      if (examType === 'JEE Main') {
        // Simple percentile-based simulation
        filtered = mockColleges.filter(c => score >= (c.cutoffIndex - 5));
      } else {
        // Fallback or other exam types
        filtered = mockColleges.filter(c => score >= (c.cutoffIndex - 10));
      }

      setPredictions(filtered.sort((a, b) => b.rating - a.rating));
      setIsPredicting(false);
    }, 1200);
  };

  const getProbColor = (prob: string) => {
    switch (prob) {
      case 'High': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">College Predictor</h1>
        <p className="text-gray-500">Enter your competitive exam details to find the best-fit colleges for you.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Filter size={20} className="text-orange-500" />
              Your Details
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Exam</label>
                <select 
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full p-4 rounded-xl bg-gray-50 border-gray-200 border focus:ring-2 focus:ring-orange-200 outline-none transition-all font-medium"
                >
                  <option>JEE Main</option>
                  <option>MHT-CET</option>
                  <option>NEET</option>
                  <option>12th Board</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {examType === 'JEE Main' ? 'Percentile Score' : 'Marks / Percentage'}
                </label>
                <div className="relative">
                  <Calculator size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="number"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    placeholder="e.g., 98.5"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-gray-200 border focus:ring-2 focus:ring-orange-200 outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <button
                onClick={handlePredict}
                disabled={isPredicting}
                className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-md shadow-orange-100 flex items-center justify-center gap-2"
              >
                {isPredicting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    Predict Colleges
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              {predictions && (
                <button 
                  onClick={() => { setPredictions(null); setMarks(''); }}
                  className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} />
                  Reset Form
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {!predictions && !isPredicting ? (
            <div className="bg-white rounded-[32px] p-12 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center h-[500px]">
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-orange-500">
                <Building2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to find your college?</h3>
              <p className="text-gray-500 max-w-sm">Enter your exam scores on the left to see which institutions you might be eligible for.</p>
            </div>
          ) : isPredicting ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 animate-pulse">
                  <div className="h-6 w-2/3 bg-gray-100 rounded mb-4" />
                  <div className="h-4 w-1/3 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center px-2">
                  <p className="text-gray-500 font-medium">{predictions.length} Colleges Predicted For You</p>
                </div>

                {predictions.length > 0 ? predictions.map((college, index) => (
                  <motion.div
                    key={college.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 group-hover:border-orange-200 transition-colors">
                          <Building2 className="text-gray-400 group-hover:text-orange-500" size={28} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors uppercase">{college.name}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin size={14} className="text-orange-500" />
                              {college.address}
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="font-medium text-gray-700">{college.category}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center md:flex-col md:items-end justify-between gap-2">
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getProbColor(college.probability)}`}>
                          Admission Probability: {college.probability}
                        </div>
                        <div className="flex items-center gap-1.5 text-yellow-500 font-bold">
                          <Star size={16} fill="currentColor" />
                          {college.rating}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap justify-between items-center gap-4">
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-500">{college.type}</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase">Cutoff: ~{college.cutoffIndex}%</span>
                      </div>
                      <button className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:underline">
                        View Detailed Cutoffs
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )) : (
                  <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center">
                    <p className="text-gray-500">No colleges match your current score. Try exploring other options or streams.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
