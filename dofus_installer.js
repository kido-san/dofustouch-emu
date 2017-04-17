const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const assetRegex = /cdvfile:\/\/localhost\/persistent\/data\/assets/g;
const versionRegex = /,appVersion:.,/g;
const overrideConsoleRegex = /.\.overrideConsole=function\(\){(\s*?.*?)*?},/g;

fetch("https://proxyconnection.touch.dofus.com/build/script.js").then(function (res) {
    console.log("Downloading script.js...");
    return res.text();
}).then(function (data) {
    fetch("http://itunes.apple.com/lookup?id=1041406978").then((res) => {
        return res.json();
    }).then((content) => {
        fs.writeFileSync(
            "./app/javascript/dofus.js",
            data.replace(assetRegex, "..")
                .replace(versionRegex, ",appVersion: \"" + content["results"][0]["version"] + "\",")
                .replace(overrideConsoleRegex, "_.overrideConsole=function(){},"));
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
    fs.writeFileSync("./app/stylesheet/dofus.css", data.replace(assetRegex, ".."));
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
        let destinationArray = fileName.split("/");
        destinationArray.shift();
        destinationArray.shift();
        let destinationFileName = destinationArray.pop();
        let destinationFolder = "app/ui/" + destinationArray.toString().replace(",", "/");
        let destination = destinationFolder + "/" + destinationFileName;

        console.log("Downloading " + destination + "...");
        destinationFolder.split('/').forEach((dir, index, splits) => {
            const parent = splits.slice(0, index).join('/');
            const dirPath = path.resolve(parent, dir);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
        });
        res.body.pipe(fs.createWriteStream(destination));
    }).catch(function (err) {
        if (err.code == "ECONNRESET" || err.code == "ETIMEDOUT") {
            downloadAsset(fileName);
        } else {
            console.log(err);
        }
    });
}
