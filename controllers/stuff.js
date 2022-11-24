const thing = require('../models/thing'); // Import the model
const modifyThing = require('../models/thing'); 
const deleteThing = require('../models/thing');
const getOneThing = require('../models/thing');
const getAllThings = require('../models/thing');



exports.createThing =  (req, res, next) => { /* Route to create a new thing */
delete req.body._id;
const thing = new Thing({
...req.body

});
thing.save()
.then(() => res.status(201).json({ message: 'Objet enregistré !'}))
.catch(error => res.status(400).json({ error }));
};

exports.modifyThing = (req, res, next) => {(req, res, next) =>  /* Route to modify a thing */ 
Thing.updateOne({ _id: req.params //mettre a jour ou modifié un thing qui correspond a l objet que nous passons en premier argument//
.id }, {
 ...req.body,
 _id: req.params.id
})
 .then(() => res.status(200).json({ message: 'Objet modifié !'}))
 .catch(error => res.status(400).json({ error }));
};  /* Route to modify a thing */

exports.deleteThing =(req, res, next) => { /* Route to delete a thing */
Thing.deleteOne({ _id: req.params.id })
 .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
 .catch(error => res.status(400).json({ error }));
};
/* Route to delete a thing */

exports.getOneThing = (req, res, next) => { /* Route to get one things (une chose precise) */ 
Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};
 /* Route to get one thing */

 exports.getAllThings =(req, res, next) => {
    thing.find()
    .then(things => res.status(200).json(things)) 
    .catch(error => res.status(400).json({ error }));
    };  /* Route to get all things */