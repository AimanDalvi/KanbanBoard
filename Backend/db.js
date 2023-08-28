const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/kanbanboard"

const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  };

module.exports = connectToMongo;