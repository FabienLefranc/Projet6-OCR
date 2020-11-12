const express = require('express');         //Express pour la création de l'API
const bodyParser = require('body-parser');  //Pour extraire les informations des requêtes et pouvoir les utiliser
const mongoose = require('mongoose');       //Pour gérer les intéractions avec notre base de données
const path = require('path');               //Pour gérer les chemins de nos images

const helmet = require('helmet');           //Pour sécuriser les en-têtes
const rateLimit = require('express-rate-limit'); //Pour la protection contre les attaques de force brute

require('dotenv').config(); //Pour sécuriser la base de données


const sauceRoutes = require('./routes/sauce');  //Récupération des routes pour les sauces
const userRoutes = require('./routes/user');    //Récupérationd des routes pour l'user

const limiter = rateLimit({ // Si plusieurs erreurs de suite
  windowMS: 15 * 60 * 1000, // Limiter le prochain essai de connexion que dans x minutes, ici 15 min
  max : 50, // Nombre de tentatives de connexion, ici 50 tentatives maximum
  message: "Trop de connexions à ce site avec cette IP, veuillez réessayer dans quinze minutes SVP !"
});

// Connexion à notre base de données MongoDB
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DATABASE_CONNECTION)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {   //Accès authorisé CORS : 
    res.setHeader('Access-Control-Allow-Origin', '*'); //par rapport à n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //pour les différents headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //pour n'importe quelles méthodes
    next();
  });

app.use(bodyParser.json()); //Transforme le corps de la requête en Object Json utilisable par JavaScript

app.use(helmet()); //Helmet définit d'autres en-têtes HTTP sécurisés

app.use(limiter); //Pour éviter un trop grand nombre de connexions si celles-ci sont incorrectes

app.use('/images', express.static(path.join(__dirname, 'images'))); //Cela indique à Express de gérer les images de manière statique

app.use('/api/sauces', sauceRoutes); //Pour accéder à l'API sauces, on utilise la route "sauceRoutes"
app.use('/api/auth', userRoutes); //Pour accéder à l'API auth, on utilise la route "userRoutes"

module.exports = app;

