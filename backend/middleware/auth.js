const jwt = require('jsonwebtoken'); //Module pour configurer les tokens d'authentification

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; //On récupère le token
        const decodedToken = jwt.verify(token, process.env.TOKEN); //On vérifie si le token correspond bien à celui de l'user
        const userId = decodedToken.userId; 
        if (req.body.userId && req.body.userId !== userId) { //Comparaison du token 
            throw 'User ID non valable !'; // On lève l'exception si l'iD de l'user est non valable !
        } else {
            next(); // Sinon on passe au middleware suivant
        }
    } catch (error) {
        res.status(401).json({ message: 'Requête non authentifiée !'});
    }
};