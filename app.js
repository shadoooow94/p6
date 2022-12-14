const express = require('express'); // Import express

const mongoose = require('mongoose');
const app = express(); // express is a function that returns an object

const stuffRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');
const {get} = require('http');
const Sauces = require('./models/sauces');

// import de dotenv pour cacher les id et password possible par un fichier .env
const dotenv = require('dotenv');
dotenv.config();

// import module helmet protection contre les attaques de type injection
const helmet = require('helmet')


const morgan = require('morgan');   
// Import morgan


// import du moodule pour limiter le nombre de requete possiblepar un même utilisateur
const rateLimiter = require('express-rate-limit');

const connectLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // nombre de requete maximum pour un même ip
    standardHeaders: true,
    legacyHeaders: false
})


// Connect to MongoDB
mongoose.connect('mongodb+srv://guillaume:jmiDLgBPzdIIExa4@cluster0.5997jpa.mongodb.net/?retryWrites=true&w=majority',
/* mangoose.connect() is a function that returns a promise */
// Connect to the database
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connexion à MongoDB réussie !')).catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json()); // Middleware to parse incoming requests with JSON payloads


app.use((req, res, next) => { /* Middleware to add headers to the response */
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(morgan('dev')); // Middleware to log HTTP requests

app.use('/api/sauces', stuffRoutes); // Use the router for any request to the /api/stuff URL
app.use('/api/auth', userRoutes); // Use the router for any request to the /api/auth URL
app.use('/images', express.static(path.join(__dirname, 'images')));
// Middleware to serve static files

// mise en place du pare-feu helmet pour la protection des données sensibles 
app.use(helmet());  
app.use(helmet.crossOriginResourcePolicy({policy: 'same-site'}))



module.exports = app; // export the app object to use in other files
