 NeuroBuddy — AI-Powered Student Learning & Wellness Platform
## Project Report

---

# Chapter 1 — Introduction

## 1.1 Introduction
#
In the modern academic environment, students face a dual challenge: managing the cognitive demands of learning complex subjects while simultaneously dealing with increasing levels of stress, anxiety, and mental health pressures. Traditional learning management systems address only the academic side, leaving the psychological dimension entirely unattended. NeuroBuddy is a full-stack web application designed to bridge this gap by combining an intelligent academic learning platform with an integrated mental wellness support system.

NeuroBuddy is built on the MERN stack — MongoDB, Express.js, React.js, and Node.js — and provides students with structured subject learning across seven fields of study, video lecture streaming, interactive quizzes, progress tracking, AI-powered chatbots for wellness and career guidance, a competitive leaderboard, and a dedicated stress relief zone featuring interactive games and evidence-based mental health techniques.

The platform is designed for students enrolled in higher education who require a centralized, intelligent, and empathetic digital companion throughout their academic journey. The name "NeuroBuddy" reflects the dual focus on neurocognitive learning and emotional wellbeing — a buddy that supports both the mind and the spirit.

## 1.2 Literature Review

Several existing platforms have attempted to address student learning and wellness independently:

**Learning Management Systems (LMS):** Platforms such as Moodle, Canvas, and Blackboard provide course management, assignment submission, and grade tracking. However, they are institution-dependent, lack personalization, and offer no mental health support. Studies by Coates (2005) and Siemens (2004) highlight that LMS platforms improve content delivery but fail to engage students emotionally or motivationally.

**AI Tutoring Systems:** Platforms like Khan Academy and Coursera use adaptive learning algorithms to personalize content. Research by VanLehn (2011) demonstrates that intelligent tutoring systems can be as effective as human tutors for well-defined domains. However, these platforms do not address student wellbeing.

**Mental Health Apps:** Applications such as Headspace, Calm, and Woebot focus exclusively on mental wellness through meditation, CBT-based chatbots, and mood tracking. A study by Fitzpatrick et al. (2017) in JMIR Mental Health demonstrated that Woebot significantly reduced depression and anxiety in college students over two weeks. However, these apps are disconnected from academic contexts.

**Gamification in Education:** Research by Hamari et al. (2014) shows that gamification elements such as leaderboards, streaks, and badges significantly improve student engagement and motivation. NeuroBuddy incorporates these elements through its streak system, leaderboard, and quiz scoring.

**Gap Identified:** No existing platform integrates structured academic learning, AI-powered career guidance, mental wellness chatbots, stress-relief games, and psychologist directories into a single cohesive system. NeuroBuddy addresses this gap.

## 1.3 Objectives

1. To develop a full-stack web application that provides structured academic content across seven fields of study with 17+ subjects.
2. To implement a video lecture system with YouTube-embedded content and progress tracking per user.
3. To build an interactive quiz system with automatic scoring, answer review, and historical performance tracking.
4. To integrate dual AI chatbots — a Wellness Bot and a Career Bot — powered by Google Gemini API with intelligent keyword-based fallback responses.
5. To implement a gamified leaderboard system with public user profiles and performance graphs.
6. To create a Stress Relief Zone featuring five interactive browser-based games and six evidence-based stress management techniques.
7. To provide a Psychologists directory with professional profiles, emergency helplines, and appointment booking functionality.
8. To implement JWT-based authentication with bcrypt password hashing for secure user management.
9. To track daily learning streaks to encourage consistent study habits.
10. To generate system design diagrams (Use Case, ER, DFD, Class) for academic documentation.

## 1.4 Significance

NeuroBuddy is significant for the following reasons:

**Academic Impact:** By providing structured roadmaps, video lectures, and quizzes across Computer Science, Data Science, Business Management, Psychology, Mechanical Engineering, Biology, and Finance, the platform serves as a comprehensive self-learning companion for students across disciplines.

**Mental Health Impact:** With rising rates of student mental health crises globally — the WHO reports that 1 in 4 students experiences a mental health condition — NeuroBuddy's integrated wellness features provide immediate, accessible support without stigma.

**Motivational Design:** The streak system, leaderboard, and progress tracking leverage behavioral psychology principles (operant conditioning, social comparison theory) to sustain long-term engagement.

**Accessibility:** Being a web-based platform requiring only a browser and internet connection, NeuroBuddy is accessible to students regardless of device or location.

**Holistic Approach:** NeuroBuddy is one of the few platforms that treats academic performance and mental wellness as interconnected rather than separate concerns.

## 1.5 Research Design

The project follows an iterative, agile development methodology:

- **Phase 1 — Requirements Gathering:** Identification of student pain points through analysis of existing platforms and academic literature.
- **Phase 2 — System Design:** Creation of ER diagrams, DFDs, class diagrams, and use case diagrams to model the system architecture.
- **Phase 3 — Backend Development:** Implementation of RESTful APIs using Express.js and MongoDB with Mongoose ODM.
- **Phase 4 — Frontend Development:** Building the React.js SPA with Tailwind CSS for responsive UI.
- **Phase 5 — Integration:** Connecting frontend to backend APIs, integrating Google Gemini AI, and embedding YouTube video content.
- **Phase 6 — Testing:** Manual functional testing of all modules, API testing, and UI validation.
- **Phase 7 — Seeding & Deployment:** Database seeding with realistic data for demonstration purposes.

## 1.6 Source of Data

- **Subject Content:** Curated academic content for 17+ subjects across 7 fields, manually structured into roadmaps, video playlists, quizzes, and career paths.
- **Video Content:** YouTube educational videos embedded via the YouTube IFrame API (no copyright issues as content is publicly available and embedded, not hosted).
- **User Data:** Synthetically generated using the seedUsers.js script, producing 100 realistic user profiles with randomized academic performance data for leaderboard demonstration.
- **AI Responses:** Google Gemini 1.5 Flash API for live responses; keyword-based template responses as fallback.
- **Psychologist Profiles:** Fictional profiles created for demonstration purposes.

## 1.7 Chapter Scheme

- **Chapter 1:** Introduction, literature review, objectives, significance, and research design.
- **Chapter 2:** Requirements specification including functional requirements, hardware/software dependencies, and constraints.
- **Chapter 3:** System design including DFDs, ER diagram, class diagram, use case diagram, sequence diagram, and database design.
- **Chapter 4:** Implementation details, technologies used, testing techniques, and installation/user instructions.
- **Chapter 5:** Results and discussions including UI snapshots, module descriptions, and database representation.
- **Chapter 6:** Summary and conclusions.
- **Chapter 7:** Future scope.

---

# Chapter 2 — Requirements Specification

## 2.1 User Characteristics

**Primary User — Student:**
- Age group: 18–28 years
- Enrolled in undergraduate or postgraduate programs
- Basic computer literacy; comfortable using web browsers
- Motivated to learn but may experience academic stress and anxiety
- Requires personalized content based on their field of study
- Interacts with all modules: subjects, videos, quizzes, chatbots, leaderboard, stress relief

**Secondary User — Administrator:**
- Responsible for managing subject content in the database
- Uses seed scripts to populate and update academic content
- Has direct database access via MongoDB Compass or CLI
- Does not interact with the frontend application directly

**Tertiary Actor — Gemini AI API:**
- External system providing natural language responses to chatbot queries
- Operates as a background service; students interact with it indirectly through the chat interface

## 2.2 Functional Requirements

**Authentication Module:**
- FR1: Users shall be able to register with name, email, password, and field of study.
- FR2: Users shall be able to log in with email and password.
- FR3: The system shall issue a JWT token upon successful authentication.
- FR4: Protected routes shall reject requests without a valid JWT token.
- FR5: Passwords shall be hashed using bcrypt with a salt factor of 12 before storage.

**Subject & Learning Module:**
- FR6: The system shall display all subjects grouped by field of study.
- FR7: Each subject shall contain a structured learning roadmap with phases and durations.
- FR8: Each subject shall contain embedded YouTube video lectures.
- FR9: Each subject shall contain multiple-choice quizzes with automatic scoring.
- FR10: Each subject shall display associated career paths.

**Video Progress Module:**
- FR11: The system shall track video completion percentage per user per video.
- FR12: A video shall be marked as completed when progress reaches 90% or above.
- FR13: Completing a video shall trigger a streak update for the user.
- FR14: The video player shall support playlist navigation (previous/next).

**Quiz Module:**
- FR15: Users shall be able to take quizzes and receive immediate scores.
- FR16: The system shall store quiz results with per-question answer details.
- FR17: Users shall be able to review their quiz history.
- FR18: Quiz scores shall contribute to the user's leaderboard ranking.

**Dashboard & Analytics Module:**
- FR19: The dashboard shall display the user's streak, total videos watched, quizzes taken, and average score.
- FR20: The dashboard shall render at least five chart types: bar, line, pie, radar, and area charts.
- FR21: Analytics data shall be fetched from the backend and reflect real user activity.

**Chatbot Module:**
- FR22: The Wellness Bot shall respond to messages related to stress, anxiety, sleep, and motivation.
- FR23: The Career Bot shall provide field-specific career guidance, skill recommendations, and interview tips.
- FR24: Both bots shall maintain conversation thread history per user.
- FR25: The system shall use Google Gemini API when available and fall back to template responses when unavailable.

**Leaderboard Module:**
- FR26: The leaderboard shall rank users by streak, quiz scores, and videos completed.
- FR27: Users shall be able to filter the leaderboard by field of study.
- FR28: Clicking a user on the leaderboard shall navigate to their public profile.

**Public Profile Module:**
- FR29: Public profiles shall display the user's name, field of study, streak, and performance graphs.
- FR30: Performance data shall be visualized using Recharts library.

**Stress Relief Module:**
- FR31: The system shall provide five interactive stress-relief games: Box Breathing, Bubble Pop, Memory Match, Doodle Zone, and Catch the Stars.
- FR32: The system shall provide six evidence-based stress management technique cards.

**Psychologists Module:**
- FR33: The system shall display a directory of psychologist profiles with specializations and contact details.
- FR34: Emergency helpline numbers shall be prominently displayed.
- FR35: Users shall be able to open a booking modal for each psychologist.

## 2.3 Dependencies

**Backend Dependencies:**
- express ^4.19.2 — Web framework for Node.js
- mongoose ^8.3.0 — MongoDB ODM for schema modeling
- bcryptjs ^2.4.3 — Password hashing
- jsonwebtoken ^9.0.2 — JWT generation and verification
- cors ^2.8.5 — Cross-Origin Resource Sharing
- dotenv ^16.4.5 — Environment variable management
- express-validator ^7.0.1 — Input validation middleware
- @google/generative-ai ^0.21.0 — Google Gemini AI SDK
- nodemon ^3.1.0 — Development auto-restart

**Frontend Dependencies:**
- react ^18.2.0 — UI library
- react-dom ^18.2.0 — DOM rendering
- react-router-dom ^6.22.3 — Client-side routing
- axios ^1.6.8 — HTTP client for API calls
- recharts ^2.12.2 — Chart and graph library
- react-toastify ^10.0.5 — Toast notification system
- tailwindcss ^3.4.1 — Utility-first CSS framework
- vite ^5.2.0 — Frontend build tool and dev server

**External Services:**
- MongoDB (local instance at localhost:27017)
- Google Gemini 1.5 Flash API (optional; fallback available)
- YouTube IFrame API (for video embedding)

## 2.4 Performance Requirements

- PR1: API response time for standard GET requests shall not exceed 500ms under normal load.
- PR2: The frontend shall achieve initial page load within 3 seconds on a standard broadband connection.
- PR3: The database shall support at least 100 concurrent user records without performance degradation.
- PR4: Video progress updates shall be persisted within 1 second of the user clicking "Mark as Complete."
- PR5: Chat responses (fallback mode) shall be returned within 200ms; Gemini API responses within 3 seconds.
- PR6: The leaderboard shall load and render within 1 second for up to 100 users.

## 2.5 Hardware Requirements

**Development / Deployment Server:**
- Processor: Intel Core i3 or equivalent (minimum); i5 recommended
- RAM: 4 GB minimum; 8 GB recommended
- Storage: 2 GB free disk space for application and dependencies
- Network: Stable internet connection for Gemini API and YouTube embedding

**Client (End User):**
- Any device with a modern web browser (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- Minimum screen resolution: 1024x768
- Internet connection for video streaming and AI chatbot

**Database Server:**
- MongoDB 6.0+ running locally on port 27017
- Minimum 512 MB RAM allocated to MongoDB process

## 2.6 Constraints and Assumptions

**Constraints:**
- C1: The application currently runs on a local development environment; cloud deployment is not configured.
- C2: Video content is embedded from YouTube; availability depends on YouTube's service uptime and video availability.
- C3: The Gemini API has rate limits and may be unavailable; the fallback response system ensures continuity.
- C4: The psychologist directory contains fictional profiles for demonstration; real deployment would require verified professional data.
- C5: No email verification is implemented in the current version.
- C6: The admin panel is managed via direct database access; no web-based admin UI exists.

**Assumptions:**
- A1: Users have basic familiarity with web browsers and online learning platforms.
- A2: MongoDB is installed and running locally before the application is started.
- A3: Node.js version 18+ is installed on the development machine.
- A4: The user has a stable internet connection for video playback.
- A5: All seeded data is for demonstration purposes and does not represent real individuals.

---

# Chapter 3 — Design

## 3.1 Algorithm

**JWT Authentication Algorithm:**
```
1. User submits email and password
2. Server queries MongoDB for user by email
3. If user not found → return 401 Unauthorized
4. bcrypt.compare(inputPassword, storedHash)
5. If mismatch → return 401 Unauthorized
6. Generate JWT: sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
7. Return token + user object to client
8. Client stores token in localStorage
9. All subsequent requests include: Authorization: Bearer <token>
10. Middleware decodes token, fetches user, attaches to req.user
```

**Streak Update Algorithm:**
```
1. User completes a video (progress >= 90%)
2. Fetch user's lastActivity date
3. Calculate daysDiff = today - lastActivity (in days)
4. If daysDiff == 1 → streak += 1 (consecutive day)
5. If daysDiff == 0 → streak unchanged (same day activity)
6. If daysDiff > 1 → streak = 1 (streak broken, reset)
7. Update lastActivity = today
8. Save user document
```

**AI Chatbot Fallback Algorithm:**
```
1. Receive user message
2. If Gemini API key configured AND API available:
   a. Build prompt with system context + conversation history
   b. Call Gemini 1.5 Flash API
   c. Return AI-generated response
3. Else (fallback mode):
   a. Convert message to lowercase
   b. Check for keywords: stress, anxiety, sleep, motivation
   c. Select matching response category
   d. Return random response from category array
```

## 3.2 Function-Oriented Design

The system follows a RESTful service-oriented architecture where each functional domain is encapsulated in its own route-controller pair:

| Module       | Route Prefix       | Controller               | Key Functions                    |
|--------------|--------------------|--------------------------|----------------------------------|
| Auth         | /api/auth          | authController           | register(), login()              |
| Subjects     | /api/subjects      | subjectController        | getAll(), getById()              |
| Videos       | /api/videos        | videoController          | getProgress(), updateProgress()  |
| Quizzes      | /api/quizzes       | quizController           | getBySubject(), submit()         |
| Chat         | /api/chat          | chatController           | sendMessage(), getHistory()      |
| User         | /api/user          | userController           | getProfile(), getAnalytics()     |
| Leaderboard  | /api/leaderboard   | leaderboardController    | getLeaderboard()                 |

Each controller function follows the pattern: validate input → query database → process business logic → return JSON response. Error handling is centralized through the errorHandler middleware.

## 3.3 System Design

### 3.3.1 Data Flow Diagrams

**Level 0 — Context Diagram:**

The NeuroBuddy system has three external entities:
- Student: Sends requests (login, browse subjects, watch videos, take quizzes, chat) and receives responses (content, scores, AI replies, analytics).
- Admin: Sends subject management data; receives confirmation.
- Gemini AI API: Receives chat queries; returns AI-generated responses.

The central process is the NeuroBuddy System, which mediates all interactions and persists data to MongoDB.

**Level 1 — Detailed Data Flow:**

Eight internal processes handle distinct data flows:
- P1 Auth: Handles registration and login; reads/writes to D1 (Users store).
- P2 Subjects: Serves subject content; reads from D2 (Subjects store).
- P3 Videos: Manages video playback and progress; reads D2, writes to D4 (VideoProgress store).
- P4 Quizzes: Serves quiz questions and processes submissions; reads D2, writes to D3 (QuizResults store).
- P5 Dashboard: Aggregates analytics; reads D1, D3, D4.
- P6 Leaderboard: Ranks users; reads D1, D3, D4.
- P7 Chat: Processes messages, calls Gemini AI, stores threads; reads/writes D5 (ChatThreads store).
- P8 Profile: Serves user profile data; reads D1, D3, D4.

### 3.3.2 Activity Diagram

**User Login and Learning Flow:**
```
Start → Open Application
→ [Not Logged In] → Login Page → Enter Credentials
→ [Invalid] → Show Error → Re-enter Credentials
→ [Valid] → JWT Issued → Dashboard Loaded
→ Select Subject → View Roadmap
→ Watch Video → Mark Complete → Streak Updated
→ Take Quiz → Submit Answers → View Score
→ [Want to Chat] → Open Wellness/Career Bot → Send Message → Receive Response
→ [View Rankings] → Leaderboard → Click User → Public Profile
→ [Stressed] → Stress Relief Zone → Play Game / Read Technique
→ Logout → End
```

### 3.3.3 Flowchart

**Quiz Submission Flowchart:**
```
Start
↓
User opens quiz
↓
Load questions from Subject.quizzes[]
↓
For each question: display options
↓
User selects answer
↓
All questions answered? → No → Continue
↓ Yes
Submit answers to POST /api/quizzes/submit
↓
For each answer: compare selectedAnswer with correctAnswer
↓
Calculate score = correct answers count
↓
Save QuizResult to MongoDB
↓
Update user streak
↓
Return score, percentage, correct answers
↓
Display results to user
↓
End
```

### 3.3.4 Class Diagram

The system contains six primary model classes:

**User:** Attributes: _id, name, email, password, fieldOfStudy, streak, lastActivity, createdAt.
Methods: comparePassword(), generateJWT(), updateStreak(), toPublicProfile().

**Subject:** Attributes: _id, name, fieldOfStudy, description, roadmap[], videos[], quizzes[], assignments[], careerPaths[], createdAt.
Methods: getByField(), getVideos(), getQuizzes().

**QuizResult:** Attributes: _id, userId (ref User), subjectId (ref Subject), quizId, score, totalQuestions, answers[], date.
Methods: getByUser(), getScorePercent().

**VideoProgress:** Attributes: _id, userId (ref User), subjectId (ref Subject), videoId, percentage, completed, lastWatched.
Methods: updateProgress(), markComplete(). Unique index on userId + videoId.

**ChatThread:** Attributes: _id, userId (ref User), botType (wellness|career), title, createdAt, updatedAt.
Methods: getByUser(), autoTitle().

**ChatMessage:** Attributes: _id, threadId (ref ChatThread), sender (user|bot), message, timestamp.
Methods: getByThread(), getLatest().

**Relationships:**
- User 1→N QuizResult
- User 1→N VideoProgress
- User 1→N ChatThread
- Subject 1→N QuizResult
- Subject 1→N VideoProgress
- ChatThread 1→N ChatMessage

### 3.3.5 ER Diagram

Six entities with the following attributes and relationships:

- USER (PK: _id, name, email, password, fieldOfStudy, streak, lastActivity, createdAt)
- SUBJECT (PK: _id, name, fieldOfStudy, description, roadmap[], videos[], quizzes[], careerPaths[])
- QUIZ_RESULT (PK: _id, FK: userId, FK: subjectId, quizId, score, totalQuestions, answers[], date)
- VIDEO_PROGRESS (PK: _id, FK: userId, FK: subjectId, videoId, percentage, completed, lastWatched)
- CHAT_THREAD (PK: _id, FK: userId, botType, title, createdAt, updatedAt)
- CHAT_MESSAGE (PK: _id, FK: threadId, sender, message, timestamp)

**Relationships:**
- USER takes QUIZ_RESULT (1:N)
- USER watches VIDEO_PROGRESS (1:N)
- USER starts CHAT_THREAD (1:N)
- SUBJECT has QUIZ_RESULT (1:N)
- SUBJECT has VIDEO_PROGRESS (1:N)
- CHAT_THREAD has CHAT_MESSAGE (1:N)

### 3.3.6 Sequence Diagram

**Chat Message Sequence:**
```
Student → Frontend: Type message, click Send
Frontend → Backend API: POST /api/chat/message { message, botType }
Backend API → Auth Middleware: Verify JWT token
Auth Middleware → MongoDB: Find user by decoded ID
MongoDB → Auth Middleware: Return user object
Auth Middleware → Chat Controller: req.user attached
Chat Controller → MongoDB: Find or create ChatThread
Chat Controller → GeminiClient: getWellnessResponse(message, history)
GeminiClient → Gemini API: POST generateContent(prompt)
Gemini API → GeminiClient: Return AI text response
GeminiClient → Chat Controller: Return response string
Chat Controller → MongoDB: Save ChatMessage (user)
Chat Controller → MongoDB: Save ChatMessage (bot)
Chat Controller → Frontend: Return { userMessage, botMessage }
Frontend → Student: Display bot response in chat UI
```

## 3.4 Database Design

### 3.4.1 Logical Database Design

The logical design uses a document-oriented model (MongoDB) with six collections. Relationships are implemented through ObjectId references (similar to foreign keys in relational databases) rather than joins, following MongoDB best practices.

**Normalization decisions:**
- Subject content (videos, quizzes, roadmap) is embedded within the Subject document as arrays, since this data is always accessed together and never queried independently. This is a deliberate denormalization for read performance.
- User activity data (QuizResult, VideoProgress) is stored in separate collections with userId references, since this data grows unboundedly and requires independent querying.
- Chat data is split into ChatThread and ChatMessage collections to support pagination and efficient message retrieval without loading entire conversation histories.

### 3.4.2 Physical Database Design

**Collection: users**
```
{
  _id: ObjectId,
  name: String (required, trimmed),
  email: String (required, unique, lowercase),
  password: String (bcrypt hash, minlength: 6),
  fieldOfStudy: String (enum: 7 values),
  streak: Number (default: 0),
  lastActivity: Date,
  createdAt: Date
}
Indexes: email (unique)
```

**Collection: subjects**
```
{
  _id: ObjectId,
  name: String (required),
  fieldOfStudy: String (required),
  description: String,
  roadmap: [{ phase, title, description, duration }],
  videos: [{ title, url, duration, description }],
  quizzes: [{ title, questions: [{ question, options[], correctAnswer }] }],
  assignments: [{ title, description, deadline }],
  careerPaths: [String],
  createdAt: Date
}
Indexes: fieldOfStudy, name
```

**Collection: quizresults**
```
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  subjectId: ObjectId (ref: subjects),
  quizId: String,
  score: Number,
  totalQuestions: Number,
  answers: [{ questionIndex, selectedAnswer, isCorrect }],
  date: Date
}
Indexes: userId, subjectId, compound(userId, date)
```

**Collection: videoprogresss**
```
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  videoId: String,
  subjectId: ObjectId (ref: subjects),
  percentage: Number (0-100),
  completed: Boolean,
  lastWatched: Date
}
Indexes: unique compound(userId, videoId), subjectId
```

**Collection: chatthreads**
```
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  botType: String (enum: wellness|career),
  title: String,
  createdAt: Date,
  updatedAt: Date
}
Indexes: userId, botType
```

**Collection: chatmessages**
```
{
  _id: ObjectId,
  threadId: ObjectId (ref: chatthreads),
  sender: String (enum: user|bot),
  message: String,
  timestamp: Date
}
Indexes: threadId, timestamp
```

---

# Chapter 4 — Implementation, Testing, and Maintenance

## 4.1 Introduction to Languages, IDEs, Tools and Technologies

**Programming Languages:**
- JavaScript (ES2022+): Used for both frontend and backend development, enabling full-stack JavaScript with shared language knowledge.
- JSX: React's syntax extension for writing HTML-like UI components within JavaScript.
- CSS3 / Tailwind CSS: Utility-first CSS framework used for all styling, enabling rapid UI development with consistent design tokens.

**Frontend Technologies:**
- React.js 18.2: Component-based UI library. Uses functional components with hooks (useState, useEffect, useRef, useCallback) throughout the application.
- React Router DOM 6.22: Declarative client-side routing with protected routes via the PrivateRoute component.
- Recharts 2.12: Composable charting library built on D3.js, used for dashboard analytics (BarChart, LineChart, PieChart, RadarChart, AreaChart).
- Axios 1.6: Promise-based HTTP client with request/response interceptors for automatic JWT injection and 401 handling.
- React Toastify 10: Non-blocking notification system for user feedback.
- Vite 5.2: Next-generation frontend build tool providing instant HMR (Hot Module Replacement) and optimized production builds.

**Backend Technologies:**
- Node.js 18+: JavaScript runtime for server-side execution.
- Express.js 4.19: Minimal web framework providing routing, middleware pipeline, and HTTP utilities.
- Mongoose 8.3: MongoDB ODM providing schema validation, middleware hooks (pre-save for password hashing), and query building.
- bcryptjs 2.4: Password hashing library using the bcrypt algorithm with salt rounds of 12.
- jsonwebtoken 9.0: JWT generation and verification using HS256 algorithm.
- express-validator 7.0: Middleware for request body validation.
- @google/generative-ai 0.21: Official Google Gemini AI SDK for Node.js.

**Database:**
- MongoDB 6.0 (Local): Document-oriented NoSQL database running on localhost:27017. Database name: neurobuddy.

**Development Tools:**
- VS Code / Kiro IDE: Primary code editor.
- MongoDB Compass: GUI for database inspection and query testing.
- Nodemon 3.1: Development utility that automatically restarts the Node.js server on file changes.
- npm: Package manager for both frontend and backend dependency management.
- Git: Version control system.

**External APIs:**
- Google Gemini 1.5 Flash API: Large language model for generating contextual chatbot responses.
- YouTube IFrame API: Embedded video player for lecture content delivery.

## 4.2 Testing Techniques and Test Plans

**Testing Approach:** Manual black-box testing was performed for all functional modules. Each feature was tested against its functional requirements.

**Authentication Testing:**

| Test Case | Input                        | Expected Output                        | Result |
|-----------|------------------------------|----------------------------------------|--------|
| TC-01     | Valid email + password       | JWT token returned, redirect dashboard | Pass   |
| TC-02     | Invalid password             | 401 Unauthorized error message         | Pass   |
| TC-03     | Unregistered email           | 401 error message                      | Pass   |
| TC-04     | Missing required fields      | Validation error messages              | Pass   |
| TC-05     | Access protected route w/o token | Redirect to login                  | Pass   |
| TC-06     | Expired/invalid JWT          | 401, redirect to login                 | Pass   |

**Quiz Module Testing:**

| Test Case | Input                        | Expected Output                        | Result |
|-----------|------------------------------|----------------------------------------|--------|
| TC-07     | Submit all correct answers   | Score = total questions, 100%          | Pass   |
| TC-08     | Submit all wrong answers     | Score = 0, 0%                          | Pass   |
| TC-09     | Submit partial answers       | Correct score calculated               | Pass   |
| TC-10     | Quiz result saved to DB      | QuizResult document created            | Pass   |
| TC-11     | Streak updated after quiz    | User streak incremented                | Pass   |

**Video Progress Testing:**

| Test Case | Input                        | Expected Output                        | Result |
|-----------|------------------------------|----------------------------------------|--------|
| TC-12     | Mark video complete          | Progress = 100%, completed = true      | Pass   |
| TC-13     | Progress bar updates         | Visual progress reflects DB value      | Pass   |
| TC-14     | Duplicate progress update    | Existing record updated, not duplicated| Pass   |

**Chatbot Testing:**

| Test Case | Input                        | Expected Output                        | Result |
|-----------|------------------------------|----------------------------------------|--------|
| TC-15     | Message containing "stress"  | Stress-related wellness response       | Pass   |
| TC-16     | Message containing "interview"| Interview preparation career advice   | Pass   |
| TC-17     | Gemini API unavailable       | Fallback template response returned    | Pass   |
| TC-18     | Conversation history         | Context preserved across messages      | Pass   |

**Stress Relief Games Testing:**

| Test Case | Input                        | Expected Output                        | Result |
|-----------|------------------------------|----------------------------------------|--------|
| TC-19     | Start Box Breathing          | Animation cycles through 4-4-6-2       | Pass   |
| TC-20     | Pop bubble in Bubble Pop     | Score increments, bubble disappears    | Pass   |
| TC-21     | Match cards in Memory        | Matched cards stay flipped, win detected| Pass  |
| TC-22     | Draw on Doodle canvas        | Stroke rendered at cursor position     | Pass   |
| TC-23     | Click star in Catch Stars    | Score increments, star removed         | Pass   |

## 4.3 Installation Instructions

**Prerequisites:**
- Node.js 18+ installed
- MongoDB 6.0+ installed and running
- Git (optional)

**Step 1 — Start MongoDB:**
```bash
mongod
```

**Step 2 — Install and start the backend:**
```bash
cd backend
npm install
npm run dev
```

**Step 3 — Seed the database (first time only):**
```bash
node utils/seed.js
node utils/seedUsers.js
node utils/seedDemoUserData.js
```

**Step 4 — Install and start the frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Step 5 — Access the application:**
- Main Application: http://localhost:5173
- Backend API: http://localhost:5000
- PPT Diagrams: http://localhost:5000/diagrams-ppt

**Environment Variables (backend/.env):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/neurobuddy
JWT_SECRET=<your_secret_key>
GEMINI_API_KEY=<your_gemini_api_key>
NODE_ENV=development
```

## 4.4 End User Instructions

**Registration:**
1. Navigate to http://localhost:5173
2. Click "Register" on the login page
3. Enter your full name, email address, and password (minimum 6 characters)
4. Select your field of study from the dropdown (7 options available)
5. Click "Register" — you will be redirected to the dashboard

**Watching Video Lectures:**
1. Click "Video Lectures" in the left sidebar
2. Browse subjects grouped by field of study
3. Click "Watch Video" on any video card
4. The YouTube video will play in the embedded player
5. Click "Mark as Complete" when finished — your progress and streak update automatically
6. Use "Previous" and "Next" buttons to navigate between lectures

**Taking Quizzes:**
1. Click "Quizzes" in the sidebar
2. Select a subject and choose a quiz
3. Read each question and select one of the four options
4. Click "Submit Quiz" after answering all questions
5. Your score, percentage, and correct answers are displayed immediately

**Using the Chatbots:**
1. Click "Wellness Bot" for mental health support or "Career Bot" for career guidance
2. Type your message in the input box and press Enter or click Send
3. The bot responds within seconds
4. Previous conversations are saved and accessible from the thread list on the left

**Stress Relief Zone:**
1. Click "Stress Relief" in the sidebar
2. Select any of the five games from the top tabs
3. For techniques, click the "Techniques & Tips" tab
4. Games are self-contained — no setup required, just click Play

**Viewing the Leaderboard:**
1. Click "Leaderboard" in the sidebar
2. Use the field of study filter to narrow rankings
3. Click any user's name to view their public profile with performance graphs

---

# Chapter 5 — Results and Discussions

## 5.1 User Interface Representation

NeuroBuddy features a dark-themed, responsive single-page application with a fixed left sidebar navigation and a top header bar. The UI is built entirely with Tailwind CSS utility classes and uses a consistent design language throughout — purple/violet as the primary accent color, dark slate backgrounds (#0f172a, #1e293b), and card-based content layout.

The application consists of the following screens:
1. Login / Register pages — centered card layout with form validation
2. Dashboard — analytics overview with 5 chart types
3. Subjects — grid layout with subject cards grouped by field
4. Subject Detail — roadmap timeline, video list, quiz list, career paths
5. Video Lectures — subject-grouped video cards with progress bars
6. Video Player — embedded YouTube player with playlist sidebar
7. Quizzes — subject selector and quiz cards
8. Quiz Take — full-screen question interface with option selection
9. Leaderboard — ranked table with field filter and user links
10. Public Profile — user stats with Recharts performance graphs
11. Wellness Bot — chat interface with thread history sidebar
12. Career Bot — identical layout to Wellness Bot
13. Psychologists — directory cards with booking modal
14. Stress Relief — tabbed interface with 5 games and 6 technique cards
15. Profile — personal stats, streak display, and account information

## 5.2 Brief Description of Various Modules

**Authentication Module:**
Handles user registration and login using JWT-based stateless authentication. Passwords are hashed with bcrypt (12 salt rounds) before storage. The frontend stores the JWT in localStorage and injects it into every API request via an Axios interceptor. The PrivateRoute component wraps all protected pages and redirects unauthenticated users to the login page.

**Subject & Learning Module:**
Provides structured academic content for 17+ subjects across 7 fields of study: Computer Science, Data Science, Business Management, Psychology, Mechanical Engineering, Biology, and Finance. Each subject contains a phased learning roadmap, embedded YouTube video lectures, multiple-choice quizzes, career path suggestions, and assignments. Content is served from MongoDB via the /api/subjects endpoint.

**Video Progress Module:**
Tracks each user's progress on individual videos using a unique compound index on (userId, videoId). Progress is stored as a percentage (0–100). When a user clicks "Mark as Complete," the backend sets percentage to 100 and completed to true, then triggers the streak update algorithm. The Videos page displays a progress bar for each video card.

**Quiz Module:**
Serves quiz questions from the Subject document's embedded quizzes array. On submission, the backend compares each selected answer against the correctAnswer index, calculates the score, and persists a QuizResult document. The result page shows the score, percentage, and per-question correctness feedback.

**Dashboard & Analytics Module:**
Aggregates user activity data from three collections (QuizResult, VideoProgress, User) and renders five chart types using Recharts: a BarChart for quiz scores by subject, a LineChart for weekly activity, a PieChart for subject distribution, a RadarChart for skill coverage, and an AreaChart for cumulative progress. The dashboard also displays key metrics: current streak, total videos watched, quizzes completed, and average score.

**AI Chatbot Module:**
Two specialized chatbots share the same underlying architecture. The Wellness Bot uses a mental health system prompt and responds to keywords related to stress, anxiety, sleep, and motivation. The Career Bot uses a career guidance system prompt and tailors responses to the user's registered field of study. Both bots attempt to use Google Gemini 1.5 Flash API first; if unavailable, they fall back to a library of pre-written, contextually appropriate template responses. Conversations are organized into threads, with full history persistence in MongoDB.

**Leaderboard Module:**
Ranks all users by a composite score derived from streak, total quiz scores, and videos completed. Users can filter by field of study. Each row links to the user's public profile. The leaderboard is populated with 100 seeded users for demonstration purposes.

**Stress Relief Module:**
Contains five interactive browser-based games implemented entirely in React without external game libraries:
- Box Breathing: Animated circle guides the 4-4-6-2 breathing cycle using setInterval
- Bubble Pop: Spawns clickable bubbles at random positions with a 30-second timer
- Memory Match: 4x4 card grid with emoji pairs and flip animation
- Doodle Zone: HTML5 Canvas freehand drawing with color picker, brush size, and eraser
- Catch the Stars: Reflex game where stars appear and disappear within 2 seconds

Six technique cards cover: 5-4-3-2-1 Grounding, Progressive Muscle Relaxation, Cognitive Reframing, Cold Water Reset, Journaling Dump, and Body Scan Meditation — each with step-by-step instructions and the psychological rationale.

**Psychologists Module:**
Displays six psychologist profiles with name, specialization, years of experience, languages spoken, and contact information. Emergency helplines (iCall, Vandrevala Foundation, NIMHANS) are displayed prominently at the top. A booking modal allows users to select a date and time for an appointment.

## 5.3 Snapshots of System with Brief Detail

**Snapshot 1 — Login Page:**
Centered card on a dark background with the NeuroBuddy logo, email/password fields, and a "Login" button. A link to the registration page is provided below. Form validation displays inline error messages for empty or invalid fields.

**Snapshot 2 — Dashboard:**
The main landing page after login. Displays a welcome message with the user's name and current streak in the top header. The body contains a stats row (streak, videos watched, quizzes taken, average score) followed by five Recharts visualizations arranged in a responsive grid. A shimmer loading animation is shown while data fetches.

**Snapshot 3 — Video Lectures Page:**
Subjects are displayed as expandable sections. Each section contains a grid of video cards showing the video title, description, duration, progress bar, and a "Watch Video" / "Rewatch" button. Completed videos show a green checkmark badge.

**Snapshot 4 — Video Player:**
A full-width YouTube IFrame player occupies the top portion. Below it, the video title, description, subject name, and duration are displayed. Three action buttons (Previous, Mark as Complete, Next) are arranged horizontally. A playlist sidebar on the right lists all videos in the subject with the current video highlighted in purple.

**Snapshot 5 — Quiz Interface:**
A clean full-screen question card displays the question text and four option buttons. Selecting an option highlights it in purple. A progress indicator shows the current question number. After submission, a results card shows the score with a color-coded percentage and a per-question answer review.

**Snapshot 6 — Wellness Bot:**
A two-panel chat interface. The left panel lists conversation threads with timestamps. The right panel shows the chat history with user messages on the right (purple bubbles) and bot responses on the left (dark card bubbles). A text input with a Send button is fixed at the bottom.

**Snapshot 7 — Leaderboard:**
A ranked table with position number, user avatar (initials), name, field of study, streak, quiz score, and videos completed columns. The top three positions have gold, silver, and bronze badges. A field of study filter dropdown sits above the table.

**Snapshot 8 — Stress Relief Zone:**
A tabbed interface with "Stress Relief Games" and "Techniques & Tips" tabs. The games tab shows five game selector buttons at the top and the active game in a dark card below. The techniques tab shows six gradient cards in a 2-column grid, each with an icon, title, description, and numbered steps.

**Snapshot 9 — Psychologists Page:**
Emergency helpline numbers are displayed in a prominent red/orange banner at the top. Below, six psychologist cards are arranged in a grid, each showing a profile avatar, name, specialization tags, experience, languages, and a "Book Appointment" button that opens a modal.

**Snapshot 10 — Public Profile:**
Displays the user's name, field of study badge, and streak. Below, two Recharts graphs show quiz performance over time and subject-wise score distribution. A stats row shows total quizzes, average score, and videos completed.

## 5.4 Back End Representation

The backend is a RESTful API built with Express.js running on Node.js. It follows the MVC (Model-View-Controller) pattern:

- Models (/backend/models/): Six Mongoose schemas define the data structure and validation rules for all collections.
- Controllers (/backend/controllers/): Seven controller files contain the business logic for each module.
- Routes (/backend/routes/): Seven route files map HTTP methods and URL patterns to controller functions.
- Middleware (/backend/middleware/): Three middleware files handle authentication (JWT verification), error handling (centralized error responses), and input validation (express-validator).
- Utils (/backend/utils/): Utility files for Gemini AI client, streak management, and database seeding.

**API Endpoint Summary:**

| Method | Endpoint                      | Description                  | Auth Required |
|--------|-------------------------------|------------------------------|---------------|
| POST   | /api/auth/register            | Register new user            | No            |
| POST   | /api/auth/login               | Login and get JWT            | No            |
| GET    | /api/subjects                 | Get all subjects             | Yes           |
| GET    | /api/subjects/:id             | Get subject by ID            | Yes           |
| GET    | /api/videos/progress          | Get user video progress      | Yes           |
| PUT    | /api/videos/progress          | Update video progress        | Yes           |
| GET    | /api/quizzes/subject/:id      | Get quizzes for subject      | Yes           |
| POST   | /api/quizzes/submit           | Submit quiz answers          | Yes           |
| POST   | /api/chat/message             | Send chat message            | Yes           |
| GET    | /api/chat/history/:botType    | Get chat threads             | Yes           |
| GET    | /api/chat/thread/:id          | Get thread messages          | Yes           |
| GET    | /api/user/profile             | Get user profile             | Yes           |
| GET    | /api/user/analytics           | Get user analytics           | Yes           |
| GET    | /api/user/public/:id          | Get public profile           | Yes           |
| GET    | /api/leaderboard              | Get leaderboard              | Yes           |

**Database:** MongoDB running locally on mongodb://localhost:27017/neurobuddy. Six collections: users, subjects, quizresults, videoprogresss, chatthreads, chatmessages.

**Authentication Flow:** All protected endpoints pass through the protect middleware which extracts the Bearer token from the Authorization header, verifies it using jwt.verify() with the JWT_SECRET, fetches the corresponding user from MongoDB (excluding the password field), and attaches it to req.user for use in controllers.

## 5.5 Snapshots of Database Tables with Brief Description

**Collection: users**

| Field         | Sample Value                        | Description                        |
|---------------|-------------------------------------|------------------------------------|
| _id           | ObjectId("69d8...")                 | Auto-generated unique identifier   |
| name          | "Demo User"                         | User's full name                   |
| email         | "demo@neurobuddy.com"               | Unique login email                 |
| password      | "$2a$12$VKM6p7..."                  | bcrypt hash (12 rounds)            |
| fieldOfStudy  | "Computer Science"                  | One of 7 enum values               |
| streak        | 5                                   | Consecutive active days            |
| lastActivity  | 2026-04-10T...                      | Last video/quiz completion         |
| createdAt     | 2026-04-10T...                      | Account creation timestamp         |

**Collection: subjects (17 documents)**

Each document contains deeply nested arrays. A sample subject document for "Data Structures & Algorithms" contains: name, fieldOfStudy ("Computer Science"), description, a roadmap array with 4 phase objects, a videos array with 11 YouTube embed URLs, a quizzes array with 3 quiz objects each containing 5 questions with 4 options, an assignments array, and a careerPaths array.

**Collection: quizresults**

| Field          | Sample Value                                              | Description                  |
|----------------|-----------------------------------------------------------|------------------------------|
| _id            | ObjectId                                                  | Auto-generated ID            |
| userId         | ObjectId (ref users)                                      | Foreign key to user          |
| subjectId      | ObjectId (ref subjects)                                   | Foreign key to subject       |
| quizId         | "0"                                                       | Index of quiz within subject |
| score          | 4                                                         | Number of correct answers    |
| totalQuestions | 5                                                         | Total questions in quiz      |
| answers        | [{questionIndex:0, selectedAnswer:0, isCorrect:true}, ...] | Per-question detail         |
| date           | 2026-04-10T...                                            | Submission timestamp         |

**Collection: videoprogresss**

| Field       | Sample Value              | Description                          |
|-------------|---------------------------|--------------------------------------|
| _id         | ObjectId                  | Auto-generated ID                    |
| userId      | ObjectId (ref users)      | Foreign key to user                  |
| videoId     | "67f2...abc-0"            | Composite: subjectId-videoIndex      |
| subjectId   | ObjectId (ref subjects)   | Foreign key to subject               |
| percentage  | 100                       | Completion percentage (0-100)        |
| completed   | true                      | True when percentage >= 90           |
| lastWatched | 2026-04-10T...            | Last interaction timestamp           |

**Collection: chatthreads**

| Field     | Sample Value              | Description                          |
|-----------|---------------------------|--------------------------------------|
| _id       | ObjectId                  | Auto-generated ID                    |
| userId    | ObjectId (ref users)      | Foreign key to user                  |
| botType   | "wellness"                | Either "wellness" or "career"        |
| title     | "Feeling stressed..."     | Auto-generated from first message    |
| createdAt | 2026-04-10T...            | Thread creation time                 |
| updatedAt | 2026-04-10T...            | Last message time                    |

**Collection: chatmessages**

| Field     | Sample Value              | Description                          |
|-----------|---------------------------|--------------------------------------|
| _id       | ObjectId                  | Auto-generated ID                    |
| threadId  | ObjectId (ref chatthreads)| Foreign key to thread                |
| sender    | "user"                    | Either "user" or "bot"               |
| message   | "I'm feeling stressed..." | Message content                      |
| timestamp | 2026-04-10T...            | Message send time                    |

---

# Chapter 6 — Summary and Conclusions

NeuroBuddy was designed and developed as a full-stack MERN application that addresses a critical gap in existing educational technology: the absence of integrated mental wellness support within academic learning platforms. The project successfully achieved all ten stated objectives.

The system delivers structured academic content across 7 fields of study and 17+ subjects, each with YouTube-embedded video lectures, phased learning roadmaps, multiple-choice quizzes, and career path guidance. The JWT-based authentication system with bcrypt password hashing ensures secure user management. The streak tracking system and gamified leaderboard provide behavioral incentives for consistent engagement.

The dual AI chatbot system — powered by Google Gemini 1.5 Flash with an intelligent keyword-based fallback — provides accessible, stigma-free mental health and career support at any time. The Stress Relief Zone, featuring five interactive browser-based games and six evidence-based technique cards, represents a novel integration of therapeutic tools within an academic platform.

The dashboard analytics module, with five chart types rendered using Recharts, gives students meaningful insight into their learning progress. The Psychologists directory bridges the gap between self-help tools and professional mental health care.

From a technical standpoint, the project demonstrates proficiency in modern full-stack development: React.js with hooks and context API, Express.js RESTful API design, Mongoose ODM with schema validation and middleware, JWT authentication, and responsive UI design with Tailwind CSS.

**Key conclusions:**
- Integrating wellness features into a learning platform is technically feasible and adds significant value without compromising the academic functionality.
- The fallback AI response system ensures chatbot availability even without API access, making the platform robust for offline or restricted environments.
- MongoDB's document model is well-suited for this application's data structure, particularly for embedding subject content (videos, quizzes, roadmaps) within a single document.
- Gamification elements (streaks, leaderboard, progress bars) are straightforward to implement and have a measurable positive effect on user engagement design.

---

# Chapter 7 — Future Scope

**1. Cloud Deployment:**
Deploy the application on AWS (EC2 for backend, S3 + CloudFront for frontend, MongoDB Atlas for database) to make it publicly accessible. Implement CI/CD pipelines using GitHub Actions for automated testing and deployment.

**2. Mobile Application:**
Develop a React Native mobile app sharing the same backend API, enabling students to learn and access wellness features on smartphones with push notifications for streak reminders.

**3. Real-time Features:**
Implement WebSocket-based real-time features using Socket.io: live study rooms where students can collaborate, real-time leaderboard updates, and instant notifications for quiz results.

**4. Advanced AI Personalization:**
Use machine learning to analyze each student's quiz performance, video completion patterns, and chat history to generate personalized subject recommendations, adaptive quiz difficulty, and proactive wellness check-ins.

**5. Mood Tracking & Analytics:**
Add a daily mood logging feature with sentiment analysis on chat messages. Generate weekly wellness reports showing mood trends, stress patterns, and correlations with academic performance.

**6. Video Upload & Custom Content:**
Allow educators to upload their own video content (stored on AWS S3) and create custom quizzes, enabling institutions to deploy NeuroBuddy as a white-label LMS.

**7. Peer Support Community:**
Add a moderated discussion forum where students can ask questions, share resources, and support each other — with AI-powered content moderation to maintain a safe environment.

**8. Psychologist Integration:**
Integrate with real appointment booking APIs (Calendly, Practo) to enable actual scheduling with licensed psychologists, with video consultation support via WebRTC.

**9. Offline Support:**
Implement Progressive Web App (PWA) features with service workers to cache subject content and allow offline access to previously viewed lectures and techniques.

**10. Accessibility Enhancements:**
Add full keyboard navigation, screen reader support (ARIA labels), high-contrast mode, and font size controls to make the platform accessible to students with disabilities.

**11. Multi-language Support:**
Implement i18n (internationalization) using react-i18next to support regional languages, making the platform accessible to non-English-speaking student populations.

**12. Institutional Dashboard:**
Build an admin web interface for educators and counselors to monitor aggregate student performance, identify at-risk students based on wellness chat patterns, and manage content without direct database access.

---

# Appendix

## A. Project File Structure

```
neurobuddy/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   ├── leaderboardController.js
│   │   ├── quizController.js
│   │   ├── subjectController.js
│   │   ├── userController.js
│   │   └── videoController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── models/
│   │   ├── ChatMessage.js
│   │   ├── ChatThread.js
│   │   ├── QuizResult.js
│   │   ├── Subject.js
│   │   ├── User.js
│   │   └── VideoProgress.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── leaderboardRoutes.js
│   │   ├── quizRoutes.js
│   │   ├── subjectRoutes.js
│   │   ├── userRoutes.js
│   │   └── videoRoutes.js
│   ├── utils/
│   │   ├── geminiClient.js
│   │   ├── seed.js
│   │   ├── seedDemoUserData.js
│   │   ├── seedUsers.js
│   │   └── streakManager.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── ChatCareer.jsx
│   │   │   ├── ChatWellness.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Psychologists.jsx
│   │   │   ├── PublicProfile.jsx
│   │   │   ├── QuizTake.jsx
│   │   │   ├── Quizzes.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── StressRelief.jsx
│   │   │   ├── SubjectDetail.jsx
│   │   │   ├── Subjects.jsx
│   │   │   ├── VideoPlayer.jsx
│   │   │   └── Videos.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── neurobuddy/
│   ├── PPT_Diagrams.html
│   └── Project_Report.md
└── README.md
```

## B. Demo Credentials

| User        | Email                        | Password     |
|-------------|------------------------------|--------------|
| Demo User   | demo@neurobuddy.com          | Demo123!     |
| Seeded User | sage.mitchell@student.com    | Student@123  |

## C. Key npm Commands

```bash
# Backend
npm run dev                      # Start with nodemon (development)
npm start                        # Start with node (production)
node utils/seed.js               # Seed subjects and demo user
node utils/seedUsers.js          # Seed 100 leaderboard users
node utils/seedDemoUserData.js   # Seed dashboard demo data

# Frontend
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run preview  # Preview production build
```

---

# Bibliography

1. Coates, H. (2005). The value of student engagement for higher education quality assurance. *Quality in Higher Education*, 11(1), 25–36.

2. Fitzpatrick, K. K., Darcy, A., & Vierhile, M. (2017). Delivering cognitive behavior therapy to young adults with symptoms of depression and anxiety using a fully automated conversational agent (Woebot). *JMIR Mental Health*, 4(2), e19.

3. Hamari, J., Koivisto, J., & Sarsa, H. (2014). Does gamification work? A literature review of empirical studies on gamification. *47th Hawaii International Conference on System Sciences*, 3025–3034.

4. Siemens, G. (2004). Connectivism: A learning theory for the digital age. *International Journal of Instructional Technology and Distance Learning*, 2(1).

5. VanLehn, K. (2011). The relative effectiveness of human tutoring, intelligent tutoring systems, and other tutoring systems. *Educational Psychologist*, 46(4), 197–221.

6. World Health Organization. (2022). *World Mental Health Report: Transforming Mental Health for All*. WHO Press.

7. Mongoose Documentation. (2024). Mongoose v8.3.0. https://mongoosejs.com/docs/

8. React Documentation. (2024). React 18. https://react.dev/

9. Express.js Documentation. (2024). Express 4.x. https://expressjs.com/

10. Google AI. (2024). Gemini API Documentation. https://ai.google.dev/docs

11. Recharts. (2024). Recharts v2 Documentation. https://recharts.org/

12. Tailwind CSS. (2024). Tailwind CSS v3 Documentation. https://tailwindcss.com/docs

13. JSON Web Tokens. (2024). JWT Introduction. https://jwt.io/introduction

14. MongoDB. (2024). MongoDB Manual v6.0. https://www.mongodb.com/docs/manual/

15. Vite. (2024). Vite Guide. https://vitejs.dev/guide/

---

*End of Report*

---

# List of Tables

| Table No. | Title | Chapter | Page |
|-----------|-------|---------|------|
| Table 2.1 | Functional Requirements — Authentication Module | 2 | — |
| Table 2.2 | Functional Requirements — Subject and Learning Module | 2 | — |
| Table 2.3 | Functional Requirements — Video Progress Module | 2 | — |
| Table 2.4 | Functional Requirements — Quiz Module | 2 | — |
| Table 2.5 | Functional Requirements — Dashboard and Analytics Module | 2 | — |
| Table 2.6 | Functional Requirements — Chatbot Module | 2 | — |
| Table 2.7 | Functional Requirements — Leaderboard Module | 2 | — |
| Table 2.8 | Functional Requirements — Stress Relief Module | 2 | — |
| Table 2.9 | Functional Requirements — Psychologists Module | 2 | — |
| Table 2.10 | Backend Dependencies with Versions | 2 | — |
| Table 2.11 | Frontend Dependencies with Versions | 2 | — |
| Table 2.12 | Performance Requirements | 2 | — |
| Table 2.13 | Hardware Requirements — Server | 2 | — |
| Table 2.14 | Hardware Requirements — Client | 2 | — |
| Table 3.1 | Module-wise Route-Controller Mapping | 3 | — |
| Table 4.1 | Test Cases — Authentication Module | 4 | — |
| Table 4.2 | Test Cases — Quiz Module | 4 | — |
| Table 4.3 | Test Cases — Video Progress Module | 4 | — |
| Table 4.4 | Test Cases — Chatbot Module | 4 | — |
| Table 4.5 | Test Cases — Stress Relief Games | 4 | — |
| Table 5.1 | API Endpoint Summary | 5 | — |
| Table 5.2 | Database Collection: users — Field Description | 5 | — |
| Table 5.3 | Database Collection: quizresults — Field Description | 5 | — |
| Table 5.4 | Database Collection: videoprogresss — Field Description | 5 | — |
| Table 5.5 | Database Collection: chatthreads — Field Description | 5 | — |
| Table 5.6 | Database Collection: chatmessages — Field Description | 5 | — |
| Table A.1 | Demo User Credentials | Appendix | — |
| Table A.2 | Key npm Commands — Backend | Appendix | — |
| Table A.3 | Key npm Commands — Frontend | Appendix | — |

---

# List of Figures

| Figure No. | Title | Chapter | Page |
|------------|-------|---------|------|
| Figure 1.1 | NeuroBuddy System Overview | 1 | — |
| Figure 3.1 | Use Case Diagram — NeuroBuddy System | 3 | — |
| Figure 3.2 | Data Flow Diagram — Level 0 (Context Diagram) | 3 | — |
| Figure 3.3 | Data Flow Diagram — Level 1 (Detailed Flow) | 3 | — |
| Figure 3.4 | Activity Diagram — Complete User Journey | 3 | — |
| Figure 3.5 | Flowchart — Quiz Submission Flow | 3 | — |
| Figure 3.6 | Flowchart — Video Progress Flow | 3 | — |
| Figure 3.7 | Class Diagram — Backend Models and Relationships | 3 | — |
| Figure 3.8 | ER Diagram — Database Entities and Relationships | 3 | — |
| Figure 3.9 | Sequence Diagram — Chat Message Flow | 3 | — |
| Figure 3.10 | Logical Database Design — Collection Relationships | 3 | — |
| Figure 4.1 | MERN Stack Architecture | 4 | — |
| Figure 4.2 | JWT Authentication Flow | 4 | — |
| Figure 5.1 | Login Page — User Interface | 5 | — |
| Figure 5.2 | Dashboard — Analytics and Charts | 5 | — |
| Figure 5.3 | Video Lectures Page — Subject-wise Listing | 5 | — |
| Figure 5.4 | Video Player — YouTube Embedded Player | 5 | — |
| Figure 5.5 | Quiz Interface — Question and Options | 5 | — |
| Figure 5.6 | Quiz Results — Score and Answer Review | 5 | — |
| Figure 5.7 | Wellness Bot — Chat Interface | 5 | — |
| Figure 5.8 | Career Bot — Chat Interface | 5 | — |
| Figure 5.9 | Leaderboard — Ranked User Table | 5 | — |
| Figure 5.10 | Public Profile — Performance Graphs | 5 | — |
| Figure 5.11 | Psychologists Directory — Profile Cards | 5 | — |
| Figure 5.12 | Stress Relief Zone — Games Tab | 5 | — |
| Figure 5.13 | Stress Relief Zone — Techniques Tab | 5 | — |
| Figure 5.14 | MongoDB Compass — users Collection | 5 | — |
| Figure 5.15 | MongoDB Compass — subjects Collection | 5 | — |
| Figure 5.16 | MongoDB Compass — quizresults Collection | 5 | — |

---

# List of Abbreviations

| Abbreviation | Full Form |
|---|---|
| AI | Artificial Intelligence |
| API | Application Programming Interface |
| ARIA | Accessible Rich Internet Applications |
| AWS | Amazon Web Services |
| BCrypt | Blowfish Crypt (password hashing algorithm) |
| CBT | Cognitive Behavioral Therapy |
| CDN | Content Delivery Network |
| CI/CD | Continuous Integration / Continuous Deployment |
| CORS | Cross-Origin Resource Sharing |
| CPU | Central Processing Unit |
| CRUD | Create, Read, Update, Delete |
| CSS | Cascading Style Sheets |
| D3 | Data-Driven Documents (JavaScript library) |
| DB | Database |
| DBMS | Database Management System |
| DOM | Document Object Model |
| DFD | Data Flow Diagram |
| ER | Entity-Relationship |
| ES | ECMAScript |
| FK | Foreign Key |
| GB | Gigabyte |
| GUI | Graphical User Interface |
| HMR | Hot Module Replacement |
| HTML | HyperText Markup Language |
| HTTP | HyperText Transfer Protocol |
| HTTPS | HyperText Transfer Protocol Secure |
| IDE | Integrated Development Environment |
| IFrame | Inline Frame |
| i18n | Internationalization |
| JSON | JavaScript Object Notation |
| JSX | JavaScript XML |
| JWT | JSON Web Token |
| LLM | Large Language Model |
| LMS | Learning Management System |
| MB | Megabyte |
| MERN | MongoDB, Express.js, React.js, Node.js |
| ML | Machine Learning |
| MVC | Model-View-Controller |
| NIMHANS | National Institute of Mental Health and Neuro Sciences |
| NoSQL | Not Only SQL |
| npm | Node Package Manager |
| ODM | Object Document Mapper |
| ORM | Object Relational Mapper |
| PK | Primary Key |
| PWA | Progressive Web Application |
| RAM | Random Access Memory |
| REST | Representational State Transfer |
| SDK | Software Development Kit |
| SPA | Single Page Application |
| SQL | Structured Query Language |
| SSL | Secure Sockets Layer |
| TLS | Transport Layer Security |
| UI | User Interface |
| URL | Uniform Resource Locator |
| UX | User Experience |
| WHO | World Health Organization |
| WCAG | Web Content Accessibility Guidelines |
| YT | YouTube |

---

# Notations

The following notations are used consistently throughout this report:

| Notation | Meaning | Example |
|---|---|---|
| `monospace` | Code, file names, commands, API endpoints | `npm run dev`, `/api/auth/login` |
| **Bold** | Key terms, important concepts, section emphasis | **JWT**, **bcrypt** |
| *Italic* | Foreign terms, titles of referenced works, variable names | *Quality in Higher Education* |
| [PK] | Primary Key — unique identifier for a database document | [PK] _id: ObjectId |
| [FK] | Foreign Key — reference to another collection's document | [FK] userId: ObjectId |
| → | Directional flow in algorithms, sequences, and activity diagrams | Student → Frontend → Backend |
| 1:N | One-to-Many relationship between two entities | User 1:N QuizResult |
| 1:1 | One-to-One relationship between two entities | User 1:1 Profile |
| N:M | Many-to-Many relationship between two entities | Student N:M Subject |
| `{ }` | JSON object or request/response body | `{ email, password }` |
| `[ ]` | Array or list of items | `videos[]`, `options[]` |
| `^` | Version constraint in package.json (compatible with) | `^18.2.0` |
| `>=` | Minimum version requirement | Node.js `>=18` |
| `//` | Single-line code comment | `// Hash password before save` |
| `/* */` | Multi-line code comment | `/* Middleware pipeline */` |
| `...` | Continuation or truncation of code/data | `{ name, email, ... }` |
| `req` | HTTP Request object in Express.js | `req.user`, `req.body` |
| `res` | HTTP Response object in Express.js | `res.json()`, `res.status()` |
| `next` | Next middleware function in Express.js pipeline | `next(error)` |
| `async/await` | Asynchronous JavaScript syntax | `const data = await fetch()` |
| `env` | Environment variable | `process.env.JWT_SECRET` |

---

# Symbols

The following symbols appear in the system diagrams (Use Case, ER, DFD, Class, Sequence, Flowchart, Activity):

## Use Case Diagram Symbols

| Symbol | Description |
|---|---|
| Oval / Ellipse | Use Case — represents a system function or feature |
| Stick Figure | Actor — represents a user or external system interacting with the application |
| Rectangle with dashed border | System Boundary — defines the scope of the system |
| Solid arrow (→) | Association — connects an actor to a use case |
| Dashed arrow with label | Dependency relationship (uses, extends, includes) |

## ER Diagram Symbols

| Symbol | Description |
|---|---|
| Rectangle with colored header | Entity — represents a MongoDB collection (e.g., USER, SUBJECT) |
| Solid line with arrow (→) | Relationship — directional association between entities |
| Polyline with waypoints | Routed relationship — avoids crossing entity boxes |
| [PK] prefix | Primary Key attribute — uniquely identifies a document |
| [FK] prefix | Foreign Key attribute — references another collection |
| Dashed horizontal line | Separator between attributes and methods within an entity |
| 1, N labels on arrows | Cardinality — indicates one-to-many relationship multiplicity |

## Data Flow Diagram Symbols

| Symbol | Description |
|---|---|
| Circle / Ellipse | Process — a transformation or computation (e.g., P1: Auth) |
| Rectangle | External Entity — actor outside the system boundary (Student, Admin) |
| Open-ended rectangle (two parallel lines) | Data Store — persistent storage (D1: Users, D2: Subjects) |
| Solid arrow with label | Data Flow — direction and name of data movement |
| Dashed arrow | Return / response data flow |

## Class Diagram Symbols

| Symbol | Description |
|---|---|
| Rectangle divided into 3 sections | Class — name (top), attributes (middle), methods (bottom) |
| `-` prefix on attribute | Private attribute — internal to the class |
| `+` prefix on method | Public method — accessible externally |
| Solid arrow (→) | Association — directional relationship between classes |
| `1..N` label on arrow | Multiplicity — one-to-many association |
| Dashed separator line | Divides attributes section from methods section |

## Sequence Diagram Symbols

| Symbol | Description |
|---|---|
| Rectangle at top | Lifeline header — represents a participant (actor or component) |
| Vertical dashed line | Lifeline — represents the existence of a participant over time |
| Thin vertical rectangle on lifeline | Activation box — shows when a participant is active/processing |
| Solid horizontal arrow (→) | Synchronous message — request or method call |
| Dashed horizontal arrow (-->) | Return message — response or return value |
| Number on left margin | Sequence step number for reference |

## Flowchart Symbols

| Symbol | Description |
|---|---|
| Rounded rectangle (pill shape) | Terminal — Start or End of the process |
| Rectangle | Process — an action or operation step |
| Diamond | Decision — a conditional branch (Yes/No) |
| Arrow (→) | Flow of control — direction of process execution |
| Loop-back arrow | Iteration — repeating a step based on a condition |

## Activity Diagram Symbols

| Symbol | Description |
|---|---|
| Filled black circle | Initial Node — starting point of the activity |
| Filled black circle with outer ring | Final Node — end point of the activity |
| Rounded rectangle | Action — an activity performed by a participant |
| Diamond | Decision Node — conditional branch with guard conditions |
| Thick horizontal bar | Fork / Join Bar — parallel split or synchronization of flows |
| Vertical swimlane | Partition — groups activities by responsible participant |
| Arrow (→) | Control Flow — direction of activity execution |
| Dashed arrow | Object Flow — passing data between activities |
