import { useState } from 'react';
import {
  User, Mail, MapPin, GraduationCap, BookOpen,
  Edit2, Camera, Target, Briefcase, Award, Star,
  Zap, Trophy, MessageSquare, CheckCircle, 
  Github, Linkedin, Globe, Activity, FileText, Code, Database,
  Terminal, Monitor, Layout, LineChart, Flame, Calendar,
  Flag, Layers, Cpu, GitPullRequest, GitMerge, ExternalLink,
  ChevronRight, Compass, Cloud, List
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserProfileProps {
  userName?: string;
  userEmail?: string;
  userClass?: string;
  userLocation?: string;
}

export default function UserProfile({ userName, userEmail, userClass, userLocation }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'projects' | 'achievements' | 'activity' | 'stats' | 'resume'>('overview');

  const [formData, setFormData] = useState({
    name: userName || 'Prem Gosavi',
    email: userEmail || 'prem.gosavi@example.com',
    phone: '+91 8530988145',
    class: userClass || 'BCA Second Year',
    stream: 'Computer Applications',
    school: 'PVPIT, Savitribai Phule Pune University',
    location: userLocation || 'Pune, Maharashtra, India',
    bio: 'Passionate computer science student and full-stack developer focusing on scalable web applications and artificial intelligence. Excited about crafting clean code, solving complex algorithm problems, and leading open-source initiatives. Actively seeking software engineering internship opportunities to apply theoretical knowledge to real-world impactful products.',
    interests: ['Artificial Intelligence', 'Web Development', 'Data Science', 'UI/UX Design', 'Cloud Computing']
  });

  const activities = [
    { id: 1, type: 'commit', title: 'Pushed 12 commits to "EduAdvisory"', time: '2 hours ago', meta: 'main branch' },
    { id: 2, type: 'learn', title: 'Completed "Advanced Algorithms" Module', time: 'Yesterday', meta: 'Score: 98%' },
    { id: 3, type: 'project', title: 'Deployed Phase 2 of "AI Study Planner" to Vercel', time: '2 days ago', meta: 'Production' },
    { id: 4, type: 'forum', title: 'Answered a question on React Server Components', time: '3 days ago', meta: '+15 XP' },
    { id: 5, type: 'pr', title: 'Merged PR #45 in open-source "TailwindUI"', time: '1 week ago', meta: 'Merged' },
    { id: 6, type: 'achievement', title: 'Earned "Early Bird" Badge', time: '2 weeks ago', meta: 'Global Top 10%' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 font-sans">
      
      {/* Top Profile Banner */}
      <div className="relative h-auto md:h-56 rounded-[3rem] bg-gradient-to-r from-green-800 via-green-600 to-green-500 overflow-hidden shadow-2xl isolate flex items-center">
        {/* Soft Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 gap-2 p-8">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="h-12 bg-white/30 rounded-md rotate-45 transform scale-150" />
            ))}
          </div>
        </div>

        <div className="relative w-full px-8 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-8 z-10 text-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group shrink-0">
              <img
                src="https://picsum.photos/seed/prem2/200/200"
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] border-4 border-white shadow-2xl object-cover bg-white"
                referrerPolicy="no-referrer"
              />
              <button className="absolute -bottom-2 -right-2 p-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-xl border-2 border-green-500">
                <Camera size={18} />
              </button>
            </div>
            
            <div className="text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight drop-shadow-md">{formData.name}</h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold border border-white/20 w-max mx-auto md:mx-0 shadow-sm transition-all hover:bg-white/30 cursor-pointer">
                  <CheckCircle size={14} className="text-green-300" /> Open to Opportunities
                </span>
              </div>
              <p className="text-green-50 font-medium text-sm max-w-xl leading-relaxed">
                {formData.class} • {formData.stream}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-green-100 font-semibold text-[13px]">
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={16} />
                  {formData.school}
                </span>
                <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-green-300" />
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {formData.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 items-center">
            <div className="flex gap-2">
              <button className="p-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all shadow-sm">
                <Github size={18} />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all shadow-sm">
                <Linkedin size={18} />
              </button>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-3 bg-transparent text-white border-2 border-white rounded-xl font-bold text-sm hover:bg-white hover:text-green-700 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              <Edit2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 pt-0">
        
        {/* Left Column - Navigation */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 sticky top-6">
            <div className="space-y-1">
              {[
                { id: 'overview', label: 'About Me', icon: User },
                { id: 'skills', label: 'Tech & Skills', icon: Target },
                { id: 'projects', label: 'Projects', icon: Briefcase },
                { id: 'achievements', label: 'Achievements', icon: Trophy },
                { id: 'activity', label: 'Activity Feed', icon: Activity },
                { id: 'stats', label: 'GitHub Stats', icon: Terminal },
                { id: 'resume', label: 'Resume / CV', icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-bold transition-all text-sm group ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-500 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <span className="flex items-center gap-3.5">
                     <tab.icon size={18} className={activeTab === tab.id ? "text-green-600" : "text-gray-400 group-hover:text-green-600"}/>
                     {tab.label}
                  </span>
                  {activeTab === tab.id && <ChevronRight size={16} className="text-green-600 opacity-50" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Main Content Sections */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            
            {/* 1. ABOUT ME (Overview) */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                
                {/* 1) FIRST LINE: Bio Block (Stable) */}
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                     <User className="text-green-600" size={24} /> Professional Summary
                  </h2>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full p-6 bg-gray-50 border border-gray-200 rounded-2xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none font-medium h-40 resize-none transition-all"
                    />
                  ) : (
                    <p className="text-[1.05rem] text-gray-600 leading-relaxed font-medium">
                      {formData.bio}
                    </p>
                  )}

                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-10 mb-5">Areas of Interest</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { name: 'Artificial Intelligence', icon: Zap },
                      { name: 'Web Development', icon: Monitor },
                      { name: 'Data Science', icon: Database },
                      { name: 'UI/UX Design', icon: Layout },
                      { name: 'Cloud Architecture', icon: Cloud }
                    ].map((interest, i) => (
                      <span key={i} className="px-5 py-3 bg-green-50 text-green-800 rounded-xl text-sm font-bold flex items-center gap-2.5 border border-green-100 hover:scale-105 transition-transform cursor-default">
                        <interest.icon size={18} className="text-green-500" />
                        {interest.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2) SECOND BOX: Recent Activities (Scrolling) */}
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                     <Activity className="text-green-600" size={20} /> Recent Activities
                  </h2>
                  <div className="h-64 overflow-y-auto pr-4 space-y-6 no-scrollbar custom-scrollbar">
                    {activities.map((activity, i) => (
                      <div key={activity.id} className="relative flex gap-6">
                        {i !== activities.length - 1 && (
                          <div className="absolute left-[20px] top-12 bottom-[-24px] w-[2px] bg-gray-100" />
                        )}
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${
                          activity.type === 'commit' || activity.type === 'pr' ? 'bg-gray-50 border-gray-200 text-gray-700' :
                          activity.type === 'project' ? 'bg-green-50 border-green-200 text-green-700' :
                          activity.type === 'forum' ? 'bg-green-50 border-green-200 text-green-700' :
                          activity.type === 'achievement' ? 'bg-yellow-50 border-yellow-200 text-yellow-600' :
                          'bg-emerald-50 border-emerald-200 text-emerald-700'
                        }`}>
                          {activity.type === 'commit' ? <Github size={18} /> :
                           activity.type === 'pr' ? <GitPullRequest size={18} /> :
                           activity.type === 'project' ? <Globe size={18} /> :
                           activity.type === 'forum' ? <MessageSquare size={18} /> :
                           activity.type === 'achievement' ? <Award size={18} /> :
                           <BookOpen size={18} />}
                        </div>
                        <div className="flex-1 pt-0.5 pb-2">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1">
                            <h4 className="font-extrabold text-gray-900 text-[15px]">{activity.title}</h4>
                            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md">{activity.time}</span>
                          </div>
                          <p className="text-[13px] text-gray-500 font-medium mt-1">
                            {activity.type === 'commit' ? 'Pushed updates to repository' : 
                             activity.type === 'pr' ? 'Contributed to open source software' :
                             activity.type === 'achievement' ? 'Awarded new community badge' :
                             'Participated in learning modules'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3) THIRD LINE: Two boxes (Stable) */}
                <div className="grid lg:grid-cols-2 gap-6">
                  
                  {/* Contact & Basics */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 space-y-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                        <Mail className="text-green-600" size={18} /> Contact & Basics
                      </h3>
                      <div className="space-y-5 mt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                            {isEditing ? (
                              <input 
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm font-semibold"
                              />
                            ) : (
                              <p className="font-semibold text-gray-800">{formData.email}</p>
                            )}
                          </div>
                          {!isEditing && (
                            <a href={`mailto:${formData.email}`} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"><ExternalLink size={16}/></a>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                            {isEditing ? (
                              <input 
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-green-500 outline-none text-sm font-semibold"
                              />
                            ) : (
                              <p className="font-semibold text-gray-800">{formData.phone}</p>
                            )}
                          </div>
                          {!isEditing && (
                            <a href={`tel:${formData.phone}`} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"><ExternalLink size={16}/></a>
                          )}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Location / Timezone</p>
                          <p className="font-semibold text-gray-800">{formData.location} (IST)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education Timeline */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                      <BookOpen className="text-green-600" size={18} /> Education Journey
                    </h3>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:ml-[9px] before:w-0.5 before:bg-gradient-to-b before:from-green-200 before:to-gray-100 pl-8 mt-6">
                      <div className="relative">
                        <div className="absolute -left-[39px] bg-green-500 w-4 h-4 rounded-full border-4 border-white shadow-sm ring-2 ring-green-100"></div>
                        <p className="font-bold text-gray-900 mb-0.5">Bachelor of Computer Applications (BCA)</p>
                        <p className="text-sm text-gray-500 font-medium mb-1">PVPIT, SPPU</p>
                        <p className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md w-max">2024 - 2027 (Expected)</p>
                      </div>
                      <div className="relative">
                         <div className="absolute -left-[39px] bg-gray-300 w-4 h-4 rounded-full border-4 border-white shadow-sm ring-2 ring-gray-100"></div>
                        <p className="font-bold text-gray-900 mb-0.5">Higher Secondary</p>
                        <p className="text-sm text-gray-500 font-medium mb-1">Fergusson College</p>
                        <p className="text-xs font-bold text-gray-500">Graduated: 2023 | 92%</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            )}

            {/* 2. SKILLS */}
            {activeTab === 'skills' && (
              <motion.div key="skills" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                
                {/* Languages & Frameworks */}
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <Code className="text-green-600" size={24} /> Languages & Frameworks
                  </h2>
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                    {[
                      { name: 'React.js / Next.js', level: 90 },
                      { name: 'JavaScript / TypeScript', level: 88 },
                      { name: 'Python / Flask', level: 82 },
                      { name: 'C++ / DSA', level: 75 },
                      { name: 'SQL / MongoDB', level: 78 },
                      { name: 'Tailwind CSS', level: 95 }
                    ].map(skill => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-end mb-3">
                          <span className="font-extrabold text-[14px] text-gray-800">{skill.name}</span>
                          <span className="text-xs text-green-700 font-black bg-green-50 px-2.5 py-1 rounded-md border border-green-100">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3 border border-gray-200/50 overflow-hidden">
                          <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full relative" style={{ width: `${skill.level}%` }}>
                             <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Tools & Platforms */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                       <Layers className="text-green-600" size={20} /> Tools & Platforms
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                       {['Git & GitHub', 'Docker', 'AWS (EC2, S3)', 'Vercel', 'Figma', 'Postman', 'Linux / Bash'].map(tool => (
                         <span key={tool} className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-bold hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors cursor-default">
                           {tool}
                         </span>
                       ))}
                    </div>
                  </div>

                  {/* Soft Skills */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                       <Compass className="text-green-600" size={20} /> Soft Skills
                    </h3>
                     <div className="flex flex-wrap gap-2.5">
                       {['Agile Leadership', 'Problem Solving', 'Public Speaking', 'Team Collaboration', 'Technical Writing', 'Mentorship'].map(tool => (
                         <span key={tool} className="px-4 py-2 bg-green-50 border border-transparent text-green-700 rounded-lg text-xs font-bold hover:border-green-200 transition-colors cursor-default">
                           {tool}
                         </span>
                       ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* 3. PROJECTS */}
            {activeTab === 'projects' && (
              <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                
                {/* Featured Project */}
                <div className="bg-white border rounded-[2.5rem] p-8 lg:p-10 shadow-md border-green-200 relative overflow-hidden isolate">
                  <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-sm z-10">
                    Featured
                  </div>
                  <div className="flex flex-col lg:flex-row gap-8 items-center border-b border-gray-100 pb-8 mb-8">
                     <div className="w-full lg:w-1/3 aspect-video bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200 overflow-hidden">
                        <Monitor size={48} className="text-gray-300"/>
                     </div>
                     <div className="flex-1">
                        <h3 className="font-extrabold text-2xl text-gray-900 mb-3">EduAdvisory Portal</h3>
                        <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                          A comprehensive student advisory platform featuring personalized learning paths, scholarship tracking, and AI-driven career recommendations. Designed to scale to 10,000+ concurrently active students.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['React 18', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'OpenAI API'].map(tag => (
                            <span key={tag} className="px-3 py-1.5 border border-green-200 text-green-800 bg-green-50 rounded-lg text-[11px] font-bold">
                              {tag}
                            </span>
                          ))}
                        </div>
                     </div>
                  </div>
                  <div className="flex gap-4">
                      <a href="#" className="flex items-center justify-center gap-2 text-sm font-bold bg-gray-50 text-gray-800 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                        <Github size={18}/> View Source Code
                      </a>
                      <a href="#" className="flex items-center justify-center gap-2 text-sm font-bold bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 transition-all hover:-translate-y-0.5">
                        <Globe size={18}/> Live Deployment
                      </a>
                  </div>
                </div>

                {/* Grid Projects */}
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: 'AI Study Planner', desc: 'Machine learning model predicting optimal study times and recommending dynamically generated quizzes based on past performance.', tags: ['Python', 'TensorFlow', 'Flask'], links: { github: '#' } },
                    { title: 'Campus Navigation App', desc: 'AR-based mobile application to help freshmen navigate complex university campuses easily using GPS.', tags: ['React Native', 'ARKit', 'Firebase'], links: { github: '#' } },
                    { title: 'Real-time Code Collab', desc: 'WebSockets based text editor allowing multiple users to edit the same file seamlessly.', tags: ['Socket.io', 'Express', 'React'], links: { github: '#', live: '#' } },
                    { title: 'Crypto Portfolio Tracker', desc: 'Real-time dashboard using CoinGecko API to track and visualize cryptocurrency investments.', tags: ['Next.js', 'Chart.js', 'Vercel'], links: { github: '#', live: '#' } }
                  ].map((proj, i) => (
                    <div key={i} className="bg-white border rounded-[2rem] p-8 shadow-sm border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-extrabold text-xl text-gray-900 leading-tight pr-4 group-hover:text-green-700 transition-colors">{proj.title}</h3>
                          <a href={proj.links.github} className="text-gray-400 hover:text-gray-700"><ExternalLink size={18}/></a>
                        </div>
                        <p className="text-sm border-b border-gray-100 pb-5 text-gray-500 mb-5 leading-relaxed">{proj.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {proj.tags.map(tag => (
                            <span key={tag} className="px-2.5 py-1 border border-gray-200 text-gray-600 bg-gray-50 rounded-lg text-[11px] font-bold group-hover:border-green-200 group-hover:bg-green-50 group-hover:text-green-700 transition-colors">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 mt-auto">
                        <a href={proj.links.github} className="flex items-center justify-center flex-1 gap-1.5 text-sm font-bold bg-white text-gray-700 py-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors">
                          <Github size={16}/> Code
                        </a>
                        {proj.links.live && (
                          <a href={proj.links.live} className="flex items-center justify-center flex-1 gap-1.5 text-sm font-bold bg-green-50 text-green-700 py-3 rounded-xl border-2 border-green-100 hover:bg-green-100 transition-colors">
                            <Globe size={16}/> Live
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 4. ACHIEVEMENTS */}
            {activeTab === 'achievements' && (
              <motion.div key="achievements" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                
                {/* Highlight Block */}
                <div className="bg-gradient-to-br from-green-800 to-green-600 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden isolate">
                  <div className="absolute top-0 right-0 p-8 opacity-20 -z-10 pointer-events-none">
                     <Trophy size={160} className="translate-x-4 -translate-y-8" />
                  </div>
                  <div className="inline-flex gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-6 backdrop-blur-md items-center">
                    <Star size={14} fill="currentColor" className="text-yellow-300"/> Top Achievement
                  </div>
                  <h2 className="text-3xl font-black mb-3 leading-tight">First Place - Smart India Hackathon</h2>
                  <p className="text-green-100 text-lg max-w-2xl leading-relaxed mb-6 font-medium">
                    Led a team of 4 engineers to design, build, and deploy an AI-powered surveillance drone data dashboard over a continuous 36-hour sprint.
                  </p>
                  <button className="bg-white text-green-800 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors shadow-lg">
                    View Certificate
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: '9.2 CGPA Academic Excellence', desc: 'Maintained top 5% academic standing in the university batch across 4 consecutive semesters.', icon: GraduationCap, color: 'text-emerald-700 bg-emerald-100 border-emerald-200' },
                    { title: 'Top 100 - LeetCode Weekly', desc: 'Ranked 87th globally out of 25,000+ participants in the LeetCode Weekly Contest 300.', icon: Target, color: 'text-green-700 bg-green-100 border-green-300' },
                    { title: 'Open Source Contributor', desc: 'Merged 5 major PRs into popular frontend UI libraries like Shadcn and Framer Motion.', icon: GitMerge, color: 'text-gray-700 bg-gray-100 border-gray-200' },
                    { title: 'AWS Cloud Practitioner', desc: 'Officially certified by Amazon Web Services. Passed with a score of 910/1000.', icon: Cloud, color: 'text-amber-700 bg-amber-100 border-amber-200' }
                  ].map((ach, i) => (
                    <div key={i} className="bg-white border rounded-[2rem] p-6 shadow-sm border-gray-100 flex flex-col items-start gap-5 group hover:border-green-300 hover:shadow-lg transition-all h-full">
                      <div className={`p-4 rounded-xl border shrink-0 group-hover:scale-110 transition-transform ${ach.color}`}>
                        <ach.icon size={26}/>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-lg text-gray-900 mb-2">{ach.title}</h4>
                        <p className="text-[13px] text-gray-500 font-medium leading-relaxed">{ach.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 5. ACTIVITY FEED */}
            {activeTab === 'activity' && (
              <motion.div key="activity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-5">Recent Activity</h2>
                  <div className="space-y-8">
                    {activities.map((activity, i) => (
                      <div key={activity.id} className="relative flex gap-6">
                        {i !== activities.length - 1 && (
                          <div className="absolute left-[23px] top-12 bottom-[-32px] w-[2px] bg-gray-100" />
                        )}
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                          activity.type === 'commit' || activity.type === 'pr' ? 'bg-gray-50 border-gray-200 text-gray-700' :
                          activity.type === 'project' ? 'bg-green-50 border-green-200 text-green-700' :
                          activity.type === 'forum' ? 'bg-green-50 border-green-200 text-green-700' :
                          activity.type === 'achievement' ? 'bg-yellow-50 border-yellow-200 text-yellow-600' :
                          'bg-emerald-50 border-emerald-200 text-emerald-700'
                        }`}>
                          {activity.type === 'commit' ? <Github size={20} /> :
                           activity.type === 'pr' ? <GitPullRequest size={20} /> :
                           activity.type === 'project' ? <Globe size={20} /> :
                           activity.type === 'forum' ? <MessageSquare size={20} /> :
                           activity.type === 'achievement' ? <Award size={20} /> :
                           <BookOpen size={20} />}
                        </div>
                        <div className="flex-1 pt-0.5">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1.5 gap-1">
                            <h4 className="font-extrabold text-gray-900 text-[15px]">{activity.title}</h4>
                            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">{activity.time}</span>
                          </div>
                          <p className="text-[13px] text-gray-500 font-medium mt-1 mb-2">
                            {activity.type === 'commit' ? 'Pushed updates to repository' : 
                             activity.type === 'pr' ? 'Contributed to open source software' :
                             activity.type === 'achievement' ? 'Awarded new community badge' :
                             'Participated in learning modules'}
                          </p>
                          {activity.meta && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 text-gray-600 text-[11px] font-bold rounded-lg border border-gray-200">
                              {activity.meta}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-10 py-3.5 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-colors border border-gray-200 text-sm">
                    Load More Activity
                  </button>
                </div>

                {/* Right Sidebar for feed */}
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                       <Flame className="text-orange-500" size={18}/> Learning Streak
                    </h3>
                    <div className="text-center py-4">
                      <p className="text-5xl font-black text-green-600 mb-1">14<span className="text-xl text-green-400">🔥</span></p>
                      <p className="text-sm font-bold text-gray-500">Day Streak</p>
                      <div className="flex justify-center gap-1 mt-4">
                        {[1, 2, 3, 4, 5, 6, 7].map(day => (
                          <div key={day} className={`w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-bold ${
                            day <= 4 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {['M','T','W','T','F','S','S'][day-1]}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                       <Calendar className="text-blue-500" size={18}/> Upcoming
                    </h3>
                    <div className="space-y-3">
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex flex-col items-center justify-center font-bold leading-tight">
                           <span className="text-[10px] uppercase">Mar</span>
                           <span className="text-sm">24</span>
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-gray-800">Hackathons Meetup</p>
                          <p className="text-[11px] text-gray-400 font-medium">Virtual • 6:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* 6. STATS (Heatmap/GitHub Style) */}
            {activeTab === 'stats' && (
              <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                
                {/* Metrics Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Projects', value: '24', icon: Briefcase },
                    { label: 'DSA Solved', value: '450+', icon: Target },
                    { label: 'Contributions', value: '1.2k', icon: Github },
                    { label: 'Global Rank', value: '87th', icon: Trophy }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm text-center hover:-translate-y-1 transition-transform">
                      <div className="w-10 h-10 mx-auto bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-3 border border-green-100">
                        <stat.icon size={20} />
                      </div>
                      <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Main Grid containing Heatmap and Top Languages */}
                <div className="grid lg:grid-cols-3 gap-6">
                  
                  {/* Heatmap */}
                  <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                         <LineChart className="text-green-500" size={20} /> Contribution Heatmap
                      </h3>
                      <p className="text-xs text-gray-400 font-bold hidden sm:block">1,204 contributions in 365 days</p>
                    </div>
                    
                    <div className="p-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] overflow-x-auto no-scrollbar">
                      <div className="flex gap-1.5 min-w-max">
                        {Array.from({length: 32}).map((_, colIdx) => (
                          <div key={colIdx} className="flex flex-col gap-1.5">
                            {Array.from({length: 7}).map((_, rowIdx) => {
                              const intensity = Math.random();
                              let color = 'bg-gray-200 border-gray-300';
                              if(intensity > 0.85) color = 'bg-green-600 border-green-700'; 
                              else if(intensity > 0.65) color = 'bg-green-500 border-green-600';
                              else if(intensity > 0.4) color = 'bg-green-400 border-green-500';
                              else if(intensity > 0.15) color = 'bg-green-200 border-green-300';
                              
                              return (
                                <div key={rowIdx} className={`w-3.5 h-3.5 rounded-[4px] border ${color} hover:ring-2 hover:ring-gray-400 transition-all cursor-pointer shadow-sm`} title={`${Math.floor(intensity * 10)} contributions`}></div>
                              )
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end items-center gap-2 mt-4 text-[11px] text-gray-500 font-bold">
                      <span>Less</span>
                      <div className="flex gap-1.5">
                        <div className="w-3.5 h-3.5 rounded-[4px] bg-gray-200 border border-gray-300"></div>
                        <div className="w-3.5 h-3.5 rounded-[4px] bg-green-200 border border-green-300"></div>
                        <div className="w-3.5 h-3.5 rounded-[4px] bg-green-400 border border-green-500"></div>
                        <div className="w-3.5 h-3.5 rounded-[4px] bg-green-500 border border-green-600"></div>
                        <div className="w-3.5 h-3.5 rounded-[4px] bg-green-600 border border-green-700"></div>
                      </div>
                      <span>More</span>
                    </div>
                  </div>

                  {/* Top Languages */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                     <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                         <Terminal className="text-gray-500" size={20} /> Top Languages
                      </h3>
                      <div className="space-y-5">
                        {[
                          { name: 'JavaScript', value: 45, color: 'bg-yellow-400' },
                          { name: 'TypeScript', value: 25, color: 'bg-blue-500' },
                          { name: 'Python', value: 20, color: 'bg-blue-400' },
                          { name: 'C++', value: 10, color: 'bg-pink-500' },
                        ].map(lang => (
                          <div key={lang.name}>
                            <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-1.5">
                              <span className="flex items-center gap-1.5">
                                <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`}></span> {lang.name}
                              </span>
                              <span>{lang.value}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                               <div className={`${lang.color} h-1.5 rounded-full`} style={{width: `${lang.value}%`}}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                  </div>

                </div>

              </motion.div>
            )}

            {/* 7. RESUME */}
            {activeTab === 'resume' && (
              <motion.div key="resume" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid lg:grid-cols-5 gap-6">
                
                {/* Main Download Area */}
                <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center relative overflow-hidden isolate">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] -z-10 pointer-events-none">
                     <FileText size={300} className="translate-x-12 -translate-y-12" />
                  </div>

                  <div className="w-24 h-24 bg-green-50 rounded-[2rem] flex items-center justify-center mb-6 border border-green-100 shadow-sm rotate-3 hover:rotate-6 transition-transform">
                    <FileText size={40} className="text-green-600" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">{formData.name} - Resume</h2>
                  <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
                    Download my latest concise resume. Optimized for ATS software, containing full details of my technical experience, education, hackathon wins, and open-source contributions.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button className="px-8 py-4 bg-white border-2 border-green-200 text-green-700 font-extrabold rounded-2xl hover:bg-green-50 hover:border-green-300 transition-all shadow-sm flex items-center justify-center gap-2">
                       View Interactive
                    </button>
                    <button className="px-10 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-extrabold rounded-2xl shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                      <FileText size={18} /> Download PDF (1.2 MB)
                    </button>
                  </div>
                </div>

                {/* Highlights Sidebar */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 space-y-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                     <List size={18} className="text-green-500"/> Key Highlights
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 font-medium">BCA Student matching Top 5% of class batch.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 font-medium">Winner of Smart India Hackathon (SIH).</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 font-medium">Proficient in React, Node.js, and scaling backend SQL architectures.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 font-medium">AWS Cloud Practitioner Certified.</p>
                    </li>
                  </ul>
                  <button className="w-full py-4 mt-4 bg-gray-50 border border-gray-200 text-gray-700 font-bold rounded-2xl text-sm hover:bg-gray-100 transition-colors">
                    Request Full CV
                  </button>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}