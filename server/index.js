const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 



// MongoDB Connection
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connection is successful.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        
    }
};


connectDb();


app.get('/', (req, res) => {
    res.send('Welcome to the Notes App API');
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// PORT=5000
// MONGODB_URI="mongodb+srv://bardavalgovind:GnS2005@cluster1.ouyfx.mongodb.net/NewNotes?retryWrites=true&w=majority"
// DB_NAME="NewNotes"
// JWT_SECRET_KEY="mynotes"