//import du package mongoose pour acces a la base données 
const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
  userId : {type: 'string', required: true},
  name : {type: 'string', required: true},
  manufacturer : {type: 'string', required: true},
  description : {type: 'string', required: true},
  mainPepper : {type: 'string', required: true},
  imageUrl : {type: 'string', required: true},
  heat : {type : 'Number', required: true},
  likes: {type: 'Number', default: 0},
  dislikes : {type: 'Number', default: 0},
  usersLiked : {type : [String]},
  usersDisliked : {type:[String]}
})
/* Route to create a sauces */

    
module.exports = mongoose.model('Sauces', saucesSchema);
  // Export the model to use in routes\stuff.js 


   