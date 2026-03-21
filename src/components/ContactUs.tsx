import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Send, Mail, Phone, Globe, HelpCircle, 
  ChevronDown, ChevronUp, Upload, CheckCircle2, AlertCircle,
  Zap, Headphones, MessageCircle, FileText, ArrowRight,
  GraduationCap, Award
} from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="border-b border-gray-100 last:border-0">
    <button 
      onClick={onClick}
      className="w-full py-5 flex items-center justify-between text-left hover:text-orange-600 transition-colors group"
    >
      <span className={`font-bold text-[15px] ${isOpen ? 'text-orange-700' : 'text-gray-700'}`}>{question}</span>
      {isOpen ? (
        <ChevronUp size={18} className="text-orange-500" />
      ) : (
        <ChevronDown size={18} className="text-gray-400 group-hover:text-orange-500" />
      )}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-sm text-gray-500 leading-relaxed font-medium">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function ContactUs() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    message: '',
    file: null as File | null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'ai', text: 'Hello! I am your AI Career Assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const faqs = [
    { question: "How do I start my career roadmap?", answer: "Go to the 'Career Roadmaps' section in your dashboard, select your field of interest, and our AI will generate a personalized path based on your current skills." },
    { question: "Can I book a 1-on-1 career counseling session?", answer: "Yes! Premium members can schedule sessions through the 'Events & Webinars' tab by selecting 'Book Counselor'." },
    { question: "How does the scholarship tracker work?", answer: "Our system scans thousands of national and international databases daily to match you with scholarships that fit your academic profile and socioeconomic background." },
    { question: "Is my personal data secure?", answer: "We use bank-grade encryption (AES-256) to secure all your academic records and personal information. We never share your data with third parties." }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormState({ ...formState, file: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    
    const newUserMsg = { id: Date.now(), type: 'user', text: chatInput };
    setChatMessages([...chatMessages, newUserMsg]);
    setChatInput('');
    
    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: `I've noted your query about "${newUserMsg.text}". Let me find the best resources for you on that.` 
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 font-sans">
      
      {/* Header Section */}
      <div className="relative rounded-[3rem] bg-gradient-to-br from-orange-900 via-orange-700 to-orange-600 p-12 text-white overflow-hidden shadow-2xl isolate">
        <div className="absolute top-0 right-0 p-12 opacity-10 -z-10 animate-pulse">
           <MessageSquare size={200} />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">We're Here to Guide Your <span className="text-orange-300">Future.</span></h1>
          <p className="text-lg text-orange-50 font-medium leading-relaxed">
            Have questions about your career path, scholarships, or technical issues? Our team of experts and AI assistants are ready to support you 24/7.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-bold shadow-sm">
               <Zap size={16} className="text-yellow-300"/> Instant Response AI Active
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-bold shadow-sm">
               <CheckCircle2 size={16} className="text-orange-300"/> Human Support Available
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* Left Column: Form & Help Cards */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Quick Help Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'tech', label: 'Technical Support', icon: Headphones, color: 'bg-blue-50 text-blue-600' },
              { id: 'career', label: 'Career Counseling', icon: GraduationCap, color: 'bg-orange-50 text-orange-600' },
              { id: 'billing', label: 'Scholarship Help', icon: Award, color: 'bg-yellow-50 text-yellow-600' }
            ].map((card) => (
              <motion.div 
                key={card.id}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <card.icon size={22} />
                </div>
                <h3 className="font-extrabold text-gray-900 text-sm mb-1">{card.label}</h3>
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1 group-hover:text-orange-600 transition-colors">
                  Contact Now <ArrowRight size={10} />
                </p>
              </motion.div>
            ))}
          </div>

          {/* Smart Contact Form */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                 <FileText size={20} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Send a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                  <input 
                    type="text" required
                    placeholder="Enter your name"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none font-bold text-gray-800 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                  <input 
                    type="email" required
                    placeholder="student@example.com"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none font-bold text-gray-800 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Inquiry Category</label>
                <select className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-orange-500 outline-none font-bold text-gray-800 appearance-none transition-all">
                  <option>General Inquiry</option>
                  <option>Career Guidance</option>
                  <option>Scholarship Portal</option>
                  <option>Technical Issue</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Message Detail</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="How can we help you today?"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none font-bold text-gray-800 resize-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Attachments (Optional)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-orange-400 transition-colors relative group">
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center">
                    <Upload size={32} className="text-gray-300 group-hover:text-orange-500 transition-colors mb-2" />
                    <p className="text-sm font-bold text-gray-600">
                      {formState.file ? formState.file.name : 'Click or drop files here to upload'}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 rounded-[1.5rem] font-black text-white text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${
                  submitted ? 'bg-orange-500' : 'bg-orange-700 hover:bg-orange-800 hover:-translate-y-1 shadow-orange-200'
                }`}
              >
                {isSubmitting ? 'Sending Request...' : submitted ? (
                  <><CheckCircle2 size={24} /> Message Sent Successfully!</>
                ) : (
                  <><Send size={24} /> Submit Application</>
                )}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3 tracking-tight">
               <HelpCircle size={24} className="text-orange-600" /> Frequently Asked Questions
            </h2>
            <div className="divide-y divide-gray-100">
              {faqs.map((faq, idx) => (
                <FAQItem 
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === idx}
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Chat & Contact Info */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* AI Chat Assistant Widget */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col h-[500px] overflow-hidden sticky top-10">
             <div className="bg-orange-700 p-6 text-white shrink-0">
                <div className="flex items-center gap-4">
                   <div className="relative">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                         <MessageCircle size={24} />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-400 border-2 border-orange-700 rounded-full"></div>
                   </div>
                   <div>
                      <h4 className="font-extrabold text-sm tracking-tight">AI Assistant</h4>
                      <p className="text-[10px] text-orange-200 font-bold uppercase tracking-widest">Always Online</p>
                   </div>
                </div>
             </div>
             
             <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                {chatMessages.map((msg) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={msg.id} 
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] font-medium shadow-sm leading-relaxed ${
                      msg.type === 'user' 
                        ? 'bg-orange-600 text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-700 rounded-tl-none border border-gray-200/50'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
             </div>

             <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <div className="relative">
                   <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                    placeholder="Ask AI anything..."
                    className="w-full pl-5 pr-12 py-4 bg-white border border-gray-200 rounded-2xl text-[13px] font-bold outline-none focus:border-orange-500 transition-all shadow-sm"
                   />
                   <button 
                    onClick={handleChatSend}
                    className="absolute right-2 top-2 w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center hover:bg-orange-700 transition-colors shadow-md"
                   >
                      <Send size={16} />
                   </button>
                </div>
             </div>
          </div>

          {/* Direct Contact Options */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
             <h3 className="text-xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4 tracking-tight">Connect with Us</h3>
             <div className="space-y-4">
                <a href="mailto:support@eduadvisory.com" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-orange-50 transition-all border border-transparent hover:border-orange-100 group">
                   <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                      <Mail size={18} />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Email Support</p>
                      <p className="text-sm font-extrabold text-gray-800">support@eduadvisory.com</p>
                   </div>
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-orange-50 transition-all border border-transparent hover:border-orange-100 group">
                   <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                      <Phone size={18} />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Direct Call</p>
                      <p className="text-sm font-extrabold text-gray-800">+91 98765 43210</p>
                   </div>
                </a>
                <a href="https://wa.me/919876543210" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-orange-50 transition-all border border-transparent hover:border-orange-100 group">
                   <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                      <MessageSquare size={18} />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">WhatsApp Chat</p>
                      <p className="text-sm font-extrabold text-gray-800">+91 98765 43210</p>
                   </div>
                </a>
             </div>
          </div>

          {/* Social Proof / Trust */}
          <div className="bg-orange-50 rounded-[2rem] p-8 border border-orange-100 text-center space-y-4 shadow-sm">
             <div className="flex justify-center -space-x-4 mb-2">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" alt="Student" />
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-white bg-orange-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">+99</div>
             </div>
             <p className="text-[13px] font-bold text-orange-800 leading-relaxed">
               Joined by 5,000+ students actively shaping their careers.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
}
