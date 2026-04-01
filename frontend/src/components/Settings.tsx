import { useState, useEffect } from 'react';
import { 
  User, Lock, Bell, Shield, Palette, Globe, Link as LinkIcon, 
  CreditCard, Database, Accessibility, ChevronRight, Save, 
  Moon, Sun, Check, AlertCircle, Trash2, Download, Eye, EyeOff, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TRANSLATIONS DICTIONARY ---
const translations: Record<string, Record<string, string>> = {
  en: {
    settings: 'Settings', profile: 'Profile Settings', security: 'Account Security', notifications: 'Notifications',
    privacy: 'Privacy & Safety', appearance: 'Appearance', language: 'Language & Region', connections: 'Connected Accounts',
    billing: 'Billing & Subscription', data: 'Data Management', accessibility: 'Accessibility',
    personal_info: 'Personal Information', update_photo: 'Update your photo and personal details.',
    full_name: 'Full Name', email: 'Email Address', bio: 'Bio', bio_placeholder: 'Tell us about yourself...',
    change_photo: 'Change', security_title: 'Security', security_desc: 'Manage your password and account security.',
    change_password: 'Change Password', curr_pass: 'Current Password', new_pass: 'New Password', conf_pass: 'Confirm New Password',
    two_factor: 'Two-Factor Authentication', two_factor_desc: 'Add an extra layer of security to your account.', enable: 'Enable',
    appearance_title: 'Appearance', appearance_desc: 'Customize how the application looks to you.',
    light_mode: 'Light Mode', dark_mode: 'Dark Mode', accent_color: 'Accent Color',
    lang_title: 'Language & Region', lang_desc: 'Choose your preferred language for the interface.',
    data_title: 'Data Management', data_desc: 'Control your data and export your information.',
    export_data: 'Export Personal Data', export_desc: 'Download a copy of all your data in JSON format.', export_btn: 'Export',
    delete_acc: 'Delete Account', delete_desc: 'Permanently delete your account and all associated data.', delete_btn: 'Delete',
    under_dev: 'This section is currently under development. Check back soon for more features!',
    cancel: 'Cancel', save: 'Save Changes', saving: 'Saving...', success: 'Settings saved successfully!'
  },
  hi: {
    settings: 'सेटिंग्स', profile: 'प्रोफाइल सेटिंग्स', security: 'खाता सुरक्षा', notifications: 'सूचनाएं',
    privacy: 'गोपनीयता और सुरक्षा', appearance: 'दिखावट', language: 'भाषा और क्षेत्र', connections: 'जुड़े हुए खाते',
    billing: 'बिलिंग और सदस्यता', data: 'डेटा प्रबंधन', accessibility: 'पहुंच (एक्सेसिबिलिटी)',
    personal_info: 'व्यक्तिगत जानकारी', update_photo: 'अपनी तस्वीर और व्यक्तिगत विवरण अपडेट करें।',
    full_name: 'पूरा नाम', email: 'ईमेल पता', bio: 'परिचय', bio_placeholder: 'अपने बारे में कुछ बताएं...',
    change_photo: 'बदलें', security_title: 'सुरक्षा', security_desc: 'अपना पासवर्ड और खाता सुरक्षा प्रबंधित करें।',
    change_password: 'पासवर्ड बदलें', curr_pass: 'वर्तमान पासवर्ड', new_pass: 'नया पासवर्ड', conf_pass: 'नया पासवर्ड कन्फर्म करें',
    two_factor: 'टू-फैक्टर ऑथेंटिकेशन', two_factor_desc: 'अपने खाते में सुरक्षा की एक अतिरिक्त परत जोड़ें।', enable: 'सक्षम करें',
    appearance_title: 'दिखावट', appearance_desc: 'एप्लिकेशन आपके लिए कैसा दिखता है, इसे अनुकूलित करें।',
    light_mode: 'लाइट मोड', dark_mode: 'डार्क मोड', accent_color: 'एक्सेंट कलर',
    lang_title: 'भाषा और क्षेत्र', lang_desc: 'इंटरफ़ेस के लिए अपनी पसंदीदा भाषा चुनें।',
    data_title: 'डेटा प्रबंधन', data_desc: 'अपना डेटा नियंत्रित करें और अपनी जानकारी निर्यात करें।',
    export_data: 'व्यक्तिगत डेटा निर्यात करें', export_desc: 'JSON प्रारूप में अपने सभी डेटा की एक प्रति डाउनलोड करें।', export_btn: 'निर्यात करें',
    delete_acc: 'खाता हटाएं', delete_desc: 'अपना खाता और सभी संबंधित डेटा स्थायी रूप से हटाएं।', delete_btn: 'हटाएं',
    under_dev: 'यह अनुभाग वर्तमान में विकास के अधीन है। अधिक सुविधाओं के लिए जल्द ही वापस आएं!',
    cancel: 'रद्द करें', save: 'परिवर्तन सहेजें', saving: 'सहेजा जा रहा है...', success: 'सेटिंग्स सफलतापूर्वक सहेजी गईं!'
  },
  mr: {
    settings: 'सेटिंग्ज', profile: 'प्रोफाइल सेटिंग्ज', security: 'खाते सुरक्षा', notifications: 'सूचना',
    privacy: 'गोपनीयता आणि सुरक्षितता', appearance: 'स्वरूप', language: 'भाषा आणि प्रदेश', connections: 'जोडलेली खाती',
    billing: 'बिलिंग आणि सदस्यता', data: 'डेटा व्यवस्थापन', accessibility: 'प्रवेशयोग्यता',
    personal_info: 'वैयक्तिक माहिती', update_photo: 'तुमचा फोटो आणि वैयक्तिक तपशील अपडेट करा.',
    full_name: 'पूर्ण नाव', email: 'ईमेल पत्ता', bio: 'माहिती', bio_placeholder: 'तुमच्याबद्दल सांगा...',
    change_photo: 'बदला', security_title: 'सुरक्षा', security_desc: 'तुमचा पासवर्ड आणि खाते सुरक्षा व्यवस्थापित करा.',
    change_password: 'पासवर्ड बदला', curr_pass: 'सध्याचा पासवर्ड', new_pass: 'नवीन पासवर्ड', conf_pass: 'नवीन पासवर्डची पुष्टी करा',
    two_factor: 'टू-फॅक्टर ऑथेंटिकेशन', two_factor_desc: 'तुमच्या खात्यात सुरक्षिततेचा अतिरिक्त स्तर जोडा.', enable: 'सक्षम करा',
    appearance_title: 'स्वरूप', appearance_desc: 'अप्लिकेशन तुम्हाला कसे दिसते ते सानुकूलित करा.',
    light_mode: 'लाईट मोड', dark_mode: 'डार्क मोड', accent_color: 'अॅक्सेंट कलर',
    lang_title: 'भाषा आणि प्रदेश', lang_desc: 'इंटरफेससाठी तुमची आवडती भाषा निवडा.',
    data_title: 'डेटा व्यवस्थापन', data_desc: 'तुमचा डेटा नियंत्रित करा आणि तुमची माहिती निर्यात करा.',
    export_data: 'वैयक्तिक डेटा निर्यात करा', export_desc: 'JSON फॉरमॅटमध्ये तुमच्या सर्व डेटाची प्रत डाउनलोड करा.', export_btn: 'निर्यात करा',
    delete_acc: 'खाते हटवा', delete_desc: 'तुमचे खाते आणि सर्व संबंधित डेटा कायमचा हटवा.', delete_btn: 'हटवा',
    under_dev: 'हा विभाग सध्या विकसित होत आहे. अधिक वैशिष्ट्यांसाठी लवकरच परत या!',
    cancel: 'रद्द करा', save: 'बदल जतन करा', saving: 'जतन करत आहे...', success: 'सेटिंग्ज यशस्वीरित्या जतन केल्या!'
  }
};

interface SettingSection {
  id: string;
  labelKey: string;
  icon: any;
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [appLang, setAppLang] = useState<'en' | 'hi' | 'mr'>('en');

  const t = (key: string, fallback: string) => translations[appLang]?.[key] || fallback;

  // Form State for Personal Information
  const [formData, setFormData] = useState({
    fullName: 'Ragini',
    email: 'ragini@example.com',
    bio: ''
  });

  const sections: SettingSection[] = [
    { id: 'profile', labelKey: 'profile', icon: User },
    { id: 'security', labelKey: 'security', icon: Lock },
    { id: 'notifications', labelKey: 'notifications', icon: Bell },
    { id: 'privacy', labelKey: 'privacy', icon: Shield },
    { id: 'appearance', labelKey: 'appearance', icon: Palette },
    { id: 'language', labelKey: 'language', icon: Globe },
    { id: 'connections', labelKey: 'connections', icon: LinkIcon },
    { id: 'billing', labelKey: 'billing', icon: CreditCard },
    { id: 'data', labelKey: 'data', icon: Database },
    { id: 'accessibility', labelKey: 'accessibility', icon: Accessibility },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert(t('success', 'Settings saved successfully!'));
    }, 1000);
  };

  return (
    <div className={`max-w-6xl mx-auto h-full min-h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-8 pb-8 font-sans transition-colors duration-300 ${isDarkMode ? 'dark-theme' : ''}`}>
      
      {/* GLOBAL DARK MODE STYLES (Scoped to this component) */}
      <style>{`
        .dark-theme .bg-white { background-color: #1e293b !important; border-color: #334155 !important; color: #f8fafc !important; }
        .dark-theme .bg-gray-50 { background-color: #334155 !important; border-color: #475569 !important; }
        .dark-theme .bg-blue-50\\/50 { background-color: rgba(37, 99, 235, 0.15) !important; border-color: rgba(37, 99, 235, 0.3) !important; }
        .dark-theme .bg-red-50\\/50 { background-color: rgba(239, 68, 68, 0.1) !important; border-color: rgba(239, 68, 68, 0.2) !important; }
        
        .dark-theme .text-gray-900 { color: #f8fafc !important; }
        .dark-theme .text-gray-700 { color: #cbd5e1 !important; }
        .dark-theme .text-gray-600 { color: #94a3b8 !important; }
        .dark-theme .text-gray-500 { color: #94a3b8 !important; }
        .dark-theme .text-gray-400 { color: #64748b !important; }
        .dark-theme .text-blue-900 { color: #60a5fa !important; }
        
        .dark-theme .border-gray-50, .dark-theme .border-gray-100, .dark-theme .border-gray-200 { border-color: #475569 !important; }
        
        .dark-theme input, .dark-theme textarea { background-color: #334155 !important; color: #f8fafc !important; border-color: #475569 !important; }
        .dark-theme input::placeholder, .dark-theme textarea::placeholder { color: #64748b !important; }
      `}</style>

      {/* Sidebar Navigation */}
      <div className="w-full lg:w-72 shrink-0 space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 px-2">{t('settings', 'Settings')}</h1>
        <div className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all group ${
                activeSection === section.id 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <section.icon size={20} className={activeSection === section.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'} />
                <span className="font-bold text-sm">{t(section.labelKey, section.labelKey)}</span>
              </div>
              <ChevronRight size={16} className={activeSection === section.id ? 'opacity-100 text-white' : 'opacity-0'} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px] transition-colors duration-300">
        <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Profile Settings */}
              {activeSection === 'profile' && (
                <div className="space-y-8">
                  {/* Profile Header */}
                  <div className="flex items-center gap-6 pb-8 border-b border-gray-50">
                    <div className="relative group cursor-pointer">
                      <img 
                        src="https://picsum.photos/seed/ragini/150/150" 
                        alt="Profile" 
                        className="w-24 h-24 rounded-[1.25rem] object-cover shadow-sm border border-gray-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/50 rounded-[1.25rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold">
                        {t('change_photo', 'Change')}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{t('personal_info', 'Personal Information')}</h2>
                      <p className="text-sm text-gray-500 font-medium mt-1">{t('update_photo', 'Update your photo and personal details.')}</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <label className="block text-sm font-bold text-gray-700">{t('full_name', 'Full Name')}</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName} 
                        onChange={handleInputChange}
                        className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-sm text-gray-900 font-medium shadow-sm" 
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label className="block text-sm font-bold text-gray-700">{t('email', 'Email Address')}</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email} 
                        onChange={handleInputChange}
                        className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-sm text-gray-900 font-medium shadow-sm" 
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2.5">
                      <label className="block text-sm font-bold text-gray-700">{t('bio', 'Bio')}</label>
                      <textarea 
                        rows={5} 
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none resize-none text-sm text-gray-900 font-medium shadow-sm" 
                        placeholder={t('bio_placeholder', 'Tell us about yourself...')} 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{t('security_title', 'Security')}</h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">{t('security_desc', 'Manage your password and account security.')}</p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4 border-b border-gray-50 pb-8">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('change_password', 'Change Password')}</h3>
                      <div className="space-y-4 max-w-md">
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder={t('curr_pass', 'Current Password')} 
                            className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-sm shadow-sm" 
                          />
                          <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <input type="password" placeholder={t('new_pass', 'New Password')} className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-sm shadow-sm" />
                        <input type="password" placeholder={t('conf_pass', 'Confirm New Password')} className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-sm shadow-sm" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-100">
                          <Shield className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-blue-900 text-sm">{t('two_factor', 'Two-Factor Authentication')}</p>
                          <p className="text-xs text-blue-600 mt-0.5 font-medium">{t('two_factor_desc', 'Add an extra layer of security to your account.')}</p>
                        </div>
                      </div>
                      <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors">
                        {t('enable', 'Enable')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeSection === 'appearance' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{t('appearance_title', 'Appearance')}</h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">{t('appearance_desc', 'Customize how the application looks to you.')}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-w-md">
                    <button 
                      onClick={() => setIsDarkMode(false)}
                      className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${!isDarkMode ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                    >
                      <Sun size={32} className={!isDarkMode ? 'text-blue-600' : 'text-gray-400'} />
                      <span className={`font-bold text-sm ${!isDarkMode ? 'text-blue-900' : 'text-gray-500'}`}>{t('light_mode', 'Light Mode')}</span>
                    </button>
                    <button 
                      onClick={() => setIsDarkMode(true)}
                      className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${isDarkMode ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                    >
                      <Moon size={32} className={isDarkMode ? 'text-blue-600' : 'text-gray-400'} />
                      <span className={`font-bold text-sm ${isDarkMode ? 'text-blue-900' : 'text-gray-500'}`}>{t('dark_mode', 'Dark Mode')}</span>
                    </button>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('accent_color', 'Accent Color')}</h3>
                    <div className="flex gap-4">
                      {['#2563eb', '#10b981', '#f97316', '#ef4444', '#8b5cf6'].map((color) => (
                        <button 
                          key={color} 
                          className="w-10 h-10 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        >
                          {color === '#2563eb' && <Check size={18} strokeWidth={3} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Language Settings */}
              {activeSection === 'language' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{t('lang_title', 'Language & Region')}</h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">{t('lang_desc', 'Choose your preferred language for the interface.')}</p>
                  </div>

                  <div className="grid gap-4 max-w-md">
                    {[
                      { code: 'en', name: 'English', native: 'English' },
                      { code: 'hi', name: 'Hindi', native: 'हिंदी' },
                      { code: 'mr', name: 'Marathi', native: 'मराठी' }
                    ].map(l => (
                      <button 
                        key={l.code}
                        onClick={() => setAppLang(l.code as 'en' | 'hi' | 'mr')}
                        className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                          appLang === l.code ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                      >
                        <div className="flex flex-col text-left">
                          <span className={`font-bold text-base ${appLang === l.code ? 'text-blue-900' : 'text-gray-900'}`}>{l.native}</span>
                          <span className="text-xs text-gray-500 mt-0.5 font-medium">{l.name}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${appLang === l.code ? 'border-blue-600' : 'border-gray-300'}`}>
                          {appLang === l.code && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Data Management */}
              {activeSection === 'data' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{t('data_title', 'Data Management')}</h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">{t('data_desc', 'Control your data and export your information.')}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-6 bg-white rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200">
                          <Download size={18} className="text-gray-500" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{t('export_data', 'Export Personal Data')}</p>
                          <p className="text-xs text-gray-500 mt-0.5 font-medium">{t('export_desc', 'Download a copy of all your data in JSON format.')}</p>
                        </div>
                      </div>
                      <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors shadow-sm text-gray-700">{t('export_btn', 'Export')}</button>
                    </div>

                    <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100 flex items-center justify-between transition-colors hover:bg-red-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-red-100 shadow-sm">
                          <Trash2 size={18} className="text-red-500" />
                        </div>
                        <div>
                          <p className="font-bold text-red-700 text-sm">{t('delete_acc', 'Delete Account')}</p>
                          <p className="text-xs text-red-500 mt-0.5 font-medium">{t('delete_desc', 'Permanently delete your account and all associated data.')}</p>
                        </div>
                      </div>
                      <button className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors shadow-sm shadow-red-600/20">{t('delete_btn', 'Delete')}</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder for other sections */}
              {!['profile', 'security', 'appearance', 'language', 'data'].includes(activeSection) && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center text-gray-400 border border-gray-100">
                    <AlertCircle size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t(sections.find(s => s.id === activeSection)?.labelKey || '', sections.find(s => s.id === activeSection)?.labelKey || '')}</h3>
                    <p className="text-sm font-medium text-gray-500 max-w-xs mx-auto leading-relaxed">{t('under_dev', 'This section is currently under development. Check back soon for more features!')}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-6 md:px-10 bg-gray-50/50 border-t border-gray-100 flex justify-end items-center gap-4 shrink-0 transition-colors duration-300">
          <button className="px-6 py-2.5 text-sm text-gray-600 font-bold hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
            {t('cancel', 'Cancel')}
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? t('saving', 'Saving...') : t('save', 'Save Changes')}
          </button>
        </div>
      </div>
    </div>
  );
}