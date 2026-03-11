import { useState, useEffect } from 'react';
import { Bell, CheckCircle2, XCircle, Info, Calendar, BookOpen, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'skill_request' | 'skill_accepted' | 'skill_rejected' | 'course_update' | 'event_reminder';
  message: string;
  timestamp: string;
  status?: 'read' | 'unread';
  actionLink?: string;
  actionText?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'skill_request',
    message: 'John Doe wants to share Python and learn Java with you.',
    timestamp: '2 hours ago',
    status: 'unread',
    actionText: 'View Request',
    actionLink: '#skillshare'
  },
  {
    id: '2',
    type: 'skill_accepted',
    message: 'Your skill share request with Jane Smith for React was accepted!',
    timestamp: '5 hours ago',
    status: 'read',
    actionText: 'Start Chat',
    actionLink: '#chat'
  },
  {
    id: '3',
    type: 'course_update',
    message: 'New module \"Advanced React Hooks\" added to your Web Dev course.',
    timestamp: '1 day ago',
    status: 'unread',
    actionText: 'Go to Course',
    actionLink: '#edu-learn'
  },
  {
    id: '4',
    type: 'event_reminder',
    message: 'Reminder: \"Future of AI\" webinar starts in 30 minutes.',
    timestamp: '2 days ago',
    status: 'read',
    actionText: 'Join Webinar',
    actionLink: '#events'
  },
  {
    id: '5',
    type: 'skill_rejected',
    message: 'Mark Johnson declined your skill share request for AWS.',
    timestamp: '3 days ago',
    status: 'read',
  },
  {
    id: '6',
    type: 'course_update',
    message: 'Your Python for Data Science course has been updated with new exercises.',
    timestamp: '4 days ago',
    status: 'read',
    actionText: 'Go to Course',
    actionLink: '#edu-learn'
  },
];

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'skill_request':
      return <Share2 size={20} className="text-purple-500" />;
    case 'skill_accepted':
      return <CheckCircle2 size={20} className="text-green-500" />;
    case 'skill_rejected':
      return <XCircle size={20} className="text-red-500" />;
    case 'course_update':
      return <BookOpen size={20} className="text-blue-500" />;
    case 'event_reminder':
      return <Calendar size={20} className="text-orange-500" />;
    default:
      return <Info size={20} className="text-gray-500" />;
  }
};

export default function TimelineNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, status: 'read' } : notif)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
            <Bell size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Timeline & Notifications</h1>
            <p className="text-xs text-gray-500">Stay updated with your activities</p>
          </div>
        </div>
        <button 
          onClick={() => setNotifications([])}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-xl font-medium hover:bg-red-100 transition-colors text-sm"
        >
          Clear All
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <Bell size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No new notifications.</p>
            <p className="text-sm text-gray-400">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {notifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 ${
                    notif.status === 'unread' ? 'ring-2 ring-indigo-200' : ''
                  }`}
                >
                  <div className="shrink-0 mt-1">
                    <NotificationIcon type={notif.type} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium text-base">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.timestamp}</p>
                    <div className="flex gap-2 mt-3">
                      {notif.actionText && notif.actionLink && (
                        <a 
                          href={notif.actionLink}
                          className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-xs font-medium hover:bg-indigo-600 transition-colors"
                          onClick={() => markAsRead(notif.id)}
                        >
                          {notif.actionText}
                        </a>
                      )}
                      {notif.status === 'unread' && (
                        <button 
                          onClick={() => markAsRead(notif.id)}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button 
                        onClick={() => removeNotification(notif.id)}
                        className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
