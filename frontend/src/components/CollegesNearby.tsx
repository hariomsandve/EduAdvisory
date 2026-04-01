import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MapPin, Building2, GraduationCap, Navigation, 
  Globe, Star, Layers, Volume2, Bot, ExternalLink, Trophy,
  ChevronLeft, Sparkles, Loader2, VolumeX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Declare global Window interface to support dynamic Leaflet loading
declare global {
  interface Window {
    L: any;
  }
}

interface College {
  id: number;
  name: string;
  type: 'Government' | 'Private';
  category: string;
  address: string;
  rating: number;
  distance: string;
  lat: number;
  lng: number;
  image: string;
  description?: string;
  nirfRank?: number;
}

interface MapProps {
  colleges: College[];
  selectedCollege: College | null;
  onMarkerClick: (college: College) => void;
  mapCenter: [number, number];
}

// Custom Map Component that dynamically loads Leaflet to avoid build errors
const LiveMap = ({ colleges, selectedCollege, onMarkerClick, mapCenter }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersLayer = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = () => {
      if (!mapRef.current || mapInstance.current || !window.L) return;
      
      const L = window.L;
      const map = L.map(mapRef.current, { zoomControl: false }).setView(mapCenter, 13);
      mapInstance.current = map;

      // Add a clean, modern map tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Reposition zoom controls
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      markersLayer.current = L.featureGroup().addTo(map);
      renderMarkers();
    };

    // Dynamically load Leaflet CSS and JS if not already present
    if (window.L) {
      initMap();
    } else {
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!document.getElementById('leaflet-js')) {
        const script = document.createElement('script');
        script.id = 'leaflet-js';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        script.onload = () => {
          if (isMounted) initMap();
        };
        document.head.appendChild(script);
      } else {
        const script = document.getElementById('leaflet-js');
        script?.addEventListener('load', initMap);
      }
    }

    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const renderMarkers = () => {
    if (!mapInstance.current || !markersLayer.current || !window.L) return;
    
    const L = window.L;
    markersLayer.current.clearLayers();

    colleges.forEach((college) => {
      const isSelected = selectedCollege?.id === college.id;
      
      const markerHtml = `
        <div style="background-color: ${isSelected ? '#f97316' : '#4f46e5'}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; color: white; transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'}; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
      });

      const marker = L.marker([college.lat, college.lng], { icon: customIcon });
      
      // Add hover popup
      marker.bindPopup(`
        <div style="text-align: center; padding: 4px; min-width: 120px;">
          <h3 style="font-weight: 900; font-size: 13px; margin: 0 0 4px 0; color: #0f172a; line-height: 1.2;">${college.name}</h3>
          <span style="font-size: 10px; font-weight: 800; color: #ea580c; background: #ffedd5; padding: 2px 8px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.5px;">${college.category}</span>
        </div>
      `, { closeButton: false, offset: [0, -10] });

      marker.on('click', () => onMarkerClick(college));
      marker.on('mouseover', function(this: any) { this.openPopup(); });
      marker.on('mouseout', function(this: any) { if (!isSelected) this.closePopup(); });

      markersLayer.current.addLayer(marker);
      
      if (isSelected) {
        marker.openPopup();
      }
    });
  };

  useEffect(() => {
    renderMarkers();
  }, [colleges, selectedCollege]);

  useEffect(() => {
    if (mapInstance.current && window.L && selectedCollege) {
      mapInstance.current.flyTo(mapCenter, 15, { 
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [mapCenter]);

  return <div ref={mapRef} className="w-full h-full z-0 bg-slate-50" />;
};

export default function CollegesNearby() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([18.5204, 73.8567]); // Pune coordinates
  
  // Interactive States
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const apiKey = ""; // Provided by execution environment
  const userApiKey = "AIzaSyDnqav9Rf-6l-7p8s0VDF0ue4wpGKjmj1M"; // Personal key fallback requested by user

  const fetchGeminiInsight = async (college: College) => {
    const prompt = `You are an expert educational counselor. Provide a professional, highly insightful 3-sentence summary of ${college.name} (${college.category}) located in ${college.address}. Highlight its reputation, typical placements, and notable strengths.`;
    
    let retries = 5;
    let delay = 1000;
    let lastError = "Unable to connect to AI.";
    
    // Prioritize the user's provided API key to bypass environment limits
    const activeKey = userApiKey || apiKey;
    
    while (retries > 0) {
      try {
        // Changed to use gemini-1.5-pro (Gemini Pro) as requested
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${activeKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error?.message || `HTTP Error ${response.status}`);
        }
        
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No insights available from the model.";
      } catch (error: any) {
        lastError = error.message;
        retries--;
        if (retries === 0) return `Failed to load AI insights: ${lastError}`;
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
    return lastError;
  };

  // Stop speech when component unmounts or college changes
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setAiInsight(null);
  }, [selectedCollege]);

  const rawColleges: Omit<College, 'description' | 'nirfRank'>[] = [
    // 1. UNIVERSITIES
    { id: 1, name: 'Savitribai Phule Pune University', type: 'Government', category: 'State University', address: 'Ganeshkhind, Pune', rating: 4.7, distance: '4.5 km', lat: 18.5531, lng: 73.8245, image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000' },
    { id: 2, name: 'Bharati Vidyapeeth', type: 'Private', category: 'Deemed University', address: 'LBS Road, Pune', rating: 4.3, distance: '9.2 km', lat: 18.4575, lng: 73.8508, image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000' },
    { id: 26, name: 'College of Engineering Pune (COEP)', type: 'Government', category: 'Engineering', address: 'Shivajinagar, Pune', rating: 4.8, distance: '2.5 km', lat: 18.5293, lng: 73.8565, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000' },
    { id: 41, name: 'Pune Institute of Computer Technology (PICT)', type: 'Private', category: 'Engineering', address: 'Dhankawadi, Pune', rating: 4.7, distance: '8.4 km', lat: 18.4604, lng: 73.8580, image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000' },
    { id: 50, name: 'Armed Forces Medical College (AFMC)', type: 'Government', category: 'Medical', address: 'Wanowrie, Pune', rating: 4.8, distance: '6.2 km', lat: 18.5034, lng: 73.8965, image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000' },
    { id: 54, name: 'Fergusson College', type: 'Private', category: 'Arts & Science', address: 'FC Road, Pune', rating: 4.6, distance: '3.1 km', lat: 18.5236, lng: 73.8411, image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000' },
    { id: 14, name: 'Symbiosis International University', type: 'Private', category: 'Private University', address: 'Lavale, Pune', rating: 4.6, distance: '14.2 km', lat: 18.5492, lng: 73.9261, image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=1000' },
    { id: 60, name: 'National Chemical Laboratory (NCL)', type: 'Government', category: 'Research', address: 'Pashan, Pune', rating: 4.8, distance: '7.2 km', lat: 18.5430, lng: 73.8120, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000' },
    { id: 31, name: 'MKSSS Cummins College of Engineering for Women', type: 'Private', category: 'Autonomous', address: 'Karve Nagar, Pune', rating: 4.6, distance: '7.1 km', lat: 18.4897, lng: 73.8143, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000' },
  ];

  // Enrich data with descriptions and mock NIRF rankings for the detail view
  const colleges: College[] = rawColleges.map((c, index) => ({
    ...c,
    description: `${c.name} is a premier ${c.category.toLowerCase()} institution located in the heart of ${c.address.split(',')[0]}. Known for its state-of-the-art infrastructure, expert faculty, and vibrant campus life, it offers a comprehensive curriculum designed to prepare students for global challenges. The institution boasts strong industry connections and an outstanding placement record.`,
    nirfRank: index % 3 === 0 ? Math.floor(Math.random() * 50) + 1 : undefined
  }));

  const filteredColleges = colleges.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const governmentColleges = filteredColleges.filter(c => c.type === 'Government');
  const privateColleges = filteredColleges.filter(c => c.type === 'Private');

  const handleCollegeClick = (college: College) => {
    setSelectedCollege(college);
    setMapCenter([college.lat, college.lng]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Features Logic
  const handleListen = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    if (selectedCollege?.description) {
      const utterance = new SpeechSynthesisUtterance(selectedCollege.description);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleCourseAI = async () => {
    setIsAILoading(true);
    setAiInsight(null);
    
    if (selectedCollege) {
      const insight = await fetchGeminiInsight(selectedCollege);
      setAiInsight(insight);
    }
    
    setIsAILoading(false);
  };

  const handleNavigate = () => {
    if (selectedCollege) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedCollege.lat},${selectedCollege.lng}`, '_blank');
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 p-4 lg:p-8 bg-[#f8fafc] min-h-screen font-sans text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
            <MapPin size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">College Discovery</h1>
            <p className="text-sm font-medium text-slate-500">Explore, analyze, and navigate to top-rated institutes</p>
          </div>
        </div>
        <button className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-sm font-bold hover:bg-slate-100 transition-all shadow-sm">
          <Layers size={18} />
          Toggle Map Layers
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-10rem)] min-h-[800px]">
        
        {/* Left Panel: Search & Lists OR Detail View */}
        <div className="lg:col-span-4 h-full flex flex-col space-y-4 overflow-hidden relative">
          
          <AnimatePresence mode="wait">
            {!selectedCollege ? (
              <motion.div 
                key="list-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full space-y-4"
              >
                {/* Search */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 shrink-0">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search colleges, categories..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none text-sm font-medium transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  </div>
                </div>

                {/* Lists */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar pb-4">
                  {/* Government */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="font-black text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <Building2 className="text-orange-500" size={18} />
                      Government Institutes
                    </h2>
                    <div className="space-y-3">
                      {governmentColleges.map(college => (
                        <div key={college.id} onClick={() => handleCollegeClick(college)} className="p-3 rounded-xl border border-slate-100 hover:border-orange-300 hover:shadow-md hover:bg-orange-50/30 transition-all cursor-pointer flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                            <img src={college.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="overflow-hidden flex-1">
                            <h3 className="font-bold text-slate-900 text-sm truncate group-hover:text-orange-600 transition-colors">{college.name}</h3>
                            <p className="text-xs font-medium text-slate-500 truncate flex items-center gap-1 mt-0.5">
                              <Star size={12} className="text-amber-400 fill-amber-400" /> {college.rating} • {college.distance}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Private */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="font-black text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <GraduationCap className="text-indigo-600" size={18} />
                      Private Institutes
                    </h2>
                    <div className="space-y-3">
                      {privateColleges.map(college => (
                        <div key={college.id} onClick={() => handleCollegeClick(college)} className="p-3 rounded-xl border border-slate-100 hover:border-indigo-300 hover:shadow-md hover:bg-indigo-50/30 transition-all cursor-pointer flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                            <img src={college.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="overflow-hidden flex-1">
                            <h3 className="font-bold text-slate-900 text-sm truncate group-hover:text-indigo-600 transition-colors">{college.name}</h3>
                            <p className="text-xs font-medium text-slate-500 truncate flex items-center gap-1 mt-0.5">
                              <Star size={12} className="text-amber-400 fill-amber-400" /> {college.rating} • {college.distance}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // HIGH FIDELITY DETAIL VIEW
              <motion.div 
                key="detail-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col h-full bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
              >
                {/* Detail Header / Hero */}
                <div className="relative h-48 shrink-0">
                  <img src={selectedCollege.image} alt={selectedCollege.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                  
                  <button 
                    onClick={() => setSelectedCollege(null)} 
                    className="absolute top-4 left-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {selectedCollege.nirfRank && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-amber-500 text-white rounded-full text-xs font-black tracking-wider flex items-center gap-1.5 shadow-lg">
                      <Trophy size={14} /> NIRF #{selectedCollege.nirfRank}
                    </div>
                  )}

                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="inline-block px-2.5 py-1 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded mb-2">
                      {selectedCollege.category}
                    </div>
                    <h2 className="font-black text-white text-2xl leading-tight drop-shadow-md">{selectedCollege.name}</h2>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600 border-b border-slate-100 pb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><MapPin size={16}/></div>
                      <span>{selectedCollege.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500"><Star size={16} className="fill-amber-500"/></div>
                      <span className="text-slate-900 font-bold">{selectedCollege.rating} Rating</span>
                    </div>
                  </div>

                  {/* Campus Overview */}
                  <div>
                    <h3 className="font-black text-slate-900 text-lg mb-3">Campus Overview</h3>
                    <div className="relative mb-6">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-full"></div>
                      <p className="text-slate-600 text-sm leading-relaxed pl-4">
                        "{selectedCollege.description}"
                      </p>
                    </div>

                    {/* Google Maps Embed */}
                    <h3 className="font-black text-slate-900 text-lg mb-3 flex items-center gap-2">
                      <MapPin size={18} className="text-emerald-500" />
                      Live Location Map
                    </h3>
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 shadow-inner mb-6 relative">
                      <iframe 
                        title={`Map of ${selectedCollege.name}`}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }}
                        src={`https://maps.google.com/maps?q=${selectedCollege.lat},${selectedCollege.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                  {/* AI Insights Module */}
                  <AnimatePresence>
                    {isAILoading && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3">
                        <Loader2 className="animate-spin text-indigo-500" size={20} />
                        <span className="text-sm font-bold text-indigo-700">AI analyzing curriculum & placements...</span>
                      </motion.div>
                    )}
                    {aiInsight && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-5 shadow-lg shadow-indigo-200 text-white relative overflow-hidden">
                        <Bot className="absolute -right-4 -bottom-4 w-24 h-24 text-white opacity-10" />
                        <h4 className="font-black text-sm uppercase tracking-widest text-indigo-200 mb-2 flex items-center gap-2"><Sparkles size={14}/> Gemini AI Insight</h4>
                        <p className="text-sm leading-relaxed text-indigo-50 font-medium relative z-10">{aiInsight}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ACTION SUITE */}
                <div className="p-5 border-t border-slate-100 bg-slate-50 grid grid-cols-2 gap-3 shrink-0">
                  <button 
                    onClick={handleCourseAI}
                    disabled={isAILoading}
                    className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-md transition-all group disabled:opacity-50"
                  >
                    <Bot size={22} className="text-indigo-500 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-700">Gemini Info</span>
                  </button>
                  
                  <button 
                    onClick={handleListen}
                    className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all group ${isSpeaking ? 'bg-blue-50 border-blue-300 shadow-inner' : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md'}`}
                  >
                    {isSpeaking ? (
                      <VolumeX size={22} className="text-blue-600 mb-1 animate-pulse" />
                    ) : (
                      <Volume2 size={22} className="text-blue-500 mb-1 group-hover:scale-110 transition-transform" />
                    )}
                    <span className={`text-xs font-bold ${isSpeaking ? 'text-blue-700' : 'text-slate-700'}`}>{isSpeaking ? 'Stop' : 'Voice Asst'}</span>
                  </button>
                  
                  <button 
                    onClick={handleNavigate}
                    className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-400 hover:shadow-md transition-all group"
                  >
                    <Navigation size={22} className="text-emerald-500 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-700">Navigate</span>
                  </button>
                  
                  <button className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all group">
                    <ExternalLink size={22} className="text-amber-500 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-700">Website</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel: Map Area */}
        <div className="lg:col-span-8 h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative z-0">
          <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="font-bold text-sm text-slate-700">Live Campus Map</span>
          </div>
          
          <LiveMap 
            colleges={filteredColleges} 
            selectedCollege={selectedCollege} 
            onMarkerClick={handleCollegeClick}
            mapCenter={mapCenter}
          />
        </div>
      </div>
      
      {/* Required CSS to make custom scrollbar look nice and fix Leaflet issues */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
          border: 1px solid #e2e8f0;
        }
        .leaflet-popup-tip {
          background: white;
        }
        .custom-div-icon {
          background: transparent;
          border: none;
        }
        /* Fix leaflet z-index to not overlap panels */
        .leaflet-container {
          z-index: 0 !important;
        }
      `}} />
    </div>
  );
}