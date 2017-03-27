const {app, BrowserWindow, Menu} = require('electron');

app.on('ready', () => {
    Menu.setApplicationMenu(Menu.buildFromTemplate(require('./menu')));
    let window = new BrowserWindow({width: 980, height: 661});
    window.loadURL('file://' + __dirname + '/app/game.html', {
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A501 Safari/9537.53'
    });
});

app.on('window-all-closed', () => {
    app.quit();
});
