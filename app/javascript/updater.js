const {ipcRenderer} = require("electron");

ipcRenderer.on("checking-game-update", () => $("#updater-message").text("Recherche des mises à jour Dofus Touch..."));
ipcRenderer.on("downloading-update", () => $("#updater-message").text("Téléchargement de la mise à jour..."));
ipcRenderer.on("update-error", () => $("#updater-message").text("Impossible de rechercher les mises à jour..."));

$(document).ready(() => ipcRenderer.send("ready"));
