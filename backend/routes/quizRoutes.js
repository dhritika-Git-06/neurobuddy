const express = require('express');
const { getQuizzesBySubject, getQuizById, submitQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/subject/:subjectId', getQuizzesBySubject);
router.get('/:subjectId/:quizId', getQuizById);
router.post('/submit', submitQuiz);

module.exports = router;
