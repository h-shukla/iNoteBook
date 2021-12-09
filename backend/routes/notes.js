const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes.js");
const {
    body,
    validationResult
} = require("express-validator");

// Route 1:
// Get all the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async(req, res) => {
    try {
        const notes = await Notes.find({
            user: req.user.id
        });
        return res.json(notes);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error");
    }
});

// Route 2:
// Add a new note using: POST "/api/notes/addnote". Login required
router.post("/addnote", fetchuser, [
    body("title", "Enter a valid title").isLength({
        min: 3
    }),
    body("description", "Description must be atleast 5 characters").isLength({
        min: 5
    }),
], async(req, res) => {
    try {
        const {
            title,
            description,
            tag
        } = req.body;

        // If there are errors, return Bad Requests
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const notes = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });
        const savedNote = await notes.save();

        return res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error");
    }
});

// Route 3:
// Update existing note using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async(req, res) => {
    const {
        title,
        description,
        tag
    } = req.body;

    try {
        // Create a new note object
        const newNote = {};
        if (title) {
            newNote.title = title;
        };
        if (description) {
            newNote.description = description;
        };
        if (tag) {
            newNote.tag = tag;
        };

        // Find the note to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not Found");
        }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {
            $set: newNote
        }, {
            new: true
        });
        return res.json(note);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error");
    }
});

// Route 4:
// Update existing note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async(req, res) => {
    const {
        title,
        description,
        tag
    } = req.body;
    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not Found");
        }
        // Allow deletion only if user owns this note
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        return res.json({
            success: "Note has been deleted",
            note: note
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error");
    }
});

module.exports = router;