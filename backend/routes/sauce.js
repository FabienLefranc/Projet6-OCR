const express = require('express');
const router = express.Router();        //Création de routes 

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/* ------- routes API sauces ------- */

// Création de la route GET pour toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

// Création de la route GET pour une sauce sélectionnée par son ID
router.get('/:id', auth, sauceCtrl.getOneSauce);

// Création de la route POST pour toutes les sauces
router.post('/', auth, multer, sauceCtrl.createSauce);

// Création de la route PUT pour modifier une sauce sélectionnée par son ID
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// Création de la route DELETE pour supprimer une sauce sélectionnée par son ID
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);

// Création de la route POST pour liker ou disliker une sauce sélectionnée par son ID
router.post('/:id/like',auth,sauceCtrl.likeCtrl );

module.exports = router;
