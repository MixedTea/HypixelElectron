var https = require("https");
var config = require("./config.js");

var apiKey = config.API_KEY;

var getPlayer = function(player){
    https.get('https://api.hypixel.net/player?key=' + API_KEY + '&name=' + player, res => {
        let body = '';
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => {
            try{
                body = JSON.parse(body);
            }catch(e){
                console.log("Invalid Username");
                return "Invalid Username";
            }
            return body;
        });
    });
}

module.exports = {
    getPlayer
}