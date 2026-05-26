const express = require('express');
const { getVideoProgress, updateVideoProgress } = require('../controllers/videoController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/progress', getVideoProgress);
router.put('/progress', updateVideoProgress);

module.exports = router;
