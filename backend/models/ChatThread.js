const mongoose = require('mongoose');

const chatThreadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  botType: {
    type: String,
    enum: ['wellness', 'career'],
    required: true
  },
  title: {
    type: String,
    default: 'New Conversation'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ChatThread', chatThreadSchema);
