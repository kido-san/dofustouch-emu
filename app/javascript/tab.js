const TabGroup = require("electron-tabs");
let tabGroup = new TabGroup({newTab:{
    title: "Dofus Tab",
    src: "./game.html",
    active: true,
    visible: true
}});

tabGroup.on("tab-added", (tab, tabGroup) => {
    tab.webview.setAttribute("useragent", "Mozilla/5.0 (Linux; Android 6.0; FEVER Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36");
    tab.webview.setAttribute("preload", "./injector.js");
});

function newGameTab() {
    let newTab = tabGroup.addTab({
        title: "Deskofus",
        src: "./game.html",
        active: true,
        visible: true
    }).webview.setAttribute("useragent", "Mozilla/5.0 (Linux; Android 6.0; FEVER Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36");
}

//Add a new tab
/*document.getElementsByClassName('etabs-tab-button-new')[0].onclick = function() {
 newGameTab();
 };*/

module.exports = {
    newGameTab: newGameTab()
};
