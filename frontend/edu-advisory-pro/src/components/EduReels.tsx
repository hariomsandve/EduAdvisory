import { useState, useRef, useEffect } from 'react';
import { 
  Heart, MessageCircle, Share2, Bookmark, Music2, 
  UserPlus, Play, Pause, Volume2, VolumeX, 
  GraduationCap, Lightbulb, Brain, Target, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Reel {
  id: string;
  videoUrl: string;
  thumbnail: string;
  creator: {
    name: string;
    avatar: string;
    isFollowing: boolean;
  };
  description: string;
  tags: string[];
  likes: string;
  comments: string;
  shares: string;
  category: 'Science' | 'Tech' | 'Career' | 'Skills';
}

const mockReels: Reel[] = [
  {
    id: '1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1&playlist=dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/seed/reel1/400/700',
    creator: {
      name: 'TechWithTim',
      avatar: 'https://picsum.photos/seed/avatar1/50/50',
      isFollowing: false
    },
    description: 'Quick tip on how to optimize your Python code for better performance! 🐍 #python #coding #tips',
    tags: ['Python', 'Coding', 'Optimization'],
    likes: '12.4k',
    comments: '452',
    shares: '1.2k',
    category: 'Tech'
  },
  {
    id: '2',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1&playlist=dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/seed/reel2/400/700',
    creator: {
      name: 'CareerCoach_Anjali',
      avatar: 'https://picsum.photos/seed/avatar2/50/50',
      isFollowing: true
    },
    description: '3 things you should NEVER say in a job interview. Save this for later! 💼 #career #interview #tips',
    tags: ['Career', 'Interview', 'Success'],
    likes: '45.2k',
    comments: '1.2k',
    shares: '8.5k',
    category: 'Career'
  },
  {
    id: '3',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1&playlist=dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/seed/reel3/400/700',
    creator: {
      name: 'ScienceSimplified',
      avatar: 'https://picsum.photos/seed/avatar3/50/50',
      isFollowing: false
    },
    description: 'Ever wondered why the sky is blue? Here is the physics behind Rayleigh scattering! 🌌 #science #physics #education',
    tags: ['Science', 'Physics', 'Nature'],
    likes: '8.9k',
    comments: '210',
    shares: '540',
    category: 'Science'
  },
  {
    id: '4',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1&playlist=dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/seed/reel4/400/700',
    creator: {
      name: 'DesignMastery',
      avatar: 'https://picsum.photos/seed/avatar4/50/50',
      isFollowing: false
    },
    description: 'Master the 60-30-10 rule in UI design for perfect color balance. 🎨 #uiux #design #tutorial',
    tags: ['Design', 'UIUX', 'Tutorial'],
    likes: '15.7k',
    comments: '320',
    shares: '2.1k',
    category: 'Skills'
  }
];

export default function EduReels() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Science' | 'Tech' | 'Career' | 'Skills'>('All');
  
  const filteredReels = activeCategory === 'All' 
    ? mockReels 
    : mockReels.filter(r => r.category === activeCategory);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
      if (index !== currentReelIndex) {
        setCurrentReelIndex(index);
      }
    }
  };

  const categories = [
    { id: 'All', icon: GraduationCap },
    { id: 'Science', icon: Lightbulb },
    { id: 'Tech', icon: Brain },
    { id: 'Career', icon: Target },
    { id: 'Skills', icon: Music2 },
  ];

  return (
    <div className="max-w-md mx-auto h-[calc(100vh-6rem)] relative bg-black rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-gray-900">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 flex flex-col gap-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold text-xl tracking-tight">EduReels</h2>
          <div className="flex items-center gap-4">
            <Search className="text-white" size={20} />
            <button onClick={() => setIsMuted(!isMuted)} className="text-white">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat.id 
                  ? 'bg-white text-black' 
                  : 'bg-white/20 text-white backdrop-blur-md hover:bg-white/30'
              }`}
            >
              <cat.icon size={14} />
              {cat.id}
            </button>
          ))}
        </div>
      </div>

      {/* Reels Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      >
        {filteredReels.map((reel, index) => (
          <div 
            key={reel.id} 
            className="h-full w-full snap-start relative bg-gray-900"
          >
            {/* Video Placeholder / Embed */}
            <div className="absolute inset-0 flex items-center justify-center">
              {currentReelIndex === index ? (
                <iframe 
                  className="w-full h-full pointer-events-none"
                  src={reel.videoUrl}
                  title="EduReel"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img 
                  src={reel.thumbnail} 
                  alt="Thumbnail" 
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-10">
              <div className="flex flex-col items-center gap-1">
                <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto">
                  <Heart size={24} />
                </button>
                <span className="text-white text-[10px] font-bold">{reel.likes}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto">
                  <MessageCircle size={24} />
                </button>
                <span className="text-white text-[10px] font-bold">{reel.comments}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto">
                  <Share2 size={24} />
                </button>
                <span className="text-white text-[10px] font-bold">{reel.shares}</span>
              </div>
              <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto">
                <Bookmark size={24} />
              </button>
            </div>

            {/* Bottom Info */}
            <div className="absolute left-0 right-16 bottom-0 p-6 space-y-4 z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={reel.creator.avatar} 
                    alt={reel.creator.name} 
                    className="w-10 h-10 rounded-full border-2 border-white"
                    referrerPolicy="no-referrer"
                  />
                  {!reel.creator.isFollowing && (
                    <button className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white border-2 border-black pointer-events-auto">
                      <UserPlus size={10} />
                    </button>
                  )}
                </div>
                <span className="text-white font-bold text-sm">@{reel.creator.name}</span>
                {!reel.creator.isFollowing && (
                  <button className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold rounded-lg border border-white/30 pointer-events-auto">
                    Follow
                  </button>
                )}
              </div>

              <p className="text-white text-xs leading-relaxed line-clamp-2">
                {reel.description}
              </p>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {reel.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold text-white/60">#{tag}</span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-white/40">
                <Music2 size={12} />
                <span className="text-[10px] font-medium">Original Audio - {reel.creator.name}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Play/Pause Overlay */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <Play size={40} fill="white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
