const Sauce = require('../models/Sauce'); //On récupère le modèle type d'une sauce
const fs = require('fs'); //Permet d'accéder aux modifs et suppression du système fichiers

exports.createSauce = (req, res, next) => { 
    // delete req.body._id;
    const sauceObject = JSON.parse(req.body.sauce); //On récupère les infos de modifySauce pour créer une nouvelle sauce
    const sauce = new Sauce({ //Création d'une sauce
        ...sauceObject, // On récupère toutes les valeurs d'entrée dans un nouvel Object
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // On insère l'image dans le dossier image.
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce créée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => { //Pour modifier une sauce sélectionnée
     const sauceObject = req.file ? //S'il y a modification de l'image de la sauce en plus du texte
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //On récupère le nouveau fichier image
    } : { ...req.body }; //et on l'insère dans le corps de la requête
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //Modification de la sauce 
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => { //Pour supprimer une sauce sélectionnée
    Sauce.findOne({ _id: req.params.id }) //On recherche la sauce sélectionnée par son Id
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]; //On retrouve l'image correspondante de la sauce à ôter
      fs.unlink(`images/${filename}`, () => { //Et on l'enlève du fichier système
        Sauce.deleteOne({ _id: req.params.id }) //Et on supprime le reste de la sauce
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => { //Récupère les informations d'une sauce sélectionnée grâce à son ID
    Sauce.findOne({ _id: req.params.id})
     .then( sauce => res.status(200).json(sauce))
     .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => { //Récupère toutes les sauces dans la base de données pour les afficher
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

/* Pour liker et disliker les différentes sauces*/
exports.likeCtrl = (req, res, next) => {

    const userTag = req.body.userId; //On cible un user qui like/dislike une sauce dans une variable

    if (req.body.like === 1) { //Si l'user aime une sauce
        Sauce.findOne({ _id: req.params.id }) //On récupère la sauce sélectionnée grâce à son ID
            .then( sauce => {
                sauce.usersLiked.push(userTag); //On pousse cette sauce aimée dans le tableau des users qui l'ont aimé
                sauce.likes +=1; //On incrémente le score de cette sauce
                sauce.save(); //On enregistre ces nouveaux paramètres
                res.status(200).json({ message : 'Sauce likée ! '}) //Message de confirmation que la sauce a bien été likée
            })
            .catch(error => res.status(500).json({ error }));
    }
    
    else if (req.body.like === 0) { // Si l'user annule la sauce qu'il a aimé
        Sauce.findOne({ _id: req.params.id}) //On récupère la sauce sélectionnée grâce à son ID
            .then( sauce => {
                const index = sauce.usersLiked.indexOf(userTag); // On attribue une variable "index" à la sauce aimée par l'user
                if(sauce.usersLiked.indexOf(userTag)>-1) { // Si cette sauce est supérieure à -1 (donc un dislike) dans ce tableau des Likes
                    sauce.usersLiked.splice(index, 1); //On retrouve la sauce grâce à cette variable index dans le tableau des Likes
                    sauce.likes -=1; //On décrémente le score de cette sauce.
                } else if (sauce.usersDisliked.indexOf(userTag)>-1){ //Si cette sauce a un score supérieur à -1 dans le tableau des disLikes
                    sauce.usersDisliked.splice(index, 1);//On retrouve la sauce grâce à cette variable index dans le tableau des disLikes
                    sauce.dislikes -=1; //On décrémente le score de cette sauce.=
                }
                sauce.save(); //On enregistre ces nouveaux paramètres
                res.status(200).json({ message: 'Sauce modifiée ! '}); //Message de confirmation que la sauce n'est plus likée ou dislikée
            })
            .catch(error => res.status(500).json({ error }));
    }

    else if (req.body.like === -1) { // Si l'user déteste la sauce 
        Sauce.findOne({ _id: req.params.id}) //On récupère la sauce sélectionnée grâce à son ID
            .then( sauce => {
                sauce.usersDisliked.push(userTag); //On pousse cette sauce détestée dans le tableau des users qui ne l'ont pas aimé
                sauce.dislikes +=1; //On incrémente le score de cette sauce dans le tableau des disLikes
                sauce.save(); //On enregistre ces nouveaux paramètres
                res.status(200).json({message: 'Sauce dislikée !'}); //Message de confirmation que la sauce a bien été dislikée
            })
            .catch(error => res.status(500).json({ error }));
    }
}