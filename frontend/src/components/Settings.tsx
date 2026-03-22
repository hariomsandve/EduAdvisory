import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   User, Lock, Bell, Shield, Palette, Globe, Link as LinkIcon,
   CreditCard, Database, Accessibility, ChevronRight, Save,
   Moon, Sun, Check, AlertCircle, Trash2, Download, Eye, EyeOff,
   Camera, Sparkles, Plus, X, Smartphone, MapPin, History,
   LogOut, Mail, AppWindow, Zap, Eye as ViewIcon, Languages,
   Monitor, Type, Layout, CreditCard as BillingIcon, FileJson,
   FileText, RotateCcw, Volume2, Search, Info, Settings as SettingsIcon,
   CheckCircle2, Loader2, QrCode, Share2, Heart, MessageSquare,
   Star, Trophy, Crown, PlayCircle, Paperclip, Send, MoreHorizontal,
   Smartphone as PhoneIcon, GlobeIcon, MousePointer2, Contrast,
   Languages as LangIcon, ShieldCheck, CreditCard as CardIcon
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
            {Icon && <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 text-orange-600 rounded-2xl flex items-center justify-center"><Icon size={22} /></div>}
            <div>
               <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{title}</h3>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{description}</p>
            </div>
         </div>
         {badge && (
            <div className="px-4 py-1.5 bg-orange-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-200/50">
               {badge}
            </div>
         )}
      </div>
      {children}
   </motion.div>
);

const TelegramToggle = ({ label, description, enabled, onChange, icon: Icon }: any) => (
   <button
      onClick={() => onChange(!enabled)}
      className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-[1.5rem] group"
   >
      <div className="flex items-center gap-4 text-left">
         <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${enabled ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 group-hover:scale-110'}`}>
            <Icon size={18} />
         </div>
         <div>
            <p className="text-[14px] font-black text-gray-900 dark:text-white leading-none mb-1">{label}</p>
            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 tracking-tight">{description}</p>
         </div>
      </div>
      <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${enabled ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-600'}`}>
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
                  ? `bg-gradient-to-tr from-orange-600 via-orange-400 to-yellow-400 scale-110 shadow-xl shadow-orange-100`
                  : 'bg-gray-100 dark:bg-gray-700 group-hover:scale-105'
               }`}>
               <div className={`w-full h-full rounded-full ${active === s.id ? 'bg-white' : 'bg-white dark:bg-gray-800'} flex items-center justify-center text-gray-800`}>
                  <s.icon size={28} className={active === s.id ? 'text-orange-600' : 'text-gray-400 dark:text-gray-500'} />
               </div>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${active === s.id ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400'}`}>
               {s.label.split(' ')[0]}
            </span>
         </button>
      ))}
   </div>
);

// --- Profile Card (LinkedIn Style) ---
const ProfileHeader = ({ data, onBioGenerate, isGenerating, progress }: any) => (
   <Card title="Professional Persona" description="Visual Identity & Bio" icon={User} badge="All-Star">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-orange-600 to-orange-400 opacity-90" />
      <div className="relative pt-16 flex flex-col md:flex-row items-end gap-6 mb-10">
         <div className="relative group/avatar cursor-pointer">
            <div className="w-32 h-32 rounded-full border-[6px] border-white dark:border-gray-800 shadow-2xl overflow-hidden bg-white">
               <img src="https://i.pravatar.cc/300?u=preeti" className="w-full h-full object-cover" alt="Profile" />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-white">
               <Camera size={24} />
            </div>
         </div>
         <div className="flex-1 pb-2">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-1">{data.name || 'Set Name'}</h2>
            <p className="text-sm font-bold text-gray-500 flex items-center gap-2">
               <Trophy size={14} className="text-orange-500" /> {data.careerInterest || 'No path selected'} • @{data.handle || 'handle'}
            </p>
         </div>
         <div className="flex gap-3 pb-2">
            <button className="px-8 py-3 bg-orange-600 text-white rounded-full font-black text-xs shadow-xl shadow-orange-200/50 hover:scale-105 transition-all">Verify Identity</button>
            <button className="p-3 border-2 border-gray-100 dark:border-gray-700 rounded-full text-gray-400 hover:border-orange-200 hover:text-orange-500 transition-all"><MoreHorizontal size={22} /></button>
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
         <div className="md:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
               <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Bio Narrative</h4>
               <button onClick={onBioGenerate} className="flex items-center gap-2 text-[10px] font-black text-orange-600 uppercase tracking-widest hover:scale-105 transition-all">
                  {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  {isGenerating ? 'AI Thinking...' : 'AI Magic Bio'}
               </button>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-[1.8] italic">
               "{data.bio || 'Your journey starts with a story. Let AI help you write it.'}"
            </p>
         </div>
         <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
            <div>
               <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest">Strength</p>
                  <span className="text-xs font-black text-orange-600">{progress}%</span>
               </div>
               <div className="w-full h-2.5 bg-white dark:bg-gray-800 rounded-full overflow-hidden shadow-inner border border-gray-50 dark:border-gray-700">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-400" />
               </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 leading-tight mt-4">
               Add {Math.ceil((100 - progress) / 20)} more items to reach All-Star status!
            </p>
         </div>
      </div>
   </Card>
);

// --- Main Hybrid Settings Component ---

export default function Settings() {
   const [activeSection, setActiveSection] = useState('profile');
   const [isSaving, setIsSaving] = useState(false);
   const [showToast, setShowToast] = useState(false);
   const [isGenerating, setIsGenerating] = useState(false);
   const [toastMsg, setToastMsg] = useState('Settings saved to LocalStorage');

   // --- COMPREHENSIVE DATA STATE ---
   const [formData, setFormData] = useState({
      // Profile
      name: 'Preeti Kumari',
      email: 'preeti@eduadvisory.site',
      handle: 'preeti_edu',
      bio: 'Enthusiastic explorer of modern UI patterns and AI technologies. Building the future of education at EduAdvisory.',
      careerInterest: 'Full-stack Engineering',
      skills: ['React', 'Tailwind', 'Python', 'AI Research'],
      // Security
      twoFactorEnabled: true,
      passStrength: 2,
      loginAlerts: true,
      // Notifications
      emailAlerts: true,
      pushAlerts: true,
      scholarshipAlerts: true,
      isDND: false,
      dndStart: '22:00',
      dndEnd: '07:00',
      // Privacy
      profileVisibility: 'public',
      dataSharing: true,
      activityTracking: true,
      // Appearance
      isDarkMode: false,
      themeColor: 'orange',
      fontSize: 'medium',
      uiDensity: 'modern',
      // Language & Region
      language: 'English',
      region: 'India (Maharashtra)',
      timezone: 'GMT +5:30 (Auto)',
      // Accessibility
      highContrast: false,
      motionReduction: false,
      colorBlindFilter: 'None',
      textScale: 100,
   });

   // Init Data Sync
   useEffect(() => {
      const saved = localStorage.getItem('edu_settings_master_v1');
      if (saved) {
         try {
            const parsed = JSON.parse(saved);
            setFormData(prev => ({ ...prev, ...parsed }));
         } catch (e) {
            console.error("Storage corrupt", e);
         }
      }
   }, []);

   const updateField = (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
   };

   const handleSave = () => {
      setIsSaving(true);
      setTimeout(() => {
         localStorage.setItem('edu_settings_master_v1', JSON.stringify(formData));
         setIsSaving(false);
         setToastMsg('Vault Updated Successfully');
         setShowToast(true);
         setTimeout(() => setShowToast(false), 3000);
      }, 1200);
   };

   const generateAIBio = () => {
      setIsGenerating(true);
      setTimeout(() => {
         updateField('bio', "Human-centric developer with a deep passion for pedagogical technology. Merging the gap between code and career for thousands of students using advanced AI models and modern UI principles.");
         setIsGenerating(false);
      }, 1500);
   };

   const sections = [
      { id: 'profile', label: 'Identity', icon: User, desc: 'Profile & Handle' },
      { id: 'security', label: 'Safety', icon: Shield, desc: 'Vault & 2FA' },
      { id: 'notifications', label: 'Vibe', icon: Bell, desc: 'DND & Alerts' },
      { id: 'privacy', label: 'Stealth', icon: ShieldCheck, desc: 'Visibility & Data' },
      { id: 'appearance', label: 'Design', icon: Palette, desc: 'Theme & Font' },
      { id: 'language', label: 'Locale', icon: Languages, desc: 'Region & Time' },
      { id: 'connections', label: 'Linked', icon: LinkIcon, desc: 'Social SSO' },
      { id: 'billing', label: 'Plan', icon: Crown, desc: 'Tiers & Subs' },
      { id: 'data', label: 'Cloud', icon: Database, desc: 'Export & Wipe' },
      { id: 'accessibility', label: 'Assist', icon: Accessibility, desc: 'Helper Tools' },
   ];

   const calculateProgress = () => {
      let score = 20;
      if (formData.name !== 'Set Name') score += 20;
      if (formData.bio && formData.bio.length > 30) score += 20;
      if (formData.skills.length >= 3) score += 20;
      if (formData.twoFactorEnabled) score += 20;
      return Math.min(100, score);
   };

   return (
      <div className={`max-w-7xl mx-auto min-h-screen p-4 md:p-8 font-sans transition-colors duration-700 ${formData.isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50/30'} pb-40`}>

         {/* YouTube Studio Header */}
         <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 px-2">
            <div className="flex items-center gap-5">
               <motion.div
                  whileHover={{ rotate: 90 }}
                  className={`w-14 h-14 rounded-[1.5rem] bg-orange-600 flex items-center justify-center text-white shadow-2xl shadow-orange-900/20`}
               >
                  <SettingsIcon size={28} />
               </motion.div>
               <div>
                  <h1 className={`text-4xl font-black tracking-tighter leading-none mb-1 ${formData.isDarkMode ? 'text-white' : 'text-gray-900'}`}>Command Center</h1>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                     <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Engine Version 2.0.4 • Active Sync</p>
                  </div>
               </div>
            </div>
            <div className="flex-1 max-w-xl relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors" size={20} />
               <input
                  type="text"
                  placeholder="Search setting, mode, or command..."
                  className={`w-full h-14 pl-16 pr-6 ${formData.isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-100 text-gray-900'} rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-orange-500/10 border-2 transition-all font-bold text-sm`}
               />
            </div>
            <div className="flex items-center gap-4">
               <div className={`w-14 h-14 rounded-full ring-4 ring-white dark:ring-gray-700 shadow-xl overflow-hidden`}>
                  <img src="https://i.pravatar.cc/100?u=preeti" className="w-full h-full object-cover" alt="User" />
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
<<<<<<< HEAD
                     transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
=======
                     transition={{ duration: 0.5, cubicBezier: [0.23, 1, 0.32, 1] }}
>>>>>>> 0285e45c0caac0d941674d1aad2c64c884823936
                  >

                     {/* SECTION 1: PROFILE */}
                     {activeSection === 'profile' && (
                        <>
                           <ProfileHeader data={formData} onBioGenerate={generateAIBio} isGenerating={isGenerating} progress={calculateProgress()} />

                           <Card title="Quick Interface" description="Instant Design Toggles" icon={Zap}>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                 {[
                                    { l: 'Dark Mode', i: Moon, v: formData.isDarkMode, f: 'isDarkMode' },
                                    { l: 'Silent Mode', i: Volume2, v: formData.isDND, f: 'isDND' },
                                    { l: 'High Contrast', i: Contrast, v: formData.highContrast, f: 'highContrast' },
                                    { l: 'Privacy Mode', i: ViewIcon, v: formData.profileVisibility === 'private', f: 'profileVisibility', custom: true },
                                 ].map((item: any) => (
                                    <button
                                       key={item.f}
                                       onClick={() => updateField(item.f, item.custom ? (item.v ? 'public' : 'private') : !item.v)}
                                       className={`h-32 rounded-[2.5rem] p-5 flex flex-col justify-between items-start transition-all relative overflow-hidden isolate ${item.v ? 'bg-orange-600 text-white shadow-xl rotate-1' : 'bg-gray-50 dark:bg-gray-900/50 text-gray-400 border border-gray-100 dark:border-gray-700 hover:rotate-1'}`}
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

                           <Card title="Data Fields" description="Editable User Metadata" icon={Database}>
                              <div className="grid md:grid-cols-2 gap-8">
                                 <div className="space-y-2 group">
                                    <label className="text-[11px] font-black text-gray-400 group-focus-within:text-orange-500 transition-colors uppercase tracking-[0.2em] pl-1">Handle Alias</label>
                                    <div className="relative">
                                       <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-black">@</span>
                                       <input
                                          type="text"
                                          value={formData.handle}
                                          onChange={(e) => updateField('handle', e.target.value)}
                                          className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 font-black ${formData.isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-transparent text-gray-900'} focus:border-orange-500 outline-none transition-all`}
                                       />
                                    </div>
                                 </div>
                                 <div className="space-y-2 group">
                                    <label className="text-[11px] font-black text-gray-400 group-focus-within:text-orange-500 transition-colors uppercase tracking-[0.2em] pl-1">Primary Interest</label>
                                    <select
                                       value={formData.careerInterest}
                                       onChange={(e) => updateField('careerInterest', e.target.value)}
                                       className={`w-full px-6 py-4 rounded-2xl border-2 font-black ${formData.isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-transparent text-gray-900'} focus:border-orange-500 outline-none transition-all appearance-none cursor-pointer`}
                                    >
                                       <option>Full-stack Engineering</option>
                                       <option>UI/UX Experience Design</option>
                                       <option>Data Science & AI</option>
                                       <option>Product Management</option>
                                    </select>
                                 </div>
                              </div>
                           </Card>
                        </>
                     )}

                     {/* SECTION 2: SECURITY */}
                     {activeSection === 'security' && (
                        <Card title="Security Protocols" description="Vault Protection & Auth" icon={Shield}>
                           <div className="space-y-8">
                              <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] text-white relative isolate overflow-hidden">
                                 <div className="absolute top-0 right-0 p-10 opacity-10 -z-10"><Lock size={120} /></div>
                                 <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                                    <div>
                                       <h4 className="text-2xl font-black mb-1">Two-Factor Authentication</h4>
                                       <p className="text-sm text-gray-400 font-medium">Ultimate protection via Google Authenticator app.</p>
                                       <div className="flex gap-2 mt-4 text-[10px] items-center text-green-400 font-black uppercase tracking-widest">
                                          <ShieldCheck size={14} /> Master Key Synced
                                       </div>
                                    </div>
                                    <button className="px-10 py-4 bg-white text-gray-900 rounded-[1.5rem] font-black text-sm shadow-xl active:scale-95 transition-all">Configure 2FA</button>
                                 </div>
                              </div>
                              <div className="grid md:grid-cols-2 gap-10">
                                 <div className="space-y-4">
                                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Login Activity</h4>
                                    <div className="space-y-3">
                                       <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                             <Smartphone size={18} className="text-orange-600" />
                                             <div>
                                                <p className="text-[13px] font-black dark:text-white">Windows Desktop</p>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase">Mumbai, IN • Online</p>
                                             </div>
                                          </div>
                                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
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

                     {/* FALLBACK FOR WIP SECTIONS */}
                     {!['profile', 'security', 'accessibility'].includes(activeSection) && (
                        <Card title={sections.find(s => s.id === activeSection)?.label} description={sections.find(s => s.id === activeSection)?.desc} icon={sections.find(s => s.id === activeSection)?.icon}>
                           <div className="py-20 text-center space-y-8">
                              <div className="w-24 h-24 bg-orange-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl animate-bounce-slow mx-auto">
                                 <Zap size={40} />
                              </div>
                              <div className="space-y-3">
                                 <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">Sync Interface Live</h3>
                                 <p className="text-sm font-medium text-gray-500 max-w-sm mx-auto leading-relaxed">
                                    This module is optimized for real-time career data. All current inputs are synced to your secure cloud.
                                 </p>
                              </div>
                              <button onClick={() => setActiveSection('profile')} className="px-10 py-4 bg-gray-900 text-white rounded-full font-black text-xs hover:scale-105 transition-all shadow-xl">Back to Profile</button>
                           </div>
                        </Card>
                     )}

                  </motion.div>
               </AnimatePresence>
            </div>

            {/* Studio Sidebar */}
            <aside className="w-full lg:w-96 shrink-0 space-y-8 lg:sticky lg:top-8 h-fit">
               <div className={`p-8 rounded-[3rem] border shadow-2xl relative overflow-hidden isolate ${formData.isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-100 text-gray-900'}`}>
                  <h4 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                     <Zap size={14} /> System Health
                  </h4>
                  <div className="space-y-6">
                     <div>
                        <div className="flex justify-between items-center mb-3">
                           <p className="text-xs font-black uppercase tracking-widest">Global Sync</p>
                           <span className="text-[10px] font-black text-green-500 uppercase">Live</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                           <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ repeat: Infinity, duration: 2 }} className="w-1/3 h-full bg-orange-600 rounded-full" />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-gradient-to-br from-orange-600 to-orange-400 rounded-[3rem] p-10 text-white shadow-3xl shadow-orange-900/40 relative group overflow-hidden isolate">
                  <div className="absolute top-0 right-0 p-10 opacity-30 -z-10 transition-transform group-hover:scale-125 duration-700"><Crown size={120} /></div>
                  <h3 className="text-3xl font-black mb-2 tracking-tighter">Unlimited Access</h3>
                  <p className="text-sm font-medium text-orange-50 mb-8 opacity-90 leading-relaxed">Join 42,000+ students on Premium. Access advanced AI analyzers.</p>
                  <button className="w-full py-5 bg-white text-orange-600 rounded-[1.5rem] font-black text-sm shadow-2xl hover:-translate-y-1 transition-all">Upgrade Now</button>
               </div>
            </aside>

         </div>

         {/* --- RE-DESIGNED COMPACT FLOATING SAVE BUTTON (NO LONGER A SNAKE) --- */}
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
                     Saving to Vault...
                  </motion.div>
               )}
            </AnimatePresence>

            <motion.button
               onClick={handleSave}
               disabled={isSaving}
               whileHover={{ scale: 1.1, rotate: 5 }}
               whileTap={{ scale: 0.9 }}
               className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-[0_20px_40px_rgba(234,88,12,0.4)] transition-all ${isSaving ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'}`}
            >
               {isSaving ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
               <span className="sr-only">Save Changes</span>
            </motion.button>
         </motion.div>

         {/* Notification Portal */}
         <AnimatePresence>
            {showToast && (
               <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className={`fixed top-32 left-1/2 -translate-x-1/2 z-50 ${formData.isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} px-10 py-6 rounded-[3rem] shadow-3xl flex items-center gap-6 border-2`}
               >
                  <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-lg"><CheckCircle2 size={24} /></div>
                  <div>
                     <p className={`text-lg font-black leading-none mb-1 ${formData.isDarkMode ? 'text-white' : 'text-gray-900'}`}>{toastMsg}</p>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Handshake confirmed • 86ms</p>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

      </div>
   );
}
