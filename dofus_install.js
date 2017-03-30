const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

fetch("https://proxyconnection.touch.dofus.com/build/script.js").then(function (res) {
    console.log("Downloading script.js...");
    let dest = fs.createWriteStream("./app/javascript/dofus.js");
    res.body.pipe(dest);
}).catch(function (err) {
    console.log(err);
});

fetch("https://proxyconnection.touch.dofus.com/build/styles-native.css").then(function (res) {
    console.log("Downloading dofus.css...");
    let dest = fs.createWriteStream("./app/stylesheet/dofus.css");
    res.body.pipe(dest);
}).catch(function (err) {
    console.log(err);
});

fetch("https://proxyconnection.touch.dofus.com/assetMap.json").then(function (res) {
    return res.json();
}).then(function (json) {
    for (let fileName in json["files"]) {
        fetch("https://proxyconnection.touch.dofus.com/" + fileName).then(function (res) {
            let destarr = fileName.split("/");
            destarr.shift();
            destarr.shift();
            let destfolder = "";
            let destname = destarr[0];
            for (let i = 1; i < destarr.length; i++) {
                destname = destname + "/" + destarr[i];
            }
            for (let i = 0; i < destarr.length - 1; i++) {
                destfolder = destfolder + "/" + destarr[i];
            }
            console.log("Downloading " + destname + "...");
            try {
                fs.mkdirSync("./app/ui" + destfolder);
            } catch (e) {}
            let dest = fs.createWriteStream("./app/ui/" + destname);
            res.body.pipe(dest);
        }).catch(function (err) {
            console.log(err);
        });
    }
}).catch(function (err) {
    console.log(err);
});
