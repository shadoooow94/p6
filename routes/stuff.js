const express = require('express'); // Import express
const auth = require('../middleware/auth'); // Import the auth middleware

const router = express.Router(); // Import the router

const stuffCtrl = require('../controllers/stuff'); // Import the controller


 //crud//
router.post(' / ',auth, stuffCtrl.createThing); // Route to create a new thing
router.put('/:id',auth, stuffCtrl.modifyThing); // Route to modify a thing
router.delete('/;id',auth, stuffCtrl.deleteThing ); // Route to delete a thing
router.get('/:id',auth, stuffCtrl.getOneThing); // Route to get one thing
router.get(' / ', auth, stuffCtrl.getAllThings); // Route to get all things//

//crud//
module.exports = router; // Export the router to use in app.js