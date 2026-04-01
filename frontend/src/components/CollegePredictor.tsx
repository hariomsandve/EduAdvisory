import React, { useState } from 'react';
import { 
  GraduationCap,
  Search,
  Award,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MapPin,
  ArrowRight,
  BookOpen,
  X,
  Building,
  IndianRupee,
  Map,
  Info,
  Users,
  Target,
  Phone
} from 'lucide-react';

// --- MOCK DATABASE ---
// Comprehensive list integrating institutions from Pune and Maharashtra Government Colleges
const mockColleges = [
  // --- National Institutes (for flavour) ---
  { id: 1, name: "Indian Institute of Technology (IIT) Bombay", branch: "Computer Science", exam: "JEE Advanced", cutoff: 280, maxMarks: 360, location: "Mumbai", tier: 1 },
  { id: 2, name: "National Institute of Technology (NIT) Trichy", branch: "Mechanical Engineering", exam: "JEE Main", cutoff: 210, maxMarks: 300, location: "Tamil Nadu", tier: 1 },
  { id: 3, name: "Delhi Technological University (DTU)", branch: "Software Engineering", exam: "JEE Main", cutoff: 190, maxMarks: 300, location: "Delhi", tier: 1 },
  
  // --- Pune Educational Institutions (Document 1) ---
  { id: 4, name: "Savitribai Phule Pune University", branch: "Various/General", exam: "State CET", cutoff: 160, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 5, name: "Bharati Vidyapeeth", branch: "Engineering", exam: "State CET", cutoff: 140, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 6, name: "Deccan College Post-Graduate and Research Institute", branch: "Arts/Humanities", exam: "CUET", cutoff: 500, maxMarks: 800, location: "Pune", tier: 2 },
  { id: 7, name: "Defence Institute of Advanced Technology", branch: "Aerospace/Tech", exam: "JEE Main", cutoff: 220, maxMarks: 300, location: "Pune", tier: 1 },
  { id: 8, name: "Dnyaneshwar Vidyapeeth", branch: "General", exam: "State CET", cutoff: 110, maxMarks: 200, location: "Pune", tier: 3 },
  { id: 9, name: "Gokhale Institute of Politics and Economics", branch: "Economics", exam: "CUET", cutoff: 600, maxMarks: 800, location: "Pune", tier: 1 },
  { id: 10, name: "Indian Institute of Information Technology, Pune", branch: "Information Technology", exam: "JEE Main", cutoff: 250, maxMarks: 300, location: "Pune", tier: 1 },
  { id: 11, name: "Indian Institute of Science Education and Research, Pune", branch: "Basic Sciences", exam: "JEE Advanced", cutoff: 180, maxMarks: 360, location: "Pune", tier: 1 },
  { id: 12, name: "Christ University Pune Lavasa Campus", branch: "Commerce/Management", exam: "CUET", cutoff: 550, maxMarks: 800, location: "Pune", tier: 2 },
  { id: 13, name: "National Institute of Construction Management and Research", branch: "Civil/Construction Mgt", exam: "State CET", cutoff: 150, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 14, name: "National Defence Academy", branch: "Defense Studies", exam: "JEE Main", cutoff: 200, maxMarks: 300, location: "Pune", tier: 1 },
  { id: 15, name: "Tilak Maharashtra University", branch: "Arts", exam: "CUET", cutoff: 400, maxMarks: 800, location: "Pune", tier: 3 },
  { id: 16, name: "Spicer Adventist University", branch: "General Arts/Science", exam: "CUET", cutoff: 450, maxMarks: 800, location: "Pune", tier: 3 },
  { id: 17, name: "Symbiosis International University", branch: "Management/Law", exam: "CUET", cutoff: 650, maxMarks: 800, location: "Pune", tier: 1 },
  { id: 18, name: "Ajeenkya DY Patil University", branch: "Engineering", exam: "State CET", cutoff: 130, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 19, name: "Dr. DY Patil Dnyan Prasad University", branch: "Engineering", exam: "State CET", cutoff: 120, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 20, name: "DY Patil University Pune", branch: "Engineering", exam: "State CET", cutoff: 125, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 21, name: "MIT World Peace University", branch: "Computer Science", exam: "State CET", cutoff: 150, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 22, name: "MIT Art, Design and Technology University", branch: "Design/Tech", exam: "CUET", cutoff: 500, maxMarks: 800, location: "Pune", tier: 2 },
  { id: 23, name: "Symbiosis Skills and Professional University", branch: "Skill Tech", exam: "State CET", cutoff: 140, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 24, name: "Vishwakarma University", branch: "Engineering/Mgt", exam: "State CET", cutoff: 135, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 25, name: "G H Raisoni International Skill Tech University", branch: "Tech", exam: "State CET", cutoff: 110, maxMarks: 200, location: "Pune", tier: 3 },
  { id: 26, name: "Indian Institute of Tropical Meteorology, Pune", branch: "Meteorology/Research", exam: "JEE Advanced", cutoff: 200, maxMarks: 360, location: "Pune", tier: 1 },
  { id: 27, name: "College of Agriculture Pune", branch: "Agriculture", exam: "State CET", cutoff: 155, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 28, name: "College of Engineering Pune", branch: "Computer Engineering", exam: "State CET", cutoff: 188, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 29, name: "Govt College Of Engineering And Research, Avasari Khurd", branch: "Mechanical", exam: "State CET", cutoff: 160, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 30, name: "Government Polytechnic Pune", branch: "Diploma/Tech", exam: "State CET", cutoff: 145, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 31, name: "Abeda Inamdar Senior College", branch: "Arts/Science", exam: "CUET", cutoff: 450, maxMarks: 800, location: "Pune", tier: 3 },
  { id: 32, name: "Maharashtra Academy of Engineering", branch: "Information Technology", exam: "State CET", cutoff: 150, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 33, name: "Cummins College of Engineering for Women", branch: "Electronics & TC", exam: "State CET", cutoff: 165, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 34, name: "Pimpri Chinchwad College of Engineering", branch: "Computer Science", exam: "State CET", cutoff: 170, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 35, name: "Vishwakarma Institute of Information Technology", branch: "Information Technology", exam: "State CET", cutoff: 160, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 36, name: "Vishwakarma Institute of Technology", branch: "Computer Science", exam: "State CET", cutoff: 175, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 37, name: "Sanjeevani Group of Institutes", branch: "Engineering", exam: "State CET", cutoff: 120, maxMarks: 200, location: "Pune", tier: 3 },
  { id: 38, name: "AISSMS College of Engineering", branch: "Chemical Engineering", exam: "State CET", cutoff: 140, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 39, name: "AISSMS College of Polytechnic", branch: "Polytechnic", exam: "State CET", cutoff: 110, maxMarks: 200, location: "Pune", tier: 3 },
  { id: 40, name: "Army Institute of Technology", branch: "Computer Engineering", exam: "JEE Main", cutoff: 240, maxMarks: 300, location: "Pune", tier: 1 },
  { id: 41, name: "College of Military Engineering", branch: "Mechanical/Civil", exam: "JEE Main", cutoff: 210, maxMarks: 300, location: "Pune", tier: 1 },
  { id: 42, name: "Dhole Patil College of Engineering", branch: "Engineering", exam: "State CET", cutoff: 115, maxMarks: 200, location: "Pune", tier: 3 },
  { id: 43, name: "Indian Institute of Aeronautical Engineering & IT", branch: "Aeronautics", exam: "JEE Main", cutoff: 190, maxMarks: 300, location: "Pune", tier: 2 },
  { id: 44, name: "International Institute of Information Technology, Pune", branch: "Information Technology", exam: "State CET", cutoff: 155, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 45, name: "ISB&M School of Technology", branch: "Technology/Mgt", exam: "State CET", cutoff: 125, maxMarks: 200, location: "Pune", tier: 3 },
  { id: 46, name: "Jayawantrao Sawant College of Engineering", branch: "Electronics", exam: "State CET", cutoff: 110, maxMarks: 200, location: "Pune", tier: 3 },
  { id: 47, name: "Maharashtra Institute of Technology", branch: "Engineering", exam: "State CET", cutoff: 165, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 48, name: "MIT College of Engineering", branch: "Engineering", exam: "State CET", cutoff: 160, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 49, name: "Modern Education Society's College of Engineering", branch: "Mechanical", exam: "State CET", cutoff: 145, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 50, name: "PES Modern College of Engineering", branch: "Computer Science", exam: "State CET", cutoff: 150, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 51, name: "Pune Institute of Computer Technology", branch: "Computer Engineering", exam: "State CET", cutoff: 182, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 52, name: "PVG's College of Engineering and Technology", branch: "Electrical", exam: "State CET", cutoff: 155, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 53, name: "Shri Chhatrapati Shivajiraje College of Engineering", branch: "Engineering", exam: "State CET", cutoff: 105, maxMarks: 200, location: "Pune", tier: 3 },
  { id: 54, name: "Suman Ramesh Tulsiani Technical Campus", branch: "Engineering", exam: "State CET", cutoff: 100, maxMarks: 200, location: "Pune", tier: 3 },
  { id: 55, name: "Trinity Academy of Engineering", branch: "Civil", exam: "State CET", cutoff: 110, maxMarks: 200, location: "Pune", tier: 3 },
  { id: 56, name: "PUMBA", branch: "MBA", exam: "State CET", cutoff: 185, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 57, name: "Institute of Management Development and Research", branch: "Management", exam: "State CET", cutoff: 160, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 58, name: "MIT School of Business", branch: "Management", exam: "State CET", cutoff: 150, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 59, name: "National Institute of Bank Management", branch: "Banking", exam: "State CET", cutoff: 170, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 60, name: "National Insurance Academy", branch: "Insurance/Mgt", exam: "State CET", cutoff: 165, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 61, name: "Symbiosis Institute of Management Studies", branch: "MBA", exam: "State CET", cutoff: 180, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 62, name: "Vishwakarma Institute of Management", branch: "Management", exam: "State CET", cutoff: 155, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 63, name: "MES Garware College of Commerce", branch: "Commerce", exam: "CUET", cutoff: 550, maxMarks: 800, location: "Pune", tier: 2 },
  { id: 64, name: "Armed Forces Medical College", branch: "MBBS", exam: "NEET", cutoff: 680, maxMarks: 720, location: "Pune", tier: 1 },
  { id: 65, name: "B. J. Medical College", branch: "MBBS", exam: "NEET", cutoff: 650, maxMarks: 720, location: "Pune", tier: 1 },
  { id: 66, name: "Bharati Vidyapeeth Medical College", branch: "MBBS", exam: "NEET", cutoff: 580, maxMarks: 720, location: "Pune", tier: 2 },
  { id: 67, name: "D. Y. Patil Medical College", branch: "MBBS", exam: "NEET", cutoff: 560, maxMarks: 720, location: "Pune", tier: 2 },
  { id: 68, name: "Smt. Kashibai Navale Medical College", branch: "MBBS", exam: "NEET", cutoff: 540, maxMarks: 720, location: "Pune", tier: 2 },
  { id: 69, name: "Maharashtra Institute of Medical Education and Research", branch: "MBBS", exam: "NEET", cutoff: 530, maxMarks: 720, location: "Pune", tier: 2 },
  { id: 70, name: "Fergusson College", branch: "Arts/Science", exam: "CUET", cutoff: 750, maxMarks: 800, location: "Pune", tier: 1 },
  { id: 71, name: "Abasaheb Garware College", branch: "Science", exam: "CUET", cutoff: 600, maxMarks: 800, location: "Pune", tier: 2 },
  { id: 72, name: "Modern College of Arts, Science & Commerce", branch: "Commerce", exam: "CUET", cutoff: 550, maxMarks: 800, location: "Pune", tier: 2 },
  { id: 73, name: "Brihan Maharashtra College of Commerce", branch: "Commerce", exam: "CUET", cutoff: 680, maxMarks: 800, location: "Pune", tier: 1 },
  { id: 74, name: "Tikaram Jagannath College", branch: "Arts", exam: "CUET", cutoff: 450, maxMarks: 800, location: "Pune", tier: 3 },
  { id: 75, name: "AISSMS College of Pharmacy", branch: "Pharmacy", exam: "State CET", cutoff: 160, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 76, name: "Army Law College", branch: "Law", exam: "State CET", cutoff: 140, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 77, name: "College of Pharmacy Pune", branch: "Pharmacy", exam: "State CET", cutoff: 150, maxMarks: 200, location: "Pune", tier: 2 },
  { id: 78, name: "Chandrashekhar Agashe College of Physical Education", branch: "Physical Education", exam: "CUET", cutoff: 400, maxMarks: 800, location: "Pune", tier: 2 },
  { id: 79, name: "Film and Television Institute of India", branch: "Film/Arts", exam: "CUET", cutoff: 600, maxMarks: 800, location: "Pune", tier: 1 },
  { id: 80, name: "ILS Law College", branch: "Law", exam: "State CET", cutoff: 170, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 81, name: "Mahindra United World College", branch: "International Studies", exam: "CUET", cutoff: 650, maxMarks: 800, location: "Pune", tier: 1 },
  { id: 82, name: "MIT Institute of Design", branch: "Design", exam: "CUET", cutoff: 600, maxMarks: 800, location: "Pune", tier: 1 },
  { id: 83, name: "National School of Leadership", branch: "Leadership", exam: "CUET", cutoff: 500, maxMarks: 800, location: "Pune", tier: 2 },
  { id: 84, name: "Ness Wadia College of Commerce", branch: "Commerce", exam: "CUET", cutoff: 620, maxMarks: 800, location: "Pune", tier: 1 },
  { id: 85, name: "Nowrosjee Wadia College", branch: "Arts/Science", exam: "CUET", cutoff: 600, maxMarks: 800, location: "Pune", tier: 2 },
  { id: 86, name: "R. D. College of Pharmacy", branch: "Pharmacy", exam: "State CET", cutoff: 130, maxMarks: 200, location: "Pune", tier: 3 },
  { id: 87, name: "Sir Parshurambhau College", branch: "Arts/Science", exam: "CUET", cutoff: 650, maxMarks: 800, location: "Pune", tier: 1 },
  { id: 88, name: "Sri Shahu Mandir Mahavidyalaya", branch: "General", exam: "CUET", cutoff: 450, maxMarks: 800, location: "Pune", tier: 3 },
  { id: 89, name: "St. Mira's College for Girls", branch: "Arts/Commerce", exam: "CUET", cutoff: 580, maxMarks: 800, location: "Pune", tier: 2 },
  { id: 90, name: "St. Vincent College of Commerce", branch: "Commerce", exam: "CUET", cutoff: 550, maxMarks: 800, location: "Pune", tier: 2 },
  { id: 91, name: "Symbiosis Centre for Management Studies", branch: "Management", exam: "CUET", cutoff: 680, maxMarks: 800, location: "Pune", tier: 1 },
  { id: 92, name: "Symbiosis Institute of Computer Studies & Research", branch: "Computer Applications", exam: "CUET", cutoff: 650, maxMarks: 800, location: "Pune", tier: 1 },
  { id: 93, name: "Symbiosis Law School", branch: "Law", exam: "State CET", cutoff: 180, maxMarks: 200, location: "Pune", tier: 1 },
  { id: 94, name: "Symbiosis School of Economics", branch: "Economics", exam: "CUET", cutoff: 700, maxMarks: 800, location: "Pune", tier: 1 },
  { id: 95, name: "Agharkar Research Institute", branch: "Research/Science", exam: "CUET", cutoff: 650, maxMarks: 800, location: "Pune", tier: 1 },
  { id: 96, name: "Centre for Development of Advanced Computing", branch: "Computing Tech", exam: "JEE Main", cutoff: 200, maxMarks: 300, location: "Pune", tier: 1 },
  { id: 97, name: "Inter-University Centre for Astronomy and Astrophysics", branch: "Astrophysics", exam: "JEE Advanced", cutoff: 190, maxMarks: 360, location: "Pune", tier: 1 },
  { id: 98, name: "National Centre for Cell Science", branch: "Cell Biology", exam: "NEET", cutoff: 600, maxMarks: 720, location: "Pune", tier: 1 },
  { id: 99, name: "National Centre for Radio Astrophysics", branch: "Astrophysics", exam: "JEE Advanced", cutoff: 180, maxMarks: 360, location: "Pune", tier: 1 },
  { id: 100, name: "National Chemical Laboratory", branch: "Chemistry/Research", exam: "JEE Advanced", cutoff: 170, maxMarks: 360, location: "Pune", tier: 1 },
  { id: 101, name: "National Institute of Virology", branch: "Virology", exam: "NEET", cutoff: 620, maxMarks: 720, location: "Pune", tier: 1 },

  // --- Government Colleges Maharashtra (Document 2) ---
  { id: 102, name: "Govt. of Maharashtra's Govt. Science College", branch: "BSc/Science", exam: "CUET", cutoff: 400, maxMarks: 800, location: "Gadchiroli", tier: 3 },
  { id: 103, name: "Govt. of Maharashtra's Govt. College of Education", branch: "B.Ed", exam: "State CET", cutoff: 110, maxMarks: 200, location: "Akola", tier: 2 },
  { id: 104, name: "Shri. Maharani Tarabai Govt. College of Education", branch: "B.Ed", exam: "State CET", cutoff: 120, maxMarks: 200, location: "Kolhapur", tier: 2 },
  { id: 105, name: "Govt. of Maharashtra's Rajaram College", branch: "Arts/Science", exam: "CUET", cutoff: 500, maxMarks: 800, location: "Kolhapur", tier: 2 },
  { id: 106, name: "Govt. of Maharashtra's Institute of Forensic Science", branch: "Forensic Science", exam: "CUET", cutoff: 650, maxMarks: 800, location: "Mumbai", tier: 1 },
  { id: 107, name: "Govt. of Maharashtra's Institute of Science", branch: "Science", exam: "CUET", cutoff: 680, maxMarks: 800, location: "Mumbai", tier: 1 },
  { id: 108, name: "Sydenham Institute of Mgt. & Entrepreneurship Education", branch: "MBA", exam: "State CET", cutoff: 195, maxMarks: 200, location: "Mumbai", tier: 1 },
  { id: 109, name: "Sydenham College of Commerce And Economics", branch: "Commerce", exam: "CUET", cutoff: 720, maxMarks: 800, location: "Mumbai", tier: 1 },
  { id: 110, name: "Govt. of Maharashtra's Govt. Secondary Training College", branch: "B.Ed", exam: "State CET", cutoff: 140, maxMarks: 200, location: "Mumbai", tier: 2 },
  { id: 111, name: "Govt. of Maharashtra's Elphinstone College", branch: "Arts", exam: "CUET", cutoff: 700, maxMarks: 800, location: "Mumbai", tier: 1 },
  { id: 112, name: "Govt. of Maharashtra's Govt. Law College", branch: "Law", exam: "State CET", cutoff: 185, maxMarks: 200, location: "Mumbai", tier: 1 },
  { id: 113, name: "Ismail Yusuf College of Arts, Science & Commerce", branch: "Arts/Science", exam: "CUET", cutoff: 550, maxMarks: 800, location: "Mumbai", tier: 2 },
  { id: 114, name: "Vasantrao Naik Institute of Arts & Social Sciences", branch: "Arts", exam: "CUET", cutoff: 500, maxMarks: 800, location: "Nagpur", tier: 2 },
  { id: 115, name: "Govt. of Maharashtra's Institute of Science", branch: "Science", exam: "CUET", cutoff: 600, maxMarks: 800, location: "Nagpur", tier: 2 },
  { id: 116, name: "Govt. of Maharashtra's Institute of Forensic Science", branch: "Forensic Science", exam: "CUET", cutoff: 620, maxMarks: 800, location: "Nagpur", tier: 1 },
  { id: 117, name: "Govt. Vidarbha Institute of Science & Humanities", branch: "Arts/Science", exam: "CUET", cutoff: 580, maxMarks: 800, location: "Amravati", tier: 2 },
  { id: 118, name: "Govt. of Maharashtra's Govt. College of Education", branch: "B.Ed", exam: "State CET", cutoff: 115, maxMarks: 200, location: "Nanded", tier: 2 },
  { id: 119, name: "Govt. of Maharashtra's Govt. College of Education", branch: "B.Ed", exam: "State CET", cutoff: 105, maxMarks: 200, location: "Parbhani", tier: 3 },
  { id: 120, name: "Govt. of Maharashtra's Govt. College of Education (CTE)", branch: "B.Ed", exam: "State CET", cutoff: 130, maxMarks: 200, location: "Panvel", tier: 2 },
  { id: 121, name: "Govt. of Maharashtra's Govt. College of Education", branch: "B.Ed", exam: "State CET", cutoff: 110, maxMarks: 200, location: "Ratnagiri", tier: 3 },
  { id: 122, name: "Govt. of Maharashtra's Govt. College of Education", branch: "B.Ed", exam: "State CET", cutoff: 125, maxMarks: 200, location: "Aurangabad", tier: 2 },
  { id: 123, name: "Govt. of Maharashtra's Institute of Science", branch: "Science", exam: "CUET", cutoff: 590, maxMarks: 800, location: "Aurangabad", tier: 2 },
  { id: 124, name: "Govt. of Maharashtra's Govt. College of Arts & Science", branch: "Arts/Science", exam: "CUET", cutoff: 560, maxMarks: 800, location: "Aurangabad", tier: 2 },
  { id: 125, name: "Govt. of Maharashtra's Govt. Institute of Forensic Science", branch: "Forensic Science", exam: "CUET", cutoff: 600, maxMarks: 800, location: "Aurangabad", tier: 1 },
  { id: 126, name: "Govt. of Maharashtra's Govt. College of Education", branch: "B.Ed", exam: "State CET", cutoff: 100, maxMarks: 200, location: "Yavatmal", tier: 3 },
  { id: 127, name: "Govt. of Maharashtra's Govt. College of Education", branch: "B.Ed", exam: "State CET", cutoff: 95, maxMarks: 200, location: "Ambajogai", tier: 3 },
  { id: 128, name: "Govt. of Maharashtra's Govt. College of Education", branch: "B.Ed", exam: "State CET", cutoff: 90, maxMarks: 200, location: "Bhandara", tier: 3 },
  { id: 129, name: "Govt. of Maharashtra's Govt. College of Education", branch: "B.Ed", exam: "State CET", cutoff: 105, maxMarks: 200, location: "Buldhana", tier: 3 },
].map(college => {
  // Add dynamically generated mock details for fees, hostel, and branches
  const isGovt = college.name.toLowerCase().includes('govt') || college.name.toLowerCase().includes('government');
  const baseFee = isGovt ? 15000 : (college.tier === 1 ? 150000 : college.tier === 2 ? 90000 : 50000);
  const fees = `₹${(baseFee + (college.id * 100)).toLocaleString()}/year`;
  const hasHostel = college.tier <= 2 || college.id % 2 === 0;
  
  // Calculate mock percentile based on tier and raw cutoff ratio
  const ratio = college.cutoff / college.maxMarks;
  let mockPercentile = 0;
  if (college.tier === 1) mockPercentile = 94 + (ratio * 5.9);
  else if (college.tier === 2) mockPercentile = 80 + (ratio * 14);
  else mockPercentile = 60 + (ratio * 20);
  const cutoffPercentile = parseFloat(Math.min(99.99, mockPercentile).toFixed(2));
  
  let branches = [college.branch];
  if (college.exam.includes('JEE') || (college.exam.includes('CET') && college.branch.includes('Engineering'))) {
    branches.push(...["Computer Science", "Mechanical Engineering", "Electronics & Communication"].filter(b => b !== college.branch));
  } else if (college.exam.includes('NEET')) {
    branches.push(...["BDS", "BAMS", "Nursing"].filter(b => b !== college.branch));
  } else {
    branches.push(...["General Sciences", "Humanities", "Commerce", "Management"].filter(b => b !== college.branch));
  }

  // --- COMPREHENSIVE DETAILED INFO GENERATOR ---
  const yearEst = 1940 + (college.id % 70);
  const type = isGovt ? "Government Institution" : (college.tier === 1 ? "Autonomous / Deemed University" : "Private Affiliated College");
  const university = college.location === "Pune" ? "Savitribai Phule Pune University" :
                     college.location === "Mumbai" ? "Mumbai University" :
                     (college.location === "Nagpur" || college.location === "Bhandara" || college.location === "Gadchiroli") ? "Rashtrasant Tukadoji Maharaj Nagpur University" :
                     "State University";
  const approvedBy = college.exam === "NEET" ? "NMC (National Medical Commission)" :
                     college.exam === "State CET" && college.branch === "B.Ed" ? "NCTE (National Council for Teacher Education)" :
                     "AICTE & UGC";
  const accreditation = college.tier === 1 ? "NAAC A++ Grade (CGPA 3.8)" : (college.tier === 2 ? "NAAC A Grade (CGPA 3.1)" : "NAAC B Grade (CGPA 2.7)");
  const campusArea = college.tier === 1 ? `${50 + (college.id % 150)} acres` : (college.tier === 2 ? `${10 + (college.id % 40)} acres` : `${2 + (college.id % 5)} acres`);
  const facultyCount = college.tier === 1 ? 150 + (college.id % 50) : 40 + (college.id % 30);
  const intake = college.tier === 1 ? 120 : 60;
  const phone = `+91 20 2${college.id.toString().padStart(6, '0')}`;
  const addressStr = `${college.name},\nMain Campus Road, ${college.location} - 44${college.id.toString().padStart(4, '0')},\nMaharashtra, India`;

  const facilities = [
    "Library with educational books & e-resources",
    "Computer and science laboratories",
    "ICT resource center",
    "Multipurpose hall for seminars/events",
    "Playground and sports facilities",
    "Indoor games",
    hasHostel ? "Hostel (especially for outstation students)" : "No internal hostel facility",
    "Canteen & cafeteria",
    "Parking area and health/first-aid facility"
  ];

  return { 
    ...college, 
    fees, 
    hasHostel, 
    availableBranches: branches, 
    cutoffPercentile,
    details: {
      established: yearEst,
      type,
      managedBy: isGovt ? "Government of Maharashtra" : "Private Educational Trust",
      affiliatedTo: university,
      approvedBy,
      accreditation,
      campusArea,
      intake,
      facultyCount,
      address: addressStr,
      phone,
      facilities
    }
  };
});

export default function CollegePredictorFeature() {
  const [exam, setExam] = useState('');
  const [percentile, setPercentile] = useState('');
  const [hasPredicted, setHasPredicted] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const handlePredict = (e) => {
    e.preventDefault();
    if (!exam || !percentile) return;

    const userPercentile = parseFloat(percentile);
    
    // Filter and analyze colleges based on exam and percentile
    const predictions = mockColleges
      .filter(college => college.exam === exam)
      .map(college => {
        const difference = userPercentile - college.cutoffPercentile;
        let chance = 'Low';
        let chanceColor = 'text-red-600';
        let chanceBg = 'bg-red-50';
        let chanceIcon = XCircle;

        if (difference >= 1.5) {
          chance = 'High (Safe)';
          chanceColor = 'text-green-600';
          chanceBg = 'bg-green-50';
          chanceIcon = CheckCircle2;
        } else if (difference >= -2 && difference < 1.5) {
          chance = 'Medium (Borderline)';
          chanceColor = 'text-yellow-600';
          chanceBg = 'bg-yellow-50';
          chanceIcon = AlertCircle;
        }

        return { ...college, chance, chanceColor, chanceBg, chanceIcon, difference };
      })
      // Sort: highest chance first, then by highest cutoff
      .sort((a, b) => {
        if (b.difference !== a.difference) {
           return b.difference - a.difference;
        }
        return b.cutoffPercentile - a.cutoffPercentile;
      });

    setResults(predictions);
    setHasPredicted(true);
  };

  const resetPredictor = () => {
    setHasPredicted(false);
    setPercentile('');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-slate-800 flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
          <div className="bg-orange-100 p-3 rounded-2xl">
            <GraduationCap className="text-orange-500" size={40} />
          </div>
          Comprehensive College Predictor
        </h1>
        <p className="text-slate-500 mt-4 text-lg max-w-3xl mx-auto md:mx-0">
          Enter your academic scores to discover which colleges you are most likely to get into across Maharashtra and India. Supports Medical, Engineering, Arts, Science, and Education institutes.
        </p>
      </div>

      {!hasPredicted ? (
        /* INPUT FORM STATE */
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-12 md:flex gap-12 items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-200 blur-[80px] rounded-full opacity-30"></div>
                <img 
                  src="https://illustrations.popsy.co/amber/student-going-to-school.svg" 
                  alt="Student Illustration" 
                  className="w-full max-w-md mx-auto relative z-10"
                  onError={(e) => e.target.style.display='none'}
                />
              </div>
            </div>
            
            <div className="md:w-1/2">
              <form onSubmit={handlePredict} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <BookOpen size={16} className="text-orange-500"/>
                    Select Your Entrance Exam
                  </label>
                  <select 
                    value={exam} 
                    onChange={(e) => setExam(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all bg-slate-50 text-slate-700 font-medium"
                    required
                  >
                    <option value="" disabled>Choose exam...</option>
                    <option value="JEE Main">JEE Main - Engineering</option>
                    <option value="JEE Advanced">JEE Advanced - Premium Tech/Science</option>
                    <option value="State CET">State CET - Engg/Pharm/Law/Ed</option>
                    <option value="NEET">NEET - Medical</option>
                    <option value="CUET">CUET - Arts/Science/Commerce</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Enter Your Percentile</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      step="0.01"
                      min="0"
                      max="100"
                      value={percentile}
                      onChange={(e) => setPercentile(e.target.value)}
                      placeholder="e.g. 95.5"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all bg-slate-50 text-slate-700 pl-11 font-bold text-lg"
                      required
                    />
                    <Award className="absolute left-3.5 top-4 text-slate-400" size={22} />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 text-lg transform hover:-translate-y-0.5"
                >
                  <Search size={22} />
                  Find My Colleges
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* RESULTS STATE */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Your Results Profile</p>
              <h2 className="text-3xl font-extrabold text-slate-800">
                {exam} <span className="text-orange-500 bg-orange-50 px-3 py-1 rounded-lg ml-2">{percentile}%ile</span>
              </h2>
              <p className="text-slate-500 mt-2 font-medium flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-green-500"/> Found {results.length} colleges matching this exam.
              </p>
            </div>
            <button 
              onClick={resetPredictor}
              className="text-orange-600 hover:text-white hover:bg-orange-500 font-bold text-sm flex items-center gap-2 bg-orange-50 px-5 py-2.5 rounded-xl transition-all border border-orange-100 hover:border-orange-500"
            >
               Change Details <ArrowRight size={16} />
            </button>
          </div>

          {results.length === 0 ? (
            <div className="bg-white p-16 text-center rounded-3xl border border-slate-200 shadow-sm">
              <AlertCircle className="mx-auto text-slate-300 mb-5" size={64} />
              <h3 className="text-2xl font-bold text-slate-700">No Data Available</h3>
              <p className="text-slate-500 mt-3 max-w-md mx-auto">We don't have historical cutoff data for this specific exam configuration yet. Please try another exam.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((college) => {
                const ChanceIcon = college.chanceIcon;
                return (
                  <div 
                    key={college.id} 
                    onClick={() => setSelectedCollege(college)}
                    className="cursor-pointer bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10 transition-all flex flex-col overflow-hidden group transform hover:-translate-y-1"
                  >
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide ${college.chanceBg} ${college.chanceColor}`}>
                          <ChanceIcon size={14} />
                          {college.chance}
                        </div>
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                          Tier {college.tier}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-800 leading-tight mb-2 group-hover:text-orange-600 transition-colors">{college.name}</h3>
                      <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mb-5 bg-slate-50 inline-flex px-2.5 py-1 rounded-lg">
                        <MapPin size={14} className="text-slate-400"/> {college.location}
                      </p>
                      
                      <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                        <p className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                           <BookOpen size={16} className="text-slate-400"/> {college.branch}
                        </p>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200 border-dashed">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Last Cutoff</p>
                            <p className="text-xl font-black text-slate-800">{college.cutoffPercentile} <span className="text-xs text-slate-400 font-semibold">%ile</span></p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Your Percentile</p>
                            <p className={`text-xl font-black ${college.difference >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {percentile} <span className="text-xs font-semibold">%ile</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* COLLEGE DETAILS MODAL */}
      {selectedCollege && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedCollege(null)}
          ></div>
          <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6 border-b border-slate-100 bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-sm">Tier {selectedCollege.tier}</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${selectedCollege.chanceBg} ${selectedCollege.chanceColor}`}>
                    {selectedCollege.chance} Chance
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 leading-tight pr-8">{selectedCollege.name}</h3>
                <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-2">
                  <MapPin size={16} className="text-orange-500"/> {selectedCollege.location}
                </p>
              </div>
              <button 
                onClick={() => setSelectedCollege(null)}
                className="p-2 bg-white hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors border border-slate-200 absolute top-6 right-6 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content - Scrollable Detailed View */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-10 flex-1">
              
              {/* Fee & Chance Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 flex items-start gap-4">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm border border-orange-100 text-orange-500">
                    <IndianRupee size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-orange-600/70 uppercase tracking-wider mb-1">Estimated Fees</p>
                    <p className="text-lg font-extrabold text-slate-800">{selectedCollege.fees}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm border border-blue-100 text-blue-500">
                    <Building size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-600/70 uppercase tracking-wider mb-1">Campus Type</p>
                    <p className="text-lg font-extrabold text-slate-800">
                      {selectedCollege.details.type}
                    </p>
                  </div>
                </div>
              </div>

              {/* 1. Basic Information */}
              <div>
                <h4 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                  <Info size={20} className="text-slate-400"/> 1. Basic Information
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm text-slate-600">
                  <li><span className="font-semibold text-slate-800 inline-block w-32">Established:</span> {selectedCollege.details.established}</li>
                  <li><span className="font-semibold text-slate-800 inline-block w-32">Type:</span> {selectedCollege.details.type}</li>
                  <li><span className="font-semibold text-slate-800 inline-block w-32">Managed by:</span> {selectedCollege.details.managedBy}</li>
                  <li><span className="font-semibold text-slate-800 inline-block w-32">Affiliated to:</span> {selectedCollege.details.affiliatedTo}</li>
                  <li><span className="font-semibold text-slate-800 inline-block w-32">Approved by:</span> {selectedCollege.details.approvedBy}</li>
                  <li><span className="font-semibold text-slate-800 inline-block w-32">Accreditation:</span> {selectedCollege.details.accreditation}</li>
                  <li><span className="font-semibold text-slate-800 inline-block w-32">Campus Area:</span> {selectedCollege.details.campusArea}</li>
                </ul>
              </div>

              {/* 2. Courses Offered */}
              <div>
                <h4 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-slate-400"/> 2. Courses Offered
                </h4>
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <h5 className="font-bold text-slate-800 mb-2">Regular Courses</h5>
                    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                      {selectedCollege.availableBranches.map((branch, idx) => (
                        <li key={idx}>
                          Bachelors in {branch} (Intake: ~{selectedCollege.details.intake} students per year)
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <h5 className="font-bold text-slate-800 mb-2">Distance / Other Programs</h5>
                    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                      <li>Post-Graduate programs (Distance Mode)</li>
                      <li>Diploma/short programs in related domains</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3. Campus Facilities */}
              <div>
                <h4 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                  <Building size={20} className="text-slate-400"/> 3. Campus Facilities
                </h4>
                <p className="text-sm text-slate-600 mb-3">The college provides basic facilities for students:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedCollege.details.facilities.map((fac, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                      {fac}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Faculty and Staff */}
              <div>
                <h4 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                  <Users size={20} className="text-slate-400"/> 4. Faculty and Staff
                </h4>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
                  <li>Principal + teaching faculty (around {selectedCollege.details.facultyCount} teachers)</li>
                  <li>Many senior teachers hold Ph.D. in their respective domains</li>
                  <li>Dedicated non-teaching and administrative support staff</li>
                </ul>
              </div>

              {/* 5. Vision and Objective */}
              <div>
                <h4 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                  <Target size={20} className="text-slate-400"/> 5. Vision and Objective
                </h4>
                <p className="text-sm text-slate-600 mb-2">The college aims to:</p>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
                  <li>Train highly qualified professionals and leaders for society.</li>
                  <li>Develop strong practical skills and advanced theoretical pedagogy.</li>
                  <li>Encourage active educational research, innovation, and community work.</li>
                </ul>
              </div>

              {/* 6. Address & Contact + Map */}
              <div>
                <h4 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                  <Phone size={20} className="text-slate-400"/> 6. Address & Contact
                </h4>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 space-y-4">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Address</span>
                      <p className="text-sm text-slate-700 font-medium whitespace-pre-line leading-relaxed">
                        {selectedCollege.details.address}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone</span>
                      <p className="text-sm text-slate-700 font-medium">
                        {selectedCollege.details.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 bg-slate-100 rounded-2xl overflow-hidden h-64 border border-slate-200 relative shadow-inner">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      style={{ border: 0 }}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedCollege.name + " " + selectedCollege.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      allowFullScreen
                      title={`${selectedCollege.name} Map`}
                    ></iframe>
                  </div>
                </div>
              </div>
              
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex justify-end">
              <button 
                onClick={() => setSelectedCollege(null)}
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-all shadow-md"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}