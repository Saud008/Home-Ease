import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

export async function connectDB() {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log('MongoDB Connected:', conn.connection.host); // Debug log
        return conn;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
} 