const app = require("electron").app;
const menu = require("electron").Menu;

module.exports = class Menu {
    static getTemplate() {
        if (process.platform === "darwin") {
            return [{
                label: app.getName(),
                submenu: [
                    {
                        role: "about"
                    },
                    {
                        type: "separator"
                    },
                    {
                        role: "hide"
                    },
                    {
                        role: "hideothers"
                    },
                    {
                        role: "unhide"
                    },
                    {
                        type: "separator"
                    },
                    {
                        role: "quit"
                    }
                ]
            }];
        } else {
            return [{
                label: "Edition",
                submenu: [
                    {
                        label: "Annuler",
                        role: "undo"
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: "Couper",
                        role: "cut"
                    },
                    {
                        label: "Copier",
                        role: "copy"
                    },
                    {
                        label: "Coller",
                        role: "paste"
                    },
                    {
                        label: "Tout sélectionner",
                        role: "selectall"
                    }
                ]
            }];
        }
    }

    static buildMenu() {
        menu.setApplicationMenu(menu.buildFromTemplate(Menu.getTemplate()));
    }
};
