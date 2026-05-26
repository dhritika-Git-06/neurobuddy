const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB Connected:', conn.connection.host);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('\n💡 SOLUTION:');
    console.error('1. Go to MongoDB Atlas: https://cloud.mongodb.com');
    console.error('2. Click on "Network Access" in the left sidebar');
    console.error('3. Click "Add IP Address"');
    console.error('4. Click "Allow Access from Anywhere" (0.0.0.0/0)');
    console.error('5. Click "Confirm"');
    console.error('6. Wait 1-2 minutes for changes to apply');
    console.error('7. Restart this server\n');
    
    // Don't exit, allow server to start
    console.log('⚠️  Server starting without database connection...');
  }
};

module.exports = connectDB;
