import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Bell, LayoutGrid, Users, CalendarCheck, BarChart2, 
  BookOpen, MessageCircle, FileText, CheckSquare, LogOut,
  GraduationCap, CheckCircle2, AlertCircle, MessageSquare,
  Clock, MapPin, TrendingUp, Send, TrendingDown, Plus, MoreHorizontal, ChevronRight,
  Paperclip, Smile, FileDown, Upload, File, X, DownloadCloud, ChevronLeft, ChevronRight as ChevronRightIcon,
  Menu, FileSearch, Sparkles, Target, AlertTriangle, Lightbulb, Bot
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

// --- Real-time Date Helper ---
const getRelativeDate = (daysOffset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getRelativeMonthLabels = () => {
  const labels = [];
  const d = new Date();
  for (let i = 5; i >= 0; i--) {
    const pastDate = new Date(d.getFullYear(), d.getMonth() - i, 1);
    labels.push(pastDate.toLocaleDateString('en-US', { month: 'short' }));
  }
  return labels;
};

// --- Circular Progress Component ---
const CircularProgress = ({ value, color }: { value: number, color: string }) => (
  <div className="relative w-14 h-14 flex-shrink-0">
    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f3f4f6" strokeWidth="3"></circle>
      <circle 
        cx="18" 
        cy="18" 
        r="15.915" 
        fill="none" 
        stroke={color} 
        strokeWidth="3" 
        strokeDasharray={`${value}, 100`}
        strokeLinecap="round"
      ></circle>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-[13px] font-bold text-gray-800">
      {value}%
    </div>
  </div>
);

// --- Mock Data Generator for 45 Students ---
const generateStudents = () => {
  const names = [
    'Aarav Bhatia', 'Pooja Verma', 'Vivaan Shah', 'Aditya Sharma', 'Priya Malhotra', 
    'Sai Ali', 'Vivaan Mehta', 'Ishaan Iyer', 'Ananya Nair', 'Rohan Das',
    'Sana Khan', 'Arjun Kapoor', 'Meera Joshi', 'Kabir Singh', 'Zara Ahmed',
    'Ishani Bose', 'Rahul Gupta', 'Diya Reddy', 'Ayaan Malik', 'Kriti Sanon',
    'Neil Nitin', 'Tara Sutaria', 'Varun Dhawan', 'Shraddha K.', 'Siddharth M.',
    'Alia Bhatt', 'Ranbir K.', 'Deepika P.', 'Ranveer S.', 'Kiara Advani',
    'Kartik A.', 'Sara Ali', 'Janhvi K.', 'Ishaan K.', 'Ananya P.',
    'Vijay D.', 'Rashmika M.', 'Samantha R.', 'Prabhas R.', 'Mahesh B.',
    'Allu Arjun', 'Ram Charan', 'NTR Jr.', 'Yash K.', 'Rishab S.'
  ];
  
  return names.map((name, index) => {
    const id = `STU${(index + 1).toString().padStart(3, '0')}`;
    const roll = `#${101 + index}`;
    const classes = ['Class 10-A', 'Class 10-B', 'Class 10-C', 'Class 12-B'];
    const phys = Math.floor(Math.random() * (99 - 60 + 1) + 60);
    const math = Math.floor(Math.random() * (99 - 60 + 1) + 60);
    const eng = Math.floor(Math.random() * (99 - 60 + 1) + 60);
    const avg = Math.floor((phys + math + eng) / 3);
    
    return {
      id,
      name,
      roll,
      class: classes[index % classes.length],
      avatar: `https://i.pravatar.cc/150?u=${id}`,
      physics: phys,
      maths: math,
      english: eng,
      avg: avg,
      grade: avg >= 80 ? 'A' : avg >= 70 ? 'B' : 'C',
      trend: Math.random() > 0.3 ? 'up' : 'down'
    };
  });
};

const initialStudentsData = generateStudents();

// --- Message Data ---
const initialContacts = [
  { id: 'p1', name: 'Mrs. Gupta', child: 'Aman', avatar: 'https://i.pravatar.cc/150?u=p1' },
  { id: 'p2', name: 'Mr. Khan', child: 'Zoya', avatar: 'https://i.pravatar.cc/150?u=p2' },
  { id: 'p3', name: 'Mr. Sharma', child: 'Aditya', avatar: 'https://i.pravatar.cc/150?u=p3' },
  { id: 'p4', name: 'Mrs. Malhotra', child: 'Priya', avatar: 'https://i.pravatar.cc/150?u=p4' },
];

const initialAssignments = [
  { id: 1, title: 'Physics: Chapter 4 Lab', due: getRelativeDate(2), submitted: 18, total: 30, status: 'Needs Grading', color: 'amber' },
  { id: 2, title: 'Maths: Calculus Basics', due: getRelativeDate(5), submitted: 6, total: 30, status: 'Active', color: 'emerald' }
];

interface TeacherDashboardProps {
  onLogout?: () => void;
}

export default function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'attendance' | 'performance' | 'assignments' | 'homework-analyze' | 'messages' | 'reports' | 'materials'>('overview');
  const [activeContactId, setActiveContactId] = useState('p1');
  const [messageInput, setMessageInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic Data States
  const [studentsList, setStudentsList] = useState(initialStudentsData);
  const [assignments, setAssignments] = useState(initialAssignments);
  
  // Modals States
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [reviewingAssignment, setReviewingAssignment] = useState<any | null>(null);
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [newAssignmentData, setNewAssignmentData] = useState<{title: string, due: string, file: File | null}>({ title: '', due: '', file: null });

  // --- Homework Analyze States ---
  const [analyzeFile, setAnalyzeFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // --- Study Materials State ---
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Physics_Chapter_1_Notes.pdf', size: '2.4 MB', date: getRelativeDate(-2), subject: 'Physics', url: null },
    { id: 2, name: 'Calculus_Worksheet_A.pdf', size: '1.1 MB', date: getRelativeDate(-4), subject: 'Maths', url: null },
    { id: 3, name: 'Atomic_Structure_Guide.pdf', size: '3.8 MB', date: getRelativeDate(-7), subject: 'Physics', url: null },
  ]);
  const [viewingMaterial, setViewingMaterial] = useState<any | null>(null);

  // Real-time clock effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMaterial = {
          id: Date.now(),
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          subject: 'Uploaded Note',
          url: e.target?.result as string
        };
        setMaterials([newMaterial, ...materials]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMaterial = (id: number) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  const [chatHistory, setChatHistory] = useState<Record<string, any[]>>({
    'p1': [
      { sender: 'parent', text: 'Hello Mr. Sharma, is Aman attending extra classes?', time: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      { sender: 'teacher', text: 'Yes, Mrs. Gupta. He is doing well and showing improvement.', time: new Date(Date.now() - 1800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ],
    'p2': [
      { sender: 'parent', text: 'Good evening, I wanted to ask about Zoyas progress.', time: 'Yesterday' }
    ]
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === 'messages') scrollToBottom();
  }, [activeTab, activeContactId, chatHistory]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      sender: 'teacher',
      text: messageInput,
      time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsg]
    }));
    setMessageInput('');
  };

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      if (onLogout) onLogout();
      else window.location.href = '/'; 
    }
  };

  // --- Attendance Logic ---
  const [attendanceState, setAttendanceState] = useState<Record<string, string>>(
    studentsList.reduce((acc, s, i) => ({ ...acc, [s.id]: i < 42 ? 'P' : (i === 42 ? 'A' : 'L') }), {})
  );

  const handleAttendanceToggle = (studentId: string, status: string) => {
    setAttendanceState(prev => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const newState: Record<string, string> = {};
    studentsList.forEach(s => newState[s.id] = 'P');
    setAttendanceState(newState);
  };

  const handleSubmitAttendance = () => {
    alert("Attendance for today has been successfully submitted and saved to the database.");
  };

  // --- Export Data Logic ---
  const exportPerformanceReport = () => {
    const headers = ['Student ID', 'Name', 'Roll No', 'Class', 'Physics', 'Maths', 'English', 'Average', 'Grade'];
    const csvContent = [
      headers.join(','),
      ...studentsList.map(s => [s.id, `"${s.name}"`, s.roll, s.class, s.physics, s.maths, s.english, s.avg, s.grade].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Class_Performance_Report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // --- Student Profile Editing ---
  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    
    const phys = Number(editingStudent.physics);
    const maths = Number(editingStudent.maths);
    const eng = Number(editingStudent.english);
    const avg = Math.floor((phys + maths + eng) / 3);
    const grade = avg >= 80 ? 'A' : avg >= 70 ? 'B' : 'C';
    
    const updatedStudent = { ...editingStudent, avg, grade };
    
    setStudentsList(studentsList.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setEditingStudent(null);
  };

  // --- Add Assignment Logic ---
  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignmentData.title || !newAssignmentData.due) return;
    
    const newAssignment = {
      id: Date.now(),
      title: newAssignmentData.title,
      due: new Date(newAssignmentData.due).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      submitted: 0,
      total: 45,
      status: 'Active',
      color: 'emerald'
    };
    
    setAssignments([newAssignment, ...assignments]);
    setShowAddAssignment(false);
    setNewAssignmentData({ title: '', due: '', file: null });
  };

  // Chart Data
  const chartData = {
    labels: getRelativeMonthLabels(),
    datasets: [
      {
        label: 'Attendance %',
        data: [65, 78, 60, 90, 75, 85], // Real implementation would fetch these based on the relative months
        borderColor: '#4f46e5', 
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#4f46e5',
      },
      {
        label: 'Avg Class Marks',
        data: [45, 60, 55, 75, 65, 80],
        borderColor: '#0ea5e9', 
        backgroundColor: 'transparent',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#0ea5e9',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        position: 'top' as const,
        labels: { boxWidth: 10, usePointStyle: true, font: { family: 'Inter', size: 12 } }
      } 
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#64748b' } },
      y: { border: { dash: [4, 4] }, grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 }, color: '#64748b' }, min: 0, max: 100 }
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'students', label: 'My Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'performance', label: 'Performance', icon: BarChart2 },
    { id: 'assignments', label: 'Assignments', icon: CheckSquare },
    { id: 'homework-analyze', label: 'Homework Analyze', icon: FileSearch },
    { id: 'materials', label: 'Study Materials', icon: BookOpen },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-[#f3f4f6] font-sans overflow-hidden text-slate-800">
      
      {/* EDIT STUDENT MODAL */}
      <AnimatePresence>
        {editingStudent && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingStudent(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative z-10 flex flex-col overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-lg text-slate-800">Edit Student Profile</h3>
                <button onClick={() => setEditingStudent(null)} className="text-slate-400 hover:text-red-500">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSaveStudent} className="p-6 space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <img src={editingStudent.avatar} className="w-16 h-16 rounded-full object-cover border border-slate-200" alt="Avatar"/>
                  <div>
                    <p className="text-sm font-bold text-slate-500">ID: {editingStudent.id}</p>
                    <p className="text-sm font-bold text-slate-500">Roll: {editingStudent.roll}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                  <input type="text" value={editingStudent.name} onChange={e => setEditingStudent({...editingStudent, name: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Class & Section</label>
                  <input type="text" value={editingStudent.class} onChange={e => setEditingStudent({...editingStudent, class: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Physics</label>
                    <input type="number" min="0" max="100" value={editingStudent.physics} onChange={e => setEditingStudent({...editingStudent, physics: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Maths</label>
                    <input type="number" min="0" max="100" value={editingStudent.maths} onChange={e => setEditingStudent({...editingStudent, maths: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">English</label>
                    <input type="number" min="0" max="100" value={editingStudent.english} onChange={e => setEditingStudent({...editingStudent, english: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-4">
                  <button type="button" onClick={() => setEditingStudent(null)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-sm">Save Changes</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD ASSIGNMENT MODAL */}
      <AnimatePresence>
        {showAddAssignment && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddAssignment(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative z-10 flex flex-col overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-lg text-slate-800">Create New Assignment</h3>
                <button onClick={() => setShowAddAssignment(false)} className="text-slate-400 hover:text-red-500">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddAssignment} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Assignment Title</label>
                  <input type="text" placeholder="e.g. Science Project Phase 1" value={newAssignmentData.title} onChange={e => setNewAssignmentData({...newAssignmentData, title: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Due Date</label>
                  <input type="date" value={newAssignmentData.due} onChange={e => setNewAssignmentData({...newAssignmentData, due: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Attachment File (Optional)</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-slate-50" onClick={() => document.getElementById('assignment-file-upload')?.click()}>
                    <input type="file" id="assignment-file-upload" className="hidden" onChange={(e) => setNewAssignmentData({...newAssignmentData, file: e.target.files?.[0] || null})} />
                    {newAssignmentData.file ? (
                      <div className="flex items-center justify-center gap-2 text-sm text-indigo-600 font-bold">
                        <File size={16} /> {newAssignmentData.file.name}
                      </div>
                    ) : (
                      <div className="text-slate-500 text-xs flex flex-col items-center gap-1">
                        <Upload size={16} className="text-slate-400" />
                        <span>Click to upload a document</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-4">
                  <button type="button" onClick={() => setShowAddAssignment(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-sm">Publish Assignment</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REVIEW SUBMISSIONS MODAL */}
      <AnimatePresence>
        {reviewingAssignment && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReviewingAssignment(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative z-10 flex flex-col overflow-hidden max-h-[85vh]"
            >
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Review: {reviewingAssignment.title}</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">Showing {Math.min(reviewingAssignment.submitted, studentsList.length)} submissions</p>
                </div>
                <button onClick={() => setReviewingAssignment(null)} className="text-slate-400 hover:text-red-500 bg-white p-1 rounded-md shadow-sm border border-slate-200">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {reviewingAssignment.submitted === 0 ? (
                  <div className="text-center py-10 flex flex-col items-center">
                    <CheckSquare size={48} className="text-slate-200 mb-4" />
                    <h4 className="text-lg font-bold text-slate-700">No Submissions Yet</h4>
                    <p className="text-sm text-slate-500">Students have not uploaded their work for this assignment.</p>
                  </div>
                ) : (
                  studentsList.slice(0, reviewingAssignment.submitted).map((student, idx) => (
                    <div key={student.id} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between bg-white hover:border-indigo-200 hover:shadow-sm transition-all">
                      <div className="flex items-center gap-4">
                        <img src={student.avatar} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                        <div>
                          <p className="font-bold text-sm text-slate-900">{student.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button className="text-xs text-indigo-600 font-bold flex items-center gap-1 hover:underline">
                              <Paperclip size={12}/> {student.name.split(' ')[0]}_Assignment.pdf
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <input 
                          type="text" 
                          placeholder="Grade" 
                          defaultValue={idx % 3 === 0 ? 'A' : ''} 
                          className="w-20 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-center outline-none focus:border-indigo-500 bg-slate-50" 
                        />
                        <button 
                          onClick={(e) => {
                            const btn = e.currentTarget;
                            btn.textContent = 'Saved';
                            btn.classList.add('bg-emerald-100', 'text-emerald-700');
                            setTimeout(() => { btn.textContent = 'Save'; btn.classList.remove('bg-emerald-100', 'text-emerald-700'); }, 2000);
                          }}
                          className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PDF VIEWER MODAL */}
      <AnimatePresence>
        {viewingMaterial && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingMaterial(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] overflow-hidden shadow-2xl relative z-10 flex flex-col"
            >
              {/* Toolbar */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                    <File size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 truncate max-w-[200px] md:max-w-md">{viewingMaterial.name}</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{viewingMaterial.subject} • {viewingMaterial.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => {
                    const link = document.createElement('a');
                    link.href = viewingMaterial.url || '#';
                    link.download = viewingMaterial.name;
                    link.click();
                  }} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
                    <DownloadCloud size={20} />
                  </button>
                  <div className="w-px h-6 bg-slate-300 mx-1" />
                  <button onClick={() => setViewingMaterial(null)} className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* PDF Content View */}
              <div className="flex-1 bg-slate-200 overflow-hidden flex justify-center">
                {viewingMaterial.url ? (
                  <iframe 
                    src={viewingMaterial.url} 
                    className="w-full h-full border-none"
                    title="Document Viewer"
                  />
                ) : (
                  <div className="overflow-y-auto p-4 md:p-8 flex justify-center w-full custom-scrollbar">
                    <div className="bg-white w-full max-w-[800px] min-h-[1100px] shadow-lg rounded-sm p-12 md:p-20 relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
                      <div className="space-y-10">
                        <div className="pb-10 border-b border-slate-200">
                          <h2 className="text-3xl font-black text-slate-900 mb-4">{viewingMaterial.name.replace('.pdf', '').replace(/_/g, ' ')}</h2>
                          <div className="flex gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
                             <span>Faculty: Science</span>
                             <span>Session: {currentTime.getFullYear()}-{currentTime.getFullYear() + 1}</span>
                          </div>
                        </div>
                        <div className="space-y-6 text-slate-700 leading-relaxed">
                          <h4 className="text-lg font-bold text-slate-800 underline decoration-indigo-200 underline-offset-4 tracking-tight">System Notice</h4>
                          <p>This is a simulated preview for default system files. Upload your own documents to see them here "as is".</p>
                          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <p className="font-bold text-indigo-600 mb-2">Technical Note:</p>
                            <p className="italic font-medium">Full browser-based PDF rendering is available for user-uploaded documents only.</p>
                          </div>
                          <div className="pt-20 text-center opacity-20 select-none">
                            <File size={120} className="mx-auto" />
                            <p className="text-sm font-bold mt-4">END OF PREVIEW</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Control Footer */}
              <div className="px-6 py-3 border-t border-slate-200 bg-white flex items-center justify-center gap-6 shrink-0">
                 <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><ChevronLeft size={20}/></button>
                 <span className="text-sm font-bold text-slate-600">Document Reader Active</span>
                 <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><ChevronRightIcon size={20}/></button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* COLLAPSIBLE LEFT SIDEBAR (Teacher-Friendly) */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 flex flex-col z-20 flex-shrink-0 transition-all duration-300 overflow-hidden`}>
        <div className={`h-20 flex items-center border-b border-slate-100 shrink-0 ${isSidebarOpen ? 'px-6' : 'justify-center px-0'}`}>
          <div className="flex items-center gap-3 text-indigo-600 w-full">
            <div className="bg-indigo-50 p-2 rounded-lg shrink-0">
              <GraduationCap size={24} />
            </div>
            {isSidebarOpen && <span className="text-xl font-bold text-slate-900 tracking-tight whitespace-nowrap">Edu<span className="text-indigo-600">Teacher</span></span>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar overflow-x-hidden">
          {isSidebarOpen && <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 mt-2 whitespace-nowrap">Main Menu</p>}
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                title={!isSidebarOpen ? item.label : undefined}
                className={`w-full flex items-center gap-3 py-3 rounded-xl transition-all font-medium text-sm ${isSidebarOpen ? 'px-3' : 'justify-center px-0'} ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <IconComp size={20} className={`shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {isSidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
              </button>
            )
          })}
        </div>

        <div className="p-4 border-t border-slate-100 shrink-0">
          <button 
            onClick={handleLogoutClick}
            title={!isSidebarOpen ? "Log Out" : undefined}
            className={`w-full flex items-center gap-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium text-sm ${isSidebarOpen ? 'px-3' : 'justify-center px-0'}`}
          >
            <LogOut size={20} className="shrink-0" />
            {isSidebarOpen && <span className="whitespace-nowrap">Log Out</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 transition-all duration-300">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors shrink-0">
              <Menu size={24} />
            </button>
            <div className="relative w-96 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search students, materials, or messages..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Live Clock Display */}
            <div className="hidden lg:flex flex-col items-end mr-2">
               <span className="text-xs font-bold text-slate-900">{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
               <span className="text-[10px] font-semibold text-slate-500">{currentTime.toLocaleTimeString('en-US')}</span>
            </div>

            <button className="relative p-2 text-slate-500 hover:text-indigo-600 transition-colors shrink-0">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
            
            {/* Teacher Profile Header */}
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity shrink-0">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900 whitespace-nowrap">Mr. Rakesh Sharma</p>
                <p className="text-xs font-medium text-slate-500 whitespace-nowrap">Senior Science Teacher</p>
              </div>
              <img src="https://i.pravatar.cc/150?img=11" className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" alt="Teacher" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="mb-2">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500 text-sm mt-1">Here is what's happening in your classes today.</p>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600"><Users size={24} /></div>
                  <div><p className="text-sm font-semibold text-slate-500">Total Students</p><h3 className="text-2xl font-bold text-slate-900">{studentsList.length}</h3></div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 size={24} /></div>
                  <div><p className="text-sm font-semibold text-slate-500">Present Today</p><h3 className="text-2xl font-bold text-slate-900">{Object.values(attendanceState).filter(v => v === 'P').length}</h3></div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600"><MessageSquare size={24} /></div>
                  <div><p className="text-sm font-semibold text-slate-500">Unread Messages</p><h3 className="text-2xl font-bold text-slate-900">3</h3></div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600"><AlertCircle size={24} /></div>
                  <div><p className="text-sm font-semibold text-slate-500">Pending Grades</p><h3 className="text-2xl font-bold text-slate-900">2</h3></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Wider): Today's Schedule & Assignments */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Today's Course */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold text-slate-900">Today's Schedule</h2>
                      <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">View Full Timetable</button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-100 bg-slate-50 hover:bg-indigo-50/30 transition-all flex-wrap gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg shrink-0">10</div>
                          <div>
                            <h3 className="font-bold text-slate-900">Physics – Class 10-A</h3>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                              <span className="flex items-center gap-1"><Clock size={14} /> 10:30 AM - 11:30 AM</span>
                              <span className="flex items-center gap-1"><BookOpen size={14} /> Laws of Motion</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                           <button onClick={() => setActiveTab('attendance')} className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50">Attendance</button>
                           <button className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700">Start Class</button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-100 bg-slate-50 hover:bg-indigo-50/30 transition-all flex-wrap gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg shrink-0">12</div>
                          <div>
                            <h3 className="font-bold text-slate-900">Mathematics – Class 12-B</h3>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                              <span className="flex items-center gap-1"><Clock size={14} /> 12:00 PM - 01:00 PM</span>
                              <span className="flex items-center gap-1"><BookOpen size={14} /> Integration</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                           <button onClick={() => setActiveTab('attendance')} className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50">Attendance</button>
                           <button className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700">Start Class</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Assignments Preview */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="font-bold text-slate-900 text-lg">Active Assignments</h3>
                      <button onClick={() => setActiveTab('assignments')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Manage</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {assignments.slice(0, 2).map((assign) => (
                        <div key={assign.id} className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-all shadow-sm flex flex-col justify-between">
                           <div>
                             <div className="flex justify-between items-start mb-2 gap-2">
                               <p className="text-sm font-bold text-slate-900 truncate pr-2">{assign.title}</p>
                               <span className={`px-2 py-0.5 bg-${assign.color}-100 text-${assign.color}-700 rounded text-[10px] font-bold whitespace-nowrap shrink-0`}>
                                 {assign.submitted}/{assign.total} Done
                               </span>
                             </div>
                             <p className="text-xs text-slate-500 mb-4">Due: {assign.due}</p>
                           </div>
                           <button 
                             onClick={() => setReviewingAssignment(assign)}
                             className="w-full py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-white hover:border-indigo-300 transition-all"
                           >
                             Review Submissions
                           </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Chart & Quick Actions */}
                <div className="space-y-6">
                  {/* Chart */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 text-lg mb-4">Class Analytics</h3>
                    <div className="h-56 w-full"><Line data={chartData} options={chartOptions} /></div>
                  </div>

                  {/* Academic Year Progress */}
                  <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                     <h3 className="text-slate-100 font-bold text-sm mb-4">Academic Year Progress</h3>
                     <div className="flex justify-between items-end mb-2">
                       <span className="text-xs text-slate-400">Syllabus Completion</span>
                       <span className="text-lg font-black text-indigo-400">78%</span>
                     </div>
                     <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: '78%' }}
                         transition={{ duration: 1.5, ease: "easeOut" }}
                         className="bg-indigo-500 h-full rounded-full"
                       ></motion.div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. STUDENTS TAB (Full Width Table) */}
          {activeTab === 'students' && (
            <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Student Directory</h2>
                  <p className="text-sm text-slate-500">Manage all {studentsList.length} students in your assigned classes.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={exportPerformanceReport} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
                    <FileDown size={16} /> Export CSV
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 shadow-sm">
                    <Plus size={16} /> Add Student
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Student ID</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Roll No</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Class</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentsList.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-6">
                            <div className="flex items-center gap-3">
                              <img src={student.avatar} className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" alt={student.name} />
                              <div className="font-bold text-slate-900 text-sm whitespace-nowrap">{student.name}</div>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-sm font-medium text-slate-600 whitespace-nowrap">{student.id}</td>
                          <td className="py-3 px-6 text-sm font-medium text-slate-600 whitespace-nowrap">{student.roll}</td>
                          <td className="py-3 px-6 whitespace-nowrap">
                            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">{student.class}</span>
                          </td>
                          <td className="py-3 px-6 text-right whitespace-nowrap">
                            <button 
                              onClick={() => setEditingStudent(student)}
                              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-indigo-600 transition-all hover:bg-indigo-50 hover:border-indigo-200 shadow-sm"
                            >
                              View / Edit Profile
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. ATTENDANCE TAB (Full Width Table) */}
          {activeTab === 'attendance' && (
            <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Daily Attendance</h2>
                  <p className="text-sm text-slate-500">Mark attendance for today: {currentTime.toLocaleDateString()}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold">Class 10-A</button>
                    <button className="flex-1 sm:flex-none px-4 py-1.5 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50">Class 12-B</button>
                  </div>
                  <button 
                    onClick={handleSubmitAttendance}
                    className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 shadow-sm"
                  >
                    Submit Attendance
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-semibold text-slate-600">
                      <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> P = Present</span>
                      <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> A = Absent</span>
                      <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400"></div> L = Late</span>
                   </div>
                   <button onClick={handleMarkAllPresent} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 border border-indigo-200 bg-white px-3 py-1.5 rounded-lg shadow-sm">Mark All Present</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-slate-200">
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Roll No</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Mark Status</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Parent Alert</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentsList.slice(0, 15).map((student) => ( 
                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-6">
                            <div className="flex items-center gap-3">
                              <img src={student.avatar} className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" alt={student.name} />
                              <div className="font-bold text-slate-900 text-sm whitespace-nowrap">{student.name}</div>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-sm font-medium text-slate-600 text-center whitespace-nowrap">{student.roll}</td>
                          <td className="py-3 px-6 text-center whitespace-nowrap">
                            <div className="inline-flex bg-slate-100 rounded-lg p-1 gap-1">
                              {[
                                { key: 'P', color: 'bg-emerald-500 text-white', hover: 'hover:bg-emerald-100 hover:text-emerald-700' },
                                { key: 'A', color: 'bg-red-500 text-white', hover: 'hover:bg-red-100 hover:text-red-700' },
                                { key: 'L', color: 'bg-amber-400 text-white', hover: 'hover:bg-amber-100 hover:text-amber-700' }
                              ].map(status => {
                                const isSelected = attendanceState[student.id] === status.key;
                                return (
                                  <button 
                                    key={status.key} 
                                    onClick={() => handleAttendanceToggle(student.id, status.key)} 
                                    className={`w-8 h-8 rounded-md text-xs font-bold transition-all ${
                                      isSelected ? status.color + ' shadow-sm' : `text-slate-500 ${status.hover}`
                                    }`}
                                  >
                                    {status.key}
                                  </button>
                                )
                              })}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-right whitespace-nowrap">
                            <button className="p-2 bg-white border border-slate-200 text-slate-500 rounded-lg transition-all hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 shadow-sm">
                              <Send size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 4. PERFORMANCE TAB (Full Width Table) */}
          {activeTab === 'performance' && (
            <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Academic Performance</h2>
                  <p className="text-sm text-slate-500">Term 1 Results for Class 10-A</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={exportPerformanceReport} className="flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm flex">
                    <FileDown size={16} /> Export CSV
                  </button>
                  <select className="flex-1 sm:flex-none bg-white border border-slate-200 text-sm rounded-xl px-4 py-2 font-medium text-slate-700 outline-none shadow-sm">
                    <option>Term 1</option>
                    <option>Mid-Term</option>
                    <option>Unit Test 1</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                        <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Physics (100)</th>
                        <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Maths (100)</th>
                        <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">English (100)</th>
                        <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Average</th>
                        <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Grade</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentsList.slice(0,15).map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-6">
                            <div className="flex items-center gap-3">
                              <img src={student.avatar} className="w-9 h-9 rounded-full object-cover shrink-0" alt={student.name} />
                              <div className="font-bold text-slate-900 text-sm whitespace-nowrap">{student.name}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-slate-600 text-center whitespace-nowrap">{student.physics}</td>
                          <td className="py-3 px-4 text-sm font-medium text-slate-600 text-center whitespace-nowrap">{student.maths}</td>
                          <td className="py-3 px-4 text-sm font-medium text-slate-600 text-center whitespace-nowrap">{student.english}</td>
                          <td className="py-3 px-4 text-sm font-black text-slate-900 text-center whitespace-nowrap">{student.avg}%</td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                              student.grade === 'A' ? 'bg-emerald-100 text-emerald-700' : 
                              student.grade === 'B' ? 'bg-amber-100 text-amber-700' : 
                              'bg-red-100 text-red-700'
                            }`}>
                              {student.grade}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-center">
                            {student.trend === 'up' 
                              ? <TrendingUp size={18} className="text-emerald-500 mx-auto" /> 
                              : <TrendingDown size={18} className="text-red-400 mx-auto" />
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 5. ASSIGNMENTS TAB */}
          {activeTab === 'assignments' && (
            <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Assignments</h2>
                  <p className="text-sm text-slate-500">Create and review class assignments.</p>
                </div>
                <button onClick={() => setShowAddAssignment(true)} className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 shadow-sm w-full sm:w-auto">
                  <Plus size={18} /> New Assignment
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assignments.map((assign) => (
                  <div key={assign.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6 gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{assign.title}</h3>
                          <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">
                            <CalendarCheck size={16} className="text-slate-400 shrink-0" /> Due: {assign.due}
                          </p>
                        </div>
                        <span className={`px-2.5 py-1 bg-${assign.color}-100 text-${assign.color}-700 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0`}>
                          {assign.status}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
                        <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${(assign.submitted / assign.total) * 100}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-slate-500 mb-6">
                        <span>{assign.submitted} Submitted</span>
                        <span>{assign.total} Total</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setReviewingAssignment(assign)} className="flex-1 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-bold transition-all hover:bg-indigo-100 shadow-sm">
                        {assign.status === 'Active' ? 'Edit Assignment' : 'Review Submissions'}
                      </button>
                      <button className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. HOMEWORK ANALYZE TAB (NEW FEATURE) */}
          {activeTab === 'homework-analyze' && (
            <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">AI Homework Analysis</h2>
                  <p className="text-sm text-slate-500">Automated insights into student comprehension and learning gaps.</p>
                </div>
              </div>

              {/* Analysis Upload & Status Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Upload Box */}
                <div 
                  onClick={() => document.getElementById('analyze-file-upload')?.click()}
                  className="bg-white rounded-2xl p-6 border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer shadow-sm min-h-[200px] relative"
                >
                  <input 
                    type="file" 
                    id="analyze-file-upload" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,image/*" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAnalyzeFile(e.target.files[0]);
                        setAnalysisComplete(false); // Reset analysis on new file
                      }
                    }}
                  />
                  {analyzeFile ? (
                    <>
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-3">
                        <File size={24} />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-1 truncate max-w-full px-4">{analyzeFile.name}</h3>
                      <p className="text-xs text-emerald-600 font-semibold mt-2">Click to replace file</p>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-3">
                        <Upload size={24} />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">Upload Homework/Notes</h3>
                      <p className="text-xs text-slate-500 max-w-[240px]">Upload student submissions or class notes to generate instant AI insights.</p>
                    </>
                  )}
                </div>

                {/* Analysis Status/Action Box */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center min-h-[200px]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${analysisComplete ? 'bg-indigo-50 text-indigo-600' : isAnalyzing ? 'bg-amber-50 text-amber-600 animate-pulse' : 'bg-emerald-50 text-emerald-600'}`}>
                      <Sparkles size={20} />
                    </div>
                    <h3 className="font-bold text-slate-800">
                      {isAnalyzing ? "Analyzing Document..." : analysisComplete ? "Analysis Complete" : "Analysis Engine Ready"}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-6">
                    {analysisComplete 
                      ? "Insights generated successfully. Review the learning gaps and performance breakdown below." 
                      : "Our AI will scan the uploaded documents to identify common misconceptions, grade distribution, and suggested focus areas."}
                  </p>
                  <button 
                    onClick={() => {
                      if (!analyzeFile) return alert("Please select a file to upload first.");
                      setIsAnalyzing(true);
                      setTimeout(() => {
                        setIsAnalyzing(false);
                        setAnalysisComplete(true);
                      }, 2500); // Simulate network delay for AI processing
                    }}
                    disabled={isAnalyzing || !analyzeFile}
                    className={`w-full py-2.5 ${isAnalyzing || !analyzeFile ? 'bg-slate-200 cursor-not-allowed text-slate-400' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'} rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2`}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> Processing...
                      </>
                    ) : analysisComplete ? (
                      <><CheckCircle2 size={16} /> Re-Analyze Document</>
                    ) : (
                      <><FileSearch size={16} /> Analyze Document</>
                    )}
                  </button>
                </div>
              </div>

              {/* Conditional Results Display */}
              {analysisComplete ? (
                <div className="animate-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-amber-600 mb-2">
                        <div className="p-2 bg-amber-50 rounded-lg"><AlertTriangle size={20} /></div>
                        <h3 className="font-bold text-slate-800 text-sm">Key Learning Gap</h3>
                      </div>
                      <p className="text-xl font-bold text-slate-900">Integration by Parts</p>
                      <p className="text-sm text-slate-500">42% of Class 12-B struggled with Question 4.</p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-emerald-600 mb-2">
                        <div className="p-2 bg-emerald-50 rounded-lg"><Target size={20} /></div>
                        <h3 className="font-bold text-slate-800 text-sm">Top Performing Topic</h3>
                      </div>
                      <p className="text-xl font-bold text-slate-900">Laws of Motion</p>
                      <p className="text-sm text-slate-500">88% average score in recent Class 10-A quiz.</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-indigo-600 mb-2">
                        <div className="p-2 bg-indigo-50 rounded-lg"><Lightbulb size={20} /></div>
                        <h3 className="font-bold text-slate-800 text-sm">Suggested Action</h3>
                      </div>
                      <p className="text-sm font-bold text-slate-900">Review Calculus Formula Sheet</p>
                      <p className="text-xs text-slate-500 mt-1">Recommend assigning the "Calculus Basics" material to 12 students.</p>
                    </div>

                    {/* NEW AI Detection Insight Card */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-purple-600 mb-2">
                        <div className="p-2 bg-purple-50 rounded-lg"><Bot size={20} /></div>
                        <h3 className="font-bold text-slate-800 text-sm">AI Plagiarism Risk</h3>
                      </div>
                      <p className="text-xl font-bold text-slate-900">2 Flags</p>
                      <p className="text-sm text-slate-500">Submissions show &gt;80% probability of AI generation.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                      <h3 className="font-bold text-slate-800">Recent Assignment Breakdown</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {[
                        { title: 'Physics: Chapter 4 Lab', class: 'Class 10-A', accuracy: '76%', issue: 'Graphing velocity-time', color: 'amber', aiRisk: 'Low', aiScore: '12%' },
                        { title: 'Maths: Calculus Basics', class: 'Class 12-B', accuracy: '62%', issue: 'Applying chain rule', color: 'red', aiRisk: 'High', aiScore: '94%' },
                        { title: 'English: Essay Draft', class: 'Class 10-C', accuracy: '89%', issue: 'Thesis statements', color: 'emerald', aiRisk: 'Medium', aiScore: '45%' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-bold text-slate-900">{item.title}</h4>
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">{item.class}</span>
                            </div>
                            <p className="text-sm text-slate-500 flex items-center gap-2">
                              <AlertTriangle size={14} className={`text-${item.color}-500`} />
                              Common Issue: <span className="font-semibold text-slate-700">{item.issue}</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-6">
                            {/* New AI Match Display */}
                            <div className="text-right hidden sm:block">
                              <p className="text-xs text-slate-500 font-semibold uppercase mb-1">AI Match</p>
                              <p className={`text-lg font-black ${item.aiRisk === 'High' ? 'text-red-600' : item.aiRisk === 'Medium' ? 'text-amber-500' : 'text-emerald-500'}`}>{item.aiScore}</p>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Avg Accuracy</p>
                              <p className={`text-lg font-black text-${item.color}-600`}>{item.accuracy}</p>
                            </div>
                            <button className="px-4 py-2 bg-white border border-slate-200 text-sm font-bold text-indigo-600 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 shadow-sm transition-all">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center opacity-60">
                  <FileSearch size={48} className="text-slate-300 mb-4" />
                  <h3 className="text-lg font-bold text-slate-700 mb-2">No Analysis Data Yet</h3>
                  <p className="text-sm text-slate-500 max-w-md">Upload a document and click "Analyze Document" to generate AI-driven insights on student performance and learning gaps.</p>
                </div>
              )}
            </div>
          )}

          {/* 7. MATERIALS TAB */}
          {activeTab === 'materials' && (
            <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Study Materials</h2>
                  <p className="text-sm text-slate-500">Upload and manage resources for your students.</p>
                </div>
              </div>

              {/* Upload Dropzone */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="application/pdf"
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="bg-white rounded-2xl p-10 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center mb-8 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer shadow-sm"
              >
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                  <Upload size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Upload New PDF Material</h3>
                <p className="text-sm text-slate-500">Click to browse or drag and drop files here</p>
              </div>

              {/* Materials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materials.map((file) => (
                  <div key={file.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col group relative">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-500 shrink-0">
                        <File size={24} />
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); removeMaterial(file.id); }} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors shrink-0">
                        <X size={18} />
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1 truncate" title={file.name}>{file.name}</h4>
                    <p className="text-xs font-semibold text-slate-500 mb-4">{file.subject} • {file.size}</p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs text-slate-400 font-medium">{file.date}</span>
                      <button 
                        onClick={() => setViewingMaterial(file)}
                        className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        View File
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div className="max-w-6xl mx-auto h-[calc(100vh-160px)] animate-in fade-in duration-300 flex flex-col">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 shrink-0">Messages</h2>
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 flex overflow-hidden">
                {/* Contacts Sidebar */}
                <div className="w-20 md:w-72 border-r border-slate-200 flex flex-col bg-slate-50 shrink-0 transition-all duration-300">
                   <div className="p-4 border-b border-slate-200 hidden md:block">
                     <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                       <input type="text" placeholder="Search parents..." className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                     </div>
                   </div>
                   <div className="flex-1 overflow-y-auto custom-scrollbar">
                     {initialContacts.map(contact => (
                       <div 
                         key={contact.id}
                         onClick={() => setActiveContactId(contact.id)}
                         className={`p-4 flex justify-center md:justify-start items-center gap-3 cursor-pointer transition-all border-l-4 ${activeContactId === contact.id ? 'bg-white border-indigo-600 shadow-sm' : 'border-transparent hover:bg-slate-100'}`}
                         title={contact.name}
                       >
                         <img src={contact.avatar} className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" alt={contact.name} />
                         <div className="min-w-0 hidden md:block">
                           <p className="font-bold text-slate-900 text-sm truncate">{contact.name}</p>
                           <p className="text-xs text-slate-500 truncate">Parent of {contact.child}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Chat Panel */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden">
                  {/* Chat Header */}
                  <div className="h-16 px-4 md:px-6 border-b border-slate-200 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-slate-900 truncate max-w-[150px] sm:max-w-xs">{initialContacts.find(c=>c.id===activeContactId)?.name}</h3>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md font-medium hidden sm:block">
                        Parent of {initialContacts.find(c=>c.id===activeContactId)?.child}
                      </span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar bg-slate-50/50">
                    {(chatHistory[activeContactId] || []).map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === 'teacher' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] sm:max-w-[70%]`}>
                          <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                            msg.sender === 'teacher' 
                              ? 'bg-indigo-600 text-white rounded-tr-sm' 
                              : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
                          }`}>
                            {msg.text}
                          </div>
                          <p className={`text-[10px] text-slate-400 font-medium mt-1 ${msg.sender === 'teacher' ? 'text-right' : 'text-left'}`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="p-3 md:p-4 border-t border-slate-200 bg-white shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2 md:gap-3 bg-slate-50 rounded-xl p-1.5 md:p-2 border border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                      <button type="button" className="p-2 text-slate-400 hover:text-slate-600 hidden sm:block"><Paperclip size={18} /></button>
                      <input 
                        type="text" 
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type a message..." 
                        className="flex-1 bg-transparent border-none outline-none py-1.5 px-2 text-sm text-slate-800 placeholder-slate-400"
                      />
                      <button 
                        type="submit"
                        disabled={!messageInput.trim()}
                        className="w-8 h-8 md:w-9 md:h-9 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-sm disabled:opacity-50 disabled:bg-slate-300 transition-colors"
                      >
                        <Send size={14} className="md:w-4 md:h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 9. REPORTS TAB */}
          {activeTab === 'reports' && (
            <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Reports & Analytics</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div onClick={() => setActiveTab('performance')} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer">
                  <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <TrendingUp size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Class Performance</h3>
                  <p className="text-sm text-slate-500">View overall class average and trends</p>
                </div>

                <div onClick={() => setActiveTab('students')} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:shadow-md hover:border-amber-300 transition-all cursor-pointer">
                  <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all">
                    <Users size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Individual Reports</h3>
                  <p className="text-sm text-slate-500">Detailed progress for each student</p>
                </div>

                <div onClick={exportPerformanceReport} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:shadow-md hover:border-red-300 transition-all cursor-pointer">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-4 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all">
                    <FileDown size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Export Data</h3>
                  <p className="text-sm text-slate-500">Download attendance & marks as CSV</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}