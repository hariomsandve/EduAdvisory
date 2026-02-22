import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Search, MapPin, Building2, GraduationCap, Navigation, 
  Phone, Globe, Star, ChevronRight, Layers
} from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icon
const icon = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconShadow = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

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
}

// Component to update map center
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function CollegesNearby() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([18.5204, 73.8567]); // Pune coordinates

  const colleges: College[] = [
    {
      id: 1,
      name: 'College of Engineering Pune (COEP)',
      type: 'Government',
      category: 'Engineering',
      address: 'Wellesley Rd, Shivajinagar, Pune',
      rating: 4.8,
      distance: '2.5 km',
      lat: 18.5293,
      lng: 73.8565,
      image: 'https://picsum.photos/seed/coep/100/100'
    },
    {
      id: 2,
      name: 'Fergusson College',
      type: 'Private',
      category: 'Arts & Science',
      address: 'FC Road, Shivajinagar, Pune',
      rating: 4.6,
      distance: '3.1 km',
      lat: 18.5236,
      lng: 73.8411,
      image: 'https://picsum.photos/seed/fergusson/100/100'
    },
    {
      id: 3,
      name: 'Symbiosis Institute of Technology',
      type: 'Private',
      category: 'Engineering',
      address: 'Lavale, Mulshi, Pune',
      rating: 4.5,
      distance: '12 km',
      lat: 18.5389,
      lng: 73.7357,
      image: 'https://picsum.photos/seed/sit/100/100'
    },
    {
      id: 4,
      name: 'BJ Medical College',
      type: 'Government',
      category: 'Medical',
      address: 'Jai Prakash Narayan Road, Pune',
      rating: 4.7,
      distance: '1.8 km',
      lat: 18.5284,
      lng: 73.8739,
      image: 'https://picsum.photos/seed/bjmc/100/100'
    },
    {
      id: 5,
      name: 'MIT World Peace University',
      type: 'Private',
      category: 'Engineering & Management',
      address: 'Kothrud, Pune',
      rating: 4.4,
      distance: '6.5 km',
      lat: 18.5186,
      lng: 73.8151,
      image: 'https://picsum.photos/seed/mit/100/100'
    }
  ];

  const filteredColleges = colleges.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const governmentColleges = filteredColleges.filter(c => c.type === 'Government');
  const privateColleges = filteredColleges.filter(c => c.type === 'Private');

  const handleCollegeClick = (college: College) => {
    setSelectedCollege(college);
    setMapCenter([college.lat, college.lng]);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
            <MapPin size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Live Map</h1>
            <p className="text-xs text-gray-500">Find top-rated institutes near you</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors text-sm">
          <Layers size={16} />
          Map Layers
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Left Sidebar - Search & Lists */}
        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          {/* Search */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4">Search Location</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="e.g., Pune, Engineering..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* Selected College Details */}
          {selectedCollege ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-bold text-gray-900 text-lg leading-tight">{selectedCollege.name}</h2>
                <button onClick={() => setSelectedCollege(null)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              
              <div className="w-full h-32 rounded-xl overflow-hidden mb-4 relative">
                <img src={selectedCollege.image} alt={selectedCollege.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                  {selectedCollege.category}
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                  <p>{selectedCollege.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-900">{selectedCollege.rating}</span>
                  <span className="text-gray-400">• {selectedCollege.distance} away</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
                  View Courses
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                  <Navigation size={16} /> Navigate
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <MapPin size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Select a College</h3>
              <p className="text-gray-500 text-sm">Click on any college card or map marker to see detailed information.</p>
            </div>
          )}

          {/* Government Colleges List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="text-orange-500" size={20} />
              Government Colleges
            </h2>
            {governmentColleges.length > 0 ? (
              <div className="space-y-3">
                {governmentColleges.map(college => (
                  <div 
                    key={college.id}
                    onClick={() => handleCollegeClick(college)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      selectedCollege?.id === college.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-100 hover:border-orange-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                      <img src={college.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-gray-900 text-sm truncate">{college.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{college.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No colleges found.</p>
            )}
          </div>

          {/* Private Colleges List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap className="text-indigo-600" size={20} />
              Private Colleges
            </h2>
            {privateColleges.length > 0 ? (
              <div className="space-y-3">
                {privateColleges.map(college => (
                  <div 
                    key={college.id}
                    onClick={() => handleCollegeClick(college)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      selectedCollege?.id === college.id 
                        ? 'border-indigo-600 bg-indigo-50' 
                        : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                      <img src={college.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-gray-900 text-sm truncate">{college.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{college.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No colleges found.</p>
            )}
          </div>
        </div>

        {/* Right - Map Area */}
        <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
          {/* Government Map */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative z-0">
            <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm border border-gray-200 font-bold text-xs text-gray-700">
              Government Institutes
            </div>
            <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} className="w-full h-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapUpdater center={mapCenter} />
              {governmentColleges.map(college => (
                <Marker 
                  key={college.id} 
                  position={[college.lat, college.lng]}
                  eventHandlers={{
                    click: () => handleCollegeClick(college),
                  }}
                >
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-bold text-sm">{college.name}</h3>
                      <p className="text-xs text-gray-500">{college.category}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Private Map */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative z-0">
            <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm border border-gray-200 font-bold text-xs text-gray-700">
              Private Institutes
            </div>
            <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} className="w-full h-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapUpdater center={mapCenter} />
              {privateColleges.map(college => (
                <Marker 
                  key={college.id} 
                  position={[college.lat, college.lng]}
                  eventHandlers={{
                    click: () => handleCollegeClick(college),
                  }}
                >
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-bold text-sm">{college.name}</h3>
                      <p className="text-xs text-gray-500">{college.category}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
