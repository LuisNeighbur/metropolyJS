var _ = require('underscore');
var dados = {
	tirarDados: function (player){
		var uno = _.random(1,6);
		var dos = _.random(1,6);
		if(player.dado.last == (uno + dos) && player.dado.doble < 3){
			player.dado.doble ++;
			layer.dado.last = (uno + dos);
		}else if(player.dado.doble == 3){
			console.log('Carcel');
			player.dado.last == (uno + dos);
			player.dado.doble = 0;
		}else{
			player.dado.last == (uno + dos);
		}
		player.dado = {
			'uno': uno,
			'dos': dos
		};
		player.posicion += (player.dado.uno + player.dado.dos);
		if(player.posicion > 40){
			player.posicion -= 40;
		}
		return player;
	}
};
module.exports = dados;