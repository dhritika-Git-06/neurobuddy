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

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const seedDemoUserData = async () => {
  try {
    await connectDB();

    console.log('🌱 Adding data to Demo User...');

    // Find demo user
    const demoUser = await User.findOne({ email: 'demo@neurobuddy.com' });
    if (!demoUser) {
      console.log('❌ Demo user not found. Please run npm run seed first!');
      process.exit(1);
    }

    // Get subjects for demo user's field
    const subjects = await Subject.find({ fieldOfStudy: demoUser.fieldOfStudy });
    if (subjects.length === 0) {
      console.log('❌ No subjects found. Please run npm run seed first!');
      process.exit(1);
    }

    // Clear existing data for demo user
    await QuizResult.deleteMany({ userId: demoUser._id });
    await VideoProgress.deleteMany({ userId: demoUser._id });

    console.log('🗑️  Cleared existing demo user data');

    // Create quiz results for last 30 days
    const quizDates = [];
    for (let i = 0; i < 25; i++) {
      const date = new Date();
      date.setDate(date.getDate() - getRandomNumber(0, 30));
      quizDates.push(date);
    }
    quizDates.sort((a, b) => a - b);

    let quizCount = 0;
    for (let i = 0; i < quizDates.length; i++) {
      const subject = subjects[getRandomNumber(0, subjects.length - 1)];
      if (subject.quizzes && subject.quizzes.length > 0) {
        const quiz = subject.quizzes[getRandomNumber(0, subject.quizzes.length - 1)];
        const totalQuestions = quiz.questions.length;
        
        // Create improving performance over time
        let baseScore;
        if (i < quizDates.length / 3) {
          baseScore = getRandomNumber(Math.floor(totalQuestions * 0.5), Math.floor(totalQuestions * 0.7));
        } else if (i < (quizDates.length * 2) / 3) {
          baseScore = getRandomNumber(Math.floor(totalQuestions * 0.6), Math.floor(totalQuestions * 0.85));
        } else {
          baseScore = getRandomNumber(Math.floor(totalQuestions * 0.7), totalQuestions);
        }

        await QuizResult.create({
          userId: demoUser._id,
          subjectId: subject._id,
          quizId: quiz._id,
          score: baseScore,
          totalQuestions,
          answers: Array(totalQuestions).fill(0).map((_, idx) => ({
            questionIndex: idx,
            selectedAnswer: getRandomNumber(0, 3),
            isCorrect: idx < baseScore
          })),
          date: quizDates[i]
        });

        quizCount++;
      }
    }

    console.log(`✅ Created ${quizCount} quiz results`);

    // Create video progress
    let videoCount = 0;
    for (const subject of subjects) {
      if (subject.videos && subject.videos.length > 0) {
        const numVideos = getRandomNumber(2, Math.min(5, subject.videos.length));
        for (let i = 0; i < numVideos; i++) {
          const videoIndex = i;
          const videoId = `${subject._id}-${videoIndex}`;
          const percentage = getRandomNumber(60, 100);

          await VideoProgress.create({
            userId: demoUser._id,
            videoId,
            subjectId: subject._id,
            percentage,
            completed: percentage >= 90,
            lastWatched: new Date(Date.now() - getRandomNumber(0, 20) * 24 * 60 * 60 * 1000)
          });

          videoCount++;
        }
      }
    }

    console.log(`✅ Created ${videoCount} video progress records`);

    // Update user streak
    await User.findByIdAndUpdate(demoUser._id, {
      streak: 5,
      lastActivity: new Date()
    });

    console.log('✅ Updated user streak');

    console.log('\n🎉 Demo user data seeded successfully!');
    console.log('📊 Dashboard will now show:');
    console.log(`   - ${quizCount} quiz results over last 30 days`);
    console.log(`   - ${videoCount} videos watched`);
    console.log('   - 5 day streak');
    console.log('   - Performance graphs with real data');
    console.log('\n💡 Refresh your browser to see the changes!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed Error:', error);
    process.exit(1);
  }
};

seedDemoUserData();
