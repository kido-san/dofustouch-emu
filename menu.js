const {app} = require('electron');

let menuTemplate = [
    {
        label: 'Edition',
        submenu: [
            {
                label: 'Annuler',
                role: 'undo'
            },
            {
                type: 'separator'
            },
            {
                label: 'Couper',
                role: 'cut'
            },
            {
                label: 'Copier',
                role: 'copy'
            },
            {
                label: 'Coller',
                role: 'paste'
            },
            {
                label: 'Tout sélectionner',
                role: 'selectall'
            }
        ]
    }
];
if (process.platform === 'darwin') {
    menuTemplate.unshift({
        label: app.getName(),
        submenu: [
            {
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
        ]
    });
}

module.exports = menuTemplate;