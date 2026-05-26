const express = require('express');
const { sendMessage, getChatHistory, getThreadMessages } = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/message', sendMessage);
router.get('/history/:botType', getChatHistory);
router.get('/thread/:threadId', getThreadMessages);

module.exports = router;
