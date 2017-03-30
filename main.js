const {app, BrowserWindow} = require("electron");
const Menu = require("./menu");

function openGameWindow() {
    let window = new BrowserWindow({width: 1128, height: 649,});
    window.loadURL("file://" + __dirname + "/app/game.html", {
        userAgent: "Mozilla/5.0 (Linux; Android 6.0; FEVER Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36"
    });

    if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
        window.openDevTools();
    }
}

app.on("ready", () => {
    Menu.buildMenu();
    openGameWindow();
});

app.on("window-all-closed", () => app.quit());
