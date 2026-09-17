# 🚀 README Generator SaaS

A complete, production-grade, interactive **GitHub Profile README Generator SaaS** built for developers.

---

## 🌟 Highlights & Features

- **Instant Live Preview**: Dynamic Markdown and HTML rendering with real-time updates as you type.
- **12 Curated Templates**:
  - *Modern Full-Stack*, *Minimalist Developer*, *Executive / Professional*, *Frontend Artisan*, *Backend Architect*, *AI & Data Scientist*, *Open Source Enthusiast*, *Student & Junior Dev*, *Designer / Coder*, *Cyberpunk Terminal*, *Animated Dynamic*, and *GitHub Classic Clean*.
- **Comprehensive Sections**:
  - Profile header & animated typing SVGs
  - Categorized Tech Stack badges (Languages, Frontend, Backend, Databases, Cloud & DevOps, Tools, AI)
  - Interactive GitHub Stats, Streak counters, Top Languages cards, and Trophies
  - Featured Projects with repository and live demo links
  - Work Experience, Education, Certifications, and Achievements
  - Unlimited Custom Sections with drag-and-drop reordering and visibility toggles
  - Social badges for 10+ platforms and sponsorship buttons (Buy Me a Coffee, Ko-fi, Patreon, GitHub Sponsors)
- **Direct GitHub Push**: Commit your generated `README.md` directly into your GitHub profile repository (`username/username`) or any repository.
- **Zero-Account Guest Mode**: Create, customize, live preview, copy Markdown, and download `README.md` without registration.
- **Enterprise Security**:
  - JWT Access + Refresh token flow
  - Passwords hashed with bcrypt
  - GitHub OAuth tokens encrypted at rest via AES-256-CBC
  - Helmet, CORS, and dedicated tier rate limiting (Strict Auth, Moderate GitHub, General API)
  - Isolated AI Assistant Service architecture (`services/aiService.js`)

---

## 🛠️ Architecture & Tech Stack

```
Readme Generator/
├── client/                     # React + Vite + Tailwind CSS + Redux Toolkit
│   ├── src/
│   │   ├── components/         # Common widgets, topbar, section accordions, live preview
│   │   ├── features/           # Redux slices: authSlice, generatorSlice
│   │   ├── pages/              # 15+ pages including Landing, Generator, Templates, Dashboard
│   │   ├── templates/          # 12 Template definitions
│   │   ├── utils/              # Modular Markdown Generator engine & icons catalog
│   │   └── services/           # Axios interceptors with automatic JWT refresh
├── server/                     # Node.js + Express + MongoDB + Mongoose
│   ├── config/                 # DB connection and environment loading
│   ├── controllers/            # Auth, User, Readme, Template, GitHub, and Admin
│   ├── middleware/             # Auth JWT guard, role-based authorization, rate limiters, validation
│   ├── models/                 # User, Readme, Template, GithubConnection, ActivityLog
│   ├── routes/                 # Express REST endpoints
│   ├── services/               # GitHub REST API proxy, AES-256 token encryption, AIService
│   └── tests/                  # Unit tests for core engine & authentication
```

---

## 🚀 Quickstart & Setup Guide

### 1. Prerequisites
- **Node.js**: v18+ (tested with v24)
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017/readme_generator`) or MongoDB Atlas URI.

### 2. Configure Environment Variables
Copy `.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```

Set your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/readme_generator
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
FRONTEND_URL=http://localhost:5173
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/github/callback
```

### 3. Start the Backend API
In a new terminal:
```bash
cd server
npm start
```
The server will run on `http://localhost:5000`.

### 4. Start the Frontend Client
In a second terminal:
```bash
cd client
npm run dev
```
The client will launch at `http://localhost:5173`.

---

## 🧪 Testing & Verification

Run the automated test suites:
```bash
# Test server authentication & token encryption
node server/tests/markdownGenerator.test.js

# Build client for production
cd client
npm run build
```

---

## 📄 License
MIT © README Generator SaaS