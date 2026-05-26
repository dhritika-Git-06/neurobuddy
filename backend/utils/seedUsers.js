require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const QuizResult = require('../models/QuizResult');
const VideoProgress = require('../models/VideoProgress');
const Subject = require('../models/Subject');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const firstNames = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
  'Skylar', 'Rowan', 'Sage', 'River', 'Phoenix', 'Dakota', 'Reese', 'Cameron',
  'Blake', 'Drew', 'Emerson', 'Finley', 'Harper', 'Hayden', 'Jamie', 'Jesse',
  'Kai', 'Logan', 'Micah', 'Noah', 'Parker', 'Peyton', 'Sam', 'Sawyer',
  'Aria', 'Ethan', 'Olivia', 'Liam', 'Emma', 'Mason', 'Sophia', 'Lucas',
  'Isabella', 'Oliver', 'Mia', 'Elijah', 'Charlotte', 'James', 'Amelia', 'Benjamin',
  'Ava', 'William', 'Evelyn', 'Henry', 'Abigail', 'Sebastian', 'Emily', 'Jack',
  'Luna', 'Owen', 'Ella', 'Theodore', 'Scarlett', 'Aiden', 'Grace', 'Jackson',
  'Chloe', 'Samuel', 'Victoria', 'David', 'Madison', 'Joseph', 'Eleanor', 'Carter',
  'Hannah', 'Wyatt', 'Lily', 'John', 'Addison', 'Dylan', 'Aubrey', 'Luke',
  'Ellie', 'Gabriel', 'Stella', 'Anthony', 'Natalie', 'Isaac', 'Zoe', 'Grayson',
  'Leah', 'Julian', 'Hazel', 'Levi', 'Violet', 'Christopher', 'Aurora', 'Joshua',
  'Savannah', 'Andrew', 'Audrey', 'Lincoln', 'Brooklyn', 'Mateo', 'Bella', 'Ryan'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Walker', 'Hall',
  'Allen', 'Young', 'King', 'Wright', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson',
  'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker',
  'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed',
  'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson',
  'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James',
  'Watson', 'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes',
  'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson'
];

const fields = [
  'Computer Science',
  'Data Science',
  'Business Management',
  'Psychology',
  'Mechanical Engineering',
  'Biology',
  'Finance'
];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - getRandomNumber(0, daysAgo));
  return date;
};

// Generate fluctuating scores to create realistic performance patterns
const generateFluctuatingScores = (totalQuestions, performanceLevel) => {
  // performanceLevel: 'high' (70-100%), 'medium' (50-80%), 'low' (30-60%)
  let baseMin, baseMax;
  
  if (performanceLevel === 'high') {
    baseMin = Math.floor(totalQuestions * 0.7);
    baseMax = totalQuestions;
  } else if (performanceLevel === 'medium') {
    baseMin = Math.floor(totalQuestions * 0.5);
    baseMax = Math.floor(totalQuestions * 0.8);
  } else {
    baseMin = Math.floor(totalQuestions * 0.3);
    baseMax = Math.floor(totalQuestions * 0.6);
  }
  
  // Add randomness for fluctuation
  const fluctuation = getRandomNumber(-2, 2);
  const score = Math.max(0, Math.min(totalQuestions, getRandomNumber(baseMin, baseMax) + fluctuation));
  
  return score;
};

// Determine performance level based on user characteristics
const getPerformanceLevel = (streak) => {
  if (streak > 15) return 'high';
  if (streak > 7) return 'medium';
  return Math.random() > 0.5 ? 'medium' : 'low';
};

const seedRandomUsers = async () => {
  try {
    await connectDB();

    console.log('🌱 Starting to seed random users...');

    // Get all subjects
    const subjects = await Subject.find();
    if (subjects.length === 0) {
      console.log('❌ No subjects found. Please run npm run seed first!');
      process.exit(1);
    }

    // Create 100 random users
    const numberOfUsers = 100;
    const users = [];

    for (let i = 0; i < numberOfUsers; i++) {
      const firstName = getRandomElement(firstNames);
      const lastName = getRandomElement(lastNames);
      const name = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@student.com`;
      const fieldOfStudy = getRandomElement(fields);
      const streak = getRandomNumber(0, 45);

      const user = await User.create({
        name,
        email,
        password: 'Student123!',
        fieldOfStudy,
        streak,
        lastActivity: getRandomDate(7)
      });

      users.push(user);

      // Get subjects for this user's field
      const userSubjects = subjects.filter(s => s.fieldOfStudy === fieldOfStudy);
      
      // Determine performance level based on streak
      const performanceLevel = getPerformanceLevel(streak);

      // Create random quiz results with fluctuating scores over time
      const numberOfQuizzes = getRandomNumber(5, 25);
      const quizDates = [];
      
      // Generate dates for quizzes (spread over last 60 days)
      for (let j = 0; j < numberOfQuizzes; j++) {
        quizDates.push(getRandomDate(60));
      }
      
      // Sort dates chronologically
      quizDates.sort((a, b) => a - b);
      
      for (let j = 0; j < numberOfQuizzes; j++) {
        const subject = getRandomElement(userSubjects);
        if (subject.quizzes && subject.quizzes.length > 0) {
          const quiz = getRandomElement(subject.quizzes);
          const totalQuestions = quiz.questions.length;
          
          // Create fluctuating performance
          let currentPerformance = performanceLevel;
          
          // Add some variation over time (simulate learning curve)
          if (j < numberOfQuizzes / 3) {
            // Early quizzes - might be lower
            currentPerformance = Math.random() > 0.6 ? performanceLevel : 'low';
          } else if (j > (numberOfQuizzes * 2) / 3) {
            // Later quizzes - might improve
            if (performanceLevel === 'medium') {
              currentPerformance = Math.random() > 0.5 ? 'high' : 'medium';
            }
          }
          
          const score = generateFluctuatingScores(totalQuestions, currentPerformance);

          await QuizResult.create({
            userId: user._id,
            subjectId: subject._id,
            quizId: quiz._id,
            score,
            totalQuestions,
            answers: Array(totalQuestions).fill(0).map((_, idx) => ({
              questionIndex: idx,
              selectedAnswer: getRandomNumber(0, 3),
              isCorrect: idx < score
            })),
            date: quizDates[j]
          });
        }
      }

      // Create random video progress
      const numberOfVideos = getRandomNumber(8, 30);
      for (let k = 0; k < numberOfVideos; k++) {
        const subject = getRandomElement(userSubjects);
        if (subject.videos && subject.videos.length > 0) {
          const videoIndex = getRandomNumber(0, subject.videos.length - 1);
          const videoId = `${subject._id}-${videoIndex}`;
          
          // Higher performers complete more videos
          let percentage;
          if (performanceLevel === 'high') {
            percentage = getRandomNumber(60, 100);
          } else if (performanceLevel === 'medium') {
            percentage = getRandomNumber(40, 90);
          } else {
            percentage = getRandomNumber(20, 70);
          }

          await VideoProgress.create({
            userId: user._id,
            videoId,
            subjectId: subject._id,
            percentage,
            completed: percentage >= 90,
            lastWatched: getRandomDate(45)
          });
        }
      }

      console.log(`✅ Created user ${i + 1}/${numberOfUsers}: ${name} (${performanceLevel} performer)`);
    }

    console.log('\n🎉 Successfully seeded random users!');
    console.log(`📊 Created ${numberOfUsers} users with realistic fluctuating performance data`);
    console.log('📈 Performance levels: High, Medium, and Low performers');
    console.log('📉 Quiz scores fluctuate over time to simulate learning curves');
    console.log('\n🔐 All users have password: Student123!');
    console.log('\n💡 Try logging in as different users to see varied performance!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed Error:', error);
    process.exit(1);
  }
};

seedRandomUsers();
