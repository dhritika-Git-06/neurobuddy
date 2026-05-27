const User = require('../models/User');

// Returns today's date as 'YYYY-MM-DD' in local time
const todayKey = () => {
  const d = new Date();
  return d.toISOString().slice(0, 10);
};

// Returns yesterday's date as 'YYYY-MM-DD'
const yesterdayKey = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};

/**
 * Called whenever a user completes a video or quiz.
 * Rules:
 *  - If lastStreakDate === today  → already checked in today, no change
 *  - If lastStreakDate === yesterday → consecutive day, streak++
 *  - Anything older (or null)    → streak resets to 1 (new streak starts)
 * maxStreak is updated whenever streak exceeds it.
 */
const updateStreak = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return null;

    const today = todayKey();
    const yesterday = yesterdayKey();
    const last = user.lastStreakDate;

    if (last === today) {
      // Already checked in today — nothing to do
      return { streak: user.streak, maxStreak: user.maxStreak };
    }

    if (last === yesterday) {
      // Consecutive day — extend streak
      user.streak += 1;
    } else {
      // Missed a day or first ever check-in — reset to 1
      user.streak = 1;
    }

    // Update max streak
    if (user.streak > (user.maxStreak || 0)) {
      user.maxStreak = user.streak;
    }

    user.lastStreakDate = today;
    user.lastActivity = new Date();
    await user.save();

    return { streak: user.streak, maxStreak: user.maxStreak };
  } catch (error) {
    console.error('Streak update error:', error);
    return null;
  }
};

/**
 * Called on profile/analytics load.
 * If the user hasn't checked in for more than 1 day (i.e. lastStreakDate
 * is neither today nor yesterday), their current streak resets to 0.
 * maxStreak is never reduced.
 */
const checkAndResetStreak = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    const today = todayKey();
    const yesterday = yesterdayKey();
    const last = user.lastStreakDate;

    // If last activity was neither today nor yesterday, streak is broken
    if (last && last !== today && last !== yesterday) {
      user.streak = 0;
      await user.save();
    }
  } catch (error) {
    console.error('Streak check error:', error);
  }
};

module.exports = { updateStreak, checkAndResetStreak };
