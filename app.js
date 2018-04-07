const {
    BrowserWindow,
    app,
    ipcMain,
    Menu
} = require("electron");
const path = require("path");
const url = require("url");

let win;
let apiWin;

function createWindow() {
    win = new BrowserWindow({
        minWidth: 1280,
        minHeight: 720,
        width: 1280,
        height: 720,
        frame: false
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'window/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.on('closed', () => {
        win = null;
    });
    win.focus();
    //Menu.setApplicationMenu(null);
}

function createApiWindow(){
    apiWin = new BrowserWindow({
        width: 300,
        height: 200
    });
    apiWin.loadURL(url.format({
        pathname: path.join(__dirname, 'window/apiWin/apiWin.html'),
        protocol: 'file:',
        slashes: true
    }));
    apiWin.on('closed', ()=>{
        apiWin = null;
    });
    apiWin.focus();
    apiWin.center();
}
app.on('ready', createWindow);
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
ipcMain.on('close', (e, arg) => {
    console.log('closing');
    win.close();
});
ipcMain.on('maximize', (e, args) => {
    console.log("maximizing");
    win.maximize();
});
ipcMain.on('unmaximize', (e, args) => {
    console.log("unmaximizing");
    win.unmaximize();
});
ipcMain.on('minimize', (e, args) => {
    console.log("maximizing");
    win.minimize();
});
ipcMain.on('apiKeyRequest', (e, args) => {
    createApiWindow();
});
