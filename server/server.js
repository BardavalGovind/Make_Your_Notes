const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');

// Initialize dotenv to access environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON data

app.use('/auth', authRoutes);

// MongoDB Connection
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
        });
        console.log('MongoDB connection is successful.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        
    }
};


connectDb();

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the Notes App API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
