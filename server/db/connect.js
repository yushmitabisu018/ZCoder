
const mongoose = require('mongoose');

const connectDB = () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI not found in environment variables');
  }
  return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connectDB;

