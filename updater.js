const {app, BrowserWindow, ipcMain} = require("electron");
const {EventEmitter} = require("events");
const path = require("path");
const fs = require("fs");

module.exports = class Updater extends EventEmitter {
    constructor() {
        super();
        this.updateFolder = app.getPath("userData");
        this.configFile = path.join(this.updateFolder, "config.json");
        this.window = new BrowserWindow({
            width: 720,
            height: 480,
            frame: false,
            resizable: false
        });
        this.window.loadURL("file://" + __dirname + "/app/updater.html");

        if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
            this.window.openDevTools();
        }

        ipcMain.on("ready", () => this.updateGame());
    }

    updateGame() {
        this.window.webContents.send("checking-game-update");
        let config = fs.existsSync(this.configFile) ? fs.readFileSync(this.configFile) : {};

    }

    static openUpdater() {
        return new Updater();
    };
};
