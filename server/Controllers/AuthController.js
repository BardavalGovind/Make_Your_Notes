const express = require('express');
const dotenv = require('dotenv');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const multer = require('multer');
const cloudinary = require('cloudinary');


dotenv.config();

const router = express.Router();

//multer is package helps to take file as user input and memoryStorage means it uses current memory
const storage = multer.memoryStorage();
var upload = multer({
    storage: storage
})

//Signup route
const signup = async (req, res)=>{
    try{
        const { firstName, lastName, userBio, userEmail, userMobile, userName } = req.body;

        //check whether current user exists
        const existingUser = await User.findOne({ userEmail });
        if(existingUser){
            res.status(401).send("User Already exists with this email")
        }

        //check if file is provided
        if(!req.file){
            return res.status(400).json({ error: "No Profile Image Provided" });
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);

        const password = req.body.userPassword;
        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);

        const encryptedPassword = await bcrypt.hash(password, salt);
        console.log("Requested Body: ", req.body);

        const newUser = new User({
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword: encryptedPassword,
            profileImage: result.secure_url
        });

        await newUser.save();

        return res.status(200).json({
            status: "Ok",
            user: newUser
        });

    }
    catch(error){
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};


const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        // console.log(userEmail);

        const user = await User.findOne({ userEmail });

        if (user) {
            const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
            if (passwordMatch) {
                return res.json(user);
            } else {
                return res.json({ status: "Error", getUser: false })
            }
        } else {
            return res.json({ status: "Error", getUser: false });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// const login = async (req, res) => {
//     try {
//         const { userEmail, userPassword } = req.body;

//         // Find user by email
//         const user = await User.findOne({ userEmail });
//         if (!user) {
//             return res.status(400).json({ status: "Error", message: "User not found" });
//         }

//         // Compare the provided password with the hashed password
//         const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
//         if (!passwordMatch) {
//             return res.status(400).json({ status: "Error", message: "Invalid credentials" });
//         }

//         // Generate JWT token
//         // const payload = { _id: user._id, userEmail: user.userEmail };
//         // const token = jwt.sign(payload, process.env.JWT_SECRET);

//         // Send token as response
//         return res.status(200).json({ status: "OK", token });
//     } catch (error) {
//         console.error(error);
//         return res.status(400).json({ error: error.message });
//     }
// };

module.exports = { signup, login };