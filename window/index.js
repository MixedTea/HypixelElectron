const https = require("https");
var config = require('./config');
var {
    ipcRenderer
} = require("electron");
var API_KEY = config.API_KEY;

M.AutoInit();
var maximized = false;

document.getElementById('close').addEventListener('click', () => {
    console.log("closed");
    ipcRenderer.send('close');
});
document.getElementById('maximize').addEventListener('click', () => {
    if (maximized == false) {
        console.log("maximizing");
        ipcRenderer.send('maximize');
        maximized = true;
    } else {
        console.log("unmaximizing");
        ipcRenderer.send('unmaximize');
        maximized = false;
    }
});
document.getElementById('minimize').addEventListener('click', () => {
    console.log("minimizing");
    ipcRenderer.send('minimize');
});