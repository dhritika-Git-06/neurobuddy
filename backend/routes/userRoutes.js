const express = require('express');
const { getProfile, getAnalytics, getPublicProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.get('/analytics', getAnalytics);
router.get('/public/:userId', getPublicProfile);

module.exports = router;
