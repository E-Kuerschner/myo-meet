var GameCanvas = require("./GameCanvas");
var socket = require("./socket_client");

function Player(id, startX, startY) {
	this.id = id;
	this.x = startX;
	this.y = startY;
	this.entity = GameCanvas.drawPlayer(startX, startY);

	//send the new player event
	socket.emit('new player', {id: socket.id, x: dot.x, y: dot.y});
}

Player.prototype.registerControls = function() {

}