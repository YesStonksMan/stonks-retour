// Page relais de la connexion Instagram du Stonks Cockpit.
//
// Meta refuse les adresses de retour en http://localhost : Instagram renvoie
// donc ici, en https, et cette page transmet aussitôt la réponse au cockpit
// qui tourne sur le Mac. La destination est toujours localhost ; le port est
// lu dans `state` (chiffres uniquement), et seuls les paramètres OAuth passent.
// Aucun secret ici, rien n'est gardé ni envoyé ailleurs.
(function () {
  "use strict";
  var recu = new URLSearchParams(window.location.search);
  var m = /^([0-9]{4,5})\.[A-Za-z0-9_-]{16,}$/.exec(recu.get("state") || "");
  var port = m ? parseInt(m[1], 10) : 0;
  if (port < 1024 || port > 65535) {
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
  window.location.replace("http://localhost:" + port + "/instagram/retour?" + transmis.toString());
}());
