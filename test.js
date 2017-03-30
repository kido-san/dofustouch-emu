const fetch = require("node-fetch");
const regex = /appVersion: .,/g;
const str = "image:url(\"cdvfile:client: {E.os,appVersion: N,//localhost/persistent/data/assets/ui/spinner_sprite.png\");background-size:100% 1900%;-webkit-image:url(\"cdvfile://localhost/persistent/data/assets/ui/spinner_sprite.png\");background-size:100% 1900%;-webkit-";

console.log(str);
console.log(str.replace(regex, "appVersion: \"" + content["results"][0]["version"] + "\","));
