$(document).ready(function(){
	window.io = io.connect('http://' + location.host);
	io.on('rooms::update', function (rooms){
		console.log('Rooms has refreshed')
		var _rooms = $('#rooms > ul').empty();
		$(rooms).each(function(i,room){
			_rooms.append(
				$('<li>').append(
					$('<a>').text(room.name).attr({class: 'room', 'id': room.id, 'onclick':'join2room(this)'})

				)
			);
		})
	});
	io.on('rooms::join', function (room){
		console.log('You has joined to room: ' + room.id);
		$('#rooms > ul').append(
				$('<li>').append(
					$('<a>').text(room.name).attr({class: 'room', 'id': room.id})
				)
			);
	});
	io.on('rooms::leave', function (id){
		console.log('You has leave room: ' + id)
	});
	io.on('room::destroy', function (id){
		console.log('room destroyed: ' + id)
		$('#' + id).remove();
	});
	io.on('create::player', function (obj_player){
		$.extend(player[0],obj_player);
		
	});
	io.on('update::players', function (players){
		player = players;
	})
	io.on('leave::players', function (id){
		player = _.without(player, _.findWhere(player, {uid: id}));
		console.log('Player has leave');
	});
	$('#create_room').on('click', function (e){
		$(this).attr('disabled','disabled');
		$('#leave_room').removeAttr('disabled');
		io.emit('rooms::create');
	});
	$('#leave_room').on('click', function (e){
			$(this).attr('disabled','disabled');
			$('#create_room').removeAttr('disabled','');
			io.emit('rooms::leave')
		})
	io.on('mover', function(mover){
		if(mover.uid == player[0].uid){
			$.extend(player[0],mover);
			moverPieza();
		}
	});
});
function join2room(data){
	io.emit('rooms::join', $(data).attr('id'));
	console.log('Joined to new room')
}