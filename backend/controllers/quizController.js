const Subject = require('../models/Subject');
const QuizResult = require('../models/QuizResult');
const { updateStreak } = require('../utils/streakManager');

const getQuizzesBySubject = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const quizzes = subject.quizzes.map(quiz => ({
      _id: quiz._id,
      title: quiz.title,
      questionCount: quiz.questions.length
    }));

    res.json({ success: true, quizzes });
  } catch (error) {
    next(error);
  }
};

const getQuizById = async (req, res, next) => {
  try {
    const { subjectId, quizId } = req.params;
    const subject = await Subject.findById(subjectId);
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const quiz = subject.quizzes.id(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const quizData = {
      _id: quiz._id,
      title: quiz.title,
      questions: quiz.questions.map(q => ({
        question: q.question,
        options: q.options
      }))
    };

    res.json({ success: true, quiz: quizData });
  } catch (error) {
    next(error);
  }
};

const submitQuiz = async (req, res, next) => {
  try {
    const { subjectId, quizId, answers } = req.body;

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const quiz = subject.quizzes.id(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    const detailedAnswers = answers.map((answer, index) => {
      const isCorrect = quiz.questions[index].correctAnswer === answer;
      if (isCorrect) score++;
      return {
        questionIndex: index,
        selectedAnswer: answer,
        isCorrect
      };
    });

    const result = await QuizResult.create({
      userId: req.user._id,
      subjectId,
      quizId,
      score,
      totalQuestions: quiz.questions.length,
      answers: detailedAnswers
    });

    if (score >= quiz.questions.length * 0.7) {
      await updateStreak(req.user._id);
    }

    res.json({ 
      success: true, 
      result: {
        score,
        totalQuestions: quiz.questions.length,
        percentage: (score / quiz.questions.length) * 100,
        passed: score >= quiz.questions.length * 0.7
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getQuizzesBySubject, getQuizById, submitQuiz };
