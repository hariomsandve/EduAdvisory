import { useState } from 'react';
import { 
  Search, BookOpen, GraduationCap, Users, MessageSquare, 
  Star, Filter, CheckCircle2, Clock, ArrowRightLeft,
  Zap, ShieldCheck, UserPlus, ChevronLeft, ShoppingCart,
  UploadCloud, FileText, Download, Tag, X, Send, Gift
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillUser {
  id: string;
  name: string;
  role: string;
  avatar: string;
  teaches: string[];
  learns: string[];
  rating: number;
  reviews: number;
  isOnline?: boolean;
  matchPercentage?: number; 
}

interface ConnectionRequest {
  id: string;
  user: SkillUser;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  timestamp: string;
}

interface NoteItem {
  id: string;
  title: string;
  subject: string;
  authorName: string;
  authorAvatar: string;
  downloads: number;
  rating: number;
  isDownloaded: boolean;
  fileSize: string;
  rewardType?: string;
}

interface ChatMessage {
  id: string;
  senderId: 'me' | string;
  text: string;
  timestamp: string;
}

export default function SkillShare() {
  const [activeTab, setActiveTab] = useState<'discover' | 'requests' | 'matches' | 'notes'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'perfect-match'>('all');

  // Notes Marketplace State
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', subject: '', rewardType: '' });
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  // Chat State
  const [activeChatUser, setActiveChatUser] = useState<SkillUser | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Record<string, ChatMessage[]>>({});

  // Mock Current User Skills
  const mySkills = {
    teaching: ['Java', 'React', 'System Design'],
    learning: ['Python', 'Machine Learning', 'UI/UX']
  };

  const [users, setUsers] = useState<SkillUser[]>([
    {
      id: '1',
      name: 'Aarav Patel',
      role: 'Senior Backend Dev',
      avatar: 'https://picsum.photos/seed/aarav/200/200',
      teaches: ['Python', 'Django', 'AWS'],
      learns: ['Java', 'Spring Boot'],
      rating: 4.9,
      reviews: 124,
      isOnline: true,
      matchPercentage: 95
    },
    {
      id: '2',
      name: 'Sneha Gupta',
      role: 'Product Designer',
      avatar: 'https://picsum.photos/seed/sneha/200/200',
      teaches: ['UI/UX', 'Figma', 'User Research'],
      learns: ['React', 'Frontend Basics'],
      rating: 4.8,
      reviews: 89,
      matchPercentage: 88
    },
    {
      id: '3',
      name: 'Rohan Sharma',
      role: 'Data Scientist',
      avatar: 'https://picsum.photos/seed/rohan/200/200',
      teaches: ['Machine Learning', 'Statistics', 'R'],
      learns: ['System Design', 'Go'],
      rating: 4.7,
      reviews: 56,
      isOnline: true,
      matchPercentage: 75
    },
    {
      id: '4',
      name: 'Priya Singh',
      role: 'Mobile Developer',
      avatar: 'https://picsum.photos/seed/priya/200/200',
      teaches: ['Flutter', 'Dart', 'Firebase'],
      learns: ['Kubernetes', 'Docker'],
      rating: 4.6,
      reviews: 34,
      matchPercentage: 45
    },
    {
      id: '5',
      name: 'Vikram Malhotra',
      role: 'DevOps Engineer',
      avatar: 'https://picsum.photos/seed/vikram/200/200',
      teaches: ['Kubernetes', 'Docker', 'Terraform'],
      learns: ['React', 'Node.js'],
      rating: 4.9,
      reviews: 210,
      isOnline: true,
      matchPercentage: 60
    }
  ]);

  const [requests, setRequests] = useState<ConnectionRequest[]>([
    {
      id: '101',
      user: {
        id: '6',
        name: 'Ishaan Kumar',
        role: 'Frontend Dev',
        avatar: 'https://picsum.photos/seed/ishaan/200/200',
        teaches: ['Vue.js', 'Nuxt'],
        learns: ['Java'],
        rating: 4.5,
        reviews: 12
      },
      status: 'pending',
      message: "Hi! I see you know Java. I can teach you Vue.js in exchange.",
      timestamp: '2 hours ago'
    }
  ]);

  const [connections, setConnections] = useState<SkillUser[]>([]);

  const [notes, setNotes] = useState<NoteItem[]>([
    { id: 'n1', title: 'Complete React & Redux Guide (Handwritten)', subject: 'Web Development', authorName: 'Aarav Patel', authorAvatar: 'https://picsum.photos/seed/aarav/200/200', downloads: 45, rating: 4.8, isDownloaded: false, fileSize: '12 MB' },
    { id: 'n2', title: 'Data Structures in Java - Interview Prep', subject: 'Computer Science', authorName: 'Sneha Gupta', authorAvatar: 'https://picsum.photos/seed/sneha/200/200', downloads: 112, rating: 4.9, isDownloaded: true, fileSize: '8 MB' },
    { id: 'n3', title: 'Machine Learning Math Fundamentals', subject: 'Data Science', authorName: 'Rohan Sharma', authorAvatar: 'https://picsum.photos/seed/rohan/200/200', downloads: 28, rating: 4.6, isDownloaded: false, fileSize: '25 MB' },
    { id: 'n4', title: 'System Design Mock Interviews', subject: 'Engineering', authorName: 'Vikram Malhotra', authorAvatar: 'https://picsum.photos/seed/vikram/200/200', downloads: 89, rating: 4.7, isDownloaded: false, fileSize: '5 MB' },
  ]);

  const handleConnect = (user: SkillUser) => {
    alert(`Request sent to ${user.name}!`);
  };

  const handleAccept = (req: ConnectionRequest) => {
    setConnections([...connections, req.user]);
    setRequests(requests.filter(r => r.id !== req.id));
  };

  const handleReject = (id: string) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  // Notes Marketplace Handlers
  const handleDownloadNote = (id: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, isDownloaded: true, downloads: n.downloads + 1 } : n));
    alert('Download successful! The notes have been added to your library.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleListNote = () => {
    if (!newNote.title || !newNote.rewardType || !uploadedFileName) return;
    
    const newNoteItem: NoteItem = {
      id: Date.now().toString(),
      title: newNote.title,
      subject: newNote.subject || 'General Study',
      authorName: 'John Doe (You)',
      authorAvatar: 'https://picsum.photos/seed/johndoe/200/200',
      downloads: 0,
      rating: 5.0,
      isDownloaded: true, // You own it since you uploaded it
      fileSize: '2.4 MB',
      rewardType: newNote.rewardType
    };
    
    setNotes([newNoteItem, ...notes]);
    
    // Generate a random coupon code for the alert
    const couponCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    alert(`🎉 Notes uploaded successfully!\n\nYou earned a ${newNote.rewardType} Reward Coupon.\nYour Coupon Code: ${couponCode}`);
    
    setNewNote({ title: '', subject: '', rewardType: '' });
    setUploadedFileName('');
    setIsSellModalOpen(false);
  };

  const openChat = (user: SkillUser) => {
    setActiveChatUser(user);
    if (!chatHistory[user.id]) {
      // Add a default greeting if no history exists
      setChatHistory(prev => ({
        ...prev,
        [user.id]: [
          {
            id: Date.now().toString(),
            senderId: user.id,
            text: `Hi! Thanks for connecting. I'd love to learn from you and share my skills.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }));
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim() || !activeChatUser) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => ({
      ...prev,
      [activeChatUser.id]: [...(prev[activeChatUser.id] || []), newMessage]
    }));
    setMessageInput('');
    
    // Simulate an auto-reply after 1.5s
    setTimeout(() => {
      const replyMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: activeChatUser.id,
        text: `That sounds great! When are you usually free to hop on a call?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => ({
        ...prev,
        [activeChatUser.id]: [...(prev[activeChatUser.id] || []), replyMessage]
      }));
    }, 1500);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.teaches.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          user.learns.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedFilter === 'perfect-match') {
      return matchesSearch && (user.matchPercentage || 0) > 80;
    }
    return matchesSearch;
  });

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 relative">
      
      {/* MAIN CONTENT AREA - NO SIDEBAR */}
      <main className="flex-1 p-4 lg:p-8 h-screen flex flex-col overflow-hidden max-w-[1600px] mx-auto w-full">
        
        {/* HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
          <div className="flex items-center gap-4">
             <div className="bg-indigo-600 p-2.5 rounded-xl text-white hidden md:block">
               <ArrowRightLeft size={24}/>
             </div>
             <div>
               <h1 className="text-3xl font-extrabold text-slate-900">Skill Share & Marketplace</h1>
               <p className="text-slate-500 text-sm mt-1">Exchange knowledge, build connections, and share study materials for rewards.</p>
             </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-full text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
              <ChevronLeft size={18} /> Back to Dashboard
            </button>
          </div>
        </div>

        {/* My Skills Banner (Hide when in notes market to save space) */}
        {activeTab !== 'notes' && (
          <div className="flex flex-col md:flex-row gap-4 mb-8 shrink-0">
            <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <BookOpen size={20} />
              </div>
              <div>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider block mb-1">I want to learn</span>
                <div className="font-bold text-slate-800 text-sm">{mySkills.learning.join(', ')}</div>
              </div>
            </div>
            <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <GraduationCap size={20} />
              </div>
              <div>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider block mb-1">I can teach</span>
                <div className="font-bold text-slate-800 text-sm">{mySkills.teaching.join(', ')}</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-6 border-b border-slate-200 px-2 shrink-0 mb-6 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('discover')}
            className={`pb-4 px-2 font-bold text-sm transition-colors relative whitespace-nowrap ${
              activeTab === 'discover' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Discover Peers
            {activeTab === 'discover' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`pb-4 px-2 font-bold text-sm transition-colors relative flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'requests' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Requests 
            {requests.length > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{requests.length}</span>
            )}
            {activeTab === 'requests' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('matches')}
            className={`pb-4 px-2 font-bold text-sm transition-colors relative flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'matches' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            My Matches 
            {connections.length > 0 && (
              <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.5 rounded-full">{connections.length}</span>
            )}
            {activeTab === 'matches' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('notes')}
            className={`pb-4 px-2 font-bold text-sm transition-colors relative flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'notes' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Gift size={16} /> Notes Market
            {activeTab === 'notes' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
          
          {/* DISCOVER PEERS TAB */}
          {activeTab === 'discover' && (
            <div className="space-y-6">
              {/* Search & Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search by name, skill to learn, or skill to teach..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm text-sm font-medium"
                  />
                </div>
                <button 
                  onClick={() => setSelectedFilter(selectedFilter === 'all' ? 'perfect-match' : 'all')}
                  className={`px-5 py-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all text-sm shrink-0 ${
                    selectedFilter === 'perfect-match' 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Zap size={18} className={selectedFilter === 'perfect-match' ? 'fill-indigo-700' : ''} />
                  Perfect Matches Only
                </button>
              </div>

              {/* User Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {filteredUsers.map((user) => (
                    <motion.div 
                      key={user.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-[1.5rem] p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all relative overflow-hidden flex flex-col"
                    >
                      {/* Match Badge */}
                      {(user.matchPercentage || 0) > 80 && (
                        <div className="absolute top-0 right-0 bg-gradient-to-bl from-indigo-500 to-purple-600 text-white text-[10px] font-black px-3 py-1.5 rounded-bl-xl z-10 tracking-wider">
                          {user.matchPercentage}% MATCH
                        </div>
                      )}

                      <div className="flex items-start gap-4 mb-6">
                        <div className="relative">
                          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                          {user.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg leading-tight">{user.name}</h3>
                          <p className="text-slate-500 text-xs font-medium mt-0.5">{user.role}</p>
                          <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold mt-1.5">
                            <Star size={12} className="fill-yellow-500" />
                            {user.rating} <span className="text-slate-400 font-medium">({user.reviews})</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6 flex-1">
                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">
                            <GraduationCap size={14} /> Teaches
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {user.teaches.map(skill => (
                              <span key={skill} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-[11px] font-bold border border-emerald-100">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">
                            <BookOpen size={14} /> Wants to Learn
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {user.learns.map(skill => (
                              <span key={skill} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-[11px] font-bold border border-indigo-100">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleConnect(user)}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 shadow-md"
                      >
                        <UserPlus size={16} /> Connect & Swap
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-20 text-slate-500 bg-white rounded-[2rem] border border-slate-200 border-dashed">
                  <Search size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-bold text-slate-700">No peers found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
          )}

          {/* REQUESTS TAB */}
          {activeTab === 'requests' && (
            <div className="max-w-3xl mx-auto space-y-4">
              <AnimatePresence>
                {requests.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-slate-500 bg-white rounded-[2rem] border border-slate-200 border-dashed">
                    <Users size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-bold text-slate-700">No pending requests</p>
                    <p className="text-sm mt-1">You're all caught up!</p>
                  </motion.div>
                ) : (
                  requests.map((req) => (
                    <motion.div 
                      key={req.id} 
                      layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow"
                    >
                      <img src={req.user.avatar} alt={req.user.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg">{req.user.name}</h3>
                            <p className="text-slate-500 text-xs font-medium">{req.user.role}</p>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                            <Clock size={12} /> {req.timestamp}
                          </span>
                        </div>
                        
                        <div className="mt-3 bg-indigo-50/50 p-4 rounded-xl text-sm text-slate-700 border border-indigo-50 relative">
                          <div className="absolute -left-2 top-4 w-4 h-4 bg-indigo-50/50 border-t border-l border-indigo-50 rotate-45 transform"></div>
                          "{req.message}"
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-black text-emerald-600 uppercase tracking-wider">Teaches:</span> 
                            <span className="font-medium text-slate-700">{req.user.teaches.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-black text-indigo-600 uppercase tracking-wider">Learns:</span> 
                            <span className="font-medium text-slate-700">{req.user.learns.join(', ')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col gap-2 w-full md:w-32 shrink-0">
                        <button 
                          onClick={() => handleAccept(req)}
                          className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleReject(req.id)}
                          className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 hover:text-red-600 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          )}

          {/* MATCHES TAB */}
          {activeTab === 'matches' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connections.length === 0 ? (
                <div className="col-span-full text-center py-20 text-slate-500 bg-white rounded-[2rem] border border-slate-200 border-dashed">
                  <ArrowRightLeft size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-bold text-slate-700">No active connections yet</p>
                  <p className="text-sm mt-1">Start discovering peers to build your network!</p>
                </div>
              ) : (
                connections.map((user) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    key={user.id} 
                    className="bg-white p-5 rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
                  >
                    <div className="relative">
                      <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 leading-tight mb-0.5">{user.name}</h3>
                      <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 size={12}/> Connected
                      </p>
                    </div>
                    <button 
                      onClick={() => openChat(user)}
                      className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                    >
                      <MessageSquare size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* NOTES MARKET TAB */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              {/* Action Bar */}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-2xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search notes by subject, topic, or author..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm text-sm font-medium"
                  />
                </div>
                <button 
                  onClick={() => setIsSellModalOpen(true)}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-md shrink-0"
                >
                  <Gift size={18} /> Share Notes & Earn
                </button>
              </div>

              {/* Notes Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {filteredNotes.map((note) => (
                    <motion.div 
                      key={note.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-[1.5rem] p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden flex flex-col"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                          <FileText size={12}/> {note.subject}
                        </span>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                          <Download size={14} /> {note.downloads}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-lg leading-tight mb-4 flex-1">{note.title}</h3>
                      
                      <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <img src={note.authorAvatar} alt={note.authorName} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Shared by</p>
                          <p className="font-bold text-slate-800 text-sm">{note.authorName}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Access</p>
                          <div className="flex items-center text-sm font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit">
                            Free
                          </div>
                        </div>

                        {note.isDownloaded ? (
                          <button className="px-5 py-2.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-100 transition-colors text-sm">
                            <Download size={16} /> Downloaded
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleDownloadNote(note.id)}
                            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors text-sm shadow-md flex items-center gap-2"
                          >
                            <Download size={16} /> Get PDF
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredNotes.length === 0 && (
                <div className="text-center py-20 text-slate-500 bg-white rounded-[2rem] border border-slate-200 border-dashed">
                  <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-bold text-slate-700">No notes found</p>
                  <p className="text-sm mt-1">Try a different search term.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* SHARE NOTES & EARN REWARD MODAL */}
      <AnimatePresence>
        {isSellModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="text-xl font-black flex items-center gap-2 text-slate-800">
                  <Gift className="text-emerald-600" /> Share & Earn Rewards
                </h2>
                <button onClick={() => setIsSellModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Note Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Complete React Redux Guide"
                    value={newNote.title}
                    onChange={e => setNewNote({...newNote, title: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Subject / Category</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Web Development"
                    value={newNote.subject}
                    onChange={e => setNewNote({...newNote, subject: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Choose Your Reward</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      onClick={() => setNewNote({...newNote, rewardType: 'Amazon'})} 
                      className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${newNote.rewardType === 'Amazon' ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <ShoppingCart size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Amazon</span>
                    </button>
                    <button 
                      onClick={() => setNewNote({...newNote, rewardType: 'Flipkart'})} 
                      className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${newNote.rewardType === 'Flipkart' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <ShoppingCart size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Flipkart</span>
                    </button>
                    <button 
                      onClick={() => setNewNote({...newNote, rewardType: 'Zomato'})} 
                      className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${newNote.rewardType === 'Zomato' ? 'border-red-500 bg-red-50 text-red-700 shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <ShoppingCart size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Zomato</span>
                    </button>
                  </div>
                </div>

                <label htmlFor="note-upload" className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                  <input type="file" id="note-upload" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
                  {uploadedFileName ? (
                    <>
                      <FileText size={32} className="mb-2 text-emerald-500" />
                      <p className="text-sm font-bold text-slate-700">{uploadedFileName}</p>
                      <p className="text-xs text-emerald-600 mt-1">File selected successfully</p>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={32} className="mb-2 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                      <p className="text-sm font-bold text-slate-700">Click to upload PDF</p>
                      <p className="text-xs">Max file size 50MB</p>
                    </>
                  )}
                </label>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <button 
                  onClick={handleListNote}
                  disabled={!newNote.title || !newNote.rewardType || !uploadedFileName}
                  className="w-full py-3.5 bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-black hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <UploadCloud size={18} /> Upload & Claim Reward
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CHAT MODAL */}
      <AnimatePresence>
        {activeChatUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl flex flex-col h-[600px] max-h-[80vh] overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={activeChatUser.avatar} alt={activeChatUser.name} className="w-10 h-10 rounded-full object-cover" />
                    {activeChatUser.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 leading-tight">{activeChatUser.name}</h3>
                    <p className="text-[10px] text-slate-500 font-medium">{activeChatUser.role}</p>
                  </div>
                </div>
                <button onClick={() => setActiveChatUser(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 custom-scrollbar">
                {chatHistory[activeChatUser.id]?.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.senderId === 'me' ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.senderId === 'me' 
                          ? 'bg-indigo-600 text-white rounded-tr-none' 
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 font-medium px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    value={messageInput}
                    onChange={e => setMessageInput(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!messageInput.trim()}
                    className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}