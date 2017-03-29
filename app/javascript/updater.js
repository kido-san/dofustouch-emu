const {ipcRenderer} = require("electron");

$(document).ready(() => {
    ipcRenderer.on("checking-game-update", () => $("#updater-message").text("Recherche des mises à jour Dofus Touch..."));


    ipcRenderer.send("ready");
});
