import { motion } from 'framer-motion';
import { 
  Search, Filter, Calendar, Award, GraduationCap, 
  Briefcase, CheckCircle2, Clock, AlertCircle, 
  MoreVertical, ArrowRight, ExternalLink, Trash2, 
  FileText, Download, Sparkles, LayoutDashboard
} from 'lucide-react';
import { useState } from 'react';

interface Application {
  id: string;
  name: string;
  type: 'College' | 'Scholarship' | 'Internship';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  dateApplied: string;
  deadline?: string;
  progress: number;
  icon: any;
  color: string;
  institution: string;
}

const applications: Application[] = [
  {
    id: '1',
    name: 'B.Tech in Computer Science',
    type: 'College',
    status: 'Under Review',
    dateApplied: '12 Mar 2026',
    deadline: '30 Apr 2026',
    progress: 65,
    icon: GraduationCap,
    color: 'text-blue-600 bg-blue-50',
    institution: 'IIT Bombay'
  },
  {
    id: '2',
    name: 'Merit-Based Scholarship',
    type: 'Scholarship',
    status: 'Approved',
    dateApplied: '05 Mar 2026',
    deadline: '15 Mar 2026',
    progress: 100,
    icon: Award,
    color: 'text-green-600 bg-green-50',
    institution: 'Ministry of Education'
  },
  {
    id: '3',
    name: 'Frontend Developer Intern',
    type: 'Internship',
    status: 'Pending',
    dateApplied: '18 Mar 2026',
    deadline: '25 Mar 2026',
    progress: 30,
    icon: Briefcase,
    color: 'text-purple-600 bg-purple-50',
    institution: 'TechCorp Solutions'
  },
  {
    id: '4',
    name: 'Maha DBT Scholarship',
    type: 'Scholarship',
    status: 'Rejected',
    dateApplied: '01 Mar 2026',
    deadline: '10 Mar 2026',
    progress: 100,
    icon: Award,
    color: 'text-red-600 bg-red-50',
    institution: 'Government of Maharashtra'
  },
  {
    id: '5',
    name: 'B.Sc in Data Science',
    type: 'College',
    status: 'Pending',
    dateApplied: '20 Mar 2026',
    deadline: '15 May 2026',
    progress: 15,
    icon: GraduationCap,
    color: 'text-orange-600 bg-orange-50',
    institution: 'BITS Pilani'
  }
];

export default function MyApplications() {
  const [activeTab, setActiveTab] = useState<'All' | 'College' | 'Scholarship' | 'Internship'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApplications = applications.filter(app => {
    const matchesTab = activeTab === 'All' || app.type === activeTab;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.institution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'Under Review': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle2 size={14} />;
      case 'Rejected': return <AlertCircle size={14} />;
      case 'Under Review': return <Clock size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <LayoutDashboard className="text-orange-500" size={32} />
            My Applications
          </h1>
          <p className="text-gray-500 mt-1">Manage and track all your active applications in one place.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} />
            Export History
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 transition-all shadow-md shadow-orange-200">
            <Sparkles size={18} />
            New Application
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Applications', value: applications.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Approved', value: applications.filter(a => a.status === 'Approved').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending / Review', value: applications.filter(a => a.status === 'Pending' || a.status === 'Under Review').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Rejected', value: applications.filter(a => a.status === 'Rejected').length, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-2xl font-black text-gray-900">{stat.value}</span>
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm">
        <div className="flex p-1 bg-gray-50 rounded-2xl w-full lg:w-auto overflow-x-auto no-scrollbar">
          {['All', 'College', 'Scholarship', 'Internship'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search applications..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all outline-none"
            />
          </div>
          <button className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Icon & Name */}
                <div className="flex items-center gap-4 lg:w-1/3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${app.color}`}>
                    <app.icon size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{app.name}</h3>
                    <p className="text-sm text-gray-500 font-medium">{app.institution}</p>
                  </div>
                </div>

                {/* Status & Date */}
                <div className="flex flex-wrap items-center gap-6 lg:w-1/3">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    {app.status}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} />
                    <span>Applied: {app.dateApplied}</span>
                  </div>
                </div>

                {/* Progress & Actions */}
                <div className="flex items-center justify-between lg:justify-end gap-8 lg:w-1/3">
                  <div className="flex-1 max-w-[120px]">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      <span>Progress</span>
                      <span>{app.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${app.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full ${app.status === 'Rejected' ? 'bg-red-500' : 'bg-orange-500'}`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all">
                      <ExternalLink size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No applications found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setActiveTab('All'); setSearchQuery(''); }}
              className="mt-6 text-orange-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Helpful Tips Section */}
      <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
            <Sparkles size={40} className="text-orange-300" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Boost your admission chances!</h3>
            <p className="text-indigo-100">Our AI advisor suggests updating your resume and completing the "Communication Skills" course to improve your profile for top-tier colleges.</p>
          </div>
          <button className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-2xl hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105 shadow-lg whitespace-nowrap">
            Get AI Tips
          </button>
        </div>
      </div>
    </div>
  );
}
