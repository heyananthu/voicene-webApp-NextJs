import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connections[0].readyState) return;

        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'voicene',
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log('MongoDB connected successfully 🚀');
    } catch (error) {
        console.error('MongoDB connection failed ❌', error);
    }
};

export default connectDB;
