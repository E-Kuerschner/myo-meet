//TODO: require pixi??
module.exports = RemotePlayer;

/**
 A remove player is a representation of the other players connected to the server
**/
var RemotePlayer = function(id, startX, startY) {
	var	id = id;
	var	dot = new PIXI.Graphics();
	//TODO: random color or user selected color
    dot.beginFill(0x9966FF);
    dot.drawCircle(0, 0, 15);
    dot.endFill();
    dot.x = startX;
    dot.y = startY;
    dot.vx = 0;
	dot.vy = 0;
	dot.hitArea = new PIXI.Circle(dot.x, dot.y, 15);
	
	// Getters and setters
	var getX = function() {
		return dot.x;
	};

	var getY = function() {
		return dot.y;
	};

	// Draw player
	var addPlayerToStage = function(stage) {
		console.log("Adding client " + id + " to the stage.");
	    stage.addChild(dot);
	};

	var updatePosition = function(x, y){
		console.log("Updating remote player's position");
		dot.x = x;
		dot.y = y;
	};

	var toggleVisibility = function(visible){
		dot.visible = visible;
	}

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		addPlayerToStage: addPlayerToStage,
		updatePosition: updatePosition,
		toggleVisibility: toggleVisibility,
		id: id,
		rad: dot.hitArea.radius
	}
};