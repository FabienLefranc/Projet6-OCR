const bcrypt = require('bcrypt');            //package pour crypter le mot de passe
const jwt = require('jsonwebtoken');         // Package pour créer des jetons (ou tocken) uniques

const sha256 = require('sha256'); //Autre méthode hachage, ici pour les emails.

const User = require('../models/User');



exports.signup = (req, res) => {       //Méthode pour s'inscrire au site
    bcrypt.hash(req.body.password, 10)       //Fonction de hashage du mot de passe
        .then(hash => {                      //On récupère le hash du mot de passe
            const user = new User({          //Création d'un nouvel utilisateur dans un Object
                email: sha256.x2(req.body.email),       //On crypte 2 fois son email 
                password: hash               //Récupération de son hash du mot de passe
            });
            user.save()                      //On enregistre le nouvel utilisateur avec la méthode save
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};

exports.login = (req, res) => {           //Méthode pour s'authentifier, pour se connecter

    User.findOne({ email: sha256.x2(req.body.email) })     //Méthode findOne pour retrouver l'user dans la base de données via le crypt de son email
        .then( user => {            
            if(!user) {                         //Si l'user n'est pas trouvé via son email
                return res.status(401).json({ error : ' Utilisateur non trouvé !'}); //Message d'erreur qui s'affiche
            }
            bcrypt.compare(req.body.password, user.password) //Si email de l'user est trouvé, on compare le mot de passe
                .then(valid => {
                   if (!valid) {                //Si le MDP est incorrect avec celui rentré dans la DB
                    return res.status(401).json({ error : ' Mot de passe incorrect !'}); //Message d'erreur affiché
                   } 
                   res.status(200).json({       //Requête validée avec un Object de crée
                       userId: user._id,        //Avec l'identifiant de l'user dans la DB
                       token: jwt.sign(
                           { userId: user._id },    //Création d'un token (ou jeton) valable 24 heures
                           process.env.TOKEN,
                           { expiresIn: '24h'}
                       )
                   });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};