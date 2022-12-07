const Sauces = require('../models/sauces'); // Import the model
const fs = require('fs'); // Import fs
 




//crud//
 
exports.createsauces = (req, res, next) => {
    const saucesObject = JSON.parse(req.body.sauce);
    delete saucesObject._id;
    delete saucesObject._userId;
      
    const sauces = new Sauces({
        ...saucesObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    
    });
   
    sauces.save() 
    .then(() => res.status(201).json({message: 'Objet enregistré !'}))
    .catch((error) =>  res.status(400).json( { error }))
 };
  
/* Route to modify a sauces */ 

// controlleur pour modifié une sauce 
exports.modifysauces = (req, res, next) => {
 
    Sauces.findOne({_id: req.params.id})
    .then((sauce) =>{ 

      if (sauce.userId === req.auth.userId) {
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`,()=> {
      const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
      : { ...req.body};
      Sauces.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
      .then(() => res.status(200).json({ message: "sauce modifié !  "}))
      .catch((error) => res.status(400).json({error}));


      
    }) 
  } else {
    res.status(401).json({ error: "vous n'avez pas le droit de modifier cette sauce" });
  }
})
};
;  /* Route to modify a sauces */

exports.deleteSauces = (req, res, next) => {
    Sauces.findOne({_id: req.params.id})
    .then((sauce) => {
      if (sauce.userId === req.auth.userId) {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'la sauce à été supprimé ! '}))
        .catch((error) => res.status(400).json({error}));
      })}
      
          })
      
  }

/* Route to delete a sauces */
exports.getOnesauces = (req, res, next) => { /* Route to get one saucess (une chose precise) */ 
    Sauces.findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};
 /* Route to get one sauces */ 
 exports.getAllsauces=(req, res, next) => {
    Sauces.find()
    .then((sauces) => res.status(200).json(sauces)) 
    .catch((error) => res.status(400).json({ error }));
    };  /* Route to get all saucess */

    //like dislike

    exports.likeNDislike = (req,res,next) => {
        let like = req.body.like;
        let userId  = req.body.userId;
        let saucesId = req.params.id;
        
        switch (like) {
          // like = case est égal à 1 on incremente le like de +1
          case 1:
           Sauces.updateOne(
            {
              _id: saucesId
            },
            {
              $push: {usersLiked: userId}, $inc: {likes: +1}
            }
           )
           .then(() => {
            res.status(200).json({ message: "like ajouté !" });
           })
           .catch((error) => res.status(400).json({error}));
           break;
          // permet de modifié un like 
           case 0 :
            Sauces.findOne({_id: saucesId})
            .then((sauces) =>{
      
              if (sauces.usersLiked.includes(userId)){
                Sauces.updateOne({_id: saucesId},
                  {$pull: {usersLiked: userId}, $inc: {likes:-1}}
                  )
                  .then(() => res .status(200).json({message: "like modifié !"}))
                  .catch((error) => res.status(400).json({error}));
              }
              if (sauces.usersDisliked.includes(userId)){
                Sauces.updateOne({_id: saucesId},
                  {$pull: {usersDisliked: userId}, $inc: {likes: -1}})
                  .then (() => res.status(200).json({message: "disliked modifié !"}))
                  .catch((error) => res.status(400).json({error}));
              }
            })
            .catch((error) => res.status(404).json({error}));
            break;
            // permet de disliker une sauce 
          case -1:
            Sauces.updateOne({_id: saucesId},
            {$push: {usersDisliked : userId}, $inc: {dislikes: +1}})
            .then(() => res.status(200).json({message: "disliked ajouté!"}))
            .catch((error) => res.status(400).json({error}));
            break;
      
            default:console.log(error);
        }
      }