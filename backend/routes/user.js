const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


// Création de routes POST pour l'inscription et la connexion d'un user
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;