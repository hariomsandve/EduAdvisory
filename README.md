<h1 align="center">
  <img src="./frontend/public/images/logo.png" alt="EduAdvisory Logo" width="100"/><br/>
  EduAdvisory
</h1>

<p align="center">
  <strong>AI-Powered Educational & Career Advisory Platform</strong><br/>
  Empowering students, parents, and educators with intelligent, personalized guidance.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 6"/>
  <img src="https://img.shields.io/badge/Gemini_AI-Powered-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI"/>
  <img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/>
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
</p>

---

## 📖 Overview

**EduAdvisory** is a full-stack, AI-powered educational advisory platform that delivers personalized career guidance, academic planning tools, real-time analytics, and parental monitoring — all in a single, unified application.

The platform is built around **two distinct user roles**, each with a tailored experience:

| Role | Description |
|---|---|
| 👨‍🎓 **Student** | Explore career paths, take AI-driven quizzes, manage applications, develop skills, and access a wide range of learning tools |
| 👨‍👩‍👧 **Parent** | Monitor child progress, track the academic growth journey, manage rewards, sync family goals, and contribute to the school community |

---

## ✨ Feature Highlights

### 👨‍🎓 Student Dashboard

| Feature | Description |
|---|---|
| 🧭 **Career Paths** | Browse curated career tracks tailored to interests and quiz results |
| 🗺️ **Career Roadmap** | Detailed, step-by-step roadmap for every career option |
| 🧠 **Career Quiz** | AI-driven aptitude quiz to identify best-fit careers |
| 📊 **Aptitude Quiz** | Assess cognitive strengths across multiple domains |
| 🤖 **AI Advisor** | Chat with an intelligent Gemini-powered career advisor in real-time |
| 🏫 **Colleges Nearby** | Discover nearby colleges using interactive Leaflet maps |
| 🎓 **College Predictor** | Predict college admission chances based on academic profile |
| 💼 **Job Predictor** | AI-powered job-match predictions based on skills and interests |
| 📋 **Internship Portal** | Browse, filter, and apply for internships |
| 📝 **Resume Builder** | Build a professional resume with guided, structured templates |
| 🎭 **Mock Interviews** | Practice interviews with AI-generated feedback |
| 📚 **Study Resources** | Access curated study materials, notes, and references |
| 🎮 **Gamified Learning** | Learn through interactive games and challenges |
| 🎞️ **EduReels** | Short educational video reels for quick, engaging learning |
| 📖 **EduLearn** | In-depth learning modules and structured lessons |
| 🤝 **SkillShare** | Share and develop skills with the peer community |
| 🔔 **Timeline & Notifications** | Track deadlines, events, and academic milestones |
| 📅 **Events & Webinars** | Discover and register for academic events and webinars |
| 🌐 **Community Forum** | Connect with peers, mentors, and educators |
| 🎯 **Success Stories** | Get inspired by real student journeys and achievements |
| 📋 **My Applications** | Unified tracker for all college and internship applications |
| ⏱️ **Focus Flow** | Pomodoro-style focus timer and productivity tracker |
| 📸 **Homework Analyzer** | AI + OCR tool to analyze and solve handwritten homework problems |
| ❓ **Help & FAQ** | Comprehensive help center with searchable FAQs |
| ⚙️ **Settings** | Full control over profile, preferences, notifications, and privacy |
| 👤 **User Profile** | View and manage your personal academic profile |

### 👨‍👩‍👧 Parent Dashboard

| Feature | Description |
|---|---|
| 📈 **Growth Journey** | Visual timeline of child's academic progress and milestones |
| 👨‍👩‍👧 **Family Sync Hub** | Compare multiple children, shared calendar, mentorship nudges |
| 🏛️ **Community Hub** | Guest speaker registry and parent-to-school contribution portal |
| 🗣️ **AI Language Labs** | Track and improve spoken language fluency via speech recognition |
| 💰 **Edu-Wallet** | Reward children for academic achievements with real-world incentives |
| ⚙️ **Parent Settings** | Profile, notification preferences, child management, and privacy |

---

## 🏗️ Project Structure

```
EDU-ADVISORY/                              ← Project root
│
├── frontend/                              ← React + Vite frontend application
│   ├── public/
│   │   ├── images/
│   │   │   └── logo.png                   ← App logo (favicon + OG image)
│   │   └── videos/
│   │       ├── carrerpath.mp4             ← Career path feature demo video
│   │       ├── macro.mp4                  ← Macro overview video
│   │       ├── parents.mp4                ← Parent dashboard demo video
│   │       ├── student.mp4                ← Student dashboard demo video
│   │       └── teacher.mp4                ← Teacher/educator demo video
│   │
│   ├── src/
│   │   ├── components/                    ← All UI page components (39 total)
│   │   │   │
│   │   │   ├── ── Onboarding ──
│   │   │   ├── LandingPage.tsx            ← Public home / marketing page
│   │   │   ├── LoadingPage.tsx            ← App splash/loading screen
│   │   │   ├── RoleSelection.tsx          ← Student / Parent role picker
│   │   │   ├── AuthPage.tsx               ← Student login & signup
│   │   │   ├── ParentAuthPage.tsx         ← Parent login & signup
│   │   │   ├── InterestSelection.tsx      ← Onboarding interest selection
│   │   │   │
│   │   │   ├── ── Quizzes & Results ──
│   │   │   ├── CareerQuiz.tsx             ← AI-powered career aptitude quiz
│   │   │   ├── AptitudeQuiz.tsx           ← Cognitive aptitude assessment
│   │   │   ├── QuizResult.tsx             ← Quiz result display & next steps
│   │   │   │
│   │   │   ├── ── Dashboards ──
│   │   │   ├── Dashboard.tsx              ← Main student dashboard shell
│   │   │   ├── ParentDashboard.tsx        ← Main parent dashboard shell
│   │   │   │
│   │   │   ├── ── Career Tools ──
│   │   │   ├── CareerPaths.tsx            ← Career track explorer
│   │   │   ├── CareerRoadmap.tsx          ← Step-by-step career roadmap viewer
│   │   │   ├── JobPredictor.tsx           ← AI job-match predictor
│   │   │   ├── Advisor.tsx                ← AI advisor interface
│   │   │   ├── AdvisoraChat.tsx           ← Gemini AI chat component
│   │   │   │
│   │   │   ├── ── College & Applications ──
│   │   │   ├── CollegesNearby.tsx         ← Map-based college finder (Leaflet)
│   │   │   ├── CollegePredictor.tsx       ← Admission chance predictor
│   │   │   ├── InternshipPortal.tsx       ← Internship listings & applications
│   │   │   ├── MyApplications.tsx         ← Unified application tracker
│   │   │   ├── ResumeBuilder.tsx          ← Guided resume creation tool
│   │   │   ├── MockInterviews.tsx         ← AI mock interview practice
│   │   │   │
│   │   │   ├── ── Learning & Development ──
│   │   │   ├── StudyResources.tsx         ← Study material library
│   │   │   ├── GamifiedLearning.tsx       ← Game-based learning modules
│   │   │   ├── EduReels.tsx               ← Short educational video reels
│   │   │   ├── EduLearn.tsx               ← Deep-dive learning modules
│   │   │   ├── SkillShare.tsx             ← Peer skill-sharing platform
│   │   │   ├── FocusFlow.tsx              ← Pomodoro focus & productivity timer
│   │   │   ├── HomeworkAnalyzer.tsx       ← AI + OCR homework analyzer
│   │   │   │
│   │   │   ├── ── Community & Events ──
│   │   │   ├── TimelineNotifications.tsx  ← Milestones & notification feed
│   │   │   ├── EventsWebinars.tsx         ← Academic events & webinar hub
│   │   │   ├── CommunityForum.tsx         ← Peer & mentor discussion board
│   │   │   ├── SuccessStories.tsx         ← Inspirational student stories
│   │   │   │
│   │   │   ├── ── Support & Settings ──
│   │   │   ├── Resources.tsx              ← Resource aggregator
│   │   │   ├── ContactUs.tsx              ← Contact & support page
│   │   │   ├── HelpFAQ.tsx                ← Searchable help center & FAQs
│   │   │   ├── Settings.tsx               ← Student settings panel
│   │   │   ├── ParentSettings.tsx         ← Parent settings panel
│   │   │   └── UserProfile.tsx            ← Personal profile management
│   │   │
│   │   ├── services/
│   │   │   └── gemini.ts                  ← Google Gemini AI API client & prompts
│   │   │
│   │   ├── App.tsx                        ← Root app — view state & routing logic
│   │   ├── main.tsx                       ← React app entry point (DOM mount)
│   │   └── index.css                      ← Global base styles
│   │
│   └── index.html                         ← Vite HTML entry + SEO meta tags
│
├── backend/                               ← Node.js / Express backend
│   ├── supabase/
│   │   └── supabaseClient.js              ← Supabase database & auth client
│   ├── services/
│   │   ├── auth.js                        ← User authentication logic
│   │   ├── quiz.js                        ← Quiz data management & scoring
│   │   ├── recommendation.js              ← AI-powered career recommendations
│   │   ├── colleges.js                    ← College data & filtering service
│   │   ├── scholarships.js                ← Scholarship data service
│   │   └── resources.js                   ← Learning resources service
│   ├── ocr/
│   │   └── handwriting.js                 ← OCR engine for homework analyzer
│   ├── testConnection.js                  ← Database connection health checker
│   └── .env.example                       ← Backend environment variable template
│
├── server.ts                              ← Express + Vite integrated dev server
├── vite.config.ts                         ← Vite configuration (root: ./frontend)
├── tsconfig.json                          ← TypeScript compiler configuration
├── package.json                           ← Project dependencies & npm scripts
├── .env.example                           ← Root environment variable template
└── .gitignore                             ← Git ignore rules
```

---

## 🗺️ Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        Landing Page                         │
│              (Marketing, Features, Call to Action)          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │    Role Selection   │
              │  Student │ Parent   │
              └──────┬──────────┬──┘
                     │          │
            ┌────────▼──┐    ┌──▼────────────┐
            │ Auth Page │    │ Parent Auth   │
            │  (Student)│    │    Page       │
            └────────┬──┘    └──┬────────────┘
                     │          │
         ┌───────────▼──┐       ▼
         │  Interest     │  ┌──────────────────────────────────┐
         │  Selection    │  │         Parent Dashboard         │
         └───────┬───────┘  │  • Growth Journey                │
                 │           │  • Family Sync Hub               │
                 ▼           │  • Community Hub                 │
         ┌──────────────┐   │  • AI Language Labs              │
         │  Career Quiz │   │  • Edu-Wallet                    │
         └──────┬───────┘   │  • Parent Settings               │
                │            └──────────────────────────────────┘
                ▼
         ┌──────────────┐
         │  Quiz Result │
         └──────┬───────┘
                │
                ▼
┌───────────────────────────────────────────────────────────────┐
│                     Student Dashboard                         │
│                                                               │
│  Career Tools     Learning          Community     Account     │
│  ─────────────    ────────────      ─────────     ───────     │
│  Career Paths     EduLearn          Forum         Profile     │
│  Career Roadmap   EduReels          Events        Settings    │
│  College Finder   Gamified          Success       Help/FAQ    │
│  Job Predictor    SkillShare        Stories       Contact     │
│  Internships      StudyResources                              │
│  Resume Builder   FocusFlow                                   │
│  Mock Interviews  HomeworkAnalyzer                            │
│  My Applications                                              │
└───────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | Core UI framework |
| **TypeScript** | 5.8 | Type-safe development |
| **Vite** | 6 | Build tool & hot-reload dev server |
| **Tailwind CSS** | 4 | Utility-first responsive styling |
| **Framer Motion** | 12 | Smooth animations & page transitions |
| **Lucide React** | Latest | Consistent icon library |
| **Recharts** | 3 | Data visualization & analytics charts |
| **React Leaflet** | 5 | Interactive maps for college discovery |
| **React Markdown** | 10 | Rendering AI Markdown responses |
| **Chart.js** | 4 | Advanced chart rendering |

### Backend & Services

| Technology | Purpose |
|---|---|
| **Express.js** | HTTP server & REST API routing |
| **Google Gemini AI** | AI-powered advisor, quizzes & recommendations |
| **Supabase** | Managed PostgreSQL database & authentication |
| **Socket.IO** | Real-time bidirectional communication |
| **Better SQLite3** | Embedded local database for offline/fast data |
| **tsx** | TypeScript execution for Node.js (dev server) |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** `v18` or higher — [Download here](https://nodejs.org/)
- **npm** `v9` or higher (comes with Node.js)
- A **Google Gemini API Key** — Get one free at [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/hariomsandve/EduAdvisory.git
cd EduAdvisory
```

### 2. Install Dependencies

```bash
npm install
```

> This installs all frontend and backend dependencies from the root `package.json`.

### 3. Configure Environment Variables

Create a `.env` file in the **project root** by copying the provided example:

```bash
cp .env.example .env
```

Then open `.env` and add your API key:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

> For backend-specific configuration, refer to `backend/.env.example`.

### 4. Run the Development Server

```bash
npm run dev
```

This starts the **Express backend + Vite frontend** together on:

```
http://localhost:3000
```

Open this URL in your browser to access the full application.

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| **Development** | `npm run dev` | Start the combined dev server (backend + frontend) |
| **Build** | `npm run build` | Compile production bundle into `frontend/dist/` |
| **Preview** | `npm run preview` | Preview the production build locally |
| **Lint** | `npm run lint` | Run TypeScript type-check without emitting files |

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ Required | Your Google Gemini AI API key for all AI features |

---

## 🔒 Security & Git

The following are **excluded from version control** via `.gitignore`:

- `node_modules/` — Package dependencies (restored via `npm install`)
- `frontend/dist/` — Build output (auto-generated via `npm run build`)
- `.env` — Secret keys and environment variables
- `*.log` — Debug log files

---

## 👨‍💻 Team

| Role | Contributor |
|---|---|
| 🎨 Frontend Development | **Hariom Sandve** |
| ⚙️ Backend Development | Team |
| 🤖 AI Integration | Team |

---

## 🤝 Contributing

Contributions are welcome! To contribute to EduAdvisory:

1. **Fork** the repository
2. **Create** a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with a descriptive message:
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request against `main`

> Please ensure TypeScript types pass (`npm run lint`) and the app runs correctly before submitting your PR.

---

## 📄 License

This project is licensed under the **Apache-2.0 License**.  
See the [LICENSE](./LICENSE) file for full details.

---

<p align="center">
  Built with ❤️ by the <strong>EduAdvisory Team</strong><br/>
  <em>Guiding every student towards their best future.</em>
</p>
