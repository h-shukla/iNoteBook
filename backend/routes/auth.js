const express = require('express');
const User = require('../models/User.js');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using: POST "/api/auth/". No login required
router.post('/', [
    // Setting up validation for requests with express-validator
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valida email').isEmail(),
    body('password', 'Password must be added').isLength({ min: 5 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.email,
    }).then(user => res.json(user))
    .catch(err => {console.log(error)
    res.json({error: 'Please enter unique value for email', message: err.message})});
});

module.exports = router;
