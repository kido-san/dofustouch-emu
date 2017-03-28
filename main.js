const {app, BrowserWindow, Menu} = require('electron');

app.on('ready', () => {
    Menu.setApplicationMenu(Menu.buildFromTemplate(require('./menu')));
    
    let window = new BrowserWindow({
        width: 1128,
        height: 649,
        useContentSize: true,
        center: true,
        webPreferences: {
            pageVisibility: true,
            zoomFactor: 1.0
        }
    });

    window.loadURL('file://' + __dirname + '/app/game.html', {
        userAgent: 'Mozilla/5.0 (Linux; Android 6.0; FEVER Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36'
    });

    if (process.env['IN_DEV']) {
        window.openDevTools()
    }
});

app.on('window-all-closed', () => {
    app.quit();
});
