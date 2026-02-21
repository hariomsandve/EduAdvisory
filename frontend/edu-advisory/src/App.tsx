/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LoadingPage from './components/LoadingPage';
import LandingPage from './components/LandingPage';
import RoleSelection, { UserRole } from './components/RoleSelection';
import Advisor from './components/Advisor';
import AuthPage from './components/AuthPage';
import { motion, AnimatePresence } from 'motion/react';

type AppView = 'loading' | 'landing' | 'roleSelection' | 'advisor' | 'auth';

export default function App() {
  const [view, setView] = useState<AppView>('loading');
  const [role, setRole] = useState<UserRole | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setView('advisor');
  };

  const handleAuthStart = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setView('auth');
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
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

        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage 
              onStart={() => setView('roleSelection')} 
              onAuth={handleAuthStart}
            />
          </motion.div>
        )}

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
              onSuccess={() => setView('roleSelection')}
            />
          </motion.div>
        )}

        {view === 'roleSelection' && (
          <motion.div
            key="roleSelection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RoleSelection 
              onSelect={handleRoleSelect} 
              onBack={() => setView('landing')} 
            />
          </motion.div>
        )}

        {view === 'advisor' && (
          <motion.div
            key="advisor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Advisor onBack={() => setView('roleSelection')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
