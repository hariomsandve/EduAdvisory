import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Lock, Bell, Shield, Palette, Globe, Link as LinkIcon,
  CreditCard, Database, Accessibility, Save,
  Moon, Check, CheckCircle2, Trash2, Download, Eye, EyeOff,
  Camera, Sparkles, X, Smartphone, History,
  LogOut, Zap, Languages,
  Volume2, Search, Settings as SettingsIcon,
  Loader2, Star, Crown, MoreHorizontal,
  GlobeIcon, Contrast,
  ShieldCheck, Users, Baby, Heart,
  Bell as BellIcon, MessageSquare, Mail, MapPin,
  CreditCard as CardIcon, FileText, RotateCcw,
  Home, Coins, BarChart2, Type, Layout, Info
} from 'lucide-react';

// --- Shared Internal Components ---

const Card = ({ children, title, icon: Icon, description, badge }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-8 relative overflow-hidden"
  >
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        {Icon && <div className="w-12 h-12 bg-green-50 dark:bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center"><Icon size={22} /></div>}
        <div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{title}</h3>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{description}</p>
        </div>
      </div>
      {badge && (
        <div className="px-4 py-1.5 bg-green-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-200/50">
          {badge}
        </div>
      )}
    </div>
    {children}
  </motion.div>
);

const Toggle = ({ label, description, enabled, onChange, icon: Icon }: any) => (
  <button
    onClick={() => onChange(!enabled)}
    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-[1.5rem] group"
  >
    <div className="flex items-center gap-4 text-left">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${enabled ? 'bg-green-50 dark:bg-green-500/10 text-green-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 group-hover:scale-110'}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[14px] font-black text-gray-900 dark:text-white leading-none mb-1">{label}</p>
        <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 tracking-tight">{description}</p>
      </div>
    </div>
    <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${enabled ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'}`}>
      <motion.div animate={{ x: enabled ? 24 : 0 }} className="w-4 h-4 bg-white rounded-full shadow-sm" />
    </div>
  </button>
);

// --- Story Navigation (Instagram Style) ---
const StoryNav = ({ active, onClick, sections }: any) => (
  <div className="flex gap-6 overflow-x-auto no-scrollbar py-8 px-4 mb-4">
    {sections.map((s: any) => (
      <button
        key={s.id}
        onClick={() => onClick(s.id)}
        className="flex flex-col items-center gap-3 group shrink-0"
      >
        <div className={`w-20 h-20 rounded-full p-[4px] transition-all duration-500 transform ${active === s.id
            ? `bg-gradient-to-tr from-green-600 via-green-400 to-emerald-400 scale-110 shadow-xl shadow-green-100`
            : 'bg-gray-100 dark:bg-gray-700 group-hover:scale-105'
          }`}>
          <div className={`w-full h-full rounded-full ${active === s.id ? 'bg-white' : 'bg-white dark:bg-gray-800'} flex items-center justify-center text-gray-800`}>
            <s.icon size={28} className={active === s.id ? 'text-green-600' : 'text-gray-400 dark:text-gray-500'} />
          </div>
        </div>
        <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${active === s.id ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
          {s.label.split(' ')[0]}
        </span>
      </button>
    ))}
  </div>
);

// --- Guardian Profile Header ---
const GuardianProfileHeader = ({ data, onBioGenerate, isGenerating, progress }: any) => (
  <Card title="Guardian Profile" description="Identity & Parental Role" icon={User} badge="Guardian">
    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-green-600 to-emerald-400 opacity-90" />
    <div className="relative pt-16 flex flex-col md:flex-row items-end gap-6 mb-10">
      <div className="relative group/avatar cursor-pointer">
        <div className="w-32 h-32 rounded-full border-[6px] border-white dark:border-gray-800 shadow-2xl overflow-hidden bg-white">
          <img src="https://i.pravatar.cc/300?u=parent_guardian" className="w-full h-full object-cover" alt="Profile" />
        </div>
        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-white">
          <Camera size={24} />
        </div>
      </div>
      <div className="flex-1 pb-2">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-1">{data.parentName || 'Set Name'}</h2>
        <p className="text-sm font-bold text-gray-500 flex items-center gap-2">
          <Shield size={14} className="text-green-500" /> {data.parentRole || 'Guardian'} • @{data.handle || 'guardian'}
        </p>
      </div>
      <div className="flex gap-3 pb-2">
        <button className="px-8 py-3 bg-green-600 text-white rounded-full font-black text-xs shadow-xl shadow-green-200/50 hover:scale-105 transition-all">Verify Identity</button>
        <button className="p-3 border-2 border-gray-100 dark:border-gray-700 rounded-full text-gray-400 hover:border-green-200 hover:text-green-500 transition-all"><MoreHorizontal size={22} /></button>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-10">
      <div className="md:col-span-2 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Parent Bio</h4>
          <button onClick={onBioGenerate} className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest hover:scale-105 transition-all">
            {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            {isGenerating ? 'AI Thinking...' : 'AI Bio'}
          </button>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-[1.8] italic">
          "{data.bio || 'Empowering your child\'s journey with love and insight. Let AI help craft your guardian story.'}"
        </p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest">Profile Score</p>
            <span className="text-xs font-black text-green-600">{progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-white dark:bg-gray-800 rounded-full overflow-hidden shadow-inner border border-gray-50 dark:border-gray-700">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-green-600 via-green-400 to-emerald-400" />
          </div>
        </div>
        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 leading-tight mt-4">
          Add {Math.ceil((100 - progress) / 20)} more details to complete your profile!
        </p>
      </div>
    </div>
  </Card>
);

// --- Main Parent Settings Component ---

export default function ParentSettings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMsg, setToastMsg] = useState('Settings saved');

  const [formData, setFormData] = useState({
    // Profile
    parentName: 'Meera Kapoor',
    email: 'meera@family.com',
    handle: 'meera_parent',
    bio: 'Devoted parent of two bright learners, believing that education is the greatest gift. Passionate about bridging home and school.',
    parentRole: 'Primary Guardian',
    phone: '+91 98765 43210',
    // Children
    childrenNames: 'Alex (11th), Sarah (9th)',
    numChildren: 2,
    childrenAlerts: true,
    attendanceAlerts: true,
    gradeAlerts: true,
    // Security
    twoFactorEnabled: true,
    loginAlerts: true,
    // Notifications
    emailAlerts: true,
    pushAlerts: true,
    weeklyDigest: true,
    instantAlerts: true,
    isDND: false,
    dndStart: '22:00',
    dndEnd: '07:00',
    // Privacy
    profileVisibility: 'guardians',
    dataSharing: false,
    activityTracking: true,
    // Appearance
    isDarkMode: false,
    themeColor: 'green',
    fontSize: 'medium',
    uiDensity: 'modern',
    highContrast: false,
    motionReduction: false,
    // Language & Region
    language: 'English',
    region: 'India (Maharashtra)',
    timezone: 'GMT +5:30 (Auto)',
    // Plan
    plan: 'Family Premium',
  });

  useEffect(() => {
    const saved = localStorage.getItem('parent_settings_master_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Storage corrupt', e);
      }
    }
  }, []);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('parent_settings_master_v1', JSON.stringify(formData));
      setIsSaving(false);
      setToastMsg('Guardian Vault Updated ✓');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  const generateAIBio = () => {
    setIsGenerating(true);
    setTimeout(() => {
      updateField('bio', 'A dedicated guardian blending empathy with strategy to help my children thrive academically and personally. Active partner in their educational journey, always one step ahead.');
      setIsGenerating(false);
    }, 1500);
  };

  const sections = [
    { id: 'profile',        label: 'Identity',   icon: User,        desc: 'Profile & Handle' },
    { id: 'children',       label: 'Children',   icon: Baby,        desc: 'Wards & Alerts' },
    { id: 'security',       label: 'Security',   icon: Shield,      desc: 'Vault & 2FA' },
    { id: 'notifications',  label: 'Alerts',     icon: Bell,        desc: 'Notify & DND' },
    { id: 'privacy',        label: 'Privacy',    icon: ShieldCheck, desc: 'Visibility & Data' },
    { id: 'appearance',     label: 'Design',     icon: Palette,     desc: 'Theme & Font' },
    { id: 'language',       label: 'Locale',     icon: Languages,   desc: 'Region & Time' },
    { id: 'billing',        label: 'Plan',       icon: Crown,       desc: 'Family Tier' },
    { id: 'data',           label: 'Records',    icon: Database,    desc: 'Export & Backup' },
    { id: 'accessibility',  label: 'Assist',     icon: Accessibility, desc: 'Helper Tools' },
  ];

  const calculateProgress = () => {
    let score = 20;
    if (formData.parentName !== 'Set Name') score += 20;
    if (formData.bio && formData.bio.length > 30) score += 20;
    if (formData.phone) score += 20;
    if (formData.twoFactorEnabled) score += 20;
    return Math.min(100, score);
  };

  return (
    <div className={`max-w-7xl mx-auto min-h-screen p-4 md:p-8 font-sans transition-colors duration-700 ${formData.isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50/30'} pb-40`}>

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 px-2">
        <div className="flex items-center gap-5">
          <motion.div
            whileHover={{ rotate: 90 }}
            className="w-14 h-14 rounded-[1.5rem] bg-green-600 flex items-center justify-center text-white shadow-2xl shadow-green-900/20"
          >
            <SettingsIcon size={28} />
          </motion.div>
          <div>
            <h1 className={`text-4xl font-black tracking-tighter leading-none mb-1 ${formData.isDarkMode ? 'text-white' : 'text-gray-900'}`}>Guardian Hub</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Parent Portal v2.0 • Secure Sync Active</p>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-xl relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search guardian settings..."
            className={`w-full h-14 pl-16 pr-6 ${formData.isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-100 text-gray-900'} rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-green-500/10 border-2 transition-all font-bold text-sm`}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full ring-4 ring-white dark:ring-gray-700 shadow-xl overflow-hidden">
            <img src="https://i.pravatar.cc/100?u=parent_guardian" className="w-full h-full object-cover" alt="Guardian" />
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* Main Workspace */}
        <div className="flex-1 min-w-0">

          <StoryNav active={activeSection} onClick={setActiveSection} sections={sections} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >

              {/* SECTION 1: PROFILE */}
              {activeSection === 'profile' && (
                <>
                  <GuardianProfileHeader data={formData} onBioGenerate={generateAIBio} isGenerating={isGenerating} progress={calculateProgress()} />

                  <Card title="Quick Toggles" description="Instant Guardian Controls" icon={Zap}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {[
                        { l: 'Dark Mode',    i: Moon,       v: formData.isDarkMode,        f: 'isDarkMode' },
                        { l: 'Silent Mode',  i: Volume2,    v: formData.isDND,             f: 'isDND' },
                        { l: 'High Contrast',i: Contrast,   v: formData.highContrast,      f: 'highContrast' },
                        { l: 'Data Share',   i: Eye,        v: formData.dataSharing,       f: 'dataSharing' },
                      ].map((item: any) => (
                        <button
                          key={item.f}
                          onClick={() => updateField(item.f, !item.v)}
                          className={`h-32 rounded-[2.5rem] p-5 flex flex-col justify-between items-start transition-all relative overflow-hidden isolate ${item.v ? 'bg-green-600 text-white shadow-xl rotate-1' : 'bg-gray-50 dark:bg-gray-900/50 text-gray-400 border border-gray-100 dark:border-gray-700 hover:rotate-1'}`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.v ? 'bg-white/20' : 'bg-white dark:bg-gray-800 shadow-sm'}`}>
                            <item.i size={20} />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">{item.l}</span>
                          <div className="absolute -right-4 -bottom-4 opacity-5 -z-10"><item.i size={72} /></div>
                        </button>
                      ))}
                    </div>
                  </Card>

                  <Card title="Profile Fields" description="Editable Guardian Info" icon={Database}>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2 group">
                        <label className="text-[11px] font-black text-gray-400 group-focus-within:text-green-500 transition-colors uppercase tracking-[0.2em] pl-1">Full Name</label>
                        <input
                          type="text"
                          value={formData.parentName}
                          onChange={(e) => updateField('parentName', e.target.value)}
                          className={`w-full px-6 py-4 rounded-2xl border-2 font-black ${formData.isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-transparent text-gray-900'} focus:border-green-500 outline-none transition-all`}
                        />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-[11px] font-black text-gray-400 group-focus-within:text-green-500 transition-colors uppercase tracking-[0.2em] pl-1">Guardian Role</label>
                        <select
                          value={formData.parentRole}
                          onChange={(e) => updateField('parentRole', e.target.value)}
                          className={`w-full px-6 py-4 rounded-2xl border-2 font-black ${formData.isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-transparent text-gray-900'} focus:border-green-500 outline-none transition-all appearance-none cursor-pointer`}
                        >
                          <option>Primary Guardian</option>
                          <option>Father</option>
                          <option>Mother</option>
                          <option>Grandparent</option>
                          <option>Legal Guardian</option>
                        </select>
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-[11px] font-black text-gray-400 group-focus-within:text-green-500 transition-colors uppercase tracking-[0.2em] pl-1">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className={`w-full px-6 py-4 rounded-2xl border-2 font-black ${formData.isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-transparent text-gray-900'} focus:border-green-500 outline-none transition-all`}
                        />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-[11px] font-black text-gray-400 group-focus-within:text-green-500 transition-colors uppercase tracking-[0.2em] pl-1">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className={`w-full px-6 py-4 rounded-2xl border-2 font-black ${formData.isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-transparent text-gray-900'} focus:border-green-500 outline-none transition-all`}
                        />
                      </div>
                    </div>
                  </Card>
                </>
              )}

              {/* SECTION 2: CHILDREN */}
              {activeSection === 'children' && (
                <Card title="Children & Wards" description="Monitoring & Alert Rules" icon={Baby}>
                  <div className="space-y-8">
                    {/* Children Summary */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {['Alex (11th Grade)', 'Sarah (9th Grade)'].map((child, idx) => (
                        <div key={idx} className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                          <img src={`https://picsum.photos/seed/${idx === 0 ? 'alex' : 'sarah'}/60/60`} className="w-14 h-14 rounded-full border-2 border-white shadow-md" />
                          <div className="flex-1">
                            <p className="font-black text-gray-900 dark:text-white">{child}</p>
                            <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                              {idx === 0 ? 'PCM Track • On Track' : 'General Track • Needs Attention'}
                            </p>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-green-500 animate-pulse' : 'bg-yellow-400'}`} />
                        </div>
                      ))}
                    </div>

                    {/* Alert Toggles per Child */}
                    <div>
                      <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1 mb-4">Smart Alert Rules</h4>
                      <div className="space-y-2">
                        <Toggle label="Attendance Alerts" description="Notify when child is marked absent or late" enabled={formData.attendanceAlerts} onChange={(v: boolean) => updateField('attendanceAlerts', v)} icon={MapPin} />
                        <Toggle label="Grade Drop Alerts" description="Instant alert when scores drop below threshold" enabled={formData.gradeAlerts} onChange={(v: boolean) => updateField('gradeAlerts', v)} icon={BarChart2} />
                        <Toggle label="Achievement Notifications" description="Celebrate milestones and achievements" enabled={formData.childrenAlerts} onChange={(v: boolean) => updateField('childrenAlerts', v)} icon={Star} />
                      </div>
                    </div>

                    {/* Threshold settings */}
                    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-[2rem] border border-green-100 dark:border-green-900/40">
                      <h4 className="text-[11px] font-black text-green-700 uppercase tracking-widest mb-4">Alert Threshold</h4>
                      <div className="flex items-center gap-6">
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Notify if grades drop below</p>
                        <select className="px-4 py-2 bg-white border border-green-200 rounded-xl font-black text-green-700 outline-none focus:ring-2 focus:ring-green-300">
                          <option>60%</option>
                          <option>65%</option>
                          <option>70%</option>
                          <option selected>75%</option>
                          <option>80%</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* SECTION 3: SECURITY */}
              {activeSection === 'security' && (
                <Card title="Security Protocols" description="Account Protection & Auth" icon={Shield}>
                  <div className="space-y-8">
                    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] text-white relative isolate overflow-hidden">
                      <div className="absolute top-0 right-0 p-10 opacity-10 -z-10"><Lock size={120} /></div>
                      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div>
                          <h4 className="text-2xl font-black mb-1">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-400 font-medium">Protect your guardian account with 2FA via Google Authenticator.</p>
                          <div className="flex gap-2 mt-4 text-[10px] items-center text-green-400 font-black uppercase tracking-widest">
                            <ShieldCheck size={14} /> Master Key Synced
                          </div>
                        </div>
                        <button className="px-10 py-4 bg-white text-gray-900 rounded-[1.5rem] font-black text-sm shadow-xl active:scale-95 transition-all">Configure 2FA</button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Active Sessions</h4>
                        <div className="space-y-3">
                          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Smartphone size={18} className="text-green-600" />
                              <div>
                                <p className="text-[13px] font-black dark:text-white">Windows Desktop</p>
                                <p className="text-[9px] font-bold text-gray-400 uppercase">Mumbai, IN • Online</p>
                              </div>
                            </div>
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          </div>
                          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between opacity-60">
                            <div className="flex items-center gap-3">
                              <Smartphone size={18} className="text-gray-400" />
                              <div>
                                <p className="text-[13px] font-black dark:text-white">iPhone 14</p>
                                <p className="text-[9px] font-bold text-gray-400 uppercase">Mumbai, IN • 2h ago</p>
                              </div>
                            </div>
                            <button className="text-[9px] font-black text-red-400 hover:text-red-600 border border-red-100 px-2 py-1 rounded-lg">Revoke</button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Danger Zone</h4>
                        <button className="w-full h-[116px] border-4 border-dashed border-red-100 dark:border-red-900/30 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 group hover:border-red-500 transition-all">
                          <Trash2 size={24} className="text-red-300 group-hover:text-red-500" />
                          <span className="text-[10px] font-black text-red-300 uppercase tracking-widest group-hover:text-red-500">Log out all devices</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* SECTION 4: NOTIFICATIONS */}
              {activeSection === 'notifications' && (
                <Card title="Notification Center" description="DND & Alert Preferences" icon={Bell}>
                  <div className="space-y-4">
                    <Toggle label="Email Digest" description="Daily summary of all children's activities" enabled={formData.emailAlerts} onChange={(v: boolean) => updateField('emailAlerts', v)} icon={Mail} />
                    <Toggle label="Push Notifications" description="Live alerts on your mobile device" enabled={formData.pushAlerts} onChange={(v: boolean) => updateField('pushAlerts', v)} icon={Smartphone} />
                    <Toggle label="Weekly Report" description="Comprehensive 7-day academic roundup every Monday" enabled={formData.weeklyDigest} onChange={(v: boolean) => updateField('weeklyDigest', v)} icon={FileText} />
                    <Toggle label="Instant Alerts" description="Real-time ping for emergencies and absences" enabled={formData.instantAlerts} onChange={(v: boolean) => updateField('instantAlerts', v)} icon={Zap} />
                    <Toggle label="Do Not Disturb" description="Silence all non-emergency notifications" enabled={formData.isDND} onChange={(v: boolean) => updateField('isDND', v)} icon={Volume2} />

                    {formData.isDND && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 ml-14">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">DND From</label>
                          <input type="time" value={formData.dndStart} onChange={e => updateField('dndStart', e.target.value)} className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl font-black text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-300" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">DND Until</label>
                          <input type="time" value={formData.dndEnd} onChange={e => updateField('dndEnd', e.target.value)} className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl font-black text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-300" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </Card>
              )}

              {/* SECTION 5: PRIVACY */}
              {activeSection === 'privacy' && (
                <Card title="Privacy & Visibility" description="Who Sees Your Data" icon={ShieldCheck}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Profile Visibility</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['school', 'guardians', 'private'].map(v => (
                          <button
                            key={v}
                            onClick={() => updateField('profileVisibility', v)}
                            className={`py-3 rounded-2xl border-2 font-black text-sm capitalize transition-all ${formData.profileVisibility === v ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 dark:border-gray-700 text-gray-400 hover:border-green-200'}`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Toggle label="Activity Tracking" description="Allow platform to track usage for recommendations" enabled={formData.activityTracking} onChange={(v: boolean) => updateField('activityTracking', v)} icon={BarChart2} />
                    <Toggle label="Anonymous Data Sharing" description="Share anonymised data to improve the platform" enabled={formData.dataSharing} onChange={(v: boolean) => updateField('dataSharing', v)} icon={Globe} />
                    <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex gap-3">
                      <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Your children's academic data is never shared with third parties without explicit consent. Read our <span className="font-black underline cursor-pointer">Privacy Policy</span>.</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* SECTION 6: APPEARANCE */}
              {activeSection === 'appearance' && (
                <Card title="Appearance Settings" description="Theme, Font & Density" icon={Palette}>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Color Mode</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Light Mode', icon: '☀️', v: false },
                          { label: 'Dark Mode',  icon: '🌙', v: true  },
                        ].map(m => (
                          <button
                            key={String(m.v)}
                            onClick={() => updateField('isDarkMode', m.v)}
                            className={`py-6 rounded-[2rem] border-2 flex flex-col items-center gap-3 font-black text-sm transition-all ${formData.isDarkMode === m.v ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 text-gray-400'}`}
                          >
                            <span className="text-3xl">{m.icon}</span>
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Font Size</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {['small', 'medium', 'large'].map(f => (
                          <button
                            key={f}
                            onClick={() => updateField('fontSize', f)}
                            className={`py-3 rounded-2xl border-2 font-black text-sm capitalize transition-all ${formData.fontSize === f ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 dark:border-gray-700 text-gray-400 hover:border-green-200'}`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Toggle label="High Contrast Mode" description="Increase visual contrast for accessibility" enabled={formData.highContrast} onChange={(v: boolean) => updateField('highContrast', v)} icon={Contrast} />
                    <Toggle label="Reduce Motion" description="Disable heavy animations for performance" enabled={formData.motionReduction} onChange={(v: boolean) => updateField('motionReduction', v)} icon={Zap} />
                  </div>
                </Card>
              )}

              {/* SECTION 7: LANGUAGE */}
              {activeSection === 'language' && (
                <Card title="Language & Region" description="Locale & Time Preferences" icon={Languages}>
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      { label: 'Interface Language', field: 'language', options: ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Bengali'] },
                      { label: 'Region', field: 'region', options: ['India (Maharashtra)', 'India (Delhi)', 'India (Karnataka)', 'India (Tamil Nadu)', 'United Kingdom', 'United States'] },
                      { label: 'Timezone', field: 'timezone', options: ['GMT +5:30 (Auto)', 'GMT +0:00', 'GMT +1:00', 'GMT -5:00'] },
                    ].map(({ label, field, options }) => (
                      <div key={field} className="space-y-2 group">
                        <label className="text-[11px] font-black text-gray-400 group-focus-within:text-green-500 uppercase tracking-[0.2em] pl-1">{label}</label>
                        <select
                          value={(formData as any)[field]}
                          onChange={e => updateField(field, e.target.value)}
                          className={`w-full px-6 py-4 rounded-2xl border-2 font-black ${formData.isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-transparent text-gray-900'} focus:border-green-500 outline-none transition-all appearance-none cursor-pointer`}
                        >
                          {options.map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* SECTION 8: BILLING */}
              {activeSection === 'billing' && (
                <Card title="Family Plan" description="Subscription & Upgrade" icon={Crown} badge="Active">
                  <div className="space-y-8">
                    <div className="p-8 bg-gradient-to-br from-green-600 to-emerald-500 rounded-[2.5rem] text-white relative overflow-hidden">
                      <div className="absolute -right-6 -top-6 opacity-20"><Crown size={120} /></div>
                      <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-green-100 mb-1">Current Plan</p>
                        <h4 className="text-3xl font-black mb-2">Family Premium</h4>
                        <p className="text-green-100 text-sm mb-6">Covers up to 4 children with unlimited AI insights, full academic analytics, and priority counselor access.</p>
                        <div className="flex gap-4 flex-wrap">
                          <span className="bg-white/20 px-3 py-1.5 rounded-xl font-black text-xs border border-white/30">✓ Up to 4 Children</span>
                          <span className="bg-white/20 px-3 py-1.5 rounded-xl font-black text-xs border border-white/30">✓ AI Insights</span>
                          <span className="bg-white/20 px-3 py-1.5 rounded-xl font-black text-xs border border-white/30">✓ Priority Support</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 border-2 border-gray-100 dark:border-gray-700 rounded-[2rem] space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Billing Cycle</p>
                        <p className="text-xl font-black text-gray-900 dark:text-white">Annual • ₹4,999/yr</p>
                        <p className="text-xs font-bold text-green-600">Renews March 22, 2027</p>
                      </div>
                      <div className="p-6 border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:border-green-300 transition-all cursor-pointer group">
                        <CreditCard size={28} className="text-gray-300 group-hover:text-green-500 transition-colors" />
                        <p className="text-sm font-black text-gray-400 group-hover:text-green-600 transition-colors">Manage Payment</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* SECTION 9: DATA */}
              {activeSection === 'data' && (
                <Card title="Records & Backup" description="Export, Sync & Wipe" icon={Database}>
                  <div className="space-y-6">
                    {[
                      { icon: Download, label: 'Export Children\'s Report', desc: 'Download full academic history as PDF/CSV', color: 'text-blue-600', bg: 'bg-blue-50' },
                      { icon: RotateCcw, label: 'Sync Across Devices', desc: 'Force sync all settings to connected devices', color: 'text-green-600', bg: 'bg-green-50' },
                      { icon: Trash2, label: 'Delete Account & Data', desc: 'Permanently remove your guardian account', color: 'text-red-600', bg: 'bg-red-50', danger: true },
                    ].map(({ icon: Icon, label, desc, color, bg, danger }) => (
                      <button key={label} className={`w-full flex items-center gap-5 p-5 rounded-[2rem] border-2 ${danger ? 'border-dashed border-red-100 dark:border-red-900/30 hover:border-red-400' : 'border-gray-100 dark:border-gray-700 hover:border-green-200'} transition-all group`}>
                        <div className={`w-12 h-12 ${bg} ${color} rounded-2xl flex items-center justify-center shrink-0`}>
                          <Icon size={22} />
                        </div>
                        <div className="text-left">
                          <p className={`font-black text-sm ${danger ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>{label}</p>
                          <p className="text-xs font-bold text-gray-400 mt-0.5">{desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>
              )}

              {/* SECTION 10: ACCESSIBILITY */}
              {activeSection === 'accessibility' && (
                <Card title="Accessibility Tools" description="Vision & Motor Helpers" icon={Accessibility}>
                  <div className="space-y-4">
                    <Toggle label="High Contrast Mode" description="Boost readability for low-vision users" enabled={formData.highContrast} onChange={(v: boolean) => updateField('highContrast', v)} icon={Contrast} />
                    <Toggle label="Reduce Motion" description="Minimize animations across the platform" enabled={formData.motionReduction} onChange={(v: boolean) => updateField('motionReduction', v)} icon={Zap} />
                    <div className="space-y-2 p-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-black text-gray-700 dark:text-gray-300">Text Scale</label>
                        <span className="text-sm font-black text-green-600">100%</span>
                      </div>
                      <input type="range" min="80" max="150" defaultValue="100" className="w-full accent-green-500" />
                    </div>
                  </div>
                </Card>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-96 shrink-0 space-y-8 lg:sticky lg:top-8 h-fit">
          <div className={`p-8 rounded-[3rem] border shadow-2xl relative overflow-hidden isolate ${formData.isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-100 text-gray-900'}`}>
            <h4 className="text-[11px] font-black text-green-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <Zap size={14} /> System Health
            </h4>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-black uppercase tracking-widest">Guardian Sync</p>
                  <span className="text-[10px] font-black text-green-500 uppercase">Live</span>
                </div>
                <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ repeat: Infinity, duration: 2 }} className="w-1/3 h-full bg-green-600 rounded-full" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl text-center">
                  <p className="text-2xl font-black text-green-600">2</p>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mt-1">Children</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl text-center">
                  <p className="text-2xl font-black text-gray-900 dark:text-white">94%</p>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mt-1">Avg Score</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-[3rem] p-10 text-white shadow-3xl shadow-green-900/40 relative group overflow-hidden isolate">
            <div className="absolute top-0 right-0 p-10 opacity-30 -z-10 transition-transform group-hover:scale-125 duration-700"><Crown size={120} /></div>
            <h3 className="text-3xl font-black mb-2 tracking-tighter">Family Premium</h3>
            <p className="text-sm font-medium text-green-50 mb-8 opacity-90 leading-relaxed">Access advanced AI analytics, priority counselor sessions, and multi-child comparison tools.</p>
            <button className="w-full py-5 bg-white text-green-600 rounded-[1.5rem] font-black text-sm shadow-2xl hover:-translate-y-1 transition-all">Manage Plan</button>
          </div>
        </aside>

      </div>

      {/* Floating Save Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-12 right-12 z-50 flex items-center gap-4"
      >
        <AnimatePresence>
          {isSaving && (
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="bg-gray-900 text-white px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl border border-white/10"
            >
              Saving...
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-[0_20px_40px_rgba(22,163,74,0.4)] transition-all ${isSaving ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isSaving ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
          <span className="sr-only">Save Changes</span>
        </motion.button>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-32 left-1/2 -translate-x-1/2 z-50 ${formData.isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} px-10 py-6 rounded-[3rem] shadow-3xl flex items-center gap-6 border-2`}
          >
            <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-lg"><CheckCircle2 size={24} /></div>
            <div>
              <p className={`text-lg font-black leading-none mb-1 ${formData.isDarkMode ? 'text-white' : 'text-gray-900'}`}>{toastMsg}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">All changes synced • Secure</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
