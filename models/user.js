 const mongoose = require('mongoose');

 const uniqueValidator = require('mongoose-unique-validator');


 const userSchema = mongoose.Schema({ /* Schema for the user model */
        email: { type: String, required: true,  unique: true }, // impossible de s'inscrire avec un email deja existant//
        password: { type: String, required: true },
    });

    userSchema.plugin(uniqueValidator); // Plugin to use the uniqueValidator

    
    module.exports = mongoose.model('user', userSchema); // Export the model to use in routes\stuff.js

























































    