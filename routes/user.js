const express = require('express'); // Import express
const router = express.Router(); // Import the router
const userCtrl = require('../controllers/user'); // Import the user controller
const pwdValidator = require('../middleware/pwd')


router.post('/signup',  pwdValidator, userCtrl.signup); // Create a route for the signup
router.post('/login', userCtrl.login); // Create a route for the login

module.exports = router; // Export the router to use in app.js 