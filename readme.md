Le point d'entrée de l'application se trouve dans le dossier src, c'est le index.ts
Les classes métiers se trouve dans un seul fichier typescript au meme niveau que index.ts appelé entites.ts et où sont implémenté les méthodes des consignes du tp.
La version js se trouve dans le dossier dist/ de la racine du projet.

Afin de démarrer le serveur sur la machine locale:
_ veuillez cloner le projet
_ aller avec le terminal vers la racine du projet cloné
_ saisir la commande npm i
_ saisir la commande tsc --watch à la racine dans un terminal
\_ puis nodemon ./dist/index.js dans un autre terminal et observer la console du serveur(si nodemon n'est pas reconnu alors saisir "npm i -g nodemon" et réessayer)
Pour savoir si le serveur a démarrer veuillez visiter avec un navigateur l'adresse localhost:3000/ et vérifier la présence de "hello world".
