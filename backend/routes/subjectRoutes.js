const express = require('express');
const { getAllSubjects, getSubjectById } = require('../controllers/subjectController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);

module.exports = router;
