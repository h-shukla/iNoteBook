const express = require('express');
const User = require('../models/User.js');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    // Setting up validation for requests with express-validator
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valida email').isEmail(),
    body('password', 'Password must be added').isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors, return Bad Requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
	return res.status(400).json({ errors: errors.array() });
    }
    try {
	// check whether the user with this email exists already
	let user = await User.findOne({email: req.body.email});
	console.log(user);
	if(user) {
	    return res.status(400).json({error: 'sorry user with this email already exists'});
	}
	user = await User.create({
	    name: req.body.name,
	    password: req.body.email,
	    email: req.body.email,
	});
	// respond with relevant information
	return res.json(user);
    } catch (error) {
	// ideally we put it in logger/SQS(simple queue service)
	console.error(error.message);
	return res.status(500).send("Some error ocurred");
    }
});

module.exports = router;
