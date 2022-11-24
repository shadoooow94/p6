const moongose = require('mongoose');

const thingSchema = moongose.Schema({
    email: String,
    password: String,
});
    
module.exports = moongose.model('User', thingSchema);  // Export the model to use in routes\stuff.js 