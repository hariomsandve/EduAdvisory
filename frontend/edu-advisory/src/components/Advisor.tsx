import { useState } from 'react';
import { getEducationalAdvice, AdvisoryResponse } from '../services/gemini';
import { Search, BookOpen, GraduationCap, ArrowRight, Loader2, Sparkles, ArrowLeft } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

interface AdvisorProps {
  onBack: () => void;
}

export default function Advisor({ onBack }: AdvisorProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdvisoryResponse | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await getEducationalAdvice(query);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      <header className="mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4"
        >
          <Sparkles size={14} />
          AI-Powered Guidance
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Your Personal Education Advisor
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ask about career paths, course selections, or learning resources. 
          Get tailored advice powered by advanced AI.
        </p>
      </header>

      <form onSubmit={handleSearch} className="relative mb-12">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., How do I become a data scientist starting from zero?"
          className="w-full px-6 py-4 pr-16 text-lg rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 px-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="text-green-600" />
                Expert Advice
              </h2>
              <div className="prose prose-green max-w-none text-gray-700">
                <Markdown>{result.advice}</Markdown>
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
              <section className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="text-green-600" size={20} />
                  Recommended Paths
                </h3>
                <div className="space-y-4">
                  {result.recommendedPaths.map((path, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900">{path.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                          path.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          path.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {path.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{path.description}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <ArrowRight className="text-green-600" size={20} />
                  Useful Resources
                </h3>
                <div className="grid gap-3">
                  {result.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:bg-green-50 hover:border-green-100 transition-all group"
                    >
                      <span className="font-medium text-gray-700 group-hover:text-green-700">{res.name}</span>
                      <ArrowRight size={16} className="text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!result && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            "Career Change Advice",
            "University Selection",
            "Skill Development"
          ].map((topic, i) => (
            <div key={i} className="p-6 bg-white rounded-3xl border border-gray-100 text-center">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-green-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{topic}</h4>
              <p className="text-sm text-gray-500">Get specialized guidance for your {topic.toLowerCase()}.</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
