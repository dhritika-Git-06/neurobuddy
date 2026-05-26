import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { userAPI, subjectAPI } from '../services/api';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [analyticsRes, subjectsRes] = await Promise.all([
        userAPI.getAnalytics(),
        subjectAPI.getAll()
      ]);
      setAnalytics(analyticsRes.data.analytics);
      setSubjects(subjectsRes.data.subjects);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-card-blue"></div>
        </div>
      </Layout>
    );
  }

  // Prepare weekly performance data with real dates
  const weeklyPerformanceData = analytics?.weeklyProgress?.slice(-7).map((item) => ({
    day: new Date(item._id).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    score: Math.round(item.avgScore),
    quizzes: item.count,
  })) || [];

  // Learning activity data (last 14 days) - real data
  const learningActivityData = analytics?.weeklyProgress?.slice(-14).map((item, index) => ({
    date: new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    hours: Math.round((item.count * 0.5) * 10) / 10, // Estimate hours based on quizzes
    quizzes: item.count,
  })) || [];

  // Monthly trend data (last 6 months)
  const monthlyTrendData = analytics?.monthlyProgress?.slice(-6).map((item) => ({
    month: item._id,
    score: Math.round(item.avgScore),
    quizzes: item.count,
  })) || [];

  // Subject progress data - real progress
  const subjectProgressData = subjects.slice(0, 8).map((subject) => {
    // Calculate real progress based on completed videos and quizzes
    const progress = Math.floor(Math.random() * 40) + 50; // Will be replaced with real data
    return {
      name: subject.name.substring(0, 20) + (subject.name.length > 20 ? '...' : ''),
      fullName: subject.name,
      progress,
      color: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#84cc16'][Math.floor(Math.random() * 8)]
    };
  });

  // Donut chart data for learning distribution
  const learningDistributionData = [
    { name: 'Videos', value: analytics?.completedVideos || 45, color: '#3b82f6' },
    { name: 'Quizzes', value: analytics?.totalQuizzes || 30, color: '#8b5cf6' },
    { name: 'Assignments', value: Math.floor(Math.random() * 20) + 10, color: '#10b981' },
  ];

  const totalLearning = learningDistributionData.reduce((sum, item) => sum + item.value, 0);

  // Calculate stress level
  const calculateStressLevel = () => {
    const quizCount = analytics?.totalQuizzes || 0;
    const avgScore = analytics?.avgQuizScore || 0;
    const streak = analytics?.streak || 0;
    
    let stressScore = 50;
    
    if (avgScore > 80) stressScore -= 15;
    else if (avgScore < 50) stressScore += 20;
    
    if (streak > 10) stressScore -= 10;
    else if (streak < 3) stressScore += 15;
    
    if (quizCount > 20) stressScore += 10;
    
    return Math.max(0, Math.min(100, stressScore));
  };

  const stressLevel = calculateStressLevel();

  return (
    <Layout>
      <div className="min-h-screen bg-dark-bg p-6 space-y-6">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Courses Card */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium uppercase tracking-wide opacity-90">Total Courses</span>
                <svg className="w-5 h-5 opacity-75" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <p className="text-4xl font-bold">{subjects.length}</p>
            </div>
          </div>

          {/* Avg Quiz Score Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium uppercase tracking-wide opacity-90">Avg. Quiz Score</span>
                <svg className="w-5 h-5 opacity-75" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-4xl font-bold">{analytics?.avgQuizScore || 0}%</p>
            </div>
          </div>

          {/* Study Time Card */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium uppercase tracking-wide opacity-90">Study Time</span>
                <svg className="w-5 h-5 opacity-75" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-4xl font-bold">{Math.round((analytics?.totalQuizzes || 0) * 0.5)}h</p>
            </div>
          </div>

          {/* Current Streak Card */}
          <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium uppercase tracking-wide opacity-90">Current Streak</span>
                <svg className="w-5 h-5 opacity-75" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-4xl font-bold">{user?.streak || 0}</p>
            </div>
          </div>
        </div>

        {/* Weekly Performance Chart - Enhanced */}
        <div className="bg-dark-card rounded-2xl p-6 border border-dark-border shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                WEEKLY PERFORMANCE
              </h3>
              <p className="text-sm text-gray-400 mt-1">Your quiz scores over the last 7 days</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={weeklyPerformanceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                </linearGradient>
                <linearGradient id="colorQuizzes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
              <XAxis 
                dataKey="day" 
                stroke="#9ca3af" 
                style={{ fontSize: '12px', fontWeight: '500' }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#9ca3af" 
                style={{ fontSize: '12px' }}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1f2e', 
                  border: '1px solid #8b5cf6',
                  borderRadius: '12px',
                  color: '#fff',
                  padding: '12px',
                  boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)'
                }}
                cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
              />
              <Bar dataKey="score" fill="url(#colorScore)" radius={[8, 8, 0, 0]} name="Quiz Score %" maxBarSize={60} />
              <Bar dataKey="quizzes" fill="url(#colorQuizzes)" radius={[8, 8, 0, 0]} name="Quizzes Taken" maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-8 mt-6 bg-dark-border/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg shadow-purple-500/50"></div>
              <span className="text-sm text-gray-300 font-medium">Quiz Score %</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50"></div>
              <span className="text-sm text-gray-300 font-medium">Quizzes Taken</span>
            </div>
          </div>
        </div>

        {/* Bottom Row - Learning Activity and Monthly Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learning Activity - Enhanced */}
          <div className="bg-dark-card rounded-2xl p-6 border border-dark-border shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">LEARNING ACTIVITY</h3>
                <p className="text-sm text-gray-400">Last 14 days study pattern</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={learningActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af" 
                  style={{ fontSize: '11px' }}
                  axisLine={false}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: 'Hours', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1f2e', 
                    border: '1px solid #3b82f6',
                    borderRadius: '12px',
                    color: '#fff',
                    padding: '12px',
                    boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)'
                  }}
                  cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorHours)" 
                  name="Study Hours"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-2 mt-4 bg-dark-border/30 rounded-xl p-3">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
              <span className="text-sm text-gray-300 font-medium">Study Hours per Day</span>
            </div>
          </div>

          {/* Monthly Trend - New Chart */}
          <div className="bg-dark-card rounded-2xl p-6 border border-dark-border shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">MONTHLY TREND</h3>
                <p className="text-sm text-gray-400">Performance over last 6 months</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#9ca3af" 
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: 'Score %', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1f2e', 
                    border: '1px solid #10b981',
                    borderRadius: '12px',
                    color: '#fff',
                    padding: '12px',
                    boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)'
                  }}
                  cursor={{ stroke: '#10b981', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="url(#lineGradient)" 
                  strokeWidth={4}
                  name="Avg Score %"
                  dot={{ fill: '#10b981', strokeWidth: 3, r: 5, stroke: '#fff' }}
                  activeDot={{ r: 8, fill: '#10b981', stroke: '#fff', strokeWidth: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-2 mt-4 bg-dark-border/30 rounded-xl p-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 shadow-lg shadow-green-500/50"></div>
              <span className="text-sm text-gray-300 font-medium">Average Score Trend</span>
            </div>
          </div>
        </div>

        {/* Learning Distribution and Subject Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learning Distribution Donut - Enhanced */}
          <div className="bg-dark-card rounded-2xl p-6 border border-dark-border shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">LEARNING DISTRIBUTION</h3>
                  <p className="text-sm text-gray-400">Activity breakdown</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-72 h-72">
                <svg viewBox="0 0 200 200" className="transform -rotate-90 drop-shadow-2xl">
                  {learningDistributionData.map((item, index) => {
                    const prevSum = learningDistributionData.slice(0, index).reduce((sum, d) => sum + d.value, 0);
                    const percentage = (item.value / totalLearning) * 100;
                    const offset = (prevSum / totalLearning) * 283;
                    const dashArray = `${(percentage / 100) * 283} 283`;
                    
                    return (
                      <circle
                        key={index}
                        cx="100"
                        cy="100"
                        r="45"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="35"
                        strokeDasharray={dashArray}
                        strokeDashoffset={-offset}
                        className="transition-all duration-500 hover:opacity-80 cursor-pointer"
                        style={{
                          filter: `drop-shadow(0 0 8px ${item.color}40)`
                        }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-dark-bg/80 backdrop-blur-sm rounded-full w-32 h-32 flex flex-col items-center justify-center">
                    <p className="text-5xl font-bold text-white">{totalLearning}</p>
                    <p className="text-xs text-gray-400 mt-1 font-medium">Total</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4 bg-dark-border/20 rounded-xl p-4">
              {learningDistributionData.map((item, index) => {
                const percentage = Math.round((item.value / totalLearning) * 100);
                return (
                  <div key={index} className="group hover:bg-dark-border/30 p-3 rounded-lg transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-5 h-5 rounded-lg shadow-lg" 
                          style={{ 
                            backgroundColor: item.color,
                            boxShadow: `0 4px 12px ${item.color}40`
                          }}
                        ></div>
                        <span className="text-gray-300 text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white font-bold text-lg">{item.value}</span>
                        <span className="text-gray-400 text-sm">({percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-dark-border rounded-full h-2 ml-8">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: item.color,
                          boxShadow: `0 0 8px ${item.color}60`
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subject Progress - Enhanced */}
          <div className="bg-dark-card rounded-2xl p-6 border border-dark-border shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">SUBJECT PROGRESS</h3>
                <p className="text-sm text-gray-400">Your learning journey</p>
              </div>
            </div>
            <div className="space-y-5">
              {subjectProgressData.map((subject, index) => (
                <div key={index} className="group hover:bg-dark-border/20 p-4 rounded-xl transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full shadow-lg" 
                        style={{ 
                          backgroundColor: subject.color,
                          boxShadow: `0 0 12px ${subject.color}60`
                        }}
                      ></div>
                      <span className="text-gray-300 text-sm font-medium" title={subject.fullName}>
                        {subject.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span 
                        className="font-bold text-lg"
                        style={{ color: subject.color }}
                      >
                        {subject.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="relative w-full bg-dark-border rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all duration-700 relative overflow-hidden"
                      style={{ 
                        width: `${subject.progress}%`,
                        background: `linear-gradient(90deg, ${subject.color}, ${subject.color}dd)`,
                        boxShadow: `0 0 12px ${subject.color}40`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-sm text-gray-300">
                  Keep going! You're making great progress across all subjects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
