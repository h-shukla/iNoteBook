const express = require("express");
const User = require("../models/User.js");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// Should be kept in env variable
const JWT_SECRET = 'haleluyah';

// Route 1:
// Create a user using: POST "/api/auth/createuser". No login required
router.post(
	"/createuser",
	[
		// Setting up validation for requests with express-validator
		body("name", "Enter a valid name").isLength({ min: 3 }),
		body("email", "Enter a valida email").isEmail(),
		body("password", "Password must be added").isLength({ min: 5 }),
	],
	async (req, res) => {
		// If there are errors, return Bad Requests
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			// check whether the user with this email exists already
			let user = await User.findOne({ email: req.body.email });
			console.log(user);
			if (user) {
				return res
					.status(400)
					.json({
						error: "sorry user with this email already exists",
					});
			}
			// Adding encryption to the password
			const salt = await bcrypt.genSalt(10);
			const secPass = await bcrypt.hash(req.body.password, salt);
			// Create a new user
			user = await User.create({
				name: req.body.name,
				password: secPass,
				email: req.body.email,
			});

			// JWT authentication
			const data = {
				user: {
					'id': user.id
				}
			};
			const authToken = jwt.sign(data, JWT_SECRET);

			// respond with relevant information
			// return res.json(user);
			return res.json({ authToken });

		} catch (error) {
			// ideally we put it in logger/SQS(simple queue service)
			console.error(error.message);
			return res.status(500).send("Internal server error");
		}
	}
);

// Route 2:
// Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
	body("email", "Enter a valida email").isEmail(),
	body("password", "Password cannot be blank").exists(),
], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// Using destructuring
	const { email, password } = req.body;
	try {
		// Checking for email
		let user = await User.findOne({ email });
		if (!user) {
			res.status(400).json({ error: 'Please try to login with correct credintials' });
		}
		// Checking for password
		const passwordCompare = await bcrypt.compare(password, user.password);
		if (!passwordCompare) {
			return res.status(400).json({ error: 'Please try to login with correct credintials' });
		}
		// JWT authentication
		const data = {
			user: {
				id: user.id
			}
		};
		const authToken = jwt.sign(data, JWT_SECRET);
		return res.json({ authToken });

	} catch (error) {
		// ideally we put it in logger/SQS(simple queue service)
		console.error(error.message);
		return res.status(500).send("Internal server error");
	}

});

// Route 3:
// Get logged in user Details using: POST "/api/auth/getuser". No login required
router.post('/getuser', fetchuser, async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId).select('-passowrd');
		res.send(user);
	} catch (error) {
		// ideally we put it in logger/SQS(simple queue service)
		console.error(error.message);
		return res.status(500).send("Internal server error");
	}
})

module.exports = router;
