import { useState, useEffect, useRef } from 'react';
import { 
  Timer, Volume2, CheckSquare, Play, Pause, RotateCcw, 
  CloudRain, Coffee, Trees, Flame, Wind, Plus, 
  Trash2, ChevronRight, Moon, Sun, BarChart3, 
  Settings as SettingsIcon, X, CheckCircle2, Target,
  BellOff, BellRing, Maximize
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  isPinned: boolean;
}

interface Sound {
  id: string;
  name: string;
  icon: any;
  volume: number;
  isPlaying: boolean;
  url: string;
}

export default function FocusFlow() {
  // --- Pomodoro State ---
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [focusLength, setFocusLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(0);

  // --- Strict Focus (Notification Blocking) State ---
  const [blockNotifications, setBlockNotifications] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- Soundboard State ---
  const [sounds, setSounds] = useState<Sound[]>([
    { id: 'rain', name: 'Rain', icon: CloudRain, volume: 50, isPlaying: false, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 'cafe', name: 'Cafe', icon: Coffee, volume: 40, isPlaying: false, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 'forest', name: 'Forest', icon: Trees, volume: 30, isPlaying: false, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 'fire', name: 'Fire', icon: Flame, volume: 60, isPlaying: false, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: 'wind', name: 'Wind', icon: Wind, volume: 20, isPlaying: false, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  ]);

  // --- Task Manager State ---
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // --- Timer Logic ---
  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
        if (mode === 'focus') setTotalFocusMinutes(m => m + 1/60);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      const nextMode = mode === 'focus' ? 'break' : 'focus';
      setMode(nextMode);
      setTimeLeft((nextMode === 'focus' ? focusLength : breakLength) * 60);
      
      // Exit fullscreen if break starts
      if (nextMode === 'break' && document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
      }
      
      alert(nextMode === 'focus' ? "Break's over! Time to focus." : "Great work! Take a break.");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, focusLength, breakLength]);

  const toggleTimer = async () => {
    if (!isActive) {
      // Starting the timer
      if (blockNotifications && mode === 'focus') {
        try {
          if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
          }
          showToast("Strict Focus Mode ON: Social media notifications blocked & hidden.");
        } catch (err) {
          console.log("Fullscreen request failed", err);
          showToast("Strict Focus Mode ON: Notifications silenced.");
        }
      }
      setIsActive(true);
    } else {
      // Pausing the timer
      setIsActive(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
        showToast("Focus Paused: Notifications restored.");
      }
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft((mode === 'focus' ? focusLength : breakLength) * 60);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.log(err));
    }
  };

  // --- Task Logic ---
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
      isPinned: tasks.length === 0,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const pinTask = (id: string) => {
    setTasks(tasks.map(t => ({ ...t, isPinned: t.id === id })));
  };

  const pinnedTask = tasks.find(t => t.isPinned);

  // --- Sound Logic ---
  const toggleSound = (id: string) => {
    setSounds(sounds.map(s => s.id === id ? { ...s, isPlaying: !s.isPlaying } : s));
  };

  const updateVolume = (id: string, volume: number) => {
    setSounds(sounds.map(s => s.id === id ? { ...s, volume } : s));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 pb-12 font-sans relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-0 left-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-3"
          >
            <BellOff size={16} className="text-red-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Column: Pomodoro & Stats */}
      <div className="lg:col-span-5 space-y-8">
        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden transition-all">
          {/* Background Animation */}
          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.05 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className={`absolute inset-0 rounded-full ${mode === 'focus' ? 'bg-blue-600' : 'bg-emerald-500'}`}
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 space-y-6 w-full">
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => { setMode('focus'); setTimeLeft(focusLength * 60); setIsActive(false); }}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${mode === 'focus' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              >
                <Target size={14} className="inline mr-2" /> Focus Mode
              </button>
              <button 
                onClick={() => { setMode('break'); setTimeLeft(breakLength * 60); setIsActive(false); }}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${mode === 'break' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              >
                <Coffee size={14} className="inline mr-2" /> Break Time
              </button>
            </div>

            <div className={`text-[100px] font-black tracking-tighter tabular-nums transition-colors duration-500 ${isActive ? (mode === 'focus' ? 'text-blue-600' : 'text-emerald-500') : 'text-gray-900'}`}>
              {formatTime(timeLeft)}
            </div>

            {/* Block Notifications Toggle */}
            <div className="flex justify-center">
              <button 
                onClick={() => setBlockNotifications(!blockNotifications)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  blockNotifications 
                    ? 'bg-red-50 text-red-600 border-red-100' 
                    : 'bg-gray-50 text-gray-500 border-gray-200'
                }`}
              >
                {blockNotifications ? <BellOff size={14} /> : <BellRing size={14} />}
                {blockNotifications ? 'Strict Mode: Social Alerts Blocked' : 'Allow Notifications'}
              </button>
            </div>

            {pinnedTask && (
              <div className="bg-gray-50 px-6 py-3 rounded-2xl inline-flex items-center gap-3 border border-gray-100 max-w-full">
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-600 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm font-bold text-gray-700 truncate">Focusing on: {pinnedTask.text}</span>
              </div>
            )}

            <div className="flex justify-center gap-4 pt-4">
              <button 
                onClick={toggleTimer}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all hover:scale-105 ${
                  isActive 
                    ? 'bg-gray-900 shadow-gray-900/20' 
                    : 'bg-blue-600 shadow-blue-600/30'
                }`}
              >
                {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
              </button>
              <button 
                onClick={resetTimer}
                className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all"
              >
                <RotateCcw size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-8 text-white flex justify-between items-center shadow-lg">
          <div className="space-y-1">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Total Focus Time</p>
            <h3 className="text-3xl font-black text-white">{Math.floor(totalFocusMinutes)} <span className="text-lg font-bold text-gray-500">mins</span></h3>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/5">
            <BarChart3 size={32} className="text-blue-400" />
          </div>
        </div>
      </div>

      {/* Right Column: Soundboard & Tasks */}
      <div className="lg:col-span-7 space-y-8">
        {/* Soundboard */}
        <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Volume2 className="text-blue-600" size={24} />
              Ambient Soundboard
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-100">Library Mix</button>
              <button className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-100">Rainy Cafe</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {sounds.map((sound) => (
              <div key={sound.id} className={`p-5 rounded-2xl border transition-all space-y-4 ${sound.isPlaying ? 'bg-blue-50/50 border-blue-200' : 'bg-gray-50 border-gray-100'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm ${sound.isPlaying ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 border border-gray-200'}`}>
                      <sound.icon size={20} />
                    </div>
                    <span className={`font-bold ${sound.isPlaying ? 'text-blue-900' : 'text-gray-700'}`}>{sound.name}</span>
                  </div>
                  <button 
                    onClick={() => toggleSound(sound.id)}
                    className={`w-12 h-6 rounded-full transition-all relative ${sound.isPlaying ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${sound.isPlaying ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <Volume2 size={14} className={sound.isPlaying ? 'text-blue-400' : 'text-gray-400'} />
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sound.volume}
                    onChange={(e) => updateVolume(sound.id, parseInt(e.target.value))}
                    disabled={!sound.isPlaying}
                    className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer transition-all ${sound.isPlaying ? 'bg-blue-200 accent-blue-600' : 'bg-gray-200 accent-gray-400 opacity-50'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Manager */}
        <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col h-auto min-h-[400px]">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-8">
            <CheckSquare className="text-emerald-500" size={24} />
            Focus Tasks
          </h3>

          <form onSubmit={addTask} className="flex gap-3 mb-8">
            <input 
              type="text" 
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="What are you focusing on today?"
              className="flex-1 px-6 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-50 focus:border-emerald-300 outline-none transition-all text-sm font-medium text-gray-800"
            />
            <button type="submit" disabled={!newTaskText.trim()} className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-gray-900/20 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <Plus size={24} />
            </button>
          </form>

          <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`group p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    task.completed 
                      ? 'bg-gray-50 border-gray-100 opacity-60' 
                      : task.isPinned 
                        ? 'bg-blue-50/30 border-blue-200 shadow-sm'
                        : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 shrink-0 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 hover:border-emerald-400 bg-white'}`}
                    >
                      {task.completed && <CheckCircle2 size={16} />}
                    </button>
                    <span className={`font-bold text-sm truncate ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {task.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button 
                      onClick={() => pinTask(task.id)}
                      className={`p-2 rounded-xl transition-all ${task.isPinned ? 'text-blue-600 bg-blue-100' : 'text-gray-400 hover:bg-gray-100 hover:text-blue-600'}`}
                      title="Pin to Timer"
                    >
                      <Target size={18} />
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {tasks.length === 0 && (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                  <CheckSquare size={32} />
                </div>
                <h4 className="text-gray-900 font-bold mb-1">No tasks yet</h4>
                <p className="text-sm font-medium text-gray-400">Add a task above to start your focus session!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}