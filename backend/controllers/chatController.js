const ChatThread = require('../models/ChatThread');
const ChatMessage = require('../models/ChatMessage');
const { getWellnessResponse, getCareerResponse } = require('../utils/geminiClient');

const sendMessage = async (req, res, next) => {
  try {
    const { message, botType, threadId } = req.body;

    // Validate input
    if (!message || !message.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    if (!botType || !['wellness', 'career'].includes(botType)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid bot type. Must be "wellness" or "career"' 
      });
    }

    let thread;
    if (threadId) {
      thread = await ChatThread.findById(threadId);
      if (!thread) {
        return res.status(404).json({ 
          success: false, 
          error: 'Chat thread not found' 
        });
      }
    } else {
      thread = await ChatThread.create({
        userId: req.user._id,
        botType,
        title: message.substring(0, 50)
      });
    }

    // Save user message
    await ChatMessage.create({
      threadId: thread._id,
      sender: 'user',
      message
    });

    // Get conversation history
    const history = await ChatMessage.find({ threadId: thread._id })
      .sort({ timestamp: 1 })
      .limit(10);

    // Get AI response
    let botResponse;
    try {
      if (botType === 'wellness') {
        botResponse = await getWellnessResponse(message, history);
      } else {
        botResponse = await getCareerResponse(message, req.user.fieldOfStudy, history);
      }
    } catch (aiError) {
      console.error('AI Response Error:', aiError);
      // Provide a fallback response
      botResponse = botType === 'wellness' 
        ? "I'm here to support you! I'm experiencing a brief technical issue. Please try again in a moment. Remember, your wellbeing matters! 💙"
        : "I'm here to help with your career! I'm experiencing a brief technical issue. Please try again in a moment. Let's work on your career goals together! 🚀";
    }

    // Save bot response
    const botMessage = await ChatMessage.create({
      threadId: thread._id,
      sender: 'bot',
      message: botResponse
    });

    // Update thread timestamp
    thread.updatedAt = Date.now();
    await thread.save();

    res.json({
      success: true,
      threadId: thread._id,
      response: botResponse,
      message: botMessage
    });
  } catch (error) {
    console.error('Chat Controller Error:', error);
    next(error);
  }
};

const getChatHistory = async (req, res, next) => {
  try {
    const { botType } = req.params;
    const threads = await ChatThread.find({ 
      userId: req.user._id, 
      botType 
    }).sort({ updatedAt: -1 });

    res.json({ success: true, threads });
  } catch (error) {
    next(error);
  }
};

const getThreadMessages = async (req, res, next) => {
  try {
    const { threadId } = req.params;
    const messages = await ChatMessage.find({ threadId }).sort({ timestamp: 1 });
    res.json({ success: true, messages });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getChatHistory, getThreadMessages };
