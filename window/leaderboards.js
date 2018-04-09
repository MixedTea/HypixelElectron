document.getElementById('game_modes').style.display = "none";

var gamemode1 = document.getElementById('game_mode1');
var gamemode2 = document.getElementById('game_mode2');
var gamemode3 = document.getElementById('game_mode3');
var gamemode4 = document.getElementById('game_mode4');
var gamemode5 = document.getElementById('game_mode5');
var gamemode6 = document.getElementById('game_mode6');

document.getElementById('skywarsBTN').addEventListener('click', ()=>{
    document.getElementById('game_modes').style.display = "block";
    gamemode1.style.display = "block";
    gamemode1.innerHTML = "Wins";
    gamemode2.style.display = "block";
    gamemode2.innerHTML = "Kills";
    gamemode3.style.display = "block";
    gamemode3.innerHTML = "Rating";
    gamemode4.style.display = "none";
    gamemode5.style.display = "none";
    gamemode6.style.display = "none";
});
document.getElementById('bwBTN').addEventListener('click', ()=>{
    document.getElementById('game_modes').style.display = "block";
    gamemode1.style.display = "inline";
    gamemode1.innerHTML = "Level";
    gamemode2.style.display = "inline";
    gamemode2.innerHTML = "Wins";
    gamemode3.style.display = "inline";
    gamemode3.innerHTML = "Final Kills";
    gamemode4.style.display = "none";
    gamemode5.style.display = "none";
    gamemode6.style.display = "none";
});
document.getElementById('uhcBTN').addEventListener('click', ()=>{
    document.getElementById('game_modes').style.display = "block";
    gamemode1.innerHTML = "Wins";
    gamemode1.style.display = "block";
    gamemode2.innerHTML = "Kills";
    gamemode2.style.display = "block";
    gamemode3.style.display = "none";
    gamemode4.style.display = "none";
    gamemode5.style.display = "none";
    gamemode6.style.display = "none";
});