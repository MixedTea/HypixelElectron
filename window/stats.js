var form = document.querySelector('form');
form.addEventListener('submit', testThing);

////MAKING MY LIFE VERY SUICIDAL//////
//General//
var player_stats = document.querySelector('#player_stats');
//General Stats//
var err = document.querySelector('#err');
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
//Bedwars Stats//
var bedwars_wins = document.querySelector('#bedwars_wins');
var bedwars_kills = document.querySelector('#bedwars_kills');
var bedwars_finalkills = document.querySelector('#bedwars_finalkills');
var bedwars_deaths = document.querySelector('#bedwars_deaths');
var bedwars_finaldeaths = document.querySelector('#bedwars_finaldeaths');
var bedwars_bedsbroken = document.querySelector('#bedwars_bedsbroken');
var bedwars_kdr = document.querySelector('#bedwars_kdr');
var bedwars_finalkdr = document.querySelector('#bedwars_finalkdr');
var bedwars_wl = document.querySelector('#bedwars_wl');
//////OKAY I DID IT WITHOUT KMSING MYSELF///////


//Setup//
player_stats.style.display = "none";

function testThing(e) {
    API_KEY = JSON.parse(fs.readFileSync(appDataPath + '/apiKey.json', 'utf8')).info.apiKey;
    try {
        var element = document.getElementById('imageonside');
        element.parentNode.removeChild(element);
    } catch (e) {
        console.log('shoot: ' + e);
    }
    document.getElementById('test').style.display = "none";
    e.preventDefault();
    var error = false;
    player_stats.style.display = "none";
    err.style.display = "none";
    var name = document.querySelector('#name').value;
    https.get('https://api.hypixel.net/player?key=' + API_KEY + '&name=' + name, res => {
        let body = '';
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.log("Invalid Username");
                //err.style.display = "block";
                //err.innerHTML = 'Invalid Username!';
                error = true;
            }
            if (body.player == null) {
                error = true;
                console.log("Invalid Username");
                //err.style.display = "block";
                //err.innerHTML = 'Invalid Username!';
                document.getElementById('Name').innerHTML = "Invalid Username!";
                document.getElementById("test").style.display = "block";
            }
            if (!error) {
                //Image on the side//
                https.get('https://api.mojang.com/users/profiles/minecraft/' + name, resp => {
                    let names = '';
                    resp.on('data', chunk => {
                        names += chunk;
                    });
                    resp.on('end', () => {
                        try {
                            names = JSON.parse(names);
                        } catch (e) {
                            console.log('uh oh: ' + e);
                        }
                        var imgSrc = 'https://visage.surgeplay.com/full/400/' + names.id;
                        var img = document.createElement('img');
                        img.id = 'imageonside';
                        img.src = imgSrc;
                        document.getElementById('image_onside').appendChild(img);
                        name = names.name;
                        document.getElementById("test").style.display = "block";
                        player_stats.style.display = "block";
                        err.style.display = "none";
                        //General Stats//
                        var Rank = check(body.player.newPackageRank, 'NON');
                        switch (Rank) {
                            case 'NON':
                                document.getElementById('Name').innerHTML = "<span style='color: #616161'>" + '[NON]' + name + "</span>";
                                break;
                            case 'MVP_PLUS':
                                var plusColor = body.player.rankPlusColor;
                                var newPlusColor = '';
                                switch (plusColor) {
                                    case 'RED':
                                        newPlusColor = '#f44336';
                                        break;
                                    case 'GOLD':
                                        newPlusColor = '#ffaa00';
                                        break;
                                    case 'LIGHT_GREEN':
                                        newPlusColor = '#b6ff68';
                                        break;
                                    case 'LIGHT_PURPLE':
                                        newPlusColor = '#f48fb1';
                                        break;
                                    case 'WHITE':
                                        newPlusColor = '#dbdbdb';
                                        break;
                                    case 'BLUE':
                                        newPlusColor = '#0000ff';
                                        break;
                                    case 'DARK_GREEN':
                                        newPlusColor = '#00590a';
                                        break;
                                    case 'DARK_RED':
                                        newPlusColor = '#82000d';
                                        break;
                                    case 'DARK_AQUA':
                                        newPlusColor = '#41af87';
                                        break;
                                    case 'DARK_PURPLE':
                                        newPlusColor = '#68008e';
                                        break;
                                    case 'GRAY':
                                        newPlusColor = '#636363';
                                        break;
                                    case 'BLACK':
                                        newPlusColor = '#000000';
                                        break;
                                    default:
                                        console.log('the switch statement works even');
                                        break;
                                }
                                document.getElementById('Name').innerHTML = "<span style='color:#4593e9;'>" + "[MVP<span style='color:" + newPlusColor + ";'>+</span>]" + name + "</span>";
                                break;
                            case 'MVP':
                                document.getElementById('Name').innerHTML = "<span style='color: #4593e9'>" + '[MVP]' + name + "</span>";
                                break;
                            case 'VIP':
                                document.getElementById('Name').innerHTML = "<span style='color: #156c22'>" + '[VIP]' + name + "</span>";
                                break;
                            case 'VIP_PLUS':
                                document.getElementById('Name').innerHTML = "<span style='color: #156c22'>" + "[VIP<span style='color:#ffaa00;'>+</span>]" + name + "</span>";
                        }

                    });
                });
                //Skywars//
                var Sw_wins = check(body.player.stats.SkyWars.wins);
                sw_wins.innerHTML = "Skywars Wins: " + Sw_wins;
                var Sw_kills = check(body.player.stats.SkyWars.kills);
                sw_kills.innerHTML = "Skywars Kills: " + Sw_kills;
                var Sw_losses = check(body.player.stats.SkyWars.losses);
                sw_losses.innerHTML = "Skywars Losses: " + Sw_losses;
                var Sw_deaths = check(body.player.stats.SkyWars.deaths);
                sw_deaths.innerHTML = "Skywars Deaths: " + Sw_deaths;
                if (Sw_kills >= 1 && Sw_deaths >= 1 && Sw_wins >= 1 && Sw_losses >= 1) {
                    sw_kdr.innerHTML = "Skywars Kill/ Death Ratio: " + (Sw_kills / Sw_deaths).toFixed(2);
                    sw_wl.innerHTML = "Skywars Win/ Loss Ratio: " + (Sw_wins / Sw_losses).toFixed(2);
                }
                //UHC//
                var Uhc_wins = check(body.player.stats.UHC.wins);
                uhc_wins.innerHTML = "UHC Wins: " + Uhc_wins;
                var Uhc_kills = check(body.player.stats.UHC.kills);
                uhc_kills.innerHTML = "UHC Kills: " + Uhc_kills;
                var Uhc_deaths = check(body.player.stats.UHC.deaths);
                uhc_deaths.innerHTML = "UHC Deaths: " + Uhc_deaths;
                if (Uhc_kills >= 1 && Uhc_deaths >= 1) {
                    uhc_kdr.innerHTML = "UHC Kill/ Death ratio: " + (Uhc_kills / Uhc_deaths).toFixed(2);
                }
                //Bedwars
                var Bw_wins = check(body.player.stats.Bedwars.wins_bedwars);
                bedwars_wins.innerHTML = "Bedwars Wins: " + Bw_wins;
                var Bw_kills = check(body.player.stats.Bedwars.kills_bedwars);
                bedwars_kills.innerHTML = "Bedwars Kills: " + Bw_kills;
                var Bw_finalkills = check(body.player.stats.Bedwars.final_kills_bedwars);
                bedwars_finalkills.innerHTML = "Final Kills: " + Bw_finalkills;
                var Bw_deaths = check(body.player.stats.Bedwars.deaths_bedwars);
                bedwars_deaths.innerHTML = "Deaths: " + Bw_deaths;
                var Bw_finaldeaths = check(body.player.stats.Bedwars.final_deaths_bedwars);
                bedwars_finaldeaths.innerHTML = "Final Deaths: " + Bw_finaldeaths;
                var Bw_bedsbroken = check(body.player.stats.Bedwars.beds_broken_bedwars);
                bedwars_bedsbroken.innerHTML = "Beds broken: " + Bw_bedsbroken;
                if (Bw_kills >= 1 && Bw_deaths >= 1) {
                    bedwars_kdr.innerHTML = "Kill/ Death ratio: " + (Bw_kills / Bw_deaths).toFixed(2);
                }
                if (Bw_finalkills >= 1 && Bw_finaldeaths >= 1) {
                    bedwars_finalkdr.innerHTML = "Final Kill/ Death ratio: " + (Bw_finalkills / Bw_finaldeaths).toFixed(2);
                }
            }
            document.getElementById('name').blur();
        });
    });
}