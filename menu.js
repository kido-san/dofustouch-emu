const app = require("electron").app;
const menu = require("electron").Menu;
const main = require("./main");

module.exports = class Menu {
    static getTemplate() {
        let template = [];

        if (process.platform === "darwin") {
            template.push({
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
            });
        }

        template.push({
            label: "Jeu",
            submenu: [
                {
                    label: "Nouvelle fenêtre",
                    accelerator: "CommandOrControl+N",
                    click () {
                        main.newGameWindow();
                    }
                },
                {
                    type: "separator"
                },
                {
                    label: "Console de développeur",
                    accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
                    click (item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.webContents.toggleDevTools();
                        }
                    }
                }
            ]
        });

        template.push({
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
        });

        return template;
    }

    static buildMenu() {
        menu.setApplicationMenu(menu.buildFromTemplate(Menu.getTemplate()));
    }
};
