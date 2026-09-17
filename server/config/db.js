const mongoose = require('mongoose');
const dns = require('dns');

// Configure reliable DNS resolution (Google & Cloudflare) for Windows SRV queries
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore if permissions or env prevents overriding default resolvers
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000
    });
    console.log(`✓ MongoDB Connected to Atlas: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`MongoDB connection note: ${error.message}. Continuing with in-memory fallback if needed.`);
    return false;
  }
};

module.exports = connectDB;