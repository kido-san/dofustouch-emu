const {app, BrowserWindow, ipcMain} = require("electron");
const Updater = require("./updater");
const Menu = require("./menu");
const path = require("path");

function openGameWindow() {
    let window = new BrowserWindow({
        width: 1128,
        height: 649,
    });

    window.loadURL("file://" + __dirname + "/app/game.html", {
        userAgent: "Mozilla/5.0 (Linux; Android 6.0; FEVER Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36"
    });
    ipcMain.once("ready", () => window.webContents.send("setup", {
        folder: Updater.getUpdateFolder(),
        version: Updater.getConfigData().version,
        script: path.join(Updater.getUpdateFolder(), "dofus.js"),
        style: path.join(Updater.getUpdateFolder(), "dofus.css")
    }));

    if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
        window.openDevTools();
    }
}

app.on("ready", () => {
    Menu.buildMenu();

    let updater = Updater.openUpdater();
    updater.on("finish", () => {
        openGameWindow();
        updater.getWindow().close();
    });
});

app.on("window-all-closed", () => app.quit());
