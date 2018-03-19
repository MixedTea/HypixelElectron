const {BrowserWindow, app, ipcMain, Menu} = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow(){
    win = new BrowserWindow({minWidth: 1280, minHeight: 720, width:1280, height:720});
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.on('closed', () => {
        win = null;
    });
    win.focus();
    Menu.setApplicationMenu(null);
}
app.on('ready', createWindow);
app.on('activate', () => {
    if(win === null){
        createWindow();
    }
});
