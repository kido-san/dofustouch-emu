const fs = require("fs");
const path = require("path");
const assetRegex = /cdvfile:\/\/localhost\/persistent\/data\/assets/g;
const versionRegex = /,appVersion:.,/g;
const fetch = require("node-fetch");

fetch("https://proxyconnection.touch.dofus.com/build/script.js").then(function (res) {
    console.log("Downloading script.js...");
    return res.text();
}).then(function (data) {
    fetch("http://itunes.apple.com/lookup?id=1041406978").then((res) => {
        return res.json();
    }).then((content) => {
        fs.writeFileSync(
            "./app/javascript/dofus.js",
            data.replace(assetRegex, "../")
                .replace(versionRegex, ",appVersion: \"" + content["results"][0]["version"] + "\","));
    }).catch((err) => {
        console.log(err);
    });
}).catch(function (err) {
    console.log(err);
});

fetch("https://proxyconnection.touch.dofus.com/build/styles-native.css").then(function (res) {
    console.log("Downloading dofus.css...");
    return res.text();
}).then(function (data) {
    fs.writeFileSync("./app/stylesheet/dofus.css", data.replace(assetRegex, "../"));
}).catch(function (err) {
    console.log(err);
});

fetch("https://proxyconnection.touch.dofus.com/assetMap.json").then(function (res) {
    return res.json();
}).then(function (json) {
    for (let fileName in json["files"]) {
        downloadAsset(fileName);
    }
}).catch(function (err) {
    console.log(err);
});

function downloadAsset(fileName) {
    fetch("https://proxyconnection.touch.dofus.com/" + fileName).then(function (res) {
        let destarr = fileName.split("/");
        destarr.shift();
        destarr.shift();
        let destfolder = "app/ui";
        let destname = destarr[0];
        for (let i = 1; i < destarr.length; i++) {
            destname = destname + "/" + destarr[i];
        }
        for (let i = 0; i < destarr.length - 1; i++) {
            destfolder = destfolder + "/" + destarr[i];
        }
        console.log("Downloading " + destname + "...");
        try {
            destfolder.split('/').forEach((dir, index, splits) => {
                const parent = splits.slice(0, index).join('/');
                const dirPath = path.resolve(parent, dir);
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath);
                }
            });
            res.body.pipe(fs.createWriteStream("./app/ui/" + destname));
        } catch (e) {
        }
    }).catch(function (err) {
        if (err.code == "ECONNRESET" || err.code == "ETIMEDOUT") {
            downloadAsset(fileName);
        } else {
            console.log(err);
        }
    });
}
