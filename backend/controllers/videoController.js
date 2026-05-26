const VideoProgress = require('../models/VideoProgress');
const { updateStreak } = require('../utils/streakManager');

const getVideoProgress = async (req, res, next) => {
  try {
    const progress = await VideoProgress.find({ userId: req.user._id });
    res.json({ success: true, progress });
  } catch (error) {
    next(error);
  }
};

const updateVideoProgress = async (req, res, next) => {
  try {
    const { videoId, subjectId, percentage } = req.body;

    let progress = await VideoProgress.findOne({ userId: req.user._id, videoId });

    if (progress) {
      progress.percentage = percentage;
      progress.completed = percentage >= 90;
      progress.lastWatched = Date.now();
    } else {
      progress = await VideoProgress.create({
        userId: req.user._id,
        videoId,
        subjectId,
        percentage,
        completed: percentage >= 90
      });
    }

    await progress.save();

    if (progress.completed) {
      await updateStreak(req.user._id);
    }

    res.json({ success: true, progress });
  } catch (error) {
    next(error);
  }
};

module.exports = { getVideoProgress, updateVideoProgress };
