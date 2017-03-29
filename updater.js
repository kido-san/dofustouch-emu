const {app, BrowserWindow, ipcMain} = require("electron");
const {EventEmitter} = require("events");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

module.exports = class Updater extends EventEmitter {
    constructor() {
        super();
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

        ipcMain.once("ready", () => this.updateGame());
    }

    getWindow() {
        return this.window;
    }

    updateGame() {
        this.window.webContents.send("checking-game-update");
        let config = fs.existsSync(Updater.getConfigFile()) ? Updater.getConfigData() : {
            version: "null",
            assetMap: []
        };

        super.once("finish", () => fs.writeFile(Updater.getConfigFile(), JSON.stringify(config)));

        fetch("http://itunes.apple.com/lookup?id=1041406978")
            .then((res) => res.json())
            .then((content) => {
                let needUpdate = config.version != content["results"][0]["version"];
                config.version = content["results"][0]["version"];
                return needUpdate;
            })
            .then((needUpdate) => needUpdate ? this.downloadGameUpdate() : super.emit("finish"))
            .catch((error) => this.window.webContents.send("update-error"));
    }

    downloadGameUpdate() {
        this.window.webContents.send("downloading-update");
        this.downloadGameScript();
    }

    downloadGameScript() {
        fetch("https://proxyconnection.touch.dofus.com/build/script.js")
            .then((res) => res.body.pipe(fs.createWriteStream(path.join(Updater.getUpdateFolder(), "dofus.js"))))
            .then(() => this.downloadGameStyle())
            .catch((error) => this.window.webContents.send("update-error"));
    }

    downloadGameStyle() {
        fetch("https://proxyconnection.touch.dofus.com/build/styles-native.css")
            .then((res) => res.body.pipe(fs.createWriteStream(path.join(Updater.getUpdateFolder(), "dofus.css"))))
            .then(() => super.emit("finish"))
            .catch((error) => this.window.webContents.send("update-error"));
    }

    static getUpdateFolder() {
        return app.getPath("userData");
    }

    static getConfigFile() {
        return path.join(Updater.getUpdateFolder(), "config.json");
    }

    static getConfigData() {
        return JSON.parse(fs.readFileSync(Updater.getConfigFile()));
    }

    static openUpdater() {
        return new Updater();
    };
};
