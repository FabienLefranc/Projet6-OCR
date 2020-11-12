const mongoose = require('mongoose');

/* ------- API sauces ------- */

const sauceSchema = mongoose.Schema({       //Création d'un schéma type pour une sauce
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    description: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, default: 0}, //On attribue 0 par défaut aux likes
    dislikes: {type: Number, default: 0},//On attribue 0 par défaut aux dislikes
    usersLiked: {type: [String], default: []}, //On attribue un tableau vide pour les likes
    usersDisliked: {type: [String], default: []}, //On attribue un tableau vide pour les dislikes
});

module.exports = mongoose.model('Sauce', sauceSchema); //On exporte ce schéma 