const express = require('express'); // Import express
const router = express.Router(); // Import the router
const auth = require('../middleware/auth'); // Import the auth middleware
const multer = require('../middleware/multer-config'); // Import the multer-config middleware 
 

  

const stuffCtrl = require('../controllers/stuff'); // Import the controller



 //crud//
router.post('/',auth, multer, stuffCtrl.createsauces); // Route to create a new thing
router.put('/:id',auth, multer, stuffCtrl.modifysauces); // Route to modify a thing
router.delete('/:id',auth ,multer, stuffCtrl.deleteSauces ); // Route to delete a thing
router.get('/:id',auth, stuffCtrl.getOnesauces); // Route to get one thing
router.get('/', auth, stuffCtrl.getAllsauces); // Route to get all things//
router.post('/:id/like', auth, stuffCtrl.likeNDislike) // Route to like or dislike a thing
  
//crud//
module.exports = router; // Export the router to use in app.js