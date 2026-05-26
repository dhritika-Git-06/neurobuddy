import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { leaderboardAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    fetchLeaderboard();
  }, [filter]);

  const fetchLeaderboard = async () => {
    try {
      const fieldOfStudy = filter === 'myField' ? user.fieldOfStudy : null;
      const response = await leaderboardAPI.getLeaderboard(fieldOfStudy);
      setLeaderboard(response.data.leaderboard);
      setCurrentUser(response.data.currentUser);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white'
                  : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white'
              }`}
            >
              All Students
            </button>
            <button
              onClick={() => setFilter('myField')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'myField'
                  ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white'
                  : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white'
              }`}
            >
              My Field
            </button>
          </div>
        </div>

        {/* Current User Card */}
        {currentUser && (
          <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-6 rounded-xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Your Rank</p>
                <p className="text-4xl font-bold">{getMedalEmoji(currentUser.rank)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90 mb-1">Total Score</p>
                <p className="text-3xl font-bold">{currentUser.totalScore}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90 mb-1">Streak</p>
                <div className="flex items-center gap-2 justify-end">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                  <p className="text-2xl font-bold">{currentUser.streak}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* 2nd Place */}
            <div className="bg-dark-card border border-dark-border p-6 rounded-xl text-center order-1">
              <div className="text-5xl mb-2">🥈</div>
              <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                {leaderboard[1].name.charAt(0)}
              </div>
              <h3 className="font-bold text-lg text-white">{leaderboard[1].name}</h3>
              <p className="text-sm text-gray-400">{leaderboard[1].fieldOfStudy}</p>
              <p className="text-2xl font-bold text-purple-400 mt-2">{leaderboard[1].totalScore}</p>
            </div>

            {/* 1st Place */}
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-xl shadow-lg text-center order-2 transform scale-105">
              <div className="text-6xl mb-2">🥇</div>
              <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 flex items-center justify-center text-yellow-600 text-3xl font-bold">
                {leaderboard[0].name.charAt(0)}
              </div>
              <h3 className="font-bold text-xl text-white">{leaderboard[0].name}</h3>
              <p className="text-sm text-yellow-100">{leaderboard[0].fieldOfStudy}</p>
              <p className="text-3xl font-bold text-white mt-2">{leaderboard[0].totalScore}</p>
            </div>

            {/* 3rd Place */}
            <div className="bg-dark-card border border-dark-border p-6 rounded-xl text-center order-3">
              <div className="text-5xl mb-2">🥉</div>
              <div className="w-16 h-16 bg-orange-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                {leaderboard[2].name.charAt(0)}
              </div>
              <h3 className="font-bold text-lg text-white">{leaderboard[2].name}</h3>
              <p className="text-sm text-gray-400">{leaderboard[2].fieldOfStudy}</p>
              <p className="text-2xl font-bold text-purple-400 mt-2">{leaderboard[2].totalScore}</p>
            </div>
          </div>
        )}

        {/* Full Leaderboard Table */}
        <div className="bg-dark-card rounded-xl border border-dark-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-bg border-b border-dark-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Field</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Quizzes</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Avg Score</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Videos</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Streak</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Total Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {leaderboard.map((student) => (
                  <tr
                    key={student.userId}
                    className={`hover:bg-dark-bg transition ${
                      student.userId === user.id ? 'bg-purple-900/20' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="text-2xl font-bold text-gray-300">{getMedalEmoji(student.rank)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        to={`/profile/${student.userId}`}
                        className="flex items-center gap-3 hover:opacity-80 transition"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white hover:text-purple-400 transition">
                            {student.name}
                          </p>
                          <p className="text-sm text-gray-400">{student.email}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{student.fieldOfStudy}</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-300">{student.totalQuizzes}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm font-semibold">
                        {student.avgQuizScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-300">{student.completedVideos}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        </svg>
                        <span className="text-orange-400 font-bold">{student.streak}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-xl font-bold text-purple-400">{student.totalScore}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scoring Info */}
        <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-white">How Scoring Works</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-dark-bg p-4 rounded-lg border border-dark-border">
              <p className="font-semibold text-purple-400 mb-1">Quiz Performance (50%)</p>
              <p className="text-gray-400">Average quiz score percentage</p>
            </div>
            <div className="bg-dark-bg p-4 rounded-lg border border-dark-border">
              <p className="font-semibold text-violet-400 mb-1">Video Completion</p>
              <p className="text-gray-400">10 points per completed video</p>
            </div>
            <div className="bg-dark-bg p-4 rounded-lg border border-dark-border">
              <p className="font-semibold text-orange-400 mb-1">Streak Bonus</p>
              <p className="text-gray-400">5 points per day streak</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
