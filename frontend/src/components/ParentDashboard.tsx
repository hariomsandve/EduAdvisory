import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// --- ICONS ---
const Icon = ({ name, className = '' }) => {
  const icons = {
    GraduationCap: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" /></svg>,
    Overview: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    Academic: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
    Calendar: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    Tasks: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    Message: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    Download: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
    Wifi: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>,
    Globe: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Bell: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    Plus: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
    AlertCircle: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Info: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    X: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    Newspaper: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>,
    Video: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    ChevronLeft: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>,
    ChevronRight: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
    CheckCircle: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    XCircle: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l-2-2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Clock: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    FileText: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    Send: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
    Paperclip: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>,
    Spinner: <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>,
    Award: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    BookOpen: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" /></svg>,
    LogOut: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
    Moon: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
    Sun: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  };
  return icons[name] || null;
};

// --- CIRCULAR PROGRESS COMPONENT ---
const CircularProgress = ({ value, label, colorClass, strokeClass }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} className="text-gray-100" strokeWidth="6" fill="transparent" stroke="currentColor" />
        <circle 
          cx="40" cy="40" r={radius} 
          className={strokeClass} 
          strokeWidth="6" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
          strokeLinecap="round" stroke="currentColor" 
        />
      </svg>
      <div className={`absolute text-lg font-bold ${colorClass}`}>{label}</div>
    </div>
  );
};

// --- DATA ---
const trendData = [
  { name: 'Exam 1', score: 70 },
  { name: 'Exam 2', score: 72 },
  { name: 'Exam 3', score: 85 },
  { name: 'Exam 4', score: 82 },
  { name: 'Exam 5', score: 92 },
];

const attendanceTrend = [
  { name: 'Jan', val: 95 }, { name: 'Feb', val: 92 }, { name: 'Mar', val: 98 }, 
  { name: 'Apr', val: 88 }, { name: 'May', val: 90 }, { name: 'Jun', val: 96 }, 
  { name: 'Jul', val: 94 }, { name: 'Aug', val: 95 }, { name: 'Sep', val: 91 }, 
  { name: 'Oct', val: 89 }, { name: 'Nov', val: 93 }, { name: 'Dec', val: 95 }
];

const initialParentTasks = [
  { id: 1, title: 'Pay Term 2 Tuition Fee', desc: 'Fee deadline is approaching. Ensure payment to avoid late charges.', type: 'urgent', date: 'Tomorrow', completed: false, category: 'finance' },
  { id: 2, title: 'Sign Field Trip Permission Slip', desc: 'Science museum visit scheduled for next week.', type: 'action', date: 'Oct 28', completed: false, category: 'school' },
  { id: 3, title: 'Review Math Assignment', desc: 'Peter scored 72% on the last algebra test. Review the mistakes together.', type: 'academic', date: 'This Week', completed: false, category: 'academic' },
  { id: 4, title: 'Attend Parent-Teacher Meeting', desc: 'Quarterly review with Mrs. Parker to discuss progress.', type: 'action', date: 'Nov 02', completed: false, category: 'school' },
  { id: 5, title: 'Upload Medical Health Report', desc: 'Annual mandatory health checkup documents.', type: 'normal', date: 'Nov 05', completed: true, category: 'admin' },
];

const initialChats = [
  {
    id: 'c1',
    name: 'Mrs. Parker',
    role: 'Math Teacher',
    avatar: 'https://i.pravatar.cc/150?u=teacher1',
    online: true,
    messages: [
      { id: 'm1', sender: 'teacher', text: 'Hello Mr. Stark, Peter did great on his algebra test today!', time: '10:30 AM' },
      { id: 'm2', sender: 'parent', text: 'That is wonderful news! Thank you for the update.', time: '10:45 AM' },
      { id: 'm3', sender: 'teacher', text: 'Please ensure he completes the worksheet on chapter 4 by Friday.', time: '10:46 AM' }
    ]
  },
  {
    id: 'c2',
    name: 'Mr. Smith',
    role: 'Science Teacher',
    avatar: 'https://i.pravatar.cc/150?u=teacher2',
    online: false,
    messages: [
      { id: 'm1', sender: 'parent', text: 'Hi Mr. Smith, what materials are needed for the science project?', time: 'Yesterday' },
      { id: 'm2', sender: 'teacher', text: 'Just some cardboard, glue, and a battery. I will send a detailed list later.', time: 'Yesterday' }
    ]
  },
  {
    id: 'c3',
    name: 'School Admin',
    role: 'Administration',
    avatar: 'https://i.pravatar.cc/150?u=admin',
    online: true,
    messages: [
      { id: 'm1', sender: 'teacher', text: 'Reminder: Term 2 fees are due next week.', time: 'Mon' }
    ]
  }
];

const languagesList = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
];

export default function App() {
  const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY_HERE";
  const NEWS_API_KEY = "YOUR_NEWS_API_KEY_HERE";

  const [activeMenu, setActiveMenu] = useState('Messages'); 
  const [darkMode, setDarkMode] = useState(false);
  
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [appLanguage, setAppLanguage] = useState('en');

  // --- CHILD PROFILES STATE ---
  const [children, setChildren] = useState([
    { id: 'Peter', name: 'Peter', grade: '10th', avatar: 'https://i.pravatar.cc/150?u=peter' },
    { id: 'Morgan', name: 'Morgan', grade: '4th', avatar: 'https://i.pravatar.cc/150?u=morgan' }
  ]);
  const [activeChild, setActiveChild] = useState('Peter');
  
  // --- ADD CHILD MODAL STATE ---
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [childFormStep, setChildFormStep] = useState(1);
  const [isSubmittingChild, setIsSubmittingChild] = useState(false);
  const defaultChildForm = {
    name: '', dob: '', gender: '',
    school: '', schoolType: 'Private', state: 'Maharashtra', city: 'Mumbai', grade: '9', section: '', year: '2024-25',
    guardian: '', relation: 'Father', language: 'English', phone: '', email: ''
  };
  const [newChildData, setNewChildData] = useState(defaultChildForm);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'danger', icon: 'AlertCircle', text: 'Missed PTM on Oct 15th' },
    { id: 2, type: 'warning', icon: 'Info', text: 'Scholarship Deadline: 2 Days left' }
  ]);

  // News State
  const [newsData, setNewsData] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);
  const [newsLanguage, setNewsLanguage] = useState('en');

  // Calendar State
  const [calDate, setCalDate] = useState(new Date(2026, 2, 1)); 
  const currentMonthIdx = calDate.getMonth();
  const currentYear = calDate.getFullYear();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Task & Modal States
  const [tasks, setTasks] = useState(initialParentTasks);
  const [syncStatus, setSyncStatus] = useState('Sync Calendar');
  const [showMarksheet, setShowMarksheet] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Chat State
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState('c1');
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);

  // --- ADD CHILD HANDLERS ---
  const handleChildInputChange = (e) => {
    const { name, value } = e.target;
    setNewChildData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    if (childFormStep === 1 && (!newChildData.name || !newChildData.dob || !newChildData.gender)) return false;
    if (childFormStep === 2 && (!newChildData.school || !newChildData.grade || !newChildData.section)) return false;
    if (childFormStep === 3 && (!newChildData.guardian || !newChildData.phone)) return false;
    return true;
  };

  const nextChildStep = () => {
    if (!validateStep()) return alert("Please fill all required fields.");
    setChildFormStep(prev => prev + 1);
  };

  const prevChildStep = () => setChildFormStep(prev => prev - 1);

  const submitNewChild = () => {
    setIsSubmittingChild(true);
    setTimeout(() => {
      const firstName = newChildData.name.split(' ')[0] || 'Student';
      const newChild = {
        id: firstName + Date.now(),
        name: firstName,
        grade: newChildData.grade + (isNaN(newChildData.grade) ? '' : 'th'),
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
      };
      
      setChildren([...children, newChild]);
      setActiveChild(newChild.id);
      
      // Reset Modal
      setIsSubmittingChild(false);
      setShowAddChildModal(false);
      setChildFormStep(1);
      setNewChildData(defaultChildForm);
      setActiveMenu('Overview'); // Reset to overview to see fresh dashboard
    }, 1500);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // --- CALENDAR SYNC LOGIC ---
  const handleSyncCalendar = () => {
    setSyncStatus('Generating Sync File...');
    
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//EduPro Dashboard//EN\n";
    
    // Add pending tasks to the calendar
    tasks.filter(t => !t.completed).forEach((task, index) => {
      const now = new Date();
      now.setDate(now.getDate() + index + 1); // Mock future dates based on list order
      const dateStr = now.toISOString().replace(/-|:|\.\d+/g, "").substring(0, 8);
      
      icsContent += "BEGIN:VEVENT\n";
      icsContent += `DTSTART:${dateStr}T090000Z\n`; // Start at 9 AM UTC
      icsContent += `DTEND:${dateStr}T100000Z\n`;   // End at 10 AM UTC
      icsContent += `SUMMARY:EduPro: ${task.title}\n`;
      icsContent += `DESCRIPTION:${task.desc}\n`;
      icsContent += "END:VEVENT\n";
    });
    
    icsContent += "END:VCALENDAR";
    
    // Create and trigger download of the .ics file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'edupro_pending_tasks.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // UX Feedback
    setSyncStatus('Synced to Device!');
    setTimeout(() => setSyncStatus('Download .ics File'), 3000);
  };

  const addToGoogleCalendar = (task, index) => {
    const start = new Date();
    start.setDate(start.getDate() + index + 1); // Schedule for upcoming days
    start.setHours(9, 0, 0); // 9 AM
    const end = new Date(start);
    end.setHours(10, 0, 0); // 10 AM

    // Format for Google Calendar URL (YYYYMMDDTHHMMSSZ)
    const formatTime = (date) => date.toISOString().replace(/-|:|\.\d+/g, "").substring(0, 15) + "Z";
    
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', `EduPro: ${task.title}`);
    url.searchParams.append('details', task.desc);
    url.searchParams.append('dates', `${formatTime(start)}/${formatTime(end)}`);
    
    window.open(url.toString(), '_blank');
  };

  // --- CHAT LOGIC ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = { 
      id: `m${Date.now()}`, 
      sender: 'parent', 
      text: messageInput, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    setChats(chats.map(c => {
      if(c.id === activeChatId) {
        return { ...c, messages: [...c.messages, newMsg] };
      }
      return c;
    }));
    
    setMessageInput('');
  };

  // Auto-scroll chat to bottom when messages update
  useEffect(() => {
    if (activeMenu === 'Messages') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats, activeChatId, activeMenu]);

  useEffect(() => {
    const fetchNews = async () => {
      setNewsLoading(true);
      try {
        if (NEWS_API_KEY === "YOUR_NEWS_API_KEY_HERE") {
          const localizedMocks = {
            en: [
              { title: "New Scholarship Programs Announced", description: "The Department of Education has released new guidelines and funding for STEM scholarships focusing on high school students.", date: "Today, 10:00 AM", url: "#" },
              { title: "How Project-Based Learning is Shaping the Future", description: "Experts say moving away from traditional rote memorization and towards hands-on projects helps improve student retention.", date: "Yesterday", url: "#" }
            ]
          };
          setTimeout(() => {
            setNewsData(localizedMocks[newsLanguage] || localizedMocks['en']);
            setNewsLoading(false);
          }, 600);
          return;
        }

        const response = await fetch(`https://newsapi.org/v2/everything?q=education&language=${newsLanguage}&apiKey=${NEWS_API_KEY}&pageSize=2`);
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        
        const formattedNews = data.articles.map(article => ({
          title: article.title,
          description: article.description,
          date: new Date(article.publishedAt).toLocaleDateString(),
          url: article.url
        }));
        
        setNewsData(formattedNews);
        setNewsLoading(false);
      } catch (err) {
        setNewsError(err.message);
        setNewsLoading(false);
      }
    };

    fetchNews();
  }, [newsLanguage]);

  const dismissAlert = (id) => setAlerts(alerts.filter(alert => alert.id !== id));

  const navItems = [
    { name: 'Overview', icon: 'Overview' },
    { name: 'Academic', icon: 'Academic' },
    { name: 'Attendance', icon: 'Calendar' },
    { name: 'Tasks', icon: 'Tasks' },
    { name: 'Messages', icon: 'Message' },
  ];

  const heatmapData = [
    'present', 'present', 'present', 'present', 'empty', 'empty', 'empty',
    'present', 'late', 'present', 'present', 'present', 'empty', 'empty',
    'absent', 'present', 'present', 'present', 'present', 'empty', 'empty',
    'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'
  ];

  // Calendar Logic
  const daysInMonth = new Date(currentYear, currentMonthIdx + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonthIdx, 1).getDay();

  const handlePrevMonth = () => setCalDate(new Date(currentYear, currentMonthIdx - 1, 1));
  const handleNextMonth = () => setCalDate(new Date(currentYear, currentMonthIdx + 1, 1));
  const handleMonthSelect = (idx) => setCalDate(new Date(currentYear, idx, 1));

  const getDayStatus = (day) => {
    if ([1, 8, 15, 22, 29].includes(day)) return 'holiday';
    if ([5].includes(day)) return 'late';
    if ([14, 23].includes(day)) return 'absent';
    return 'present';
  };

  const activeChatData = chats.find(c => c.id === activeChatId);

  return (
    <div className={`flex h-screen font-sans overflow-hidden relative transition-colors duration-300 ${darkMode ? 'dark-theme bg-gray-900 text-gray-100' : 'bg-[#f5f7fa] text-gray-900'}`}>
      <style>{`
        .dark-theme { background-color: #111827 !important; color: #f3f4f6 !important; }
        .dark-theme .bg-white { background-color: #1f2937 !important; border-color: #374151 !important; color: #f3f4f6 !important; }
        .dark-theme .bg-\\[\\#f5f7fa\\] { background-color: #111827 !important; }
        .dark-theme .bg-gray-50, .dark-theme .bg-gray-50\\/50, .dark-theme .bg-gray-50\\/30, .dark-theme .bg-gray-50\\/20 { background-color: #374151 !important; border-color: #4b5563 !important; }
        .dark-theme .bg-gray-100 { background-color: #4b5563 !important; }
        .dark-theme .text-gray-900, .dark-theme .text-gray-800 { color: #f9fafb !important; }
        .dark-theme .text-gray-700, .dark-theme .text-gray-600 { color: #d1d5db !important; }
        .dark-theme .text-gray-500, .dark-theme .text-gray-400 { color: #9ca3af !important; }
        .dark-theme .text-gray-100 { color: #374151 !important; }
        .dark-theme .border-gray-50, .dark-theme .border-gray-100 { border-color: #374151 !important; }
        .dark-theme .border-gray-200 { border-color: #4b5563 !important; }
        
        .dark-theme .bg-blue-50, .dark-theme .bg-blue-50\\/50 { background-color: rgba(37, 99, 235, 0.15) !important; border-color: rgba(37, 99, 235, 0.3) !important; }
        .dark-theme .bg-green-50 { background-color: rgba(16, 185, 129, 0.15) !important; }
        .dark-theme .bg-yellow-50 { background-color: rgba(245, 158, 11, 0.15) !important; }
        .dark-theme .bg-red-50 { background-color: rgba(239, 68, 68, 0.15) !important; }
        .dark-theme .bg-purple-50 { background-color: rgba(139, 92, 246, 0.15) !important; }
        
        .dark-theme .text-blue-600 { color: #60a5fa !important; }
        .dark-theme .text-green-600 { color: #34d399 !important; }
        .dark-theme .text-yellow-600 { color: #fbbf24 !important; }
        .dark-theme .text-red-600 { color: #f87171 !important; }
        .dark-theme .text-purple-600 { color: #a78bfa !important; }
        
        .dark-theme .bg-gradient-to-r { background: #1f2937 !important; border-color: #374151 !important; }
        .dark-theme .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5) !important; }
        
        .dark-theme input, .dark-theme select, .dark-theme textarea { background-color: #374151 !important; color: #f3f4f6 !important; border-color: #4b5563 !important; }
        .dark-theme button.bg-white:hover { background-color: #374151 !important; }
      `}</style>
      
      {/* --- ADD CHILD MODAL --- */}
      {showAddChildModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 transition-opacity">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col h-[90vh] md:h-auto max-h-[90vh]">
            
            {/* Header */}
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold text-gray-800">Add Your Child</h2>
              <button onClick={() => setShowAddChildModal(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <Icon name="X" className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="px-8 pt-6 flex gap-2 shrink-0">
              {[1,2,3,4].map(step => (
                <div key={step} className={`h-1.5 flex-1 rounded-full transition-colors ${
                  childFormStep === step ? 'bg-blue-600' : childFormStep > step ? 'bg-green-500' : 'bg-gray-100'
                }`}></div>
              ))}
            </div>

            {/* Form Body */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {childFormStep === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  <h3 className="text-lg font-bold mb-4">Child's Basic Information</h3>
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Child's Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" value={newChildData.name} onChange={handleChildInputChange} className="w-full bg-gray-50 border border-gray-200 text-sm py-3 px-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="e.g. Rahul Sharma" />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Date of Birth <span className="text-red-500">*</span></label>
                        <input type="date" name="dob" value={newChildData.dob} onChange={handleChildInputChange} className="w-full bg-gray-50 border border-gray-200 text-sm py-3 px-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Gender <span className="text-red-500">*</span></label>
                        <select name="gender" value={newChildData.gender} onChange={handleChildInputChange} className="w-full bg-gray-50 border border-gray-200 text-sm py-3 px-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {childFormStep === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <h3 className="text-lg font-bold mb-4">School Information</h3>
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">School Name <span className="text-red-500">*</span></label>
                      <select name="school" value={newChildData.school} onChange={handleChildInputChange} className="w-full bg-gray-50 border border-gray-200 text-sm py-3 px-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                        <option value="">Select School</option>
                        <option value="KV No.1">Kendriya Vidyalaya No.1</option>
                        <option value="DPS">Delhi Public School</option>
                        <option value="StXaviers">St. Xaviers High School</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Class/Grade <span className="text-red-500">*</span></label>
                        <select name="grade" value={newChildData.grade} onChange={handleChildInputChange} className="w-full bg-gray-50 border border-gray-200 text-sm py-3 px-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                          {[1,2,3,4,5,6,7,8,9,10,11,12].map(g => <option key={g} value={g}>Class {g}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Section <span className="text-red-500">*</span></label>
                        <input type="text" name="section" value={newChildData.section} onChange={handleChildInputChange} placeholder="e.g. A" className="w-full bg-gray-50 border border-gray-200 text-sm py-3 px-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {childFormStep === 3 && (
                <div className="space-y-5 animate-fadeIn">
                  <h3 className="text-lg font-bold mb-4">Your Information</h3>
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Guardian Name <span className="text-red-500">*</span></label>
                      <input type="text" name="guardian" value={newChildData.guardian} onChange={handleChildInputChange} placeholder="Your Full Name" className="w-full bg-gray-50 border border-gray-200 text-sm py-3 px-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Phone Number <span className="text-red-500">*</span></label>
                      <input type="tel" name="phone" value={newChildData.phone} onChange={handleChildInputChange} placeholder="9876543210" className="w-full bg-gray-50 border border-gray-200 text-sm py-3 px-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                  </div>
                </div>
              )}

              {childFormStep === 4 && (
                <div className="space-y-5 animate-fadeIn">
                  <h3 className="text-lg font-bold mb-4">Review & Confirm</h3>
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-4">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Child Information</p>
                      <p className="text-sm font-semibold">{newChildData.name || 'N/A'} • {newChildData.gender || 'N/A'} • {newChildData.dob || 'N/A'}</p>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Schooling</p>
                      <p className="text-sm font-semibold">{newChildData.school || 'N/A'} • Class {newChildData.grade} ({newChildData.section})</p>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Parent/Guardian</p>
                      <p className="text-sm font-semibold">{newChildData.guardian || 'N/A'} • {newChildData.phone || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="px-8 py-5 border-t border-gray-100 flex justify-between items-center shrink-0 bg-gray-50/50">
              {childFormStep > 1 ? (
                <button onClick={prevChildStep} className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">
                  Back
                </button>
              ) : <div></div>}
              
              {childFormStep < 4 ? (
                <button onClick={nextChildStep} className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-600/20 transition-colors">
                  Continue
                </button>
              ) : (
                <button onClick={submitNewChild} disabled={isSubmittingChild} className="px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold shadow-md shadow-green-500/20 transition-colors flex items-center gap-2">
                  {isSubmittingChild ? <><Icon name="Spinner" className="w-4 h-4" /> Adding...</> : 'Confirm & Add Child'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- GOOGLE CALENDAR MODAL --- */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 transition-opacity">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col transform transition-transform duration-300 scale-100 h-[85vh] md:h-[75vh]">
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-blue-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <Icon name="Calendar" className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">Google Calendar Sync</h2>
              </div>
              <button 
                onClick={() => setShowCalendarModal(false)} 
                className="p-2.5 bg-white rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm border border-gray-100"
              >
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left: Pending Tasks to Add */}
              <div className="w-full md:w-1/3 border-r border-gray-100 p-6 overflow-y-auto bg-gray-50/50 flex flex-col">
                <h3 className="font-bold text-gray-800 mb-4 shrink-0">Pending Tasks</h3>
                <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                  {tasks.filter(t => !t.completed).length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3"><Icon name="CheckCircle" className="w-6 h-6" /></div>
                      <p className="text-sm text-gray-500 font-medium">All tasks completed!<br/>Nothing to sync.</p>
                    </div>
                  ) : (
                    tasks.filter(t => !t.completed).map((task, idx) => (
                      <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="text-sm font-bold text-gray-800 mb-1">{task.title}</h4>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.desc}</p>
                        <button 
                          onClick={() => addToGoogleCalendar(task, idx)} 
                          className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Icon name="Plus" className="w-3 h-3" /> Add to Calendar
                        </button>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Fallback Sync for multiple */}
                <div className="mt-4 pt-4 border-t border-gray-200 shrink-0">
                  <p className="text-[10px] text-gray-500 mb-2 text-center">Want to add all tasks at once?</p>
                  <button 
                    onClick={handleSyncCalendar} 
                    className="w-full py-2.5 bg-gray-800 hover:bg-gray-900 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Icon name="Download" className="w-4 h-4" /> {syncStatus === 'Sync Calendar' ? 'Download .ics File' : syncStatus}
                  </button>
                </div>
              </div>
              
              {/* Right: Embedded Interactive Calendar */}
              <div className="w-full md:w-2/3 p-6 h-full min-h-[300px]">
                <div className="w-full h-full rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
                  <iframe 
                    src="https://calendar.google.com/calendar/embed?src=en.indian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FKolkata&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0" 
                    style={{border: 0}} 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MARKSHEET MODAL --- */}
      {showMarksheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 transition-opacity">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col transform transition-transform duration-300 scale-100">
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mid-Term Report Card</h2>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Academic Year 2025-2026</p>
              </div>
              <button 
                onClick={() => setShowMarksheet(false)} 
                className="p-2.5 bg-white rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm border border-gray-100"
              >
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto max-h-[70vh]">
              {/* Student Info */}
              <div className="flex items-center gap-5 mb-8">
                <img src={children.find(c => c.id === activeChild)?.avatar || "https://i.pravatar.cc/150"} className="w-16 h-16 rounded-2xl border border-gray-200 shadow-sm" alt="Student" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{children.find(c => c.id === activeChild)?.name}</h3>
                  <div className="flex gap-6 mt-1 text-sm font-semibold text-gray-500">
                    <p>Grade: <span className="text-gray-900">{children.find(c => c.id === activeChild)?.grade} - Section A</span></p>
                    <p>Roll No: <span className="text-gray-900">24</span></p>
                  </div>
                </div>
              </div>
              
              {/* Marks Table */}
              <div className="rounded-2xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="p-4 font-bold">Subject</th>
                      <th className="p-4 text-center font-bold">Max Marks</th>
                      <th className="p-4 text-center font-bold">Obtained</th>
                      <th className="p-4 text-center font-bold">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-bold text-gray-800">
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">Mathematics</td><td className="p-4 text-center text-gray-400">100</td><td className="p-4 text-center text-blue-600 text-base">92</td>
                      <td className="p-4 text-center"><span className="text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-lg">A+</span></td>
                    </tr>
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">Science</td><td className="p-4 text-center text-gray-400">100</td><td className="p-4 text-center text-blue-600 text-base">88</td>
                      <td className="p-4 text-center"><span className="text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-lg">A</span></td>
                    </tr>
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">English</td><td className="p-4 text-center text-gray-400">100</td><td className="p-4 text-center text-blue-600 text-base">85</td>
                      <td className="p-4 text-center"><span className="text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg">A</span></td>
                    </tr>
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">History</td><td className="p-4 text-center text-gray-400">100</td><td className="p-4 text-center text-blue-600 text-base">76</td>
                      <td className="p-4 text-center"><span className="text-yellow-600 bg-yellow-50 border border-yellow-100 px-3 py-1 rounded-lg">B+</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">Computer Sci.</td><td className="p-4 text-center text-gray-400">100</td><td className="p-4 text-center text-blue-600 text-base">95</td>
                      <td className="p-4 text-center"><span className="text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-lg">A+</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Summary KPI */}
              <div className="mt-6 flex justify-between bg-blue-600 text-white p-6 rounded-2xl shadow-md bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                 <div><p className="text-xs text-blue-200 font-semibold tracking-wider uppercase mb-1">Total Percentage</p><p className="text-3xl font-bold">87.2%</p></div>
                 <div><p className="text-xs text-blue-200 font-semibold tracking-wider uppercase mb-1">Overall Grade</p><p className="text-3xl font-bold text-center">A</p></div>
                 <div className="text-right"><p className="text-xs text-blue-200 font-semibold tracking-wider uppercase mb-1">Attendance</p><p className="text-3xl font-bold">95%</p></div>
              </div>

              {/* Teacher Remarks */}
              <div className="mt-8 bg-gray-50 p-5 rounded-2xl border border-gray-100 relative">
                <Icon name="Message" className="absolute top-4 right-4 w-6 h-6 text-gray-300" />
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Class Teacher's Remarks</h4>
                <p className="text-sm font-medium text-gray-700 italic">"{children.find(c => c.id === activeChild)?.name} is an exceptional student with a strong aptitude for analytical subjects. With slight improvement in History, he can easily secure the top rank in class. Keep up the excellent work!" - Mrs. Parker</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-5 bg-gray-50/80 border-t border-gray-100 flex justify-end gap-3">
              <button 
                className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-100 transition-colors" 
                onClick={() => setShowMarksheet(false)}
              >
                Close
              </button>
              <button 
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors flex items-center gap-2" 
                onClick={() => window.print()}
              >
                <Icon name="Download" className="w-4 h-4" /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- LEFT SIDEBAR --- */}
      <aside className="w-[260px] bg-white border-r border-gray-100 flex flex-col px-6 py-8 overflow-y-auto z-10 shrink-0">
        <div className="flex items-center gap-3 mb-12 px-2">
          <Icon name="GraduationCap" className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold">EduParent</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all ${
                activeMenu === item.name 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon name={item.icon} className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-8 space-y-3">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition-colors">
            <Icon name="Download" className="w-4 h-4" /> Download Report
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gray-50 text-gray-700 font-semibold hover:bg-gray-100 transition-colors">
            <Icon name="Wifi" className="w-4 h-4" /> Save Offline
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-6">
          <div className="flex items-center gap-3 px-2">
            <img src="https://i.pravatar.cc/150?u=parent" alt="Parent" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="text-sm font-bold">Mr. ANIL</span>
              <span className="text-xs text-gray-400">Parent ID: 8842</span>
            </div>
          </div>
          
          <div 
            className="flex items-center justify-between px-2 cursor-pointer group"
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className={`flex items-center gap-2 rounded-full p-1 w-14 transition-colors duration-300 ${darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm flex items-center justify-center transition-transform duration-300 ${darkMode ? 'translate-x-7' : 'translate-x-0'}`}>
                {darkMode ? <Icon name="Moon" className="w-3 h-3 text-blue-600" /> : <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>}
              </div>
            </div>
            <span className="text-xs text-gray-400 font-medium group-hover:text-gray-600 transition-colors">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </div>

          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to log out?')) {
                window.location.href = '/';
              }
            }} 
            className="flex items-center gap-3 px-2 mt-2 text-red-500 hover:text-red-600 transition-colors"
          >
            <Icon name="LogOut" className="w-5 h-5" />
            <span className="text-sm font-bold">Log Out</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto p-8 flex flex-col">
        
        {/* Header section (Always visible) */}
        <header className="flex justify-between items-start mb-10 shrink-0">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, Mr. Stark! 👋</h1>
            <p className="text-gray-500 text-sm">Here is {children.find(c => c.id === activeChild)?.name || 'your child'}'s daily progress summary.</p>

            {/* DYNAMIC Child Selector */}
            <div className="flex items-center gap-6 mt-8 overflow-x-auto pb-4">
              {children.map(child => (
                <button 
                  key={child.id}
                  onClick={() => setActiveChild(child.id)}
                  className={`flex flex-col items-center gap-2 relative min-w-[60px] ${activeChild === child.id ? 'opacity-100' : 'opacity-50 hover:opacity-75 transition-opacity'}`}
                >
                  <img src={child.avatar} alt={child.name} className={`w-12 h-12 rounded-full border-2 ${activeChild === child.id ? 'border-blue-600' : 'border-transparent border-gray-200'} shadow-sm object-cover bg-white`} />
                  <span className="text-xs font-bold">{child.name} ({child.grade})</span>
                  {activeChild === child.id && <div className="absolute -bottom-2 w-full h-1 bg-blue-600 rounded-t-md"></div>}
                </button>
              ))}

              <button onClick={() => setShowAddChildModal(true)} className="flex flex-col items-center gap-2 pb-5 opacity-50 hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-white hover:border-blue-500 hover:text-blue-500 transition-colors">
                  <Icon name="Plus" className="w-5 h-5 text-inherit" />
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="bg-white flex items-center gap-2 px-5 py-2.5 rounded-full shadow-sm text-sm font-bold border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <Icon name="Globe" className="w-4 h-4 text-blue-500" /> 
                {languagesList.find(l => l.code === appLanguage)?.name || 'Language'}
              </button>
              
              {showLangDropdown && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-100 shadow-xl rounded-2xl w-48 overflow-hidden z-50">
                  <div className="max-h-64 overflow-y-auto">
                    {languagesList.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => { 
                          setAppLanguage(lang.code); 
                          setNewsLanguage(lang.code); // Automatically update news feed language
                          setShowLangDropdown(false); 
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${appLanguage === lang.code ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-gray-700'}`}
                      >
                        {lang.nativeName} <span className="text-gray-400 text-xs ml-1">({lang.name})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="bg-white p-3 rounded-full shadow-sm border border-gray-100 relative hover:bg-gray-50">
              <Icon name="Bell" className="w-5 h-5 text-gray-500" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* --- OVERVIEW TAB CONTENT --- */}
        {activeMenu === 'Overview' && (
          <div className="max-w-4xl space-y-6">
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Today's Overview</h2>
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> Live
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-3xl shadow-sm flex items-center gap-4 border border-gray-50">
                <CircularProgress value={86} label="86%" colorClass="text-blue-600" strokeClass="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-0.5">Academic</p>
                  <p className="text-base font-bold mb-2">Excellent</p>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md">Top 5% in Class</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl shadow-sm flex items-center gap-4 border border-gray-50">
                <CircularProgress value={95} label="95%" colorClass="text-green-500" strokeClass="text-green-500" />
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-0.5">Attendance</p>
                  <p className="text-base font-bold mb-2">Regular</p>
                  <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-md">Present Today</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl shadow-sm flex items-center gap-4 border border-gray-50">
                <CircularProgress value={85} label="8.5" colorClass="text-yellow-500" strokeClass="text-yellow-500" />
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-0.5">Behavior</p>
                  <p className="text-base font-bold mb-2">Good</p>
                  <span className="text-[10px] font-bold bg-yellow-50 text-yellow-600 px-2 py-1 rounded-md">No Warnings</span>
                </div>
              </div>
            </div>

            {/* Awareness Score */}
            <div className="bg-gradient-to-r from-white to-blue-50/50 rounded-3xl p-6 shadow-sm border-l-4 border-green-500 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-4xl font-bold text-green-500">72<span className="text-2xl text-gray-300">/100</span></div>
                <div>
                  <p className="text-xs text-gray-400 font-bold mb-1 tracking-wider uppercase">Parent Awareness Score</p>
                  <p className="text-sm font-bold mb-1">Good, but can improve</p>
                  <p className="text-[11px] text-gray-500">Next: Watch today's video</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 italic">
                <Icon name="Info" className="w-4 h-4" /> Based on your activity
              </div>
            </div>

            <h2 className="text-lg font-bold mt-10 mb-4">Academic Performance</h2>
            
            {/* Academic Performance Card */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-50 mb-10">
              <div className="grid grid-cols-2 gap-12">
                
                {/* Table */}
                <div>
                  <h3 className="text-sm font-bold mb-6">Last 5 Exams</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 text-xs font-bold text-gray-400 border-b border-gray-100 pb-3">
                      <span>Subject</span>
                      <span>Score</span>
                      <span>Grade</span>
                    </div>
                    <div className="grid grid-cols-3 text-sm items-center py-2 border-b border-gray-50">
                      <span className="font-semibold">Math</span>
                      <span><b className="font-bold">92</b>/100</span>
                      <div><span className="text-xs font-bold bg-green-50 text-green-600 px-2.5 py-1 rounded-md">A</span></div>
                    </div>
                    <div className="grid grid-cols-3 text-sm items-center py-2 border-b border-gray-50">
                      <span className="font-semibold">Science</span>
                      <span><b className="font-bold">88</b>/100</span>
                      <div><span className="text-xs font-bold bg-green-50 text-green-600 px-2.5 py-1 rounded-md">A-</span></div>
                    </div>
                    <div className="grid grid-cols-3 text-sm items-center py-2">
                      <span className="font-semibold">History</span>
                      <span><b className="font-bold">76</b>/100</span>
                      <div><span className="text-xs font-bold bg-yellow-50 text-yellow-600 px-2.5 py-1 rounded-md">B+</span></div>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div>
                  <h3 className="text-sm font-bold mb-6">Improvement Trend</h3>
                  <div className="h-40 w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}/>
                        <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" activeDot={{ r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </div>

            <h2 className="text-lg font-bold mt-10 mb-4">Education News & Resources</h2>
            
            {/* Education & YouTube News Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Articles List */}
              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-50 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Newspaper" className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-bold">Latest Updates</h3>
                  </div>
                  {/* Language Dropdown for News */}
                  <select 
                    value={newsLanguage}
                    onChange={(e) => setNewsLanguage(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold py-1.5 px-2.5 rounded-lg outline-none cursor-pointer hover:border-blue-300 transition-colors focus:ring-2 focus:ring-blue-500/20 max-w-[130px]"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="mr">मराठी (Marathi)</option>
                    <option value="bn">বাংলা (Bengali)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="gu">ગુજરાતી (Gujarati)</option>
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                    <option value="ml">മലയാളം (Malayalam)</option>
                    <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                  </select>
                </div>
                <div className="space-y-4 flex-1">
                  {newsLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-xs font-semibold text-gray-400 animate-pulse">Loading news...</p>
                    </div>
                  ) : newsError ? (
                    <p className="text-xs text-red-500">Error loading news: {newsError}</p>
                  ) : (
                    newsData.map((article, index) => (
                      <div key={index} className={`pb-4 ${index !== newsData.length - 1 ? 'border-b border-gray-50' : ''}`}>
                        <h4 onClick={() => window.open(article.url, '_blank')} className="text-sm font-bold mb-1 hover:text-blue-600 cursor-pointer transition-colors">{article.title}</h4>
                        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{article.description}</p>
                        <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium">
                          <span>{article.date}</span>
                          <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Read more</a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* YouTube Section */}
              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-50 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Video" className="w-5 h-5 text-red-500" />
                    <h3 className="text-sm font-bold">Featured Video</h3>
                  </div>
                  <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-1 rounded-md">YouTube API</span>
                </div>
                
                {/* Iframe wrapper for video */}
                <div className="flex-1 w-full rounded-2xl overflow-hidden bg-gray-100 relative min-h-[160px]">
                  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" title="YouTube video player" frameBorder="0" allowFullScreen className="absolute top-0 left-0 w-full h-full object-cover"></iframe>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-bold">The Science of Learning</h4>
                  <p className="text-xs text-gray-500 mt-1">Understanding how your child's brain retains information for better academic support at home.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ACADEMIC TAB CONTENT --- */}
        {activeMenu === 'Academic' && (
          <div className="max-w-4xl space-y-6 pb-12">
            {/* KPI Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Icon name="GraduationCap" className="w-6 h-6" /></div>
                <div><p className="text-xs font-bold text-gray-400 uppercase">Overall Grade</p><h3 className="text-2xl font-bold text-gray-800">A+ <span className="text-sm text-green-500 font-semibold">(92%)</span></h3></div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center"><Icon name="Award" className="w-6 h-6" /></div>
                <div><p className="text-xs font-bold text-gray-400 uppercase">Class Rank</p><h3 className="text-2xl font-bold text-gray-800">4th <span className="text-sm text-gray-500 font-semibold">/ 45</span></h3></div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><Icon name="BookOpen" className="w-6 h-6" /></div>
                <div><p className="text-xs font-bold text-gray-400 uppercase">Study Hours</p><h3 className="text-2xl font-bold text-gray-800">14h <span className="text-sm text-gray-500 font-semibold">/ week</span></h3></div>
              </div>
            </div>

            {/* Chart & Subject Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trend Chart */}
              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-50 flex flex-col">
                 <h3 className="text-lg font-bold mb-6">Overall Performance Trend</h3>
                 <div className="flex-1 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorScoreAcademic" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} domain={[50, 100]} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} cursor={{stroke: '#d1d5db', strokeWidth: 1}}/>
                        <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorScoreAcademic)" activeDot={{ r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Subject Proficiency */}
              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-50">
                 <h3 className="text-lg font-bold mb-6">Subject Proficiency</h3>
                 <div className="space-y-6">
                    {[
                      { sub: 'Mathematics', score: 92, color: 'bg-blue-500' },
                      { sub: 'Science', score: 88, color: 'bg-green-500' },
                      { sub: 'English', score: 85, color: 'bg-purple-500' },
                      { sub: 'History', score: 76, color: 'bg-yellow-500' },
                      { sub: 'Computer Sci.', score: 95, color: 'bg-indigo-500' }
                    ].map(s => (
                      <div key={s.sub}>
                        <div className="flex justify-between text-sm font-semibold mb-2">
                          <span className="text-gray-700">{s.sub}</span>
                          <span className="text-gray-500">{s.score}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                          <div className={`${s.color} h-2.5 rounded-full transition-all duration-1000`} style={{ width: `${s.score}%` }}></div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Detailed Marks Table */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Recent Exam Results (Mid-Term)</h3>
                <button onClick={() => setShowMarksheet(true)} className="text-sm text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors flex items-center gap-2"><Icon name="FileText" className="w-4 h-4"/> View Full Report</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      <th className="pb-3 px-2">Subject</th>
                      <th className="pb-3 px-2 text-center">Class Avg</th>
                      <th className="pb-3 px-2 text-center">Score</th>
                      <th className="pb-3 px-2 text-right">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-semibold text-gray-800">
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-2">Mathematics</td><td className="py-4 px-2 text-center text-gray-500">78%</td><td className="py-4 px-2 text-center text-blue-600">92/100</td><td className="py-4 px-2 text-right"><span className="text-green-600 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">A+</span></td>
                    </tr>
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-2">Science</td><td className="py-4 px-2 text-center text-gray-500">82%</td><td className="py-4 px-2 text-center text-blue-600">88/100</td><td className="py-4 px-2 text-right"><span className="text-green-600 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">A</span></td>
                    </tr>
                    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-2">English</td><td className="py-4 px-2 text-center text-gray-500">75%</td><td className="py-4 px-2 text-center text-blue-600">85/100</td><td className="py-4 px-2 text-right"><span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">A</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-2">History</td><td className="py-4 px-2 text-center text-gray-500">80%</td><td className="py-4 px-2 text-center text-blue-600">76/100</td><td className="py-4 px-2 text-right"><span className="text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-md border border-yellow-100">B+</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* --- ATTENDANCE TAB CONTENT --- */}
        {activeMenu === 'Attendance' && (
          <div className="max-w-4xl space-y-6 pb-12">
            
            {/* Yearly Summary & Trend */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-50 mb-6">
              <h2 className="text-lg font-bold mb-6">Yearly Attendance Summary</h2>
              
              <div className="flex items-center justify-between mb-12">
                <div><p className="text-xl font-bold mb-1">210</p><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Days</p></div>
                <div><p className="text-xl font-bold text-green-500 mb-1">198</p><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Present</p></div>
                <div><p className="text-xl font-bold text-red-500 mb-1">8</p><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Absent</p></div>
                <div><p className="text-xl font-bold text-yellow-500 mb-1">4</p><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Late</p></div>
                <div className="text-right"><p className="text-xl font-bold mb-1">94%</p><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Overall</p></div>
              </div>

              <h3 className="text-sm font-bold mb-6">Attendance Trend (Last 12 Months)</h3>
              <div className="h-48 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} domain={[50, 100]} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} cursor={{stroke: '#d1d5db', strokeWidth: 1}}/>
                    <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAtt)" activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* March Overview */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-50">
              <div className="flex items-center gap-6">
                 <CircularProgress value={92} label="92%" colorClass="text-green-500" strokeClass="text-green-500" />
                 <div>
                   <div className="flex items-center gap-3 mb-2">
                     <h2 className="text-xl font-bold">{months[currentMonthIdx]} Overview</h2>
                     <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-md tracking-wider">EXCELLENT</span>
                   </div>
                   <p className="text-sm text-gray-500">Better than 95% of students</p>
                 </div>
              </div>
              <div className="flex gap-8 mt-6 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-sm font-semibold">
                 <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Present: 23</div>
                 <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Absent: 2</div>
                 <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> Late: 1</div>
              </div>
            </div>

            {/* Calendar Widget */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Icon name="ChevronLeft" className="w-5 h-5 text-gray-600" /></button>
                <h3 className="text-lg font-bold">{months[currentMonthIdx]} {currentYear}</h3>
                <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Icon name="ChevronRight" className="w-5 h-5 text-gray-600" /></button>
              </div>

              {/* Month Pills */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
                {months.map((m, idx) => (
                  <button 
                    key={m} 
                    onClick={() => handleMonthSelect(idx)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border ${
                      currentMonthIdx === idx 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
                <div className="grid grid-cols-7 gap-3 mb-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                </div>
                <div className="grid grid-cols-7 gap-3">
                  {/* Empty cells for starting days */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square rounded-2xl bg-gray-50 border border-gray-100"></div>
                  ))}
                  
                  {/* Actual days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const status = getDayStatus(day);
                    let styling = "bg-green-100 text-green-600 border-green-200"; // default present
                    if (status === 'absent') styling = "bg-red-100 text-red-500 border-red-200";
                    if (status === 'late') styling = "bg-[#fff8e1] text-yellow-600 border-[#ffe082]";
                    if (status === 'holiday') styling = "bg-gray-100 text-gray-400 border-gray-200";

                    return (
                      <button 
                        key={day} 
                        className={`aspect-square rounded-2xl flex items-center justify-center text-lg font-bold border transition-transform hover:scale-105 shadow-sm ${styling}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-center gap-6 mt-8 text-xs font-semibold text-gray-500">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> Present</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Absent</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Late</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-300"></span> Holiday</div>
                </div>
              </div>
            </div>

            {/* Downloads & Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              
              <div className="flex flex-col gap-4">
                 <button className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center gap-3 py-4 font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                   <Icon name="FileText" className="w-5 h-5" /> Report (Month)
                 </button>
                 <button className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-center gap-3 py-4 font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                   <Icon name="FileText" className="w-5 h-5" /> Report (Year)
                 </button>
              </div>

              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-50">
                <h3 className="font-bold text-lg mb-5">Recent Attendance Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-50">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center"><Icon name="X" className="w-5 h-5" /></div>
                    <div><h4 className="font-bold text-sm">Absent</h4><p className="text-xs text-gray-500 mt-0.5">Jan 24 - Medical Leave</p></div>
                  </div>
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-50">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><Icon name="Check" className="w-5 h-5" /></div>
                    <div><h4 className="font-bold text-sm">Present</h4><p className="text-xs text-gray-500 mt-0.5">Jan 23 - On Time</p></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center"><Icon name="Clock" className="w-5 h-5" /></div>
                    <div><h4 className="font-bold text-sm">Late</h4><p className="text-xs text-gray-500 mt-0.5">Jan 22 - 15 mins late</p></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* --- TASKS TAB CONTENT --- */}
        {activeMenu === 'Tasks' && (
          <div className="max-w-4xl space-y-6 pb-12">
            
            {/* Tasks Summary Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Parent To-Do List</h2>
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                <Icon name="Tasks" className="w-4 h-4" /> {tasks.filter(t => !t.completed).length} Pending Tasks
              </div>
            </div>

            {/* Task List Card */}
            <div className="bg-white rounded-3xl shadow-sm p-2 sm:p-4 border border-gray-50">
              <div className="flex flex-col">
                {tasks.map((task, index) => (
                  <div 
                    key={task.id} 
                    className={`flex items-start sm:items-center gap-4 p-4 transition-all duration-200 ${index !== tasks.length - 1 ? 'border-b border-gray-50' : ''} ${task.completed ? 'opacity-50 hover:opacity-75' : 'hover:bg-gray-50 rounded-2xl'}`}
                  >
                    
                    {/* Checkbox */}
                    <div className="pt-1 sm:pt-0">
                      <div 
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                          task.completed 
                            ? 'bg-blue-600 border-blue-600' 
                            : 'bg-white border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        {task.completed && <Icon name="CheckCircle" className="w-4 h-4 text-white" />}
                      </div>
                    </div>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <h4 
                        onClick={() => toggleTask(task.id)}
                        className={`text-sm font-bold cursor-pointer transition-all ${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-900 hover:text-blue-600'
                        }`}
                      >
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 sm:line-clamp-none">{task.desc}</p>
                    </div>

                    {/* Task Metadata (Tags/Date) */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                      {task.type === 'urgent' && !task.completed && (
                         <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-1 rounded-md tracking-wide">
                           URGENT
                         </span>
                      )}
                      {task.type === 'action' && !task.completed && (
                         <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md tracking-wide">
                           ACTION REQUIRED
                         </span>
                      )}
                      {task.type === 'academic' && !task.completed && (
                         <span className="text-[10px] font-bold bg-yellow-50 text-yellow-600 px-2 py-1 rounded-md tracking-wide">
                           ACADEMIC
                         </span>
                      )}
                      
                      <span className={`text-[11px] font-semibold whitespace-nowrap ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                        {task.completed ? 'Completed' : `Due: ${task.date}`}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips / Helpers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-gradient-to-r from-blue-50 to-white rounded-3xl p-6 border border-blue-100 flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-xl text-blue-600 shrink-0">
                  <Icon name="Calendar" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1">Set Reminders</h4>
                  <p className="text-xs text-gray-600 mb-2">Sync pending tasks to Google Calendar to get instant push notifications.</p>
                  <button 
                    onClick={() => setShowCalendarModal(true)}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Open Google Calendar Sync
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-white rounded-3xl p-6 border border-green-100 flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-xl text-green-600 shrink-0">
                  <Icon name="GraduationCap" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1">Academic Reviews</h4>
                  <p className="text-xs text-gray-600 mb-2">Checking assignments with your child boosts their confidence and scores.</p>
                  <button 
                    onClick={() => setShowMarksheet(true)}
                    className="text-xs font-bold text-green-600 hover:underline"
                  >
                    View latest marks
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* --- MESSAGES TAB CONTENT --- */}
        {activeMenu === 'Messages' && (
          <div className="flex flex-col md:flex-row h-[calc(100vh-220px)] bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
            
            {/* Chats Sidebar */}
            <div className="w-full md:w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/30">
              <div className="p-5 border-b border-gray-100 shrink-0">
                <h2 className="text-lg font-bold">Messages</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {chats.map(chat => (
                  <div 
                    key={chat.id} 
                    onClick={() => setActiveChatId(chat.id)}
                    className={`flex items-center gap-4 p-4 border-b border-gray-50 cursor-pointer transition-colors ${activeChatId === chat.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                  >
                    <div className="relative">
                      <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full border border-gray-200" />
                      {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-sm font-bold text-gray-900 truncate">{chat.name}</h4>
                        <span className="text-[10px] text-gray-400">{chat.messages[chat.messages.length - 1]?.time}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-gray-400 mb-1">{chat.role}</p>
                      <p className="text-xs text-gray-500 truncate">{chat.messages[chat.messages.length - 1]?.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
              {/* Chat Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <img src={activeChatData?.avatar} alt={activeChatData?.name} className="w-10 h-10 rounded-full border border-gray-200" />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{activeChatData?.name}</h3>
                    <p className="text-xs text-gray-500">{activeChatData?.online ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors bg-gray-50 rounded-full">
                  <Icon name="Info" className="w-5 h-5" />
                </button>
              </div>

              {/* Messages History */}
              <div className="flex-1 p-6 overflow-y-auto bg-gray-50/20 space-y-6">
                {activeChatData?.messages.map((msg, index) => (
                  <div key={msg.id || index} className={`flex ${msg.sender === 'parent' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] ${msg.sender === 'parent' ? 'order-2' : ''}`}>
                      <div className={`px-4 py-3 text-sm shadow-sm ${
                        msg.sender === 'parent' 
                          ? 'bg-blue-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl' 
                          : 'bg-white border border-gray-100 text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
                      }`}>
                        {msg.text}
                      </div>
                      <p className={`text-[10px] text-gray-400 mt-1.5 ${msg.sender === 'parent' ? 'text-right' : 'text-left'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-100 bg-white shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Icon name="Paperclip" className="w-5 h-5" />
                  </button>
                  <input 
                    type="text" 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..." 
                    className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                  <button 
                    type="submit" 
                    disabled={!messageInput.trim()}
                    className={`p-2.5 rounded-xl transition-all ${
                      messageInput.trim() 
                        ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Icon name="Send" className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* --- RIGHT PANEL (ONLY Visible if NOT in Messages tab) --- */}
      {activeMenu !== 'Messages' && (
        <aside className="w-[320px] bg-white border-l border-gray-100 p-6 overflow-y-auto">
          
          {/* Alerts */}
          <div className="space-y-3 mb-10">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-3 rounded-xl flex items-start gap-3 relative ${
                  alert.type === 'danger' ? 'bg-red-50 border border-red-100' : 'bg-[#fff8dc] border border-[#f5e6b3]'
                }`}
              >
                <Icon 
                  name={alert.icon} 
                  className={`w-4 h-4 mt-0.5 ${alert.type === 'danger' ? 'text-red-500' : 'text-gray-800'}`} 
                />
                <span className={`text-xs font-medium pr-6 ${alert.type === 'danger' ? 'text-red-800' : 'text-gray-800'}`}>
                  {alert.text}
                </span>
                <button 
                  onClick={() => dismissAlert(alert.id)}
                  className="absolute top-3 right-3 opacity-50 hover:opacity-100"
                >
                  <Icon name="X" className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Attendance Widget */}
          <div className="mb-10">
            <h2 className="text-[15px] font-bold mb-4">Attendance (October)</h2>
            <div className="bg-[#f8fafc] rounded-2xl p-5 border border-gray-100">
              <div className="flex gap-4 mb-6">
                <div className="bg-white rounded-xl p-3 flex-1 text-center shadow-sm border border-gray-50">
                  <div className="text-green-500 font-bold text-lg">95%</div>
                  <div className="text-[10px] text-gray-400 font-medium">Present</div>
                </div>
                <div className="bg-white rounded-xl p-3 flex-1 text-center shadow-sm border border-gray-50">
                  <div className="text-gray-800 font-bold text-lg">1</div>
                  <div className="text-[10px] text-gray-400 font-medium">Absent</div>
                </div>
              </div>

              {/* Heatmap Grid */}
              <div className="grid grid-cols-7 gap-1.5 mb-4">
                {heatmapData.map((status, index) => (
                  <div 
                    key={index} 
                    className={`aspect-square rounded-[4px] ${
                      status === 'present' ? 'bg-green-500' :
                      status === 'absent' ? 'bg-red-500' :
                      status === 'late' ? 'bg-yellow-400' :
                      'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>

              <div className="flex justify-between px-1 text-[9px] text-gray-400 font-medium">
                <span>Present</span>
                <span>Absent</span>
                <span>Late</span>
              </div>
            </div>
          </div>

          {/* Promise Widget */}
          <div className="mb-10">
            <h2 className="text-[15px] font-bold mb-4">My Promise as a Parent</h2>
            <div className="bg-[#fffdf5] border border-[#fef3c7] rounded-2xl p-5">
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 accent-blue-600 rounded-sm" />
                  <span className="text-xs text-gray-700">I will support my child's interest</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 accent-blue-600 rounded-sm" />
                  <span className="text-xs text-gray-700">I will encourage graduation</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 accent-blue-600 rounded-sm" />
                  <span className="text-xs text-gray-700">I will attend the next PTM</span>
                </label>
              </div>
            </div>
          </div>

        </aside>
      )}
    </div>
  );
}