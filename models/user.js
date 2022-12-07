 const mongoose = require('mongoose');//import package mongoose

 const uniqueValidator = require('mongoose-unique-validator');
 // import du package pour verifer que l'on ne peux créé qu'un seul compte avec le meme mail 


 const userSchema = mongoose.Schema({ /* Schema for the user model */
        email: { type: String, required: true,  unique: true }, // impossible de s'inscrire avec un email deja existant//
        password: { type: String, required: true },
    });

    userSchema.plugin(uniqueValidator); // Plugin to use the uniqueValidator

    
    module.exports = mongoose.model('user', userSchema); // Export the model to use in routes\stuff.js

























































    