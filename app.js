const express = require('express'); // Import express

const mongoose = require('mongoose');
const app = express(); // express is a function that returns an object

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');



mongoose.connect('mongodb+srv://guillaume:XJqU8JLezqLzf5dz@cluster0.iqeec8x.mongodb.net/?retryWrites=true&w=majority', /* mangoose.connect() is a function that returns a promise */ // Connect to the database
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json()); // Middleware to parse incoming requests with JSON payloads


app.use((req, res, next) => { /* Middleware to add headers to the response */
    res.setHeader('Access-Control-All*-+ow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  app.use('/api/stuff', stuffRoutes); // Use the router for any request to the /api/stuff URL
 app.use('/api/auth', userRoutes); // Use the router for any request to the /api/auth URL
 
 


  
 
module.exports = app; // export the app object to use in other files