var PIXI = require("pixi.js");

var states = {
	LOBBY: "LOBBY",
	PLAY: play
}
var remotePlayers = [];



function gameLoop(){

  	//Loop this function 60 times per second
  	requestAnimationFrame(gameLoop);

  	//Update the current game state:
  	state();

  	//Render the stage
  	renderer.render(stage);
}

function play() {
  	dot.x += dot.vx;
  	dot.y += dot.vy;
  	//only emit the move event if the dot's displacement is changing
  	if(dot.vx != 0 || dot.vy != 0){
  		socket.emit('move player', {id: socket.id, x: dot.x, y: dot.y});
  	}

  	for(var i = 0; i < remotePlayers.length; i++){
  		console.log(remotePlayers[i]);
  		if(playerProximityAlert(dot, remotePlayers[i])){
  			console.log("we have contact");
  			//TODO: COLLISION CODE!!!!!
  		}
  	}
}

function lobby() {

}


function playerProximityAlert(localPlayer, remotePlayer){
	var x1 = localPlayer.x;
	var y1 = localPlayer.y;
	var r1 = localPlayer.hitArea.radius;
	var x2 = remotePlayer.getX();
	var y2 = remotePlayer.getY();
	var r2 = remotePlayer.rad;

	var distance = Math.sqrt((x1 - x2)*(x1 - x2)+(y1 - y2)*(y1 - y2));

	if(distance <= (r1 + r2)){
		return true;
	}

	return false;
}