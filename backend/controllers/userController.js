const User = require('../models/User');
const QuizResult = require('../models/QuizResult');
const VideoProgress = require('../models/VideoProgress');
const mongoose = require('mongoose');
const { checkAndResetStreak } = require('../utils/streakManager');

const getProfile = async (req, res, next) => {
  try {
    await checkAndResetStreak(req.user._id);
    const user = await User.findById(req.user._id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Always fetch fresh user from DB so streak is current
    const freshUser = await User.findById(userId).select('streak maxStreak');

    const quizResults = await QuizResult.find({ userId })
      .sort({ date: -1 })
      .populate('subjectId', 'name');

    const videoProgress = await VideoProgress.find({ userId });

    const totalVideos = videoProgress.length;
    const completedVideos = videoProgress.filter(v => v.completed).length;
    const videoCompletionRate = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;

    const avgQuizScore = quizResults.length > 0
      ? quizResults.reduce((acc, r) => acc + (r.score / r.totalQuestions) * 100, 0) / quizResults.length
      : 0;

    // Build a map of existing quiz results grouped by date
    const quizByDate = await QuizResult.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          count: { $sum: 1 },
          avgScore: { $avg: { $multiply: [{ $divide: ['$score', '$totalQuestions'] }, 100] } }
        }
      }
    ]);

    const quizMap = {};
    quizByDate.forEach(d => { quizMap[d._id] = { count: d.count, avgScore: Math.round(d.avgScore) }; });

    // Generate last 7 days always — fill 0 for days with no activity
    const weeklyProgress = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      weeklyProgress.push({
        _id: key,
        count: quizMap[key]?.count || 0,
        avgScore: quizMap[key]?.avgScore || 0
      });
    }

    // Monthly progress for trend chart
    const monthlyProgress = await QuizResult.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
          count: { $sum: 1 },
          avgScore: { $avg: { $multiply: [{ $divide: ['$score', '$totalQuestions'] }, 100] } }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 6 }
    ]);

    res.json({
      success: true,
      analytics: {
        streak: freshUser.streak,
        maxStreak: freshUser.maxStreak || 0,
        totalQuizzes: quizResults.length,
        avgQuizScore: Math.round(avgQuizScore),
        videoCompletionRate: Math.round(videoCompletionRate),
        completedVideos,
        totalVideos,
        weeklyProgress,
        monthlyProgress,
        recentQuizzes: quizResults.slice(0, 5)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getPublicProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const quizResults = await QuizResult.find({ userId })
      .sort({ date: -1 })
      .populate('subjectId', 'name');

    const videoProgress = await VideoProgress.find({ userId });

    const totalVideos = videoProgress.length;
    const completedVideos = videoProgress.filter(v => v.completed).length;
    const videoCompletionRate = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;

    const avgQuizScore = quizResults.length > 0
      ? quizResults.reduce((acc, r) => acc + (r.score / r.totalQuestions) * 100, 0) / quizResults.length
      : 0;

    const weeklyProgress = await QuizResult.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          count: { $sum: 1 },
          avgScore: { $avg: { $multiply: [{ $divide: ['$score', '$totalQuestions'] }, 100] } }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 14 }
    ]);

    const monthlyProgress = await QuizResult.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
          count: { $sum: 1 },
          avgScore: { $avg: { $multiply: [{ $divide: ['$score', '$totalQuestions'] }, 100] } }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 12 }
    ]);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        fieldOfStudy: user.fieldOfStudy,
        streak: user.streak,
        createdAt: user.createdAt
      },
      analytics: {
        totalQuizzes: quizResults.length,
        avgQuizScore: Math.round(avgQuizScore),
        videoCompletionRate: Math.round(videoCompletionRate),
        completedVideos,
        totalVideos,
        weeklyProgress: weeklyProgress.reverse(),
        monthlyProgress: monthlyProgress.reverse(),
        recentQuizzes: quizResults.slice(0, 10)
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, getAnalytics, getPublicProfile };
