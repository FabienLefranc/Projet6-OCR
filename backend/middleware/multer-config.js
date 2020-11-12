const multer = require('multer');               // Package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP
                                          
const MIME_TYPES = {                            // On définit les formats images authorisés 
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({            // Fonction diskStorage pour enregistrer sur le fichier disque
    destination: (req, file, callback) => {     // Element expliquant dans quel dossier enregistrer les fichiers
        callback(null, 'images')
    },
    filename: (req, file, callback) =>{         // Element expliquant quel nom de fichier utiliser
        const name = file.originalname.split(' ').join('_');        // Nouveau nom pour le fichier (nom d'origine en remplacant les espaces par _ )
        const extension = MIME_TYPES[file.mimetype];              // Création de l'extension du fichier correspondant au minetype envoyé par le frontend
        callback(null, name + Date.now() + '.' + extension);        // Nom du fichier + l'heure et la date d'enregistrement (pour rendre le fichier unique) + son extension
    }
});

module.exports = multer({ storage }).single('image');       // On exporte notre middleware