const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fieldOfStudy: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  roadmap: [{
    phase: String,
    title: String,
    description: String,
    duration: String
  }],
  videos: [{
    title: String,
    url: String,
    duration: String,
    description: String
  }],
  quizzes: [{
    title: String,
    questions: [{
      question: String,
      options: [String],
      correctAnswer: Number
    }]
  }],
  assignments: [{
    title: String,
    description: String,
    deadline: Date
  }],
  careerPaths: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subject', subjectSchema);
