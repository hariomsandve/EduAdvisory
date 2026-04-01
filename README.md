# 🎓 EduAdvisory — AI-Powered Educational Advisory Platform

<p align="center">
  <img src="./public/logo.png" alt="EduAdvisory Logo" width="120"/>
</p>

<p align="center">
  <strong>Empowering students, parents, and educators with intelligent career & academic guidance.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite" alt="Vite"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Gemini_AI-Powered-4285F4?style=for-the-badge&logo=google" alt="Gemini AI"/>
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind"/>
</p>

---

## 📖 About

**EduAdvisory** is a full-stack, AI-powered educational advisory platform that provides personalized career guidance, academic planning tools, and parental monitoring — all in one application.

It supports **two distinct user roles**:
- 👨‍🎓 **Student** — Career exploration, quizzes, learning tools, internships, and more.
- 👨‍👩‍👧 **Parent** — Monitor child progress, family sync, growth journey, AI language labs, and edu-wallet.

---

## ✨ Features

### 👨‍🎓 Student Dashboard
| Feature | Description |
|---|---|
| 🧭 **Career Paths** | Explore curated career tracks based on interests and quiz results |
| 🗺️ **Career Roadmap** | Detailed step-by-step roadmap for every career option |
| 🧠 **Career Quiz** | AI-driven aptitude quiz to find the best-fit career |
| 📊 **Aptitude Quiz** | Assess cognitive strengths across multiple domains |
| 🤖 **AI Advisor** | Chat with an intelligent Gemini-powered career advisor |
| 🏫 **Colleges Nearby** | Discover colleges near you with map integration (Leaflet) |
| 🎓 **College Predictor** | Predict college admission chances based on academic data |
| 💼 **Job Predictor** | AI-powered job match predictions based on skills |
| 💼 **Internship Portal** | Browse and apply for internships |
| 📝 **Resume Builder** | Build a professional resume with guided templates |
| 🎭 **Mock Interviews** | Practice interviews with AI feedback |
| 📚 **Study Resources** | Access curated study materials and resources |
| 🎮 **Gamified Learning** | Learn through interactive games and challenges |
| 🎞️ **EduReels** | Short educational video reels for quick learning |
| 📖 **EduLearn** | In-depth learning modules and lessons |
| 🤝 **SkillShare** | Share and learn skills with the community |
| 🔔 **Timeline & Notifications** | Track deadlines, events, and milestones |
| 📅 **Events & Webinars** | Discover and join academic events |
| 🌐 **Community Forum** | Connect with peers, mentors, and educators |
| 🎯 **Success Stories** | Get inspired by real student journeys |
| 📋 **My Applications** | Track all college and internship applications |
| ⏱️ **Focus Flow** | Pomodoro-style focus timer and productivity tracker |
| 📸 **Homework Analyzer** | AI OCR tool to analyze and solve homework problems |
| ❓ **Help & FAQ** | Comprehensive help center |
| ⚙️ **Settings** | Profile, preferences, notifications, and privacy |
| 👤 **User Profile** | View and edit your personal profile |

### 👨‍👩‍👧 Parent Dashboard
| Feature | Description |
|---|---|
| 📈 **Growth Journey** | Visual timeline of child's academic progress |
| 👨‍👩‍👧 **Family Sync Hub** | Compare multiple children, shared calendar, mentorship nudges |
| 🏛️ **Community Hub** | Guest speaker registry, parent-to-school contribution portal |
| 🗣️ **AI Language Labs** | Track and improve spoken language fluency via speech recognition |
| 💰 **Edu-Wallet** | Reward children for academic achievements with real-world incentives |
| ⚙️ **Parent Settings** | Profile, notification preferences, child management, privacy |

---

## 🏗️ Project Structure

```
EDU-ADVISORY/                          ← Project root
│
├── frontend/                          ← React frontend application
│   ├── public/
│   │   └── logo.png                   ← App logo / static assets
│   ├── src/
│   │   ├── components/                ← All UI components (39 total)
│   │   │   ├── LandingPage.tsx        ← Home / landing screen
│   │   │   ├── LoadingPage.tsx        ← App loading splash screen
│   │   │   ├── RoleSelection.tsx      ← Student / Parent role picker
│   │   │   ├── AuthPage.tsx           ← Student login / signup
│   │   │   ├── ParentAuthPage.tsx     ← Parent login / signup
│   │   │   ├── InterestSelection.tsx  ← Onboarding interest picker
│   │   │   ├── CareerQuiz.tsx         ← Career aptitude quiz
│   │   │   ├── AptitudeQuiz.tsx       ← General aptitude quiz
│   │   │   ├── QuizResult.tsx         ← Quiz results display
│   │   │   ├── Dashboard.tsx          ← Main student dashboard
│   │   │   ├── ParentDashboard.tsx    ← Main parent dashboard
│   │   │   ├── CareerPaths.tsx        ← Career exploration page
│   │   │   ├── CareerRoadmap.tsx      ← Career roadmap viewer
│   │   │   ├── CollegesNearby.tsx     ← Map-based college finder
│   │   │   ├── CollegePredictor.tsx   ← College admission predictor
│   │   │   ├── JobPredictor.tsx       ← Job match predictor
│   │   │   ├── InternshipPortal.tsx   ← Internship listings & apply
│   │   │   ├── ResumeBuilder.tsx      ← Resume creation tool
│   │   │   ├── MockInterviews.tsx     ← AI mock interview practice
│   │   │   ├── MyApplications.tsx     ← Application tracker
│   │   │   ├── StudyResources.tsx     ← Study material library
│   │   │   ├── GamifiedLearning.tsx   ← Game-based learning
│   │   │   ├── EduReels.tsx           ← Short educational reels
│   │   │   ├── EduLearn.tsx           ← Deep learning modules
│   │   │   ├── SkillShare.tsx         ← Peer skill sharing
│   │   │   ├── FocusFlow.tsx          ← Focus / productivity timer
│   │   │   ├── HomeworkAnalyzer.tsx   ← AI OCR homework tool
│   │   │   ├── Advisor.tsx            ← AI advisor interface
│   │   │   ├── AdvisoraChat.tsx       ← Gemini AI chat component
│   │   │   ├── TimelineNotifications.tsx ← Timeline & notifications
│   │   │   ├── EventsWebinars.tsx     ← Events & webinar discovery
│   │   │   ├── CommunityForum.tsx     ← Student community board
│   │   │   ├── SuccessStories.tsx     ← Inspirational stories
│   │   │   ├── Resources.tsx          ← Resource aggregator
│   │   │   ├── ContactUs.tsx          ← Contact / support page
│   │   │   ├── HelpFAQ.tsx            ← Help center & FAQ
│   │   │   ├── Settings.tsx           ← Student settings panel
│   │   │   ├── ParentSettings.tsx     ← Parent settings panel
│   │   │   └── UserProfile.tsx        ← User profile page
│   │   │
│   │   ├── services/
│   │   │   └── gemini.ts              ← Google Gemini AI API client
│   │   │
│   │   ├── App.tsx                    ← Root app with view routing
│   │   ├── main.tsx                   ← React app entry point
│   │   └── index.css                  ← Global styles
│   │
│   └── index.html                     ← Vite HTML entry point
│
├── backend/                           ← Node.js backend services
│   ├── supabase/
│   │   └── supabaseClient.js          ← Supabase database client
│   ├── services/
│   │   ├── auth.js                    ← Authentication logic
│   │   ├── quiz.js                    ← Quiz data & scoring
│   │   ├── recommendation.js          ← AI career recommendations
│   │   ├── colleges.js                ← College data service
│   │   ├── scholarships.js            ← Scholarship data service
│   │   └── resources.js              ← Learning resources service
│   ├── ocr/
│   │   └── handwriting.js             ← OCR / homework analyzer (planned)
│   ├── testConnection.js              ← DB connection test utility
│   └── .env.example                   ← Backend env variable template
│
├── server.ts                          ← Express + Vite integrated server
├── vite.config.ts                     ← Vite config (root: ./frontend)
├── tsconfig.json                      ← TypeScript configuration
├── package.json                       ← Dependencies & npm scripts
├── .env.example                       ← Root env variable template
└── .gitignore                         ← Git ignore rules
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A **Google Gemini API Key** — get one at [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/edu-advisory.git
   cd edu-advisory
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   > Refer to `backend/.env.example` for backend-specific variables.

### Running the Application

**Start the frontend dev server (Vite):**
```bash
npm run dev
```
Open your browser at `http://localhost:5173`

**Start the backend server:**
```bash
tsx server.ts
```
The Express server runs on `http://localhost:3000`

**Other scripts:**
```bash
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # TypeScript type-check (no emit)
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI framework |
| **TypeScript** | 5.8 | Type-safe development |
| **Vite** | 6 | Build tool & dev server |
| **Tailwind CSS** | 4 | Utility-first styling |
| **Framer Motion** | 12 | Animations & transitions |
| **Lucide React** | Latest | Icon library |
| **Recharts** | 3 | Data visualization & charts |
| **React Leaflet** | 5 | Interactive maps |
| **React Markdown** | 10 | Markdown rendering |

### Backend & Services
| Technology | Purpose |
|---|---|
| **Express.js** | HTTP server & API routes |
| **Google Gemini AI** | AI-powered advisor & recommendations |
| **Supabase** | Database & authentication |
| **Socket.IO** | Real-time communication |
| **Better SQLite3** | Local/embedded database |

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini AI API key |

---

## 🗺️ App Flow

```
Landing Page
    ↓
Role Selection (Student / Parent)
    ↓                    ↓
Auth Page          Parent Auth Page
    ↓                    ↓
Interest Selection  Parent Dashboard ──→ [Growth Journey, Family Sync,
    ↓                                     Community Hub, AI Language Labs,
Career Quiz                               Edu-Wallet, Parent Settings]
    ↓
Quiz Result
    ↓
Student Dashboard ──→ [Career Paths, Colleges, Internships, Resume,
                        Mock Interviews, EduLearn, FocusFlow, Settings, ...]
```

---

## 👨‍💻 Team

| Role | Contributor |
|---|---|
| Frontend Development | Hariom Sandve |
| Backend Development | Team |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add: your feature description'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow the existing code style and ensure TypeScript types pass before submitting.

---

## 📄 License

This project is licensed under the **Apache-2.0 License**.

---

<p align="center">Made with ❤️ by the EduAdvisory Team</p>
