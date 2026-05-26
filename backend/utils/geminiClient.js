const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini API (optional)
let genAI = null;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// Wellness response templates
const wellnessResponses = {
  stress: [
    "I understand you're feeling stressed. It's completely normal, especially with academic pressures. Try the 4-7-8 breathing technique: breathe in for 4 counts, hold for 7, exhale for 8. This activates your parasympathetic nervous system and helps calm your mind.\n\nAlso, consider breaking your tasks into smaller chunks. Sometimes stress comes from feeling overwhelmed by the big picture. What specific aspect is stressing you most? Let's tackle it together.",
    "Stress is your body's way of signaling that you need to pause and recharge. Have you tried a 5-minute mindfulness break? Just close your eyes, focus on your breath, and let thoughts pass without judgment.\n\nRemember, it's okay to not be productive 24/7. Your mental health is more important than any deadline. What self-care activity makes you feel most relaxed?"
  ],
  anxiety: [
    "Anxiety can feel overwhelming, but you're not alone in this. Try grounding yourself with the 5-4-3-2-1 technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste. This brings you back to the present moment.\n\nIt's also helpful to write down your worries. Sometimes getting them out of your head and onto paper makes them feel more manageable. Would you like to talk about what's making you anxious?",
    "I hear you, and your feelings are valid. Anxiety often makes us imagine worst-case scenarios, but remember: thoughts are not facts. Challenge those anxious thoughts by asking 'What evidence do I have for this?' and 'What would I tell a friend in this situation?'\n\nPhysical activity can also help - even a 10-minute walk can reduce anxiety significantly. What usually helps you feel calmer?"
  ],
  sleep: [
    "Sleep is crucial for your mental and physical health. Try establishing a wind-down routine: no screens 30 minutes before bed, keep your room cool and dark, and try reading or gentle stretching.\n\nIf racing thoughts keep you awake, try the 'mental dump' technique - write everything on your mind in a journal before bed. This tells your brain it's safe to rest because you've captured those thoughts. What time do you usually try to sleep?",
    "Poor sleep can affect everything from mood to memory. Consider the 10-3-2-1-0 rule: no caffeine 10 hours before bed, no food 3 hours before, no work 2 hours before, no screens 1 hour before, and 0 times hitting snooze.\n\nAlso, try to wake up at the same time every day, even weekends. This regulates your circadian rhythm. How many hours of sleep are you currently getting?"
  ],
  motivation: [
    "Lack of motivation is often a sign you need rest, not more pressure. Start with tiny goals - just 5 minutes of the task. Often, starting is the hardest part, and momentum builds naturally.\n\nAlso, reconnect with your 'why'. Why did you start this journey? What are your long-term goals? Sometimes we lose motivation when we forget the bigger picture. What made you excited about your studies initially?",
    "It's okay to have low-motivation days. You're human, not a machine. Try the 'two-minute rule' - commit to just two minutes of work. Usually, you'll keep going once you start.\n\nCelebrate small wins too. Finished one assignment? That's progress! Motivation often follows action, not the other way around. What's one small thing you can accomplish today?"
  ],
  default: [
    "Thank you for sharing with me. Your mental wellbeing matters, and I'm here to support you. Remember, it's okay to not be okay sometimes. What you're feeling is valid.\n\nTaking care of your mental health is just as important as your academic success. Have you tried any relaxation techniques lately? Sometimes simple practices like deep breathing, journaling, or talking to someone can make a big difference. How can I best support you today?",
    "I appreciate you opening up. Mental wellness is a journey, not a destination. Be patient and kind with yourself. You're doing better than you think.\n\nConsider incorporating small wellness practices into your daily routine: morning gratitude, midday movement breaks, or evening reflection. What aspect of your wellbeing would you like to focus on improving?"
  ]
};

const getWellnessResponse = async (message, conversationHistory = []) => {
  const lowerMessage = message.toLowerCase();
  
  // Try Gemini API first if available
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        },
      });

      const systemPrompt = `You are a compassionate mental wellness assistant for students named "WellnessBot". Provide supportive, empathetic responses focused on mental health. Keep responses concise (2-3 paragraphs), warm, and actionable.`;

      let context = '';
      if (conversationHistory.length > 0) {
        context = '\n\nPrevious conversation:\n' + conversationHistory
          .slice(-5)
          .map(msg => `${msg.sender === 'user' ? 'Student' : 'WellnessBot'}: ${msg.message}`)
          .join('\n');
      }

      const fullPrompt = `${systemPrompt}${context}\n\nStudent: ${message}\n\nWellnessBot:`;
      const result = await model.generateContent(fullPrompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.log('Gemini API unavailable, using fallback responses');
    }
  }
  
  // Fallback to template responses
  let responses = wellnessResponses.default;
  
  if (lowerMessage.includes('stress') || lowerMessage.includes('stressed') || lowerMessage.includes('pressure')) {
    responses = wellnessResponses.stress;
  } else if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || lowerMessage.includes('nervous')) {
    responses = wellnessResponses.anxiety;
  } else if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia') || lowerMessage.includes('rest')) {
    responses = wellnessResponses.sleep;
  } else if (lowerMessage.includes('motivat') || lowerMessage.includes('lazy') || lowerMessage.includes('procrastinat') || lowerMessage.includes('focus')) {
    responses = wellnessResponses.motivation;
  }
  
  // Return random response from selected category
  return responses[Math.floor(Math.random() * responses.length)];
};

// Career response templates
const careerResponses = {
  'Computer Science': {
    skills: "For Computer Science, focus on mastering data structures, algorithms, and system design. Learn popular languages like Python, JavaScript, and Java. Build projects that showcase your problem-solving skills - contribute to open source, create a portfolio website, or develop a full-stack application.\n\nStay updated with cloud technologies (AWS, Azure), containerization (Docker, Kubernetes), and modern frameworks. Practice coding on platforms like LeetCode and HackerRank. The key is consistent practice and building real-world projects.",
    career: "Computer Science offers diverse career paths: Software Engineer, Data Scientist, DevOps Engineer, Security Analyst, or Product Manager. Start by identifying what excites you most - building products, analyzing data, or securing systems?\n\nInternships are crucial. Apply early, network on LinkedIn, and don't be discouraged by rejections. Many successful developers faced dozens of rejections before landing their first role. What specific area interests you most?",
    interview: "For tech interviews, master the fundamentals: arrays, strings, trees, graphs, and dynamic programming. Use the STAR method for behavioral questions. Practice explaining your thought process clearly - interviewers care about how you think, not just the solution.\n\nMock interviews are invaluable. Use Pramp or interviewing.io for practice. Remember, every interview is a learning opportunity, even if you don't get the offer. What type of role are you preparing for?"
  },
  'Business': {
    skills: "Business success requires both hard and soft skills. Develop strong analytical abilities with Excel, SQL, and data visualization tools like Tableau. Learn financial modeling and understand key business metrics.\n\nEqually important are communication, leadership, and strategic thinking. Join business clubs, participate in case competitions, and seek leadership roles. These experiences are often more valuable than grades alone.",
    career: "Business graduates can pursue consulting, finance, marketing, operations, or entrepreneurship. Each path requires different skills. Consulting values problem-solving and communication, while finance emphasizes analytical rigor.\n\nNetworking is crucial in business. Attend industry events, connect with alumni, and build genuine relationships. Many opportunities come through referrals. What business area interests you most?",
    interview: "Business interviews often include case studies. Practice frameworks like Porter's Five Forces, SWOT analysis, and the 4Ps of marketing. Structure your answers clearly: situation, approach, analysis, recommendation.\n\nFor behavioral questions, prepare stories that demonstrate leadership, teamwork, and problem-solving. Quantify your impact whenever possible. Research the company thoroughly and prepare thoughtful questions. What industry are you targeting?"
  },
  default: {
    skills: "Focus on building both technical and soft skills relevant to your field. Technical skills get you the interview, but soft skills like communication, teamwork, and adaptability help you succeed long-term.\n\nCreate a learning plan: identify skills gaps, set specific goals, and practice consistently. Online courses, certifications, and hands-on projects are great ways to learn. What specific skills are you looking to develop?",
    career: "Career planning is about aligning your interests, skills, and market demand. Research different roles in your field, talk to professionals, and try internships or projects to gain exposure.\n\nDon't worry if you're unsure about your exact path - many successful professionals pivoted multiple times. Focus on continuous learning and building transferable skills. What aspects of your field excite you most?",
    interview: "Interview preparation has three components: technical knowledge, behavioral responses, and company research. Practice common questions, prepare specific examples from your experience, and understand the company's mission and challenges.\n\nConfidence comes from preparation. Do mock interviews, get feedback, and learn from each experience. Remember, interviews are two-way - you're also evaluating if the company is right for you. What type of position are you interviewing for?"
  }
};

const getCareerResponse = async (message, userField, conversationHistory = []) => {
  const lowerMessage = message.toLowerCase();
  
  // Try Gemini API first if available
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        },
      });

      const systemPrompt = `You are an expert career guidance counselor named "CareerBot" specializing in ${userField}. Provide practical career advice and guidance. Keep responses concise (2-3 paragraphs), professional yet friendly, and actionable.`;

      let context = '';
      if (conversationHistory.length > 0) {
        context = '\n\nPrevious conversation:\n' + conversationHistory
          .slice(-5)
          .map(msg => `${msg.sender === 'user' ? 'Student' : 'CareerBot'}: ${msg.message}`)
          .join('\n');
      }

      const fullPrompt = `${systemPrompt}${context}\n\nStudent: ${message}\n\nCareerBot:`;
      const result = await model.generateContent(fullPrompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.log('Gemini API unavailable, using fallback responses');
    }
  }
  
  // Fallback to template responses
  const fieldResponses = careerResponses[userField] || careerResponses.default;
  
  if (lowerMessage.includes('skill') || lowerMessage.includes('learn') || lowerMessage.includes('technology') || lowerMessage.includes('course')) {
    return fieldResponses.skills;
  } else if (lowerMessage.includes('interview') || lowerMessage.includes('prepare') || lowerMessage.includes('question')) {
    return fieldResponses.interview;
  } else {
    return fieldResponses.career;
  }
};

// Test function to verify API key
const testGeminiConnection = async () => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.log('⚠️  Gemini API key not configured - using fallback responses');
    console.log('💡 Chatbots will work with pre-written intelligent responses');
    return false;
  }
  
  if (!genAI) {
    console.log('⚠️  Gemini API not initialized - using fallback responses');
    return false;
  }
  
  try {
    console.log('🔍 Testing Gemini API connection...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Hello, respond with "API working"');
    const text = result.response.text();
    console.log('✅ Gemini API connection successful!');
    return true;
  } catch (error) {
    console.log('⚠️  Gemini API unavailable - using fallback responses');
    console.log('💡 Chatbots will work with pre-written intelligent responses');
    return false;
  }
};

module.exports = { 
  getWellnessResponse, 
  getCareerResponse,
  testGeminiConnection 
};
