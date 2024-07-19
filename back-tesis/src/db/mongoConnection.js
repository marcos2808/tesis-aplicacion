import mongoose from 'mongoose';

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://vejegamarcos:vHM02ycTEP8oJj0S@marcos.gegllmp.mongodb.net/espotifai2");
      console.log('Connected to MongoDB');
    } catch (error) {
      console.log('Error connecting to MongoDB:', error);
    }
};

export default connectDB;