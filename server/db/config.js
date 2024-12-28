import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// link to connect to MongoDB
const URI = "mongodb+srv://professionalid2003:mentormatch@cluster0.kmhre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// connection to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('Failed to connect to MongoDB:');
        process.exit(1);
    }
};

connectDB();