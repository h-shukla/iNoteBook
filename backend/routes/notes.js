const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes.js");
const { body, validationResult } = require("express-validator");

// Route 1:
// Get all the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error");
    }
});

// Route 2:
// Add a new note using: POST "/api/notes/addnote". Login required
router.get("/addnote", fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // If there are errors, return Bad Requests
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await notes.save();

        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error");
    }
});

module.exports = router;