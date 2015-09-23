var app = require('express')();
var socketio = require('socket.io');
var serve_static = require('serve-static');
var db = require('./db.js');
var port = process.env.PORT || 3000;

//array to store currently connected clients. Stores Player objects
var clients = [];

//use serve static middleware
app.use(serve_static(__dirname + '/public'));

var server = app.listen(port, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('App is listening at http://%s:%s', host, port);
});

//if I need to use a mysql database
//db.init_localhost_conn();

var io = socketio.listen(server);

io.on('connection', function(socket){
	console.log(socket.id + " connected");

	/* List of user-created message tpes
		1. new plyaer
		2. move player
	*/
	socket.on('error', function(err){
		console.log(err.message);
		console.log(err.stack);
	});

	socket.on('disconnect', function(){
		console.log(socket.id + " disconnected");

		var removePlayer = clientById(this.id);

		if (!removePlayer) {
		    console.log("(Disconnect) Player not found: " + this.id);
		    return;
		};

		clients.splice(clients.indexOf(removePlayer), 1);
		this.broadcast.emit('remove player', {id: this.id});
	});

	socket.on('new player', function(data){
		var newPlayer = {id: this.id, x: data.x, y: data.y};
		this.broadcast.emit('new player', {id: newPlayer.id, x: newPlayer.x, y: newPlayer.x});

		//send new player the existing players current locations
		var i, existingPlayer;
		for (i = 0; i < clients.length; i++) {
		    existingPlayer = clients[i];
		    this.emit('new player', {id: existingPlayer.id, x: existingPlayer.x, y: existingPlayer.y});
		};

		clients.push(newPlayer);
	});

	socket.on('move player', function(data){
		var movePlayer = clientById(data.id);

		if(!movePlayer){
			console.log("(Move) Player not found: " + data.id);
			return;
		}

		movePlayer.x = data.x;
		movePlayer.y = data.y;
		// Broadcast updated position to connected socket clients
		this.broadcast.emit('move player', {id: data.id, x: data.x, y: data.y});
	});
});

//find client by id
function clientById(id){
	var i;
	for(i = 0; i < clients.length; i++){
		if(clients[i].id == id)
			return clients[i];
	};

	return false;
};