const User = require('../models/User');

const updateStreak = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    const now = new Date();
    const lastActivity = new Date(user.lastActivity);
    const hoursDiff = (now - lastActivity) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      user.streak = 1;
    } else if (hoursDiff > 1) {
      user.streak += 1;
    }

    user.lastActivity = now;
    await user.save();

    return user.streak;
  } catch (error) {
    console.error('Streak update error:', error);
    return null;
  }
};

const checkAndResetStreak = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    const now = new Date();
    const lastActivity = new Date(user.lastActivity);
    const hoursDiff = (now - lastActivity) / (1000 * 60 * 60);

    if (hoursDiff > 48) {
      user.streak = 0;
      await user.save();
    }
  } catch (error) {
    console.error('Streak check error:', error);
  }
};

module.exports = { updateStreak, checkAndResetStreak };
