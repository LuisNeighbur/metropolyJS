var uuid = require('uuid');
var _ = require('underscore');
var Player = require('../config/player');
var dado = require('../controllers/dados');
var playerController = function (io){
	console.log('playerController loaded');
	var salas = [];
	var players = [];
	io.on('connection', function (user){
		console.log('New player has connected')
		//Enviar las salas actuales
		io.emit('rooms::update', salas);
		//creo un nuevo jugador
		user.player = new Player();
		user.player.name = "Player " + (players.length + 1);
		user.player.uid = user.uid = uuid.v1();
		//agrego al jugador a la lista
		players.push(user.player);
		//notifico a todos los usuarios del nuevo jugador
		user.broadcast.emit('update::players', players);
		//le envio al nuevo jugador sus datos
		user.emit('create::player', user.player);
		//Si el usuario tiro los dados
		user.on('dados::tirar', function (){
			//
			var ret = dado.tirarDados(user.player);
			console.log(user.player.name + " tira los dados salio " + (ret.dado.uno + ret.dado.dos) );
			io.emit('mover', ret);
		})
		user.on('rooms::create', function (){
			console.log('new room has created')
			//Nueva sala
			user.room = {
				id: uuid.v1(),
				name: 'Sala ' + (salas.length + 1),
				members: []
			};
			//Agrego al creador a los miembros de la sala
			user.room.members.push(user.uid);
			//agrego la sala a la lista
			salas.push(user.room);
			//Relaciono la sala con el jugador
			user.join(user.room.id);
			//Notifico al resto de los usuarios de la existencia de la nueva sala
			user.broadcast.emit('rooms::update', salas);
			//Notifico al creador de la sala la misma
			user.emit('rooms::join', user.room);
		});
		user.on('rooms::join', function (room_id){
			//si la sala no existe
			if(_.findWhere(salas, {id: room_id})=='undefined'){
				//Nofico al usuario de ello
				user.emit('message',{code: 404, result: 'room does exists'});
			}else{
				//En caso contrario lo unó a la sala
				var sala = _.findWhere(salas, {id: room_id});
				sala.members.push(user.uid)
				user.join(room_id);
				console.log('Player has joined to room')
				//io.to(room.id).broadcast.emit()
				//user.members.push(user.id);
			}
		});

		user.on('rooms::leave', function(){
			console.log('Player has leave to room')
			//Quito al usuario de la sala
			user.leave(user.room.id);
			//Notifico a todos que el usuario abandono la sala
			io.emit('leave::players', user.player.uid);
			//Si soy el unico en la sala
			if(user.room.members.length == 1){
				console.log('room has destroyed')
				//destruyo la sala
				io.emit('room::destroy',user.room.id);
				//La elimino de la lista de salas
				salas = _.without(salas, _.findWhere(salas, {id: user.room.id}));
			}
		});
		user.on('disconnect', function(){
			console.log("Player has disconnect")
			//Quito al jugador de la lista de jugadores
			players = _.without(players, _.findWhere(players, {uid: user.uid}));
			//Si tengo esta en una sala
			if(user.room){
				//La abandono
				user.leave(user.room.id);
				//Notifico a todos de la destruccion de la sala
				io.emit('room::destroy',user.room.id);
				//Me doy de baja
				io.emit('leave::players', user.player.uid);
				//Si soy el unico de la sala
				if(user.room.members.length == 1){
					//elimino la sala
					salas = _.without(salas, _.findWhere(salas, {id: user.room.id}));
				}
			}		
		});
	});
};
module.exports = playerController;