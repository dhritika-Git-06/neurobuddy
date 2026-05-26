# 🧠 NeuroBuddy - AI-Powered Student Wellness & Career Platform

A comprehensive full-stack learning platform with AI chatbots for mental wellness and career guidance.

## ✨ Features

- 📚 **17+ Subjects** across 7 fields of study
- 🎥 **Video Lectures** with progress tracking
- 📝 **Interactive Quizzes** with instant feedback
- 🤖 **AI Wellness Bot** for mental health support (Gemini AI)
- 💼 **AI Career Bot** for career guidance (Gemini AI)
- 🏆 **Leaderboard** with rankings and scores
- 📊 **Analytics Dashboard** with learning insights
- 🔥 **Streak System** to maintain consistency
- 👤 **User Profiles** with progress tracking

## 🚀 Quick Start

### Automatic Start (Windows)

```powershell
powershell -ExecutionPolicy Bypass -File start.ps1
```

### Manual Start (All Platforms)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run seed
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Access Application

Open browser: **http://localhost:5173**

**Demo Login:**
- Email: `demo@neurobuddy.com`
- Password: `Demo123!`

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Recharts
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Gemini AI API

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB Atlas account
- Google Gemini API key

## ⚙️ Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📚 Available Commands

### Backend
```bash
npm run dev          # Start development server
npm run seed         # Seed database with demo data
npm run seed:users   # Add 100 random users
npm run test:gemini  # Test Gemini AI connection
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🎯 Features Overview

### Dashboard
- Learning analytics with charts
- Study time tracking
- Quiz performance metrics
- Subject progress bars
- Weekly activity graphs

### Subjects
- 17+ courses across multiple fields
- Computer Science, Data Science, Business, etc.
- Detailed roadmaps
- Video lectures and quizzes

### Video Lectures
- Full-screen video player
- Progress tracking
- Playlist navigation
- Mark as complete

### Quizzes
- Multiple choice questions
- Instant scoring
- Progress tracking
- Streak updates

### AI Chatbots
- **Wellness Bot**: Mental health support, stress management
- **Career Bot**: Career guidance, skill recommendations

### Leaderboard
- Global and field-specific rankings
- Score calculation based on quizzes, videos, streaks
- Public profiles with progress graphs

## 🔧 Troubleshooting

### No Subjects/Videos Showing?
```bash
cd backend
npm run seed
```

### Chatbots Not Working?
```bash
cd backend
npm run test:gemini
```

### Port Already in Use?
```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
killall node
```

## 📖 Documentation

- **QUICK_START.md** - Fast setup guide
- **START_PROJECT.md** - Detailed setup instructions
- **CHATBOT_SETUP.md** - AI chatbot configuration
- **HOW_TO_ADD_VIDEOS.md** - Adding real video content
- **RUN_PROJECT.txt** - Command reference

## 🎨 Design

- Dark theme with purple/violet accents
- Professional analytics dashboard
- Responsive design
- Modern UI components

## 🔐 Security

- JWT authentication
- Password hashing (bcrypt)
- Protected API routes
- Environment variables for secrets

## 📊 Database Schema

- Users
- Subjects
- Quiz Results
- Video Progress
- Chat Threads & Messages

## 🤝 Contributing

This is a complete full-stack project ready for deployment or further development.

## 📝 License

MIT License

## 🎉 Getting Started

1. Clone the repository
2. Follow QUICK_START.md
3. Login with demo account
4. Explore all features!

---

**Made with ❤️ for students worldwide**

🧠 Learn • 💪 Grow • 🚀 Succeed
