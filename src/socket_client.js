var io = require("socket.io-client");
var RemotePlayer = require("./RemotePlayer");
var GameCanvas = require("./GameCanvas");

var socket = io("http://localhost:3000");

var remotePlayers = [];

// Socket connection successful
socket.on('connect', function(){
	console.log("Connected to socket server.");
});

// Socket disconnection
socket.on('disconnect', function(){
	console.log("Disconnected from socket server.");
});

// New player message received
socket.on('new player', function(data){
	console.log("New remote player connected. ID: " + data.id);

	var newPlayer = new RemotePlayer(data.id, data.x, data.y);
	// Add new player to the remote players array
	remotePlayers.push(newPlayer);
});

// Player move message received
socket.on('move player', function(data){
	var movePlayer = playerById(data.id);
	console.log("moving remote player: " + data.id);
	// Player not found
	if (!movePlayer) {
		console.log("Player not found: " + data.id);
		return;
	};

	// Update player position
	movePlayer.updatePosition(data.x, data.y);
});

// Player removed message received
socket.on('remove player', function(data){
	var removePlayer = playerById(data.id);

	// Player not found
	if (!removePlayer) {
		console.log("Player not found: " + data.id);
		return;
	};

	// Remove player from array
	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
});

// Find player by ID
function playerById(id) {
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		if (remotePlayers[i].id == id)
			return remotePlayers[i];
	};
	
	return false;
};

module.exports = socket;