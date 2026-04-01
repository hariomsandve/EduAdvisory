/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LoadingPage from './components/LoadingPage';
import LandingPage from './components/LandingPage';
import RoleSelection, { UserRole } from './components/RoleSelection';
import InterestSelection from './components/InterestSelection';
import CareerQuiz from './components/CareerQuiz';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ParentDashboard from './components/ParentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import QuizResult from './components/QuizResult';
import { motion, AnimatePresence } from 'framer-motion';

type AppView =
  | 'loading'
  | 'landing'
  | 'roleSelection'
  | 'interestSelection'
  | 'careerQuiz'
  | 'auth'
  | 'dashboard'
  | 'quizResult';

export default function App() {
  const [view, setView] = useState<AppView>('loading');
  const [role, setRole] = useState<UserRole | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [userData, setUserData] = useState<{
    userName?: string;
    selectedClass?: string;
    selectedInterests?: string[];
    quizCompleted?: boolean;
    quizResults?: any;
  }>({});

  const [registeredUsers, setRegisteredUsers] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('registeredUsers');
    return saved ? JSON.parse(saved) : {};
  });

  // 🔹 ROLE SELECT
  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setAuthMode('signup');
    setView('auth');
  };

  // 🔹 INTEREST COMPLETE
  const handleInterestComplete = (data: {
    selectedClass: string;
    selectedInterests: string[];
  }) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setView('careerQuiz');
  };

  // 🔹 QUIZ COMPLETE
  const handleQuizComplete = (results: any) => {
    setUserData((prev) => ({
      ...prev,
      quizResults: results,
      quizCompleted: true,
    }));
    setView('quizResult');
  };

  // 🔹 QUIZ SKIP
  const handleQuizSkip = () => {
    setUserData((prev) => ({ ...prev, quizCompleted: false }));
    setView('dashboard');
  };

  // 🔹 AUTH START
  const handleAuthStart = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setView('auth');
  };

  const handleSignUpClick = () => {
    setView('roleSelection');
  };

  // 🔹 AUTH SUCCESS (🔥 FIXED LOGIC)
  const handleAuthSuccess = (
    mode: 'login' | 'signup',
    data: { name?: string; email: string }
  ) => {
    let currentUserName = data.name;

    if (mode === 'signup' && data.name && data.email) {
      const newUsers = { ...registeredUsers, [data.email]: data.name };
      setRegisteredUsers(newUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(newUsers));
      currentUserName = data.name;
    } else if (mode === 'login' && data.email) {
      const storedName = registeredUsers[data.email];
      if (storedName) {
        currentUserName = storedName;
      } else {
        const prefix = data.email.split('@')[0];
        currentUserName =
          prefix.charAt(0).toUpperCase() + prefix.slice(1);
      }
    }

    if (currentUserName) {
      setUserData((prev) => ({ ...prev, userName: currentUserName }));
    }

    // ✅ FINAL FLOW FIX
    if (mode === 'login') {
      setView('dashboard');
    } else {
      if (role === 'parent' || role === 'teacher') {
        setView('dashboard');
      } else {
        setView('interestSelection');
      }
    }
  };

  // 🔹 LOGOUT
  const handleLogout = () => {
    setUserData({});
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AnimatePresence mode="wait">

        {/* 🔹 LOADING */}
        {view === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingPage onComplete={() => setView('landing')} />
          </motion.div>
        )}

        {/* 🔹 LANDING */}
        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage
              onAuth={handleAuthStart}
              onSignUpClick={handleSignUpClick}
            />
          </motion.div>
        )}

        {/* 🔹 AUTH */}
        {view === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AuthPage
              initialMode={authMode}
              onBack={() => setView('landing')}
              onSuccess={handleAuthSuccess}
            />
          </motion.div>
        )}

        {/* 🔹 ROLE SELECTION */}
        {view === 'roleSelection' && (
          <motion.div key="roleSelection" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <RoleSelection
              onSelect={handleRoleSelect}
              onBack={() => setView('landing')}
            />
          </motion.div>
        )}

        {/* 🔹 INTEREST */}
        {view === 'interestSelection' && (
          <motion.div key="interestSelection" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <InterestSelection onComplete={handleInterestComplete} />
          </motion.div>
        )}

        {/* 🔹 QUIZ */}
        {view === 'careerQuiz' && (
          <motion.div key="careerQuiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CareerQuiz
              userData={userData as any}
              onComplete={handleQuizComplete}
              onSkip={handleQuizSkip}
            />
          </motion.div>
        )}

        {/* 🔹 QUIZ RESULT */}
        {view === 'quizResult' && (
          <motion.div key="quizResult" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <QuizResult
              onDashboard={() => setView('dashboard')}
              onRetake={() => setView('careerQuiz')}
            />
          </motion.div>
        )}

        {/* 🔹 DASHBOARD */}
        {view === 'dashboard' && (
          <motion.div key="dashboard" className="w-full h-screen">
            {role === 'parent' ? (
              <ParentDashboard
                userName={userData.userName}
                onLogout={handleLogout}
              />
            ) : role === 'teacher' ? (
              <TeacherDashboard
                userName={userData.userName}
                onLogout={handleLogout}
              />
            ) : (
              <Dashboard
                onNavigate={(view) => setView(view as AppView)}
                onLogout={handleLogout}
                userName={userData.userName}
              />
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}