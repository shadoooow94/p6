const express = require('express'); // Import express
//z3zvqp5rxZluWUvB//
const mongoose = require('mongoose');
const app = express(); // express is a function that returns an object

mongoose.connect('mongodb+srv://guillaume:XJqU8JLezqLzf5dz@cluster0.iqeec8x.mongodb.net/?retryWrites=true&w=majority',
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
app.post('/api/stuff', (req, res, next) => { /* Route to create a new thing */
    console.log(req.body);
    res.status(201).json({
        message: 'utilisateur cree' // 201 = created

});});
app.get('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });  

module.exports = app; // export the app object to use in other files