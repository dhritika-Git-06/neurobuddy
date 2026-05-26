import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import SubjectDetail from './pages/SubjectDetail';
import Quizzes from './pages/Quizzes';
import QuizTake from './pages/QuizTake';
import Videos from './pages/Videos';
import VideoPlayer from './pages/VideoPlayer';
import ChatWellness from './pages/ChatWellness';
import ChatCareer from './pages/ChatCareer';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import PublicProfile from './pages/PublicProfile';
import Psychologists from './pages/Psychologists';
import StressRelief from './pages/StressRelief';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/subjects" element={<PrivateRoute><Subjects /></PrivateRoute>} />
          <Route path="/subjects/:id" element={<PrivateRoute><SubjectDetail /></PrivateRoute>} />
          <Route path="/quizzes" element={<PrivateRoute><Quizzes /></PrivateRoute>} />
          <Route path="/quiz/:subjectId/:quizId" element={<PrivateRoute><QuizTake /></PrivateRoute>} />
          <Route path="/videos" element={<PrivateRoute><Videos /></PrivateRoute>} />
          <Route path="/video/:subjectId/:videoIndex" element={<PrivateRoute><VideoPlayer /></PrivateRoute>} />
          <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
          <Route path="/chat/wellness" element={<PrivateRoute><ChatWellness /></PrivateRoute>} />
          <Route path="/chat/career" element={<PrivateRoute><ChatCareer /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/profile/:userId" element={<PrivateRoute><PublicProfile /></PrivateRoute>} />
          <Route path="/psychologists" element={<PrivateRoute><Psychologists /></PrivateRoute>} />
          <Route path="/stress-relief" element={<PrivateRoute><StressRelief /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
