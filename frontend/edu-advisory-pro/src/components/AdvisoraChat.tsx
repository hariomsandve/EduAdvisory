import { useState, useRef, useEffect } from 'react';
import { 
  Send, Mic, Trash2, Moon, Sun, Globe, Sparkles, 
  MessageSquare, User, Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function AdvisoraChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Namaste! 🙏 I am Avi. I can help you with career roadmaps, exam prep, and college admissions in India.\n\nI speak Hindi, English, and all major Indian languages. How can I guide you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "### कसा निवडावा? (How to choose?)\n\nतुमच्यासाठी योग्य मार्ग कोणता हे ठरवण्यासाठी खालील गोष्टींचा विचार करा:\n\n1. तुमची आवड (Your Interest):\n* तुम्हाला डेटाचे विश्लेषण करून त्यातून काही निष्कर्ष काढायला आवडते का?\n* की तुम्हाला सुंदर आणि वापरण्यास सोपे दिसणारे वेबपेजेस किंवा ॲप्स तयार करायला आवडतात?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleClearChat = () => {
    setMessages([messages[0]]);
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex gap-6 max-w-7xl mx-auto p-4">
      {/* Left Sidebar - Avatar & Info */}
      <div className="w-1/3 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10 mb-8">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-xl shadow-indigo-200">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden border-4 border-white">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10"></div>
              {/* Face */}
              <div className="relative w-32 h-32">
                <div className="absolute top-8 left-4 w-4 h-6 bg-indigo-600 rounded-full"></div>
                <div className="absolute top-8 right-4 w-4 h-6 bg-indigo-600 rounded-full"></div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-6 border-b-4 border-indigo-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-4 relative z-10">Avi</h2>
        <p className="text-gray-500 leading-relaxed max-w-xs relative z-10">
          Expert Indian Education Counselor. Multi-lingual Guidance for JEE, NEET, CUET & more.
        </p>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 bg-white rounded-[32px] shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-bold text-gray-700">Avi is Multi-Lingual</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleClearChat}
              className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              title="Clear Chat"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-6 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-200' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-none flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-gray-50/50 border-t border-gray-100">
          <div className="bg-white p-2 rounded-[24px] border border-gray-200 shadow-sm flex items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type or use your voice to ask..."
              className="flex-1 bg-transparent border-none px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            
            <button className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
              <Mic size={20} />
            </button>
            
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-indigo-200"
            >
              Send <Send size={18} />
            </button>
          </div>
          <div className="text-center mt-3">
            <button className="text-xs font-bold text-gray-400 hover:text-indigo-600 flex items-center justify-center gap-1 mx-auto transition-colors">
              Auto-detect Language <Globe size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
