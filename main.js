const {app, BrowserWindow} = require("electron");
const Menu = require("./menu");

let windows = [];

function newGameWindow() {
    let window = new BrowserWindow({width: 1128, height: 649,});

    window.loadURL("file://" + __dirname + "/app/tab.html", {
        userAgent: "Mozilla/5.0 (Linux; Android 6.0; FEVER Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36"
    });

    if (windows.length > 0) {
        window.webContents.setAudioMuted(true);
    }

    windows.push(window);
}

app.on("ready", () => {
    Menu.buildMenu();
    newGameWindow();
});

app.on("window-all-closed", () => {
    app.quit();
});

module.exports = {
    newGameWindow: newGameWindow
};
