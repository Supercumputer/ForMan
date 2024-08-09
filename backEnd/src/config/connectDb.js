const mongoose = require('mongoose');
require('dotenv').config();
const connectDb = async () => {
    try {
        // await mongoose.connect('mongodb://127.0.0.1/smartphone');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected');
    } catch (error) {
        console.log('Database connection failed', error.message);
    }
}

module.exports = connectDb;