import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, ArrowLeft, ChevronDown } from 'lucide-react';

interface AuthPageProps {
  initialMode: 'login' | 'signup';
  onBack: () => void;
  onSuccess: () => void;
}

export default function AuthPage({ initialMode, onBack, onSuccess }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth success
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-50 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors group"
      >
        <ArrowLeft size={20} className="text-gray-600 group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Animation Side */}
      <div className="w-full lg:w-1/2 h-[300px] lg:h-screen lg:sticky lg:top-0 bg-gray-50 relative overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Using a high-quality placeholder video as signup_animation.mp4 is not provided */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center p-12 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-green-400">Edu</span>-<span className="text-orange-400">Advisory</span>
            </h2>
            <p className="text-lg text-white/90 max-w-md mx-auto">
              Empowering your future with AI-driven educational and career guidance.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 overflow-y-auto">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {mode === 'signup' ? (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                <p className="text-gray-500 mb-10">Join the Advisory community – your career growth partner.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                    <div className="relative">
                      <select 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all appearance-none bg-white text-gray-700"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>Select your category</option>
                        <option value="general">General (Open)</option>
                        <option value="obc">OBC (Other Backward Classes)</option>
                        <option value="sc">SC (Scheduled Caste)</option>
                        <option value="st">ST (Scheduled Tribe)</option>
                        <option value="ews">EWS (Economically Weaker Section)</option>
                        <option value="vj_nt">VJ / NT (Vimukta Jati / Nomadic Tribes)</option>
                        <option value="sbc">SBC (Special Backward Class)</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
                    <div className="relative">
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all shadow-lg shadow-green-100 mt-4"
                  >
                    Sign up
                  </button>
                </form>

                <p className="text-center mt-8 text-gray-600">
                  Already have an account?{' '}
                  <button 
                    onClick={() => setMode('login')}
                    className="font-bold text-gray-900 hover:underline"
                  >
                    Login
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-500 mb-10">Log in to continue your journey with Edu-Advisory.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-900">Password</label>
                      <button type="button" className="text-sm text-green-600 hover:underline font-medium">Forgot password?</button>
                    </div>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all shadow-lg shadow-green-100 mt-4"
                  >
                    Log in
                  </button>
                </form>

                <p className="text-center mt-8 text-gray-600">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setMode('signup')}
                    className="font-bold text-gray-900 hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
