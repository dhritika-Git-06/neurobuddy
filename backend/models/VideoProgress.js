const mongoose = require('mongoose');

const videoProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videoId: {
    type: String,
    required: true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  percentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  completed: {
    type: Boolean,
    default: false
  },
  lastWatched: {
    type: Date,
    default: Date.now
  }
});

videoProgressSchema.index({ userId: 1, videoId: 1 }, { unique: true });

module.exports = mongoose.model('VideoProgress', videoProgressSchema);
