const {
    ipcRenderer,
    remote
} = require('electron');

const fs = require('fs');

var appDataPath = remote.app.getPath('userData');

document.getElementById('form').addEventListener('submit', () => {
    var apiKey = document.getElementById('api').value;

    var body = {
        "info": {
            "apiKey": apiKey
        }
    };
    
    body = JSON.stringify(body);

    fs.writeFileSync(appDataPath + '/apiKey.json', body, err => {
        if (err) throw err;
        ipcRenderer.send('closeApiWin');
    });
});