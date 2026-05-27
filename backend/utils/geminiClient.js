const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
let genAI = null;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// ─── WELLNESS BOT ─────────────────────────────────────────────────────────────

const WELLNESS_SYSTEM = `You are WellnessBot, a warm and empathetic mental health companion built into NeuroBuddy — an AI-powered student learning platform. Your role is to support students with their emotional and psychological wellbeing.

Your personality:
- Warm, caring, and non-judgmental — like a trusted friend who happens to know a lot about mental health
- Evidence-based: you reference real techniques (CBT, mindfulness, breathing exercises, grounding)
- Concise but meaningful: 2–4 short paragraphs, never a wall of text
- Always end with a follow-up question or an actionable suggestion
- Never diagnose. If someone seems in crisis, gently suggest professional help and provide helpline info (iCall: 9152987821)

Topics you handle well:
- Academic stress, exam anxiety, burnout
- Sleep problems, fatigue
- Loneliness, low motivation, procrastination
- Relationship issues, self-esteem
- General emotional support and mindfulness

Always respond in a conversational, human tone. Do not use bullet points or headers — write naturally like you're talking to the student.`;

const getWellnessResponse = async (message, conversationHistory = []) => {
  // Try Gemini with proper multi-turn chat
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.85,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 600,
        },
        systemInstruction: WELLNESS_SYSTEM,
      });

      // Build proper Gemini chat history format
      const history = conversationHistory
        .slice(-8) // last 8 messages for context
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.message }],
        }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(message);
      return result.response.text();
    } catch (error) {
      console.log('Gemini API error:', error.message, '— using smart fallback');
    }
  }

  // Smart fallback — keyword-based but detailed
  return getWellnessFallback(message);
};

// ─── CAREER BOT ───────────────────────────────────────────────────────────────

const getCareerSystemPrompt = (field) => `You are CareerBot, an expert career guidance counselor built into NeuroBuddy — an AI-powered student learning platform. You specialize in helping students studying ${field} navigate their career journey.

Your personality:
- Professional yet approachable — like a senior mentor who genuinely wants you to succeed
- Specific and actionable: give real advice, real tools, real platforms (LinkedIn, LeetCode, Coursera, etc.)
- Field-aware: tailor every response to ${field} specifically
- Concise: 2–4 short paragraphs, conversational tone
- Always end with a question or next step to keep the conversation going

Topics you handle well:
- Career paths and job roles in ${field}
- Skills to learn, certifications, tools
- Resume, LinkedIn, portfolio building
- Interview preparation (technical + behavioral)
- Internships, placements, networking
- Higher education (Masters, MBA, PhD)

Do not use bullet points or headers. Write naturally and conversationally.`;

const getCareerResponse = async (message, userField, conversationHistory = []) => {
  // Try Gemini with proper multi-turn chat
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.8,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 600,
        },
        systemInstruction: getCareerSystemPrompt(userField || 'your field'),
      });

      // Build proper Gemini chat history format
      const history = conversationHistory
        .slice(-8)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.message }],
        }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(message);
      return result.response.text();
    } catch (error) {
      console.log('Gemini API error:', error.message, '— using smart fallback');
    }
  }

  // Smart fallback
  return getCareerFallback(message, userField);
};

// ─── SMART FALLBACKS ──────────────────────────────────────────────────────────

const getWellnessFallback = (message) => {
  const m = message.toLowerCase();

  if (m.includes('stress') || m.includes('overwhelm') || m.includes('pressure') || m.includes('burden')) {
    return "It sounds like you're carrying a lot right now, and I want you to know that's completely valid. Academic pressure can feel suffocating sometimes, especially when everything piles up at once.\n\nOne thing that genuinely helps is the 4-7-8 breathing technique — breathe in for 4 counts, hold for 7, exhale slowly for 8. Do it three times and you'll feel your nervous system start to calm down. It sounds simple, but the science behind it is solid.\n\nAlso, try breaking whatever's overwhelming you into the smallest possible next step. Not the whole task — just the next five minutes of it. What's the one thing that's stressing you the most right now?";
  }

  if (m.includes('anxious') || m.includes('anxiety') || m.includes('panic') || m.includes('nervous') || m.includes('worried') || m.includes('fear')) {
    return "Anxiety has a way of making everything feel urgent and catastrophic, even when it isn't. What you're feeling is real, and it makes sense that your mind is trying to protect you — it's just being a little overzealous right now.\n\nTry the 5-4-3-2-1 grounding technique: name 5 things you can see, 4 you can physically touch, 3 you can hear, 2 you can smell, and 1 you can taste. It pulls your brain out of the anxiety spiral and back into the present moment.\n\nAnxiety also tends to shrink when we write it down. What's the specific thought or situation that's triggering this for you?";
  }

  if (m.includes('sleep') || m.includes('insomnia') || m.includes('tired') || m.includes('exhausted') || m.includes('cant sleep')) {
    return "Sleep problems are incredibly common among students, and they create a frustrating cycle — you're tired but can't sleep, which makes you more anxious, which makes sleep harder. Let's break that cycle.\n\nThe most effective thing you can do tonight is a 'brain dump' — spend 10 minutes writing down everything on your mind before bed. It signals to your brain that those thoughts are captured and it's safe to let go. Also, keep your room cool (around 18–20°C) and avoid screens for at least 30 minutes before sleeping.\n\nHow long has this been going on, and do you have a rough idea of what's keeping your mind active at night?";
  }

  if (m.includes('motivat') || m.includes('lazy') || m.includes('procrastinat') || m.includes('cant focus') || m.includes('distract')) {
    return "Low motivation isn't a character flaw — it's usually a signal that you're either burnt out, disconnected from your 'why', or your brain needs a reset. All of those are fixable.\n\nTry the two-minute rule: commit to doing just two minutes of the thing you're avoiding. That's it. Most of the time, starting is the hardest part, and once you're in motion, you'll keep going. If you genuinely stop after two minutes, that's okay too — at least you started.\n\nAlso, when did you last do something that had nothing to do with studying or productivity? Sometimes the best thing for motivation is a genuine break. What subject or task are you struggling to get started on?";
  }

  if (m.includes('sad') || m.includes('depress') || m.includes('lonely') || m.includes('empty') || m.includes('hopeless') || m.includes('worthless')) {
    return "I'm really glad you're talking about this, and I want you to know that what you're feeling matters. Feeling sad, empty, or hopeless — especially during a demanding academic period — is more common than people admit, and it doesn't mean something is permanently wrong with you.\n\nPlease be gentle with yourself today. Even small acts of self-care count — a warm shower, a proper meal, stepping outside for five minutes. These aren't cures, but they're anchors.\n\nIf these feelings have been lasting more than a couple of weeks, I'd really encourage you to speak with a counselor or call iCall at 9152987821 — they're free, confidential, and genuinely helpful. Are you comfortable sharing a bit more about what's been going on?";
  }

  if (m.includes('hello') || m.includes('hi') || m.includes('hey') || m.includes('hii') || m.includes('helo')) {
    return "Hey! I'm WellnessBot, your mental health companion here on NeuroBuddy. I'm here to listen, support, and help you navigate whatever you're going through — whether it's exam stress, sleep issues, anxiety, motivation slumps, or just needing someone to talk to.\n\nEverything you share here is just between us. So, how are you doing today? What's on your mind?";
  }

  // Default
  return "Thank you for reaching out — it takes courage to talk about how you're feeling, and I'm genuinely here for it.\n\nWhatever you're going through right now, you don't have to figure it out alone. Whether it's stress, anxiety, low energy, relationship stuff, or just feeling off — this is a safe space to talk it through.\n\nI'm also here to share practical techniques that actually work, not just generic advice. So tell me — what's been weighing on you lately?";
};

const getCareerFallback = (message, field) => {
  const m = message.toLowerCase();
  const f = field || 'your field';

  if (m.includes('interview') || m.includes('prepare') || m.includes('question') || m.includes('hr')) {
    return `Interview prep for ${f} comes down to three things: knowing your fundamentals cold, having strong stories ready for behavioral questions, and researching the company deeply.\n\nFor behavioral questions, use the STAR format — Situation, Task, Action, Result. Have 5–6 strong stories from your projects or experiences that you can adapt to different questions. For technical rounds, practice explaining your thought process out loud, not just getting the right answer.\n\nOne underrated tip: prepare 2–3 thoughtful questions to ask the interviewer. It shows genuine interest and often leaves a stronger impression than the interview itself. What kind of role or company are you preparing for?`;
  }

  if (m.includes('skill') || m.includes('learn') || m.includes('course') || m.includes('certif') || m.includes('technology')) {
    return `For ${f}, the most valuable thing you can do right now is build something real. Courses and certifications matter, but a project you built from scratch — even a small one — tells employers far more about your abilities.\n\nFocus on the fundamentals of your field first, then layer on the tools that employers are actually hiring for. Check job descriptions on LinkedIn for roles you want — the skills listed there are your roadmap.\n\nPlatforms like Coursera, Udemy, and YouTube have excellent free and paid content. But don't fall into the trap of endless learning without building. What specific skill or technology are you trying to develop?`;
  }

  if (m.includes('resume') || m.includes('cv') || m.includes('linkedin') || m.includes('portfolio')) {
    return `Your resume and LinkedIn are your first impression, and most recruiters spend less than 10 seconds on an initial scan. Make those seconds count.\n\nFor your resume: lead with impact, not responsibilities. Instead of "worked on a web app", write "built a full-stack web application used by 200+ students". Quantify everything you can. Keep it to one page if you're a student or recent graduate.\n\nFor LinkedIn: a professional photo, a strong headline (not just your degree), and a summary that tells your story make a huge difference. Connect with people in roles you want and engage with their content — visibility matters. Want me to help you think through how to frame a specific experience?`;
  }

  if (m.includes('hello') || m.includes('hi') || m.includes('hey') || m.includes('hii')) {
    return `Hey! I'm CareerBot, your career guidance companion on NeuroBuddy. I'm here to help you navigate your career in ${f} — whether that's figuring out what roles to target, what skills to build, how to prep for interviews, or how to stand out in a competitive job market.\n\nI give real, specific advice — not generic tips you've already heard. So, what's on your career radar right now?`;
  }

  return `Career growth in ${f} is a mix of building the right skills, creating visibility, and making strategic moves at the right time. The good news is that all of those are learnable.\n\nThe students who stand out aren't always the ones with the highest grades — they're the ones who built projects, networked intentionally, and showed up consistently. Even one strong project or internship can completely change your trajectory.\n\nWhat's your current situation — are you looking for your first opportunity, trying to switch directions, or planning for something specific like placements or higher studies?`;
};

// ─── CONNECTION TEST ───────────────────────────────────────────────────────────

const testGeminiConnection = async () => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.log('⚠️  Gemini API key not configured — using smart fallback responses');
    return false;
  }

  if (!genAI) {
    console.log('⚠️  Gemini not initialized — using smart fallback responses');
    return false;
  }

  try {
    console.log('🔍 Testing Gemini API connection...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Say "NeuroBuddy AI ready" in exactly those words.');
    const text = result.response.text();
    console.log('✅ Gemini API connected:', text.trim());
    return true;
  } catch (error) {
    console.log('⚠️  Gemini API unavailable —', error.message);
    console.log('💡 Smart fallback responses are active');
    return false;
  }
};

module.exports = {
  getWellnessResponse,
  getCareerResponse,
  testGeminiConnection
};
