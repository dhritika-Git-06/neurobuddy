require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const { testGeminiConnection } = require('./utils/geminiClient');

const authRoutes = require('./routes/authRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const videoRoutes = require('./routes/videoRoutes');
const quizRoutes = require('./routes/quizRoutes');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const path = require('path');

const app = express();

// Connect to database
connectDB();

// Test Gemini API connection
testGeminiConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'NeuroBuddy API is running' });
});

// Serve diagrams pages over HTTP so PNG download works (no file:// restriction)
app.get('/diagrams', (req, res) => {
  res.sendFile(path.join(__dirname, '../neurobuddy/NeuroBuddy_Diagrams.html'));
});
app.get('/diagrams-ppt', (req, res) => {
  res.sendFile(path.join(__dirname, '../neurobuddy/PPT_Diagrams.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
});
