# stonks-retour

Page relais de la connexion Instagram du Stonks Cockpit.

Meta n'accepte pas `http://localhost` comme adresse de retour OAuth. Instagram
renvoie donc ici après « Autoriser », et `relais.js` transmet aussitôt la
réponse au cockpit local (`http://localhost:<port>/instagram/retour`).

- La destination est toujours `localhost`. Le port vient du `state` (chiffres
  uniquement) et seuls `code`, `state` et les champs d'erreur OAuth passent.
- Le code OAuth ne sert qu'une fois et ne vaut rien sans la clé secrète de
  l'app, qui reste sur le Mac.
- Aucun script externe, aucune statistique, aucun cookie.
