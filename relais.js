// Page relais de la connexion Instagram de Business Manager.
// Publiée dans yesstonksman/stonks-retour (relais.js) le 19-10, accord d'Adham.
//
// Meta refuse les adresses de retour en http://localhost : Instagram renvoie
// donc ici, en https, et cette page transmet aussitôt la réponse au cockpit.
// Deux destinations seulement :
// - `state` = « <port>.<aléa> » (édition Mac, cockpit d'Adham) : http://localhost:<port> ;
// - `state` = « <label>.<aléa> » (édition hébergée, 19-10) : https://<label>.DOMAINE_CLIENTS,
//   un label DNS seul (lettres, chiffres, tirets), jamais un nom ou une adresse
//   pris dans `state` : la page ne renvoie jamais un `code` vers un autre domaine.
// Seuls les paramètres OAuth passent. Aucun secret ici, rien n'est gardé.
(function () {
  "use strict";
  var DOMAINE_CLIENTS = "stonks-inc.com";   // un seul niveau : <label>.<domaine>
  var recu = new URLSearchParams(window.location.search);
  var state = recu.get("state") || "";
  var base = null;
  var m = /^([0-9]{4,5})\.[A-Za-z0-9_-]{16,}$/.exec(state);
  if (m) {
    var port = parseInt(m[1], 10);
    if (port >= 1024 && port <= 65535) { base = "http://localhost:" + port; }
  } else {
    var h = /^([a-z][a-z0-9-]{0,30}[a-z0-9])\.[A-Za-z0-9_-]{16,}$/.exec(state);
    if (h) { base = "https://" + h[1] + "." + DOMAINE_CLIENTS; }
  }
  if (!base) {
    document.getElementById("msg").textContent =
      "Lien incomplet : relance la connexion depuis ton cockpit.";
    return;
  }
  var transmis = new URLSearchParams();
  ["code", "state", "error", "error_reason", "error_description"].forEach(function (cle) {
    var valeur = recu.get(cle);
    if (valeur !== null) { transmis.set(cle, valeur); }
  });
  // `replace` : la page relais et son code ne restent pas dans l'historique.
  window.location.replace(base + "/instagram/retour?" + transmis.toString());
}());
