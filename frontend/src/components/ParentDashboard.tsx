<<<<<<< HEAD
import React, { useState } from 'react';
import ParentSettings from './ParentSettings';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, CartesianGrid,
  LineChart, Line
} from 'recharts';
import { 
  Home, MessageSquare, Calendar, CreditCard, Bell, BookOpen, 
  Plus, CheckCircle2, ChevronLeft, ChevronRight, Search, Settings, 
  LogOut, TrendingUp, Users, Target, BookMarked, Brain, Shield, Star,
  Activity, Heart, Globe, MapPin, DollarSign, FileText, Compass, Award, Briefcase, Video,
  Zap, FileCheck, Mic, ClipboardList, BarChart2, History, AlertTriangle, TrendingDown,
  Wallet, Coins, Volume2, Radio, UserPlus, Clock, PenTool, Camera, Smile, Edit3, Video as VideoIcon, PenBox, Map
} from 'lucide-react';

// Mock Data Definitions
const childData = [
  { id: 1, name: 'Alex (11th)', avatar: 'https://picsum.photos/seed/alex/100/100', track: 'PCM', locationColor: 'bg-green-500', locationText: 'In Class: Room 302', lastSeen: 'Civil Engineering Lab, 10 mins ago' },
  { id: 2, name: 'Sarah (9th)', avatar: 'https://picsum.photos/seed/sarah/100/100', track: 'General', locationColor: 'bg-yellow-500', locationText: 'On Campus: Library', lastSeen: 'Central Library, 5 mins ago' },
  { id: 'all', name: 'Unified View', avatar: 'https://picsum.photos/seed/unified/100/100', track: 'All Children', locationColor: '', locationText: '', lastSeen: '' }
];

const goalsData = [
  { title: 'Aptitude Tests', completed: 3, total: 5, progress: 60, color: 'text-green-500', bg: 'bg-green-500', lightBg: 'bg-green-50' },
  { title: 'Career Prep Sessions', completed: 7, total: 10, progress: 70, color: 'text-green-500', bg: 'bg-green-500', lightBg: 'bg-green-50' },
  { title: 'Math Modules', completed: 15, total: 20, progress: 75, color: 'text-blue-500', bg: 'bg-blue-500', lightBg: 'bg-blue-50' }
];

const recommendedTutors = [
  { subject: 'Advanced Mathematics', target: 'JEE Prep', tutor: 'Prof. Sharma', rating: 4.9, avatar: 'https://picsum.photos/seed/prof1/100/100' },
  { subject: 'Physics & Mechanics', target: 'Board Exams', tutor: 'Ms. Verma', rating: 4.8, avatar: 'https://picsum.photos/seed/prof2/100/100' },
];

const subjectsData = [
    { name: 'Mathematics', tutor: 'Prof. Sharma', time: '10:00 - 11:30 AM', status: 'Upcoming' },
    { name: 'Physics', tutor: 'Ms. Verma', time: '1:00 - 2:00 PM', status: 'Completed' },
    { name: 'Chemistry', tutor: 'Dr. Rao', time: '3:00 - 4:00 PM', status: 'Upcoming' }
];

const ahaMoments = [
  { id: 1, student: 'Alex', teacher: 'Dr. Carter', time: '2 hours ago', text: 'Alex finally nailed the bridge stress-test model! Beautiful use of tension distribution.', image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=400&h=200&auto=format&fit=crop' },
  { id: 2, student: 'Sarah', teacher: 'Mr. Davis', time: '4 hours ago', text: 'Great presentation on the Solar System. The class loved the visuals!', image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=400&h=200&auto=format&fit=crop' }
];

const weeklyProgressData = [
  { day: 'Mon', hours: 2, focus: 85 },
  { day: 'Tue', hours: 3.5, focus: 90 },
  { day: 'Wed', hours: 4, focus: 88 },
  { day: 'Thu', hours: 2.5, focus: 75 },
  { day: 'Fri', hours: 5, focus: 95 },
  { day: 'Sat', hours: 6, focus: 92 },
  { day: 'Sun', hours: 1, focus: 60 },
];

const conceptMasteryData = [
  { subject: 'Algebra', A: 120, B: 110, fullMark: 150 },
  { subject: 'Calculus', A: 98, B: 130, fullMark: 150 },
  { subject: 'Mechanics', A: 86, B: 130, fullMark: 150 },
  { subject: 'Literature', A: 99, B: 100, fullMark: 150 },
  { subject: 'History', A: 85, B: 90, fullMark: 150 },
  { subject: 'Biology', A: 65, B: 85, fullMark: 150 },
];

const multiChildComparisonData = [
  { subject: 'Math', Alex: 90, Sarah: 75 },
  { subject: 'Science', Alex: 85, Sarah: 80 },
  { subject: 'English', Alex: 70, Sarah: 95 },
  { subject: 'History', Alex: 65, Sarah: 90 },
  { subject: 'Art', Alex: 50, Sarah: 85 },
];

const effortVsResultData = [
  { name: 'Alex', effort: 92, result: 76 },
  { name: 'Sarah', effort: 65, result: 95 },
];

const academicTimelineData = [
  { grade: '1st', math: 85, science: 80, language: 90, benchmark: 82 },
  { grade: '2nd', math: 88, science: 85, language: 85, benchmark: 84 },
  { grade: '3rd', math: 90, science: 88, language: 82, benchmark: 85 },
  { grade: '4th', math: 92, science: 90, language: 85, benchmark: 88 },
  { grade: '5th', math: 70, science: 85, language: 88, benchmark: 90, alert: 'Struggled with Fractions' },
  { grade: '6th', math: 82, science: 88, language: 90, benchmark: 92 },
  { grade: '7th', math: 88, science: 92, language: 92, benchmark: 95 },
];

const timelineNodes = [
  { grade: '1st', status: 'blue', label: 'High' },
  { grade: '2nd', status: 'blue', label: 'High' },
  { grade: '3rd', status: 'blue', label: 'High' },
  { grade: '4th', status: 'blue', label: 'High' },
  { grade: '5th', status: 'red', label: 'Decline' },
  { grade: '6th', status: 'yellow', label: 'Recovery' },
  { grade: '7th', status: 'blue', label: 'On Track' },
];

const fluencyData = [
  { week: 'W1', pronunciation: 65, vocabulary: 40 },
  { week: 'W2', pronunciation: 70, vocabulary: 50 },
  { week: 'W3', pronunciation: 72, vocabulary: 65 },
  { week: 'W4', pronunciation: 85, vocabulary: 80 },
];

const walletTransactions = [
  { id: 1, title: 'Physics Mock Success (>80%)', amount: '+₹100', date: 'Today, 2:30 PM', type: 'credit' },
  { id: 2, title: 'Snack at Cafeteria', amount: '-₹45', date: 'Yesterday, 1:15 PM', type: 'debit' },
  { id: 3, title: 'Completed Weekend Math Module', amount: '+₹50', date: 'Oct 18, 10:00 AM', type: 'credit' },
];

const tutors = [
  { name: 'Dr. Evelyn Carter', role: 'Physics Expert', rating: 4.9, price: '$40/hr', avatar: 'https://picsum.photos/seed/tutor1/100/100' },
  { name: 'Prof. Raj Sharma', role: 'Advanced Calculus', rating: 4.8, price: '$35/hr', avatar: 'https://picsum.photos/seed/tutor2/100/100' },
];

const forums = [
  { title: "Handling pre-exam anxiety?", replies: 24, author: "Anonymous Parent" },
  { title: "Best resources for 11th grade Chemistry?", replies: 18, author: "Anonymous Parent" },
];

const scholarships = [
  { name: 'STEM Innovators Fund', amount: '$5,000', deadline: 'Oct 30', match: '95%' },
  { name: 'Future Leaders Grant', amount: '$2,500', deadline: 'Nov 15', match: '88%' },
];

// Reusable Components
const CircularProgress = ({ progress, barColor }: { progress: number, barColor: string }) => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
      <circle className="text-gray-100 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
      <circle
        className={`${barColor} stroke-current transition-all duration-1000 ease-out`}
        strokeWidth="8"
        strokeLinecap="round"
        cx="50" cy="50" r="40" fill="transparent"
        strokeDasharray="251.2"
        strokeDashoffset={251.2 - (251.2 * progress) / 100}
      ></circle>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800">
      {progress}%
    </div>
  </div>
);

interface ParentDashboardProps {
  userName?: string;
  onLogout?: () => void;
}

const ParentDashboard = ({ userName = "Parent", onLogout }: ParentDashboardProps) => {
  const [activeChild, setActiveChild] = useState<number | string>(childData[0].id);
  const [selectedChildren, setSelectedChildren] = useState<number[]>([1, 2]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Monitor Dashboard', icon: Home },
    { id: 'family', label: 'Family Sync', icon: Users },
    { id: 'growth', label: 'Growth Journey', icon: History },
    { id: 'academic', label: 'Academic Intelligence', icon: TrendingUp },
    { id: 'counselor', label: 'Counselor & Comms', icon: MessageSquare },
    { id: 'future', label: 'Future Readiness', icon: Compass },
    { id: 'finances', label: 'Finances & Admin', icon: CreditCard },
    { id: 'resources', label: 'Resource Center', icon: BookOpen },
    { id: 'productivity', label: 'Productivity Suite', icon: Zap },
    { id: 'community', label: 'Community Hub', icon: Globe },
    { id: 'campusLife', label: 'Campus Life', icon: Map },
    { id: 'collaboration', label: 'Collaboration Hub', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];
=======
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
>>>>>>> 26e689b66aaaf1ea9119e4808d72d3ad799c1830

  /* -------------------------------------------------------------
     RENDER VIEWS BASED ON SELECTED MENU
  ------------------------------------------------------------- */
  const renderHome = () => (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 flex-1 text-white rounded-[32px] p-8 lg:p-10 shadow-xl shadow-green-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 h-full flex flex-col justify-center">
          <h2 className="text-3xl lg:text-4xl font-black mb-3 text-white">Hello, {userName}!</h2>
          <p className="text-green-100 text-lg flex items-center gap-2 mb-6 max-w-md">
            Stay intimately connected with your child's academic progress and wellness.
          </p>
          <div className="flex gap-4">
             <button className="bg-white text-green-600 px-6 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-green-50 transition-colors">
                <Shield size={18} /> View Daily Digest
             </button>
          </div>
        </div>
      </div>

      {/* Smart Alerts */}
      <div className="flex flex-col gap-4">
         <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-start gap-3 shadow-sm">
            <Bell className="text-blue-500 shrink-0 mt-0.5" size={20}/>
            <div>
               <h4 className="font-bold text-blue-900 text-sm">Morning Briefing</h4>
               <p className="text-sm text-blue-800">Alex has a heavy day today: 3 Lectures and a Physics Mock Exam at 2:00 PM. Wish him luck!</p>
            </div>
         </div>
         <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3 shadow-sm">
            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20}/>
            <div>
               <h4 className="font-bold text-red-900 text-sm">"Empty Chair" Alert</h4>
               <p className="text-sm text-red-800">Alex missed his 11:00 AM Fluid Mechanics lecture (but was marked Present at the main gate). Would you like to check in with him?</p>
            </div>
         </div>
      </div>

      {/* A-ha Moments Feed */}
      <div>
         <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-4">
           <Camera size={20} className="text-green-500"/> Classroom Stories (A-ha! Moments)
         </h3>
         <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {ahaMoments.map(moment => (
               <div key={moment.id} className="min-w-[300px] w-[300px] bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                  <img src={moment.image} alt="Classroom WIN" className="h-32 w-full object-cover"/>
                  <div className="p-4 flex-1 flex flex-col">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{moment.teacher}</span>
                        <span className="text-xs text-gray-400">{moment.time}</span>
                     </div>
                     <p className="text-sm text-gray-700 font-medium italic leading-relaxed">"{moment.text}"</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Child Selection / Unified Feed (Sibling Switcher) */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Users size={20} className="text-green-500"/> Sibling Switcher
              </h3>
           </div>
           
           <div className="space-y-4">
              {childData.map((child) => (
                 <div 
                    key={child.id}
                    onClick={() => setActiveChild(child.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2 ${activeChild === child.id ? 'border-green-500 bg-green-50/50 shadow-md' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}
                 >
                    <img src={child.avatar} alt="child" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                    <div className="flex-1">
                       <p className="font-bold text-gray-900">{child.name}</p>
                       <div className="flex items-center gap-2 mt-1">
                          {child.locationColor && <span className={`w-2 h-2 rounded-full ${child.locationColor}`}></span>}
                          <p className="text-xs text-gray-600 font-medium">{child.locationText || child.track}</p>
                       </div>
                    </div>
                    {activeChild === child.id && <CheckCircle2 size={24} className="text-green-500" />}
                    {child.id !== 'all' && (
                      <button 
                         onClick={(e) => { e.stopPropagation(); setActiveMenuItem('family'); }}
                         className="ml-2 text-xs font-bold text-green-600 border border-green-200 px-2 py-1 rounded bg-white hover:bg-green-50 transition-colors shadow-sm"
                      >
                         Compare
                      </button>
                    )}
                 </div>
              ))}
           </div>
        </div>

        {/* AI Trend Spotter */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-green-50/50">
            <Brain size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 text-green-600 font-bold">
              <Brain size={20} /> AI Trend Spotter
            </div>
            <p className="font-bold text-gray-900 text-lg mb-2">Noticeable Dip in Physics Focus</p>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Alex's engagement drops by 20% on Thursday afternoons. We've detected this pattern over the last 3 weeks.
            </p>
            <div className="p-3 bg-green-50 border border-green-100 rounded-xl text-sm text-green-800 font-medium">
              <strong>Recommendation:</strong> Reschedule heavy math/physics modules to mornings.
            </div>
          </div>
        </div>

        {/* Wellness & Mental Health Flag */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-rose-500 font-bold">
            <Heart size={20} /> Wellness Pulse
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center border-4 border-green-50">
              <Activity size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">Optimal</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Stress Levels</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Sleep Schedule</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">Consistent</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Screen Time</span>
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">Elevated</span>
            </div>
          </div>
        </div>

        {/* Agenda Card */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 h-full">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Calendar size={20} className="text-green-500"/> Today's Agenda
              </h3>
              <span className="bg-red-100 text-red-600 text-xs font-black px-2 py-1 rounded animate-pulse flex items-center gap-1"><Radio size={12}/> LIVE</span>
           </div>
           
           <div className="space-y-4">
              <div className="p-4 bg-green-50 border-2 border-green-500 rounded-2xl shadow-sm relative overflow-hidden">
                 <div className="flex justify-between items-start mb-2">
                    <div>
                       <h4 className="font-black text-gray-900">Structural Mechanics</h4>
                       <p className="text-xs text-green-700 font-bold">Room 302 • Prof. Sharma</p>
                    </div>
                    <span className="text-xs font-bold text-gray-500">10:00 - 11:30 AM</span>
                 </div>
                 <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold text-green-800 mb-1">
                       <span>45 mins elapsed</span>
                       <span>45 mins left</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-1.5">
                       <div className="bg-green-500 h-1.5 rounded-full w-[50%]"></div>
                    </div>
                 </div>
              </div>
              
              <div className="p-4 border border-gray-100 rounded-2xl opacity-60">
                 <div className="flex justify-between items-start">
                    <div>
                       <h4 className="font-bold text-gray-700">Lunch Break</h4>
                       <p className="text-xs text-gray-500">Main Cafeteria</p>
                    </div>
                    <span className="text-xs font-bold text-gray-400">11:30 - 12:30 PM</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderGrowthJourney = () => {
    // Custom label for alert nodes in chart
    const CustomizedDot = (props: any) => {
      const { cx, cy, payload } = props;
      if (payload.alert && props.dataKey === 'math') {
        return (
          <svg x={cx - 12} y={cy - 24} width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
      }
      return <circle cx={cx} cy={cy} r={6} fill={props.stroke} />;
    };

    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-2xl font-black text-gray-900">Academic Time Machine</h2>
          <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-xl font-bold text-sm text-center">Target Track: PCM</span>
        </div>

        {/* Academic Pulse Timeline */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 overflow-x-auto custom-scrollbar">
           <h3 className="font-bold text-gray-900 text-lg mb-6">The Academic Pulse</h3>
           <div className="flex items-center min-w-[600px] justify-between relative px-4 mb-4">
              <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
              {timelineNodes.map((node, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center cursor-pointer group w-16">
                   <div className={`w-8 h-8 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-transform group-hover:scale-125 ${node.status === 'blue' ? 'bg-blue-500' : node.status === 'red' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                   </div>
                   <p className="mt-3 font-bold text-gray-900 text-sm">{node.grade}</p>
                   <p className="text-xs text-gray-500 text-center leading-tight mt-1">{node.label}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Decline & Progress Multi-Graph & Benchmark */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
           <div className="xl:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col h-[500px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="font-bold text-gray-900 text-lg">Long-Term Trajectory (Grades 1-7)</h3>
                <div className="flex gap-4 text-xs font-bold flex-wrap">
                   <span className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-500 rounded-full"></div> Math</span>
                   <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Science</span>
                   <span className="flex items-center gap-1"><div className="w-2 h-2 bg-purple-500 rounded-full"></div> Language</span>
                   <span className="flex items-center gap-1"><div className="w-4 h-0.5 bg-gray-400 border-t border-dashed"></div> PCM Benchmark</span>
                </div>
              </div>
              <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={academicTimelineData} margin={{ top: 30, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="grade" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} domain={[50, 100]}/>
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}}
                      formatter={(value: any, name: any) => [value + '%', name.charAt(0).toUpperCase() + name.slice(1)]}
                    />
                    <Line type="monotone" dataKey="math" stroke="#f97316" strokeWidth={3} dot={<CustomizedDot/>} activeDot={{r: 8}} />
                    <Line type="monotone" dataKey="science" stroke="#3b82f6" strokeWidth={3} dot={{r: 5, strokeWidth: 2}} />
                    <Line type="monotone" dataKey="language" stroke="#a855f7" strokeWidth={3} dot={{r: 5, strokeWidth: 2}} />
                    <Line type="monotone" dataKey="benchmark" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 items-start cursor-pointer hover:bg-red-100 transition-colors">
                 <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
                 <div>
                    <h4 className="font-bold text-red-900 text-sm">5th Grade Dip Detected</h4>
                    <p className="text-sm text-red-800 mt-1">Alex struggled here due to the introduction of Complex Fractions. Click to see how he recovered in 6th grade.</p>
                 </div>
              </div>
           </div>

           {/* Predictive Benchmarking */}
           <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[32px] p-8 shadow-xl text-white flex flex-col justify-center relative overflow-hidden h-[500px]">
              <Target className="absolute right-[-20px] top-[-20px] text-white/5" size={150} />
              <h3 className="font-bold text-xl mb-4 relative z-10 flex items-center gap-2">
                <Compass className="text-green-400" /> Gap Analysis
              </h3>
              <p className="text-gray-300 leading-relaxed relative z-10 flex-1">
                <strong className="text-white text-lg">Alex is currently in 7th Grade.</strong><br/><br/>
                To stay on track for top Engineering Colleges (PCM track), he needs to improve his <span className="text-orange-400 font-bold">'Logical Reasoning'</span> score by <span className="text-green-400 font-black text-lg">10%</span> next term to match the 8th-grade competitive entry benchmark.
              </p>
              <button className="mt-8 w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20 relative z-10">
                View Learning Path
              </button>
           </div>
        </div>

        {/* Then vs. Now */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
             <History size={20} className="text-green-500"/> Then vs. Now
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="p-6 bg-gray-50 border-2 border-gray-200 rounded-3xl border-dashed">
                 <div className="flex justify-between items-center mb-6">
                    <span className="bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded-lg text-sm">1st Grade Alex</span>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Age: 6</span>
                 </div>
                 <p className="text-sm font-medium text-gray-500 mb-2">Math Score: <span className="text-gray-900 font-bold text-base">85% (Basic Addition)</span></p>
                 <p className="text-sm font-medium text-gray-500 mb-6">Teacher Insight: <span className="text-gray-900 italic font-medium">"Very curious."</span></p>
                 <div className="h-20 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-xs shadow-sm">
                    [Handwriting Sample Image]
                 </div>
              </div>
              <div className="p-6 bg-green-50 border-2 border-green-200 rounded-3xl shadow-sm relative overflow-hidden">
                 <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>
                 <div className="flex justify-between items-center mb-6 relative z-10">
                    <span className="bg-green-500 text-white font-bold px-3 py-1 rounded-lg text-sm shadow-md">7th Grade Alex (Now)</span>
                    <span className="text-xs text-green-700 font-bold uppercase tracking-wider">Age: 12</span>
                 </div>
                 <p className="text-sm font-medium text-green-800 mb-2 relative z-10">Math Score: <span className="text-green-900 font-black text-base">88% (Pre-Algebra)</span></p>
                 <p className="text-sm font-medium text-green-800 mb-6 relative z-10">Teacher Insight: <span className="text-green-900 italic font-bold">"Strong analytical thinker."</span></p>
                 <div className="h-20 bg-white border border-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold text-xs shadow-sm relative z-10">
                    [Robotics Project Model]
                 </div>
              </div>
           </div>
           
           <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="p-4 bg-white/10 rounded-2xl shrink-0 border border-white/10 backdrop-blur-md relative z-10">
                 <Brain className="text-green-400" size={32}/>
              </div>
              <p className="text-sm sm:text-base leading-relaxed relative z-10">
                 <strong className="text-green-400 font-black text-lg block mb-1">Growth Summary:</strong> 
                 "Since 1st Grade, Alex's problem-solving speed has increased by <span className="font-bold underline decoration-green-400/50 decoration-2 underline-offset-4">400%</span>, but focus in languages has gradually declined. Early intervention in literacy is recommended to maintain the competitive trajectory."
              </p>
           </div>
        </div>

      </div>
    );
  };

  const renderAcademic = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900">Academic Intelligence</h2>
        <button 
          onClick={() => setActiveMenuItem('family')}
          className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors"
        >
          <Users size={16}/> View with Sibling
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Concept Mastery Map */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <Target size={20} className="text-green-500"/> Concept Mastery Map
            </h3>
            <button className="text-xs font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-lg border border-green-100">Curriculum Alignment</button>
          </div>
          <div className="flex-1 w-full bg-gray-50 rounded-2xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={conceptMasteryData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Alex" dataKey="B" stroke="#22c55e" fill="#22c55e" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multi-Child Comparison */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col h-[400px]">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
            <BarChart2 size={20} className="text-green-500"/> Multi-Child Score Comparison
          </h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={multiChildComparisonData}>
                <defs>
                  <linearGradient id="colorAlex" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSarah" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}}/>
                <Tooltip />
                <Area type="monotone" dataKey="Alex" stroke="#22c55e" fillOpacity={1} fill="url(#colorAlex)" />
                <Area type="monotone" dataKey="Sarah" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSarah)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
             <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 bg-green-500 rounded-full"></div>Alex</div>
             <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 bg-purple-500 rounded-full"></div>Sarah</div>
          </div>
        </div>
      </div>

      {/* Effort vs Result Analysis */}
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
           <div>
             <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
               <Activity size={20} className="text-green-500"/> Effort vs. Result Analysis
             </h3>
             <p className="text-gray-500 text-sm mt-1">Reward persistence. See who is working hardest, regardless of grades.</p>
           </div>
           <div className="flex gap-4">
             <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <div className="w-3 h-3 bg-green-500 rounded"></div> Study Effort
             </div>
             <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <div className="w-3 h-3 bg-gray-200 rounded"></div> Test Results
             </div>
           </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={effortVsResultData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barGap={8}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontSize: 14, fontWeight: 'bold'}} width={60} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'}}/>
                  <Bar dataKey="effort" fill="#22c55e" radius={[0, 8, 8, 0]} barSize={24} name="Study Effort (%)"/>
                  <Bar dataKey="result" fill="#E5E7EB" radius={[0, 8, 8, 0]} barSize={24} name="Test Results (%)"/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
               <div className="p-4 bg-green-50 border border-green-100 rounded-2xl">
                  <span className="text-xs font-bold text-green-600 uppercase">Insights</span>
                  <p className="font-bold text-gray-900 mt-1">Alex is working 40% harder</p>
                  <p className="text-sm text-gray-600 mt-1">Alex has lower grades but puts in significantly more practice hours. Acknowledging this persistence builds long-term grit.</p>
               </div>
               <button className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl shadow-sm hover:border-green-300 hover:text-green-600 transition-colors">
                  Send Kudos to Alex
               </button>
            </div>
         </div>
      </div>

      {/* Classroom-to-Home Activity Bridge */}
      <div className="bg-amber-50 rounded-[32px] p-8 shadow-sm border border-amber-200">
         <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
               <Smile size={32}/>
            </div>
            <div className="flex-1">
               <h3 className="font-bold text-amber-900 text-lg mb-1 flex items-center gap-2">Classroom-to-Home Activity Bridge</h3>
               <p className="text-amber-800 text-sm leading-relaxed">
                 <strong>Alex is learning Ratios this week.</strong> Try a 10-minute baking session tonight and let him measure the ingredients! It turns abstract math into a tasty, hands-on experience without needing a textbook.
               </p>
            </div>
            <button className="bg-amber-500 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-amber-600 transition-colors shrink-0 shadow-md">
               Mark as Completed
            </button>
         </div>
      </div>

      {/* AI Language Labs */}
      <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden">
         <Volume2 className="absolute right-[-20px] top-[-20px] text-white/5" size={150}/>
         <div className="flex flex-col lg:flex-row gap-8 relative z-10">
            <div className="flex-1">
               <h3 className="font-bold text-xl flex items-center gap-2 mb-2">
                 <Mic size={24} className="text-blue-400"/> AI Language Labs (Skill Accelerator)
               </h3>
               <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                 We don't just track written tests. Oral fluency is analyzed using advanced speech recognition to map pronunciation accuracy and vocabulary growth in real-time.
               </p>
               <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-200 font-bold uppercase tracking-wider">Current Fluency Level</p>
                    <p className="text-2xl font-black mt-1 text-white">Intermediate B1</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center border-4 border-blue-400">
                    <span className="font-bold text-lg">85%</span>
                  </div>
               </div>
               <button className="bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-600 transition-colors w-full sm:w-auto">
                 Listen to Last Session
               </button>
            </div>
            
            <div className="flex-1 min-h-[250px] bg-white/5 rounded-2xl p-6 border border-white/10">
               <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-blue-200">Fluency Heatmap (Last 4 Weeks)</span>
                  <div className="flex gap-4 text-xs">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-400 rounded-full"></div> Pronunciation</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-purple-400 rounded-full"></div> Vocabulary</span>
                  </div>
               </div>
               <div className="h-[200px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={fluencyData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                     <XAxis dataKey="week" stroke="#bfdbfe" fontSize={12} tickLine={false} axisLine={false}/>
                     <YAxis stroke="#bfdbfe" fontSize={12} tickLine={false} axisLine={false}/>
                     <Tooltip contentStyle={{backgroundColor: '#1e3a8a', border: 'none', borderRadius: '12px', color: '#fff'}}/>
                     <Line type="monotone" dataKey="pronunciation" stroke="#60a5fa" strokeWidth={3} dot={{r: 4}} />
                     <Line type="monotone" dataKey="vocabulary" stroke="#c084fc" strokeWidth={3} dot={{r: 4}} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderCounselor = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-gray-900">Counselor & Communication</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Micro-Tutor Marketplace */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
            <Users size={20} className="text-green-500"/> Micro-Tutor Marketplace
          </h3>
          <div className="space-y-4">
            {tutors.map((tutor, idx) => (
              <div key={idx} className="flex gap-4 p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                <img src={tutor.avatar} alt="tutor" className="w-12 h-12 rounded-full border border-gray-200" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">{tutor.name}</h4>
                      <p className="text-xs text-gray-500">{tutor.role}</p>
                    </div>
                    <span className="flex items-center text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                      <Star size={12} className="mr-1 fill-yellow-500 text-yellow-500"/> {tutor.rating}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm font-bold text-green-600">{tutor.price}</span>
                    <button className="bg-green-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-green-700">Book</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-green-300 hover:text-green-600 transition-all">
            Find More Tutors
          </button>
        </div>

        {/* Office Hours & Forums */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[32px] p-8 shadow-sm text-white relative overflow-hidden">
             <VideoIcon className="absolute right-6 top-6 text-white/20" size={80} />
             <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">One-Click "Micro-PTM"</h3>
                <p className="text-blue-100 text-sm mb-6 max-w-[90%] font-medium">Resolve small issues in 5 minutes via video before they become big problems.</p>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mb-4">
                   <p className="text-xs text-blue-100 uppercase tracking-widest font-bold mb-3">Teacher's Office Hours (Today)</p>
                   <div className="flex gap-2">
                      <button className="flex-1 bg-white text-blue-600 font-bold py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">4:00 PM</button>
                      <button className="flex-1 bg-white text-blue-600 font-bold py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">4:15 PM</button>
                      <button className="flex-1 bg-transparent border border-white/40 text-white font-bold py-2 rounded-lg text-sm hover:bg-white/10 transition-colors">More</button>
                   </div>
                </div>
                <button className="w-full bg-blue-700/50 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors border border-blue-400/30">Schedule Quick-Sync</button>
             </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[32px] p-8 shadow-sm text-white relative overflow-hidden">
             <Calendar className="absolute right-6 top-6 text-white/20" size={80} />
             <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">Book Counselor "Office Hours"</h3>
                <p className="text-green-100 text-sm mb-6 max-w-[80%]">1-on-1 sessions with school counselors for personalized guidance.</p>
                <button className="bg-white text-green-600 font-bold px-6 py-2.5 rounded-xl hover:bg-green-50">Schedule Now</button>
             </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
             <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
               <MessageSquare size={20} className="text-green-500"/> Anonymous Parent Forums
             </h3>
             <div className="space-y-4">
                {forums.map((forum, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 cursor-pointer">
                     <h4 className="font-bold text-sm text-gray-900 mb-2">{forum.title}</h4>
                     <div className="flex justify-between text-xs text-gray-500">
                        <span>{forum.author}</span>
                        <span className="flex items-center gap-1"><MessageSquare size={12}/> {forum.replies} replies</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  );

  const renderFuture = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-gray-900">Future Readiness</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* University Match-Score */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 lg:col-span-2">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <Globe size={20} className="text-green-500"/> University Match-Score
           </h3>
           <div className="flex flex-col md:flex-row gap-6 items-center bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <CircularProgress progress={85} barColor="text-green-500" />
              <div className="flex-1">
                 <h4 className="text-xl font-bold text-gray-900">MIT (Massachusetts Institute of Technology)</h4>
                 <p className="text-sm text-gray-500 mt-1">Based on Alex's current trajectory in PCM track.</p>
                 <div className="mt-4 flex gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md font-bold">Math matches profile</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-md font-bold">Needs more extracurriculars</span>
                 </div>
              </div>
              <button className="bg-green-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-700 w-full md:w-auto">Explore AI Paths</button>
           </div>
        </div>

        {/* Scholarships */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <Award size={20} className="text-green-500"/> Scholarship Engine
           </h3>
           <div className="space-y-4">
              {scholarships.map((schol, idx) => (
                <div key={idx} className="border-l-4 border-green-500 bg-gray-50 p-4 rounded-r-xl">
                   <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-900 text-sm">{schol.name}</h4>
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">{schol.match} Match</span>
                   </div>
                   <div className="flex justify-between items-center mt-3 text-sm">
                      <span className="font-black text-gray-800">{schol.amount}</span>
                      <span className="text-gray-500 text-xs">Due: {schol.deadline}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Shadowing & Alumni */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 lg:col-span-3">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <Briefcase size={20} className="text-green-500"/> Networking & Experience
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-100 p-6 rounded-2xl flex gap-4 items-center">
                 <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center shrink-0">
                    <Activity className="text-green-700" size={24}/>
                 </div>
                 <div>
                    <h4 className="font-bold text-green-900">Shadowing & Internships</h4>
                    <p className="text-sm text-green-800 mt-1">Track summer internships and local tech company shadowing.</p>
                 </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex gap-4 items-center">
                 <div className="w-12 h-12 bg-emerald-200 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="text-emerald-700" size={24}/>
                 </div>
                 <div>
                    <h4 className="font-bold text-emerald-900">Alumni Mentor Connect</h4>
                    <p className="text-sm text-emerald-800 mt-1">Connect with recent grads in Alex's field of interest.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderFinances = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-gray-900">Finances & Logistics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* College Fund */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <DollarSign size={20} className="text-green-500"/> College Fund Calculator
           </h3>
           <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Projected Goal for 2028 (MIT)</p>
              <div className="flex justify-between items-end mb-2">
                 <span className="text-3xl font-black text-gray-900">$102,000</span>
                 <span className="text-sm text-green-600 font-bold">On Track</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                 <div className="bg-green-500 h-3 rounded-full w-[65%]"></div>
              </div>
           </div>
           <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
             If you increase monthly contributions by $150, you'll hit 100% of your initial goal without loans.
           </p>
        </div>

        {/* Bus Pulse */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <MapPin size={20} className="text-green-500"/> Bus/Attendance Live Pulse
           </h3>
           <div className="bg-gray-900 text-white rounded-2xl p-6 relative z-10">
              <div className="flex justify-between items-center mb-4">
                 <span className="font-bold flex items-center gap-2"><MapPin size={16} className="text-red-400"/> Route #42</span>
                 <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded font-bold">In Transit</span>
              </div>
              <p className="text-sm text-gray-300">Next stop: Elm Street (5 mins away)</p>
              <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between text-sm">
                 <span className="text-gray-400">Alex's Status:</span>
                 <span className="font-bold text-green-400">On Board</span>
              </div>
           </div>
        </div>

        {/* Vault & Group Buy */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 lg:col-span-2">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-100 rounded-2xl flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
                 <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0"><FileText size={24}/></div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-lg">One-Tap Doc Vault</h4>
                    <p className="text-sm text-gray-500 mt-1">Sign permission slips, medical forms, and secure tax documents.</p>
                 </div>
              </div>
              <div className="p-6 border border-gray-100 rounded-2xl flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
                 <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center shrink-0"><Users size={24}/></div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-lg">Group-Buy Learning</h4>
                    <p className="text-sm text-gray-500 mt-1">Split costs on bulk premium educational resources with other parents.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900">Resource Center</h2>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50">
          <Globe size={16}/> Language: EN
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bridge the Gap */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 col-span-1">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <BookOpen size={20} className="text-green-500"/> Bridge the Gap
           </h3>
           <p className="text-sm text-gray-500 mb-6">Recommended materials to help your child overcome current hurdles in Physics.</p>
           <div className="space-y-4">
              <div className="flex gap-4 p-4 border border-gray-100 rounded-2xl">
                 <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0"><Video size={24}/></div>
                 <div>
                    <h4 className="font-bold text-sm">Khan Academy: Vectors</h4>
                    <p className="text-xs text-gray-500 mb-2">15 mins • Directly addresses recent quiz</p>
                    <button className="text-xs font-bold text-green-600">Assign to Alex</button>
                 </div>
              </div>
           </div>
        </div>

        {/* Masterclasses */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 col-span-1">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <Star size={20} className="text-green-500"/> Parenting Pro Masterclasses
           </h3>
           <div className="space-y-4">
              <div className="bg-green-50 p-4 border border-green-100 rounded-2xl">
                 <span className="text-xs font-bold text-green-700 uppercase">Upcoming Live Session</span>
                 <h4 className="font-bold text-green-900 text-lg mt-1 mb-2">"Navigating High School Burnout"</h4>
                 <p className="text-sm text-green-800 mb-4">Dr. Emily Chen, Child Psychologist</p>
                 <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm w-full">Reserve Seat</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderProductivity = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-gray-900">Productivity Suite</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* AI Lesson Co-Pilot */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <Brain size={20} className="text-green-500"/> AI Lesson Co-Pilot
              </h3>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full animate-pulse">Active</span>
           </div>
           <p className="text-gray-500 mb-6 leading-relaxed">Instantly generate lesson plans, activities, and discussion questions.</p>
           <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row gap-2">
               <input type="text" placeholder="e.g., Photosynthesis" className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-400" />
               <button className="bg-green-600 text-white rounded-xl px-4 py-2 font-bold shadow-md hover:bg-green-700 transition shrink-0">Generate</button>
           </div>
        </div>

        {/* Automatic Rubric Generator */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
             <FileCheck size={20} className="text-green-500"/> Automatic Rubric Generator
           </h3>
           <p className="text-gray-500 mb-6 leading-relaxed">Save hours of manual grading setup. Create detailed grading rubrics in seconds.</p>
           <button className="w-full flex justify-between items-center bg-gray-50 border border-gray-200 p-4 rounded-2xl hover:bg-green-50 hover:border-green-200 transition-colors group">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-green-100 text-gray-500 group-hover:text-green-600 transition-colors">
                 <Plus size={18}/>
               </div>
               <span className="font-bold text-gray-700 group-hover:text-green-800 transition-colors">Create New Rubric</span>
             </div>
           </button>
        </div>

        {/* Voice-to-Grade Assistant */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-4">
             <Mic size={20} className="text-green-500"/> Voice-to-Grade Assistant
           </h3>
           <p className="text-gray-500 mb-6 leading-relaxed">Dictate feedback directly. The AI will transcribe and organize your thoughts into formal grading notes.</p>
           <div className="flex justify-center flex-col items-center py-6 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
             <button className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 hover:scale-105 transition-all shadow-inner">
               <Mic size={28} className="text-green-600"/>
             </button>
             <p className="text-sm font-bold text-gray-500 mt-4">Tap to start recording</p>
           </div>
        </div>

        {/* Automated Sub-Plans */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden">
           <ClipboardList className="absolute right-6 top-6 text-white/10" size={100} />
           <div className="relative z-10">
             <h3 className="font-bold text-xl flex items-center gap-2 mb-3">
               <Calendar size={24} className="text-green-400"/> Automated Sub-Plans
             </h3>
             <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-[80%]">Generate comprehensive, easy-to-follow substitute teacher plans based on your current curriculum timeline.</p>
             <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 shadow-lg shadow-green-500/20">
               Generate Plan 
             </button>
           </div>
        </div>

      </div>
    </div>
  );

  const renderFamilySync = () => {
    const toggleChildSync = (id: number) => {
      setSelectedChildren(prev => 
        prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
      );
    };

    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-black text-gray-900">Family Sync Hub</h2>
        <p className="text-gray-500 text-sm mb-4">Seamlessly compare your children side-by-side and manage synchronized family logistics.</p>
        
        <div className="flex flex-wrap gap-4 mb-6">
           {childData.filter(c => c.id !== 'all').map(child => (
             <button 
               key={child.id}
               onClick={() => toggleChildSync(child.id as number)}
               className={`flex items-center gap-3 px-4 py-2 rounded-full border-2 transition-colors ${selectedChildren.includes(child.id as number) ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white opacity-50'}`}
             >
                <img src={child.avatar} alt="avatar" className="w-8 h-8 rounded-full border border-gray-100"/>
                <span className="font-bold text-gray-900 text-sm">{child.name}</span>
             </button>
           ))}
        </div>

        {/* The Grid / Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {selectedChildren.map(id => {
             const childInfo = childData.find(c => c.id === id);
             const isAlex = id === 1;
             return (
               <div key={id} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col">
                  <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                     <img src={childInfo?.avatar} className="w-14 h-14 rounded-full border border-gray-200 shadow-sm"/>
                     <div>
                       <h3 className="font-black text-xl text-gray-900">{isAlex ? 'Alex - 11th Std' : 'Sarah - 7th Std'}</h3>
                       <p className="text-sm font-bold text-gray-500">{isAlex ? 'PCM Track' : 'General Track'}</p>
                     </div>
                  </div>
                  <div className="space-y-4 flex-1">
                     <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <span className="text-sm font-bold text-gray-600">{isAlex ? 'Current Average' : 'Math Modules'}</span>
                        <span className="text-lg font-black text-green-600">{isAlex ? 'A Grade' : '75% Completed'}</span>
                     </div>
                     <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <span className="text-sm font-bold text-gray-600">{isAlex ? 'Upcoming Event' : 'Next Milestone'}</span>
                        <span className="text-sm font-bold text-gray-900">{isAlex ? 'Physics Mock (Oct 24)' : 'Parent-Counselor Meet'}</span>
                     </div>
                     {isAlex ? (
                       <div className="mt-4 p-5 bg-orange-50 rounded-2xl border border-orange-100">
                          <p className="text-xs font-bold text-orange-600 mb-1 uppercase tracking-wide">Growth Pulse</p>
                          <p className="text-sm text-orange-900 font-medium">Logic Reasoning is trending up! +10% needed for MIT benchmark.</p>
                       </div>
                     ) : (
                       <div className="mt-4 p-5 bg-purple-50 rounded-2xl border border-purple-100">
                          <p className="text-xs font-bold text-purple-600 mb-1 uppercase tracking-wide">Growth Pulse</p>
                          <p className="text-sm text-purple-900 font-medium">Has progressed steadily since 1st Grade. Strong in Literature.</p>
                       </div>
                     )}
                  </div>
               </div>
             )
          })}
        </div>

        {/* 5 Unique Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Cross-Sibling Mentorship */}
           <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden lg:col-span-2">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-6 relative z-10 w-full">
                 <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                    <Brain className="text-green-400" size={32}/>
                 </div>
                 <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                       <Star size={18} className="text-green-400 fill-green-400"/> Cross-Sibling Mentorship Nudge
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                       "Alex is currently excelling in 11th Grade Algebra. Sarah is struggling slightly with 7th Grade Pre-Algebra Basics. Suggest a 15-minute 'Peer-Tutor' session between them this weekend? It reinforces Alex's fundamentals and builds Sarah's confidence."
                    </p>
                 </div>
                 <div className="flex sm:flex-col gap-3 shrink-0 self-stretch sm:self-auto justify-center">
                    <button className="bg-green-500 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-green-600 shadow-md whitespace-nowrap">Schedule Session</button>
                    <button className="bg-white/10 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-white/20 transition-colors whitespace-nowrap">Dismiss</button>
                 </div>
              </div>
           </div>

           {/* Shared Calendar (Chaos Map) */}
           <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
                  <Calendar size={20} className="text-green-500"/> Shared Calendar (Chaos Map)
                </h3>
                <p className="text-xs text-gray-500 mb-4 font-bold uppercase tracking-wider">Upcoming Overlaps:</p>
                <div className="space-y-3">
                   <div className="p-4 border-l-4 border-blue-500 bg-blue-50/50 rounded-r-xl border-y border-r border-blue-100">
                      <div className="flex justify-between items-start">
                         <span className="font-bold text-sm text-gray-900">Alex's Physics Mock</span>
                         <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">Thurs, 2:00 PM</span>
                      </div>
                   </div>
                   <div className="p-4 border-l-4 border-purple-500 bg-purple-50/50 rounded-r-xl border-y border-r border-purple-100">
                      <div className="flex justify-between items-start">
                         <span className="font-bold text-sm text-gray-900">Sarah's Science Fair</span>
                         <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">Thurs, 3:30 PM</span>
                      </div>
                   </div>
                </div>
              </div>
              <div className="mt-6 bg-orange-50 border border-orange-200 p-4 rounded-2xl flex gap-3 text-orange-800 text-sm shadow-sm">
                 <AlertTriangle size={18} className="shrink-0 text-orange-500"/>
                 <p className="leading-tight"><strong>Heads Up!</strong> Thursday afternoon is extremely busy for both children.</p>
              </div>
           </div>

           {/* Family Achievement Wall */}
           <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
                  <Award size={20} className="text-green-500"/> Family Achievement Wall
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                   <div className="shrink-0 w-36 h-44 bg-gray-50 border border-gray-200 rounded-3xl flex flex-col items-center justify-center p-4 text-center hover:border-green-300 hover:bg-green-50 cursor-pointer transition-colors group">
                      <Award size={40} className="text-blue-500 mb-3 group-hover:scale-110 transition-transform"/>
                      <p className="font-bold text-xs text-gray-900">State Math Olympiad</p>
                      <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest bg-white px-2 py-0.5 rounded shadow-sm">Alex (2025)</p>
                   </div>
                   <div className="shrink-0 w-36 h-44 bg-gray-50 border border-gray-200 rounded-3xl flex flex-col items-center justify-center p-4 text-center hover:border-green-300 hover:bg-green-50 cursor-pointer transition-colors group">
                      <FileText size={40} className="text-purple-500 mb-3 group-hover:scale-110 transition-transform"/>
                      <p className="font-bold text-xs text-gray-900">Excellence in Literature</p>
                      <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest bg-white px-2 py-0.5 rounded shadow-sm">Sarah (2026)</p>
                   </div>
                </div>
              </div>
              <button className="mt-4 w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-green-300 hover:text-green-600 transition-colors">
                Add New Certificate
              </button>
           </div>

           {/* Unified Logistics Sync */}
           <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <MapPin size={20} className="text-green-500"/> Unified Logistics Sync
                </h3>
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">Live Tracker</span>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                 <div className="flex-1 bg-gray-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-inner border border-gray-800">
                    <MapPin className="absolute right-[-20px] bottom-[-20px] text-white/5" size={140}/>
                    <div className="relative z-10 flex justify-between items-center mb-6">
                       <span className="font-bold text-blue-400 text-lg">Alex's Route #42</span>
                       <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1.5 rounded-lg border border-green-500/30 font-black tracking-wide uppercase">5 mins away</span>
                    </div>
                    <div className="relative z-10 space-y-2">
                       <p className="text-sm text-gray-400">Next stop: <strong className="text-white">Elm Street</strong></p>
                       <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                          <div className="bg-blue-500 h-1.5 rounded-full w-[85%] relative">
                             <div className="absolute right-0 top-1/2 w-3 h-3 bg-white rounded-full -translate-y-1/2 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="flex-1 bg-gray-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-inner border border-gray-800">
                    <MapPin className="absolute right-[-20px] bottom-[-20px] text-white/5" size={140}/>
                    <div className="relative z-10 flex justify-between items-center mb-6">
                       <span className="font-bold text-purple-400 text-lg">Sarah's Route #12</span>
                       <span className="bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1.5 rounded-lg border border-yellow-500/30 font-black tracking-wide uppercase">15 mins away</span>
                    </div>
                    <div className="relative z-10 space-y-2">
                       <p className="text-sm text-gray-400">Next stop: <strong className="text-white">Oak Avenue</strong></p>
                       <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                          <div className="bg-purple-500 h-1.5 rounded-full w-[45%] relative">
                             <div className="absolute right-0 top-1/2 w-3 h-3 bg-white rounded-full -translate-y-1/2 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Edu-Wallet */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 lg:col-span-2">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-6 gap-4">
              <div>
                <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                  <Wallet size={24} className="text-green-500"/> Edu-Wallet (Incentive Engine)
                </h3>
                <p className="text-gray-500 text-sm mt-1">Reward academic achievements directly via in-app wallet balance connected to the school cafe.</p>
              </div>
              <div className="bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-4 w-full md:w-auto overflow-x-auto">
                 <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Available Balance</p>
                    <p className="text-2xl font-black text-green-400">₹450.00</p>
                 </div>
                 <div className="h-10 w-px bg-gray-700 mx-2"></div>
                 <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-xl font-bold text-sm transition-colors whitespace-nowrap">
                    <Plus size={16}/> Load funds
                 </button>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Active Rules */}
              <div>
                 <h4 className="font-bold text-gray-900 text-md mb-4 flex items-center gap-2"><Target size={18} className="text-gray-400"/> Active Auto-Reward Rules</h4>
                 <div className="space-y-3">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer">
                       <div>
                          <p className="text-sm font-bold text-green-900">Math Module &gt; 80%</p>
                          <p className="text-xs text-green-700 mt-0.5">Auto-deposits ₹50 to Alex's wallet</p>
                       </div>
                       <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-lg">Active</span>
                    </div>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer">
                       <div>
                          <p className="text-sm font-bold text-gray-700">100% Attendance (Weekly)</p>
                          <p className="text-xs text-gray-500 mt-0.5">Auto-deposits ₹100</p>
                       </div>
                       <span className="bg-gray-300 text-gray-600 text-xs font-bold px-2 py-1 rounded-lg">Paused</span>
                    </div>
                    <button className="w-full mt-2 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-green-300 hover:text-green-600 transition-colors flex justify-center items-center gap-2 text-sm">
                      <Plus size={18}/> Create New Rule
                    </button>
                 </div>
              </div>
              
              {/* Transaction History */}
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
                 <h4 className="font-bold text-gray-900 text-md mb-4 flex items-center gap-2"><History size={18} className="text-gray-400"/> Transaction History</h4>
                 <div className="space-y-1">
                    {walletTransactions.map((trx) => (
                      <div key={trx.id} className="flex justify-between items-center p-3 border-b border-gray-200 last:border-0 hover:bg-white rounded-xl transition-colors cursor-pointer">
                         <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm ${trx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                               {trx.type === 'credit' ? <Target size={18}/> : <Coins size={18}/>}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-gray-900">{trx.title}</p>
                               <p className="text-xs text-gray-500 mt-0.5">{trx.date}</p>
                            </div>
                         </div>
                         <span className={`font-black text-sm px-2 py-1 rounded-lg ${trx.type === 'credit' ? 'text-green-600 bg-green-50' : 'text-gray-900 bg-gray-100'}`}>{trx.amount}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  };

  const renderCommunity = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
         <div>
            <h2 className="text-2xl font-black text-gray-900">Community Hub</h2>
            <p className="text-gray-500 text-sm mt-1">Move from a passive monitor to an active contributor in our school's ecosystem.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Guest Speaker Registry */}
         <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden lg:col-span-2 flex flex-col md:flex-row gap-8 items-center">
            <Radio className="absolute right-[-20px] top-[-20px] text-white/10" size={200}/>
            <div className="flex-1 relative z-10 space-y-4">
               <h3 className="font-bold text-2xl flex items-center gap-2">
                 <Mic size={28} className="text-green-200"/> Guest Speaker Registry
               </h3>
               <p className="text-green-50 leading-relaxed text-sm">
                 Join our searchable database of parent professionals! Teachers can filter by your specified topics and invite you to speak to classes relevant to your expertise. Share your real-world experience and inspire the next generation.
               </p>
               <div className="flex flex-wrap gap-4 mt-4">
                 <span className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-xl text-xs font-bold border border-white/30 backdrop-blur-md"><Globe size={16}/> Virtual or In-Person</span>
                 <span className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-xl text-xs font-bold border border-white/30 backdrop-blur-md"><UserPlus size={16}/> 45+ Active Parents</span>
               </div>
            </div>
            
            {/* The Professional Profile Card */}
            <div className="w-full md:w-[450px] bg-white rounded-3xl p-6 shadow-2xl relative z-10 text-gray-900">
               <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                  <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <Briefcase size={20} className="text-green-600"/> Professional Profile
                  </h4>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-lg border border-green-200">Active</span>
               </div>
               
               <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Industry</label>
                    <input type="text" className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors" defaultValue="Civil Engineering" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Years of Exp.</label>
                      <input type="number" className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors" defaultValue={15} />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Format</label>
                      <select className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors">
                         <option>Virtual / Zoom</option>
                         <option>In-Person</option>
                         <option>Both</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Expertise Topics</label>
                    <div className="mt-2 flex flex-wrap gap-2 mb-3">
                       <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">Bridge Design <button className="hover:text-red-500 ml-1">&times;</button></span>
                       <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">Python Automation <button className="hover:text-red-500 ml-1">&times;</button></span>
                    </div>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors" placeholder="Add a topic (e.g., Fluid Mechanics)..." />
                  </div>
                  <button className="w-full mt-4 bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 text-sm">Update Profile to Teacher Hub</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderCampusLife = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-gray-900">Campus Life & Weekly Timetable</h2>
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
         <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
           <Calendar size={20} className="text-green-500"/> Alex's Master Timetable
         </h3>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
               <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                     <th className="p-4 rounded-tl-xl border-b border-gray-100">Time</th>
                     <th className="p-4 border-b border-gray-100">Monday</th>
                     <th className="p-4 border-b border-gray-100">Tuesday</th>
                     <th className="p-4 border-b border-gray-100">Wednesday</th>
                     <th className="p-4 border-b border-gray-100">Thursday</th>
                     <th className="p-4 rounded-tr-xl border-b border-gray-100">Friday</th>
                  </tr>
               </thead>
               <tbody className="text-sm">
                  <tr className="border-b border-gray-100">
                     <td className="p-4 font-bold text-gray-900">09:00 AM</td>
                     <td className="p-4"><div className="bg-blue-50 text-blue-700 p-2 rounded-lg font-bold text-xs"><p>Physics</p><p className="font-medium">Room 101</p></div></td>
                     <td className="p-4"><div className="bg-purple-50 text-purple-700 p-2 rounded-lg font-bold text-xs"><p>Math</p><p className="font-medium">Room 204</p></div></td>
                     <td className="p-4"><div className="bg-blue-50 text-blue-700 p-2 rounded-lg font-bold text-xs"><p>Physics</p><p className="font-medium">Room 101</p></div></td>
                     <td className="p-4"><div className="bg-green-50 text-green-700 p-2 rounded-lg font-bold text-xs"><p>Chemistry</p><p className="font-medium">Lab 2</p></div></td>
                     <td className="p-4"><div className="bg-orange-50 text-orange-700 p-2 rounded-lg font-bold text-xs"><p>English</p><p className="font-medium">Room 305</p></div></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                     <td className="p-4 font-bold text-gray-900">10:00 AM</td>
                     <td className="p-4"><div className="bg-purple-50 text-purple-700 p-2 rounded-lg font-bold text-xs"><p>Math</p><p className="font-medium">Room 204</p></div></td>
                     <td className="p-4"><div className="bg-green-50 text-green-700 p-2 rounded-lg font-bold text-xs"><p>Chemistry</p><p className="font-medium">Lab 2</p></div></td>
                     <td className="p-4"><div className="bg-blue-50 text-blue-700 p-2 rounded-lg font-bold text-xs"><p>Physics</p><p className="font-medium">Room 101</p></div></td>
                     <td className="p-4 border-2 border-red-400 rounded-lg relative"><div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full -mt-1 -mr-1 animate-ping"></div><div className="bg-red-50 text-red-700 p-2 rounded-lg font-bold text-xs shadow-sm"><p>Struct. Mechanics</p><p className="font-medium">Room 302</p></div></td>
                     <td className="p-4"><div className="bg-blue-50 text-blue-700 p-2 rounded-lg font-bold text-xs"><p>Physics</p><p className="font-medium">Room 101</p></div></td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );

  const renderCollaboration = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-gray-900">Collaboration Hub</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Goal Setting Contract */}
         <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-4">
              <PenBox size={20} className="text-green-500"/> Collaborative "Goal-Setting" Contract
            </h3>
            <p className="text-sm text-gray-500 mb-6">Jointly agree on specific goals for the child to turn complaints into a shared mission.</p>
            <div className="space-y-4 mb-6">
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0"><CheckCircle2 size={14} className="text-green-500"/></div>
                  <span className="text-sm font-bold text-gray-700">Improve handwriting in science labs</span>
               </div>
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0"></div>
                  <span className="text-sm font-bold text-gray-700">Participate in at least one extracurricular club</span>
               </div>
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0"></div>
                  <span className="text-sm font-bold text-gray-700">Master PCM foundational formulas by Midterms</span>
               </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-2xl border border-green-200">
               <div className="text-sm">
                  <p className="font-bold text-green-900">Digital Signatures</p>
                  <p className="text-green-700 mt-1">✓ Term 1 Agreement Pending</p>
               </div>
               <button className="bg-green-600 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:bg-green-700 transition-colors">Sign Contract</button>
            </div>
         </div>

         {/* Tone-Check AI Assistant */}
         <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden">
            <Edit3 className="absolute right-[-20px] bottom-[-20px] text-white/5" size={150}/>
            <div className="relative z-10 flex flex-col h-full">
               <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                 <Brain size={24} className="text-purple-400"/> AI "Tone-Check" Assistant
               </h3>
               <p className="text-gray-400 text-sm mb-6">Maintain professional, supportive communication with teachers.</p>
               
               <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-4">
                  <div>
                     <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Your Draft</p>
                     <p className="text-sm font-medium bg-red-500/10 text-red-200 p-3 rounded-xl border border-red-500/20">"Why did my son get a C?"</p>
                  </div>
                  <div>
                     <p className="text-xs text-green-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-1"><Brain size={12}/> AI Suggestion (Collaborative)</p>
                     <p className="text-sm font-medium bg-green-500/10 text-green-100 p-3 rounded-xl border border-green-500/30">"I noticed Alex struggled with the recent exam. Could you suggest specific areas for us to practice at home?"</p>
                  </div>
               </div>
               <div className="flex gap-4 mt-6">
                  <button className="flex-1 bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 shadow-lg transition-colors text-sm">Use Suggestion</button>
                  <button className="flex-1 bg-transparent border border-gray-600 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">Edit Original</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeMenuItem) {
      case 'home': return renderHome();
      case 'family': return renderFamilySync();
      case 'growth': return renderGrowthJourney();
      case 'academic': return renderAcademic();
      case 'counselor': return renderCounselor();
      case 'future': return renderFuture();
      case 'campusLife': return renderCampusLife();
      case 'collaboration': return renderCollaboration();
      case 'finances': return renderFinances();
      case 'resources': return renderResources();
      case 'productivity': return renderProductivity();
      case 'community': return renderCommunity();
      case 'settings': return <ParentSettings />;
      default: return renderHome();
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <motion.div 
        initial={{ width: 280 }}
        animate={{ width: isSidebarOpen ? 280 : 80 }} 
        transition={{ duration: 0.3, type: "spring", stiffness: 100, damping: 20 }} 
        className="bg-white shadow-xl z-20 flex flex-col relative shrink-0"
      >
        {/* Logo Area */}
        <div className={`flex items-center gap-3 h-20 px-6 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
          <Shield className="text-green-600 shrink-0" size={32} />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-xl font-bold tracking-tight whitespace-nowrap overflow-hidden"
              >
                Edu-<span className="text-green-600">Parent</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-24 bg-white border border-gray-200 text-gray-500 hover:text-green-600 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all z-50"
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenuItem(item.id)}
              className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-left transition-all group relative ${
                activeMenuItem === item.id 
                  ? 'bg-green-50 text-green-600 font-semibold shadow-sm border border-green-100/50' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              } ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <item.icon size={22} className={`shrink-0 ${activeMenuItem === item.id ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
              
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        {/* Log Out Button */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={onLogout}
            className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-left text-red-500 hover:bg-red-50 transition-all ${!isSidebarOpen ? 'justify-center' : ''}`}
          >
            <LogOut size={22} className="shrink-0" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden font-medium"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-gray-50/50">
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 px-8 flex justify-between items-center shrink-0 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-black text-gray-900 hidden md:block">Parent Portal</h1>
          </div>
          <div className="flex items-center gap-6">
            
            <div className="relative hidden md:block w-64">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search reports..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-200 text-sm"/>
            </div>

            <button className="relative p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-full transition-colors group">
              <MapPin size={20} />
              <div className="absolute right-0 top-full mt-2 w-max bg-gray-900 text-white text-xs font-bold py-2 px-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl z-50">
                 {typeof activeChild === 'number' ? `Last seen: ${childData.find(c => c.id === activeChild)?.lastSeen || 'Unknown'}` : 'Select a child to view location'}
              </div>
            </button>
            <button className="relative p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-gray-200"></div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-sm text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 font-medium">Guardian Account</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-md border-2 border-white">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMenuItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
=======
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
>>>>>>> 26e689b66aaaf1ea9119e4808d72d3ad799c1830
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