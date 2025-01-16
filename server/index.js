const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes")
const Note = require("./models/CreateNote");
const authMiddleware = require('./middleware/jwt')

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
app.use("/notes", authMiddleware, noteRoutes);
app.use("/files", express.static("files"));

//add note
app.post("/add-note", authMiddleware, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req;

    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" })
    }

    if (!content) {
        return res
            .status(400)
            .json({ error: true, message: "content is required" });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfullu",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server Error",
        });
    }
});

// edit note
app.put("/edit-note/:noteId", authMiddleware, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags } = req.body;
    const { user } = req;

    if (!title && !content && !tags) {
        return res
            .status(400)
            .json({ error: true, message: "No changes provided" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server Error",
        });
    }
});

//get all notes
app.get("/get-all-notes", authMiddleware, async (req, res) => {
    const { user } = req;
    console.log(user);

    try {
        const notes = await Note.find({ userId: user._id })

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server Error",
        });
    }
});

// Delete Note
app.delete("/delete-note/:noteId", authMiddleware, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id })

        return res.json({
            error: false,
            message: "Note deleted successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server Error",
        });
    }
});

// Search Notes
app.get("/search-notes/", authMiddleware, async (req, res)=>{
    const { user } = req.user;
    const { query } = req.query;

    if(!query){
        return res
        .status(400)
        .json({ error: true, message: "Search query is required " });
    }

    try{
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
            ],
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





