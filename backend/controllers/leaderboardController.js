const User = require('../models/User');
const QuizResult = require('../models/QuizResult');
const VideoProgress = require('../models/VideoProgress');

const getLeaderboard = async (req, res, next) => {
  try {
    const { fieldOfStudy } = req.query;

    // Get all users in the same field of study
    const users = await User.find(
      fieldOfStudy ? { fieldOfStudy } : {}
    ).select('name email fieldOfStudy streak');

    // Calculate scores for each user
    const leaderboardData = await Promise.all(
      users.map(async (user) => {
        // Get quiz results
        const quizResults = await QuizResult.find({ userId: user._id });
        const totalQuizzes = quizResults.length;
        const avgQuizScore = quizResults.length > 0
          ? quizResults.reduce((acc, r) => acc + (r.score / r.totalQuestions) * 100, 0) / quizResults.length
          : 0;

        // Get video progress
        const videoProgress = await VideoProgress.find({ userId: user._id });
        const completedVideos = videoProgress.filter(v => v.completed).length;

        // Calculate total score
        const totalScore = Math.round(
          (avgQuizScore * 0.5) + // 50% weight for quiz scores
          (completedVideos * 10) + // 10 points per completed video
          (user.streak * 5) // 5 points per streak day
        );

        return {
          userId: user._id,
          name: user.name,
          email: user.email,
          fieldOfStudy: user.fieldOfStudy,
          streak: user.streak,
          totalQuizzes,
          avgQuizScore: Math.round(avgQuizScore),
          completedVideos,
          totalScore
        };
      })
    );

    // Sort by total score descending
    leaderboardData.sort((a, b) => b.totalScore - a.totalScore);

    // Add rank
    const rankedLeaderboard = leaderboardData.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    res.json({
      success: true,
      leaderboard: rankedLeaderboard,
      currentUser: rankedLeaderboard.find(u => u.userId.toString() === req.user._id.toString())
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLeaderboard };
