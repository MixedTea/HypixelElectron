const https = require("https");
var config = require('./config');
var API_KEY = config.API_KEY;

var form = document.querySelector('form');
form.addEventListener('submit', testThing);

////MAKING MY LIFE VERY SUICIDAL//////
    //General//
var player_stats = document.querySelector('#player_stats');
    //General Stats//
var err =  document.querySelector('#err');
var username = document.querySelector('#username');
var rank = document.querySelector('#rank');
    //Skywars Stats//
var sw_wins = document.querySelector('#sw_wins');
var sw_kills = document.querySelector('#sw_kills');
var sw_losses = document.querySelector('#sw_losses');
var sw_deaths = document.querySelector('#sw_deaths');
var sw_kdr = document.querySelector('#sw_kdr');
var sw_wl = document.querySelector('#sw_wl');
    //UHC Stats//
var uhc_wins = document.querySelector('#uhc_wins');
var uhc_kills = document.querySelector('#uhc_kills');
var uhc_deaths = document.querySelector('#uhc_deaths');
var uhc_kdr = document.querySelector('#uhc_kdr');
//////OKAY I DID IT WITHOUT KMSING MYSELF///////


//Setup//
player_stats.style.display = "none";

function testThing(e) {
    document.getElementById('test').style.display = "none";
    e.preventDefault();
    var error = false;
    player_stats.style.display = "none";
    err.style.display = "none";
    var name = document.querySelector('#name').value;
    document.getElementById('Name').innerHTML = name;
    https.get('https://api.hypixel.net/player?key=' + API_KEY + '&name=' + name, res => {
        let body = '';
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => {
            try {
                body = JSON.parse(body);
            }catch(e) {
                console.log("Invalid Username");
                //err.style.display = "block";
                //err.innerHTML = 'Invalid Username!';
                error = true;
            }
            if(body.player == null){
                error = true;
                console.log("Invalid Username");
                //err.style.display = "block";
               //err.innerHTML = 'Invalid Username!';
               document.getElementById('Name').innerHTML = "Invalid Username!";
               document.getElementById("test").style.display = "block";
            }
            if(!error){
                document.getElementById("test").style.display = "block";
                player_stats.style.display = "block";
                err.style.display = "none";
                //General Stats//
                username.innerHTML = "Username: " + body.player.playername;
                rank.innerHTML = "Rank: " + body.player.newPackageRank;
                //Skywars//
                sw_wins.innerHTML = "Skywars Wins: " + body.player.stats.SkyWars.wins;
                sw_kills.innerHTML = "Skywars Kills: " + body.player.stats.SkyWars.kills;
                sw_losses.innerHTML = "Skywars Losses: " + body.player.stats.SkyWars.losses;
                sw_deaths.innerHTML = "Skywars Deaths: " + body.player.stats.SkyWars.deaths;
                sw_kdr.innerHTML = "Skywars Kill/ Death Ratio: " + (body.player.stats.SkyWars.kills / body.player.stats.SkyWars.deaths).toFixed(2);
                sw_wl.innerHTML = "Skywars Win/ Loss Ratio: " + (body.player.stats.SkyWars.wins / body.player.stats.SkyWars.losses).toFixed(2);
                //UHC//
                uhc_wins.innerHTML = "UHC Wins: " + body.player.stats.UHC.wins;
                uhc_kills.innerHTML = "UHC Kills: " + body.player.stats.UHC.kills;
                uhc_deaths.innerHTML = "UHC Deaths: " + body.player.stats.UHC.deaths;
                uhc_kdr.innerHTML = "UHC Kill/ Death ratio: " + (body.player.stats.UHC.kills / body.player.stats.UHC.deaths).toFixed(2);
            }
            document.getElementById('name').blur();
        });
    });
}