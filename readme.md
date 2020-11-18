*************** MIS EN PLACE DE SO PEKOCKO ***************

Ceci est le code source du projet 6 du parcours développeur web d'Openclassrooms.
Il est divisé en deux parties : le front-end et le back-end.

Pré-requis : 

Le projet a été généré avec Angular CLI version 7.0.2.
Pour faire fonctionner le projet, vous devez installer node-sass à part.

INSTALLATION : 

Pour visualiser le site de So Pekocko, il faut cloner le site sur ma page gitHub : 
`git clone https://github.com/FabienLefranc/Projet6-OCR`

Pour vous connecter à la base de données Mongo DB, il vous faut créer un compte sur le site de 
Mongo DB. Une fois vos identifiants récupérés, dans le dossier backend, vous devrez créer un fichier .env
avec cela dedans :

DATABASE_CONNECTION = mongodb+srv://<nomUtilisateur>:<MotDePasse>@cluster0.x0smc.mongodb.net/sauce?retryWrites=true&w=majority
TOKEN = RANDOM_TOKEN_SECRET

CONNEXION :

Au niveau du back-end, il faut avoir NODE JS installé sur votre ordinateur et suivre les étapes suivantes :
Accéder à la partie backend : `cd backend`
Il vous faudra ensuite effectuer: `npm install`
Une fois cela fait, faites un `npm start` pour vous connecter à Mongo DB.

Au niveau du front-end,
Effectuer un `cd frontend`
Il vous faudra ensuite effectuer: `npm install`
puis un `ng serve`
et ensuite se rendre à l'adresse : 
http://localhost:4200/

Voilà vous pouvez visualiser le site de So Pekocko. 

