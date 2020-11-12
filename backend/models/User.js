const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //Plugin pour s'assurer qu'un utilisateur puisse utiliser la même adresse email

const userSchema = mongoose.Schema({  //Création d'un schéma type d'un utilisateur
    email: { type: String, required: true, unique: true },      
    password: { type: String, required: true}
});

userSchema.plugin(uniqueValidator);         // Application du plugin validator

module.exports = mongoose.model('User', userSchema);      // On exporte ce schéma utilisateur