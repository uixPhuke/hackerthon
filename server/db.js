const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Connected to database");
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
        process.exit(1); // Exit the process if there is an error
    }
};

module.exports = connectDB;