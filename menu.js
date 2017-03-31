const app = require("electron").app;
const menu = require("electron").Menu;

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
