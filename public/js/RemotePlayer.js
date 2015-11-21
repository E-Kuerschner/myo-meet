var GameCanvas = require("./GameCanvas");

module.exports = RemotePlayer;

/**
 A remove player is a representation of the other players connected to the server
**/
function RemotePlayer(id, startX, startY) {
	this.id = id;
	this.x = startX;
	this.y = startY;

	this.entity = GameCanvas.drawPlayer(this.x, this.y);
}

RemotePlayer.prototype.getX = function() {
	return this.x;
}

RemotePlayer.prototype.getY = function() {
	return this.y;
}

RemotePlayer.prototype.updatePosition = function(x, y){
	console.log("Updating remote player's position");
	this.entity.x = x;
	this.entity.y = y;
}
	
RemotePlayer.prototype.toggleVisibility = function(visible){
	this.entity.visible = visible;
}