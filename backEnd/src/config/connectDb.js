const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/my_database');
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;