var tablero;
var monopoly = {
	monopolyURI: '/img/metropoly-575.png',
	monopolyOK: false,
	casillas:[
		[20,525],
		[20,475],
		[20,425],
		[20,375],
		[20,325],
		[20,275],
		[20,225],
		[20,175],
		[20,125],
		[20,75],
		[20,25],
		[70,25],
		[120,25],
		[170,25],
		[220,25],
		[270,25],
		[320,25],
		[370,25],
		[420,25],
		[470,25],
		[520,25],
		[520,75],
		[520,125],
		[520,175],
		[520,225],
		[520,275],
		[520,325],
		[520,375],
		[520,425],
		[520,475],
		[520,525],
		[470,525],
		[420,525],
		[370,525],
		[320,525],
		[270,525],
		[120,525],
		[70,525],
		[20,525],
	]
};
var dados = [];
var fichas = [
	{x:0,y:0},
	{x:0,y:25},
	{x:0,y:50},
	{x:25,y:0},
	{x:25,y:25},
	{x:25,y:50}
];
window.player = [{
	x: 20,
	y: 525,
	playerURI: '/img/ficha.png',
	playerOK: false
}];
function iniciar(){
	var canvas = document.getElementById('tablero');
	tablero = canvas.getContext('2d');
	monopoly.image = new Image();
	monopoly.image.src = monopoly.monopolyURI;
	monopoly.image.onload = tableroListo;
	player[0].image = new Image();
	player[0].image.src = player[0].playerURI;
	player[0].image.onload = playerListo;
	dados[1] = new Image();
	dados[1].src = '/img/d1.png';
	dados[2] = new Image();
	dados[2].src = '/img/d2.png';
	dados[3] = new Image();
	dados[3].src = '/img/d3.png';
	dados[4] = new Image();
	dados[4].src = '/img/d4.png';
	dados[5] = new Image();
	dados[5].src = '/img/d5.png';
	dados[6] = new Image();
	dados[6].src = '/img/d6.png';
	document.addEventListener('keydown', function (e){
		if(e.keyCode == 38){
			io.emit('dados::tirar');
		}
	});
}
function moverPieza(){
	player[0].x = monopoly.casillas[player[0].posicion - 1][0];
	player[0].y = monopoly.casillas[player[0].posicion - 1][1];
	console.log(player[0].posicion)
	dibujar();
}
function tableroListo(){
	monopoly.monopolyOK = true;
	dibujar();
}
function playerListo(){
	player[0].playerOK = true;
	dibujar();
}
function dibujar(){
	if(monopoly.monopolyOK){
		tablero.drawImage(monopoly.image, 0, 0);
	}
	if(player[0].playerOK){
		tablero.drawImage(player[0].image, fichas[0].x, fichas[0].y, 25, 25, player[0].x, player[0].y, 25, 25);
	}
	if(typeof(player[0].dado)!=='undefined'){
		tablero.drawImage(dados[player[0].dado.uno], 199,199);
		tablero.drawImage(dados[player[0].dado.dos], 275,275)
	}
}
