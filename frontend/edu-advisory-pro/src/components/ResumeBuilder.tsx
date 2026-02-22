import { useState, useRef } from 'react';
import { 
  User, Mail, Phone, MapPin, Globe, Plus, Trash2, 
  Download, FileText, Briefcase, GraduationCap, Code, 
  Layout, ChevronDown, ChevronUp, Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
  grade: string;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
      location: 'Pune, India',
      website: 'linkedin.com/in/johndoe',
      summary: 'Passionate software engineer with 2 years of experience in building scalable web applications. Skilled in React, Node.js, and Cloud technologies.'
    },
    education: [
      {
        id: '1',
        school: 'Pune Institute of Computer Technology',
        degree: 'B.E. Computer Engineering',
        year: '2020 - 2024',
        grade: '8.5 CGPA'
      }
    ],
    experience: [
      {
        id: '1',
        company: 'Tech Solutions Inc.',
        role: 'Frontend Developer Intern',
        duration: 'Jan 2023 - Jun 2023',
        description: 'Developed responsive user interfaces using React and Tailwind CSS. Collaborated with the backend team to integrate APIs.'
      }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Git', 'SQL'],
    projects: [
      {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'Built a full-stack e-commerce app with cart and payment gateway integration.',
        link: 'github.com/johndoe/ecommerce'
      }
    ]
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = previewRef.current;
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload to restore event listeners
    }
  };

  const updatePersonal = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now().toString(), school: '', degree: '', year: '', grade: '' }]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Similar handlers for Experience and Projects...
  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now().toString(), company: '', role: '', duration: '', description: '' }]
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: Date.now().toString(), title: '', description: '', link: '' }]
    }));
  };

  const updateProject = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj)
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const updateSkills = (value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: value.split(',').map(s => s.trim())
    }));
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-6rem)] flex gap-6">
      {/* Left Panel - Editor */}
      <div className="w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <FileText className="text-indigo-600" size={20} />
            Resume Editor
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Printer size={16} /> Download PDF
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Personal Details */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <User size={18} /> Personal Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" placeholder="Full Name" 
                value={resumeData.personal.fullName}
                onChange={(e) => updatePersonal('fullName', e.target.value)}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input 
                type="text" placeholder="Job Title" 
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input 
                type="email" placeholder="Email" 
                value={resumeData.personal.email}
                onChange={(e) => updatePersonal('email', e.target.value)}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input 
                type="text" placeholder="Phone" 
                value={resumeData.personal.phone}
                onChange={(e) => updatePersonal('phone', e.target.value)}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input 
                type="text" placeholder="Location" 
                value={resumeData.personal.location}
                onChange={(e) => updatePersonal('location', e.target.value)}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input 
                type="text" placeholder="Website / LinkedIn" 
                value={resumeData.personal.website}
                onChange={(e) => updatePersonal('website', e.target.value)}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <textarea 
                placeholder="Professional Summary" 
                value={resumeData.personal.summary}
                onChange={(e) => updatePersonal('summary', e.target.value)}
                className="col-span-2 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Education */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-700 flex items-center gap-2">
                <GraduationCap size={18} /> Education
              </h3>
              <button onClick={addEducation} className="text-indigo-600 hover:bg-indigo-50 p-1 rounded-full">
                <Plus size={18} />
              </button>
            </div>
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="p-4 bg-gray-50 rounded-xl space-y-3 relative group">
                <button 
                  onClick={() => removeEducation(edu.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="text" placeholder="School / College" 
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    className="p-2 border rounded-lg text-sm"
                  />
                  <input 
                    type="text" placeholder="Degree" 
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="p-2 border rounded-lg text-sm"
                  />
                  <input 
                    type="text" placeholder="Year (e.g. 2020-2024)" 
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                    className="p-2 border rounded-lg text-sm"
                  />
                  <input 
                    type="text" placeholder="Grade / CGPA" 
                    value={edu.grade}
                    onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                    className="p-2 border rounded-lg text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <hr className="border-gray-100" />

          {/* Experience */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-700 flex items-center gap-2">
                <Briefcase size={18} /> Experience
              </h3>
              <button onClick={addExperience} className="text-indigo-600 hover:bg-indigo-50 p-1 rounded-full">
                <Plus size={18} />
              </button>
            </div>
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="p-4 bg-gray-50 rounded-xl space-y-3 relative group">
                <button 
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="text" placeholder="Company" 
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="p-2 border rounded-lg text-sm"
                  />
                  <input 
                    type="text" placeholder="Role" 
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                    className="p-2 border rounded-lg text-sm"
                  />
                  <input 
                    type="text" placeholder="Duration" 
                    value={exp.duration}
                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                    className="col-span-2 p-2 border rounded-lg text-sm"
                  />
                  <textarea 
                    placeholder="Description" 
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    className="col-span-2 p-2 border rounded-lg text-sm h-20 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <hr className="border-gray-100" />

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <Code size={18} /> Skills
            </h3>
            <textarea 
              placeholder="Enter skills separated by commas (e.g. React, Node.js, Python)" 
              value={resumeData.skills.join(', ')}
              onChange={(e) => updateSkills(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
            />
          </div>

          <hr className="border-gray-100" />

          {/* Projects */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-700 flex items-center gap-2">
                <Layout size={18} /> Projects
              </h3>
              <button onClick={addProject} className="text-indigo-600 hover:bg-indigo-50 p-1 rounded-full">
                <Plus size={18} />
              </button>
            </div>
            {resumeData.projects.map((proj) => (
              <div key={proj.id} className="p-4 bg-gray-50 rounded-xl space-y-3 relative group">
                <button 
                  onClick={() => removeProject(proj.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="text" placeholder="Project Title" 
                    value={proj.title}
                    onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                    className="p-2 border rounded-lg text-sm"
                  />
                  <input 
                    type="text" placeholder="Link" 
                    value={proj.link}
                    onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                    className="p-2 border rounded-lg text-sm"
                  />
                  <textarea 
                    placeholder="Description" 
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    className="col-span-2 p-2 border rounded-lg text-sm h-20 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="w-1/2 bg-gray-200 rounded-2xl p-8 overflow-y-auto shadow-inner custom-scrollbar flex justify-center">
        <div 
          ref={previewRef}
          className="bg-white w-[210mm] min-h-[297mm] p-[20mm] shadow-xl text-gray-800 text-sm leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {/* Header */}
          <div className="border-b-2 border-gray-800 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-2">{resumeData.personal.fullName}</h1>
            <div className="flex flex-wrap gap-4 text-gray-600 text-xs font-medium">
              {resumeData.personal.email && (
                <span className="flex items-center gap-1"><Mail size={12} /> {resumeData.personal.email}</span>
              )}
              {resumeData.personal.phone && (
                <span className="flex items-center gap-1"><Phone size={12} /> {resumeData.personal.phone}</span>
              )}
              {resumeData.personal.location && (
                <span className="flex items-center gap-1"><MapPin size={12} /> {resumeData.personal.location}</span>
              )}
              {resumeData.personal.website && (
                <span className="flex items-center gap-1"><Globe size={12} /> {resumeData.personal.website}</span>
              )}
            </div>
            {resumeData.personal.summary && (
              <p className="mt-4 text-gray-600">{resumeData.personal.summary}</p>
            )}
          </div>

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-1 mb-3">Experience</h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-800">{exp.role}</h3>
                      <span className="text-xs text-gray-500 font-medium">{exp.duration}</span>
                    </div>
                    <div className="text-indigo-700 font-medium text-xs mb-1">{exp.company}</div>
                    <p className="text-gray-600 text-xs whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-1 mb-3">Projects</h2>
              <div className="space-y-4">
                {resumeData.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-800">{proj.title}</h3>
                      {proj.link && <span className="text-xs text-indigo-600">{proj.link}</span>}
                    </div>
                    <p className="text-gray-600 text-xs">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-1 mb-3">Education</h2>
              <div className="space-y-3">
                {resumeData.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-800">{edu.school}</h3>
                      <span className="text-xs text-gray-500 font-medium">{edu.year}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-1">
                      <span className="text-gray-700">{edu.degree}</span>
                      <span className="text-gray-600 font-medium">{edu.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-1 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium border border-gray-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
