const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/smartphone');
        console.log('Database connected');
    } catch (error) {
        console.log('Database connection failed', error.message);
    }
}

module.exports = connectDb;