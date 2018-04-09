const https = require("https");
const fs = require('fs');
var {
    ipcRenderer,
    remote
} = require("electron");

var appDataPath = remote.app.getPath('userData');

var API_KEY = JSON.parse(fs.readFileSync(appDataPath + '/apiKey.json', 'utf8')).info.apiKey;

console.log(API_KEY);

M.AutoInit();
var maximized = false;

document.getElementById('close').addEventListener('click', () => {
    ipcRenderer.send('close');
});
document.getElementById('maximize').addEventListener('click', () => {
    if (maximized == false) {
        ipcRenderer.send('maximize');
        maximized = true;
    } else {
        ipcRenderer.send('unmaximize');
        maximized = false;
    }
});
document.getElementById('minimize').addEventListener('click', () => {
    ipcRenderer.send('minimize');
});
document.getElementById('fab').addEventListener('click', ()=>{
    ipcRenderer.send('apiKeyRequest');
});

function check(par, el) {
    //checks if parameter is undefined or not, and if it is, sets the variable to 0, or you can decide what it is set to if you dont want it to be 0
    if (el && par == undefined) {
        return el;
    } else if (par == undefined) {
        return 0;
    } else {
        return par;
    }
}